'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { capitalizeFirstLetter } from '@/lib/utils';
import { Pencil, Trash2, Plus, ImageIcon, UploadCloud } from 'lucide-react';

interface CarouselImage {
    id: number;
    title: string;
    description: string | null;
    imageSrc: string;
    altText: string | null;
    carouselType: string;
    order: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    createdBy: number | null;
    updatedBy: number | null;
}

interface CarouselImagesManagerProps {
    initialImages: CarouselImage[];
    groupedImages: Record<string, CarouselImage[]>;
}

export default function CarouselImagesManager({ initialImages, groupedImages }: CarouselImagesManagerProps) {
    const [images, setImages] = useState<CarouselImage[]>(initialImages);
    const [groupedImagesByType, setGroupedImagesByType] = useState<Record<string, CarouselImage[]>>(groupedImages);
    const [currentImage, setCurrentImage] = useState<Partial<CarouselImage>>({
        carouselType: '',
        title: '',
        description: '',
        imageSrc: '',
        altText: '',
        order: 0,
        isActive: true
    });
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Get categories for tabs
    const carouselTypes = Object.keys(groupedImagesByType).sort();

    const handleInputChange = (field: string, value: string | boolean | number) => {
        setCurrentImage(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const resetForm = () => {
        setCurrentImage({
            carouselType: '',
            title: '',
            description: '',
            imageSrc: '',
            altText: '',
            order: 0,
            isActive: true
        });
    };

    const handleEdit = (image: CarouselImage) => {
        setCurrentImage(image);
        setIsDialogOpen(true);
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true);

            // Validate required fields
            if (!currentImage.title || !currentImage.imageSrc || !currentImage.carouselType) {
                toast({
                    title: 'Error',
                    description: 'Title, image source, and carousel type are required',
                    variant: 'destructive',
                });
                return;
            }

            const response = await fetch('/api/admin/carousel-images', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(currentImage),
            });

            const data = await response.json();

            if (data.success) {
                toast({
                    title: 'Success',
                    description: data.message,
                });

                // Update the local state with the new/updated image
                const updatedImages = currentImage.id
                    ? images.map(img => img.id === currentImage.id ? data.image : img)
                    : [...images, data.image];

                setImages(updatedImages);

                // Update the grouped images
                const updatedGroupedImages = {} as Record<string, CarouselImage[]>;
                for (const image of updatedImages) {
                    const type = image.carouselType;
                    if (!updatedGroupedImages[type]) {
                        updatedGroupedImages[type] = [];
                    }
                    updatedGroupedImages[type].push(image);
                }
                setGroupedImagesByType(updatedGroupedImages);

                // Close dialog and reset form
                setIsDialogOpen(false);
                resetForm();
            } else {
                toast({
                    title: 'Error',
                    description: data.message || 'Failed to save carousel image',
                    variant: 'destructive',
                });
            }
        } catch (error) {
            console.error('Error saving carousel image:', error);
            toast({
                title: 'Error',
                description: 'An unexpected error occurred',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this image?')) {
            return;
        }

        try {
            setIsLoading(true);

            const response = await fetch(`/api/admin/carousel-images?id=${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (data.success) {
                toast({
                    title: 'Success',
                    description: data.message,
                });

                // Update the local state
                const updatedImages = images.filter(img => img.id !== id);
                setImages(updatedImages);

                // Update the grouped images
                const updatedGroupedImages = {} as Record<string, CarouselImage[]>;
                for (const image of updatedImages) {
                    const type = image.carouselType;
                    if (!updatedGroupedImages[type]) {
                        updatedGroupedImages[type] = [];
                    }
                    updatedGroupedImages[type].push(image);
                }
                setGroupedImagesByType(updatedGroupedImages);
            } else {
                toast({
                    title: 'Error',
                    description: data.message || 'Failed to delete carousel image',
                    variant: 'destructive',
                });
            }
        } catch (error) {
            console.error('Error deleting carousel image:', error);
            toast({
                title: 'Error',
                description: 'An unexpected error occurred',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Manage Carousel Images</h2>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button
                            onClick={() => {
                                resetForm();
                                setIsDialogOpen(true);
                            }}
                        >
                            <Plus className="mr-2 h-4 w-4" /> Add New Image
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>
                                {currentImage.id ? 'Edit Carousel Image' : 'Add New Carousel Image'}
                            </DialogTitle>
                            <DialogDescription>
                                {currentImage.id
                                    ? 'Update the details of the existing carousel image'
                                    : 'Fill out the form to add a new carousel image'}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="carouselType" className="text-right">
                                    Carousel Type*
                                </label>
                                <Select
                                    value={currentImage.carouselType}
                                    onValueChange={(value) => handleInputChange('carouselType', value)}
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select carousel type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="admin-dashboard">Admin Dashboard</SelectItem>
                                        <SelectItem value="order-management">Order Management</SelectItem>
                                        <SelectItem value="home-banner">Home Banner</SelectItem>
                                        <SelectItem value="products">Products</SelectItem>
                                        {/* Add more types as needed */}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="title" className="text-right">
                                    Title*
                                </label>
                                <Input
                                    id="title"
                                    value={currentImage.title || ''}
                                    onChange={(e) => handleInputChange('title', e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="description" className="text-right">
                                    Description
                                </label>
                                <Textarea
                                    id="description"
                                    value={currentImage.description || ''}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    className="col-span-3"
                                    rows={3}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="imageSrc" className="text-right">
                                    Image URL*
                                </label>
                                <Input
                                    id="imageSrc"
                                    value={currentImage.imageSrc || ''}
                                    onChange={(e) => handleInputChange('imageSrc', e.target.value)}
                                    className="col-span-3"
                                    placeholder="/path/to/image.jpg"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="altText" className="text-right">
                                    Alt Text
                                </label>
                                <Input
                                    id="altText"
                                    value={currentImage.altText || ''}
                                    onChange={(e) => handleInputChange('altText', e.target.value)}
                                    className="col-span-3"
                                    placeholder="Image description for accessibility"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="order" className="text-right">
                                    Order
                                </label>
                                <Input
                                    id="order"
                                    type="number"
                                    value={currentImage.order || 0}
                                    onChange={(e) => handleInputChange('order', parseInt(e.target.value) || 0)}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="isActive" className="text-right">
                                    Active
                                </label>
                                <div className="flex items-center space-x-2 col-span-3">
                                    <Switch
                                        id="isActive"
                                        checked={currentImage.isActive !== false}
                                        onCheckedChange={(checked) => handleInputChange('isActive', checked)}
                                    />
                                    <span>{currentImage.isActive !== false ? 'Active' : 'Inactive'}</span>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="secondary" disabled={isLoading}>
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="button" onClick={handleSubmit} disabled={isLoading}>
                                {isLoading ? 'Saving...' : 'Save'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {carouselTypes.length === 0 ? (
                <div className="text-center p-8 border border-dashed rounded-lg">
                    <ImageIcon className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                    <h3 className="text-lg font-medium mb-1">No Images Yet</h3>
                    <p className="text-sm text-gray-500 mb-4">
                        Start by adding a carousel image to display on your website
                    </p>
                    <Button
                        onClick={() => {
                            resetForm();
                            setIsDialogOpen(true);
                        }}
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add First Image
                    </Button>
                </div>
            ) : (
                <Tabs defaultValue={carouselTypes[0]} className="w-full">
                    <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
                        {carouselTypes.map((type) => (
                            <TabsTrigger key={type} value={type}>
                                {type.split('-').map(capitalizeFirstLetter).join(' ')}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {carouselTypes.map((type) => (
                        <TabsContent key={type} value={type}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {groupedImagesByType[type].map((image) => (
                                    <Card key={image.id} className={!image.isActive ? 'opacity-60' : ''}>
                                        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-lg">
                                            <Image
                                                src={image.imageSrc}
                                                alt={image.altText || image.title}
                                                fill
                                                className="object-cover"
                                            />
                                            {!image.isActive && (
                                                <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                                                    Inactive
                                                </div>
                                            )}
                                        </div>
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-base">{image.title}</CardTitle>
                                            {image.description && (
                                                <CardDescription className="line-clamp-2">
                                                    {image.description}
                                                </CardDescription>
                                            )}
                                        </CardHeader>
                                        <CardFooter className="flex justify-between pt-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleEdit(image)}
                                            >
                                                <Pencil className="h-4 w-4 mr-1" /> Edit
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(image.id)}
                                            >
                                                <Trash2 className="h-4 w-4 mr-1" /> Delete
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            )}
        </div>
    );
} 