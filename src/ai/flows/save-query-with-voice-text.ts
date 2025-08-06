'use server';
/**
 * @fileOverview A flow to save common queries or widget configurations using voice or text commands.
 *
 * - saveQueryWithVoiceText - A function that handles saving the query with voice or text.
 * - SaveQueryWithVoiceTextInput - The input type for the saveQueryWithVoiceText function.
 * - SaveQueryWithVoiceTextOutput - The return type for the saveQueryWithVoiceText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SaveQueryWithVoiceTextInputSchema = z.object({
  queryName: z.string().describe('The name of the query to be saved.'),
  queryText: z.string().describe('The text of the query to be saved.'),
});
export type SaveQueryWithVoiceTextInput = z.infer<typeof SaveQueryWithVoiceTextInputSchema>;

const SaveQueryWithVoiceTextOutputSchema = z.object({
  success: z.boolean().describe('Whether the query was successfully saved.'),
  message: z.string().describe('A message indicating the result of the save operation.'),
});
export type SaveQueryWithVoiceTextOutput = z.infer<typeof SaveQueryWithVoiceTextOutputSchema>;

export async function saveQueryWithVoiceText(input: SaveQueryWithVoiceTextInput): Promise<SaveQueryWithVoiceTextOutput> {
  return saveQueryWithVoiceTextFlow(input);
}

const saveQueryWithVoiceTextPrompt = ai.definePrompt({
  name: 'saveQueryWithVoiceTextPrompt',
  input: {schema: SaveQueryWithVoiceTextInputSchema},
  output: {schema: SaveQueryWithVoiceTextOutputSchema},
  prompt: `You are a ServiceNow assistant helping users save their queries.
  The user wants to save the following query with the given name.
  If the query name is valid, save the query and return success as true.  Otherwise return false.

  Query Name: {{{queryName}}}
  Query Text: {{{queryText}}}
  `,
});

const saveQueryWithVoiceTextFlow = ai.defineFlow(
  {
    name: 'saveQueryWithVoiceTextFlow',
    inputSchema: SaveQueryWithVoiceTextInputSchema,
    outputSchema: SaveQueryWithVoiceTextOutputSchema,
  },
  async input => {
    // TODO: Implement the logic to save the query.
    // This is a placeholder implementation.
    const {output} = await saveQueryWithVoiceTextPrompt(input);
    return {
      success: true,
      message: `Query "${input.queryName}" saved successfully.`, 
    };
  }
);
