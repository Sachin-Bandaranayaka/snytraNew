"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { useRestaurantTheme } from "@/context/restaurant-theme-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, Upload } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AppearanceSettingsPage() {
    const { user, isLoading: authLoading } = useAuth();
    const { settings, theme, isLoading: themeLoading, updateSettings, updateTheme } = useRestaurantTheme();

    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form state
    const [formSettings, setFormSettings] = useState({
        logoUrl: "",
        primaryColor: "#e85c2c",
        secondaryColor: "#f5f1e9",
        siteTitle: "",
        siteDescription: "",
        bannerImageUrl: "",
        footerText: "",
        metaDescription: "",
    });

    const [formTheme, setFormTheme] = useState({
        fontFamily: "Inter",
        menuLayout: "grid",
        heroStyle: "centered",
        accentColor: "#1a1a0f",
        buttonStyle: "rounded",
        customCSS: "",
    });

    // Update form when settings/theme load
    useEffect(() => {
        if (settings) {
            setFormSettings({
                logoUrl: settings.logoUrl || "",
                primaryColor: settings.primaryColor || "#e85c2c",
                secondaryColor: settings.secondaryColor || "#f5f1e9",
                siteTitle: settings.siteTitle || "",
                siteDescription: settings.siteDescription || "",
                bannerImageUrl: settings.bannerImageUrl || "",
                footerText: settings.footerText || "",
                metaDescription: settings.metaDescription || "",
            });
        }

        if (theme) {
            setFormTheme({
                fontFamily: theme.fontFamily || "Inter",
                menuLayout: theme.menuLayout || "grid",
                heroStyle: theme.heroStyle || "centered",
                accentColor: theme.accentColor || "#1a1a0f",
                buttonStyle: theme.buttonStyle || "rounded",
                customCSS: theme.customCSS || "",
            });
        }
    }, [settings, theme]);

    const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormSettings((prev) => ({ ...prev, [name]: value }));
    };

    const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormTheme((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormTheme((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveSettings = async () => {
        setIsSubmitting(true);
        setSuccess(null);
        setError(null);

        try {
            // Update settings
            await updateSettings(formSettings);

            // Update theme
            await updateTheme(formTheme);

            setSuccess("Appearance settings updated successfully");
        } catch (err: any) {
            console.error("Failed to update appearance settings:", err);
            setError(err.message || "Failed to update appearance settings");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Display loading state
    if (authLoading || themeLoading) {
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

    // Require authentication
    if (!user) {
        return (
            <div className="container mx-auto py-10">
                <Card className="max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle>Appearance Settings</CardTitle>
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
            <div className="max-w-4xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Appearance Settings</CardTitle>
                        <CardDescription>
                            Customize how your restaurant looks on your customer-facing website
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {success && (
                            <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                <AlertDescription>{success}</AlertDescription>
                            </Alert>
                        )}

                        {error && (
                            <Alert className="mb-6 bg-red-50 text-red-800 border-red-200">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <Tabs defaultValue="branding" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="branding">Branding</TabsTrigger>
                                <TabsTrigger value="layout">Layout & Style</TabsTrigger>
                                <TabsTrigger value="advanced">Advanced</TabsTrigger>
                            </TabsList>

                            {/* Branding Tab */}
                            <TabsContent value="branding" className="space-y-6 pt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="siteTitle">Restaurant Name</Label>
                                        <Input
                                            id="siteTitle"
                                            name="siteTitle"
                                            value={formSettings.siteTitle}
                                            onChange={handleSettingsChange}
                                            placeholder="e.g. ABC Cafe"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="logoUrl">Logo URL</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                id="logoUrl"
                                                name="logoUrl"
                                                value={formSettings.logoUrl}
                                                onChange={handleSettingsChange}
                                                placeholder="https://example.com/logo.png"
                                            />
                                            <Button variant="outline" size="icon">
                                                <Upload className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="siteDescription">Short Description</Label>
                                    <Textarea
                                        id="siteDescription"
                                        name="siteDescription"
                                        value={formSettings.siteDescription}
                                        onChange={handleSettingsChange}
                                        placeholder="A brief description of your restaurant"
                                        rows={2}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="primaryColor">Primary Color</Label>
                                        <div className="flex gap-2">
                                            <div
                                                className="w-10 h-10 rounded border"
                                                style={{ backgroundColor: formSettings.primaryColor }}
                                            ></div>
                                            <Input
                                                id="primaryColor"
                                                name="primaryColor"
                                                type="text"
                                                value={formSettings.primaryColor}
                                                onChange={handleSettingsChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="secondaryColor">Secondary Color</Label>
                                        <div className="flex gap-2">
                                            <div
                                                className="w-10 h-10 rounded border"
                                                style={{ backgroundColor: formSettings.secondaryColor }}
                                            ></div>
                                            <Input
                                                id="secondaryColor"
                                                name="secondaryColor"
                                                type="text"
                                                value={formSettings.secondaryColor}
                                                onChange={handleSettingsChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="accentColor">Accent Color</Label>
                                        <div className="flex gap-2">
                                            <div
                                                className="w-10 h-10 rounded border"
                                                style={{ backgroundColor: formTheme.accentColor }}
                                            ></div>
                                            <Input
                                                id="accentColor"
                                                name="accentColor"
                                                type="text"
                                                value={formTheme.accentColor}
                                                onChange={handleThemeChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="footerText">Footer Text</Label>
                                    <Input
                                        id="footerText"
                                        name="footerText"
                                        value={formSettings.footerText}
                                        onChange={handleSettingsChange}
                                        placeholder="Copyright text or short description"
                                    />
                                </div>
                            </TabsContent>

                            {/* Layout Tab */}
                            <TabsContent value="layout" className="space-y-6 pt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="fontFamily">Font Family</Label>
                                        <Select
                                            value={formTheme.fontFamily}
                                            onValueChange={(value) => handleSelectChange("fontFamily", value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a font" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Inter">Inter</SelectItem>
                                                <SelectItem value="Roboto">Roboto</SelectItem>
                                                <SelectItem value="Lato">Lato</SelectItem>
                                                <SelectItem value="Poppins">Poppins</SelectItem>
                                                <SelectItem value="Montserrat">Montserrat</SelectItem>
                                                <SelectItem value="Open Sans">Open Sans</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="buttonStyle">Button Style</Label>
                                        <Select
                                            value={formTheme.buttonStyle}
                                            onValueChange={(value) => handleSelectChange("buttonStyle", value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select button style" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="rounded">Rounded</SelectItem>
                                                <SelectItem value="pill">Pill</SelectItem>
                                                <SelectItem value="square">Square</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="menuLayout">Menu Layout</Label>
                                        <Select
                                            value={formTheme.menuLayout}
                                            onValueChange={(value) => handleSelectChange("menuLayout", value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select menu layout" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="grid">Grid</SelectItem>
                                                <SelectItem value="list">List</SelectItem>
                                                <SelectItem value="cards">Cards</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="heroStyle">Hero Section Style</Label>
                                        <Select
                                            value={formTheme.heroStyle}
                                            onValueChange={(value) => handleSelectChange("heroStyle", value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select hero style" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="centered">Centered</SelectItem>
                                                <SelectItem value="split">Split</SelectItem>
                                                <SelectItem value="fullscreen">Fullscreen</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="bannerImageUrl">Banner Image URL</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="bannerImageUrl"
                                            name="bannerImageUrl"
                                            value={formSettings.bannerImageUrl}
                                            onChange={handleSettingsChange}
                                            placeholder="https://example.com/banner.jpg"
                                        />
                                        <Button variant="outline" size="icon">
                                            <Upload className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </TabsContent>

                            {/* Advanced Tab */}
                            <TabsContent value="advanced" className="space-y-6 pt-6">
                                <div className="space-y-2">
                                    <Label htmlFor="metaDescription">Meta Description</Label>
                                    <Textarea
                                        id="metaDescription"
                                        name="metaDescription"
                                        value={formSettings.metaDescription}
                                        onChange={handleSettingsChange}
                                        placeholder="Description for search engines"
                                        rows={2}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="customCSS">Custom CSS</Label>
                                    <Textarea
                                        id="customCSS"
                                        name="customCSS"
                                        value={formTheme.customCSS}
                                        onChange={handleThemeChange}
                                        placeholder="Add custom CSS for advanced styling"
                                        rows={10}
                                        className="font-mono text-sm"
                                    />
                                    <p className="text-sm text-gray-500">
                                        Use with caution. Custom CSS may override default styles.
                                    </p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline">Preview</Button>
                        <Button
                            onClick={handleSaveSettings}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
} 