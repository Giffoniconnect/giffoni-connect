'use client';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { cases } from "@/lib/data" // Using mock data for now
  import { Button } from "@/components/ui/button"
  
  export default function PartnerCasesPage() {
    const partnershipCases = cases.slice(0, 2); // Mocking some cases for the partner

    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Casos da Parceria</h1>
            <p className="text-muted-foreground">Acompanhe os casos indicados ou gerenciados em parceria.</p>
        </div>
        <div className="border rounded-lg overflow-hidden bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome completo do cliente em Parceria</TableHead>
                <TableHead>Nome completo da Parte Adversa</TableHead>
                <TableHead>Número do processo</TableHead>
                <TableHead>Vara</TableHead>
                <TableHead>Comarca</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {partnershipCases.map((caseItem) => (
                <TableRow key={caseItem.id}>
                  <TableCell className="font-medium">{caseItem.clientName}</TableCell>
                  <TableCell>{caseItem.opposingParty}</TableCell>
                  <TableCell>{caseItem.caseNumber}</TableCell>
                  <TableCell>{caseItem.court}</TableCell>
                  <TableCell>{caseItem.district}</TableCell>
                  <TableCell className="text-center">
                    <Button variant="outline" size="sm">Ver dados do cliente em Parceria</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }
