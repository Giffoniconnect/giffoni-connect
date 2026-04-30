'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

const faqItems = [
  {
    question: 'Como funciona o repasse dos meus honorários?',
    answer:
      'O repasse é realizado conforme as condições estabelecidas no contrato de parceria de cada caso. Na seção "Controle Financeiro", você pode clicar em "Ver Contrato" para visualizar o cronograma de pagamentos, os valores de cada parcela e o status do repasse (se já foi efetuado ou não).',
  },
  {
    question: 'Como posso indicar um novo cliente ou caso?',
    answer:
      'Utilize a seção "Propor nova parceria" no menu lateral. Lá você encontrará o formulário para enviar os detalhes do novo caso ou cliente para nossa análise. Nossa equipe entrará em contato assim que avaliar a proposta.',
  },
  {
    question: 'Onde posso ver os detalhes dos clientes que indiquei?',
    answer:
      'Na seção "Casos da Parceria", você encontrará uma lista de todos os casos vinculados à sua parceria. Ao clicar para ver os detalhes (funcionalidade em desenvolvimento), você terá acesso às informações relevantes do cliente e do processo.',
  },
  {
    question: 'Como faço para atualizar meus dados cadastrais ou bancários?',
    answer:
      'No momento, a atualização dos dados cadastrais e bancários deve ser solicitada diretamente ao nosso setor administrativo. Entre em contato conosco e faremos a alteração para você, garantindo a segurança dos seus dados.',
  },
  {
    question: 'O que significa cada status de pagamento no Controle Financeiro?',
    answer:
      'Os status são: "Contratado" (o serviço foi acordado), "Pago" (o cliente efetuou o pagamento), "Pendente" (aguardando pagamento do cliente) e "Cancelado". O status de repasse para você é indicado com um ícone de "check" verde (pago) ou "X" vermelho (pendente).',
  },
];

export default function PartnerFaqPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Perguntas Frequentes
        </h1>
        <p className="text-muted-foreground">
          Tire suas dúvidas sobre o funcionamento do Portal de Parceiros.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-6 w-6" />
            Índice de Dúvidas Comuns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
