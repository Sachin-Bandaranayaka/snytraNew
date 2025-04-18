"use client"

// Add TypeScript declaration
declare global {
    interface Window {
        previewWindow: Window | null;
    }
}

import React, { useState, useEffect } from "react"
import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import {
    Globe,
    Laptop,
    Palette,
    CircleOff,
    ImageIcon,
    LayoutGrid,
    MenuIcon,
    Share2,
    Rocket,
    AlertTriangle,
    ArrowRight,
    Type,
    Square,
    Circle,
    CornerDownRight
} from "lucide-react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export default function WebsiteManagementPage() {
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [isPublishing, setIsPublishing] = useState(false)

    // Website data
    const [websiteData, setWebsiteData] = useState({
        websiteUrl: "https://my-restaurant.snytra.com",
        isActive: true,
        settings: {
            siteTitle: "My Restaurant",
            logoUrl: "https://placehold.co/200x200",
            primaryColor: "#e85c2c",
            secondaryColor: "#f8f5eb",
            heroImage: "https://placehold.co/1200x600",
            showHero: true,
            showAbout: true,
            showMenu: true,
            showGallery: true,
            showContact: true,
            aboutText: "Welcome to My Restaurant, where we serve delicious food made with fresh, locally-sourced ingredients. Our passionate chefs create memorable dining experiences that keep our customers coming back for more.",
            contactNumber: "(123) 456-7890",
            address: "123 Food Street, Cuisine City",
            fontFamily: "Inter",
            buttonStyle: "rounded",
            accentColor: "#1a1a0f",
            heroStyle: "centered"
        }
    })

    useEffect(() => {
        // Fetch website data from API
        const fetchWebsiteData = async () => {
            try {
                setIsLoading(true)
                const response = await fetch('/api/user/website')

                if (response.ok) {
                    const data = await response.json()
                    setWebsiteData(data)
                } else {
                    console.error('Failed to fetch website data')
                    toast({
                        title: "Error",
                        description: "Failed to load website data. Please refresh and try again.",
                        variant: "destructive",
                    })
                }
            } catch (error) {
                console.error('Error fetching website data:', error)
                toast({
                    title: "Error",
                    description: "An error occurred while loading your website data.",
                    variant: "destructive",
                })
            } finally {
                setIsLoading(false)
            }
        }

        // Fetch the real data
        fetchWebsiteData()
    }, [toast])

    // Save website settings
    const handleSaveSettings = async () => {
        try {
            setIsSaving(true)

            // Create default settings if none exist
            const settings = websiteData.settings || {
                siteTitle: "My Restaurant",
                logoUrl: "",
                primaryColor: "#e85c2c",
                secondaryColor: "#f8f5eb",
                heroImage: "",
                showHero: true,
                showAbout: true,
                showMenu: true,
                showGallery: true,
                showContact: true,
                aboutText: "",
                contactNumber: "",
                address: "",
            };

            // Extract theme-related properties from settings
            const theme = {
                fontFamily: settings.fontFamily || "Inter",
                buttonStyle: settings.buttonStyle || "rounded",
                accentColor: settings.accentColor || "#1a1a0f",
                heroStyle: settings.heroStyle || "centered",
                menuLayout: settings.menuLayout || "grid",
                customCSS: settings.customCSS || "",
            };

            // First save the website settings
            const websiteResponse = await fetch('/api/user/website', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ settings })
            });

            if (!websiteResponse.ok) {
                const data = await websiteResponse.json();
                throw new Error(data?.error || 'Failed to save website settings');
            }

            // Then save the theme settings separately
            const themeResponse = await fetch('/api/restaurant-theme', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    settings: {
                        primaryColor: settings.primaryColor,
                        secondaryColor: settings.secondaryColor,
                        siteTitle: settings.siteTitle,
                        logoUrl: settings.logoUrl,
                        address: settings.address,
                        phone: settings.contactNumber,
                    },
                    theme
                })
            });

            if (!themeResponse.ok) {
                const data = await themeResponse.json();
                throw new Error(data?.error || 'Failed to save theme settings');
            }

            setIsSaving(false)
            toast({
                title: "Settings Saved",
                description: "Your website and theme settings have been saved successfully.",
            })

            // More reliable preview refresh mechanism
            if (window.previewWindow && !window.previewWindow.closed) {
                try {
                    // First try: Direct reload
                    window.previewWindow.location.reload();
                    console.log("Preview window reloaded directly");
                } catch (e) {
                    try {
                        // Second try: Use postMessage API for cross-origin communication
                        window.previewWindow.postMessage({
                            type: 'RELOAD_PREVIEW',
                            timestamp: Date.now()
                        }, '*');
                        console.log("Used postMessage to request preview reload");
                    } catch (e2) {
                        // Third try: Use localStorage as fallback
                        localStorage.setItem('snytra_preview_refresh', Date.now().toString());
                        console.log("Used localStorage to trigger preview reload");
                    }
                }

                // If preview has a preview query param, refresh that preview specifically
                if (window.previewWindow.location.href.includes('preview=')) {
                    try {
                        // Add cache-busting parameter
                        const currentUrl = new URL(window.previewWindow.location.href);
                        currentUrl.searchParams.set('cache_bust', Date.now().toString());
                        window.previewWindow.location.href = currentUrl.toString();
                        console.log("Reloaded preview with cache busting");
                    } catch (e) {
                        console.log("Could not reload preview with cache busting");
                    }
                }
            }

            // Refetch data to ensure UI is up to date
            fetchWebsiteData();

        } catch (error) {
            console.error('Error saving website settings:', error)
            toast({
                title: "Error",
                description: error.message || "Failed to save your website settings. Please try again.",
                variant: "destructive",
            })
            setIsSaving(false)
        }
    }

    // Publish website changes
    const handlePublishWebsite = async () => {
        try {
            setIsPublishing(true)

            const response = await fetch('/api/user/website/publish', {
                method: 'POST'
            })

            if (!response.ok) {
                throw new Error('Failed to publish website')
            }

            setIsPublishing(false)
            toast({
                title: "Website Published",
                description: "Your website changes have been published successfully.",
            })
        } catch (error) {
            console.error('Error publishing website:', error)
            toast({
                title: "Error",
                description: "Failed to publish your website changes. Please try again.",
                variant: "destructive",
            })
            setIsPublishing(false)
        }
    }

    // Create a function to update settings
    const updateSettings = (key, value) => {
        setWebsiteData(prev => ({
            ...prev,
            settings: {
                ...(prev.settings || {}),
                [key]: value
            }
        }));
    }

    // Function to open preview in new window
    const openPreview = () => {
        const previewUrl = process.env.NODE_ENV === 'development'
            ? '/preview'
            : websiteData.websiteUrl;

        window.previewWindow = window.open(previewUrl, '_blank');
    }

    if (isLoading) {
        return (
            <div className="flex flex-col p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold">Website Management</h1>
                </div>
                <div className="grid gap-6">
                    <Card className="animate-pulse">
                        <CardHeader className="h-16 bg-gray-200 rounded-t-lg" />
                        <CardContent className="p-6">
                            <div className="h-48 bg-gray-200 rounded" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Website Management</h1>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleSaveSettings} disabled={isSaving}>
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </Button>
                    <Button onClick={handlePublishWebsite} disabled={isPublishing}>
                        {isPublishing ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Publishing...
                            </>
                        ) : (
                            <>
                                <Rocket className="mr-2 h-4 w-4" /> Publish Website
                            </>
                        )}
                    </Button>
                </div>
            </div>

            {/* Website Preview Card */}
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Globe className="mr-2 h-5 w-5" />
                        Your Restaurant Website
                    </CardTitle>
                    <CardDescription>
                        Preview and manage your customer-facing website
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                            <div className="flex items-center">
                                <h3 className="text-lg font-medium">{websiteData.settings?.siteTitle || "My Restaurant"}</h3>
                                <span className="mx-2 text-gray-400">•</span>
                                <span className="text-sm text-gray-500">{websiteData.websiteUrl}</span>
                            </div>
                            <div className="flex items-center mt-1">
                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${websiteData.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                    {websiteData.isActive ? 'Active' : 'Inactive'}
                                </span>
                                {websiteData.isActive && (
                                    <span className="text-sm text-gray-500 ml-2">
                                        Last published 2 days ago
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={openPreview}>
                                <Laptop className="mr-2 h-4 w-4" /> Preview
                            </Button>
                            <Button variant="outline" size="sm">
                                <Share2 className="mr-2 h-4 w-4" /> Share
                            </Button>
                        </div>
                    </div>

                    {!websiteData.isActive && (
                        <div className="flex items-center p-4 text-amber-800 bg-amber-50 rounded-lg">
                            <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                            <div>
                                <p className="font-medium">Your website is currently inactive</p>
                                <p className="text-sm">This could be due to an inactive subscription. Please check your subscription status.</p>
                            </div>
                            <Button variant="link" className="ml-auto" asChild>
                                <a href="/dashboard/subscription">View Subscription <ArrowRight className="ml-1 h-4 w-4" /></a>
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Website Settings Tabs */}
            <Tabs defaultValue="general" className="w-full">
                <TabsList className="mb-4">
                    <TabsTrigger value="general">
                        <Globe className="mr-2 h-4 w-4" />
                        General
                    </TabsTrigger>
                    <TabsTrigger value="appearance">
                        <Palette className="mr-2 h-4 w-4" />
                        Appearance
                    </TabsTrigger>
                    <TabsTrigger value="content">
                        <LayoutGrid className="mr-2 h-4 w-4" />
                        Content
                    </TabsTrigger>
                    <TabsTrigger value="menu">
                        <MenuIcon className="mr-2 h-4 w-4" />
                        Menu Display
                    </TabsTrigger>
                </TabsList>

                {/* General Settings */}
                <TabsContent value="general">
                    <Card>
                        <CardHeader>
                            <CardTitle>General Settings</CardTitle>
                            <CardDescription>Basic information for your restaurant website</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="siteTitle">Website Title</Label>
                                    <Input
                                        id="siteTitle"
                                        value={websiteData.settings?.siteTitle || ""}
                                        onChange={(e) => updateSettings('siteTitle', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="websiteUrl">Website URL</Label>
                                    <div className="flex items-center">
                                        <Input
                                            id="websiteUrl"
                                            value={websiteData.websiteUrl}
                                            readOnly
                                            className="bg-gray-50"
                                        />
                                        <Button variant="ghost" size="sm" className="ml-2">
                                            Customize
                                        </Button>
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        To use a custom domain, update it in Settings
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="contactNumber">Contact Number</Label>
                                    <Input
                                        id="contactNumber"
                                        value={websiteData.settings?.contactNumber || ""}
                                        onChange={(e) => updateSettings('contactNumber', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input
                                        id="address"
                                        value={websiteData.settings?.address || ""}
                                        onChange={(e) => updateSettings('address', e.target.value)}
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="justify-between">
                            <Button variant="outline" type="button">
                                Reset to Default
                            </Button>
                            <Button type="button" onClick={handleSaveSettings} disabled={isSaving}>
                                {isSaving ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* Appearance Settings */}
                <TabsContent value="appearance">
                    <Card>
                        <CardHeader>
                            <CardTitle>Appearance Settings</CardTitle>
                            <CardDescription>Customize the look and feel of your website</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Branding Section */}
                            <div>
                                <h3 className="text-lg font-medium mb-4">Branding</h3>
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="logoUrl">Restaurant Logo</Label>
                                        <div className="flex items-center space-x-4">
                                            <div className="h-16 w-16 rounded border flex items-center justify-center overflow-hidden bg-gray-50">
                                                {websiteData.settings?.logoUrl ? (
                                                    <img
                                                        src={websiteData.settings?.logoUrl}
                                                        alt="Logo"
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <ImageIcon className="h-8 w-8 text-gray-400" />
                                                )}
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <Input
                                                    id="logoUrl"
                                                    placeholder="Enter logo URL"
                                                    value={websiteData.settings?.logoUrl || ""}
                                                    onChange={(e) => updateSettings('logoUrl', e.target.value)}
                                                    className="w-full"
                                                />
                                                <Button variant="outline" size="sm">
                                                    Upload Logo
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="heroImage">Hero Banner Image</Label>
                                        <div className="flex items-center space-x-4">
                                            <div className="h-16 w-24 rounded border flex items-center justify-center overflow-hidden bg-gray-50">
                                                {websiteData.settings?.heroImage ? (
                                                    <img
                                                        src={websiteData.settings?.heroImage}
                                                        alt="Hero"
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <ImageIcon className="h-8 w-8 text-gray-400" />
                                                )}
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <Input
                                                    id="heroImage"
                                                    placeholder="Enter banner image URL"
                                                    value={websiteData.settings?.heroImage || ""}
                                                    onChange={(e) => updateSettings('heroImage', e.target.value)}
                                                    className="w-full"
                                                />
                                                <Button variant="outline" size="sm">
                                                    Upload Image
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Color Schemes */}
                            <div className="border-t pt-6">
                                <h3 className="text-lg font-medium mb-4">Color Scheme</h3>
                                <div className="grid gap-6 md:grid-cols-3">
                                    <div className="space-y-2">
                                        <Label htmlFor="primaryColor">Primary Color</Label>
                                        <div className="flex items-center space-x-2">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        className="w-10 h-10 p-0 rounded-md"
                                                        style={{ backgroundColor: websiteData.settings?.primaryColor || "#e85c2c" }}
                                                    >
                                                        <span className="sr-only">Pick a color</span>
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-64">
                                                    <div className="grid grid-cols-5 gap-2">
                                                        {["#e85c2c", "#3b82f6", "#10b981", "#f59e0b", "#ef4444",
                                                            "#8b5cf6", "#ec4899", "#14b8a6", "#f97316", "#8F8F8F",
                                                            "#64748b", "#334155", "#1f2937", "#0f172a", "#020617"]
                                                            .map((color) => (
                                                                <Button
                                                                    key={color}
                                                                    variant="outline"
                                                                    className="w-10 h-10 p-0 rounded-md"
                                                                    style={{ backgroundColor: color }}
                                                                    onClick={() => updateSettings('primaryColor', color)}
                                                                />
                                                            ))}
                                                    </div>
                                                    <div className="flex items-center space-x-2 mt-4">
                                                        <div
                                                            className="w-8 h-8 rounded-md border"
                                                            style={{ backgroundColor: websiteData.settings?.primaryColor || "#e85c2c" }}
                                                        />
                                                        <Input
                                                            id="primaryColor"
                                                            value={websiteData.settings?.primaryColor || "#e85c2c"}
                                                            onChange={(e) => updateSettings('primaryColor', e.target.value)}
                                                        />
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                            <Input
                                                id="primaryColor"
                                                value={websiteData.settings?.primaryColor || "#e85c2c"}
                                                onChange={(e) => updateSettings('primaryColor', e.target.value)}
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500">Used for buttons, links and accents</p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="secondaryColor">Secondary Color</Label>
                                        <div className="flex items-center space-x-2">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        className="w-10 h-10 p-0 rounded-md"
                                                        style={{ backgroundColor: websiteData.settings?.secondaryColor || "#f8f5eb" }}
                                                    >
                                                        <span className="sr-only">Pick a color</span>
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-64">
                                                    <div className="grid grid-cols-5 gap-2">
                                                        {["#f8f5eb", "#ffffff", "#f9fafb", "#f1f5f9", "#f8fafc",
                                                            "#f4f4f5", "#e5e7eb", "#e2e8f0", "#dbeafe", "#ede9fe",
                                                            "#fef2f2", "#fff7ed", "#fef3c7", "#ecfdf5", "#f0fdfa"]
                                                            .map((color) => (
                                                                <Button
                                                                    key={color}
                                                                    variant="outline"
                                                                    className="w-10 h-10 p-0 rounded-md"
                                                                    style={{ backgroundColor: color }}
                                                                    onClick={() => updateSettings('secondaryColor', color)}
                                                                />
                                                            ))}
                                                    </div>
                                                    <div className="flex items-center space-x-2 mt-4">
                                                        <div
                                                            className="w-8 h-8 rounded-md border"
                                                            style={{ backgroundColor: websiteData.settings?.secondaryColor || "#f8f5eb" }}
                                                        />
                                                        <Input
                                                            id="secondaryColor"
                                                            value={websiteData.settings?.secondaryColor || "#f8f5eb"}
                                                            onChange={(e) => updateSettings('secondaryColor', e.target.value)}
                                                        />
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                            <Input
                                                id="secondaryColor"
                                                value={websiteData.settings?.secondaryColor || "#f8f5eb"}
                                                onChange={(e) => updateSettings('secondaryColor', e.target.value)}
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500">Used for backgrounds and content areas</p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="accentColor">Accent Color</Label>
                                        <div className="flex items-center space-x-2">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        className="w-10 h-10 p-0 rounded-md"
                                                        style={{ backgroundColor: websiteData.settings?.accentColor || "#1a1a0f" }}
                                                    >
                                                        <span className="sr-only">Pick a color</span>
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-64">
                                                    <div className="grid grid-cols-5 gap-2">
                                                        {["#1a1a0f", "#000000", "#111827", "#1e293b", "#0f172a",
                                                            "#18181b", "#27272a", "#334155", "#1f2937", "#374151",
                                                            "#4b5563", "#6b7280", "#475569", "#64748b", "#4b505b"]
                                                            .map((color) => (
                                                                <Button
                                                                    key={color}
                                                                    variant="outline"
                                                                    className="w-10 h-10 p-0 rounded-md"
                                                                    style={{ backgroundColor: color }}
                                                                    onClick={() => updateSettings('accentColor', color)}
                                                                />
                                                            ))}
                                                    </div>
                                                    <div className="flex items-center space-x-2 mt-4">
                                                        <div
                                                            className="w-8 h-8 rounded-md border"
                                                            style={{ backgroundColor: websiteData.settings?.accentColor || "#1a1a0f" }}
                                                        />
                                                        <Input
                                                            id="accentColor"
                                                            value={websiteData.settings?.accentColor || "#1a1a0f"}
                                                            onChange={(e) => updateSettings('accentColor', e.target.value)}
                                                        />
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                            <Input
                                                id="accentColor"
                                                value={websiteData.settings?.accentColor || "#1a1a0f"}
                                                onChange={(e) => updateSettings('accentColor', e.target.value)}
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500">Used for header and footer backgrounds</p>
                                    </div>
                                </div>
                            </div>

                            {/* Typography and Layout */}
                            <div className="border-t pt-6">
                                <h3 className="text-lg font-medium mb-4">Typography & Layout</h3>
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="fontFamily">Font Family</Label>
                                        <Select
                                            value={websiteData.settings?.fontFamily || "Inter"}
                                            onValueChange={(value) => updateSettings('fontFamily', value)}
                                        >
                                            <SelectTrigger id="fontFamily" className="w-full">
                                                <SelectValue placeholder="Select font">
                                                    <div className="flex items-center">
                                                        <Type className="mr-2 h-4 w-4" />
                                                        {websiteData.settings?.fontFamily || "Inter"}
                                                    </div>
                                                </SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Inter">
                                                    <div className="flex items-center">
                                                        <Type className="mr-2 h-4 w-4" />
                                                        Inter (Modern, Clean)
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="Roboto">
                                                    <div className="flex items-center">
                                                        <Type className="mr-2 h-4 w-4" />
                                                        Roboto (Professional)
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="Poppins">
                                                    <div className="flex items-center">
                                                        <Type className="mr-2 h-4 w-4" />
                                                        Poppins (Friendly, Rounded)
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="Playfair Display">
                                                    <div className="flex items-center">
                                                        <Type className="mr-2 h-4 w-4" />
                                                        Playfair Display (Elegant, Serif)
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="Montserrat">
                                                    <div className="flex items-center">
                                                        <Type className="mr-2 h-4 w-4" />
                                                        Montserrat (Bold, Confident)
                                                    </div>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <p className="text-xs text-gray-500">Main font used throughout your website</p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="buttonStyle">Button Style</Label>
                                        <Select
                                            value={websiteData.settings?.buttonStyle || "rounded"}
                                            onValueChange={(value) => updateSettings('buttonStyle', value)}
                                        >
                                            <SelectTrigger id="buttonStyle" className="w-full">
                                                <SelectValue placeholder="Select button style">
                                                    <div className="flex items-center">
                                                        {websiteData.settings?.buttonStyle === "squared" && <Square className="mr-2 h-4 w-4" />}
                                                        {websiteData.settings?.buttonStyle === "rounded" && <CornerDownRight className="mr-2 h-4 w-4" />}
                                                        {websiteData.settings?.buttonStyle === "pill" && <Circle className="mr-2 h-4 w-4" />}
                                                        {websiteData.settings?.buttonStyle || "Rounded"}
                                                    </div>
                                                </SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="squared">
                                                    <div className="flex items-center">
                                                        <Square className="mr-2 h-4 w-4" />
                                                        Squared (Modern)
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="rounded">
                                                    <div className="flex items-center">
                                                        <CornerDownRight className="mr-2 h-4 w-4" />
                                                        Rounded (Default)
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="pill">
                                                    <div className="flex items-center">
                                                        <Circle className="mr-2 h-4 w-4" />
                                                        Pill Shaped (Friendly)
                                                    </div>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <p className="text-xs text-gray-500">Style of buttons throughout your website</p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="heroStyle">Hero Style</Label>
                                        <Select
                                            value={websiteData.settings?.heroStyle || "centered"}
                                            onValueChange={(value) => updateSettings('heroStyle', value)}
                                        >
                                            <SelectTrigger id="heroStyle" className="w-full">
                                                <SelectValue placeholder="Select hero style">
                                                    {websiteData.settings?.heroStyle || "Centered"}
                                                </SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="centered">Centered (Classic)</SelectItem>
                                                <SelectItem value="left-aligned">Left Aligned (Modern)</SelectItem>
                                                <SelectItem value="image-background">Full Background Image</SelectItem>
                                                <SelectItem value="video">Video Background</SelectItem>
                                                <SelectItem value="split">Split (Text & Image)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <p className="text-xs text-gray-500">Layout style for your hero section</p>
                                    </div>
                                </div>
                            </div>

                            {/* Color Preview */}
                            <div className="border-t pt-6">
                                <h3 className="text-lg font-medium mb-4">Preview</h3>
                                <div className="rounded-md overflow-hidden border">
                                    <div
                                        className="p-4 flex items-center justify-between"
                                        style={{ backgroundColor: websiteData.settings?.accentColor || "#1a1a0f", color: "#fff" }}
                                    >
                                        <div className="font-bold" style={{ fontFamily: websiteData.settings?.fontFamily || "Inter" }}>Header</div>
                                    </div>
                                    <div
                                        className="p-6 min-h-[120px]"
                                        style={{ backgroundColor: websiteData.settings?.secondaryColor || "#f8f5eb" }}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div
                                                className={`px-4 py-2 text-white ${websiteData.settings?.buttonStyle === "squared" ? "rounded-none" :
                                                    websiteData.settings?.buttonStyle === "pill" ? "rounded-full" : "rounded-md"
                                                    }`}
                                                style={{
                                                    backgroundColor: websiteData.settings?.primaryColor || "#e85c2c",
                                                    fontFamily: websiteData.settings?.fontFamily || "Inter"
                                                }}
                                            >
                                                Primary Button
                                            </div>
                                            <div
                                                className={`px-4 py-2 border ${websiteData.settings?.buttonStyle === "squared" ? "rounded-none" :
                                                    websiteData.settings?.buttonStyle === "pill" ? "rounded-full" : "rounded-md"
                                                    }`}
                                                style={{
                                                    borderColor: websiteData.settings?.primaryColor || "#e85c2c",
                                                    color: websiteData.settings?.primaryColor || "#e85c2c",
                                                    fontFamily: websiteData.settings?.fontFamily || "Inter"
                                                }}
                                            >
                                                Secondary Button
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="justify-between">
                            <Button
                                variant="outline"
                                type="button"
                                onClick={() => {
                                    // Reset to default appearance settings
                                    const defaultSettings = {
                                        ...websiteData.settings,
                                        primaryColor: "#e85c2c",
                                        secondaryColor: "#f8f5eb",
                                        accentColor: "#1a1a0f",
                                        fontFamily: "Inter",
                                        buttonStyle: "rounded",
                                        heroStyle: "centered"
                                    };
                                    setWebsiteData(prev => ({
                                        ...prev,
                                        settings: defaultSettings
                                    }));
                                }}
                            >
                                Reset to Default
                            </Button>
                            <Button type="button" onClick={handleSaveSettings} disabled={isSaving}>
                                {isSaving ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* Content Settings */}
                <TabsContent value="content">
                    <Card>
                        <CardHeader>
                            <CardTitle>Content Settings</CardTitle>
                            <CardDescription>Manage which sections appear on your website</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Hero Section</Label>
                                        <p className="text-sm text-gray-500">
                                            Show a banner image at the top of your website
                                        </p>
                                    </div>
                                    <Switch
                                        checked={websiteData.settings?.showHero ?? true}
                                        onCheckedChange={(checked) => updateSettings('showHero', checked)}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>About Section</Label>
                                        <p className="text-sm text-gray-500">
                                            Show information about your restaurant
                                        </p>
                                    </div>
                                    <Switch
                                        checked={websiteData.settings?.showAbout ?? true}
                                        onCheckedChange={(checked) => updateSettings('showAbout', checked)}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Menu Section</Label>
                                        <p className="text-sm text-gray-500">
                                            Display your restaurant menu
                                        </p>
                                    </div>
                                    <Switch
                                        checked={websiteData.settings?.showMenu ?? true}
                                        onCheckedChange={(checked) => updateSettings('showMenu', checked)}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Gallery Section</Label>
                                        <p className="text-sm text-gray-500">
                                            Show images of your restaurant and food
                                        </p>
                                    </div>
                                    <Switch
                                        checked={websiteData.settings?.showGallery ?? true}
                                        onCheckedChange={(checked) => updateSettings('showGallery', checked)}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Contact Section</Label>
                                        <p className="text-sm text-gray-500">
                                            Show contact information and form
                                        </p>
                                    </div>
                                    <Switch
                                        checked={websiteData.settings?.showContact ?? true}
                                        onCheckedChange={(checked) => updateSettings('showContact', checked)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 pt-4 border-t">
                                <Label htmlFor="aboutText">About Text</Label>
                                <textarea
                                    id="aboutText"
                                    rows={4}
                                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={websiteData.settings?.aboutText || ""}
                                    onChange={(e) => updateSettings('aboutText', e.target.value)}
                                    disabled={!websiteData.settings?.showAbout}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="justify-between">
                            <Button variant="outline" type="button">
                                Reset to Default
                            </Button>
                            <Button type="button" onClick={handleSaveSettings} disabled={isSaving}>
                                {isSaving ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* Menu Display Settings */}
                <TabsContent value="menu">
                    <Card>
                        <CardHeader>
                            <CardTitle>Menu Display Settings</CardTitle>
                            <CardDescription>Configure how your menu is displayed on the website</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                                <div>
                                    <h3 className="font-medium">Menu Items</h3>
                                    <p className="text-sm text-gray-500">
                                        Manage your menu items in the Menu Management section
                                    </p>
                                </div>
                                <Button asChild>
                                    <a href="/dashboard/management/menu">
                                        Go to Menu Management
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </a>
                                </Button>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Show Menu Prices</Label>
                                        <p className="text-sm text-gray-500">
                                            Display prices for menu items on your website
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Show Item Images</Label>
                                        <p className="text-sm text-gray-500">
                                            Display images alongside menu items
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Enable Online Ordering</Label>
                                        <p className="text-sm text-gray-500">
                                            Allow customers to place orders through your website
                                        </p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="justify-between">
                            <Button variant="outline" type="button">
                                Reset to Default
                            </Button>
                            <Button type="button" onClick={handleSaveSettings} disabled={isSaving}>
                                {isSaving ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
} 