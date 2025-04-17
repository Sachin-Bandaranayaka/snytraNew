"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
    ChevronLeft,
    Plus,
    Search,
    Edit,
    Trash,
    Square,
    Circle,
    Users
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Mock data for tables
const MOCK_TABLES = [
    { id: 1, tableNumber: 1, capacity: 2, location: "Main Floor", shape: "rectangle", status: "available", isActive: true },
    { id: 2, tableNumber: 2, capacity: 4, location: "Main Floor", shape: "rectangle", status: "available", isActive: true },
    { id: 3, tableNumber: 3, capacity: 6, location: "Main Floor", shape: "square", status: "reserved", isActive: true },
    { id: 4, tableNumber: 4, capacity: 2, location: "Patio", shape: "round", status: "available", isActive: true },
    { id: 5, tableNumber: 5, capacity: 4, location: "Patio", shape: "round", status: "available", isActive: true },
    { id: 6, tableNumber: 6, capacity: 8, location: "Private Room", shape: "rectangle", status: "available", isActive: true },
    { id: 7, tableNumber: 7, capacity: 2, location: "Bar Area", shape: "square", status: "occupied", isActive: true },
    { id: 8, tableNumber: 8, capacity: 2, location: "Bar Area", shape: "round", status: "available", isActive: true },
    { id: 9, tableNumber: 9, capacity: 4, location: "Main Floor", shape: "rectangle", status: "available", isActive: true },
    { id: 10, tableNumber: 10, capacity: 6, location: "Main Floor", shape: "rectangle", status: "available", isActive: true },
    { id: 11, tableNumber: 11, capacity: 4, location: "Patio", shape: "square", status: "maintenance", isActive: false },
];

// Location options
const LOCATION_OPTIONS = [
    "Main Floor",
    "Patio",
    "Bar Area",
    "Private Room",
];

// Shape options
const SHAPE_OPTIONS = [
    { value: "rectangle", label: "Rectangle", icon: <Square className="h-4 w-4" /> },
    { value: "square", label: "Square", icon: <Square className="h-4 w-4" /> },
    { value: "round", label: "Round", icon: <Circle className="h-4 w-4" /> },
];

// Status options
const STATUS_OPTIONS = [
    { value: "available", label: "Available", className: "bg-green-100 text-green-800 hover:bg-green-100" },
    { value: "reserved", label: "Reserved", className: "bg-blue-100 text-blue-800 hover:bg-blue-100" },
    { value: "occupied", label: "Occupied", className: "bg-purple-100 text-purple-800 hover:bg-purple-100" },
    { value: "maintenance", label: "Maintenance", className: "bg-amber-100 text-amber-800 hover:bg-amber-100" },
];

export default function TablesPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [tables, setTables] = useState(MOCK_TABLES);
    const [filteredTables, setFilteredTables] = useState(MOCK_TABLES);
    const [searchQuery, setSearchQuery] = useState("");
    const [locationFilter, setLocationFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedTable, setSelectedTable] = useState<any>(null);

    // New table form state
    const [newTable, setNewTable] = useState({
        tableNumber: "",
        capacity: "",
        location: "Main Floor",
        shape: "rectangle",
        status: "available",
        isActive: true
    });

    // Edit table form state
    const [editTable, setEditTable] = useState({
        id: 0,
        tableNumber: "",
        capacity: "",
        location: "",
        shape: "",
        status: "",
        isActive: true
    });

    // Load tables from API
    useEffect(() => {
        const fetchTables = async () => {
            try {
                // Replace with actual API call when ready
                // const response = await fetch('/api/tables');
                // if (!response.ok) throw new Error('Failed to fetch tables');
                // const data = await response.json();
                // setTables(data.tables);

                // Using mock data for now
                setTables(MOCK_TABLES);
            } catch (error) {
                console.error('Error fetching tables:', error);
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to load tables. Please try again."
                });
            }
        };

        fetchTables();
    }, [toast]);

    // Filter tables based on search query, location, and status
    useEffect(() => {
        let filtered = [...tables];

        if (searchQuery) {
            filtered = filtered.filter(
                (table) =>
                    table.tableNumber.toString().includes(searchQuery) ||
                    table.location.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (locationFilter !== "all") {
            filtered = filtered.filter((table) => table.location === locationFilter);
        }

        if (statusFilter !== "all") {
            filtered = filtered.filter((table) => table.status === statusFilter);
        }

        setFilteredTables(filtered);
    }, [tables, searchQuery, locationFilter, statusFilter]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleAddTable = async () => {
        try {
            // Validate form
            if (!newTable.tableNumber || !newTable.capacity) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Table number and capacity are required."
                });
                return;
            }

            // Replace with actual API call when ready
            // const response = await fetch('/api/tables', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(newTable),
            // });
            // if (!response.ok) throw new Error('Failed to create table');
            // const data = await response.json();

            // Mock implementation - add to local state
            const tableNumber = parseInt(newTable.tableNumber);
            const capacity = parseInt(newTable.capacity);

            const newId = Math.max(...tables.map(t => t.id)) + 1;
            const createdTable = {
                id: newId,
                tableNumber,
                capacity,
                location: newTable.location,
                shape: newTable.shape,
                status: newTable.status,
                isActive: newTable.isActive
            };

            setTables([...tables, createdTable]);

            // Reset form and close dialog
            setNewTable({
                tableNumber: "",
                capacity: "",
                location: "Main Floor",
                shape: "rectangle",
                status: "available",
                isActive: true
            });

            setIsAddDialogOpen(false);

            toast({
                title: "Success",
                description: `Table ${tableNumber} has been created.`
            });
        } catch (error) {
            console.error('Error creating table:', error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to create table. Please try again."
            });
        }
    };

    const openEditDialog = (table: any) => {
        setEditTable({
            id: table.id,
            tableNumber: table.tableNumber.toString(),
            capacity: table.capacity.toString(),
            location: table.location,
            shape: table.shape,
            status: table.status,
            isActive: table.isActive
        });
        setIsEditDialogOpen(true);
    };

    const handleEditTable = async () => {
        try {
            // Validate form
            if (!editTable.tableNumber || !editTable.capacity) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Table number and capacity are required."
                });
                return;
            }

            // Replace with actual API call when ready
            // const response = await fetch(`/api/tables?id=${editTable.id}`, {
            //     method: 'PATCH',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(editTable),
            // });
            // if (!response.ok) throw new Error('Failed to update table');
            // const data = await response.json();

            // Mock implementation - update local state
            const tableNumber = parseInt(editTable.tableNumber);
            const capacity = parseInt(editTable.capacity);

            const updatedTables = tables.map(table =>
                table.id === editTable.id
                    ? {
                        ...table,
                        tableNumber,
                        capacity,
                        location: editTable.location,
                        shape: editTable.shape,
                        status: editTable.status,
                        isActive: editTable.isActive
                    }
                    : table
            );

            setTables(updatedTables);

            setIsEditDialogOpen(false);

            toast({
                title: "Success",
                description: `Table ${tableNumber} has been updated.`
            });
        } catch (error) {
            console.error('Error updating table:', error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to update table. Please try again."
            });
        }
    };

    const openDeleteDialog = (table: any) => {
        setSelectedTable(table);
        setIsDeleteDialogOpen(true);
    };

    const handleDeleteTable = async () => {
        try {
            if (!selectedTable) return;

            // Replace with actual API call when ready
            // const response = await fetch(`/api/tables?id=${selectedTable.id}`, {
            //     method: 'DELETE',
            // });
            // if (!response.ok) throw new Error('Failed to delete table');

            // Mock implementation - remove from local state
            const updatedTables = tables.filter(table => table.id !== selectedTable.id);
            setTables(updatedTables);

            setIsDeleteDialogOpen(false);
            setSelectedTable(null);

            toast({
                title: "Success",
                description: `Table ${selectedTable.tableNumber} has been deleted.`
            });
        } catch (error) {
            console.error('Error deleting table:', error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to delete table. Please try again."
            });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => router.push("/dashboard/reservations")}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <h1 className="text-3xl font-bold tracking-tight">Table Management</h1>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Table
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Table</DialogTitle>
                            <DialogDescription>
                                Create a new table for your restaurant.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="tableNumber">Table Number</Label>
                                    <Input
                                        id="tableNumber"
                                        type="number"
                                        value={newTable.tableNumber}
                                        onChange={(e) => setNewTable({ ...newTable, tableNumber: e.target.value })}
                                        placeholder="Table number"
                                        min="1"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="capacity">Capacity</Label>
                                    <Input
                                        id="capacity"
                                        type="number"
                                        value={newTable.capacity}
                                        onChange={(e) => setNewTable({ ...newTable, capacity: e.target.value })}
                                        placeholder="Guests"
                                        min="1"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Select
                                    value={newTable.location}
                                    onValueChange={(value) => setNewTable({ ...newTable, location: value })}
                                >
                                    <SelectTrigger id="location">
                                        <SelectValue placeholder="Select location" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {LOCATION_OPTIONS.map((location) => (
                                            <SelectItem key={location} value={location}>
                                                {location}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="shape">Table Shape</Label>
                                <Select
                                    value={newTable.shape}
                                    onValueChange={(value) => setNewTable({ ...newTable, shape: value })}
                                >
                                    <SelectTrigger id="shape">
                                        <SelectValue placeholder="Select shape" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {SHAPE_OPTIONS.map((shape) => (
                                            <SelectItem key={shape.value} value={shape.value}>
                                                <div className="flex items-center">
                                                    {shape.icon}
                                                    <span className="ml-2">{shape.label}</span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    value={newTable.status}
                                    onValueChange={(value) => setNewTable({ ...newTable, status: value })}
                                >
                                    <SelectTrigger id="status">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {STATUS_OPTIONS.map((status) => (
                                            <SelectItem key={status.value} value={status.value}>
                                                {status.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button onClick={handleAddTable}>Create Table</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <CardTitle>Tables</CardTitle>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <div className="relative w-full sm:w-auto">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search tables..."
                                    className="pl-8 w-full sm:w-[200px]"
                                    value={searchQuery}
                                    onChange={handleSearch}
                                />
                            </div>
                            <Select value={locationFilter} onValueChange={setLocationFilter}>
                                <SelectTrigger className="w-full sm:w-[150px]">
                                    <SelectValue placeholder="Filter by location" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Locations</SelectItem>
                                    {LOCATION_OPTIONS.map((location) => (
                                        <SelectItem key={location} value={location}>
                                            {location}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-full sm:w-[150px]">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    {STATUS_OPTIONS.map((status) => (
                                        <SelectItem key={status.value} value={status.value}>
                                            {status.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Table No.</TableHead>
                                    <TableHead>Capacity</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Shape</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Active</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredTables.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-24 text-center">
                                            No tables found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredTables.map((table) => (
                                        <TableRow key={table.id}>
                                            <TableCell className="font-medium">{table.tableNumber}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center">
                                                    <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                                                    {table.capacity}
                                                </div>
                                            </TableCell>
                                            <TableCell>{table.location}</TableCell>
                                            <TableCell className="capitalize">{table.shape}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    className={
                                                        STATUS_OPTIONS.find(s => s.value === table.status)?.className
                                                    }
                                                >
                                                    {table.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={table.isActive ? "default" : "outline"}
                                                    className={table.isActive ?
                                                        "bg-green-100 text-green-800 hover:bg-green-100" :
                                                        "bg-gray-100 text-gray-800 hover:bg-gray-100"
                                                    }
                                                >
                                                    {table.isActive ? "Yes" : "No"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => openEditDialog(table)}
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => openDeleteDialog(table)}
                                                    >
                                                        <Trash className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Edit Table Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Table</DialogTitle>
                        <DialogDescription>
                            Update table information.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-tableNumber">Table Number</Label>
                                <Input
                                    id="edit-tableNumber"
                                    type="number"
                                    value={editTable.tableNumber}
                                    onChange={(e) => setEditTable({ ...editTable, tableNumber: e.target.value })}
                                    placeholder="Table number"
                                    min="1"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-capacity">Capacity</Label>
                                <Input
                                    id="edit-capacity"
                                    type="number"
                                    value={editTable.capacity}
                                    onChange={(e) => setEditTable({ ...editTable, capacity: e.target.value })}
                                    placeholder="Guests"
                                    min="1"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-location">Location</Label>
                            <Select
                                value={editTable.location}
                                onValueChange={(value) => setEditTable({ ...editTable, location: value })}
                            >
                                <SelectTrigger id="edit-location">
                                    <SelectValue placeholder="Select location" />
                                </SelectTrigger>
                                <SelectContent>
                                    {LOCATION_OPTIONS.map((location) => (
                                        <SelectItem key={location} value={location}>
                                            {location}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-shape">Table Shape</Label>
                            <Select
                                value={editTable.shape}
                                onValueChange={(value) => setEditTable({ ...editTable, shape: value })}
                            >
                                <SelectTrigger id="edit-shape">
                                    <SelectValue placeholder="Select shape" />
                                </SelectTrigger>
                                <SelectContent>
                                    {SHAPE_OPTIONS.map((shape) => (
                                        <SelectItem key={shape.value} value={shape.value}>
                                            <div className="flex items-center">
                                                {shape.icon}
                                                <span className="ml-2">{shape.label}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-status">Status</Label>
                            <Select
                                value={editTable.status}
                                onValueChange={(value) => setEditTable({ ...editTable, status: value })}
                            >
                                <SelectTrigger id="edit-status">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {STATUS_OPTIONS.map((status) => (
                                        <SelectItem key={status.value} value={status.value}>
                                            {status.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="edit-isActive"
                                checked={editTable.isActive}
                                onChange={(e) => setEditTable({ ...editTable, isActive: e.target.checked })}
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <Label htmlFor="edit-isActive">Active</Label>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={handleEditTable}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Table Alert Dialog */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Table</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete Table {selectedTable?.tableNumber}? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteTable}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
} 