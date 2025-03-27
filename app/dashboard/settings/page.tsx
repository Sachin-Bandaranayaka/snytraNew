"use client";

import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { CheckCircle2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
    const { user, isLoading } = useAuth();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [smsNotifications, setSmsNotifications] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    async function updatePassword() {
        if (!currentPassword || !newPassword || !confirmPassword) {
            setError("All password fields are required");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("New passwords do not match");
            return;
        }

        setLoading(true);
        setSuccess(null);
        setError(null);

        try {
            // Example of what the API call would look like
            const response = await fetch("/api/user/password", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    currentPassword,
                    newPassword,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to update password");
            }

            setSuccess("Password updated successfully");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err: any) {
            console.error("Failed to update password:", err);
            setError(err.message || "Failed to update password. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    async function updateNotifications() {
        setLoading(true);
        setSuccess(null);
        setError(null);

        try {
            // Example of what the API call would look like
            const response = await fetch("/api/user/notifications", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    emailNotifications,
                    smsNotifications,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to update notification settings");
            }

            setSuccess("Notification settings updated successfully");
        } catch (err: any) {
            console.error("Failed to update notification settings:", err);
            setError(err.message || "Failed to update notification settings. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    if (isLoading) {
        return (
            <div className="container mx-auto py-10">
                <div className="max-w-3xl mx-auto">
                    <Card>
                        <CardHeader>
                            <div className="w-48 h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
                            <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="w-full h-40 bg-gray-200 rounded animate-pulse"></div>
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
                        <CardTitle>Settings</CardTitle>
                        <CardDescription>You must be signed in to view your settings.</CardDescription>
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
            <div className="max-w-3xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Account Settings</CardTitle>
                        <CardDescription>
                            Manage your account settings and preferences
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="password" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="password">Password</TabsTrigger>
                                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                            </TabsList>

                            <TabsContent value="password" className="space-y-4 pt-4">
                                {success && (
                                    <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
                                        <CheckCircle2 className="h-4 w-4 mr-2" />
                                        <AlertDescription>{success}</AlertDescription>
                                    </Alert>
                                )}

                                {error && (
                                    <Alert className="mb-4 bg-red-50 text-red-800 border-red-200">
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}

                                <div className="space-y-2">
                                    <Label htmlFor="current-password">Current Password</Label>
                                    <Input
                                        id="current-password"
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        placeholder="Enter current password"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="new-password">New Password</Label>
                                    <Input
                                        id="new-password"
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Enter new password"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                                    <Input
                                        id="confirm-password"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm new password"
                                    />
                                </div>

                                <Button
                                    onClick={updatePassword}
                                    disabled={loading || !currentPassword || !newPassword || !confirmPassword}
                                    className="mt-4"
                                >
                                    {loading ? "Updating..." : "Update Password"}
                                </Button>
                            </TabsContent>

                            <TabsContent value="notifications" className="space-y-4 pt-4">
                                {success && (
                                    <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
                                        <CheckCircle2 className="h-4 w-4 mr-2" />
                                        <AlertDescription>{success}</AlertDescription>
                                    </Alert>
                                )}

                                {error && (
                                    <Alert className="mb-4 bg-red-50 text-red-800 border-red-200">
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="email-notifications">Email Notifications</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Receive email notifications about your account
                                            </p>
                                        </div>
                                        <Switch
                                            id="email-notifications"
                                            checked={emailNotifications}
                                            onCheckedChange={setEmailNotifications}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="sms-notifications">SMS Notifications</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Receive text message notifications about your account
                                            </p>
                                        </div>
                                        <Switch
                                            id="sms-notifications"
                                            checked={smsNotifications}
                                            onCheckedChange={setSmsNotifications}
                                        />
                                    </div>
                                </div>

                                <Button
                                    onClick={updateNotifications}
                                    disabled={loading}
                                    className="mt-4"
                                >
                                    {loading ? "Updating..." : "Save Notification Preferences"}
                                </Button>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 