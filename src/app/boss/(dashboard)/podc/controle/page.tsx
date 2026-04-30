'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, AppWindow, Link as LinkIcon, Pencil, Save, X, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, doc, writeBatch, getDocs, updateDoc } from 'firebase/firestore';
import { hubInitialData } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

type Screen = {
  id: string;
  title: string;
  description: string;
  linkedRoute: string;
};

export default function ControleHubPage() {
  const [screens, setScreens] = useState<Screen[]>([]);
  const [editingScreenId, setEditingScreenId] = useState<string | null>(null);
  const [tempTitle, setTempTitle] = useState('');
  const [tempDescription, setTempDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  const firestore = useFirestore();
  const { toast } = useToast();

  const hubsRef = useMemoFirebase(() => firestore ? collection(firestore, 'quality_control_hubs') : null, [firestore]);
  const { data: hubData, isLoading } = useCollection<Screen>(hubsRef);

  useEffect(() => {
    const seedAndSetData = async () => {
      if (isLoading || !firestore) return;

      if (!hubData || hubData.length === 0) {
        // Data is not loaded yet, or collection is empty. Let's seed.
        console.log("No hubs found, seeding initial data...");
        try {
            const batch = writeBatch(firestore);
            hubInitialData.forEach((hub) => {
                const docRef = doc(hubsRef, hub.id); // Use static ID from mock data
                batch.set(docRef, { 
                    title: hub.title,
                    description: hub.description,
                    linkedRoute: hub.linkedRoute,
                });
            });
            await batch.commit();
            setScreens(hubInitialData); // Set local state after seeding
            toast({ title: "Hubs de Controle Inicializados", description: "Os portais de teste foram criados no banco de dados." });
        } catch (error) {
            console.error("Erro ao inicializar hubs de controle:", error);
            toast({ variant: "destructive", title: "Erro", description: "Não foi possível inicializar os hubs de controle." });
            setScreens([]); // Set to empty array on error
        }
      } else {
        // Data is loaded from firestore
        setScreens(hubData);
      }
    };

    seedAndSetData();
  }, [hubData, isLoading, firestore, toast, hubsRef]);

  const handleEditClick = (screen: Screen) => {
    setEditingScreenId(screen.id);
    setTempTitle(screen.title);
    setTempDescription(screen.description);
  };

  const handleSaveClick = async (screenId: string) => {
    if (!firestore) return;
    setIsSaving(true);
    try {
        const docRef = doc(firestore, 'quality_control_hubs', screenId);
        await updateDoc(docRef, {
            title: tempTitle,
            description: tempDescription
        });
        toast({ title: "Sucesso!", description: "As informações do hub foram atualizadas." });
        setEditingScreenId(null);
    } catch (error) {
        console.error("Error updating document: ", error);
        toast({ variant: "destructive", title: "Erro", description: "Não foi possível salvar as alterações." });
    } finally {
        setIsSaving(false);
    }
  };

  const handleCancelClick = () => {
    setEditingScreenId(null);
  };

  if (isLoading && screens.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center h-full p-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">Carregando Hubs de Controle...</p>
        </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Hub de Controle de Qualidade
        </h1>
        <p className="text-muted-foreground">
          Selecione um portal para iniciar a verificação funcional.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {screens.map((screen) => (
          <Card key={screen.id} className="hover:shadow-md hover:border-primary transition-all h-full flex flex-col">
            <CardHeader>
              {editingScreenId === screen.id ? (
                <div className="space-y-2">
                  <Input 
                    value={tempTitle}
                    onChange={(e) => setTempTitle(e.target.value)}
                    className="text-lg font-bold"
                  />
                   <Textarea 
                    value={tempDescription}
                    onChange={(e) => setTempDescription(e.target.value)}
                    className="text-sm"
                  />
                </div>
              ) : (
                <>
                  <CardTitle className="flex items-center gap-3 text-primary">
                      <AppWindow className="h-6 w-6" />
                      {screen.title}
                  </CardTitle>
                  <CardDescription>{screen.description}</CardDescription>
                </>
              )}
            </CardHeader>
            <CardContent className="flex-grow flex flex-col items-center justify-center">
              <div className="flex flex-col items-center gap-2 w-full max-w-xs">
                <Link href={`/boss/podc/controle/${screen.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                      Ver Checklist
                      <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href={screen.linkedRoute} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button variant="ghost" className="w-full" title={`Abrir a tela ${screen.linkedRoute} em uma nova aba`}>
                      <LinkIcon className="mr-2 h-4 w-4" />
                      Abrir Portal
                  </Button>
                </Link>
                {editingScreenId === screen.id ? (
                    <div className="flex gap-2 w-full mt-2">
                      <Button variant="default" onClick={() => handleSaveClick(screen.id)} className="flex-1" disabled={isSaving}>
                          {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Save className="mr-2 h-4 w-4" />}
                           Salvar
                      </Button>
                      <Button variant="destructive" onClick={handleCancelClick} className="flex-1" disabled={isSaving}>
                          <X className="mr-2 h-4 w-4" /> Cancelar
                      </Button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2 w-full mt-2">
                        <Button variant="outline" onClick={() => handleEditClick(screen)} className="w-full">
                          <Pencil className="mr-2 h-4 w-4" />
                          Editar Card
                        </Button>
                    </div>
                )}
              </div>
            </CardContent>
        </Card>
        ))}
      </div>
    </div>
  );
}
