"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";
import { User } from "@/types";

export default function ProfilePage() {
    const { user, isLoading } = useAuth();
    const [name, setName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (user && user.name) {
            setName(user.name);
        }
    }, [user]);

    async function updateProfile() {
        if (!user) return;

        setLoading(true);
        setSuccess(false);
        setError(null);

        try {
            // Example of what the API call would look like
            const response = await fetch("/api/user/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to update profile");
            }

            setSuccess(true);
        } catch (err) {
            console.error("Failed to update profile:", err);
            setError("Failed to update profile. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    if (isLoading) {
        return (
            <div className="container mx-auto py-10">
                <div className="max-w-md mx-auto">
                    <Card>
                        <CardHeader className="text-center">
                            <div className="w-full h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                            <div className="w-2/3 h-4 bg-gray-200 rounded animate-pulse mx-auto"></div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="w-full h-10 bg-gray-200 rounded animate-pulse"></div>
                                <div className="w-full h-10 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="container mx-auto py-10">
                <Card className="max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle>Profile</CardTitle>
                        <CardDescription>You must be signed in to view your profile.</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button asChild className="w-full">
                            <a href="/signin">Sign In</a>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10">
            <div className="max-w-md mx-auto">
                <Card>
                    <CardHeader>
                        <div className="flex justify-center mb-4">
                            <Avatar className="h-24 w-24">
                                <AvatarImage src="/avatar-placeholder.png" alt={user.name || ""} />
                                <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                            </Avatar>
                        </div>
                        <CardTitle className="text-center">{user.name}</CardTitle>
                        <CardDescription className="text-center">{user.email}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {success && (
                            <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                <AlertDescription>Profile updated successfully!</AlertDescription>
                            </Alert>
                        )}

                        {error && (
                            <Alert className="mb-4 bg-red-50 text-red-800 border-red-200">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your name"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    value={user.email}
                                    disabled
                                    className="bg-gray-100"
                                />
                                <p className="text-sm text-muted-foreground">
                                    Email cannot be changed
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                <Input
                                    id="role"
                                    value={user.role}
                                    disabled
                                    className="bg-gray-100"
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            onClick={updateProfile}
                            disabled={loading || !name.trim()}
                            className="w-full"
                        >
                            {loading ? "Updating..." : "Update Profile"}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
} 