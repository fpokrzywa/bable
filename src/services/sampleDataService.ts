
'use server';

import axios from 'axios';
import type { Incident, Problem, Change } from '@/lib/types';

const getWebhookUrl = () => {
    const url = process.env.SAMPLE_RECORD_WEBHOOK_URL;
    if (!url) {
        throw new Error('SAMPLE_RECORD_WEBHOOK_URL is not configured in .env file.');
    }
    return url;
};

type DataType = 'incident' | 'problem' | 'change_request';

export async function getSampleData(type: DataType, sysId: string = 'all'): Promise<(Incident | Problem | Change)[]> {
    const webhookUrl = getWebhookUrl();

    try {
        const response = await axios.get(webhookUrl, {
            params: {
                type: type,
                sys_id: sysId,
            },
        });

        if (response.status === 200 && response.data) {
            return Array.isArray(response.data) ? response.data : [response.data];
        }

        console.warn(`Webhook for sample data returned status ${response.status} or no data.`);
        return [];

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(`Failed to get sample data from webhook for type ${type}:`, error.message);
        } else {
            console.error('An unexpected error occurred while fetching sample data:', error);
        }
        throw new Error(`Failed to fetch sample data for type: ${type}`);
    }
}
