'use server';
/**
 * @fileOverview A flow to generate a summary from all open widgets.
 *
 * - generateOverviewSummary - A function that handles generating the summary.
 * - GenerateOverviewSummaryInput - The input type for the generateOverviewSummary function.
 * - GenerateOverviewSummaryOutput - The return type for the generateOverviewSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateOverviewSummaryInputSchema = z.object({
  widgetData: z.array(z.any()).describe('The data from all open widgets.'),
});
export type GenerateOverviewSummaryInput = z.infer<typeof GenerateOverviewSummaryInputSchema>;

const GenerateOverviewSummaryOutputSchema = z.object({
  summary: z.string().describe('The generated summary of all widget data.'),
});
export type GenerateOverviewSummaryOutput = z.infer<typeof GenerateOverviewSummaryOutputSchema>;

export async function generateOverviewSummary(input: GenerateOverviewSummaryInput): Promise<GenerateOverviewSummaryOutput> {
  return generateOverviewSummaryFlow(input);
}

const generateOverviewSummaryPrompt = ai.definePrompt({
  name: 'generateOverviewSummaryPrompt',
  input: {schema: GenerateOverviewSummaryInputSchema},
  output: {schema: GenerateOverviewSummaryOutputSchema},
  prompt: `You are a ServiceNow expert. Based on the data from all the open widgets, provide a concise summary.

  Widget Data:
  {{{json widgetData}}}
  `,
});

const generateOverviewSummaryFlow = ai.defineFlow(
  {
    name: 'generateOverviewSummaryFlow',
    inputSchema: GenerateOverviewSummaryInputSchema,
    outputSchema: GenerateOverviewSummaryOutputSchema,
  },
  async input => {
    const {output} = await generateOverviewSummaryPrompt(input);
    return output!;
  }
);
