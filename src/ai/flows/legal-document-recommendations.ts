'use server';

/**
 * @fileOverview Provides personalized legal document recommendations based on case details and profile.
 *
 * - legalDocumentRecommendations - A function that returns a list of recommended legal documents.
 * - LegalDocumentRecommendationsInput - The input type for the legalDocumentRecommendations function.
 * - LegalDocumentRecommendationsOutput - The return type for the legalDocumentRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LegalDocumentRecommendationsInputSchema = z.object({
  caseDetails: z
    .string()
    .describe('Detailed information about the client legal case.'),
  clientProfile: z
    .string()
    .describe('Information about the client profile.'),
});
export type LegalDocumentRecommendationsInput =
  z.infer<typeof LegalDocumentRecommendationsInputSchema>;

const LegalDocumentRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('A list of recommended legal documents.'),
});
export type LegalDocumentRecommendationsOutput =
  z.infer<typeof LegalDocumentRecommendationsOutputSchema>;

export async function legalDocumentRecommendations(
  input: LegalDocumentRecommendationsInput
): Promise<LegalDocumentRecommendationsOutput> {
  if (!process.env.GEMINI_API_KEY && !process.env.GOOGLE_API_KEY) {
    return {
      recommendations: [
        'Procuração ad judicia',
        'Contrato de honorários',
        'Declaração de hipossuficiência, quando aplicável',
        'Checklist de documentos pessoais e provas do caso',
        `Peça inicial adaptada ao perfil: ${input.clientProfile || 'cliente'}`,
      ],
    };
  }

  return legalDocumentRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'legalDocumentRecommendationsPrompt',
  input: {schema: LegalDocumentRecommendationsInputSchema},
  output: {schema: LegalDocumentRecommendationsOutputSchema},
  prompt: `You are an AI assistant that provides legal document recommendations.

  Based on the case details and client profile provided, suggest potentially useful legal document templates.

  Case Details: {{{caseDetails}}}
  Client Profile: {{{clientProfile}}}

  Provide a list of legal document recommendations that would be most helpful for this client's legal needs.
  Ensure the output is a JSON array of strings.
  `,
});

const legalDocumentRecommendationsFlow = ai.defineFlow(
  {
    name: 'legalDocumentRecommendationsFlow',
    inputSchema: LegalDocumentRecommendationsInputSchema,
    outputSchema: LegalDocumentRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
