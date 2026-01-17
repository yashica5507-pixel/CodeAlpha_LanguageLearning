'use server';

/**
 * @fileOverview Assesses the accuracy of a user's pronunciation of a given word or phrase.
 *
 * - assessPronunciationAccuracy - A function that handles the pronunciation assessment process.
 * - AssessPronunciationAccuracyInput - The input type for the assessPronunciationAccuracy function.
 * - AssessPronunciationAccuracyOutput - The return type for the assessPronunciationAccuracy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AssessPronunciationAccuracyInputSchema = z.object({
  wordOrPhrase: z.string().describe('The word or phrase to be pronounced.'),
  userRecordingDataUri: z
    .string()
    .describe(
      'The user recording of the word or phrase, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' 
    ),
  targetLanguage: z.string().describe('The target language of the word or phrase.'),
});
export type AssessPronunciationAccuracyInput = z.infer<typeof AssessPronunciationAccuracyInputSchema>;

const AssessPronunciationAccuracyOutputSchema = z.object({
  accuracyScore: z
    .number()
    .min(0)
    .max(100)
    .describe('The accuracy score of the pronunciation, from 0 to 100.'),
  feedback: z.string().describe('Feedback on the pronunciation, including areas for improvement.'),
});
export type AssessPronunciationAccuracyOutput = z.infer<typeof AssessPronunciationAccuracyOutputSchema>;

export async function assessPronunciationAccuracy(
  input: AssessPronunciationAccuracyInput
): Promise<AssessPronunciationAccuracyOutput> {
  return assessPronunciationAccuracyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'assessPronunciationAccuracyPrompt',
  input: {schema: AssessPronunciationAccuracyInputSchema},
  output: {schema: AssessPronunciationAccuracyOutputSchema},
  prompt: `You are an AI pronunciation assessment tool. You will be given a word or phrase, a user recording of their pronunciation, and the target language. You will then assess the accuracy of the pronunciation and provide feedback.

Word or phrase: {{{wordOrPhrase}}}
User recording: {{media url=userRecordingDataUri}}
Target language: {{{targetLanguage}}}

Please provide an accuracy score from 0 to 100 and feedback on the pronunciation, including areas for improvement.

Please output in JSON format. Accuracy score should be an integer. The feedback should be a short string.`,
});

const assessPronunciationAccuracyFlow = ai.defineFlow(
  {
    name: 'assessPronunciationAccuracyFlow',
    inputSchema: AssessPronunciationAccuracyInputSchema,
    outputSchema: AssessPronunciationAccuracyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
