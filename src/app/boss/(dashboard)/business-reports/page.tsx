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
import { PlusCircle, Trash2, Pencil, BarChart3 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const mockReports = [
    { id: '1', name: 'Relatório de Diagnóstico Inicial - Outubro/2024', url: '#', client: 'Empresa Exemplo S.A.', date: '2024-10-30' },
    { id: '2', name: 'Relatório de Progresso - Fase 1 - Novembro/2024', url: '#', client: 'Empresa Exemplo S.A.', date: '2024-11-28' },
]

export default function BossBusinessReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Gerenciar Relatórios (Giffoni Business)</h1>
        <p className="text-muted-foreground">
          Adicione, edite ou remova os relatórios de consultoria para os clientes.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Adicionar Novo Relatório</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="report-name">Nome do Relatório</Label>
                    <Input id="report-name" placeholder="Ex: Relatório de Análise Financeira..." />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="report-url">URL do Relatório (PDF)</Label>
                    <Input id="report-url" placeholder="https://..." />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="report-client">Cliente Associado</Label>
                    <Input id="report-client" placeholder="Busque pelo nome do cliente..." />
                </div>
            </div>
             <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Adicionar Relatório
            </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Relatórios Publicados</CardTitle>
          <CardDescription>
            Lista de todos os relatórios disponíveis para os clientes do portal Business.
          </CardDescription>
        </CardHeader>
        <CardContent>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome do Relatório</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.name}</TableCell>
                  <TableCell>{report.client}</TableCell>
                  <TableCell>{new Date(report.date).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="icon">
                        <Pencil className="h-4 w-4" />
                    </Button>
                     <Button variant="destructive" size="icon">
                        <Trash2 className="h-4 w-4" />
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
