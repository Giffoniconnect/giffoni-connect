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
  import { invoices } from "@/lib/data"
  import { Download } from "lucide-react"
  import { format, parseISO } from 'date-fns';
  
  export default function InvoicesPage() {
    const getStatusVariant = (status: string): "default" | "secondary" | "destructive" => {
        switch (status) {
          case 'Pago':
            return 'default';
          case 'Não Pago':
            return 'secondary';
          case 'Vencido':
            return 'destructive';
          default:
            return 'default';
        }
      };

    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Faturas</h1>
            <p className="text-muted-foreground">Revise e baixe suas faturas.</p>
        </div>
        <div className="border rounded-lg overflow-hidden bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fatura nº</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Data de Vencimento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                  <TableCell>
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(invoice.amount)}
                  </TableCell>
                  <TableCell>{format(parseISO(invoice.dueDate), 'dd/MM/yyyy')}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(invoice.status)}>{invoice.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Baixar
                      </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }
