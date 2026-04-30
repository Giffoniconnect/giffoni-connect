'use server';

import {
  legalDocumentRecommendations,
  type LegalDocumentRecommendationsInput,
} from '@/ai/flows/legal-document-recommendations';

export async function getRecommendations(
  input: LegalDocumentRecommendationsInput
) {
  'use server';
  try {
    const result = await legalDocumentRecommendations(input);
    if (!result || !result.recommendations) {
        return { success: false, error: 'Resposta inválida recebida da IA.' };
    }
    return { success: true, data: result.recommendations };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Falha ao obter recomendações.' };
  }
}
