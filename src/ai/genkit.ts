import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI({apiKey: 'AIzaSyAytIneVxy8TLyFcFd0pZdnz8P5lV9iMNc'})],
  model: 'googleai/gemini-2.0-flash',
});
