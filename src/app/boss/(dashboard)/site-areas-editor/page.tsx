'use client';

import React, { useRef, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  useCollection,
  useFirestore,
  useMemoFirebase,
} from '@/firebase';
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
  writeBatch,
  getDoc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import {
  ArrowLeft,
  Loader2,
  PlusCircle,
  Pencil,
  Trash2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { iconList, IconName } from '@/lib/icon-map';
import { practiceAreasInitialData } from '@/lib/data';
import Link from 'next/link';

type PracticeArea = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: IconName;
  createdAt?: any;
};

const emptyArea: Partial<PracticeArea> = {
  title: '',
  description: '',
  href: '',
  icon: 'Scale',
};

export default function AreasEditorPage() {
  const router = useRouter();
  const { toast } = useToast();
  const firestore = useFirestore();

  const areasRef = useMemoFirebase(
    () =>
      firestore
        ? query(collection(firestore, 'practice_areas'), orderBy('title', 'asc'))
        : null,
    [firestore]
  );
  const { data: areas, isLoading } = useCollection<PracticeArea>(areasRef);
  const didSeedCheck = React.useRef(false);

  React.useEffect(() => {
    const seedData = async () => {
        if (!firestore) return;
        
        const seedMetaRef = doc(firestore, 'practice_areas', '--metadata--');
        
        try {
            const seedMetaSnap = await getDoc(seedMetaRef);

            if (seedMetaSnap.exists()) {
                return;
            }
            
            toast({
                title: 'Inicializando áreas de atuação...',
                description: `Adicionando ${practiceAreasInitialData.length} área(s) padrão.`,
            });

            const batch = writeBatch(firestore);
            
            practiceAreasInitialData.forEach((area) => {
                const docRef = doc(firestore, 'practice_areas', area.id);
                batch.set(docRef, { ...area, createdAt: serverTimestamp() });
            });
            
            batch.set(seedMetaRef, { seeded: true, seededAt: serverTimestamp() });
            
            await batch.commit();
            
        } catch (e) {
            console.error("Error during seeding process: ", e);
            toast({
                variant: "destructive",
                title: "Erro de Inicialização",
                description: "Não foi possível inicializar os dados das áreas de atuação."
            });
        }
    };

    if (firestore && !didSeedCheck.current) {
        didSeedCheck.current = true;
        seedData();
    }
  }, [firestore, toast]);


  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  const [isPageDeleteAlertOpen, setIsPageDeleteAlertOpen] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [processingIds, setProcessingIds] = useState<string[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [currentArea, setCurrentArea] = React.useState<Partial<PracticeArea>>(emptyArea);
  const [areaToDelete, setAreaToDelete] = React.useState<PracticeArea | null>(null);
  const [pageToDelete, setPageToDelete] = React.useState<PracticeArea | null>(null);


  const addLog = (message: string) => {
    setLogs(prev => [...prev.slice(-4), message]);
  }


  const handleAddNew = () => {
    setCurrentArea(emptyArea);
    setIsDialogOpen(true);
  };

  const handleEdit = (area: PracticeArea) => {
    setCurrentArea(area);
    setIsDialogOpen(true);
  };

  const handleDelete = (area: PracticeArea) => {
    setAreaToDelete(area);
    setIsAlertOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!areaToDelete || !firestore) return;
  
    const areaId = areaToDelete.id;
    const areaTitle = areaToDelete.title;
    
    setIsAlertOpen(false);
    setProcessingIds(prev => [...prev, areaId]);
    addLog(`Deletar Card principal em andamento: "${areaTitle}"...`);
  
    const practiceAreaRef = doc(firestore, 'practice_areas', areaId);
    const contentPageRef = doc(firestore, 'content_pages', areaId);
  
    try {
      const batch = writeBatch(firestore);
      batch.delete(practiceAreaRef);
      batch.delete(contentPageRef);
      await batch.commit();
  
      toast({
        title: 'Exclusão Concluída',
        description: `A área de atuação "${areaTitle}" e sua página foram removidas com sucesso.`,
      });
      addLog(`Deletar Card principal concluído: "${areaTitle}".`);
    } catch (error) {
      console.error("Error deleting card and page:", error);
      toast({
        variant: 'destructive',
        title: 'Erro na Exclusão',
        description: 'Não foi possível remover a área de atuação.',
      });
      addLog(`Erro ao deletar "${areaTitle}".`);
    } finally {
      setAreaToDelete(null);
      setProcessingIds(prev => {
        const newIds = prev.filter(id => id !== areaId);
        if (newIds.length === 0) {
            addLog('Todos os botões da página estão liberados para uso.');
        }
        return newIds;
      });
    }
  };
  
  const handleDeletePage = (area: PracticeArea) => {
    setPageToDelete(area);
    setIsPageDeleteAlertOpen(true);
  };

  const handleConfirmDeletePage = async () => {
    if (!pageToDelete || !firestore) return;
  
    const pageId = pageToDelete.id;
    const pageTitle = pageToDelete.title;

    setIsPageDeleteAlertOpen(false);
    setProcessingIds(prev => [...prev, pageId]);
    addLog(`Deletar Página da área em andamento: "${pageTitle}"...`);
    
    const contentPageRef = doc(firestore, 'content_pages', pageId);
  
    try {
      await deleteDoc(contentPageRef);
      toast({
        title: 'Exclusão da Página Concluída',
        description: `O conteúdo da página para "${pageTitle}" foi removido com sucesso.`,
      });
      addLog(`Deletar Página da área concluído: "${pageTitle}".`);
    } catch(error) {
        console.error("Error deleting page content:", error);
        toast({
            variant: 'destructive',
            title: 'Erro na Exclusão',
            description: 'Não foi possível remover o conteúdo da página.',
        });
        addLog(`Erro ao deletar conteúdo da página "${pageTitle}".`);
    } finally {
        setPageToDelete(null);
        setProcessingIds(prev => {
            const newIds = prev.filter(id => id !== pageId);
            if (newIds.length === 0) {
                addLog('Todos os botões da página estão liberados para uso.');
            }
            return newIds;
          });
    }
  };

  const handleSave = async () => {
    if (
      !currentArea.title ||
      !currentArea.description ||
      !currentArea.href ||
      !currentArea.icon
    ) {
      toast({
        variant: 'destructive',
        title: 'Campos obrigatórios',
        description: 'Por favor, preencha todos os campos.',
      });
      return;
    }
    if (!firestore) return;

    setIsSaving(true);

    try {
        if ('id' in currentArea && currentArea.id) {
            // Editing existing area
            const docRef = doc(firestore, 'practice_areas', currentArea.id);
            const { id, ...dataToUpdate } = currentArea;
            await updateDoc(docRef, dataToUpdate);
            toast({ title: 'Sucesso', description: 'Área de atuação atualizada.' });
        } else {
            // Adding new area
            const collectionRef = collection(firestore, 'practice_areas');
            // Generate a Firestore-compatible ID
            const newDocRef = doc(collectionRef); 
            await setDoc(newDocRef, {
                ...currentArea,
                id: newDocRef.id,
                createdAt: serverTimestamp(),
            });
            toast({
                title: 'Sucesso',
                description: 'Nova área de atuação adicionada.',
            });
        }
        setIsDialogOpen(false);
        setCurrentArea(emptyArea);
    } catch (error) {
        console.error('Error saving area: ', error);
        toast({
            variant: 'destructive',
            title: 'Erro',
            description: 'Não foi possível salvar a área de atuação.',
        });
    } finally {
        setIsSaving(false);
    }
};

  const IconComponent = ({ iconName }: { iconName: IconName }) => {
    const Icon = React.useMemo(() => {
      const found = iconList.find((i) => i.name === iconName);
      return found ? found.component : null;
    }, [iconName]);

    if (!Icon) return null;
    return <Icon className="h-5 w-5" />;
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.push('/boss/site-editor')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Editar Áreas de Atuação
          </h1>
          <p className="text-muted-foreground">
            Adicione, edite ou remova as áreas de atuação exibidas no site.
          </p>
        </div>
      </div>

      {logs.length > 0 && (
        <div className="mt-2 p-4 bg-muted border rounded-lg text-sm font-mono space-y-1 max-h-48 overflow-y-auto">
          <p className="font-bold mb-2">Log de Atividades:</p>
          {logs.map((log, index) => <p key={index} className="flex items-center gap-2">{log}</p>)}
        </div>
      )}

      <div className="flex justify-end">
        <Button onClick={handleAddNew}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Nova Área
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas?.filter(area => area.id !== '--metadata--').map((area) => (
            <Card key={area.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <IconComponent iconName={area.icon} />
                  {area.title}
                </CardTitle>
                <CardDescription>{area.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto flex justify-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" disabled={processingIds.includes(area.id)}>
                        {processingIds.includes(area.id) ? (
                           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : "Ver opções de Edição" }
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEdit(area)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      <span>Editar Card Principal</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(area)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Excluir Card principal</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={`/boss/site-editor/edit-page/${area.id}`}>
                        <Pencil className="mr-2 h-4 w-4" />
                        <span>Editar Página da área de Atuação</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeletePage(area)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Deletar Página da Área de atuação</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentArea.id ? 'Editar Área' : 'Adicionar Nova Área'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={currentArea.title}
                onChange={(e) =>
                  setCurrentArea({ ...currentArea, title: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={currentArea.description}
                onChange={(e) =>
                  setCurrentArea({
                    ...currentArea,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="href">Link (href)</Label>
              <Input
                id="href"
                value={currentArea.href}
                onChange={(e) =>
                  setCurrentArea({ ...currentArea, href: e.target.value })
                }
                placeholder="/infoprodutos/..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="icon">Ícone</Label>
              <Select
                value={currentArea.icon}
                onValueChange={(value: IconName) =>
                  setCurrentArea({ ...currentArea, icon: value })
                }
              >
                <SelectTrigger id="icon">
                  <SelectValue placeholder="Selecione um ícone" />
                </SelectTrigger>
                <SelectContent>
                  {iconList.map((iconItem) => (
                    <SelectItem key={iconItem.name} value={iconItem.name}>
                      <div className="flex items-center gap-2">
                        <iconItem.component className="h-4 w-4" />
                        {iconItem.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              disabled={isSaving}
            >
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso irá remover permanentemente a
              área de atuação "{areaToDelete?.title}" e todo o conteúdo da sua página associada.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isPageDeleteAlertOpen} onOpenChange={setIsPageDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação irá remover permanentemente o conteúdo da página para "{pageToDelete?.title}". O card principal no site será mantido, mas o link pode não levar a lugar nenhum.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDeletePage}>
                Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}
