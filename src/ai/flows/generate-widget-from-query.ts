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
  widgetData: z.string().describe('A JSON string representing the widget data to be displayed.'),
});
export type GenerateWidgetFromQueryOutput = z.infer<typeof GenerateWidgetFromQueryOutputSchema>;

export async function generateWidgetFromQuery(input: GenerateWidgetFromQueryInput): Promise<GenerateWidgetFromQueryOutput> {
  return generateWidgetFromQueryFlow(input);
}

const generateWidgetFromQueryPrompt = ai.definePrompt({
  name: 'generateWidgetFromQueryPrompt',
  input: {schema: GenerateWidgetFromQueryInputSchema},
  output: {schema: GenerateWidgetFromQueryOutputSchema},
  prompt: `You are a ServiceNow expert. Generate a JSON object that represents the data for a widget based on the user's query.

  The widget should display the information requested in the query.  For example, if the query is "show me the open incidents", then the widgetData should be a JSON string that represents an array of open incidents, including fields like number, short_description, and priority.

  Make sure to return a valid JSON string.

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
    return output!;
  }
);
