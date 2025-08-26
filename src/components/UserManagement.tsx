
'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader } from './ui/card';
import { Search, UserPlus, Edit2, Trash2, MoreHorizontal, Loader2, ChevronsUpDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getAllUsers, updateUserProfile } from '@/services/userService';
import { roleService, type Role } from '@/services/roleService';
import { getCompanyById } from '@/services/companyService';
import type { User } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Checkbox } from './ui/checkbox';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';


export function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('All Roles');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [companyNames, setCompanyNames] = useState<{[userId: string]: string}>({});
  const [newUser, setNewUser] = useState<Partial<User> & { active: boolean }>({
    first_name: '',
    last_name: '',
    email: '',
    roles: [],
    active: true,
    bio: '',
    avatar: '',
    password: '',
    Company: '',
  });
  const { toast } = useToast();
  
  // Fetch company names for users
  const fetchCompanyNames = async (usersList: User[]) => {
    const companyNamesMap: {[userId: string]: string} = {};
    
    for (const user of usersList) {
      if (user.company_id) {
        try {
          const companyId = typeof user.company_id === 'object' 
            ? user.company_id.$oid 
            : user.company_id;
          
          const company = await getCompanyById(companyId);
          if (company?.company_name) {
            companyNamesMap[user.userId] = company.company_name;
          }
        } catch (error) {
          console.error(`Failed to fetch company for user ${user.userId}:`, error);
        }
      }
    }
    
    setCompanyNames(companyNamesMap);
  };

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [fetchedUsers, fetchedRoles] = await Promise.all([
        getAllUsers(),
        roleService.getRoles()
      ]);
      setUsers(fetchedUsers);
      setRoles(fetchedRoles);
      
      // Fetch company names for the users
      await fetchCompanyNames(fetchedUsers);
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
                         (user.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    const userRoles = user.roles && user.roles.length > 0 ? user.roles : [];
    const matchesRole = selectedRoleFilter === 'All Roles' || userRoles.includes(selectedRoleFilter);
    return matchesSearch && matchesRole;
  });

  const availableRoles = useMemo(() => roles, [roles]);
  
  const handleAddUser = async () => {
    if (!newUser.email) {
      toast({
        title: "Error",
        description: "Please provide an email for the new user.",
        variant: "destructive"
      });
      return;
    }
    
    const userToCreate: Partial<User> = {
        ...newUser,
        active: newUser.active ? 'true' : 'false',
    };

    const success = await updateUserProfile(userToCreate);

    if (success) {
        resetForm();
        setIsAddUserOpen(false);
        toast({
          title: "Success",
          description: "User added successfully"
        });
        fetchInitialData();
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
      roles: user.roles || [],
      userId: user.userId,
      active: user.active === 'true',
      bio: user.bio || '',
      avatar: user.avatar || '',
      password: '', // Don't pre-fill password for security
      Company: user.Company || '',
    });
    setIsAddUserOpen(true);
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;
    
    const userToUpdate: Partial<User> = {
        userId: editingUser.userId,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        roles: newUser.roles || [],
        active: newUser.active ? 'true' : 'false',
        bio: newUser.bio,
        avatar: newUser.avatar,
        Company: newUser.Company,
    };
    
    // Only include password if it was changed
    if (newUser.password) {
        userToUpdate.password = newUser.password;
    }

    const success = await updateUserProfile(userToUpdate);

    if (success) {
      const updatedUsers = users.map(user => 
        user.userId === editingUser.userId 
          ? { ...user, ...userToUpdate, active: userToUpdate.active! }
          : user
      );
      setUsers(updatedUsers);
      setEditingUser(null);
      resetForm();
      setIsAddUserOpen(false);
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
    setNewUser({ 
      first_name: '', 
      last_name: '', 
      email: '', 
      roles: [],
      active: true,
      bio: '',
      avatar: '',
      password: '',
      Company: '',
    });
    setEditingUser(null);
  };

  const handleRoleSelection = (roleName: string) => {
    setNewUser(prev => {
        const roles = prev.roles ? [...prev.roles] : [];
        const index = roles.indexOf(roleName);
        if (index > -1) {
            roles.splice(index, 1);
        } else {
            roles.push(roleName);
        }
        return {...prev, roles};
    })
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
              <Select value={selectedRoleFilter} onValueChange={setSelectedRoleFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Roles">All Roles</SelectItem>
                  {availableRoles.map(role => (
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
                const userRoles = user.roles && user.roles.length > 0 ? user.roles : ['User'];
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
                    <div className="flex flex-wrap gap-1">
                      {userRoles.map(role => (
                          <Badge 
                              key={role}
                              variant="secondary" 
                              className={cn(
                                  "font-normal",
                                  role === 'Admin' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                              )}
                          >
                          {role}
                          </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={'default'}
                      className={cn(user.active === 'true' ? 'bg-green-500' : 'bg-gray-400')}
                    >
                      {user.active === 'true' ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">Never</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          handleEditUser(user);
                        }}
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

      <Dialog open={isAddUserOpen} onOpenChange={(open) => {
        if (!open) {
          setIsAddUserOpen(false);
          resetForm();
        }
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingUser ? 'Edit User' : 'Add New User'}</DialogTitle>
            <DialogDescription>
              {editingUser ? 'Update user information and permissions.' : 'Create a new user account with appropriate permissions.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-6">
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
                disabled={!!editingUser}
              />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={newUser.password || ''}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="col-span-3"
                placeholder={editingUser ? "Enter new password (optional)" : "Enter password"}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Company" className="text-right">
                Company
              </Label>
              <Input
                id="Company"
                value={editingUser ? (companyNames[editingUser.userId] || 'No Company') : newUser.Company || ''}
                onChange={(e) => setNewUser({ ...newUser, Company: e.target.value })}
                className="col-span-3"
                placeholder="Enter company name"
                disabled={!!editingUser}
                title={editingUser ? 'Company is managed through company assignments' : ''}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="avatar" className="text-right">
                Avatar URL
              </Label>
              <Input
                id="avatar"
                value={newUser.avatar || ''}
                onChange={(e) => setNewUser({ ...newUser, avatar: e.target.value })}
                className="col-span-3"
                placeholder="https://example.com/avatar.png"
              />
            </div>
             <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="bio" className="text-right pt-2">
                Bio
              </Label>
              <Textarea
                id="bio"
                value={newUser.bio || ''}
                onChange={(e) => setNewUser({ ...newUser, bio: e.target.value })}
                className="col-span-3"
                placeholder="Tell us about the user"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">
                Roles
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        className="col-span-3 justify-between font-normal"
                    >
                        <span className="truncate">
                            {newUser.roles && newUser.roles.length > 0 ? newUser.roles.join(', ') : "Select roles..."}
                        </span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                    <ScrollArea className="h-48">
                        <div className="p-2 space-y-1">
                            {availableRoles.map(role => (
                                <div key={role.id} className="flex items-center space-x-2 p-2 hover:bg-accent rounded-md">
                                    <Checkbox 
                                        id={`role-${role.id}`}
                                        checked={newUser.roles?.includes(role.name)}
                                        onCheckedChange={() => handleRoleSelection(role.name)}
                                    />
                                    <Label htmlFor={`role-${role.id}`} className="font-normal flex-1 cursor-pointer">
                                        {role.name}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </PopoverContent>
              </Popover>
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="active" className="text-right">
                Active
              </Label>
              <div className="col-span-3">
                <Switch
                    id="active"
                    checked={newUser.active}
                    onCheckedChange={(checked) => setNewUser({ ...newUser, active: checked })}
                    className={cn('transition-opacity', !newUser.active && 'opacity-50')}
                />
              </div>
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

