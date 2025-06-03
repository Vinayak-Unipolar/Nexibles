'use client'
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode library

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    const authenticatedUser = (token) => {
        try {
            if (!token || typeof token !== 'string') {
                throw new Error('Invalid or missing token');
            }
            const decodedToken = jwtDecode(token);
            if (decodedToken.exp * 1000 > Date.now()) {
                setUser(decodedToken);
            } else {
                toast.error('Session Expired');
                localStorage.removeItem('token');
                setUser(null);
            }
        } catch (error) {
            console.error('Error decoding token:', error.message);
            //localStorage.removeItem('token');
            //setUser(null);
           //toast.error('Invalid token');
        }
    };

    useEffect(() => {
        try {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                authenticatedUser(storedToken);
            }
        } catch (error) {
            console.error('Error accessing localStorage:', error.message);
            localStorage.removeItem('token');
            setUser(null);
        }
    }, []);

    const login = (userData, token) => {
        try {
            localStorage.setItem('token', token);
            setUser(userData);
        } catch (error) {
            console.error('Error saving token to localStorage:', error.message);
            toast.error('Login failed');
        }
    };

    const logout = () => {
        setUser(null);
        try {
            localStorage.removeItem('token');
        } catch (error) {
            console.error('Error removing token from localStorage:', error.message);
        }
        router.push('/login');
    };

    const contextValue = {
        user,
        login,
        logout,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
};