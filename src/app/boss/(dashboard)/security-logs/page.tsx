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
import type { Client } from '@/lib/data';
  
export default function SecurityLogsPage() {
    const firestore = useFirestore();
    const clientsRef = useMemoFirebase(() => firestore ? collection(firestore, 'clients') : null, [firestore]);
    const { data: clients, isLoading } = useCollection<Client>(clientsRef);

    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Relação Logins e Senhas</h1>
            <p className="text-muted-foreground">Consulte o histórico de acesso e segurança dos clientes.</p>
        </div>
        <div className="border rounded-lg overflow-hidden bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome / Razão Social</TableHead>
                <TableHead>Tipo</TableHead>
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
              ) : clients && clients.length > 0 ? (
                clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.fullName || client.companyName}</TableCell>
                  <TableCell>
                    <Badge variant={client.type === 'Pessoa Física' ? 'secondary' : 'default'}>{client.type}</Badge>
                  </TableCell>
                  <TableCell>{client.email || client['email-pj']}</TableCell>
                  <TableCell className="text-right">
                      <Link href={`/boss/security-logs/${client.id}`} prefetch={false}>
                        <Button variant="outline" size="sm">Ver Detalhes</Button>
                      </Link>
                  </TableCell>
                </TableRow>
              ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">Nenhum cliente encontrado.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }

