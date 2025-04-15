"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    Search,
    Plus,
    Users,
    ChefHat,
    UserCog,
    MoreHorizontal,
    Edit,
    Trash,
    UserPlus,
    Filter,
    Mail
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface StaffMember {
    id: number;
    name: string;
    email: string;
    role: string;
    department: string;
    status: string;
    avatar?: string;
    enrolledAt: string;
}

export default function StaffManagementPage() {
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const [staff, setStaff] = useState<StaffMember[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("all");

    // Mock data for demonstration
    useEffect(() => {
        // In a real application, this would be fetched from an API
        const mockStaffData: StaffMember[] = [
            {
                id: 1,
                name: "Alex Johnson",
                email: "alex@example.com",
                role: "Kitchen",
                department: "Chef",
                status: "Active",
                enrolledAt: "May 12, 2024"
            },
            {
                id: 2,
                name: "Jamie Smith",
                email: "jamie@example.com",
                role: "Restaurant",
                department: "Server",
                status: "Active",
                enrolledAt: "May 10, 2024"
            },
            {
                id: 3,
                name: "Taylor Brown",
                email: "taylor@example.com",
                role: "Admin",
                department: "Manager",
                status: "Active",
                enrolledAt: "April 28, 2024"
            },
            {
                id: 4,
                name: "Morgan Wilson",
                email: "morgan@example.com",
                role: "Kitchen",
                department: "Sous Chef",
                status: "Active",
                enrolledAt: "May 5, 2024"
            },
            {
                id: 5,
                name: "Jordan Lee",
                email: "jordan@example.com",
                role: "Restaurant",
                department: "Host",
                status: "Active",
                enrolledAt: "May 8, 2024"
            },
            {
                id: 6,
                name: "Casey Miller",
                email: "casey@example.com",
                role: "Admin",
                department: "Accountant",
                status: "Active",
                enrolledAt: "April 15, 2024"
            },
            {
                id: 7,
                name: "Riley Davis",
                email: "riley@example.com",
                role: "Kitchen",
                department: "Line Cook",
                status: "Active",
                enrolledAt: "May 3, 2024"
            }
        ];

        setTimeout(() => {
            setStaff(mockStaffData);
            setLoading(false);
        }, 800); // Simulate loading delay
    }, []);

    const filteredStaff = staff.filter((member) => {
        // First apply role/department filter based on active tab
        if (activeTab !== "all" && member.role.toLowerCase() !== activeTab.toLowerCase()) {
            return false;
        }

        // Then apply search query if present
        if (searchQuery) {
            return (
                member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.department.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return true;
    });

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleTabChange = (value: string) => {
        setActiveTab(value);
    };

    const getRoleIcon = (role: string) => {
        switch (role.toLowerCase()) {
            case 'kitchen':
                return <ChefHat className="h-5 w-5 text-amber-700" />;
            case 'admin':
                return <UserCog className="h-5 w-5 text-blue-700" />;
            case 'restaurant':
                return <Users className="h-5 w-5 text-green-700" />;
            default:
                return <Users className="h-5 w-5 text-gray-700" />;
        }
    };

    const getRoleBadgeStyle = (role: string) => {
        switch (role.toLowerCase()) {
            case 'kitchen':
                return "bg-amber-100 text-amber-800 border-amber-200";
            case 'admin':
                return "bg-blue-100 text-blue-800 border-blue-200";
            case 'restaurant':
                return "bg-green-100 text-green-800 border-green-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const handleAddStaff = () => {
        toast({
            title: "Feature coming soon",
            description: "This functionality will be available in a future update.",
        });
    };

    const handleEditStaff = (id: number) => {
        toast({
            title: "Edit staff member",
            description: `Editing staff with ID: ${id}`,
        });
    };

    const handleDeleteStaff = (id: number) => {
        toast({
            title: "Delete staff member",
            description: `Delete request for staff with ID: ${id}`,
            variant: "destructive",
        });
    };

    if (loading) {
        return (
            <div className="flex flex-col p-6 h-full">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold">Staff Management</h1>
                </div>
                <Card className="animate-pulse">
                    <CardHeader className="h-20 bg-gray-200 rounded-t-lg" />
                    <CardContent className="p-6">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="h-16 bg-gray-200 rounded mb-2" />
                        ))}
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex flex-col p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Staff Management</h1>
                    <p className="text-muted-foreground mt-1">Track all staff members</p>
                </div>
                <Button className="bg-[#e85c2c] hover:bg-[#d24e20] text-white" onClick={handleAddStaff}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Staff
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-blue-800">Admin Staff</p>
                                <h3 className="text-3xl font-bold text-blue-900 mt-1">
                                    {staff.filter(m => m.role.toLowerCase() === 'admin').length}
                                </h3>
                            </div>
                            <div className="bg-blue-200 p-2 rounded-full">
                                <UserCog className="h-5 w-5 text-blue-700" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-amber-800">Kitchen Staff</p>
                                <h3 className="text-3xl font-bold text-amber-900 mt-1">
                                    {staff.filter(m => m.role.toLowerCase() === 'kitchen').length}
                                </h3>
                            </div>
                            <div className="bg-amber-200 p-2 rounded-full">
                                <ChefHat className="h-5 w-5 text-amber-700" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-green-800">Restaurant Staff</p>
                                <h3 className="text-3xl font-bold text-green-900 mt-1">
                                    {staff.filter(m => m.role.toLowerCase() === 'restaurant').length}
                                </h3>
                            </div>
                            <div className="bg-green-200 p-2 rounded-full">
                                <Users className="h-5 w-5 text-green-700" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex flex-col sm:flex-row justify-between mb-6 gap-3">
                <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full sm:w-auto">
                    <TabsList className="bg-muted/50">
                        <TabsTrigger value="all">All Staff</TabsTrigger>
                        <TabsTrigger value="admin">Admin</TabsTrigger>
                        <TabsTrigger value="kitchen">Kitchen</TabsTrigger>
                        <TabsTrigger value="restaurant">Restaurant</TabsTrigger>
                    </TabsList>
                </Tabs>

                <div className="flex w-full sm:w-auto gap-2">
                    <div className="relative w-full sm:w-auto">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search staff..."
                            value={searchQuery}
                            onChange={handleSearch}
                            className="pl-8 w-full sm:w-[250px]"
                        />
                    </div>
                    <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead className="hidden md:table-cell">Status</TableHead>
                                <TableHead className="hidden md:table-cell">Enrolled</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredStaff.length > 0 ? (
                                filteredStaff.map((member) => (
                                    <TableRow key={member.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9">
                                                    <AvatarFallback className="bg-muted">
                                                        {member.name.split(' ').map(n => n[0]).join('')}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium">{member.name}</p>
                                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                        <Mail className="h-3 w-3" />
                                                        <span>{member.email}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-1">
                                                <Badge variant="outline" className={`${getRoleBadgeStyle(member.role)} border-0`}>
                                                    {member.role}
                                                </Badge>
                                                <span className="text-xs text-muted-foreground">{member.department}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            <Badge variant="outline" className="bg-green-100 text-green-800 border-0">
                                                {member.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {member.enrolledAt}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => handleEditStaff(member.id)}>
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        onClick={() => handleDeleteStaff(member.id)}
                                                        className="text-red-600"
                                                    >
                                                        <Trash className="mr-2 h-4 w-4" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center">
                                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                                            <Users className="h-8 w-8 mb-2" />
                                            <p>No staff members found.</p>
                                            <p className="text-sm">Try adjusting your search or filters.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
} 