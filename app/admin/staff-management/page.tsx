"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    ChevronLeft,
    Plus,
    Search,
    Filter,
    Edit,
    Trash2,
    UserPlus,
    Mail,
    Check,
    X
} from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';

// Replace with actual API calls in a real implementation
const fetchUsers = async () => {
    const response = await fetch('/api/admin/users');
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return response.json();
};

// Temporary mocked data - replace with actual API integration
const mockUsers = [
    {
        id: 1,
        name: 'John Admin',
        email: 'john@example.com',
        role: 'admin',
        createdAt: '2023-01-15',
        hasActiveSubscription: true,
        status: 'active',
    },
    {
        id: 2,
        name: 'Sarah Staff',
        email: 'sarah@example.com',
        role: 'staff',
        createdAt: '2023-02-20',
        hasActiveSubscription: true,
        status: 'active',
    },
    {
        id: 3,
        name: 'Michael Kitchen',
        email: 'michael@example.com',
        role: 'kitchen',
        createdAt: '2023-03-10',
        hasActiveSubscription: true,
        status: 'active',
    },
    {
        id: 4,
        name: 'Lisa User',
        email: 'lisa@example.com',
        role: 'user',
        createdAt: '2023-04-05',
        hasActiveSubscription: false,
        status: 'invited',
    },
    {
        id: 5,
        name: 'David Staff',
        email: 'david@example.com',
        role: 'staff',
        createdAt: '2023-05-12',
        hasActiveSubscription: true,
        status: 'inactive',
    },
];

const roleOptions = [
    { value: 'all', label: 'All Roles' },
    { value: 'admin', label: 'Admin' },
    { value: 'staff', label: 'Staff' },
    { value: 'kitchen', label: 'Kitchen' },
    { value: 'user', label: 'User' },
];

const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'invited', label: 'Invited' },
    { value: 'inactive', label: 'Inactive' },
];

export default function StaffManagementPage() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedRole, setSelectedRole] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const { toast } = useToast();

    // Form fields for the add/edit user dialog
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'staff',
        sendInvite: true,
    });

    useEffect(() => {
        // In a real implementation, this would be an API call
        // const loadUsers = async () => {
        //     try {
        //         const data = await fetchUsers();
        //         setUsers(data);
        //     } catch (error) {
        //         console.error('Failed to load users:', error);
        //         toast({
        //             title: 'Error',
        //             description: 'Failed to load users. Please try again.',
        //             variant: 'destructive',
        //         });
        //     } finally {
        //         setIsLoading(false);
        //     }
        // };

        // loadUsers();

        // Using mock data for demonstration
        setUsers(mockUsers);
        setIsLoading(false);
    }, []);

    const handleAddUser = () => {
        // In a real implementation, this would make an API call to create the user
        const newUser = {
            id: users.length + 1,
            ...formData,
            createdAt: new Date().toLocaleDateString(),
            hasActiveSubscription: false,
            status: formData.sendInvite ? 'invited' : 'inactive',
        };

        setUsers([...users, newUser]);
        setIsAddUserDialogOpen(false);

        toast({
            title: 'User Added',
            description: `${formData.name} has been successfully added as a ${formData.role}.`,
        });

        // Reset form data
        setFormData({
            name: '',
            email: '',
            role: 'staff',
            sendInvite: true,
        });
    };

    const handleDeleteUser = () => {
        if (!userToDelete) return;

        // In a real implementation, this would make an API call to delete the user
        const updatedUsers = users.filter(user => user.id !== userToDelete.id);
        setUsers(updatedUsers);
        setIsDeleteDialogOpen(false);
        setUserToDelete(null);

        toast({
            title: 'User Removed',
            description: `${userToDelete.name} has been successfully removed.`,
        });
    };

    const handleResendInvite = (user) => {
        // In a real implementation, this would make an API call to resend invitation
        toast({
            title: 'Invitation Sent',
            description: `Invitation has been sent to ${user.email}.`,
        });
    };

    const handleReactivateUser = (user) => {
        // In a real implementation, this would make an API call to reactivate the user
        const updatedUsers = users.map(u =>
            u.id === user.id ? { ...u, status: 'active' } : u
        );
        setUsers(updatedUsers);

        toast({
            title: 'User Reactivated',
            description: `${user.name} has been successfully reactivated.`,
        });
    };

    // Filter users based on search, role, and status
    const filteredUsers = users.filter(user => {
        const matchesSearch =
            user.name?.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase());

        const matchesRole = selectedRole === 'all' || user.role === selectedRole;
        const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;

        return matchesSearch && matchesRole && matchesStatus;
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">User & Staff Management</h1>
                <Link href="/admin">
                    <Button variant="outline" size="sm">
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </Button>
                </Link>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                            type="search"
                            placeholder="Search by name or email..."
                            className="pl-8"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <Select value={selectedRole} onValueChange={setSelectedRole}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Role" />
                            </SelectTrigger>
                            <SelectContent>
                                {roleOptions.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                {statusOptions.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <Button onClick={() => setIsAddUserDialogOpen(true)} className="whitespace-nowrap">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add User
                </Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Joined Date</TableHead>
                            <TableHead>Subscription</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-8">
                                    <div className="flex justify-center">
                                        <div className="animate-spin h-6 w-6 border-2 border-[#e85c2c] border-t-transparent rounded-full"></div>
                                    </div>
                                    <div className="mt-2 text-sm text-gray-500">Loading users...</div>
                                </TableCell>
                            </TableRow>
                        ) : filteredUsers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-8">
                                    <div className="text-gray-500">No users found</div>
                                    {search || selectedRole !== 'all' || selectedStatus !== 'all' ? (
                                        <div className="mt-2">
                                            <Button
                                                variant="link"
                                                onClick={() => {
                                                    setSearch('');
                                                    setSelectedRole('all');
                                                    setSelectedStatus('all');
                                                }}
                                            >
                                                Clear filters
                                            </Button>
                                        </div>
                                    ) : null}
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.name || 'N/A'}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded text-xs ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                                                user.role === 'staff' ? 'bg-blue-100 text-blue-800' :
                                                    user.role === 'kitchen' ? 'bg-amber-100 text-amber-800' :
                                                        'bg-gray-100 text-gray-800'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded text-xs ${user.status === 'active' ? 'bg-green-100 text-green-800' :
                                                user.status === 'invited' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-gray-100 text-gray-800'
                                            }`}>
                                            {user.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>{user.createdAt}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded text-xs ${user.hasActiveSubscription ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {user.hasActiveSubscription ? 'Active' : 'None'}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            {user.status === 'invited' && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleResendInvite(user)}
                                                    title="Resend invitation"
                                                >
                                                    <Mail className="h-4 w-4" />
                                                </Button>
                                            )}

                                            {user.status === 'inactive' && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleReactivateUser(user)}
                                                    title="Reactivate user"
                                                >
                                                    <Check className="h-4 w-4" />
                                                </Button>
                                            )}

                                            <Button
                                                variant="outline"
                                                size="sm"
                                                title="Edit user"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>

                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="text-red-500 hover:text-red-700"
                                                title="Delete user"
                                                onClick={() => {
                                                    setUserToDelete(user);
                                                    setIsDeleteDialogOpen(true);
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Add User Dialog */}
            <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New User</DialogTitle>
                        <DialogDescription>
                            Add a new user or staff member to your organization.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                placeholder="Enter full name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="email@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Select
                                value={formData.role}
                                onValueChange={(value) => setFormData({ ...formData, role: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="admin">Administrator</SelectItem>
                                    <SelectItem value="staff">Staff</SelectItem>
                                    <SelectItem value="kitchen">Kitchen</SelectItem>
                                    <SelectItem value="user">User</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-xs text-gray-500 mt-1">
                                {formData.role === 'admin' && "Full access to all settings and management features."}
                                {formData.role === 'staff' && "Can manage orders, customers, and day-to-day operations."}
                                {formData.role === 'kitchen' && "Access to kitchen dashboard for order preparation."}
                                {formData.role === 'user' && "Basic access with limited permissions."}
                            </p>
                        </div>
                        <div className="flex items-center space-x-2 pt-2">
                            <Checkbox
                                id="sendInvite"
                                checked={formData.sendInvite}
                                onCheckedChange={(checked) => setFormData({ ...formData, sendInvite: checked })}
                            />
                            <Label htmlFor="sendInvite">Send invitation email</Label>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleAddUser}
                            disabled={!formData.email || !formData.name}
                        >
                            Add User
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this user? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    {userToDelete && (
                        <div className="py-4">
                            <p className="mb-2"><strong>Name:</strong> {userToDelete.name}</p>
                            <p className="mb-2"><strong>Email:</strong> {userToDelete.email}</p>
                            <p><strong>Role:</strong> {userToDelete.role}</p>
                        </div>
                    )}
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteUser}>
                            Delete User
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
} 