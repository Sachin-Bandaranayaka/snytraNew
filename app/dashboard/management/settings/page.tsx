"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Settings, Save, Upload, Palette, Globe, Clock, Phone, Mail, FileText, Store } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)

    // Company Settings
    const [companySettings, setCompanySettings] = useState({
        name: "My Restaurant",
        description: "A delicious place to eat",
        address: "123 Food Street, Cuisine City",
        phone: "(123) 456-7890",
        email: "info@myrestaurant.com",
        businessHours: "Mon-Fri: 9am-10pm, Sat-Sun: 10am-11pm",
        logoUrl: "https://placehold.co/200x200",
        primaryColor: "#e85c2c",
        secondaryColor: "#f8f5eb",
        customDomain: "",
        socialMedia: {
            facebook: "",
            instagram: "",
            twitter: ""
        }
    })

    // System Settings
    const [systemSettings, setSystemSettings] = useState({
        taxEnabled: true,
        taxRate: "18",
        onlineOrderingEnabled: true,
        allowGuestOrders: true,
        requireTableNumber: false,
        autoAcceptOrders: false,
        orderNotifications: true,
        lowStockAlerts: true,
        printReceipts: true,
        tipOptions: "0,5,10,15,20",
        currency: "₹",
        language: "en"
    })

    useEffect(() => {
        // Simulate API call to load settings
        const timer = setTimeout(() => {
            // In a real implementation, this would be replaced with an actual API call
            setIsLoading(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [])

    // Handle saving settings
    const handleSaveSettings = async (type: "company" | "system") => {
        setIsSaving(true)

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        // In a real implementation, this would be an API call to save settings
        console.log(`Saving ${type} settings:`, type === "company" ? companySettings : systemSettings)

        setIsSaving(false)
        toast({
            title: "Settings Saved",
            description: `Your ${type} settings have been updated successfully.`,
        })
    }

    if (isLoading) {
        return (
            <div className="flex flex-col p-6">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold">Settings</h1>
                </div>
                <div className="grid gap-6">
                    <Card className="animate-pulse">
                        <CardHeader className="h-16 bg-gray-200 rounded-t-lg" />
                        <CardContent className="p-6">
                            <div className="space-y-4">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className="space-y-2">
                                        <div className="h-4 bg-gray-200 rounded w-1/4" />
                                        <div className="h-10 bg-gray-200 rounded" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Settings</h1>
            </div>

            <Tabs defaultValue="company" className="w-full">
                <TabsList className="mb-4">
                    <TabsTrigger value="company">
                        <Store className="mr-2 h-4 w-4" />
                        Company Settings
                    </TabsTrigger>
                    <TabsTrigger value="system">
                        <Settings className="mr-2 h-4 w-4" />
                        System Settings
                    </TabsTrigger>
                </TabsList>

                {/* Company Settings */}
                <TabsContent value="company">
                    <Card>
                        <CardHeader>
                            <CardTitle>Company Information</CardTitle>
                            <CardDescription>
                                Manage your restaurant's basic information and branding settings.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Basic Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Basic Information</h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="companyName">Restaurant Name</Label>
                                        <Input
                                            id="companyName"
                                            value={companySettings.name}
                                            onChange={e => setCompanySettings({ ...companySettings, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <div className="flex">
                                            <Mail className="mr-2 h-4 w-4 text-gray-500 self-center" />
                                            <Input
                                                id="email"
                                                type="email"
                                                value={companySettings.email}
                                                onChange={e => setCompanySettings({ ...companySettings, email: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <div className="flex">
                                            <Phone className="mr-2 h-4 w-4 text-gray-500 self-center" />
                                            <Input
                                                id="phone"
                                                value={companySettings.phone}
                                                onChange={e => setCompanySettings({ ...companySettings, phone: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="businessHours">Business Hours</Label>
                                        <div className="flex">
                                            <Clock className="mr-2 h-4 w-4 text-gray-500 self-center" />
                                            <Input
                                                id="businessHours"
                                                value={companySettings.businessHours}
                                                onChange={e => setCompanySettings({ ...companySettings, businessHours: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="address">Address</Label>
                                        <Textarea
                                            id="address"
                                            value={companySettings.address}
                                            onChange={e => setCompanySettings({ ...companySettings, address: e.target.value })}
                                            rows={2}
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="description">Restaurant Description</Label>
                                        <Textarea
                                            id="description"
                                            value={companySettings.description}
                                            onChange={e => setCompanySettings({ ...companySettings, description: e.target.value })}
                                            placeholder="Write a short description of your restaurant"
                                            rows={3}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Branding */}
                            <div className="space-y-4 pt-4 border-t">
                                <h3 className="text-lg font-medium">Branding</h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="logo">Restaurant Logo</Label>
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={companySettings.logoUrl}
                                                alt="Restaurant Logo"
                                                className="w-16 h-16 object-cover rounded-md"
                                            />
                                            <Button variant="outline" className="flex-1">
                                                <Upload className="mr-2 h-4 w-4" /> Upload Logo
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="customDomain">Custom Domain</Label>
                                        <div className="flex">
                                            <Globe className="mr-2 h-4 w-4 text-gray-500 self-center" />
                                            <Input
                                                id="customDomain"
                                                value={companySettings.customDomain}
                                                onChange={e => setCompanySettings({ ...companySettings, customDomain: e.target.value })}
                                                placeholder="yourrestaurant.com"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500">Leave blank to use default subdomain</p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="primaryColor">Primary Color</Label>
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-8 h-8 rounded-md border"
                                                style={{ backgroundColor: companySettings.primaryColor }}
                                            />
                                            <div className="flex-1">
                                                <Input
                                                    id="primaryColor"
                                                    value={companySettings.primaryColor}
                                                    onChange={e => setCompanySettings({ ...companySettings, primaryColor: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="secondaryColor">Secondary Color</Label>
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-8 h-8 rounded-md border"
                                                style={{ backgroundColor: companySettings.secondaryColor }}
                                            />
                                            <div className="flex-1">
                                                <Input
                                                    id="secondaryColor"
                                                    value={companySettings.secondaryColor}
                                                    onChange={e => setCompanySettings({ ...companySettings, secondaryColor: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Social Media Links */}
                            <div className="space-y-4 pt-4 border-t">
                                <h3 className="text-lg font-medium">Social Media</h3>
                                <div className="grid gap-4 md:grid-cols-3">
                                    <div className="space-y-2">
                                        <Label htmlFor="facebook">Facebook</Label>
                                        <Input
                                            id="facebook"
                                            value={companySettings.socialMedia.facebook}
                                            onChange={e => setCompanySettings({
                                                ...companySettings,
                                                socialMedia: { ...companySettings.socialMedia, facebook: e.target.value }
                                            })}
                                            placeholder="https://facebook.com/yourpage"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="instagram">Instagram</Label>
                                        <Input
                                            id="instagram"
                                            value={companySettings.socialMedia.instagram}
                                            onChange={e => setCompanySettings({
                                                ...companySettings,
                                                socialMedia: { ...companySettings.socialMedia, instagram: e.target.value }
                                            })}
                                            placeholder="https://instagram.com/yourhandle"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="twitter">Twitter</Label>
                                        <Input
                                            id="twitter"
                                            value={companySettings.socialMedia.twitter}
                                            onChange={e => setCompanySettings({
                                                ...companySettings,
                                                socialMedia: { ...companySettings.socialMedia, twitter: e.target.value }
                                            })}
                                            placeholder="https://twitter.com/yourhandle"
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button onClick={() => handleSaveSettings("company")} disabled={isSaving}>
                                {isSaving ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" /> Save Changes
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* System Settings */}
                <TabsContent value="system">
                    <Card>
                        <CardHeader>
                            <CardTitle>System Settings</CardTitle>
                            <CardDescription>
                                Configure how your restaurant management system works.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Tax Settings */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Tax Settings</h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="taxEnabled">Enable Tax Calculation</Label>
                                            <p className="text-sm text-gray-500">
                                                Apply tax to orders automatically
                                            </p>
                                        </div>
                                        <Switch
                                            id="taxEnabled"
                                            checked={systemSettings.taxEnabled}
                                            onCheckedChange={value => setSystemSettings({ ...systemSettings, taxEnabled: value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="taxRate">Tax Rate (%)</Label>
                                        <Input
                                            id="taxRate"
                                            value={systemSettings.taxRate}
                                            onChange={e => setSystemSettings({ ...systemSettings, taxRate: e.target.value })}
                                            type="number"
                                            min="0"
                                            max="100"
                                            disabled={!systemSettings.taxEnabled}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Online Ordering */}
                            <div className="space-y-4 pt-4 border-t">
                                <h3 className="text-lg font-medium">Online Ordering</h3>
                                <div className="grid gap-6">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="onlineOrderingEnabled">Enable Online Ordering</Label>
                                            <p className="text-sm text-gray-500">
                                                Allow customers to place orders online
                                            </p>
                                        </div>
                                        <Switch
                                            id="onlineOrderingEnabled"
                                            checked={systemSettings.onlineOrderingEnabled}
                                            onCheckedChange={value => setSystemSettings({ ...systemSettings, onlineOrderingEnabled: value })}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="allowGuestOrders">Allow Guest Orders</Label>
                                            <p className="text-sm text-gray-500">
                                                Allow customers to order without an account
                                            </p>
                                        </div>
                                        <Switch
                                            id="allowGuestOrders"
                                            checked={systemSettings.allowGuestOrders}
                                            onCheckedChange={value => setSystemSettings({ ...systemSettings, allowGuestOrders: value })}
                                            disabled={!systemSettings.onlineOrderingEnabled}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="requireTableNumber">Require Table Number</Label>
                                            <p className="text-sm text-gray-500">
                                                Require table number for dine-in orders
                                            </p>
                                        </div>
                                        <Switch
                                            id="requireTableNumber"
                                            checked={systemSettings.requireTableNumber}
                                            onCheckedChange={value => setSystemSettings({ ...systemSettings, requireTableNumber: value })}
                                            disabled={!systemSettings.onlineOrderingEnabled}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="autoAcceptOrders">Auto-Accept Orders</Label>
                                            <p className="text-sm text-gray-500">
                                                Automatically accept all online orders
                                            </p>
                                        </div>
                                        <Switch
                                            id="autoAcceptOrders"
                                            checked={systemSettings.autoAcceptOrders}
                                            onCheckedChange={value => setSystemSettings({ ...systemSettings, autoAcceptOrders: value })}
                                            disabled={!systemSettings.onlineOrderingEnabled}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="tipOptions">Tip Options (%)</Label>
                                        <Input
                                            id="tipOptions"
                                            value={systemSettings.tipOptions}
                                            onChange={e => setSystemSettings({ ...systemSettings, tipOptions: e.target.value })}
                                            placeholder="0,5,10,15,20"
                                            disabled={!systemSettings.onlineOrderingEnabled}
                                        />
                                        <p className="text-xs text-gray-500">Comma-separated list of tip percentages</p>
                                    </div>
                                </div>
                            </div>

                            {/* Notifications */}
                            <div className="space-y-4 pt-4 border-t">
                                <h3 className="text-lg font-medium">Notifications & Alerts</h3>
                                <div className="grid gap-6">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="orderNotifications">Order Notifications</Label>
                                            <p className="text-sm text-gray-500">
                                                Receive notifications for new orders
                                            </p>
                                        </div>
                                        <Switch
                                            id="orderNotifications"
                                            checked={systemSettings.orderNotifications}
                                            onCheckedChange={value => setSystemSettings({ ...systemSettings, orderNotifications: value })}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="lowStockAlerts">Low Stock Alerts</Label>
                                            <p className="text-sm text-gray-500">
                                                Receive alerts when inventory items are low
                                            </p>
                                        </div>
                                        <Switch
                                            id="lowStockAlerts"
                                            checked={systemSettings.lowStockAlerts}
                                            onCheckedChange={value => setSystemSettings({ ...systemSettings, lowStockAlerts: value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Locale Settings */}
                            <div className="space-y-4 pt-4 border-t">
                                <h3 className="text-lg font-medium">Locale Settings</h3>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="currency">Currency Symbol</Label>
                                        <Input
                                            id="currency"
                                            value={systemSettings.currency}
                                            onChange={e => setSystemSettings({ ...systemSettings, currency: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="language">Default Language</Label>
                                        <select
                                            id="language"
                                            value={systemSettings.language}
                                            onChange={e => setSystemSettings({ ...systemSettings, language: e.target.value })}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <option value="en">English</option>
                                            <option value="es">Spanish</option>
                                            <option value="fr">French</option>
                                            <option value="de">German</option>
                                            <option value="hi">Hindi</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button onClick={() => handleSaveSettings("system")} disabled={isSaving}>
                                {isSaving ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" /> Save Changes
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
} 