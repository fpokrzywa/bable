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

const generateWidgetFromQueryPrompt = ai.definePrompt({
  name: 'generateWidgetFromQueryPrompt',
  input: {schema: GenerateWidgetFromQueryInputSchema},
  output: {schema: GenerateWidgetFromQueryOutputSchema},
  prompt: `You are a ServiceNow expert. Your primary job is to answer user queries.

If the user's query is a request to open, load, or view a workspace, identify the name of the workspace they want to open and put it in the 'workspace_to_load' field. Also provide a confirmation message in the 'answer' field. For example, if the user says "open my incident workspace", set 'workspace_to_load' to "incident" and 'answer' to "Loading your incident workspace."

Otherwise, directly answer the user's query in a clear and concise way. If you don't have a specific tool or data, provide a helpful, conversational response.

{{#if workspaceData}}
Use the following data from the user's open workspaces as context to answer the query if it is relevant.
Workspace Data:
{{{json workspaceData}}}
{{/if}}

User Query: {{{query}}}`,
});

const generateWidgetFromQueryFlow = ai.defineFlow(
  {
    name: 'generateWidgetFromQueryFlow',
    inputSchema: GenerateWidgetFromQueryInputSchema,
    outputSchema: GenerateWidgetFromQueryOutputSchema,
  },
  async input => {
    const {output} = await generateWidgetFromQueryPrompt(input);
    if (!output) {
      return { answer: "I'm sorry, I could not process that request. Please try again." };
    }
    return output;
  }
);
