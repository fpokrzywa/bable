
'use server';

import axios from 'axios';
import type { Session } from '@/lib/types';

const getSessionWebhookUrl = () => {
    const url = process.env.SESSION_WEBHOOK_URL;
    if (!url) {
        console.warn('SESSION_WEBHOOK_URL is not configured in .env file.');
        return null;
    }
    return url;
};

const getGetUserSessionWebhookUrl = () => {
    const url = process.env.GET_USER_SESSION_WEBHOOK_URL;
    if (!url) {
        console.warn('GET_USER_SESSION_WEBHOOK_URL is not configured in .env file.');
        return null;
    }
    return url;
}

export async function saveSession(sessionData: Session): Promise<boolean> {
    const webhookUrl = getSessionWebhookUrl();
    if (!webhookUrl) {
        console.error('Cannot save session: SESSION_WEBHOOK_URL is not configured.');
        return false;
    }

    try {
        // The sessionId is now part of the body (sessionData), which is standard for POST/PUT.
        // Removed it from params.
        const response = await axios.post(webhookUrl, sessionData);
        return response.status === 200 || response.status === 201;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Failed to save session via webhook:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
                url: webhookUrl,
                sentData: sessionData
            });
        } else {
            console.error('An unexpected error occurred during session save:', error);
        }
        return false;
    }
}

export async function getUserSession(userId: string): Promise<Session | null> {
    const webhookUrl = getGetUserSessionWebhookUrl();
    if (!webhookUrl) {
        return null;
    }

    try {
        const response = await axios.get(webhookUrl, { params: { userId } });
        if (response.status === 200 && response.data) {
            const sessions = Array.isArray(response.data) ? response.data : [response.data];
            // Find the active session from the results
            const activeSession = sessions.find(s => s.active);
            return activeSession || null;
        }
        return null;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            // This is not an error, just no active session found.
            return null;
        }
        console.error('Failed to get user session:', error);
        return null;
    }
}
