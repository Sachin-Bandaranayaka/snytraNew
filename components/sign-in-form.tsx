"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SignInFormProps {
    redirectPath: string;
}

export function SignInForm({ redirectPath }: SignInFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to sign in");
            }

            // Check user role and redirect accordingly
            if (data.user && data.user.role === 'admin') {
                // Admin users should go to admin dashboard
                router.push('/admin');
            } else {
                // Regular users go to the user dashboard or specified redirectPath
                router.push(redirectPath || "/dashboard");
            }

            // Force a refresh to ensure the auth state is updated
            router.refresh();

        } catch (err) {
            console.error("Login error:", err);
            setError("Invalid email or password. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="p-3 text-sm text-red-800 bg-red-50 border border-red-200 rounded">
                    {error}
                </div>
            )}

            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    disabled={isLoading}
                />
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password" className="text-sm text-primary">
                        Forgot password?
                    </Link>
                </div>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    disabled={isLoading}
                />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
            </Button>
        </form>
    );
} 