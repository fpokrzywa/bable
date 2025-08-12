
'use server';

import axios from 'axios';

// The Session type is removed from lib/types.ts, so we define it locally or remove usage.
// For now, we'll keep a basic structure for any potential future use, but the functions will be disabled.

interface Session {
    sessionId: string;
    userId: string;
    workspace_data: string;
    active: boolean;
}


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
    console.log('Session saving is currently disabled.');
    return Promise.resolve(true);
}

export async function getUserSession(userId: string): Promise<Session | null> {
    console.log('Session loading is currently disabled.');
    return Promise.resolve(null);
}
