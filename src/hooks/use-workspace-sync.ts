'use client';

import { useEffect, useRef, useState } from 'react';
import { detectWorkspaceChanges, type WorkspaceChanges } from '@/services/workspaceService';
import { updateCachedWorkspaces } from '@/services/userService';
import type { Workspace, User } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface UseWorkspaceSyncOptions {
    user: User | null;
    workspaces: Workspace[];
    onWorkspacesChanged: (workspaces: Workspace[]) => void;
    onWorkspacesDeleted: (deletedIds: string[]) => void;
    enabled?: boolean;
    intervalMs?: number;
    showNotifications?: boolean;
}

export function useWorkspaceSync({
    user,
    workspaces,
    onWorkspacesChanged,
    onWorkspacesDeleted,
    enabled = true,
    intervalMs = 30000, // Default: 30 seconds
    showNotifications = true
}: UseWorkspaceSyncOptions) {
    const { toast } = useToast();
    const [isChecking, setIsChecking] = useState(false);
    const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
    const intervalRef = useRef<NodeJS.Timeout>();
    const isActiveRef = useRef(true);

    // Pause sync when tab is not visible
    useEffect(() => {
        const handleVisibilityChange = () => {
            isActiveRef.current = !document.hidden;
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, []);

    const checkForChanges = async (silent = false) => {
        if (!user || !enabled || isChecking || !isActiveRef.current) return;

        setIsChecking(true);
        try {
            const changes = await detectWorkspaceChanges(user.userId, workspaces);
            
            if (changes.hasChanges) {
                console.log('Workspace changes detected:', changes);
                
                // Apply changes to workspaces
                let updatedWorkspaces = [...workspaces];
                
                // Remove deleted workspaces
                if (changes.deleted.length > 0) {
                    updatedWorkspaces = updatedWorkspaces.filter(
                        ws => !changes.deleted.includes(ws.workspaceId)
                    );
                    onWorkspacesDeleted(changes.deleted);
                }
                
                // Add new workspaces
                if (changes.added.length > 0) {
                    updatedWorkspaces = [...updatedWorkspaces, ...changes.added];
                }
                
                // Update modified workspaces
                if (changes.modified.length > 0) {
                    const modifiedMap = new Map(changes.modified.map(ws => [ws.workspaceId, ws]));
                    updatedWorkspaces = updatedWorkspaces.map(ws => 
                        modifiedMap.get(ws.workspaceId) || ws
                    );
                }
                
                // Update cache and state
                updateCachedWorkspaces(updatedWorkspaces);
                onWorkspacesChanged(updatedWorkspaces);
                
                // Show notifications if enabled and not silent
                if (showNotifications && !silent) {
                    const messages = [];
                    if (changes.added.length > 0) {
                        messages.push(`${changes.added.length} workspace(s) added`);
                    }
                    if (changes.modified.length > 0) {
                        messages.push(`${changes.modified.length} workspace(s) updated`);
                    }
                    if (changes.deleted.length > 0) {
                        messages.push(`${changes.deleted.length} workspace(s) removed`);
                    }
                    
                    toast({
                        title: 'Workspaces Updated',
                        description: messages.join(', '),
                        duration: 3000,
                    });
                }
            }
            
            setLastSyncTime(new Date());
        } catch (error) {
            console.error('Failed to sync workspaces:', error);
        } finally {
            setIsChecking(false);
        }
    };

    // Manual sync function
    const syncNow = () => {
        checkForChanges(false);
    };

    // Set up periodic sync
    useEffect(() => {
        if (!enabled || !user) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = undefined;
            }
            return;
        }

        // Initial check after a short delay
        const initialTimeout = setTimeout(() => {
            checkForChanges(true); // Silent initial check
        }, 2000);

        // Set up periodic checks
        intervalRef.current = setInterval(() => {
            checkForChanges(true); // Silent periodic checks
        }, intervalMs);

        return () => {
            clearTimeout(initialTimeout);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [user, enabled, intervalMs, workspaces.length]); // Include workspaces.length to restart when workspaces change

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    return {
        isChecking,
        lastSyncTime,
        syncNow,
        enabled: enabled && !!user
    };
}