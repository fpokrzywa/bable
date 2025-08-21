'use client';

import { useEffect, useRef, useState } from 'react';
import { getFindAnswersItems, type FindAnswersItem } from '@/services/findAnswersService';
import type { User } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface UseFindAnswersSyncOptions {
    user: User | null;
    findAnswersItems: FindAnswersItem[];
    onFindAnswersChanged: (items: FindAnswersItem[]) => void;
    enabled?: boolean;
    intervalMs?: number;
    showNotifications?: boolean;
}

export function useFindAnswersSync({
    user,
    findAnswersItems,
    onFindAnswersChanged,
    enabled = true,
    intervalMs = 60000, // Default: 60 seconds (longer than workspaces since this data changes less frequently)
    showNotifications = true
}: UseFindAnswersSyncOptions) {
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

    // Function to detect changes between old and new items
    const detectChanges = (oldItems: FindAnswersItem[], newItems: FindAnswersItem[]) => {
        const oldMap = new Map(oldItems.map(item => [item.id, item]));
        const newMap = new Map(newItems.map(item => [item.id, item]));

        const added = newItems.filter(item => !oldMap.has(item.id));
        const deleted = oldItems.filter(item => !newMap.has(item.id));
        const modified = newItems.filter(item => {
            const oldItem = oldMap.get(item.id);
            return oldItem && (
                oldItem.title !== item.title ||
                oldItem.icon !== item.icon ||
                oldItem.type !== item.type ||
                oldItem.url !== item.url
            );
        });

        return {
            hasChanges: added.length > 0 || deleted.length > 0 || modified.length > 0,
            added,
            deleted,
            modified
        };
    };

    const checkForChanges = async (silent = false) => {
        if (!enabled || isChecking || !isActiveRef.current) return;

        setIsChecking(true);
        try {
            const newItems = await getFindAnswersItems();
            const changes = detectChanges(findAnswersItems, newItems);
            
            if (changes.hasChanges) {
                console.log('Find Answers changes detected:', changes);
                
                // Update with new items
                onFindAnswersChanged(newItems);
                
                // Show notifications if enabled and not silent
                if (showNotifications && !silent) {
                    const messages = [];
                    if (changes.added.length > 0) {
                        messages.push(`${changes.added.length} new item(s) added`);
                    }
                    if (changes.modified.length > 0) {
                        messages.push(`${changes.modified.length} item(s) updated`);
                    }
                    if (changes.deleted.length > 0) {
                        messages.push(`${changes.deleted.length} item(s) removed`);
                    }
                    
                    toast({
                        title: 'Find Answers Updated',
                        description: messages.join(', '),
                        duration: 3000,
                    });
                }
            }
            
            setLastSyncTime(new Date());
        } catch (error) {
            console.error('Failed to sync Find Answers:', error);
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
        if (!enabled) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = undefined;
            }
            return;
        }

        // Initial check after a short delay
        const initialTimeout = setTimeout(() => {
            checkForChanges(true); // Silent initial check
        }, 5000); // Slightly longer initial delay

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
    }, [enabled, intervalMs, findAnswersItems.length]); // Include findAnswersItems.length to restart when items change

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
        enabled: enabled
    };
}