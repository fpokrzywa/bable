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

const ChatHistorySchema = z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
});

const ContextAwareWidgetChatInputSchema = z.object({
  widgetType: z.string().describe('The type of widget (e.g., Incident, Change).'),
  widgetData: z.any().describe('The data currently displayed in the widget.'),
  userQuery: z.string().describe('The user input in the chat.'),
  selectedEntityData: z.any().optional().describe('The data for the specific entity the user is asking about.'),
  chatHistory: z.array(ChatHistorySchema).optional().describe('The previous chat history.'),
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

  Based on the widget type and its current data, suggest relevant actions or answer questions.
  Consider the user's last query and the chat history to refine your suggestions.

  Widget Type: {{{widgetType}}}
  {{#if selectedEntityData}}
  The user is specifically asking about the following record:
  {{{json selectedEntityData}}}
  {{else}}
  Widget Data: {{{json widgetData}}}
  {{/if}}

  {{#if chatHistory}}
  Chat History:
  {{#each chatHistory}}
  {{this.role}}: {{this.content}}
  {{/each}}
  {{/if}}

  User Query: {{{userQuery}}}

  If the user asks a question, answer it based on the provided data and chat history. If they ask for an action, suggest relevant actions (e.g., "search for related knowledge articles", "update incident priority", "assign to correct group").

  Return a JSON array of strings with the suggested actions or answer.

  Example Output for suggestions:
  {
    "suggestedActions": [
      "Search for related knowledge articles",
      "Update incident priority",
      "Add a comment to the incident"
    ]
  }


  Example Output for an answer:
  {
    "suggestedActions": [
      "The priority of this incident is 1 - Critical."
    ]
  }
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
