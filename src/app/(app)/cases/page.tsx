'use client';
import { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Badge } from "@/components/ui/badge"
  import { Button } from "@/components/ui/button"
  import { format, parseISO } from 'date-fns';
  import Link from "next/link";
  import { Loader2 } from 'lucide-react';
  import { cases as mockCases } from "@/lib/data";

  // Import Case type, but not the data itself.
  import type { Case } from "@/lib/data";

  
  export default function CasesPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [cases, setCases] = useState<Case[]>([]);

    useEffect(() => {
        // Simulate a network request to fetch cases
        setIsLoading(true);
        setTimeout(() => {
            setCases(mockCases); // In a real scenario, this would be an API call
            setIsLoading(false);
        }, 1000);
    }, []);


    const getStatusVariant = (status: string): "default" | "secondary" | "destructive" => {
        switch (status) {
          case 'Ativo':
            return 'default';
          case 'Pendente':
            return 'secondary';
          case 'Fechado':
          case 'Arquivado':
            return 'destructive';
          default:
            return 'default';
        }
      };

      const getRequestButtonVariant = (status: 'pending' | 'completed' | 'none'): "secondary" | "default" => {
        return status === 'pending' ? 'secondary' : 'default';
      };

    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Seus Casos</h1>
            <p className="text-muted-foreground text-justify">
                Acompanhe o status e o progresso de todos os seus assuntos jurídicos. Esta tabela centraliza as informações essenciais dos seus processos, como número, partes envolvidas e a última data de atualização. Clique em "Ver Detalhes" para aprofundar na movimentação mais recente de cada caso.
            </p>
        </div>

        <div className="border rounded-lg overflow-hidden bg-card">
          {isLoading ? (
             <div className="flex items-center justify-center h-48">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Carregando seus processos...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table className="min-w-[1500px]">
                  <TableHeader>
                  <TableRow>
                      <TableHead>Nome do Cliente</TableHead>
                      <TableHead>Nome da parte adversa</TableHead>
                      <TableHead>Número do processo</TableHead>
                      <TableHead>Tipo de Ação</TableHead>
                      <TableHead>Vara</TableHead>
                      <TableHead>Comarca</TableHead>
                      <TableHead>Advogado Responsável</TableHead>
                      <TableHead>Informações Solicitadas</TableHead>
                      <TableHead>Provas Solicitadas</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-center">Última Atualização</TableHead>
                      <TableHead className="text-center">Ações</TableHead>
                  </TableRow>
                  </TableHeader>
                  <TableBody>
                  {cases.map((caseItem) => (
                      <TableRow key={caseItem.id}>
                      <TableCell className="font-medium whitespace-nowrap">{caseItem.clientName}</TableCell>
                      <TableCell className='whitespace-nowrap'>{caseItem.opposingParty}</TableCell>
                      <TableCell className='whitespace-nowrap font-mono'>{caseItem.caseNumber}</TableCell>
                      <TableCell className='whitespace-nowrap'>{caseItem.actionType}</TableCell>
                      <TableCell className='whitespace-nowrap'>{caseItem.court}</TableCell>
                      <TableCell className='whitespace-nowrap'>{caseItem.district}</TableCell>
                      <TableCell className='whitespace-nowrap'>{caseItem.lawyer}</TableCell>
                       <TableCell>
                          <Link href="/solicitacoes-info" prefetch={false}>
                            <Button variant={getRequestButtonVariant(caseItem.infoRequestStatus)} size="sm">
                                Ver Solicitação de Informação
                            </Button>
                          </Link>
                      </TableCell>
                       <TableCell>
                          <Link href="/solicitacoes-provas" prefetch={false}>
                          <Button variant={getRequestButtonVariant(caseItem.proofRequestStatus)} size="sm">
                                Ver Solicitação de Prova
                            </Button>
                          </Link>
                      </TableCell>
                      <TableCell className="text-center">
                          <Badge variant={getStatusVariant(caseItem.status)}>{caseItem.status}</Badge>
                      </TableCell>
                      <TableCell className='text-center'>{format(parseISO(caseItem.lastUpdate), 'dd/MM/yyyy')}</TableCell>
                      <TableCell className="text-center">
                          <Link href={`/cases/${caseItem.id}/update`} prefetch={false}>
                              <Button variant="outline" size="sm">Ver Detalhes</Button>
                          </Link>
                      </TableCell>
                      </TableRow>
                  ))}
                  </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    )
  }
