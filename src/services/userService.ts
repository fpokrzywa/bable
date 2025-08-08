'use server';

import axios from 'axios';
import type { User } from '@/lib/types';

const defaultUserId = 'freddie@3cpublish.com';

const getWebhookUrl = () => {
    const url = process.env.USER_PROFILE_WEBHOOK_URL;
    if (!url) {
        console.warn('USER_PROFILE_WEBHOOK_URL is not configured in .env file. Using fallback data.');
        return null;
    }
    return url;
};

const createDefaultUser = (): User => ({
    _id: defaultUserId,
    userId: defaultUserId,
    username: 'Default User',
    email: 'default@example.com',
    bio: 'Please configure your user profile webhook in the .env file to fetch real user data.',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
});


export async function getUserProfile(): Promise<User | null> {
    const webhookUrl = getWebhookUrl();

    if (!webhookUrl) {
        return createDefaultUser();
    }

    try {
        const response = await axios.get(`${webhookUrl}/${defaultUserId}`);
        if (response.status === 200 && response.data) {
            return response.data;
        }
        return createDefaultUser();

    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            console.warn(`User not found via webhook. Falling back to default user.`);
        } else {
            console.error('Failed to get user profile from webhook:', error);
        }
        return createDefaultUser();
    }
}

export async function updateUserProfile(profileData: Partial<User>): Promise<boolean> {
    const webhookUrl = getWebhookUrl();
    if (!webhookUrl) {
        console.error('Cannot update user profile: USER_PROFILE_WEBHOOK_URL is not configured.');
        return false;
    }

    try {
        const userId = profileData.userId || defaultUserId;
        const response = await axios.post(`${webhookUrl}/${userId}`, profileData);
        return response.status === 200 || response.status === 204;
    } catch (error) {
        console.error('Failed to update user profile via webhook:', error);
        return false;
    }
}
