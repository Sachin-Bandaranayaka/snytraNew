"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type User = {
    id: number;
    name: string;
    email: string;
    role: string;
} | null;

type AuthContextType = {
    user: User;
    isLoading: boolean;
    error: string | null;
    logOut: () => Promise<void>;
    clearError: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch current user data
        const fetchUser = async () => {
            try {
                const response = await fetch("/api/auth/me", {
                    credentials: 'include', // Ensure cookies are sent with the request
                    cache: 'no-store' // Don't cache this request
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                } else if (response.status === 401) {
                    // Not authenticated, that's okay - just set user to null
                    console.log("User not authenticated");
                    setUser(null);
                    // Don't set an error for authentication failures
                } else {
                    // Other errors
                    console.error("Error response:", response.status);
                    setError("Failed to load user data");
                    setUser(null);
                }
            } catch (err) {
                console.error("Error fetching user:", err);
                // Don't set an error that would block the UI
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);

    const logOut = async () => {
        try {
            setIsLoading(true);
            const response = await fetch("/api/auth/logout", {
                method: "POST",
                credentials: 'include', // Ensure cookies are sent with the request
            });

            if (response.ok) {
                setUser(null);
                window.location.href = "/";
            } else {
                throw new Error("Failed to log out");
            }
        } catch (err) {
            console.error("Logout error:", err);
            setError("Failed to log out");
        } finally {
            setIsLoading(false);
        }
    };

    const clearError = () => setError(null);

    return (
        <AuthContext.Provider value={{ user, isLoading, error, logOut, clearError }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
} 