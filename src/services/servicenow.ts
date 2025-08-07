
'use server';

import axios from 'axios';
import type { Incident } from '@/lib/types';

async function get<T>(endpoint: string, params?: any): Promise<T> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  const appClient = process.env.NEXT_PUBLIC_APP_CLIENT;
  const appSecret = process.env.NEXT_PUBLIC_APP_SECRET;

  if (!appUrl || !appClient || !appSecret) {
    throw new Error('ServiceNow credentials are not configured in the environment variables.');
  }

  const auth = Buffer.from(`${appClient}:${appSecret}`).toString('base64');

  const client = axios.create({
    baseURL: `${appUrl}/api/now`,
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  try {
    const response = await client.get(endpoint, { params });
    return response.data.result;
  } catch (error) {
    console.error('ServiceNow API Error:', error);
    throw new Error('Failed to fetch data from ServiceNow.');
  }
}

export async function getIncidents(): Promise<Incident[]> {
  return get<Incident[]>('/table/incident');
}
