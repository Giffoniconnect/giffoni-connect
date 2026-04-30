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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

const requiredDocs = [
    { id: '1', name: 'Contrato Social', status: 'Pendente' },
    { id: '2', name: 'Cartão CNPJ', status: 'Pendente' },
]

export default function DocumentosPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Documentos da Consultoria</h1>
        <p className="text-muted-foreground">
          Envie os documentos necessários para a consultoria.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Documentos Obrigatórios</CardTitle>
          <CardDescription>
            Por favor, forneça o link para os seguintes documentos.
          </CardDescription>
        </CardHeader>
        <CardContent>
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Documento</TableHead>
                <TableHead>Link (URL)</TableHead>
                <TableHead>Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requiredDocs.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.name}</TableCell>
                  <TableCell>
                    <Input placeholder="Cole a URL do documento aqui..." />
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Salvar Link
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
