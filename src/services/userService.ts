// This file contains both server and client functions

import axios from 'axios';
import type { User, Workspace } from '@/lib/types';
import { getWorkspaces } from './workspaceService';

const getUserApiUrl = () => {
    const url = process.env.NEXT_PUBLIC_GET_USERS_URL;
    if (!url) {
        console.warn('NEXT_PUBLIC_GET_USERS_URL is not configured. User management may not work correctly.');
        return null;
    }
    return url;
};

const getUpdateWebhookUrl = () => {
    const url = process.env.NEXT_PUBLIC_USER_PROFILE_UPDATE_WEBHOOK_URL;
    if (!url) {
        console.warn('NEXT_PUBLIC_USER_PROFILE_UPDATE_WEBHOOK_URL is not configured in .env file.');
        return null;
    }
    return url;
}

const getProfileWebhookUrl = () => {
    const url = process.env.NEXT_PUBLIC_USER_PROFILE_WEBHOOK_URL;
    if (!url) {
        console.warn('NEXT_PUBLIC_USER_PROFILE_WEBHOOK_URL is not configured in .env file. Using fallback data.');
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

export async function getUserById(userId: string): Promise<User | null> {
    const webhookUrl = getUserApiUrl();
    if (!webhookUrl) {
        console.warn('NEXT_PUBLIC_GET_USERS_URL is not configured. Falling back to default user.');
        return createDefaultUser(userId);
    }

    try {
        const response = await axios.get(webhookUrl, { params: { userId } });
        
        if (response.status === 200 && response.data) {
            // Handle both direct user object and wrapped responses
            const userData = Array.isArray(response.data) ? response.data[0] : response.data;
            if (userData) {
                return {
                    ...userData,
                    userId: userData.userId || userData._id,
                    roles: userData.roles || ['User']
                };
            }
        }
        
        console.warn(`No user found for userId: ${userId}`);
        return null;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                console.warn(`User not found (userId: ${userId})`);
                return null;
            } else {
                console.error(`Failed to fetch user by ID ${userId}:`, error.message);
            }
        } else {
            console.error('An unexpected error occurred:', error);
        }
        return null;
    }
}

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

        if (response.status === 200 && Array.isArray(response.data)) {
            return response.data.map(user => ({
                ...user,
                userId: user.userId || user._id, // Handle both possible ID fields
                roles: user.roles || ['User']
            }));
        }
        
        // Handle cases where the API returns an object with a 'data' or other property
        if (response.status === 200 && response.data && typeof response.data === 'object') {
            const userArray = response.data.data || response.data.users || response.data.items || response.data.result;
            if (Array.isArray(userArray)) {
                return userArray.map(user => ({
                    ...user,
                    userId: user.userId || user._id,
                    roles: user.roles || ['User']
                }));
            }
        }
        
        console.warn("Webhook response for all users was not in a recognized array format. Returning empty array.", response.data);
        return [];
    } catch (error) {
        console.error('Failed to get all users from webhook:', error);
        return [];
    }
}


export async function getUserProfile(email: string): Promise<User | null> {
    const webhookUrl = getProfileWebhookUrl();

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
        console.error('Cannot update/create user profile: NEXT_PUBLIC_USER_PROFILE_UPDATE_WEBHOOK_URL is not configured.');
        return false;
    }

    // Ensure we have an email for the userId
    if (!profileData.email) {
        console.error('Cannot update user profile: No email provided');
        return false;
    }

    // Filter out null, undefined, and empty string values to preserve existing data
    const cleanData: Partial<User> = {};
    Object.keys(profileData).forEach(key => {
        const value = profileData[key as keyof User];
        // Skip username field - we'll generate it properly below
        if (key === 'username') {
            return;
        }
        // Only include values that are truthy and not empty strings
        if (value !== null && value !== undefined && value !== '' && value !== 'null') {
            cleanData[key as keyof User] = value;
        }
    });

    // If we don't have any meaningful data to update, don't proceed
    const hasValidData = Object.keys(cleanData).some(key => 
        key !== 'userId' && cleanData[key as keyof User] !== null && cleanData[key as keyof User] !== undefined
    );

    if (!hasValidData) {
        console.error('No valid data to update profile with');
        return false;
    }

    // Always generate clean username if we have first_name and last_name
    if (cleanData.first_name && cleanData.last_name) {
        // Clean the names of any special characters and generate proper username
        const cleanFirstName = cleanData.first_name.replace(/[^a-zA-Z]/g, '').toLowerCase();
        const cleanLastName = cleanData.last_name.replace(/[^a-zA-Z]/g, '').toLowerCase();
        cleanData.username = `${cleanFirstName}.${cleanLastName}`;
    }

    // Always include email as userId to identify the record to update
    cleanData.userId = profileData.email;

    // Send the data directly (same as User Management does)
    const payload = cleanData;

    try {
        const response = await axios.post(webhookUrl, payload);
        return response.status === 200 || response.status === 201;
    } catch (error) {
        console.error('Failed to update user profile via webhook:', error);
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
