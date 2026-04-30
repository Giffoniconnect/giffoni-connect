'use server';

/**
 * @fileOverview Explains legal jargon in simple terms.
 *
 * - explainLegalJargon - A function that returns a simple explanation of a legal term.
 * - ExplainLegalJargonInput - The input type for the explainLegalJargon function.
 * - ExplainLegalJargonOutput - The return type for the explainLegalJargon function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainLegalJargonInputSchema = z.object({
  jargon: z.string().describe('The legal term or phrase to be explained.'),
});
export type ExplainLegalJargonInput = z.infer<
  typeof ExplainLegalJargonInputSchema
>;

const ExplainLegalJargonOutputSchema = z.object({
  explanation: z
    .string()
    .describe('The simplified explanation of the legal term.'),
});
export type ExplainLegalJargonOutput = z.infer<
  typeof ExplainLegalJargonOutputSchema
>;

export async function explainLegalJargon(
  input: ExplainLegalJargonInput
): Promise<ExplainLegalJargonOutput> {
  if (!process.env.GEMINI_API_KEY && !process.env.GOOGLE_API_KEY) {
    return {
      explanation: `Em termos simples, "${input.jargon}" indica uma etapa ou expressão técnica do processo. Na prática, é importante verificar o contexto do caso para entender o prazo, a providência necessária e se há alguma ação imediata a tomar.`,
    };
  }

  return explainLegalJargonFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainLegalJargonPrompt',
  input: {schema: ExplainLegalJargonInputSchema},
  output: {schema: ExplainLegalJargonOutputSchema},
  prompt: `Você é um assistente jurídico especializado em traduzir jargões jurídicos para uma linguagem simples e acessível, seguindo as diretrizes do CNJ (Conselho Nacional de Justiça) sobre linguagem clara.

  Seu objetivo é explicar o seguinte termo ou andamento processual para um leigo, de forma que ele entenda o que está acontecendo em seu processo.

  Termo a ser explicado: {{{jargon}}}

  Forneça uma explicação clara, concisa e direta. Evite termos técnicos na explicação.
  Seja empático e foque no significado prático para o cliente.
  `,
});

const explainLegalJargonFlow = ai.defineFlow(
  {
    name: 'explainLegalJargonFlow',
    inputSchema: ExplainLegalJargonInputSchema,
    outputSchema: ExplainLegalJargonOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
