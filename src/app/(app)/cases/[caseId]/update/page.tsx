
'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { cases, mockAndamentos } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpenCheck, CheckCircle2, Clock, History, Calendar, FileText } from 'lucide-react';
import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
    DialogFooter,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

type ProcessStep = {
    name: string;
    description?: string;
    status: 'completed' | 'pending';
    subItems?: Omit<ProcessStep, 'subItems'>[];
};

const processPhases: ProcessStep[] = [
    {
      name: 'Fase Postulatória',
      status: 'completed',
      subItems: [
        { name: 'Petição Inicial', description: 'Apresentação formal da causa à Justiça.', status: 'completed' },
        { name: 'Audiência de Conciliação', description: 'Tentativa de acordo entre as partes.', status: 'completed' },
        { name: 'Contestação', description: 'Resposta da parte contrária à petição inicial.', status: 'completed' },
        { name: 'Impugnação à Contestação', description: 'Sua resposta aos argumentos da parte contrária.', status: 'completed' },
      ],
    },
    {
      name: 'Fase Saneadora',
      status: 'pending',
      subItems: [
        { name: 'Despacho Saneador', description: 'O juiz organiza o processo e define quais provas serão produzidas.', status: 'pending' },
        { name: 'Solicitar ajustes ou esclarecimentos', description: 'Fase para pedir correções ou detalhamentos ao juiz.', status: 'pending' },
      ],
    },
    { name: 'Fase Instrutória', description: 'Produção de provas (documentos, testemunhas, perícias).', status: 'pending' },
    { name: 'Fase Decisória', description: 'Juiz analisa as provas e argumentos para dar a sentença.', status: 'pending' },
    { name: 'Fase Recursal', description: 'Possibilidade de recorrer da decisão.', status: 'pending' },
    { name: 'Execução', description: 'Cumprimento da decisão final.', status: 'pending' },
  ];
  

export default function CaseUpdatePage() {
  const router = useRouter();
  const params = useParams();
  const caseId = params.caseId as string;
  const caseItem = cases.find((c) => c.id === caseId);

  const andamentos = mockAndamentos[caseId] || [];
  const sortedAndamentos = andamentos.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const lastThreeAndamentos = sortedAndamentos.slice(0, 3);


  if (!caseItem) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 text-center h-full">
        <h1 className="text-2xl font-bold">Caso não encontrado</h1>
        <p className="text-muted-foreground">O caso que você está procurando não existe.</p>
        <Button onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
      </div>
    );
  }

  const renderPhase = (phase: ProcessStep) => (
    <div key={phase.name} className="flex items-start gap-4">
      {phase.status === 'completed' ? (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
        </div>
      ) : (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900">
          <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        </div>
      )}
      <div>
        <h4 className="font-semibold">{phase.name}</h4>
        {phase.description && <p className="text-sm text-muted-foreground">{phase.description}</p>}
        {phase.subItems && (
          <div className="mt-4 space-y-4 pl-6 border-l">
            {phase.subItems.map(renderSubItem)}
          </div>
        )}
      </div>
    </div>
  );

  const renderSubItem = (subItem: Omit<ProcessStep, 'subItems'>) => (
    <div key={subItem.name} className="flex items-start gap-3">
       {subItem.status === 'completed' ? (
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100/80 dark:bg-green-900/80 mt-0.5">
            <CheckCircle2 className="h-4 w-4 text-green-500 dark:text-green-300" />
        </div>
        ) : (
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100/80 dark:bg-amber-900/80 mt-0.5">
            <Clock className="h-4 w-4 text-amber-500 dark:text-amber-300" />
        </div>
        )}
      <div>
        <h5 className="font-medium">{subItem.name}</h5>
        <p className="text-xs text-muted-foreground">{subItem.description}</p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.push('/cases')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Atualização do Processo</h1>
          <p className="text-primary font-medium">Detalhes sobre as últimas movimentações do caso: {caseItem.caseNumber}</p>
        </div>
        <div className="w-10"></div> {/* Spacer to balance the layout */}
      </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
              <CardHeader>
                  <CardTitle>Últimas Movimentações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                  {lastThreeAndamentos.length > 0 ? (
                      <div className="space-y-4">
                          {lastThreeAndamentos.map((item, index) => (
                              <div key={item.id} className="flex items-start gap-3">
                                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted mt-1">
                                      <Calendar className="h-4 w-4 text-muted-foreground" />
                                  </div>
                                  <div>
                                      <p className="font-semibold">{format(parseISO(item.date), "dd/MM/yyyy")} - <span className="font-normal text-muted-foreground">{item.type}</span></p>
                                      <p className="text-sm text-muted-foreground">{item.description}</p>
                                  </div>
                              </div>
                          ))}
                      </div>
                  ) : (
                      <p className="text-muted-foreground text-sm">Nenhuma movimentação recente.</p>
                  )}

                  <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                            <History className="mr-2 h-4 w-4" />
                            Ver Histórico Completo
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Histórico Completo do Processo</DialogTitle>
                            <DialogDescription>{caseItem.caseNumber}</DialogDescription>
                        </DialogHeader>
                        <ScrollArea className="h-96">
                            <div className="relative pl-6 p-4">
                                <div className="absolute left-[34px] top-0 bottom-0 w-0.5 bg-border -translate-x-1/2"></div>
                                {sortedAndamentos.length > 0 ? (
                                    <div className="space-y-8">
                                        {sortedAndamentos.map((item) => (
                                            <div key={item.id} className="relative flex gap-6">
                                                <div className="absolute left-0 top-1.5 h-4 w-4 rounded-full bg-primary -translate-x-1/2"></div>
                                                <div className="flex-1">
                                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                                                        <p className="text-sm font-semibold flex items-center gap-2">
                                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                                            {format(parseISO(item.date), 'dd/MM/yyyy')}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded-md mt-1 sm:mt-0">
                                                            {item.type}
                                                        </p>
                                                    </div>
                                                    <p className="text-muted-foreground flex items-start gap-2">
                                                        <FileText className="h-4 w-4 mt-1 flex-shrink-0" />
                                                        <span>{item.description}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground">Nenhum andamento encontrado.</p>
                                )}
                            </div>
                        </ScrollArea>
                        <DialogFooter>
                            <DialogClose asChild><Button type="button">Fechar</Button></DialogClose>
                        </DialogFooter>
                    </DialogContent>
                  </Dialog>
              </CardContent>
          </Card>
          
          <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                      <BookOpenCheck />
                      O que isso significa?
                  </CardTitle>
                    <CardDescription className='text-justify'>
                      A Giffoni Advogados Associados, buscando efetivar o seu direito de acesso à Justiça, elaborou uma explicação simplificada.
                    </CardDescription>
              </CardHeader>
              <CardContent>
                  <p className="text-justify">
                      Neste momento, o processo foi enviado ao juiz para que ele possa tomar uma decisão ou dar o próximo passo. Isso pode incluir a análise de um pedido, a definição de provas a serem produzidas ou a preparação da sentença.
                  </p>
              </CardContent>
          </Card>
        </div>

        <Card>
            <CardHeader>
            <CardTitle>Quais são os próximos passos?</CardTitle>
            <CardDescription>Uma visão geral das fases de um processo de conhecimento cível.</CardDescription>
            </CardHeader>
            <CardContent>
            <div className="space-y-6">
                {processPhases.map(renderPhase)}
            </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
