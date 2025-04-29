'use client'
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    const authenticatedUser = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const decodedToken = JSON.parse(window.atob(base64));
            if (decodedToken.exp * 1000 > Date.now()) {
                setUser(decodedToken);
            } else {
                toast.error('Session Expired');
                localStorage.removeItem('token');
            }
        } catch (error) {
            console.error('Error decoding token', error);
            localStorage.removeItem('token');
        }
    };

    useEffect(() => {
        try {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                authenticatedUser(storedToken);
            }
        } catch (error) {
            console.error('Error accessing localStorage', error);
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
        try {
            localStorage.removeItem('token');
        } catch (error) {
            console.error('Error removing from localStorage', error);
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