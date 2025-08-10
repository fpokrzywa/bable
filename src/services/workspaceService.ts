
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
            return response.data;
        }
        return null;
    } catch (error) {
        console.error('Failed to save workspace:', error);
        return null;
    }
}

export async function deleteWorkspace(workspaceId: string): Promise<boolean> {
    const webhookUrl = getWebhookUrl();
    try {
        // The webhook might expect a DELETE request or a POST with an 'active: false' flag.
        // Using a POST with active: false as a safer default.
        const response = await axios.post(webhookUrl, { workspaceId, active: false });
        return response.status === 200 || response.status === 204;
    } catch (error) {
        console.error('Failed to delete workspace:', error);
        return false;
    }
}
