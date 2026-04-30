'use client';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Button } from "@/components/ui/button"
  import { documents } from "@/lib/data"
  import { Download } from "lucide-react"
  import { format, parseISO } from 'date-fns';
  import Link from "next/link";
  
  export default function DocumentsPage() {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Documentos</h1>
            <p className="text-muted-foreground">Acesse todos os documentos relacionados aos seus casos.</p>
        </div>
        <div className="border rounded-lg overflow-hidden bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome do Documento</TableHead>
                <TableHead>Caso Associado</TableHead>
                <TableHead>Data de Upload</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.name}</TableCell>
                  <TableCell>{doc.caseName}</TableCell>
                  <TableCell>{format(parseISO(doc.dateUploaded), 'dd/MM/yyyy')}</TableCell>
                  <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
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
      </div>
    )
  }
