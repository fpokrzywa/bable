
'use server';

import axios, { type AxiosInstance } from 'axios';
import type { Incident } from '@/lib/types';

class ServiceNowAPI {
  private static instance: ServiceNowAPI;
  private client: AxiosInstance;

  private constructor() {
    const appUrl = process.env.APP_URL;
    const appClient = process.env.APP_CLIENT;
    const appSecret = process.env.APP_SECRET;

    if (!appUrl || !appClient || !appSecret) {
      throw new Error('ServiceNow credentials are not configured in the environment variables.');
    }

    const auth = Buffer.from(`${appClient}:${appSecret}`).toString('base64');

    this.client = axios.create({
      baseURL: `${appUrl}/api/now`,
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
  }

  public static getInstance(): ServiceNowAPI {
    if (!ServiceNowAPI.instance) {
      ServiceNowAPI.instance = new ServiceNowAPI();
    }
    return ServiceNowAPI.instance;
  }

  async get<T>(endpoint: string, params?: any): Promise<T> {
    try {
      const response = await this.client.get(endpoint, { params });
      return response.data.result;
    } catch (error) {
      console.error('ServiceNow API Error:', error);
      throw new Error('Failed to fetch data from ServiceNow.');
    }
  }

  async getIncidents(): Promise<Incident[]> {
    return this.get<Incident[]>('/table/incident');
  }
}

export const servicenowAPI = ServiceNowAPI.getInstance();
