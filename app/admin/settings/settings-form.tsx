'use client';

import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { capitalizeFirstLetter } from '@/lib/utils';

interface Setting {
    id: number;
    key: string;
    value: string;
    description: string | null;
    category: string;
    updatedBy: number | null;
    createdAt: string;
    updatedAt: string;
}

interface SettingsFormProps {
    settings: Setting[];
    groupedSettings: Record<string, Setting[]>;
}

export default function SettingsForm({ settings, groupedSettings }: SettingsFormProps) {
    const [formData, setFormData] = useState<Record<string, string>>(
        settings.reduce((acc, setting) => {
            acc[setting.key] = setting.value;
            return acc;
        }, {} as Record<string, string>)
    );
    const [isSaving, setIsSaving] = useState(false);
    const { toast } = useToast();

    const handleChange = (key: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleToggleChange = (key: string, checked: boolean) => {
        setFormData((prev) => ({
            ...prev,
            [key]: checked.toString(),
        }));
    };

    const handleSave = async (key: string, value: string, category: string) => {
        try {
            setIsSaving(true);

            const response = await fetch('/api/admin/settings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    key,
                    value,
                    category,
                }),
            });

            const data = await response.json();

            if (data.success) {
                toast({
                    title: 'Setting Updated',
                    description: `${key} has been updated successfully.`,
                });
            } else {
                toast({
                    title: 'Error',
                    description: data.message || 'Failed to update setting',
                    variant: 'destructive',
                });
            }
        } catch (error) {
            console.error('Error saving setting:', error);
            toast({
                title: 'Error',
                description: 'An unexpected error occurred',
                variant: 'destructive',
            });
        } finally {
            setIsSaving(false);
        }
    };

    // Function to render the input field based on setting key and value
    const renderField = (setting: Setting) => {
        const { key, value, description } = setting;

        // Boolean settings like "maintenance_mode" should use a switch
        if (value === 'true' || value === 'false') {
            return (
                <div className="flex items-center space-x-2">
                    <Switch
                        id={key}
                        checked={formData[key] === 'true'}
                        onCheckedChange={(checked) => handleToggleChange(key, checked)}
                    />
                    <label htmlFor={key} className="cursor-pointer">
                        {formData[key] === 'true' ? 'Enabled' : 'Disabled'}
                    </label>
                </div>
            );
        }

        // Long text fields like "maintenance_message" should use a textarea
        if (key.includes('message') || value.length > 100) {
            return (
                <Textarea
                    id={key}
                    value={formData[key] || ''}
                    onChange={(e) => handleChange(key, e.target.value)}
                    rows={4}
                />
            );
        }

        // Default to a text input
        return (
            <Input
                id={key}
                value={formData[key] || ''}
                onChange={(e) => handleChange(key, e.target.value)}
            />
        );
    };

    // Get categories for tabs
    const categories = Object.keys(groupedSettings).sort((a, b) => {
        // Ensure 'system' category is first
        if (a === 'system') return -1;
        if (b === 'system') return 1;
        return a.localeCompare(b);
    });

    return (
        <Tabs defaultValue={categories[0]} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
                {categories.map((category) => (
                    <TabsTrigger key={category} value={category}>
                        {capitalizeFirstLetter(category)}
                    </TabsTrigger>
                ))}
            </TabsList>

            {categories.map((category) => (
                <TabsContent key={category} value={category}>
                    <Card className="border-0 shadow-none">
                        <CardHeader className="pb-2">
                            <CardTitle>{capitalizeFirstLetter(category)} Settings</CardTitle>
                            <CardDescription>
                                Manage {category} related settings for your website.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {groupedSettings[category].map((setting) => (
                                    <div key={setting.id} className="border p-4 rounded-md space-y-3">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4">
                                            <div className="space-y-1 mb-2 md:mb-0">
                                                <label htmlFor={setting.key} className="font-medium">
                                                    {setting.key
                                                        .split('_')
                                                        .map(capitalizeFirstLetter)
                                                        .join(' ')}
                                                </label>
                                                {setting.description && (
                                                    <p className="text-sm text-gray-500">
                                                        {setting.description}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="w-full md:w-1/2">
                                                {renderField(setting)}
                                            </div>
                                        </div>
                                        <div className="flex justify-end">
                                            <Button
                                                size="sm"
                                                onClick={() => handleSave(setting.key, formData[setting.key], setting.category)}
                                                disabled={isSaving || formData[setting.key] === setting.value}
                                            >
                                                {isSaving ? 'Saving...' : 'Save Changes'}
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            ))}
        </Tabs>
    );
} 