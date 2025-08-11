// This file is machine-generated - edit at your own risk.

'use server';

/**
 * @fileOverview This file defines a Genkit flow that generates a widget based on a user query. It takes a query as input and returns a JSON object representing the widget data.
 *
 * @function generateWidgetFromQuery - The main function that takes a user query and returns widget data.
 * @interface GenerateWidgetFromQueryInput - The input type for the generateWidgetFromQuery function.
 * @interface GenerateWidgetFromQueryOutput - The output type for the generateWidgetFromQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import axios from 'axios';

const GenerateWidgetFromQueryInputSchema = z.object({
  query: z.string().describe('The user query to generate the widget.'),
  workspaceData: z.array(z.any()).optional().describe('Data from all open workspaces to provide context.'),
});
export type GenerateWidgetFromQueryInput = z.infer<typeof GenerateWidgetFromQueryInputSchema>;

const GenerateWidgetFromQueryOutputSchema = z.object({
  answer: z.string().describe('A natural language answer to the user query.'),
  workspace_to_load: z.string().optional().describe('If the user wants to open a workspace, this is the name of the workspace to load.'),
});
export type GenerateWidgetFromQueryOutput = z.infer<typeof GenerateWidgetFromQueryOutputSchema>;

export async function generateWidgetFromQuery(input: GenerateWidgetFromQueryInput): Promise<GenerateWidgetFromQueryOutput> {
  return generateWidgetFromQueryFlow(input);
}

const generateWidgetFromQueryFlow = ai.defineFlow(
  {
    name: 'generateWidgetFromQueryFlow',
    inputSchema: GenerateWidgetFromQueryInputSchema,
    outputSchema: GenerateWidgetFromQueryOutputSchema,
  },
  async (input) => {
    const webhookUrl = process.env.APP_LLM_WEBHOOK_URL;
    const llmConfig = process.env.APP_LLM_CONFIG;

    if (!webhookUrl) {
      throw new Error('APP_LLM_WEBHOOK_URL is not configured in the .env file.');
    }

    try {
      const fullInput = {
        query: input.query,
        context: input.workspaceData,
      };

      const payload = {
        llm: llmConfig?.toLowerCase(),
        input: fullInput,
      };

      // Use POST to send data in the body, avoiding URL length limits.
      const response = await axios.post(webhookUrl, payload);

      if (response.status === 200 && response.data) {
        let responseData = response.data;
        // Handle if response is an array
        if (Array.isArray(responseData) && responseData.length > 0) {
          responseData = responseData[0];
        }

        if (typeof responseData === 'object' && responseData !== null) {
          return {
            answer: responseData.answer || responseData.output || "I received a response, but it was empty.",
            workspace_to_load: responseData.workspace_to_load
          };
        }
        
        // Handle plain string response for backward compatibility
        return {
          answer: responseData,
        };
      } else {
        return { answer: `The webhook responded with status: ${response.status}` };
      }
    } catch (error) {
      console.error('Error calling LLM webhook:', error);
      let errorMessage = 'An error occurred while contacting the LLM webhook.';
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = `Webhook error: ${error.response.status} - ${error.response.statusText}`;
      } else if (axios.isAxiosError(error)) {
        errorMessage = `Webhook request failed: ${error.message}`;
      }
      return { answer: errorMessage };
    }
  }
);
