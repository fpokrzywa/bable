

// This file contains both server and client functions

import axios from 'axios';
import type { User, Workspace } from '@/lib/types';
import { getWorkspaces } from './workspaceService';

const getWebhookUrl = () => {
    const url = process.env.USER_PROFILE_WEBHOOK_URL;
    if (!url) {
        console.warn('USER_PROFILE_WEBHOOK_URL is not configured in .env file. Using fallback data.');
        return null;
    }
    return url;
};

const getUpdateWebhookUrl = () => {
    const url = process.env.USER_PROFILE_UPDATE_WEBHOOK_URL;
    if (!url) {
        console.warn('USER_PROFILE_UPDATE_WEBHOOK_URL is not configured in .env file.');
        return null;
    }
    return url;
}

const getUserApiUrl = () => {
    const url = process.env.USER_API_URL;
    if (!url) {
        console.warn('USER_API_URL is not configured. User management may not work correctly.');
        return null;
    }
    return url;
};


const createDefaultUser = (email: string): User => ({
    userId: email,
    username: 'Default User',
    first_name: 'Default',
    last_name: 'User',
    email: email,
    bio: 'Please configure your user profile webhook in the .env file to fetch real user data.',
    avatar: `https://i.pravatar.cc/150?u=${email}`,
    roles: ['User'],
});

export async function getAllUsers(): Promise<User[]> {
    const webhookUrl = getUserApiUrl();
    if (!webhookUrl) {
        return [
            {...createDefaultUser('user1@example.com'), roles: ['Admin']},
            createDefaultUser('user2@example.com'),
        ];
    }
    try {
        const response = await axios.get(webhookUrl, { params: { userId: 'all' } });

        if (response.status === 200 && response.data) {
            let usersData: any[] = [];

            // Handle cases where the data is nested under a property like 'data', 'users', etc.
            if (Array.isArray(response.data)) {
                usersData = response.data;
            } else if (typeof response.data === 'object' && response.data !== null) {
                // Look for an array property in the response object
                const arrayKey = Object.keys(response.data).find(key => Array.isArray(response.data[key]));
                if (arrayKey) {
                    usersData = response.data[arrayKey];
                }
            }

            if (usersData.length > 0) {
                 return usersData.map(user => ({
                    ...user,
                    userId: user._id || user.userId,
                    roles: user.roles || ['User']
                }));
            }
        }
        console.warn("Could not find user array in webhook response. Returning empty array.", response.data);
        return [];
    } catch (error) {
        console.error('Failed to get all users from webhook:', error);
        return [];
    }
}


export async function getUserProfile(email: string): Promise<User | null> {
    const webhookUrl = getWebhookUrl();

    if (!webhookUrl) {
        return createDefaultUser(email);
    }

    try {
        const response = await axios.get(webhookUrl, { params: { userId: email } });
        
        if (response.status === 200 && response.data) {
            // The webhook can return a single user or an array of users
            const userData = Array.isArray(response.data) ? response.data[0] : response.data;
            if (userData) {
                return {
                    ...userData,
                    userId: userData._id || userData.userId,
                    roles: userData.roles || ['User']
                };
            }
        }

        console.warn(`Webhook returned status ${response.status} or no data for ${email}. Falling back to default user.`);
        return createDefaultUser(email);

    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                 console.warn(`User not found via webhook (userId: ${email}). Falling back to default user.`);
            } else {
                 console.error(`Failed to get user profile from webhook for ${email}:`, error.message);
            }
        } else {
            console.error('An unexpected error occurred:', error);
        }
        return createDefaultUser(email);
    }
}

export async function updateUserProfile(profileData: Partial<User>): Promise<boolean> {
    const webhookUrl = getUpdateWebhookUrl();
    if (!webhookUrl) {
        console.error('Cannot update user profile: USER_PROFILE_UPDATE_WEBHOOK_URL is not configured.');
        return false;
    }

    try {
        const response = await axios.post(webhookUrl, profileData);
        return response.status === 200 || response.status === 204;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Failed to update user profile via webhook:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
                url: webhookUrl,
                sentData: profileData
            });
        } else {
            console.error('An unexpected error occurred during profile update:', error);
        }
        return false;
    }
}

export interface LoginResult {
    success: boolean;
    user?: User;
    workspaces?: Workspace[];
    error?: string;
}

export async function performLogin(email: string, password: string): Promise<LoginResult> {
    try {
        // In a real app, you'd validate credentials against your auth service
        // For now, we'll simulate successful validation and fetch user data
        
        const user = await getUserProfile(email);
        if (!user) {
            return {
                success: false,
                error: 'Failed to retrieve user profile'
            };
        }

        const workspaces = await getWorkspaces(user.userId);
        
        // Store session data
        const sessionData = {
            loggedIn: true,
            email: email,
            userId: user.userId,
            loginTime: new Date().toISOString()
        };
        
        // Store in localStorage (this will be client-side when called from client)
        if (typeof window !== 'undefined') {
            localStorage.setItem('session', JSON.stringify(sessionData));
            localStorage.setItem('userData', JSON.stringify({ user, workspaces }));
        }
        
        return {
            success: true,
            user,
            workspaces
        };
    } catch (error) {
        console.error('Login failed:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Login failed'
        };
    }
}

export function getCachedUserData(): { user: User | null; workspaces: Workspace[] } {
    if (typeof window === 'undefined') {
        return { user: null, workspaces: [] };
    }
    
    try {
        const cached = localStorage.getItem('userData');
        if (cached) {
            const data = JSON.parse(cached);
            return {
                user: data.user || null,
                workspaces: data.workspaces || []
            };
        }
    } catch (error) {
        console.error('Failed to parse cached user data:', error);
    }
    
    return { user: null, workspaces: [] };
}

export function updateCachedWorkspaces(workspaces: Workspace[]): void {
    if (typeof window === 'undefined') return;
    
    try {
        const cached = localStorage.getItem('userData');
        if (cached) {
            const data = JSON.parse(cached);
            data.workspaces = workspaces;
            localStorage.setItem('userData', JSON.stringify(data));
        }
    } catch (error) {
        console.error('Failed to update cached workspaces:', error);
    }
}

export function getCachedWorkspace(workspaceId: string): Workspace | null {
    const { workspaces } = getCachedUserData();
    return workspaces.find(ws => ws.workspaceId === workspaceId) || null;
}

export function clearUserData(): void {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('session');
        localStorage.removeItem('userData');
    }
}
