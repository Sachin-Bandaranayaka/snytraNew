"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
    ChevronLeft,
    Calendar as CalendarIcon,
    Clock,
    Users
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

// Mock data for tables
const MOCK_TABLES = [
    { id: 1, tableNumber: 1, capacity: 2, location: "Main Floor", status: "available" },
    { id: 2, tableNumber: 2, capacity: 4, location: "Main Floor", status: "available" },
    { id: 4, tableNumber: 4, capacity: 2, location: "Patio", status: "available" },
    { id: 5, tableNumber: 5, capacity: 4, location: "Patio", status: "available" },
    { id: 6, tableNumber: 6, capacity: 8, location: "Private Room", status: "available" },
    { id: 8, tableNumber: 8, capacity: 2, location: "Bar Area", status: "available" },
    { id: 9, tableNumber: 9, capacity: 4, location: "Main Floor", status: "available" },
    { id: 10, tableNumber: 10, capacity: 6, location: "Main Floor", status: "available" },
];

// Time slots
const TIME_SLOTS = [
    "11:00", "11:30",
    "12:00", "12:30",
    "13:00", "13:30",
    "14:00", "14:30",
    "15:00", "15:30",
    "16:00", "16:30",
    "17:00", "17:30",
    "18:00", "18:30",
    "19:00", "19:30",
    "20:00", "20:30",
    "21:00", "21:30"
];

// Durations (in minutes)
const DURATIONS = [
    { value: "60", label: "1 hour" },
    { value: "90", label: "1.5 hours" },
    { value: "120", label: "2 hours (default)" },
    { value: "150", label: "2.5 hours" },
    { value: "180", label: "3 hours" },
];

// Sources
const SOURCES = [
    { value: "website", label: "Website" },
    { value: "phone", label: "Phone" },
    { value: "walk-in", label: "Walk-in" },
    { value: "third-party", label: "Third Party" },
];

export default function NewReservationPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [tables, setTables] = useState(MOCK_TABLES);
    const [availableTables, setAvailableTables] = useState(MOCK_TABLES);
    const [loading, setLoading] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        customerName: "",
        customerPhone: "",
        customerEmail: "",
        partySize: "2",
        tableId: "",
        reservationDate: new Date(),
        startTime: "",
        duration: "120",
        specialRequests: "",
        source: "website",
    });

    // Calculate end time based on start time and duration
    const calculateEndTime = (startTime: string, durationMinutes: number) => {
        if (!startTime) return "";

        const [hours, minutes] = startTime.split(':').map(Number);
        const startDate = new Date();
        startDate.setHours(hours, minutes, 0, 0);

        const endDate = new Date(startDate.getTime() + durationMinutes * 60000);
        return `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;
    };

    // Get available tables based on party size and date/time
    useEffect(() => {
        const fetchAvailableTables = async () => {
            try {
                setLoading(true);

                // Replace with actual API call when ready
                // const response = await fetch(`/api/tables/availability?date=${format(formData.reservationDate, 'yyyy-MM-dd')}&startTime=${formData.startTime}&endTime=${endTime}&partySize=${formData.partySize}`);
                // if (!response.ok) throw new Error('Failed to fetch available tables');
                // const data = await response.json();
                // setAvailableTables(data.availableTables);

                // For now, just filter mock tables by capacity
                const partySize = parseInt(formData.partySize);
                const filtered = MOCK_TABLES.filter(table => table.capacity >= partySize);
                setAvailableTables(filtered);

                // If current selected table is no longer available, reset selection
                if (formData.tableId && !filtered.some(table => table.id.toString() === formData.tableId)) {
                    setFormData(prev => ({ ...prev, tableId: "" }));
                }
            } catch (error) {
                console.error('Error fetching available tables:', error);
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to load available tables. Please try again."
                });
            } finally {
                setLoading(false);
            }
        };

        if (formData.partySize && formData.reservationDate) {
            fetchAvailableTables();
        }
    }, [formData.partySize, formData.reservationDate, formData.startTime, formData.duration, toast]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (date: Date | undefined) => {
        if (date) {
            setFormData(prev => ({ ...prev, reservationDate: date }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);

            // Validate form
            if (!formData.customerName || !formData.customerPhone || !formData.partySize ||
                !formData.tableId || !formData.startTime) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Please fill all required fields."
                });
                return;
            }

            const endTime = calculateEndTime(formData.startTime, parseInt(formData.duration));

            // Prepare data for API
            const reservationData = {
                ...formData,
                endTime,
                partySize: parseInt(formData.partySize),
                tableId: parseInt(formData.tableId),
                duration: parseInt(formData.duration),
            };

            // Replace with actual API call when ready
            // const response = await fetch('/api/reservations', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(reservationData),
            // });

            // if (!response.ok) throw new Error('Failed to create reservation');
            // const result = await response.json();

            // Mock successful response
            console.log('Reservation data:', reservationData);

            toast({
                title: "Success",
                description: "Reservation has been created successfully."
            });

            // Redirect back to reservations page
            router.push("/dashboard/reservations");
        } catch (error) {
            console.error('Error creating reservation:', error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to create reservation. Please try again."
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => router.push("/dashboard/reservations")}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-3xl font-bold tracking-tight">New Reservation</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Customer Information</CardTitle>
                        <CardDescription>
                            Enter the customer's details for this reservation.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="customerName">Name <span className="text-red-500">*</span></Label>
                                <Input
                                    id="customerName"
                                    name="customerName"
                                    value={formData.customerName}
                                    onChange={handleInputChange}
                                    placeholder="Customer name"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="customerPhone">Phone <span className="text-red-500">*</span></Label>
                                <Input
                                    id="customerPhone"
                                    name="customerPhone"
                                    value={formData.customerPhone}
                                    onChange={handleInputChange}
                                    placeholder="Phone number"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="customerEmail">Email</Label>
                            <Input
                                id="customerEmail"
                                name="customerEmail"
                                type="email"
                                value={formData.customerEmail}
                                onChange={handleInputChange}
                                placeholder="Email address"
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Reservation Details</CardTitle>
                        <CardDescription>
                            Select date, time, and table for the reservation.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label>Date <span className="text-red-500">*</span></Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start text-left font-normal"
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {formData.reservationDate ? (
                                                format(formData.reservationDate, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={formData.reservationDate}
                                            onSelect={handleDateChange}
                                            initialFocus
                                            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="partySize">Party Size <span className="text-red-500">*</span></Label>
                                <div className="flex items-center space-x-2">
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="partySize"
                                        name="partySize"
                                        type="number"
                                        value={formData.partySize}
                                        onChange={handleInputChange}
                                        min="1"
                                        max="20"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="space-y-2">
                                <Label htmlFor="startTime">Start Time <span className="text-red-500">*</span></Label>
                                <Select
                                    value={formData.startTime}
                                    onValueChange={(value) => handleSelectChange("startTime", value)}
                                >
                                    <SelectTrigger id="startTime">
                                        <div className="flex items-center">
                                            {formData.startTime ? (
                                                <>
                                                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                                    {formData.startTime}
                                                </>
                                            ) : (
                                                <span>Select time</span>
                                            )}
                                        </div>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {TIME_SLOTS.map((time) => (
                                            <SelectItem key={time} value={time}>
                                                {time}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="duration">Duration</Label>
                                <Select
                                    value={formData.duration}
                                    onValueChange={(value) => handleSelectChange("duration", value)}
                                >
                                    <SelectTrigger id="duration">
                                        <SelectValue placeholder="Select duration" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {DURATIONS.map((duration) => (
                                            <SelectItem key={duration.value} value={duration.value}>
                                                {duration.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>End Time</Label>
                                <div className="h-10 px-3 py-2 rounded-md border border-input bg-muted/50 flex items-center">
                                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                    {formData.startTime ? (
                                        calculateEndTime(formData.startTime, parseInt(formData.duration))
                                    ) : (
                                        "Select start time first"
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="tableId">Table <span className="text-red-500">*</span></Label>
                            <Select
                                value={formData.tableId}
                                onValueChange={(value) => handleSelectChange("tableId", value)}
                            >
                                <SelectTrigger id="tableId">
                                    <SelectValue placeholder="Select a table" />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableTables.length === 0 ? (
                                        <div className="p-2 text-center text-muted-foreground">
                                            No tables available for this party size
                                        </div>
                                    ) : (
                                        availableTables.map((table) => (
                                            <SelectItem key={table.id} value={table.id.toString()}>
                                                Table {table.tableNumber} - {table.location} ({table.capacity} seats)
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="source">Reservation Source</Label>
                            <Select
                                value={formData.source}
                                onValueChange={(value) => handleSelectChange("source", value)}
                            >
                                <SelectTrigger id="source">
                                    <SelectValue placeholder="Select source" />
                                </SelectTrigger>
                                <SelectContent>
                                    {SOURCES.map((source) => (
                                        <SelectItem key={source.value} value={source.value}>
                                            {source.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="specialRequests">Special Requests</Label>
                            <Textarea
                                id="specialRequests"
                                name="specialRequests"
                                value={formData.specialRequests}
                                onChange={handleInputChange}
                                placeholder="Any special requests or notes..."
                                rows={3}
                            />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end space-x-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push("/dashboard/reservations")}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="bg-[#e85c2c] hover:bg-[#d24e20]"
                    >
                        {loading ? (
                            <>
                                <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                                Creating...
                            </>
                        ) : (
                            "Create Reservation"
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
} 