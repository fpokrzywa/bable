// This file is machine-generated - edit with care!

'use server';

/**
 * @fileOverview Implements the context-aware chat functionality for widgets.
 *
 * - contextAwareWidgetChat - A function that suggests relevant data/actions based on the widget's context.
 * - ContextAwareWidgetChatInput - The input type for the contextAwareWidgetChat function.
 * - ContextAwareWidgetChatOutput - The return type for the contextAwareWidgetChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ContextAwareWidgetChatInputSchema = z.object({
  widgetType: z.string().describe('The type of widget (e.g., Incident, Change).'),
  widgetData: z.record(z.any()).describe('The data currently displayed in the widget.'),
  userQuery: z.string().describe('The user input in the chat.'),
});
export type ContextAwareWidgetChatInput = z.infer<typeof ContextAwareWidgetChatInputSchema>;

const ContextAwareWidgetChatOutputSchema = z.object({
  suggestedActions: z.array(
    z.string().describe('A list of suggested actions based on the widget context.')
  ).
  describe('The suggestions for the user to perform in the widget.')
});
export type ContextAwareWidgetChatOutput = z.infer<typeof ContextAwareWidgetChatOutputSchema>;

export async function contextAwareWidgetChat(input: ContextAwareWidgetChatInput): Promise<ContextAwareWidgetChatOutput> {
  return contextAwareWidgetChatFlow(input);
}

const contextAwareWidgetChatPrompt = ai.definePrompt({
  name: 'contextAwareWidgetChatPrompt',
  input: {schema: ContextAwareWidgetChatInputSchema},
  output: {schema: ContextAwareWidgetChatOutputSchema},
  prompt: `You are an AI assistant within a ServiceNow widget.

  Based on the widget type and its current data, suggest relevant actions the user might want to take.
  Consider the user's last query to refine your suggestions.

  Widget Type: {{{widgetType}}}
  Widget Data: {{{widgetData}}}
  User Query: {{{userQuery}}}

  Suggestions should be concise and actionable (e.g., "search for related knowledge articles", "update incident priority", "assign to correct group").

  Return a JSON array of strings with the suggested actions.

  Example Output:
  [
    "search for related knowledge articles",
    "update incident priority",
    "add a comment to the incident"
  ]
  `,
});

const contextAwareWidgetChatFlow = ai.defineFlow(
  {
    name: 'contextAwareWidgetChatFlow',
    inputSchema: ContextAwareWidgetChatInputSchema,
    outputSchema: ContextAwareWidgetChatOutputSchema,
  },
  async input => {
    const {output} = await contextAwareWidgetChatPrompt(input);
    return output!;
  }
);
