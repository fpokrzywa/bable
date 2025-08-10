
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

export async function saveSession(sessionData: Session): Promise<boolean> {
    const webhookUrl = getSessionWebhookUrl();
    if (!webhookUrl) {
        console.error('Cannot save session: SESSION_WEBHOOK_URL is not configured.');
        return false;
    }

    try {
        const response = await axios.post(webhookUrl, sessionData, { params: { sessionId: sessionData.sessionId } });
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
