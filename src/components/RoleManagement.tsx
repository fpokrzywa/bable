'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Search, Plus, Edit2, Trash2, Users, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from './ui/checkbox';
import { Textarea } from './ui/textarea';
import { roleService, testRoleWebhooks, type Role } from '@/services/roleService';

const availablePermissions = [
  'User Management',
  'Role Management',
  'System Settings',
  'View Reports',
  'Export Data',
  'Import Data',
  'Manage Workspaces',
  'AI Tools Access',
  'Admin Panel'
];

export function RoleManagement() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: [] as string[]
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  // Load roles on component mount
  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      console.log('Fetching roles...');
      const rolesData = await roleService.getRoles();
      console.log('Roles data received in component:', rolesData);
      setRoles(rolesData);
      
      // Show info toast if using sample data (check if all roles have mock IDs)
      const isUsingSampleData = rolesData.every(role => role.id.startsWith('sample-') || role.id.startsWith('mock-'));
      if (isUsingSampleData && rolesData.length > 0) {
        toast({
          title: "Demo Mode",
          description: "Showing sample role data. Connect to database for live data.",
          variant: "default"
        });
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to load roles",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredRoles = roles.filter(role =>
    (role.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (role.description || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRole = async () => {
    if (!newRole.name) {
      toast({
        title: "Error",
        description: "Please provide a role name",
        variant: "destructive"
      });
      return;
    }

    try {
      setSubmitting(true);
      const createdRole = await roleService.createRole(newRole);
      setRoles([...roles, createdRole]);
      setNewRole({ name: '', description: '', permissions: [] });
      setIsAddRoleOpen(false);
      
      toast({
        title: "Success",
        description: "Role created successfully"
      });
    } catch (error) {
      console.error('Error creating role:', error);
      const errorMessage = error instanceof Error ? error.message : "Failed to create role";
      const isNetworkError = errorMessage.includes('Network error');
      
      toast({
        title: isNetworkError ? "Network Error" : "Error",
        description: isNetworkError 
          ? "Unable to reach the server. Please check your connection and try again."
          : errorMessage,
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setNewRole({
      name: role.name,
      description: role.description,
      permissions: [...role.permissions]
    });
  };

  const handleUpdateRole = async () => {
    if (!editingRole || !newRole.name) {
      toast({
        title: "Error",
        description: "Please provide a role name",
        variant: "destructive"
      });
      return;
    }

    try {
      setSubmitting(true);
      const updatedRole = await roleService.updateRole({
        id: editingRole.id,
        ...newRole
      });
      
      const updatedRoles = roles.map(role => 
        role.id === editingRole.id ? updatedRole : role
      );
      
      setRoles(updatedRoles);
      setEditingRole(null);
      setNewRole({ name: '', description: '', permissions: [] });
      
      toast({
        title: "Success",
        description: "Role updated successfully"
      });
    } catch (error) {
      console.error('Error updating role:', error);
      const errorMessage = error instanceof Error ? error.message : "Failed to update role";
      const isNetworkError = errorMessage.includes('Network error');
      
      toast({
        title: isNetworkError ? "Network Error" : "Error",
        description: isNetworkError 
          ? "Unable to reach the server. Please check your connection and try again."
          : errorMessage,
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteRole = async (roleId: string) => {
    try {
      await roleService.deleteRole(roleId);
      setRoles(roles.filter(role => role.id !== roleId));
      toast({
        title: "Success",
        description: "Role deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting role:', error);
      const errorMessage = error instanceof Error ? error.message : "Failed to delete role";
      const isNetworkError = errorMessage.includes('Network error');
      
      toast({
        title: isNetworkError ? "Network Error" : "Error",
        description: isNetworkError 
          ? "Unable to reach the server. Please check your connection and try again."
          : errorMessage,
        variant: "destructive"
      });
    }
  };

  const handlePermissionChange = (permission: string, checked: boolean) => {
    if (checked) {
      setNewRole({
        ...newRole,
        permissions: [...newRole.permissions, permission]
      });
    } else {
      setNewRole({
        ...newRole,
        permissions: newRole.permissions.filter(p => p !== permission)
      });
    }
  };

  const resetForm = () => {
    setNewRole({ name: '', description: '', permissions: [] });
    setEditingRole(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Role Management</h1>
          <p className="text-sm text-gray-600 mt-1">Manage roles and permissions</p>
        </div>
        <Button 
          onClick={() => setIsAddRoleOpen(true)} 
          className="bg-orange-500 hover:bg-orange-600"
          disabled={loading}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Role
        </Button>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search roles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-64"
            disabled={loading}
          />
        </div>
        <Button
          variant="outline"
          onClick={fetchRoles}
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : null}
          Refresh
        </Button>
        <Button
          variant="outline"
          onClick={async () => {
            await testRoleWebhooks();
          }}
          disabled={loading}
        >
          Debug All Webhooks
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading roles...</span>
        </div>
      ) : filteredRoles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {searchTerm ? 'No roles found matching your search' : 'No roles found'}
          </p>
          {!searchTerm && (
            <Button 
              onClick={() => setIsAddRoleOpen(true)} 
              className="mt-4 bg-orange-500 hover:bg-orange-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create your first role
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoles.map((role) => (
            <Card key={role.id} className="relative">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{role.name}</CardTitle>
                    <CardDescription className="mt-1">{role.description}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditRole(role)}
                      className="text-orange-600 hover:text-orange-700 p-1 h-auto"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteRole(role.id)}
                      className="text-red-600 hover:text-red-700 p-1 h-auto"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{role.userCount} users</span>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Permissions:</p>
                    <div className="flex flex-wrap gap-1">
                      {(role.permissions || []).map((permission) => (
                        <Badge
                          key={permission}
                          variant="secondary"
                          className="text-xs bg-orange-100 text-orange-800"
                        >
                          {permission}
                        </Badge>
                      ))}
                      {(!role.permissions || role.permissions.length === 0) && (
                        <span className="text-xs text-gray-400">No permissions assigned</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 pt-2 border-t">
                    Created {role.createdAt}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isAddRoleOpen || editingRole !== null} onOpenChange={(open) => {
        if (!open) {
          setIsAddRoleOpen(false);
          resetForm();
        }
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingRole ? 'Edit Role' : 'Add New Role'}</DialogTitle>
            <DialogDescription>
              {editingRole ? 'Update role information and permissions.' : 'Create a new role with specific permissions.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role-name" className="text-right">
                Role Name
              </Label>
              <Input
                id="role-name"
                value={newRole.name}
                onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                className="col-span-3"
                placeholder="Enter role name"
                disabled={submitting}
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="role-description" className="text-right pt-2">
                Description
              </Label>
              <Textarea
                id="role-description"
                value={newRole.description}
                onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                className="col-span-3"
                placeholder="Enter role description"
                rows={3}
                disabled={submitting}
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right pt-2">Permissions</Label>
              <div className="col-span-3 space-y-3">
                {availablePermissions.map((permission) => (
                  <div key={permission} className="flex items-center space-x-2">
                    <Checkbox
                      id={permission}
                      checked={newRole.permissions.includes(permission)}
                      onCheckedChange={(checked) => handlePermissionChange(permission, checked as boolean)}
                      disabled={submitting}
                    />
                    <Label htmlFor={permission} className="text-sm font-normal">
                      {permission}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsAddRoleOpen(false);
                resetForm();
              }}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button 
              onClick={editingRole ? handleUpdateRole : handleAddRole} 
              className="bg-orange-500 hover:bg-orange-600"
              disabled={submitting}
            >
              {submitting ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : null}
              {editingRole ? 'Update Role' : 'Create Role'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}