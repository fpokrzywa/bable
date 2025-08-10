
'use server';

import axios from 'axios';
import type { Workspace } from '@/lib/types';

const getWebhookUrl = () => {
    const url = process.env.USER_WORKSPACE_WEBHOOK_URL;
    if (!url) {
        throw new Error('USER_WORKSPACE_WEBHOOK_URL is not configured in .env file.');
    }
    return url;
};

export async function getWorkspaces(userId: string): Promise<Workspace[]> {
    const webhookUrl = getWebhookUrl();
    try {
        const response = await axios.get(webhookUrl, { params: { userId, workspaceId: 'all' } });
        if (response.status === 200 && response.data) {
            return Array.isArray(response.data) ? response.data : [response.data];
        }
        return [];
    } catch (error) {
        console.error('Failed to get workspaces:', error);
        return [];
    }
}


export async function saveWorkspace(workspaceData: Omit<Workspace, 'workspaceId' | 'active'> & { workspaceId?: string }): Promise<Workspace | null> {
    const webhookUrl = getWebhookUrl();
    const workspaceId = workspaceData.workspaceId || `ws_${Date.now()}`;
    const payload = {
        ...workspaceData,
        workspaceId: workspaceId,
        active: true,
    };

    try {
        const response = await axios.post(webhookUrl, payload, { params: { workspaceId } });
        if (response.status === 200 || response.status === 201) {
            // The webhook can return the saved object directly or inside a 'result' property
            return response.data?.result || response.data;
        }
        return null;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Failed to save workspace:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
                url: webhookUrl,
                sentData: payload
            });
        } else {
            console.error('An unexpected error occurred during workspace save:', error);
        }
        return null;
    }
}

export async function deleteWorkspace(workspaceId: string): Promise<boolean> {
    const webhookUrl = getWebhookUrl();
    try {
        const response = await axios.delete(webhookUrl, { params: { workspaceId } });
        return response.status === 200 || response.status === 204;
    } catch (error) {
        console.error('Failed to delete workspace:', error);
        return false;
    }
}
