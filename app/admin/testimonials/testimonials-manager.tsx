'use client';

import { useState } from 'react';
import Image from 'next/image';
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
import { useToast } from '@/components/ui/use-toast';
import { Pencil, Trash2, Plus, User, Quote, ArrowUpDown } from 'lucide-react';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    quote: string;
    imageSrc: string | null;
    order: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    createdBy: number | null;
    updatedBy: number | null;
}

interface TestimonialsManagerProps {
    initialTestimonials: Testimonial[];
}

export default function TestimonialsManager({ initialTestimonials }: TestimonialsManagerProps) {
    const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
    const [currentTestimonial, setCurrentTestimonial] = useState<Partial<Testimonial>>({
        name: '',
        role: '',
        quote: '',
        imageSrc: '',
        order: 0,
        isActive: true
    });
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleInputChange = (field: string, value: string | boolean | number) => {
        setCurrentTestimonial(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const resetForm = () => {
        setCurrentTestimonial({
            name: '',
            role: '',
            quote: '',
            imageSrc: '',
            order: testimonials.length,
            isActive: true
        });
    };

    const handleEdit = (testimonial: Testimonial) => {
        setCurrentTestimonial(testimonial);
        setIsDialogOpen(true);
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true);

            // Validate required fields
            if (!currentTestimonial.name || !currentTestimonial.role || !currentTestimonial.quote) {
                toast({
                    title: 'Error',
                    description: 'Name, role, and quote are required',
                    variant: 'destructive',
                });
                return;
            }

            const response = await fetch('/api/admin/testimonials', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(currentTestimonial),
            });

            const data = await response.json();

            if (data.success) {
                toast({
                    title: 'Success',
                    description: data.message,
                });

                // Update the local state with the new/updated testimonial
                const updatedTestimonials = currentTestimonial.id
                    ? testimonials.map(t => t.id === currentTestimonial.id ? data.testimonial : t)
                    : [...testimonials, data.testimonial];

                setTestimonials(updatedTestimonials);

                // Close dialog and reset form
                setIsDialogOpen(false);
                resetForm();
            } else {
                toast({
                    title: 'Error',
                    description: data.message || 'Failed to save testimonial',
                    variant: 'destructive',
                });
            }
        } catch (error) {
            console.error('Error saving testimonial:', error);
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
        if (!confirm('Are you sure you want to delete this testimonial?')) {
            return;
        }

        try {
            setIsLoading(true);

            const response = await fetch(`/api/admin/testimonials?id=${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (data.success) {
                toast({
                    title: 'Success',
                    description: data.message,
                });

                // Update the local state
                const updatedTestimonials = testimonials.filter(t => t.id !== id);
                setTestimonials(updatedTestimonials);
            } else {
                toast({
                    title: 'Error',
                    description: data.message || 'Failed to delete testimonial',
                    variant: 'destructive',
                });
            }
        } catch (error) {
            console.error('Error deleting testimonial:', error);
            toast({
                title: 'Error',
                description: 'An unexpected error occurred',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const moveTestimonial = async (id: number, direction: 'up' | 'down') => {
        const currentIndex = testimonials.findIndex(t => t.id === id);
        if (
            (direction === 'up' && currentIndex === 0) ||
            (direction === 'down' && currentIndex === testimonials.length - 1)
        ) {
            return; // Can't move further
        }

        const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
        const targetTestimonial = testimonials[newIndex];

        try {
            setIsLoading(true);

            // Update the order of the current testimonial
            const response1 = await fetch('/api/admin/testimonials', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: testimonials[currentIndex].id,
                    order: targetTestimonial.order,
                    name: testimonials[currentIndex].name,
                    role: testimonials[currentIndex].role,
                    quote: testimonials[currentIndex].quote,
                    imageSrc: testimonials[currentIndex].imageSrc,
                    isActive: testimonials[currentIndex].isActive,
                }),
            });

            // Update the order of the target testimonial
            const response2 = await fetch('/api/admin/testimonials', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: targetTestimonial.id,
                    order: testimonials[currentIndex].order,
                    name: targetTestimonial.name,
                    role: targetTestimonial.role,
                    quote: targetTestimonial.quote,
                    imageSrc: targetTestimonial.imageSrc,
                    isActive: targetTestimonial.isActive,
                }),
            });

            const [data1, data2] = await Promise.all([
                response1.json(),
                response2.json(),
            ]);

            if (data1.success && data2.success) {
                toast({
                    title: 'Success',
                    description: 'Testimonial order updated',
                });

                // Update the local state by swapping the testimonials
                const updatedTestimonials = [...testimonials];
                const temp = { ...updatedTestimonials[currentIndex] };
                updatedTestimonials[currentIndex] = { ...updatedTestimonials[newIndex] };
                updatedTestimonials[newIndex] = temp;

                // Update the order values
                const tempOrder = updatedTestimonials[currentIndex].order;
                updatedTestimonials[currentIndex].order = updatedTestimonials[newIndex].order;
                updatedTestimonials[newIndex].order = tempOrder;

                // Sort by order for display
                updatedTestimonials.sort((a, b) => a.order - b.order);
                setTestimonials(updatedTestimonials);
            } else {
                toast({
                    title: 'Error',
                    description: 'Failed to update testimonial order',
                    variant: 'destructive',
                });
            }
        } catch (error) {
            console.error('Error reordering testimonials:', error);
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
                <h2 className="text-xl font-semibold">Manage Customer Testimonials</h2>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button
                            onClick={() => {
                                resetForm();
                                setIsDialogOpen(true);
                            }}
                        >
                            <Plus className="mr-2 h-4 w-4" /> Add New Testimonial
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>
                                {currentTestimonial.id ? 'Edit Testimonial' : 'Add New Testimonial'}
                            </DialogTitle>
                            <DialogDescription>
                                {currentTestimonial.id
                                    ? 'Update the details of the existing testimonial'
                                    : 'Fill out the form to add a new customer testimonial'}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="name" className="text-right">
                                    Name*
                                </label>
                                <Input
                                    id="name"
                                    value={currentTestimonial.name || ''}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="role" className="text-right">
                                    Role/Title*
                                </label>
                                <Input
                                    id="role"
                                    value={currentTestimonial.role || ''}
                                    onChange={(e) => handleInputChange('role', e.target.value)}
                                    className="col-span-3"
                                    placeholder="e.g. Restaurant Owner, Head Chef, etc."
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="quote" className="text-right">
                                    Quote*
                                </label>
                                <Textarea
                                    id="quote"
                                    value={currentTestimonial.quote || ''}
                                    onChange={(e) => handleInputChange('quote', e.target.value)}
                                    className="col-span-3"
                                    rows={4}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="imageSrc" className="text-right">
                                    Image URL
                                </label>
                                <Input
                                    id="imageSrc"
                                    value={currentTestimonial.imageSrc || ''}
                                    onChange={(e) => handleInputChange('imageSrc', e.target.value)}
                                    className="col-span-3"
                                    placeholder="/path/to/profile.jpg (optional)"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="order" className="text-right">
                                    Order
                                </label>
                                <Input
                                    id="order"
                                    type="number"
                                    value={currentTestimonial.order || 0}
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
                                        checked={currentTestimonial.isActive !== false}
                                        onCheckedChange={(checked) => handleInputChange('isActive', checked)}
                                    />
                                    <span>{currentTestimonial.isActive !== false ? 'Active' : 'Inactive'}</span>
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

            {testimonials.length === 0 ? (
                <div className="text-center p-8 border border-dashed rounded-lg">
                    <Quote className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                    <h3 className="text-lg font-medium mb-1">No Testimonials Yet</h3>
                    <p className="text-sm text-gray-500 mb-4">
                        Start by adding a customer testimonial to display on your website
                    </p>
                    <Button
                        onClick={() => {
                            resetForm();
                            setIsDialogOpen(true);
                        }}
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add First Testimonial
                    </Button>
                </div>
            ) : (
                <div className="space-y-4">
                    {testimonials.map((testimonial, index) => (
                        <Card key={testimonial.id} className={!testimonial.isActive ? 'opacity-60' : ''}>
                            <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        {testimonial.imageSrc ? (
                                            <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                                                <Image
                                                    src={testimonial.imageSrc}
                                                    alt={testimonial.name}
                                                    width={40}
                                                    height={40}
                                                    className="object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                                                <User className="w-5 h-5 text-gray-500" />
                                            </div>
                                        )}
                                        <div>
                                            <CardTitle className="text-base">{testimonial.name}</CardTitle>
                                            <CardDescription>{testimonial.role}</CardDescription>
                                        </div>
                                    </div>
                                    {!testimonial.isActive && (
                                        <div className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-md">
                                            Inactive
                                        </div>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="relative pl-6">
                                    <Quote className="absolute top-0 left-0 h-4 w-4 text-gray-400 -translate-y-1" />
                                    <p className="text-gray-600">{testimonial.quote}</p>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between pt-2 border-t">
                                <div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={index === 0 || isLoading}
                                        onClick={() => moveTestimonial(testimonial.id, 'up')}
                                    >
                                        <ArrowUpDown className="h-4 w-4 mr-1 rotate-90" /> Move Up
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="ml-2"
                                        disabled={index === testimonials.length - 1 || isLoading}
                                        onClick={() => moveTestimonial(testimonial.id, 'down')}
                                    >
                                        <ArrowUpDown className="h-4 w-4 mr-1 -rotate-90" /> Move Down
                                    </Button>
                                </div>
                                <div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEdit(testimonial)}
                                    >
                                        <Pencil className="h-4 w-4 mr-1" /> Edit
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="ml-2"
                                        onClick={() => handleDelete(testimonial.id)}
                                    >
                                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
} 