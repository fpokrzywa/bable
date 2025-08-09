
'use server';

import axios from 'axios';
import type { User } from '@/lib/types';

const getWebhookUrl = () => {
    const url = process.env.USER_PROFILE_WEBHOOK_URL;
    if (!url) {
        console.warn('USER_PROFILE_WEBHOOK_URL is not configured in .env file. Using fallback data.');
        return null;
    }
    return url;
};

const createDefaultUser = (email: string): User => ({
    _id: email,
    userId: email,
    username: 'Default User',
    first_name: 'Default',
    last_name: 'User',
    email: email,
    bio: 'Please configure your user profile webhook in the .env file to fetch real user data.',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
});


export async function getUserProfile(email: string): Promise<User | null> {
    const webhookUrl = getWebhookUrl();

    if (!webhookUrl) {
        return createDefaultUser(email);
    }

    try {
        const response = await axios.get(webhookUrl, { params: { userId: email } });
        
        if (response.status === 200 && response.data) {
            // Ensure _id is a string if it exists and is an object (like MongoDB's ObjectId)
            if (response.data._id && typeof response.data._id === 'object') {
                response.data._id = response.data._id.toString();
            }
            return response.data;
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
    const webhookUrl = getWebhookUrl();
    if (!webhookUrl) {
        console.error('Cannot update user profile: USER_PROFILE_WEBHOOK_URL is not configured.');
        return false;
    }

    try {
        const dataToSend = { ...profileData };
        // Don't send the _id back to the server if it's not needed for the update operation
        // or convert it to a simple string if your backend expects it.
        // For this example, let's assume the backend identifies the user by userId/email.
        // delete dataToSend._id;

        const response = await axios.post(webhookUrl, dataToSend);
        return response.status === 200 || response.status === 204;
    } catch (error) {
        console.error('Failed to update user profile via webhook:', error);
        return false;
    }
}
