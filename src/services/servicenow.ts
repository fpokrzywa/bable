
'use server';

import axios from 'axios';
import type { Incident } from '@/lib/types';

async function get<T>(endpoint: string, params?: any): Promise<T> {
  const appUrl = "https://dev309119.service-now.com/api/now/table/incident?sysparm_limit=1";
  const appClient = "7c29c861d5774a2982818223137888a9";
  const appSecret = "Appdev2025!";

  if (!appUrl || !appClient || !appSecret) {
    throw new Error('ServiceNow credentials are not configured in the environment variables.');
  }
  
  const auth = Buffer.from(`${appClient}:${appSecret}`).toString('base64');

  const client = axios.create({
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Basic ${auth}`,
    },
  });

  try {
    const response = await client.get(appUrl, { params });
    return response.data.result;
  } catch (error) {
    console.error('ServiceNow API Error:', error);
    throw new Error('Failed to fetch data from ServiceNow.');
  }
}

export async function getIncidents(): Promise<Incident[]> {
  return get<Incident[]>('/table/incident', { sysparm_limit: 1 });
}
