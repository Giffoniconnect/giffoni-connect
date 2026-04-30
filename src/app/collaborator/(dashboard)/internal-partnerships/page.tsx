'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Handshake } from 'lucide-react';

export default function InternalPartnershipsPage() {

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Parcerias Internas</h1>
        <p className="text-muted-foreground">
          Visualize e gerencie as parcerias internas em que você está envolvido.
        </p>
      </div>
      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Handshake className="h-6 w-6" />
                Suas Parcerias
            </CardTitle>
          <CardDescription>
            Esta funcionalidade será implementada em breve.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center rounded-lg border-2 border-dashed">
            <p className="text-muted-foreground">
                As parcerias internas com outros colaboradores aparecerão aqui.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
