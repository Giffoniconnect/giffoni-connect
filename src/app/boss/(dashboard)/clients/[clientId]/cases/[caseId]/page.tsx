'use client';

import { useParams, useRouter } from 'next/navigation';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, FileText, CheckCircle, Loader2, CalendarPlus, FileQuestion, Gavel, Microscope, FileUp, FileSignature, Clock, ScanLine, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

// Assuming Case and Client types are available
import type { Case, Client } from '@/lib/data';

const funnelSteps = [
    { id: 'coleta-informacoes', title: 'Coleta de Informações Estratégicas', description: 'Dados iniciais sobre o assunto e ramo do direito.' },
    { id: 'coleta-provas', title: 'Coleta de Provas', description: 'Documentos jurídicos e outras provas necessárias.' },
    { id: 'tipos-de-estruturacao', title: 'Tipos de Estruturação', description: 'Definição do tipo de peça processual a ser criada.' },
    { id: 'estruturacao', title: 'Estruturação da Peça', description: 'Elaboração dos fatos, fundamentos e pedidos.' },
    { id: 'delegacao', title: 'Delegação de Tarefas', description: 'Designação de responsáveis e prazos.' },
    { id: 'analise-revisao', title: 'Análise de Revisão', description: 'Revisão da peça processual antes do protocolo.' },
    { id: 'protocolo', title: 'Protocolo do Processo', description: 'Registro final dos dados do processo protocolado.' },
];

const ActionButton = ({ href, icon: Icon, label, disabled = false }: { href: string; icon: React.ElementType; label: string; disabled?: boolean; }) => (
    <Link href={href} passHref>
      <Button variant="outline" className="w-full justify-start text-left h-auto py-2" disabled={disabled}>
        <div className="flex items-center gap-3">
          <Icon className="h-5 w-5 text-primary" />
          <span className="font-medium whitespace-normal">{label}</span>
        </div>
      </Button>
    </Link>
);


export default function CaseDashboardPage() {
  const router = useRouter();
  const params = useParams();
  const clientId = params.clientId as string;
  const caseId = params.caseId as string;
  const firestore = useFirestore();

  const caseRef = useMemoFirebase(() => (firestore && clientId && caseId ? doc(firestore, 'clients', clientId, 'cases', caseId) : null), [firestore, clientId, caseId]);
  const { data: caseData, isLoading: isLoadingCase } = useDoc<Case>(caseRef);

  if (isLoadingCase) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 text-center h-full">
        <h1 className="text-2xl font-bold">Processo não encontrado</h1>
        <Button onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.push(`/boss/clients/${clientId}`)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Painel do Processo
          </h1>
          <p className="text-muted-foreground">
            Processo nº: <span className="font-semibold text-primary">{caseData.caseNumber || 'Não definido'}</span>
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Funil de Atendimento (CEDRP)</CardTitle>
            <CardDescription>
                Gerencie as etapas de criação e estruturação deste processo. Cada etapa deve ser completada para avançar.
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {funnelSteps.map((step) => (
                <div key={step.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                        <CheckCircle className="h-6 w-6 text-green-500" /> {/* TODO: Add logic for status icon */}
                        <div>
                            <h3 className="font-semibold">{step.title}</h3>
                            <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                    </div>
                    <Link href={`/boss/funil-cedrp/${step.id}?clientId=${clientId}&caseId=${caseId}`}>
                        <Button variant="outline">
                            <Edit className="mr-2 h-4 w-4" />
                            Editar Etapa
                        </Button>
                    </Link>
                </div>
            ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
            <CardTitle>Ações do Processo</CardTitle>
            <CardDescription>Painel de comando com as principais ações relacionadas a este processo.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-3">Comunicação e Gestão</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <ActionButton href="/boss/marcar-reuniao" icon={CalendarPlus} label="Marcar Reunião" />
                    <ActionButton href="/boss/solicitacoes-info" icon={FileQuestion} label="Solicitação de Informações" />
                    <ActionButton href="/boss/solicitacoes-provas" icon={FileQuestion} label="Solicitação de Provas" />
                </div>
            </div>

            <Separator />

            <div>
                <h3 className="text-lg font-semibold mb-3">Atos Processuais</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <ActionButton href="/boss/marcar-audiencia" icon={Gavel} label="Marcar Audiência" />
                    <ActionButton href="/boss/marcar-pericia" icon={Microscope} label="Marcar Perícia" />
                    <ActionButton href="/boss/atualizacao-processual" icon={FileUp} label="Atualização de Andamento Processual" />
                </div>
            </div>
            
            <Separator />
            
            <div>
                <h3 className="text-lg font-semibold mb-3">Operacional Jurídico</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <ActionButton href={`/boss/clients/${clientId}/new-process`} icon={FileSignature} label="Cadastro de Processos" />
                    <ActionButton href="#" icon={Clock} label="Delegação de Prazos" disabled />
                    <ActionButton href="#" icon={ScanLine} label="Solicitar Digitalização" disabled />
                </div>
            </div>

            <Separator />

            <div>
                <h3 className="text-lg font-semibold mb-3">Financeiro</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <ActionButton href="/boss/financial" icon={DollarSign} label="Atualizar Financeiro" />
                </div>
            </div>

        </CardContent>
      </Card>
    </div>
  );
}
