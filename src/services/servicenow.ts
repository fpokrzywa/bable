
'use server';

import axios from 'axios';
import type { Incident } from '@/lib/types';

export async function getIncidents(): Promise<Incident[]> {
  // Get credentials from environment variables for security
  const appUrl = process.env.SERVICENOW_URL;
  const appClient = process.env.SERVICENOW_USERNAME; // ai_browser
  const appSecret = process.env.SERVICENOW_PASSWORD; // Appdev2025!

  if (!appUrl || !appClient || !appSecret) {
    throw new Error('ServiceNow credentials are not configured in the environment variables.');
  }
  
  // Create Basic Auth header
  const auth = Buffer.from(`${appClient}:${appSecret}`).toString('base64');

  const client = axios.create({
    baseURL: appUrl,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Basic ${auth}`,
    },
  });

  try {
    const response = await client.get('/api/now/table/incident?sysparm_limit=1');
    return response.data.result;
  } catch (error: any) {
    console.error('ServiceNow API Error:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data
    });
    
    // More specific error handling
    if (error.response?.status === 401) {
      throw new Error('Authentication failed. Check your ServiceNow credentials.');
    } else if (error.response?.status === 403) {
      throw new Error('Access forbidden. Check user permissions.');
    } else {
      throw new Error(`Failed to fetch data from ServiceNow: ${error.message}`);
    }
  }
}
