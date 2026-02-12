import { createContext, useContext, useState, useEffect } from "react";
import { loginRequest } from "../lib/api";

type AuthContextType = {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

    const isAuthenticated = !!token;

    const login = async (email: string, password: string) => {
        const res = await loginRequest(email, password);
        const receivedToken = res.data.token; // APIの返却形式に合わせる

        localStorage.setItem("token", receivedToken);
        setToken(receivedToken);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
}
