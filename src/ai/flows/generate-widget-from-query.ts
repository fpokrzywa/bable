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
});
export type GenerateWidgetFromQueryInput = z.infer<typeof GenerateWidgetFromQueryInputSchema>;

const GenerateWidgetFromQueryOutputSchema = z.object({
  answer: z.string().describe('A natural language answer to the user query.'),
});
export type GenerateWidgetFromQueryOutput = z.infer<typeof GenerateWidgetFromQueryOutputSchema>;

export async function generateWidgetFromQuery(input: GenerateWidgetFromQueryInput): Promise<GenerateWidgetFromQueryOutput> {
  return generateWidgetFromQueryFlow(input);
}

const generateWidgetFromQueryPrompt = ai.definePrompt({
  name: 'generateWidgetFromQueryPrompt',
  input: {schema: GenerateWidgetFromQueryInputSchema},
  output: {schema: GenerateWidgetFromQueryOutputSchema},
  prompt: `You are a ServiceNow expert. Directly answer the user's query in a clear and concise way. If you don't have a specific tool or data, provide a helpful, conversational response.

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
