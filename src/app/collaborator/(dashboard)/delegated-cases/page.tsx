'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Briefcase } from 'lucide-react';

export default function DelegatedCasesPage() {

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Casos Delegados</h1>
        <p className="text-muted-foreground">
          Gerencie os casos que foram delegados a você.
        </p>
      </div>
      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-6 w-6" />
                Seus Casos
            </CardTitle>
          <CardDescription>
            Esta funcionalidade será implementada em breve.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center rounded-lg border-2 border-dashed">
            <p className="text-muted-foreground">
                A lista de casos delegados a você aparecerá aqui.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
