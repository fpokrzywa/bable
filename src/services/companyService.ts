import axios from 'axios';
import type { Company } from '@/lib/types';

const getCompanyWebhookUrl = () => {
    const url = process.env.NEXT_PUBLIC_GET_COMPANY_WEBHOOK;
    if (!url) {
        console.warn('NEXT_PUBLIC_GET_COMPANY_WEBHOOK is not configured.');
        return null;
    }
    return url;
};

const getUpsertWebhookUrl = () => {
    const url = process.env.NEXT_PUBLIC_UPSERT_WEBHOOK;
    if (!url) {
        console.warn('NEXT_PUBLIC_UPSERT_WEBHOOK is not configured.');
        return null;
    }
    return url;
};

export async function getAllCompanies(): Promise<Company[]> {
    const webhookUrl = getCompanyWebhookUrl();
    if (!webhookUrl) {
        return [];
    }

    try {
        const response = await axios.get(webhookUrl, { params: { id: 'all' } });
        
        if (response.status === 200 && Array.isArray(response.data)) {
            return response.data.map(company => ({
                ...company,
                id: company.id || company._id?.$oid
            }));
        }
        
        // Handle cases where the API returns an object with a 'data' or other property
        if (response.status === 200 && response.data && typeof response.data === 'object') {
            const companyArray = response.data.data || response.data.companies || response.data.items || response.data.result;
            if (Array.isArray(companyArray)) {
                return companyArray.map(company => ({
                    ...company,
                    id: company.id || company._id?.$oid
                }));
            }
        }
        
        console.warn("Webhook response for all companies was not in a recognized array format. Returning empty array.", response.data);
        return [];
    } catch (error) {
        console.error('Failed to get all companies from webhook:', error);
        return [];
    }
}

export async function getCompanyById(companyId: string): Promise<Company | null> {
    const webhookUrl = getCompanyWebhookUrl();
    if (!webhookUrl) {
        return null;
    }

    try {
        const response = await axios.get(webhookUrl, { params: { id: companyId } });
        
        if (response.status === 200 && response.data) {
            const companyData = Array.isArray(response.data) ? response.data[0] : response.data;
            if (companyData) {
                return {
                    ...companyData,
                    id: companyData.id || companyData._id?.$oid
                };
            }
        }
        
        console.warn(`No company found for companyId: ${companyId}`);
        return null;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                console.warn(`Company not found (id: ${companyId})`);
                return null;
            } else {
                console.error(`Failed to fetch company by ID ${companyId}:`, error.message);
            }
        } else {
            console.error('An unexpected error occurred:', error);
        }
        return null;
    }
}

export async function updateCompany(companyData: Partial<Company>): Promise<boolean> {
    const webhookUrl = getUpsertWebhookUrl();
    if (!webhookUrl) {
        console.error('Cannot update company: NEXT_PUBLIC_UPSERT_WEBHOOK is not configured.');
        return false;
    }

    try {
        // Map frontend field names to match n8n flow expectations
        const mappedData = {
            active: true, // Always set to true for active companies
            id: companyData.id,
            company_name: companyData.company_name,
            chat_bot_name: companyData.chat_bot_name,
            user_count: companyData.user_count?.toString(), // Convert to string as expected by n8n
            token_allotment: companyData.token_allotment?.toString(), // Convert to string as expected by n8n
            max_workspace_sessions: [companyData.max_workspace_sessions], // Convert to array as expected by n8n flow
            demo_environment: companyData.demo_environment ? 'true' : 'false', // Convert boolean to string
            llm_config: companyData.llm_config,
            openai_key: companyData["OpenAI API Key"] // Map the OpenAI API Key field
        };

        console.log('Sending mapped company data to webhook:', mappedData);
        
        const response = await axios.post(webhookUrl, mappedData);
        return response.status === 200 || response.status === 201;
    } catch (error) {
        console.error('Failed to update company via webhook:', error);
        return false;
    }
}