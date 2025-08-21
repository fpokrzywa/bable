'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Card, CardContent, CardHeader } from './ui/card';
import { Search, Building, Edit2, Trash2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getAllCompanies } from '@/services/companyService';
import type { Company } from '@/lib/types';
import { cn } from '@/lib/utils';

interface CompanyManagementProps {
  onEditCompany?: (company: Company) => void;
}

export function CompanyManagement({ onEditCompany }: CompanyManagementProps) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  
  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const fetchedCompanies = await getAllCompanies();
      setCompanies(fetchedCompanies);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch companies.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = 
      company.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.chat_bot_name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleEditCompany = (company: Company) => {
    onEditCompany?.(company);
  };

  const handleDeleteCompany = (companyId: string) => {
    // This would call a deleteCompany service in a real app.
    setCompanies(companies.filter(company => company.id !== companyId));
    toast({
      title: "Success",
      description: "Company deleted successfully (client-side). Implement backend delete call."
    });
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
          <h1 className="text-2xl font-semibold text-gray-900">Company Management</h1>
          <p className="text-sm text-gray-600 mt-1">Manage company accounts and configurations</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Bot Name</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Environment</TableHead>
                <TableHead>LLM Config</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCompanies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Building className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-blue-600">{company.company_name}</div>
                        <div className="text-sm text-gray-600">ID: {company.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{company.chat_bot_name}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <span className="text-lg font-medium">{company.user_count}</span>
                      <div className="text-xs text-gray-500">users</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={company.demo_environment ? 'secondary' : 'default'}
                      className={cn(
                        company.demo_environment ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                      )}
                    >
                      {company.demo_environment ? 'Demo' : 'Production'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {company.llm_config}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditCompany(company)}
                        className="text-orange-600 hover:text-orange-700"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteCompany(company.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}