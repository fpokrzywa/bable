'use server';

/**
 * @fileOverview Dynamically assigns a ServiceNow agent to each widget based on its data.
 *
 * - agentSpecificWidget - A function that handles the agent assignment process.
 * - AgentSpecificWidgetInput - The input type for the agentSpecificWidget function.
 * - AgentSpecificWidgetOutput - The return type for the agentSpecificWidget function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AgentSpecificWidgetInputSchema = z.object({
  widgetData: z.string().describe('The data associated with the widget.'),
});
export type AgentSpecificWidgetInput = z.infer<typeof AgentSpecificWidgetInputSchema>;

const AgentSpecificWidgetOutputSchema = z.object({
  agentType: z.string().describe('The type of ServiceNow agent assigned to the widget (e.g., incident agent, change agent).'),
  agentBehavior: z.string().describe('The specific behavior of the agent within the widget.'),
});
export type AgentSpecificWidgetOutput = z.infer<typeof AgentSpecificWidgetOutputSchema>;

export async function agentSpecificWidget(input: AgentSpecificWidgetInput): Promise<AgentSpecificWidgetOutput> {
  return agentSpecificWidgetFlow(input);
}

const prompt = ai.definePrompt({
  name: 'agentSpecificWidgetPrompt',
  input: {schema: AgentSpecificWidgetInputSchema},
  output: {schema: AgentSpecificWidgetOutputSchema},
  prompt: `Based on the following widget data, determine the most appropriate ServiceNow agent type and its corresponding behavior within the widget.\n\nWidget Data: {{{widgetData}}}\n\nConsider agent types like incident agent, change agent, problem agent, etc.\nSpecify the agentType and a brief description of the agentBehavior applicable to this widget.`,
});

const agentSpecificWidgetFlow = ai.defineFlow(
  {
    name: 'agentSpecificWidgetFlow',
    inputSchema: AgentSpecificWidgetInputSchema,
    outputSchema: AgentSpecificWidgetOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
