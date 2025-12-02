import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const API_URL = api.defaults.baseURL;

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserById = async (id) => {
    try {
      const { data } = await axios.get(`${API_URL}/Employee/${id}`);
      setUser(data);
      return data;
    } catch (err) {
      console.error("Erro ao buscar Employee por ID:", err.response?.data || err);
      return null;
    }
  };

  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("userToken");

        if (storedToken) {
          setToken(storedToken);
          axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;

          const decoded = jwtDecode(storedToken);

          if (decoded?.sub) {
            await fetchUserById(decoded.sub);
          }
        }
      } catch (e) {
        console.error("Erro ao carregar token:", e);
      } finally {
        setIsLoading(false);
      }
    };

    loadToken();
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/Auth/login`, {
        email,
        password,
      });

      if (response.data.isTwoFactorRequired) {
        await AsyncStorage.setItem("pending2FaEmail", email);
        setIsLoading(false);
        return { status: "REQUIRES_2FA" };
      }

      const token = response.data.acessToken;

      if (!token) {
        setIsLoading(false);
        return { status: "FAILURE", message: "Token não recebido da API" };
      }

      await AsyncStorage.setItem("userToken", token);
      setToken(token);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const decoded = jwtDecode(token);

      let fullUser = null;
      if (decoded?.sub) {
        fullUser = await fetchUserById(decoded.sub);
      }

      setIsLoading(false);
      return { status: "SUCCESS", token, user: fullUser };

    } catch (e) {
      console.log("🔥 ERRO COMPLETO DO LOGIN:", e);
      console.log("🔥 ERRO RESPONSE:", e?.response?.data);
      console.log("🔥 STATUS:", e?.response?.status);

      setIsLoading(false);
      return {
        status: "FAILURE",
        message: e.response?.data?.message || "Erro no login",
      };
    }
  };

  const login2FA = async (code) => {
    setIsLoading(true);

    try {
      const email = await AsyncStorage.getItem("pending2FaEmail");

      const response = await axios.post(`${API_URL}/Auth/verify-2fa`, {
        email,
        twoFactorCode: code,
      });

      const token = response.data.acessToken;

      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.removeItem("pending2FaEmail");

      setToken(token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const decoded = jwtDecode(token);

      if (decoded?.sub) {
        await fetchUserById(decoded.sub);
      }

      setIsLoading(false);
      return { status: "SUCCESS" };

    } catch (e) {
      setIsLoading(false);
      return {
        status: "FAILURE",
        message: e.response?.data?.message || "Código inválido ou expirado",
      };
    }
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(["userToken", "pending2FaEmail"]);
    setUser(null);
    setToken(null);
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, login2FA, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
