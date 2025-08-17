

'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Search, UserPlus, Edit2, Trash2, MoreHorizontal, Loader2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { getAllUsers, updateUserProfile } from '@/services/userService';
import { roleService, type Role } from '@/services/roleService';
import type { User } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';


export function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState<Partial<User>>({
    first_name: '',
    last_name: '',
    email: '',
    roles: ['User'] // Default role
  });
  const { toast } = useToast();
  
  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [fetchedUsers, fetchedRoles] = await Promise.all([
        getAllUsers(),
        roleService.getRoles()
      ]);
      setUsers(fetchedUsers);
      setRoles(fetchedRoles);
    } catch (error) {
       toast({
        title: "Error",
        description: "Failed to fetch users or roles.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchInitialData();
  }, []);


  const filteredUsers = users.filter(user => {
    const name = `${user.first_name || ''} ${user.last_name || ''}`.toLowerCase();
    const matchesSearch = name.includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const userRole = user.roles && user.roles.length > 0 ? user.roles[0] : 'User';
    const matchesRole = selectedRole === 'All Roles' || userRole === selectedRole;
    return matchesSearch && matchesRole;
  });
  
  const availableRoles = useMemo(() => roles.map(r => r.name), [roles]);

  const handleAddUser = async () => {
    if (!newUser.email) {
      toast({
        title: "Error",
        description: "Please provide an email for the new user.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, you'd have a createUser service function.
    // For now, we'll simulate by adding to local state and calling updateUser to mock a creation.
    const tempId = `new_${Date.now()}`;
    const userToCreate: User = {
        userId: tempId,
        email: newUser.email!,
        username: newUser.email!,
        ...newUser,
        roles: newUser.roles || ['User']
    };

    const success = await updateUserProfile(userToCreate);

    if (success) {
        setUsers([...users, userToCreate]);
        setNewUser({ first_name: '', last_name: '', email: '', roles: ['User'] });
        setIsAddUserOpen(false);
        toast({
          title: "Success",
          description: "User added successfully"
        });
        fetchInitialData(); // Refresh list
    } else {
         toast({
          title: "Error",
          description: "Failed to add user.",
          variant: "destructive"
        });
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setNewUser({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      roles: user.roles || ['User']
    });
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;
    
    const userToUpdate = { ...editingUser, ...newUser };
    const success = await updateUserProfile(userToUpdate);

    if (success) {
      const updatedUsers = users.map(user => 
        user.userId === editingUser.userId 
          ? userToUpdate
          : user
      );
      setUsers(updatedUsers);
      setEditingUser(null);
      setNewUser({ first_name: '', last_name: '', email: '', roles: ['User'] });
      toast({
        title: "Success",
        description: "User updated successfully"
      });
    } else {
       toast({
        title: "Error",
        description: "Failed to update user.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteUser = (userId: string) => {
    // This would call a deleteUser service in a real app.
    setUsers(users.filter(user => user.userId !== userId));
    toast({
      title: "Success",
      description: "User deleted successfully (client-side). Implement backend delete call."
    });
  };

  const resetForm = () => {
    setNewUser({ first_name: '', last_name: '', email: '', roles: ['User'] });
    setEditingUser(null);
  };
  
  if (loading) {
    return (
        <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
          <p className="text-sm text-gray-600 mt-1">Manage user accounts and permissions</p>
        </div>
        <Button onClick={() => setIsAddUserOpen(true)} className="bg-orange-500 hover:bg-orange-600">
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Roles">All Roles</SelectItem>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.name}>{role.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => {
                const userRole = user.roles && user.roles.length > 0 ? user.roles[0] : 'User';
                return (
                <TableRow key={user.userId}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.first_name?.charAt(0)}{user.last_name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-blue-600">{user.first_name} {user.last_name}</div>
                        <div className="text-sm text-gray-600">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary" 
                      className={userRole === 'Admin' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                    >
                      {userRole}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={'default'}
                      className={'bg-green-500'}
                    >
                      Active
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">Never</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditUser(user)}
                        className="text-orange-600 hover:text-orange-700"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteUser(user.userId)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )})}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isAddUserOpen || editingUser !== null} onOpenChange={(open) => {
        if (!open) {
          setIsAddUserOpen(false);
          resetForm();
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingUser ? 'Edit User' : 'Add New User'}</DialogTitle>
            <DialogDescription>
              {editingUser ? 'Update user information and permissions.' : 'Create a new user account with appropriate permissions.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="first_name" className="text-right">
                First Name
              </Label>
              <Input
                id="first_name"
                value={newUser.first_name || ''}
                onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
                className="col-span-3"
                placeholder="Enter first name"
              />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="last_name" className="text-right">
                Last Name
              </Label>
              <Input
                id="last_name"
                value={newUser.last_name || ''}
                onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
                className="col-span-3"
                placeholder="Enter last name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={newUser.email || ''}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="col-span-3"
                placeholder="Enter email address"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select value={newUser.roles ? newUser.roles[0] : 'User'} onValueChange={(value) => setNewUser({ ...newUser, roles: [value] })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roles.map(role => (
                    <SelectItem key={role.id} value={role.name}>{role.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsAddUserOpen(false);
              resetForm();
            }}>
              Cancel
            </Button>
            <Button onClick={editingUser ? handleUpdateUser : handleAddUser} className="bg-orange-500 hover:bg-orange-600">
              {editingUser ? 'Update User' : 'Add User'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
