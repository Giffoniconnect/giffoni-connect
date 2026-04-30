'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';

const mockReports = [
    { id: '1', name: 'Relatório de Diagnóstico Inicial - Outubro/2024', date: '2024-10-30', url: '#' },
    { id: '2', name: 'Relatório de Progresso - Fase 1 - Novembro/2024', date: '2024-11-28', url: '#' },
]

export default function RelatoriosPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Relatórios da Consultoria</h1>
        <p className="text-muted-foreground">
          Acesse todos os relatórios e análises produzidos durante a consultoria.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Relatórios</CardTitle>
          <CardDescription>
            Clique no botão para baixar a versão em PDF de cada relatório.
          </CardDescription>
        </CardHeader>
        <CardContent>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome do Relatório</TableHead>
                <TableHead>Data de Publicação</TableHead>
                <TableHead className="text-right">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.name}</TableCell>
                  <TableCell>{format(parseISO(report.date), 'dd/MM/yyyy')}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" asChild>
                        <Link href={report.url} download>
                            <Download className="mr-2 h-4 w-4" />
                            Baixar
                        </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        </CardContent>
      </Card>
    </div>
  );
}
