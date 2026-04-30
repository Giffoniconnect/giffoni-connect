'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useFirestore } from '@/firebase';
import { collection, getDocs, writeBatch, doc } from 'firebase/firestore';
import { Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

type LogEntry = {
  type: 'info' | 'success' | 'error';
  message: string;
};

const collectionsToMigrate = ['clients', 'partners', 'collaborators'];

export default function MigrateDataPage() {
  const [isMigrating, setIsMigrating] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();

  const handleMigration = async () => {
    setIsMigrating(true);
    setLogs([]);

    const addLog = (entry: LogEntry) => {
      setLogs((prev) => [...prev, entry]);
    };

    try {
      addLog({ type: 'info', message: 'Iniciando processo de migração...' });

      const batch = writeBatch(firestore);
      let documentsUpdated = 0;

      for (const collectionName of collectionsToMigrate) {
        addLog({ type: 'info', message: `Verificando coleção: ${collectionName}` });
        const collectionRef = collection(firestore, collectionName);
        const snapshot = await getDocs(collectionRef);

        if (snapshot.empty) {
          addLog({ type: 'info', message: `Coleção ${collectionName} está vazia. Nenhuma ação necessária.` });
          continue;
        }

        let processedInCollection = 0;
        snapshot.forEach((document) => {
          const data = document.data();
          let needsUpdate = false;
          const updateData: any = {};
          
          const nameField = data.fullName || data.companyName || data.name;
          if (nameField && !data._searchableName) {
            updateData._searchableName = nameField.toLowerCase();
            needsUpdate = true;
          }

          if (collectionName === 'clients' && data.type === 'Pessoa Jurídica' && data.adminName && !data._searchableAdminName) {
            updateData._searchableAdminName = data.adminName.toLowerCase();
            needsUpdate = true;
          }

          if (needsUpdate) {
            const docRef = doc(firestore, collectionName, document.id);
            batch.update(docRef, updateData);
            documentsUpdated++;
            processedInCollection++;
          }
        });
        addLog({ type: 'success', message: `${processedInCollection} documentos na coleção ${collectionName} marcados para atualização.` });
      }

      if (documentsUpdated > 0) {
        addLog({ type: 'info', message: 'Aplicando atualizações no banco de dados...' });
        await batch.commit();
        addLog({ type: 'success', message: `Migração concluída! ${documentsUpdated} documentos foram atualizados com sucesso.` });
        toast({
          title: 'Migração Concluída',
          description: `${documentsUpdated} documentos foram atualizados com campos de busca.`,
        });
      } else {
        addLog({ type: 'success', message: 'Todos os documentos já estão atualizados. Nenhuma migração foi necessária.' });
         toast({
          title: 'Tudo Certo!',
          description: 'Todos os documentos já possuem os campos de busca necessários.',
        });
      }

    } catch (error: any) {
      console.error('Migration failed:', error);
      addLog({ type: 'error', message: `Falha na migração: ${error.message}` });
      toast({
        variant: 'destructive',
        title: 'Erro na Migração',
        description: 'Não foi possível atualizar os documentos existentes.',
      });
    } finally {
      setIsMigrating(false);
    }
  };

  return (
    <div className="relative flex flex-col gap-6">
       <Button onClick={() => router.back()} className="absolute top-0 right-0">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
       </Button>

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Migração de Dados para Busca
        </h1>
        <p className="text-muted-foreground">
          Ferramenta para atualizar documentos existentes com campos de busca normalizados.
        </p>
      </div>

      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Atenção: Ação Crítica</AlertTitle>
        <AlertDescription>
          Esta operação irá modificar os documentos existentes no banco de dados.
          Execute esta ação apenas uma vez ou quando novos dados precisarem ser
          indexados para a busca. Fazer backup antes é recomendado.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Atualizar Documentos Existentes</CardTitle>
          <CardDescription>
            Clique no botão abaixo para percorrer as coleções `clients`,
            `partners` e `collaborators` e adicionar os campos `_searchableName`
            (e `_searchableAdminName` para PJ) em todos os documentos que
            ainda não os possuem.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleMigration} disabled={isMigrating}>
            {isMigrating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Migrando...
              </>
            ) : (
              'Iniciar Migração de Dados'
            )}
          </Button>
        </CardContent>
      </Card>
      
      {logs.length > 0 && (
         <Card>
            <CardHeader>
                <CardTitle>Logs da Migração</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2 font-mono text-sm p-4 bg-muted rounded-md max-h-60 overflow-y-auto">
                    {logs.map((log, index) => (
                        <p key={index} className={
                            log.type === 'error' ? 'text-red-500' :
                            log.type === 'success' ? 'text-green-500' : ''
                        }>
                           {log.type === 'info' && 'ℹ️'}
                           {log.type === 'success' && '✅'}
                           {log.type === 'error' && '❌'} {log.message}
                        </p>
                    ))}
                </div>
            </CardContent>
         </Card>
      )}

    </div>
  );
}
