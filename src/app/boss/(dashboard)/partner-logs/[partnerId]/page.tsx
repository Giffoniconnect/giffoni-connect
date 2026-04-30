'use client';

import { useParams, useRouter } from 'next/navigation';
import { useDoc, useCollection, useMemoFirebase } from '@/firebase';
import { doc, collection, orderBy, query } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import type { Partner } from '@/app/boss/(dashboard)/partner-logs/page';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';

type LoginHistoryEntry = {
    id: string;
    partnerId: string;
    loginTimestamp: { seconds: number; nanoseconds: number; };
    ipAddress: string;
    userAgent: string;
};

export default function PartnerLogDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const partnerId = params.partnerId as string;
  const firestore = useFirestore();

  const partnerRef = useMemoFirebase(() => firestore ? doc(firestore, 'partners', partnerId) : null, [firestore, partnerId]);
  const { data: partner, isLoading: isPartnerLoading } = useDoc<Partner>(partnerRef);

  const loginHistoryRef = useMemoFirebase(() => 
    firestore ? query(collection(firestore, 'partners', partnerId, 'login_history'), orderBy('loginTimestamp', 'desc')) : null,
    [firestore, partnerId]
  );
  const { data: loginHistory, isLoading: isHistoryLoading } = useCollection<LoginHistoryEntry>(loginHistoryRef);

  if (isPartnerLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!partner) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 text-center h-full">
        <h1 className="text-2xl font-bold">Parceiro não encontrado</h1>
        <p className="text-muted-foreground">O parceiro que você está procurando não existe.</p>
        <Button onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Logs de Segurança do Parceiro</h1>
          <p className="text-muted-foreground">Histórico de atividade para {partner.name}.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Login</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data e Hora do Login</TableHead>
                  <TableHead>Endereço IP</TableHead>
                  <TableHead>Dispositivo / Navegador</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isHistoryLoading ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">
                      <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                    </TableCell>
                  </TableRow>
                ) : loginHistory && loginHistory.length > 0 ? (
                  loginHistory.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>
                        {entry.loginTimestamp ? format(new Date(entry.loginTimestamp.seconds * 1000), "dd/MM/yyyy HH:mm:ss") : 'N/A'}
                      </TableCell>
                      <TableCell>{entry.ipAddress}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{entry.userAgent}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">Nenhum registro de login encontrado.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

