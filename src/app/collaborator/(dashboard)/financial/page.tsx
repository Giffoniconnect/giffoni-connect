'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { DollarSign } from 'lucide-react';

export default function CollaboratorFinancialPage() {

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Financeiro</h1>
        <p className="text-muted-foreground">
          Consulte informações financeiras relacionadas aos seus casos.
        </p>
      </div>
      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-6 w-6" />
                Seus Registros Financeiros
            </CardTitle>
          <CardDescription>
            Esta funcionalidade será implementada em breve.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center rounded-lg border-2 border-dashed">
            <p className="text-muted-foreground">
                Os registros financeiros vinculados aos seus casos aparecerão aqui.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
