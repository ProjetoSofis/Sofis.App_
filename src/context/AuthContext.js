import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

const API_URL = 'http://192.168.97.141/api/v1';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadToken = async () => {
            try{
                const storedToken = await AsyncStorage.getItem('userToken');
                if (storedToken) {
                    setToken(storedToken);
                    // O backend deve retornar um JWT ou token completo
                    axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
                }
            } catch (e) {
                console.error('Falha ao carregar o token', e);
            } finally{
                setIsLoading(false);
            }
        };
        loadToken();
    }, []);
    
    const login = async (email, password) => {
        setIsLoading(true);
        try{
            const response = await axios.post(`${API_URL}/Auth/login`, {
                email: email,
                password: password
            });
            console.log('Response: ', response.data);

            if (response.data.isTwoFactorRequired) {
                setIsLoading(false);
                await AsyncStorage.setItem('pending2FaEmail', email); 
                return { status: 'REQUIRES_2FA' };
            }
            
            const { token: newTtoken, user: userData } = response.data;
            await AsyncStorage.setItem('userToken', newTtoken);
            setToken(newTtoken);
            setUser(userData);
            axios.defaults.headers.common['Authorization'] = `Bearer ${newTtoken}`;
            setIsLoading(false);
            return { status: 'SUCCESS', token: newTtoken };
            
        } catch (e) {
            console.error('Falha ao fazer login', e.response?.data || e.message);
            setIsLoading(false)
            return { status: 'FAILURE', message: e.response?.data.message || 'Erro desconhecido ao tentar acessar a conta'};
        }
    }


    const login2FA = async (code) => {
        setIsLoading(true);
        const email = await AsyncStorage.getItem('pending2FaEmail');

        if (!email) {
            setIsLoading(false);
            return { status: 'FAILURE', message: 'Email de 2FA não encontrado. Por favor, faça login novamente.' };
        }
        
        try {
            const response = await axios.post(`${API_URL}/Auth/verify-2fa`, { 
                email: email,
                twoFactorCode: code,
            });
            console.log("Response 2FA: ", response.data);

            const { token: newTtoken } = response.data; 

            await AsyncStorage.removeItem('pending2FaEmail');
            await AsyncStorage.setItem('userToken', newTtoken);

            setToken(newTtoken);
            // setUser(userData);
            axios.defaults.headers.common['Authorization'] = `Bearer ${newTtoken}`;

            setIsLoading(false);
            return { status: 'SUCCESS', token: newTtoken }; // Corrigido 'SUCESS' para 'SUCCESS'
        } catch (e) {
            console.error('Falha ao fazer login com 2FA', e.response?.data || e.message);
            setIsLoading(false);
            return { status: 'FAILURE', message: e.response?.data?.message || 'Código inválido ou expirado' };
        }
    }

    const logout = async () => {
        setIsLoading(true);
        try{
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('pending2FaEmail');

            setToken(null);
            setUser(null);

            delete axios.defaults.headers.common['Authorization'];
        } catch (e) {
            console.error('Falha no logout', e);
        } finally{
            setIsLoading(false);
        }
    };
    
    const contextValue = {
        user,
        token,
        isLoading,
        login,
        logout,
        login2FA 
    }
    
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}


export const useAuth = () => {
    return useContext(AuthContext);
}