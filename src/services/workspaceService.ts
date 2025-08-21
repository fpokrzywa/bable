

'use server';

import axios from 'axios';
import type { Workspace } from '@/lib/types';

const getWorkspaceWebhookUrl = () => {
    const url = process.env.WORKSPACE_WEBHOOK_URL;
    if (!url) {
        throw new Error('WORKSPACE_WEBHOOK_URL is not configured in .env file.');
    }
    return url;
};

const getUserWorkspacesWebhookUrl = () => {
    const url = process.env.USER_WORKSPACE_WEBHOOK_URL;
    if (!url) {
        console.warn('USER_WORKSPACE_WEBHOOK_URL is not configured in .env file - workspace sync disabled');
        return null;
    }
    return url;
};

export async function getWorkspaces(userId: string): Promise<Workspace[]> {
    try {
        const webhookUrl = getUserWorkspacesWebhookUrl();
        if (!webhookUrl) {
            return []; // Gracefully return empty array if webhook URL is not configured
        }
        const response = await axios.get(webhookUrl, { params: { userId, workspaceId: 'all' } });
        if (response.status === 200 && response.data) {
            return Array.isArray(response.data) ? response.data : [response.data];
        }
        return [];
    } catch (error: any) {
        // Only log detailed errors for non-404 status codes
        if (error?.response?.status !== 404) {
            console.error('Failed to get workspaces:', error);
        } else {
            console.warn('Workspace endpoint not found (404) - using local workspace management');
        }
        return [];
    }
}

export interface WorkspaceChanges {
    added: Workspace[];
    deleted: string[];
    modified: Workspace[];
    hasChanges: boolean;
}

export async function detectWorkspaceChanges(userId: string, currentWorkspaces: Workspace[]): Promise<WorkspaceChanges> {
    try {
        const freshWorkspaces = await getWorkspaces(userId);
        
        const currentMap = new Map(currentWorkspaces.map(ws => [ws.workspaceId, ws]));
        const freshMap = new Map(freshWorkspaces.map(ws => [ws.workspaceId, ws]));
        
        const added: Workspace[] = [];
        const modified: Workspace[] = [];
        const deleted: string[] = [];
        
        // Find added and modified workspaces
        for (const [id, freshWs] of freshMap) {
            const currentWs = currentMap.get(id);
            if (!currentWs) {
                added.push(freshWs);
            } else if (JSON.stringify(currentWs) !== JSON.stringify(freshWs)) {
                modified.push(freshWs);
            }
        }
        
        // Find deleted workspaces
        for (const [id] of currentMap) {
            if (!freshMap.has(id)) {
                deleted.push(id);
            }
        }
        
        return {
            added,
            deleted,
            modified,
            hasChanges: added.length > 0 || deleted.length > 0 || modified.length > 0
        };
    } catch (error) {
        console.error('Failed to detect workspace changes:', error);
        return {
            added: [],
            deleted: [],
            modified: [],
            hasChanges: false
        };
    }
}


export async function saveWorkspace(workspaceData: Omit<Workspace, 'workspaceId' | 'active'> & { workspaceId?: string }): Promise<Workspace | null> {
    const webhookUrl = getWorkspaceWebhookUrl();
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
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            // Only log detailed errors for non-404 status codes
            if (error?.response?.status !== 404) {
                console.error('Failed to save workspace:', {
                    message: error.message,
                    status: error.response?.status,
                    data: error.response?.data,
                    url: webhookUrl,
                    sentData: payload
                });
            } else {
                console.warn('Workspace save endpoint not found (404) - workspace not saved to remote');
            }
        } else {
            console.error('An unexpected error occurred during workspace save:', error);
        }
        return null;
    }
}

export async function deleteWorkspace(workspaceId: string): Promise<boolean> {
    const webhookUrl = getWorkspaceWebhookUrl();
    try {
        const response = await axios.delete(webhookUrl, { params: { workspaceId } });
        return response.status === 200 || response.status === 204;
    } catch (error: any) {
        // Only log detailed errors for non-404 status codes
        if (error?.response?.status !== 404) {
            console.error('Failed to delete workspace:', error);
        } else {
            console.warn('Workspace delete endpoint not found (404) - workspace not deleted from remote');
        }
        return false;
    }
}
