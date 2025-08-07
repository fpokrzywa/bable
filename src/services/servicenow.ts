
'use server';

import axios from 'axios';
import type { Incident } from '@/lib/types';

export async function getIncidents(): Promise<Incident[]> {
  const appClient = 'ai_browser';
  const appSecret = 'Appdev2025!';
  const requestUrl = 'https://dev309119.service-now.com/api/now/table/incident?sysparm_limit=10';

  // Create Basic Auth header
  const auth = Buffer.from(`${appClient}:${appSecret}`).toString('base64');

  try {
    const response = await axios.get(requestUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Basic ${auth}`,
      },
    });
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
