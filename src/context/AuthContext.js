import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const API_URL = api.defaults.baseURL;
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUserById = async (id) => {
        try {
            const { data } = await axios.get(`${API_URL}/Employee/${id}`);
            // Removemos o setUser daqui para evitar chamadas duplicadas
            return data;
        } catch (err) {
            console.error("Erro ao buscar Employee:", err.response?.data || err);
            return null;
        }
    };

    const loadUserFromToken = async (jwt) => {
        try {
            const decoded = jwtDecode(jwt);
            if (decoded?.sub) {
                const fullUser = await fetchUserById(decoded.sub);
                if (fullUser) {
                    setUser(fullUser);
                } else {
                    // Se a busca falhar, é melhor forçar o logout
                    await logout(false); // Passa false para não resetar o loading
                }
            }
        } catch (e) {
            console.error("Erro ao decodificar token:", e);
            // Token inválido, forçar logout
            await logout(false);
        }
    };

    useEffect(() => {
        const loadToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem("userToken");
                if (storedToken) {
                    setToken(storedToken);
                    axios.defaults.headers.common[
                        "Authorization"
                    ] = `Bearer ${storedToken}`;
                    await loadUserFromToken(storedToken);
                }
            } catch (e) {
                console.error("Falha ao carregar o token", e);
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

            // CORREÇÃO AQUI: Usar a variável 'token' que já foi extraída corretamente (acessToken)
            const accessToken = response.data.acessToken;

            if (!accessToken) {
                setIsLoading(false);
                return { status: "FAILURE", message: "Token não recebido da API" };
            }

            // Grava o token correto no AsyncStorage
            await AsyncStorage.setItem("userToken", accessToken);

            // Define o token no estado e no cabeçalho
            setToken(accessToken);
            axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

            // Carrega os dados completos do usuário usando o token
            await loadUserFromToken(accessToken);

            setIsLoading(false);
            return { status: "SUCCESS", token: accessToken };

        } catch (e) {
            console.error("Falha ao fazer login", e.response?.data || e.message);
            setIsLoading(false);
            return {
                status: "FAILURE",
                message:
                    e.response?.data?.message ||
                    "Erro desconhecido ao tentar acessar a conta",
            };
        }
    };

    const login2FA = async (code) => {
        setIsLoading(true);

        const email = await AsyncStorage.getItem("pending2FaEmail");

        if (!email) {
            setIsLoading(false);
            return {
                status: "FAILURE",
                message: "Email não encontrado para 2FA. Faça login novamente.",
            };
        }

        try {
            const response = await axios.post(`${API_URL}/Auth/verify-2fa`, {
                email,
                twoFactorCode: code,
            });

            const { token: newToken } = response.data; // Assumindo que a resposta do 2FA usa 'token'

            await AsyncStorage.removeItem("pending2FaEmail");
            await AsyncStorage.setItem("userToken", newToken);

            setToken(newToken);
            axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

            await loadUserFromToken(newToken);

            setIsLoading(false);
            return { status: "SUCCESS", token: newToken };
        } catch (e) {
            console.error("Erro ao validar 2FA", e.response?.data || e);
            setIsLoading(false);
            return {
                status: "FAILURE",
                message: e.response?.data?.message || "Código inválido",
            };
        }
    };

    // Ajustada para aceitar um argumento 'setLoading'
    const logout = async (setLoading = true) => {
        if (setLoading) setIsLoading(true);
        try {
            await AsyncStorage.removeItem("userToken");
            await AsyncStorage.removeItem("pending2FaEmail");

            setToken(null);
            setUser(null);

            delete axios.defaults.headers.common["Authorization"];
        } catch (e) {
            console.error("Falha no logout", e);
        } finally {
            if (setLoading) setIsLoading(false);
        }
    };

    const register = async (name, email, phone, cpf, role, password) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${API_URL}/Employee/adicionar`, {
                name,
                email,
                phone,
                cpf,
                role,
                password,
            });

            if (response.status === 201) {
                return { status: "SUCCESS" };
            }

            return { status: "SUCCESS" };
        } catch (error) {
            console.error("Erro no cadastro:", error.response?.data || error);
            return {
                status: "ERROR",
                message:
                    error.response?.data?.message ||
                    "Erro ao cadastrar. Verifique os dados.",
            };
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isLoading,
                login,
                login2FA,
                logout,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);