"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function EnableModulesPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleEnableModules = async () => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch('/api/module-access/enable', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to enable modules');
            }

            setSuccess(true);
            toast({
                title: "Success",
                description: "Modules have been enabled successfully.",
            });
        } catch (err) {
            console.error('Error enabling modules:', err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
            toast({
                title: "Error",
                description: "Failed to enable modules. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Enable Management Modules</h1>

            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <CardTitle>Manual Module Activation</CardTitle>
                    <CardDescription>
                        Enable access to management modules for your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="mb-4">
                        This will enable access to the following modules:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                        <li>Order Management</li>
                        <li>Inventory Management</li>
                        <li>Staff Management</li>
                        <li>Website Management</li>
                    </ul>

                    {error && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {success && (
                        <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <AlertTitle>Success</AlertTitle>
                            <AlertDescription>
                                Modules have been enabled successfully. You can now access all management features.
                            </AlertDescription>
                        </Alert>
                    )}
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                    <Button
                        onClick={handleEnableModules}
                        disabled={isLoading || success}
                        className="w-full"
                    >
                        {isLoading ? "Enabling..." : success ? "Enabled" : "Enable Modules"}
                    </Button>

                    {success && (
                        <Button variant="outline" className="w-full" asChild>
                            <Link href="/dashboard/management">
                                Go to Management Dashboard
                            </Link>
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
} 