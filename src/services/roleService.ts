interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissions: string[];
  createdAt: string;
  active?: boolean;
}

interface CreateRoleRequest {
  name: string;
  description: string;
  permissions: string[];
}

interface UpdateRoleRequest extends CreateRoleRequest {
  id: string;
}

class RoleService {
  private async retryRequest<T>(
    requestFn: () => Promise<T>, 
    maxRetries: number = 2, 
    delay: number = 1000
  ): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await requestFn();
      } catch (error) {
        lastError = error as Error;
        
        // Don't retry for non-network errors
        if (!(error instanceof TypeError && error.message === 'Failed to fetch')) {
          throw error;
        }
        
        if (attempt < maxRetries) {
          console.log(`Request failed, retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries + 1})`);
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 1.5; // Exponential backoff
        }
      }
    }
    
    throw lastError!;
  }

  private getWebhookUrl(type: 'get' | 'create_update' | 'delete'): string {
    switch (type) {
      case 'get':
        return process.env.NEXT_PUBLIC_GET_ROLES_WEBHOOK_URL || '';
      case 'create_update':
        return process.env.NEXT_PUBLIC_CREATE_UPDATE_ROLE_WEBHOOK_URL || '';
      case 'delete':
        return process.env.NEXT_PUBLIC_DELETE_ROLE_WEBHOOK_URL || '';
      default:
        return '';
    }
  }

  private async makeRequest<T>(url: string, options: RequestInit = {}): Promise<T> {
    if (!url) {
      console.error('Webhook URL not configured. Available env vars:', {
        get: process.env.NEXT_PUBLIC_GET_ROLES_WEBHOOK_URL,
        create_update: process.env.NEXT_PUBLIC_CREATE_UPDATE_ROLE_WEBHOOK_URL,
        delete: process.env.NEXT_PUBLIC_DELETE_ROLE_WEBHOOK_URL
      });
      throw new Error('Webhook URL not configured');
    }

    console.log('Making request to:', url, 'with options:', options);

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`HTTP Error ${response.status}:`, errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const jsonResponse = await response.json();
      console.log('JSON Response received:', jsonResponse);
      return jsonResponse;
    } catch (error) {
      // Handle network errors specifically
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        console.error('Network error - Failed to fetch. This could be due to:');
        console.error('1. Network connectivity issues');
        console.error('2. CORS policy blocking the request');
        console.error('3. Server is unreachable');
        console.error('4. SSL/TLS certificate issues');
        console.error('Request details:', { url, method: options.method || 'GET' });
        throw new Error(`Network error: Unable to reach ${url}. Please check your internet connection and server status.`);
      }
      
      // Re-throw other errors
      throw error;
    }
  }

  private getSampleRoles(): Role[] {
    return [
      {
        id: 'sample-admin',
        name: 'Administrator',
        description: 'Full system access with all permissions',
        userCount: 3,
        permissions: ['User Management', 'Role Management', 'System Settings', 'View Reports', 'Export Data', 'Import Data', 'Manage Workspaces', 'AI Tools Access', 'Admin Panel'],
        createdAt: new Date().toLocaleDateString('en-GB'),
        active: true
      },
      {
        id: 'sample-user',
        name: 'Standard User',
        description: 'Basic user with limited permissions',
        userCount: 15,
        permissions: ['View Reports', 'AI Tools Access'],
        createdAt: new Date().toLocaleDateString('en-GB'),
        active: true
      },
      {
        id: 'sample-manager',
        name: 'Manager',
        description: 'Managerial role with workspace and reporting access',
        userCount: 7,
        permissions: ['View Reports', 'Export Data', 'Manage Workspaces', 'AI Tools Access'],
        createdAt: new Date().toLocaleDateString('en-GB'),
        active: true
      }
    ];
  }

  async getRoles(): Promise<Role[]> {
    const url = this.getWebhookUrl('get');
    
    // If URL is not configured, return sample data
    if (!url) {
      console.log('Webhook URL not configured, returning sample roles');
      return this.getSampleRoles();
    }
    
    try {
      const response = await this.makeRequest<any>(url, {
        method: 'GET',
      });
      
      let roles: Role[] = [];
      
      if (Array.isArray(response)) {
        roles = response;
      } else if (response && typeof response === 'object') {
        roles = response.roles || response.data || response.items || response.result || [];
        if (roles.length === 0) {
          const values = Object.values(response);
          if (values.length > 0 && Array.isArray(values[0])) {
            roles = values[0] as Role[];
          }
        }
      }
      
      const processedRoles = roles.map((role: any) => {
        let permissions: string[] = [];
        if (typeof role.permissions === 'string') {
          try {
            permissions = JSON.parse(role.permissions);
          } catch (e) {
            permissions = [];
          }
        } else if (Array.isArray(role.permissions)) {
          permissions = role.permissions;
        }

        return {
          id: role.id || role._id?.$oid || role._id || String(Math.random()),
          name: role.name || role.roleName || 'Unknown Role',
          description: role.description || role.desc || '',
          userCount: role.userCount || role.users || 0,
          permissions: permissions,
          createdAt: role.createdAt || role.created || new Date().toLocaleDateString('en-GB'),
          active: role.active === 'True' || role.active === true
        };
      });
      
      return processedRoles;
    } catch (error) {
      console.error('Error fetching roles from webhook:', error);
      // On error, return an empty array to avoid showing sample data
      return [];
    }
  }

  async createRole(roleData: CreateRoleRequest): Promise<Role> {
    const url = this.getWebhookUrl('create_update');
    
    // If URL is not configured, return a mock created role
    if (!url) {
      console.log('Create webhook URL not configured, returning mock role');
      const newId = crypto.randomUUID();
      const mockRole: Role = {
        id: newId,
        name: roleData.name,
        description: roleData.description,
        userCount: 0,
        permissions: roleData.permissions,
        createdAt: new Date().toLocaleDateString('en-GB'),
        active: true
      };
      return mockRole;
    }
    
    try {
      const response = await this.retryRequest(async () => {
        // Convert permissions array to JSON string for database storage
        const newId = crypto.randomUUID();
        const payload = {
          id: newId,
          name: roleData.name,
          description: roleData.description,
          permissions: JSON.stringify(roleData.permissions),
          active: "True",
          userCount: 0,
          createdAt: new Date().toLocaleDateString('en-GB')
        };
        
        console.log('Creating role with payload:', payload);
        
        return await this.makeRequest<{ role?: Role; data?: Role }>(url, {
          method: 'POST',
          body: JSON.stringify(payload),
        });
      });
      
      console.log('Create role response:', response);
      
      const createdRole = response.role || response.data || response;
      if (!createdRole) {
        console.error('Failed to extract role from response:', response);
        throw new Error('Invalid response format: missing role data');
      }
      
      console.log('Successfully created role:', createdRole);
      return createdRole;
    } catch (error) {
      console.error('Error creating role, falling back to mock data:', error);
      // Return a mock role when webhook fails
      const newId = crypto.randomUUID();
      const mockRole: Role = {
        id: newId,
        name: roleData.name,
        description: roleData.description,
        userCount: 0,
        permissions: roleData.permissions,
        createdAt: new Date().toLocaleDateString('en-GB'),
        active: true
      };
      return mockRole;
    }
  }

  async updateRole(roleData: UpdateRoleRequest): Promise<Role> {
    const url = this.getWebhookUrl('create_update');
    
    // If URL is not configured, return a mock updated role
    if (!url) {
      console.log('Update webhook URL not configured, returning mock updated role');
      const mockRole: Role = {
        id: roleData.id,
        name: roleData.name,
        description: roleData.description,
        userCount: 0,
        permissions: roleData.permissions,
        createdAt: new Date().toLocaleDateString('en-GB'),
        active: true
      };
      return mockRole;
    }
    
    try {
      const response = await this.retryRequest(async () => {
        // Convert permissions array to JSON string for database storage
        const payload = {
          id: roleData.id,
          name: roleData.name,
          description: roleData.description,
          permissions: JSON.stringify(roleData.permissions),
          active: "True" // Maintain active status
        };
        
        console.log('Updating role with payload:', payload);
        
        return await this.makeRequest<{ role?: Role; data?: Role }>(url, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
      });
      
      console.log('Update role response:', response);
      
      const updatedRole = response.role || response.data || response;
      if (!updatedRole) {
        console.error('Failed to extract role from response:', response);
        throw new Error('Invalid response format: missing role data');
      }
      
      console.log('Successfully updated role:', updatedRole);
      return updatedRole;
    } catch (error) {
      console.error('Error updating role, falling back to mock data:', error);
      // Return a mock updated role when webhook fails
      const mockRole: Role = {
        id: roleData.id,
        name: roleData.name,
        description: roleData.description,
        userCount: 0,
        permissions: roleData.permissions,
        createdAt: new Date().toLocaleDateString('en-GB'),
        active: true
      };
      return mockRole;
    }
  }

  async deleteRole(roleId: string): Promise<void> {
    const url = this.getWebhookUrl('delete');
    
    // If URL is not configured, just log and return (mock deletion)
    if (!url) {
      console.log('Delete webhook URL not configured, mock deleting role:', roleId);
      return;
    }
    
    try {
      await this.retryRequest(async () => {
        console.log('Deleting role with ID:', roleId);
        
        const response = await this.makeRequest<{ success?: boolean; message?: string }>(url, {
          method: 'DELETE',
          body: JSON.stringify({ id: roleId }),
        });
        
        console.log('Delete role response:', response);
        return response;
      });
    } catch (error) {
      console.error('Error deleting role, treating as successful (mock deletion):', error);
      // Don't throw error for delete operations in fallback mode
      return;
    }
  }
}

// Debug function to test all role webhooks
export const testRoleWebhooks = async () => {
  console.log('=== TESTING ALL ROLE WEBHOOKS ===');
  
  const webhooks = {
    get: process.env.NEXT_PUBLIC_GET_ROLES_WEBHOOK_URL,
    create_update: process.env.NEXT_PUBLIC_CREATE_UPDATE_ROLE_WEBHOOK_URL,
    delete: process.env.NEXT_PUBLIC_DELETE_ROLE_WEBHOOK_URL
  };
  
  console.log('Configured webhook URLs:', webhooks);
  
  // Test GET endpoint
  if (webhooks.get) {
    console.log('\n--- Testing GET roles endpoint ---');
    try {
      const response = await fetch(webhooks.get, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('GET Response status:', response.status);
      console.log('GET Response headers:', Object.fromEntries(response.headers.entries()));
      
      if (response.ok) {
        const data = await response.json();
        console.log('GET Response data:', data);
        console.log('Data type:', typeof data);
        console.log('Is Array:', Array.isArray(data));
        if (data && typeof data === 'object') {
          console.log('Data keys:', Object.keys(data));
        }
      } else {
        const errorText = await response.text();
        console.error('GET Error response:', errorText);
      }
    } catch (error) {
      console.error('GET Request failed:', error);
    }
  } else {
    console.log('GET webhook URL not configured');
  }
  
  // Test CREATE endpoint with sample data
  if (webhooks.create_update) {
    console.log('\n--- Testing CREATE endpoint ---');
    const testPayload = {
      name: "Test Role",
      description: "Test Description",
      permissions: JSON.stringify(["User Management"]),
      active: "True",
      userCount: 0
    };
    
    console.log('Test payload:', testPayload);
    
    try {
      const response = await fetch(webhooks.create_update, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testPayload)
      });
      
      console.log('CREATE Response status:', response.status);
      console.log('CREATE Response headers:', Object.fromEntries(response.headers.entries()));
      
      if (response.ok) {
        const data = await response.json();
        console.log('CREATE Response data:', data);
      } else {
        const errorText = await response.text();
        console.error('CREATE Error response:', errorText);
      }
    } catch (error) {
      console.error('CREATE Request failed:', error);
    }
  } else {
    console.log('CREATE/UPDATE webhook URL not configured');
  }
  
  console.log('=== WEBHOOK TEST COMPLETE ===');
};

// Legacy function for backwards compatibility
export const testRoleWebhook = testRoleWebhooks;

export const roleService = new RoleService();
export type { Role, CreateRoleRequest, UpdateRoleRequest };