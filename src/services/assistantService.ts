
'use server';

import axios from 'axios';
import type { Assistant } from '@/lib/types';

const ASSISTANTS_CACHE_KEY = 'assistantsCache';
let cache: { timestamp: number; data: Assistant[] } | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const getWebhookUrl = () => {
    const url = process.env.GET_OPENAI_ASSISTANTS;
    if (!url) {
        console.warn('GET_OPENAI_ASSISTANTS webhook URL is not configured. Assistant fetching will be skipped.');
        return null;
    }
    return url;
};

const getSampleAssistants = (): Assistant[] => [
    {
        id: '1',
        name: 'ODIN (Sample)',
        description: 'You are a helpful assistant named ODIN, you are a meta-agent.... (This is sample data)',
        version: 'gpt-4.1',
        icon: 'bot',
        addedDate: '2023-10-26T10:00:00Z',
    },
    {
        id: '2',
        name: 'Prompt Architect (Sample)',
        description: 'You are a Prompt Architect AI. Your job is to write optimized system prompts...',
        version: 'gpt-4.1',
        icon: 'zap',
        addedDate: '2023-10-25T10:00:00Z',
    },
];

export async function getAssistants(forceRefresh = false): Promise<Assistant[]> {
    const now = Date.now();
    if (!forceRefresh && cache && (now - cache.timestamp < CACHE_DURATION)) {
        return cache.data;
    }

    const webhookUrl = getWebhookUrl();
    const apiKey = process.env.BABLEPHISH_ASSISTANT_API_KEY;

    if (!webhookUrl) {
        return getSampleAssistants();
    }
    
    if (!apiKey) {
        console.warn('BABLEPHISH_ASSISTANT_API_KEY is not configured. Falling back to sample data.');
        return getSampleAssistants();
    }

    try {
        const response = await axios.get(webhookUrl, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
            },
        });

        if (response.status === 200 && Array.isArray(response.data)) {
            const assistants = response.data.map((item: any) => ({
                id: item.id,
                name: item.name,
                description: item.instructions,
                version: item.model,
                icon: item.tools.length > 0 ? 'zap' : 'bot', // Example logic for icon
                addedDate: new Date(item.created_at * 1000).toISOString()
            }));

            cache = { timestamp: now, data: assistants };
            return assistants;
        }

        console.warn(`Webhook for assistants returned status ${response.status} or invalid data.`, response.data);
        return getSampleAssistants();

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Failed to get assistants from webhook:', error.message);
        } else {
            console.error('An unexpected error occurred while fetching assistants:', error);
        }
        // Instead of throwing, return sample data to allow the page to render.
        return getSampleAssistants();
    }
}
