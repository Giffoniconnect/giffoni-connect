export const OFFICE_WHATSAPP_NUMBER = '5531988639056';

export function normalizeWhatsAppNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '');

  if (!digits) return '';
  if (digits.startsWith('55')) return digits;
  if (digits.length === 10 || digits.length === 11) return `55${digits}`;

  return digits;
}

export function buildWhatsAppLink(phone: string, message?: string): string {
  const normalizedPhone = normalizeWhatsAppNumber(phone);
  const encodedMessage = message ? `?text=${encodeURIComponent(message)}` : '';

  return `https://wa.me/${normalizedPhone}${encodedMessage}`;
}

export function buildOfficeWhatsAppLink(message?: string): string {
  return buildWhatsAppLink(OFFICE_WHATSAPP_NUMBER, message);
}

export type ManualDocumentDeliveryMessageParams = {
  clientName?: string;
  documentLabel: string;
  documentUrl: string;
  instructions?: string;
};

export function buildManualDocumentDeliveryMessage({
  clientName,
  documentLabel,
  documentUrl,
  instructions,
}: ManualDocumentDeliveryMessageParams): string {
  const greeting = clientName ? `Olá, ${clientName}.` : 'Olá.';
  const actionInstructions = instructions || 'Por favor, confira o documento e nos retorne com a confirmação.';

  return [
    greeting,
    `Segue o link para acessar ${documentLabel}:`,
    documentUrl,
    actionInstructions,
  ].join('\n\n');
}

export function buildManualDocumentDeliveryWhatsAppLink({
  phone,
  clientName,
  documentLabel,
  documentUrl,
  instructions,
}: ManualDocumentDeliveryMessageParams & { phone: string }): string {
  return buildWhatsAppLink(
    phone,
    buildManualDocumentDeliveryMessage({ clientName, documentLabel, documentUrl, instructions })
  );
}
