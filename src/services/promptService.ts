
'use server';

import axios from 'axios';
import type { Prompt } from '@/lib/types';

const getWebhookUrl = () => {
    const url = process.env.GET_PROMPT_WEBHOOK_URL;
    if (!url) {
        console.warn('GET_PROMPT_WEBHOOK_URL is not configured in .env file. Prompt fetching will be skipped.');
        return null;
    }
    return url;
};

export async function getPrompts(): Promise<Prompt[]> {
    const webhookUrl = getWebhookUrl();
    if (!webhookUrl) {
        return []; // Return empty array if URL is not set
    }

    try {
        const response = await axios.get(webhookUrl);

        if (response.status === 200 && response.data) {
            return Array.isArray(response.data) ? response.data : [response.data];
        }

        console.warn(`Webhook for prompts returned status ${response.status} or no data.`);
        return [];

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Failed to get prompts from webhook:', error.message);
        } else {
            console.error('An unexpected error occurred while fetching prompts:', error);
        }
        // Instead of throwing, return empty array to allow the page to render.
        return [];
    }
}
