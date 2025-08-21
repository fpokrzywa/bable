'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ArrowLeft, Save, Building, Loader2, ChevronDown, ChevronRight, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getCompanyById, updateCompany } from '@/services/companyService';
import { getAllUsers } from '@/services/userService';
import type { Company, User } from '@/lib/types';
import { cn } from '@/lib/utils';

interface CompanyEditProps {
  companyId?: string;
  company?: Company;
  onBack?: () => void;
  onSave?: () => void;
}

export function CompanyEdit({ companyId, company: initialCompany, onBack, onSave }: CompanyEditProps) {
  const [company, setCompany] = useState<Company | null>(initialCompany || null);
  const [loading, setLoading] = useState(!initialCompany && !!companyId);
  const [saving, setSaving] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [configOpen, setConfigOpen] = useState(false);
  const [environmentOpen, setEnvironmentOpen] = useState(false);
  const [usersOpen, setUsersOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCompany = async () => {
      if (companyId && !initialCompany) {
        setLoading(true);
        try {
          const companyData = await getCompanyById(companyId);
          setCompany(companyData);
        } catch (error) {
          console.error('Failed to fetch company data:', error);
          toast({ 
            variant: 'destructive', 
            title: 'Error', 
            description: 'Failed to load company profile.' 
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCompany();
  }, [companyId, initialCompany, toast]);

  const fetchCompanyUsers = async () => {
    if (!company) return;
    
    setLoadingUsers(true);
    try {
      const allUsers = await getAllUsers();
      console.log('Full company object:', JSON.stringify(company, null, 2));
      
      // Filter users by company_id
      const companyUsers = allUsers.filter(user => {
        // Extract user's company ID
        const userCompanyId = typeof user.company_id === 'object' 
          ? user.company_id?.$oid 
          : user.company_id;
        
        // Extract the MongoDB ObjectId from company data
        // Try different possible locations for the ObjectId
        let companyMongoId = null;
        
        if (company._id && typeof company._id === 'object' && company._id.$oid) {
          companyMongoId = company._id.$oid;
        } else if (company._id && typeof company._id === 'string') {
          companyMongoId = company._id;
        } else if (company.id) {
          // If id is actually the MongoDB ObjectId string
          companyMongoId = company.id;
        }
        
        console.log(`User ${user.email}: company_id = ${userCompanyId}`);
        console.log(`Company MongoDB ID: ${companyMongoId}`);
        
        const matches = userCompanyId === companyMongoId;
        console.log(`Match result: ${matches}`);
        
        return matches;
      });
      
      console.log('Filtered company users:', companyUsers);
      setUsers(companyUsers);
    } catch (error) {
      console.error('Failed to fetch company users:', error);
      toast({ 
        variant: 'destructive', 
        title: 'Error', 
        description: 'Failed to load company users.' 
      });
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    if (company) {
      fetchCompanyUsers();
    }
  }, [company]);

  const handleInputChange = (field: keyof Company, value: string | number | boolean) => {
    if (!company) return;
    setCompany({ ...company, [field]: value });
  };

  const handleSave = async () => {
    if (!company) return;
    
    setSaving(true);
    try {
      const success = await updateCompany(company);
      if (success) {
        toast({ 
          title: 'Success', 
          description: 'Company profile updated successfully!', 
          duration: 3000 
        });
        
        // Refresh company data after successful update
        if (company.id) {
          try {
            const refreshedCompany = await getCompanyById(company.id);
            if (refreshedCompany) {
              setCompany(refreshedCompany);
            }
          } catch (error) {
            console.error('Error refreshing company data after update:', error);
          }
        }
        
        onSave?.();
      } else {
        toast({ 
          variant: 'destructive', 
          title: 'Error', 
          description: 'Failed to update company profile.' 
        });
      }
    } catch (error) {
      console.error('Error saving company:', error);
      toast({ 
        variant: 'destructive', 
        title: 'Error', 
        description: 'An error occurred while saving.' 
      });
    } finally {
      setSaving(false);
    }
  };

  const handleConfigToggle = () => {
    setConfigOpen(!configOpen);
    if (!configOpen && environmentOpen) {
      setEnvironmentOpen(false);
    }
  };

  const handleEnvironmentToggle = () => {
    setEnvironmentOpen(!environmentOpen);
    if (!environmentOpen && configOpen) {
      setConfigOpen(false);
    }
  };

  const handleUsersToggle = () => {
    setUsersOpen(!usersOpen);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!company) {
    return <div>Company not found. Please try again later.</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {onBack && (
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Company Profile</h1>
            <p className="text-sm text-gray-600 mt-1">Manage company configuration and settings</p>
          </div>
        </div>
        <Button onClick={handleSave} disabled={saving} className="bg-orange-500 hover:bg-orange-600">
          {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          Save Changes
        </Button>
      </div>

      {/* Profile Information */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Basic company information and configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
              <Building className="h-8 w-8 text-blue-600" />
            </div>
            <div className="grid gap-1.5">
              <h2 className="text-xl font-bold">{company.company_name}</h2>
              <p className="text-muted-foreground">ID: {company.id}</p>
            </div>
          </div>
          
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="company_name">Company Name</Label>
                <Input 
                  id="company_name" 
                  value={company.company_name || ''} 
                  onChange={(e) => handleInputChange('company_name', e.target.value)} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="id">Company ID</Label>
                <Input 
                  id="id" 
                  value={company.id || ''} 
                  onChange={(e) => handleInputChange('id', e.target.value)} 
                  disabled
                  className="bg-gray-50"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="chat_bot_name">Chat Bot Name</Label>
                <Input 
                  id="chat_bot_name" 
                  value={company.chat_bot_name || ''} 
                  onChange={(e) => handleInputChange('chat_bot_name', e.target.value)} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="user_count">User Count</Label>
                <Input 
                  id="user_count" 
                  type="number"
                  value={company.user_count || 0} 
                  onChange={(e) => handleInputChange('user_count', parseInt(e.target.value) || 0)} 
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configuration Settings */}
      <Card>
        <Collapsible open={configOpen} onOpenChange={handleConfigToggle}>
          <CollapsibleTrigger asChild>
            <CardHeader className="hover:bg-gray-50 cursor-pointer transition-colors rounded-t-lg hover:rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Configuration</CardTitle>
                  <CardDescription>System configuration and limits</CardDescription>
                </div>
                {configOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-6 pt-0">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="openai_key">OpenAI API Key</Label>
              <Input 
                id="openai_key" 
                type="password"
                value={company["OpenAI API Key"] || ''} 
                onChange={(e) => handleInputChange('OpenAI API Key', e.target.value)} 
                placeholder="sk-..."
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="token_allotment">Token Allotment</Label>
                <Input 
                  id="token_allotment" 
                  type="number"
                  value={company.token_allotment || 0} 
                  onChange={(e) => handleInputChange('token_allotment', parseInt(e.target.value) || 0)} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="max_workspace_sessions">Max Workspace Sessions</Label>
                <Input 
                  id="max_workspace_sessions" 
                  type="number"
                  value={company.max_workspace_sessions || 0} 
                  onChange={(e) => handleInputChange('max_workspace_sessions', parseInt(e.target.value) || 0)} 
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="llm_config">LLM Configuration</Label>
              <Select 
                value={company.llm_config || ''} 
                onValueChange={(value) => handleInputChange('llm_config', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GEMINI">Gemini</SelectItem>
                  <SelectItem value="OPENAI">OpenAI</SelectItem>
                  <SelectItem value="CLAUDE">Claude</SelectItem>
                  <SelectItem value="AZURE">Azure</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Environment Settings */}
      <Card>
        <Collapsible open={environmentOpen} onOpenChange={handleEnvironmentToggle}>
          <CollapsibleTrigger asChild>
            <CardHeader className="hover:bg-gray-50 cursor-pointer transition-colors rounded-t-lg hover:rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Environment Settings</CardTitle>
                  <CardDescription>Environment and deployment configuration</CardDescription>
                </div>
                {environmentOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-base font-medium">Demo Environment</div>
              <div className="text-sm text-muted-foreground">
                Enable demo mode for testing and development
              </div>
            </div>
            <Switch
              checked={company.demo_environment || false}
              onCheckedChange={(checked) => handleInputChange('demo_environment', checked)}
              className={cn('transition-opacity', !company.demo_environment && 'opacity-50')}
            />
          </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Company Users */}
      <Card>
        <Collapsible open={usersOpen} onOpenChange={handleUsersToggle}>
          <CollapsibleTrigger asChild>
            <CardHeader className="hover:bg-gray-50 cursor-pointer transition-colors rounded-t-lg hover:rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Company Users ({users.length})
                  </CardTitle>
                  <CardDescription>Users associated with this company</CardDescription>
                </div>
                {usersOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              {loadingUsers ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : users.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No users found for this company
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => {
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
                              className={cn(user.active ? 'bg-green-500' : 'bg-gray-400')}
                            >
                              {user.active ? 'Active' : 'Inactive'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-600">Never</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </div>
  );
}