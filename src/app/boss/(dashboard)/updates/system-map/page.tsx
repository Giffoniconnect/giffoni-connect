
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { format, parseISO } from 'date-fns';
import {
  mockSystemTree,
  type SystemAction,
  type SystemFunction,
  type SystemScreen,
  type SystemSection,
  type SystemSubSection,
} from '@/lib/data';
import {
  AppWindow,
  Box,
  Braces,
  Calendar,
  Layers3,
  Play,
  FileCode,
  Component,
  ShieldCheck,
  Bug,
  TestTube2,
  ArrowLeft
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function SystemMapPage() {
  const router = useRouter();

  const getStatusVariant = (
    status:
      | 'estavel'
      | 'em_desenvolvimento'
      | 'implementada'
      | 'nao_implementada'
      | 'testada'
      | 'bugada'
  ): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (status) {
      case 'estavel':
      case 'implementada':
      case 'testada':
        return 'default';
      case 'em_desenvolvimento':
        return 'secondary';
      case 'bugada':
        return 'destructive';
      case 'nao_implementada':
        return 'outline';
      default:
        return 'default';
    }
  };

  const getActionStatusVariant = (
    status: 'ativa' | 'ativa_nao_testada' | 'quebrada'
  ): 'default' | 'secondary' | 'destructive' => {
    switch (status) {
      case 'ativa':
        return 'default';
      case 'ativa_nao_testada':
        return 'secondary';
      case 'quebrada':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const renderActionsTable = (actions: SystemAction[]) => (
    <div className="my-2 rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ação</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>ID Frontend</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {actions.map((action) => (
            <TableRow key={action.id_acao}>
              <TableCell className="font-medium flex items-center gap-2">
                <Play className="h-4 w-4 text-muted-foreground" />
                {action.evento_firebase}
              </TableCell>
              <TableCell>
                <Badge variant="outline">{action.tipo}</Badge>
              </TableCell>
              <TableCell className="font-mono text-xs">
                {action.identificador_frontend}
              </TableCell>
              <TableCell>
                <Badge variant={getActionStatusVariant(action.status_acao)}>
                  {action.status_acao.replace(/_/g, ' ')}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  const renderFunctions = (functions: SystemFunction[]) => (
    <div className="space-y-4 pl-4">
      {functions.map((func) => (
        <Card key={func.id_funcao} className="bg-muted/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Braces className="h-4 w-4" />
              Função: {func.descricao_funcional}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">Status</p>
                  <Badge variant={getStatusVariant(func.status_funcao)}>
                    {func.status_funcao.replace(/_/g, ' ')}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">Implementado em</p>
                  <p>
                    {func.implementado_em
                      ? format(parseISO(func.implementado_em), 'dd/MM/yyyy')
                      : 'N/A'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TestTube2 className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">Testado em</p>
                  <p>
                    {func.testado_em
                      ? format(parseISO(func.testado_em), 'dd/MM/yyyy')
                      : 'N/A'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Bug className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">Bugs Conhecidos</p>
                  <p>{func.bugs.length}</p>
                </div>
              </div>
            </div>
            {renderActionsTable(func.acoes)}
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderSubSections = (subsections: SystemSubSection[]) => (
    <Accordion type="multiple" className="w-full space-y-2">
      {subsections.map((sub) => (
        <AccordionItem
          value={sub.id_subsecao}
          key={sub.id_subsecao}
          className="border-b-0 rounded-lg bg-card border shadow-sm"
        >
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center gap-3">
              <Layers3 className="h-5 w-5 text-muted-foreground" />
              <div className="flex flex-col items-start">
                <span className="font-semibold text-base">
                  {sub.nome_subsecao}
                </span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4">
            {renderFunctions(sub.funcoes)}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );

  const renderSections = (sections: SystemSection[]) => (
    <Accordion type="multiple" className="w-full space-y-3">
      {sections.map((section) => (
        <AccordionItem
          value={section.id_secao}
          key={section.id_secao}
          className="border-b-0"
        >
          <AccordionTrigger className="bg-muted/50 hover:bg-muted/80 px-4 py-3 rounded-lg border hover:no-underline">
            <div className="flex items-center gap-3">
              <Component className="h-5 w-5 text-primary" />
              <div className="flex flex-col items-start">
                <span className="font-semibold text-lg">
                  {section.nome_secao}
                </span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-3 pl-4">
            {renderSubSections(section.subsecoes)}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.push('/boss/updates')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Mapa de Updates do Painel Boss
          </h1>
          <p className="text-muted-foreground">
            Acompanhe a evolução do sistema, desde a cronologia de implementações
            até a estrutura viva de funcionalidades.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mapa Vivo do Sistema</CardTitle>
          <CardDescription>
            Clique em cada tela para expandir e navegar por suas seções e
            funcionalidades, refletindo a estrutura da sidebar.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="boss_dashboard"
          >
            {mockSystemTree.map((screen) => (
              <AccordionItem value={screen.id_tela} key={screen.id_tela}>
                <AccordionTrigger>
                  <div className="flex items-center gap-3">
                    <AppWindow className="h-6 w-6 text-primary" />
                    <div className="flex flex-col items-start">
                      <span className="font-semibold text-xl">
                        {screen.nome_tela}
                      </span>
                      <span className="text-sm text-muted-foreground font-mono">
                        {screen.rota_frontend}
                      </span>
                    </div>
                  </div>
                  <Badge variant={getStatusVariant(screen.status_geral)}>
                    {screen.status_geral.replace('_', ' ')}
                  </Badge>
                </AccordionTrigger>
                <AccordionContent className="p-4">
                  {screen.secoes.length > 0 ? (
                    renderSections(screen.secoes)
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Nenhuma seção mapeada para esta tela ainda.
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
