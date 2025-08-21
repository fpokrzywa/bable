import axios from 'axios';

export interface FindAnswersItem {
    id: string;
    title: string;
    icon?: string;
    type?: string;
    url?: string;
}

const getFindAnswersWebhookUrl = () => {
    const url = process.env.NEXT_PUBLIC_FIND_ANSWERS_WEBHOOK_URL;
    if (!url) {
        console.warn('NEXT_PUBLIC_FIND_ANSWERS_WEBHOOK_URL is not configured in .env file.');
        return null;
    }
    return url;
};

export async function getFindAnswersDetailById(id: string): Promise<any> {
    // TODO: Replace with actual API call to fetch detailed data by ID
    // For now, return mock data based on the provided example
    const mockData = {
        _id: { $oid: "6887752a9cc59c08e7f38b58" },
        id: "A1970-2",
        title: "IT Support Guides",
        description: "Quick solutions and how-to guides for common IT issues within the company.",
        learnMoreLink: "Explore all IT Support Resources",
        scenario: "Explore IT Support Guides to find helpful information and resources.",
        actions: [
            "Ask ODIN questions about IT support guides",
            "Get instant answers and guidance", 
            "Find relevant policies and procedures"
        ],
        articles: [
            {
                id: "article-1",
                policyName: "Password Reset Procedures",
                content: "Step-by-step guide for resetting passwords across company systems. This includes self-service options, security verification steps, and escalation procedures when automated reset fails.",
                category: "Security",
                url: "https://company.com/kb/password-reset",
                lastUpdated: "2024-01-15T10:30:00Z",
                author: "IT Security Team"
            },
            {
                id: "article-2",
                policyName: "Software Installation Guide",
                content: "Instructions for installing approved software and requesting new applications. Covers standard software packages, approval workflows, and security requirements.",
                category: "Software",
                url: "https://company.com/kb/software-install",
                lastUpdated: "2024-01-10T14:20:00Z",
                author: "IT Operations"
            },
            {
                id: "article-3",
                policyName: "Network Troubleshooting",
                content: "Common network issues and solutions for connectivity problems. Includes WiFi troubleshooting, VPN setup, and network diagnostics.",
                category: "Network",
                url: "https://company.com/kb/network",
                lastUpdated: "2024-01-08T09:15:00Z",
                author: "Network Team"
            }
        ]
    };

    // Customize the data based on the ID
    switch (id) {
        case 'my-support-guides':
            return {
                ...mockData,
                id: "A1970-3",
                title: "My Support Guides",
                description: "Quick solutions and how-to guides for common IT issues within the company.",
                scenario: "Explore IT Support Guides to find helpful information and resources.",
                actions: [
                    "Ask ODIN questions about IT support guides",
                    "Get instant answers and guidance", 
                    "Find relevant policies and procedures"
                ]
            };
        case 'hr-policies':
            return {
                ...mockData,
                id: "A1970-4",
                title: "HR Policies",
                description: "Human resources policies and procedures for employees.",
                articles: [
                    {
                        id: "hr-article-1",
                        policyName: "Employee Handbook",
                        content: "Comprehensive guide covering company policies, procedures, and expectations for all employees.",
                        category: "Policy",
                        lastUpdated: "2024-01-20T11:00:00Z",
                        author: "HR Department"
                    },
                    {
                        id: "hr-article-2",
                        policyName: "Leave Management",
                        content: "Guidelines for requesting and managing various types of leave including vacation, sick leave, and personal time off.",
                        category: "Benefits",
                        lastUpdated: "2024-01-18T14:30:00Z",
                        author: "HR Benefits Team"
                    }
                ]
            };
        case 'niea-guides':
            return {
                ...mockData,
                id: "A1970-5",
                title: "NIEA Guides",
                description: "NIEA-specific guides and documentation for compliance and procedures."
            };
        case 'adept-guides':
            return {
                ...mockData,
                id: "A1970-6",
                title: "ADEPT Guides",
                description: "ADEPT system guides and resources for advanced users."
            };
        default:
            return mockData;
    }
}

export async function getFindAnswersItems(): Promise<FindAnswersItem[]> {
    const webhookUrl = getFindAnswersWebhookUrl();
    if (!webhookUrl) {
        // Return default items if webhook is not configured
        return [
            { id: 'it-support-guides', title: 'IT Support Guides', icon: 'headphones' },
            { id: 'my-support-guides', title: 'My Support Guides', icon: 'headphones' },
            { id: 'hr-policies', title: 'HR Policies', icon: 'users' },
            { id: 'niea-guides', title: 'NIEA Guides', icon: 'file-text' },
            { id: 'adept-guides', title: 'ADEPT Guides', icon: 'book-open' },
        ];
    }

    try {
        const response = await axios.get(webhookUrl);
        
        if (response.status === 200 && response.data) {
            // Handle both array and object responses
            const data = Array.isArray(response.data) ? response.data : 
                        response.data.items || response.data.data || response.data.answers || [];
            
            if (Array.isArray(data)) {
                return data.map((item: any, index: number) => ({
                    id: item.id || item.key || `find-answer-${index}`,
                    title: item.title || item.name || item.label || 'Untitled',
                    icon: item.icon || 'help-circle',
                    type: item.type || 'guide',
                    url: item.url || item.link
                }));
            }
        }

        console.warn('Find Answers webhook returned invalid data format');
        return [];
    } catch (error) {
        console.error('Failed to fetch Find Answers items:', error);
        // Return empty array on error - the section will show no items
        return [];
    }
}