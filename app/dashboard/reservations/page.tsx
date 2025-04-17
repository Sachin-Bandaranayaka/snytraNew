"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { format, addDays, isToday, startOfDay } from "date-fns";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Utensils,
    Plus,
    Calendar as CalendarIcon,
    Users,
    ListFilter,
    Layout,
    Info,
    X,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

// Use mock data for initial development
const MOCK_TABLES = [
    { id: 1, tableNumber: 1, capacity: 2, location: "Main Floor", status: "available" },
    { id: 2, tableNumber: 2, capacity: 4, location: "Main Floor", status: "available" },
    { id: 3, tableNumber: 3, capacity: 6, location: "Main Floor", status: "reserved" },
    { id: 4, tableNumber: 4, capacity: 2, location: "Patio", status: "available" },
    { id: 5, tableNumber: 5, capacity: 4, location: "Patio", status: "available" },
    { id: 6, tableNumber: 6, capacity: 8, location: "Private Room", status: "available" },
    { id: 7, tableNumber: 7, capacity: 2, location: "Bar Area", status: "occupied" },
    { id: 8, tableNumber: 8, capacity: 2, location: "Bar Area", status: "available" },
    { id: 9, tableNumber: 9, capacity: 4, location: "Main Floor", status: "available" },
    { id: 10, tableNumber: 10, capacity: 6, location: "Main Floor", status: "available" },
    { id: 11, tableNumber: 11, capacity: 4, location: "Patio", status: "maintenance" },
];

const MOCK_RESERVATIONS = [
    {
        id: 1,
        customerName: "John Doe",
        customerPhone: "555-123-4567",
        customerEmail: "john@example.com",
        partySize: 2,
        tableId: 1,
        reservationDate: addDays(new Date(), 0).toISOString(),
        startTime: "18:00",
        endTime: "20:00",
        status: "confirmed"
    },
    {
        id: 2,
        customerName: "Jane Smith",
        customerPhone: "555-987-6543",
        customerEmail: "jane@example.com",
        partySize: 4,
        tableId: 2,
        reservationDate: addDays(new Date(), 0).toISOString(),
        startTime: "19:00",
        endTime: "21:00",
        status: "confirmed"
    },
    {
        id: 3,
        customerName: "Michael Johnson",
        customerPhone: "555-456-7890",
        customerEmail: "michael@example.com",
        partySize: 6,
        tableId: 3,
        reservationDate: addDays(new Date(), 0).toISOString(),
        startTime: "18:30",
        endTime: "20:30",
        status: "confirmed"
    },
    {
        id: 4,
        customerName: "Sarah Williams",
        customerPhone: "555-789-0123",
        customerEmail: "sarah@example.com",
        partySize: 2,
        tableId: 4,
        reservationDate: addDays(new Date(), 1).toISOString(),
        startTime: "19:30",
        endTime: "21:30",
        status: "confirmed"
    },
    {
        id: 5,
        customerName: "Robert Brown",
        customerPhone: "555-234-5678",
        customerEmail: "robert@example.com",
        partySize: 4,
        tableId: 5,
        reservationDate: addDays(new Date(), 1).toISOString(),
        startTime: "18:00",
        endTime: "20:00",
        status: "confirmed"
    },
    {
        id: 6,
        customerName: "Lisa Davis",
        customerPhone: "555-345-6789",
        customerEmail: "lisa@example.com",
        partySize: 8,
        tableId: 6,
        reservationDate: addDays(new Date(), 2).toISOString(),
        startTime: "19:00",
        endTime: "21:00",
        status: "confirmed"
    },
    {
        id: 7,
        customerName: "David Miller",
        customerPhone: "555-567-8901",
        customerEmail: "david@example.com",
        partySize: 2,
        tableId: 7,
        reservationDate: addDays(new Date(), 3).toISOString(),
        startTime: "18:30",
        endTime: "20:30",
        status: "confirmed"
    }
];

export default function ReservationsPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState("upcoming");
    const [date, setDate] = useState<Date>(new Date());
    const [tables, setTables] = useState(MOCK_TABLES);
    const [reservations, setReservations] = useState(MOCK_RESERVATIONS);
    const [filteredReservations, setFilteredReservations] = useState(MOCK_RESERVATIONS);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch tables and reservations from the API
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Uncomment when API routes are implemented
                // const tablesResponse = await fetch('/api/tables');
                // if (!tablesResponse.ok) throw new Error('Failed to fetch tables');
                // const tablesData = await tablesResponse.json();
                // setTables(tablesData.tables);

                // const reservationsResponse = await fetch(`/api/reservations?date=${format(date, 'yyyy-MM-dd')}`);
                // if (!reservationsResponse.ok) throw new Error('Failed to fetch reservations');
                // const reservationsData = await reservationsResponse.json();
                // setReservations(reservationsData.reservations);

                // For now, use mock data and filter by date
                const dateString = date.toISOString().split('T')[0];
                const filteredRes = MOCK_RESERVATIONS.filter(res => {
                    const resDate = new Date(res.reservationDate).toISOString().split('T')[0];
                    return resDate === dateString;
                });
                setReservations(filteredRes);
                setFilteredReservations(filteredRes);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load reservations data');
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to load reservations data. Please try again."
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [date, toast]);

    // Update filtered reservations when search query or status filter changes
    useEffect(() => {
        let filtered = [...reservations];

        if (searchQuery) {
            filtered = filtered.filter(
                (res) =>
                    res.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    res.customerPhone.includes(searchQuery) ||
                    res.customerEmail?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (statusFilter !== "all") {
            filtered = filtered.filter((res) => res.status === statusFilter);
        }

        setFilteredReservations(filtered);
    }, [reservations, searchQuery, statusFilter]);

    // Prevent 404 images from triggering errors
    useEffect(() => {
        // Handle errors on images that might cause layout issues
        const handleImageError = (event: Event) => {
            const img = event.target as HTMLImageElement;
            if (img.src.includes('/items/')) {
                // Replace with a placeholder instead of letting the error go through
                img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3E%3Crect x="3" y="3" width="18" height="18" rx="2" ry="2"%3E%3C/rect%3E%3Ccircle cx="8.5" cy="8.5" r="1.5"%3E%3C/circle%3E%3Cpolyline points="21 15 16 10 5 21"%3E%3C/polyline%3E%3C/svg%3E';
                console.log('Replaced missing image with placeholder:', img.src);
            }
        };

        // Add global error handler for images
        document.addEventListener('error', handleImageError, true);

        return () => {
            document.removeEventListener('error', handleImageError, true);
        };
    }, []);

    const handleTabChange = (value: string) => {
        setActiveTab(value);
    };

    const handleDateChange = (newDate: Date | undefined) => {
        if (newDate) {
            setDate(newDate);
        }
    };

    const handlePreviousDay = () => {
        setDate(prev => addDays(prev, -1));
    };

    const handleNextDay = () => {
        setDate(prev => addDays(prev, 1));
    };

    const handleCreateReservation = () => {
        router.push("/dashboard/reservations/new");
    };

    return (
        <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Table Reservations</h1>
                    <p className="text-muted-foreground">Manage your restaurant's table reservations</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                        variant="default"
                        onClick={handleCreateReservation}
                        className="bg-[#e85c2c] hover:bg-[#d24e20]"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        New Reservation
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => router.push("/dashboard/reservations/tables")}
                    >
                        <Layout className="mr-2 h-4 w-4" />
                        Manage Tables
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 space-y-6">
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <div className="flex items-center">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={handlePreviousDay}
                                        aria-label="Previous day"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <h3 className="text-base font-medium mx-2">
                                        {isToday(date) ? (
                                            <span>Today, {format(date, "MMMM d, yyyy")}</span>
                                        ) : (
                                            <span>{format(date, "EEEE, MMMM d, yyyy")}</span>
                                        )}
                                    </h3>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={handleNextDay}
                                        aria-label="Next day"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className="ml-2">
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                Select Date
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                onSelect={handleDateChange}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Input
                                        placeholder="Search by name or phone..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="max-w-[240px]"
                                    />
                                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                                        <SelectTrigger className="w-[150px]">
                                            <SelectValue placeholder="Filter by status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Statuses</SelectItem>
                                            <SelectItem value="confirmed">Confirmed</SelectItem>
                                            <SelectItem value="seated">Seated</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                            <SelectItem value="cancelled">Cancelled</SelectItem>
                                            <SelectItem value="no-show">No-show</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <div className="py-8 text-center">
                                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                    <p className="text-muted-foreground">Loading reservations...</p>
                                </div>
                            ) : error ? (
                                <div className="py-8 text-center">
                                    <Info className="h-8 w-8 text-destructive mx-auto mb-4" />
                                    <p className="text-destructive font-medium">{error}</p>
                                    <Button
                                        variant="outline"
                                        className="mt-4"
                                        onClick={() => window.location.reload()}
                                    >
                                        Try Again
                                    </Button>
                                </div>
                            ) : filteredReservations.length === 0 ? (
                                <div className="py-8 text-center border rounded-md">
                                    <Utensils className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
                                    <h3 className="text-lg font-medium">No reservations found</h3>
                                    <p className="text-muted-foreground mt-1 mb-4">
                                        There are no reservations for this date or matching your filters.
                                    </p>
                                    <Button onClick={handleCreateReservation}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add New Reservation
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {filteredReservations.map((reservation) => {
                                        const table = tables.find(t => t.id === reservation.tableId);
                                        return (
                                            <div
                                                key={reservation.id}
                                                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border gap-3"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                                                        <Utensils className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium">{reservation.customerName}</h4>
                                                        <div className="flex flex-col xs:flex-row gap-2 text-sm text-muted-foreground">
                                                            <span>{reservation.customerPhone}</span>
                                                            {reservation.customerEmail && (
                                                                <>
                                                                    <span className="hidden xs:inline">•</span>
                                                                    <span>{reservation.customerEmail}</span>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-wrap items-center gap-3 sm:ml-auto">
                                                    <div className="flex items-center gap-1 text-sm">
                                                        <Users className="h-4 w-4 text-muted-foreground" />
                                                        <span>{reservation.partySize} guests</span>
                                                    </div>
                                                    <div className="text-sm font-medium">
                                                        {reservation.startTime} - {reservation.endTime}
                                                    </div>
                                                    <Badge variant="outline" className="font-normal">
                                                        Table {table?.tableNumber || reservation.tableId}
                                                    </Badge>
                                                    <Badge
                                                        className={cn(
                                                            "capitalize",
                                                            reservation.status === "confirmed" && "bg-green-100 text-green-800 hover:bg-green-100",
                                                            reservation.status === "seated" && "bg-blue-100 text-blue-800 hover:bg-blue-100",
                                                            reservation.status === "completed" && "bg-purple-100 text-purple-800 hover:bg-purple-100",
                                                            reservation.status === "cancelled" && "bg-red-100 text-red-800 hover:bg-red-100",
                                                            reservation.status === "no-show" && "bg-amber-100 text-amber-800 hover:bg-amber-100"
                                                        )}
                                                    >
                                                        {reservation.status}
                                                    </Badge>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="ml-auto"
                                                        onClick={() => router.push(`/dashboard/reservations/${reservation.id}`)}
                                                    >
                                                        View
                                                    </Button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar with quick info and stats */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg">Today's Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Total Reservations</span>
                                <span className="font-medium">{reservations.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Total Guests</span>
                                <span className="font-medium">
                                    {reservations.reduce((sum, res) => sum + res.partySize, 0)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Available Tables</span>
                                <span className="font-medium">
                                    {tables.filter(t => t.status === "available").length} / {tables.length}
                                </span>
                            </div>
                            <div className="pt-4 border-t">
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => router.push("/dashboard/reservations/reports")}
                                >
                                    View Reports
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg">Quick Links</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button
                                variant="outline"
                                className="w-full justify-start"
                                onClick={() => router.push("/dashboard/reservations/new")}
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                New Reservation
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-start"
                                onClick={() => router.push("/dashboard/reservations/tables")}
                            >
                                <Layout className="mr-2 h-4 w-4" />
                                Manage Tables
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-start"
                                onClick={() => router.push("/dashboard/reservations/settings")}
                            >
                                <ListFilter className="mr-2 h-4 w-4" />
                                Reservation Settings
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
} 