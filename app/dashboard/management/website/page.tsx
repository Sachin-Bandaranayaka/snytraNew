"use client"

import { useState, useEffect } from "react"
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
    ArrowRight
} from "lucide-react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

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
            heroImage: "https://placehold.co/1200x600",
            showHero: true,
            showAbout: true,
            showMenu: true,
            showGallery: true,
            showContact: true,
            aboutText: "Welcome to My Restaurant, where we serve delicious food made with fresh, locally-sourced ingredients. Our passionate chefs create memorable dining experiences that keep our customers coming back for more.",
            contactNumber: "(123) 456-7890",
            address: "123 Food Street, Cuisine City"
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

            const response = await fetch('/api/user/website', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ settings: websiteData.settings })
            })

            if (!response.ok) {
                throw new Error('Failed to save settings')
            }

            setIsSaving(false)
            toast({
                title: "Settings Saved",
                description: "Your website settings have been saved successfully.",
            })
        } catch (error) {
            console.error('Error saving website settings:', error)
            toast({
                title: "Error",
                description: "Failed to save your website settings. Please try again.",
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
                                <h3 className="text-lg font-medium">{websiteData.settings.siteTitle}</h3>
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
                            <Button variant="outline" size="sm" onClick={() => window.open(websiteData.websiteUrl, '_blank')}>
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
                                        value={websiteData.settings.siteTitle}
                                        onChange={(e) => setWebsiteData({
                                            ...websiteData,
                                            settings: {
                                                ...websiteData.settings,
                                                siteTitle: e.target.value
                                            }
                                        })}
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
                                        value={websiteData.settings.contactNumber}
                                        onChange={(e) => setWebsiteData({
                                            ...websiteData,
                                            settings: {
                                                ...websiteData.settings,
                                                contactNumber: e.target.value
                                            }
                                        })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input
                                        id="address"
                                        value={websiteData.settings.address}
                                        onChange={(e) => setWebsiteData({
                                            ...websiteData,
                                            settings: {
                                                ...websiteData.settings,
                                                address: e.target.value
                                            }
                                        })}
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
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="logoUrl">Restaurant Logo</Label>
                                    <div className="flex items-center space-x-4">
                                        <div className="h-16 w-16 rounded border flex items-center justify-center overflow-hidden">
                                            {websiteData.settings.logoUrl ? (
                                                <img
                                                    src={websiteData.settings.logoUrl}
                                                    alt="Logo"
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <ImageIcon className="h-8 w-8 text-gray-400" />
                                            )}
                                        </div>
                                        <Button variant="outline">
                                            Upload Logo
                                        </Button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="heroImage">Hero Image</Label>
                                    <div className="flex items-center space-x-4">
                                        <div className="h-16 w-24 rounded border flex items-center justify-center overflow-hidden">
                                            {websiteData.settings.heroImage ? (
                                                <img
                                                    src={websiteData.settings.heroImage}
                                                    alt="Hero"
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <ImageIcon className="h-8 w-8 text-gray-400" />
                                            )}
                                        </div>
                                        <Button variant="outline">
                                            Upload Image
                                        </Button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="primaryColor">Primary Color</Label>
                                    <div className="flex items-center space-x-2">
                                        <div
                                            className="h-8 w-8 rounded-full border"
                                            style={{ backgroundColor: websiteData.settings.primaryColor }}
                                        />
                                        <Input
                                            id="primaryColor"
                                            type="text"
                                            value={websiteData.settings.primaryColor}
                                            onChange={(e) => setWebsiteData({
                                                ...websiteData,
                                                settings: {
                                                    ...websiteData.settings,
                                                    primaryColor: e.target.value
                                                }
                                            })}
                                        />
                                    </div>
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
                                        checked={websiteData.settings.showHero}
                                        onCheckedChange={(checked) => setWebsiteData({
                                            ...websiteData,
                                            settings: {
                                                ...websiteData.settings,
                                                showHero: checked
                                            }
                                        })}
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
                                        checked={websiteData.settings.showAbout}
                                        onCheckedChange={(checked) => setWebsiteData({
                                            ...websiteData,
                                            settings: {
                                                ...websiteData.settings,
                                                showAbout: checked
                                            }
                                        })}
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
                                        checked={websiteData.settings.showMenu}
                                        onCheckedChange={(checked) => setWebsiteData({
                                            ...websiteData,
                                            settings: {
                                                ...websiteData.settings,
                                                showMenu: checked
                                            }
                                        })}
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
                                        checked={websiteData.settings.showGallery}
                                        onCheckedChange={(checked) => setWebsiteData({
                                            ...websiteData,
                                            settings: {
                                                ...websiteData.settings,
                                                showGallery: checked
                                            }
                                        })}
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
                                        checked={websiteData.settings.showContact}
                                        onCheckedChange={(checked) => setWebsiteData({
                                            ...websiteData,
                                            settings: {
                                                ...websiteData.settings,
                                                showContact: checked
                                            }
                                        })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 pt-4 border-t">
                                <Label htmlFor="aboutText">About Text</Label>
                                <textarea
                                    id="aboutText"
                                    rows={4}
                                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={websiteData.settings.aboutText}
                                    onChange={(e) => setWebsiteData({
                                        ...websiteData,
                                        settings: {
                                            ...websiteData.settings,
                                            aboutText: e.target.value
                                        }
                                    })}
                                    disabled={!websiteData.settings.showAbout}
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