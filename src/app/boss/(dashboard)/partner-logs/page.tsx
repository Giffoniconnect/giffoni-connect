'use client';

import Link from 'next/link';
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
import { Loader2 } from "lucide-react"
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';

export type Partner = {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
}
  
export default function PartnerLogsPage() {
    const firestore = useFirestore();
    const partnersRef = useMemoFirebase(() => firestore ? collection(firestore, 'partners') : null, [firestore]);
    const { data: partners, isLoading } = useCollection<Partner>(partnersRef);

    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Logs de Acesso dos Parceiros</h1>
            <p className="text-muted-foreground">Consulte o histórico de acesso e segurança dos parceiros.</p>
        </div>
        <div className="border rounded-lg overflow-hidden bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome do Parceiro</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                  </TableCell>
                </TableRow>
              ) : partners && partners.length > 0 ? (
                partners.map((partner) => (
                <TableRow key={partner.id}>
                  <TableCell className="font-medium">{partner.name}</TableCell>
                  <TableCell>{partner.company}</TableCell>
                  <TableCell>{partner.email}</TableCell>
                  <TableCell className="text-right">
                      <Link href={`/boss/partner-logs/${partner.id}`}>
                        <Button variant="outline" size="sm">Ver Detalhes</Button>
                      </Link>
                  </TableCell>
                </TableRow>
              ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">Nenhum parceiro encontrado.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }

    
