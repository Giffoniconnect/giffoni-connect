
'use client';
import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronRight, FileText, PlusCircle, Loader2, Search, UserPlus, Trash2, Handshake } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { type MainFunction, type Status, type SubFunction, type Verification, initialTestPlan, initialBossTestPlan } from '@/lib/data';
import { useFirestore, useCollection, useDoc, useMemoFirebase } from '@/firebase';
import { collection, doc, writeBatch, updateDoc, getDocs, serverTimestamp, addDoc, query, orderBy } from 'firebase/firestore';
import { createTestSection } from '../../actions';
import Link from 'next/link';


const statusConfig: {
  [key in Status]: { variant: 'default' | 'secondary' | 'destructive' | 'outline'; className: string };
} = {
  'Pendente de Verificação': { variant: 'secondary', className: 'bg-amber-400 text-black hover:bg-amber-500' },
  'Aguardando Teste': { variant: 'secondary', className: 'bg-blue-200 text-blue-800' },
  'Com Defeito': { variant: 'destructive', className: 'bg-red-500 text-white' },
  'Testado em ambiente simulado': { variant: 'default', className: 'bg-green-200 text-green-800' },
  'Testado em ambiente real': { variant: 'default', className: 'bg-purple-200 text-purple-800' },
};


const StatusSelector = ({ status, onStatusChange, disabled = false }: { status: Status; onStatusChange: (newStatus: Status) => void; disabled?: boolean; }) => {
  const currentConfig = statusConfig[status];

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Select value={status} onValueChange={(value: Status) => onStatusChange(value)} disabled={disabled}>
        <SelectTrigger className="w-auto sm:w-[240px] focus:ring-0 focus:ring-offset-0">
          <SelectValue>
            <Badge variant={currentConfig.variant} className={`flex items-center gap-1.5 whitespace-nowrap ${currentConfig.className}`}>
              {status}
            </Badge>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {Object.keys(statusConfig).map((key) => {
            const config = statusConfig[key as Status];
            return (
              <SelectItem key={key} value={key}>
                <Badge variant={config.variant} className={`w-full flex items-center gap-1.5 whitespace-nowrap ${config.className}`}>
                  {key}
                </Badge>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default function ControleHubDetailPage() {
  const router = useRouter();
  const params = useParams();
  const hubId = params.hubId as string;
  const firestore = useFirestore();
  const { toast } = useToast();

  const hubRef = useMemoFirebase(() => firestore && hubId ? doc(firestore, 'quality_control_hubs', hubId) : null, [firestore, hubId]);
  const { data: hubData, isLoading: isLoadingHub } = useDoc(hubRef);

  const testPlanRef = useMemoFirebase(() => {
    if (!firestore || !hubId) return null;
    return query(collection(firestore, 'quality_control_hubs', hubId, 'test_plans'), orderBy('createdAt', 'asc'));
  }, [firestore, hubId]);

  const { data: testPlan, isLoading: isLoadingPlan } = useCollection<MainFunction>(testPlanRef);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newControl, setNewControl] = useState({ title: '', description: '', subVerifications: '' });
  const [isSaving, setIsSaving] = useState(false);
  
  useEffect(() => {
    const seedInitialData = async () => {
      if (!firestore || !testPlanRef || !hubId) return;
  
      const snapshot = await getDocs(testPlanRef);
      if (snapshot.empty) {
        let dataToSeed: Omit<MainFunction, 'id' | 'createdAt'>[] = [];
        let hubName = '';
  
        if (hubId === 'TELA-1') {
          dataToSeed = initialTestPlan;
          hubName = 'TELA-1';
        } else if (hubId === 'HUB-BOSS') {
          dataToSeed = initialBossTestPlan;
          hubName = 'HUB-BOSS';
        }
  
        if (dataToSeed.length > 0) {
          console.log(`Seeding initial test plan for ${hubName}...`);
          const batch = writeBatch(firestore);
          dataToSeed.forEach((mainFunc) => {
            const newDocRef = doc(testPlanRef);
            const dataToSet = { ...mainFunc, id: newDocRef.id, createdAt: serverTimestamp() };
            batch.set(newDocRef, dataToSet);
          });
  
          try {
            await batch.commit();
            toast({ title: 'Sucesso', description: `Plano de teste inicial para ${hubName} foi criado.` });
          } catch (e) {
            console.error(`Error seeding initial test plan for ${hubName}:`, e);
            toast({ variant: 'destructive', title: 'Erro', description: `Não foi possível criar o plano de teste inicial para ${hubName}.` });
          }
        }
      }
    };
  
    if (!isLoadingPlan && testPlan?.length === 0) {
      seedInitialData();
    }
  }, [firestore, hubId, toast, testPlanRef, isLoadingPlan, testPlan]);


  const handleStatusChange = async (mainFuncId: string, subFuncId: string | null, verificationId: string | null, newStatus: Status) => {
    if (!testPlan || !firestore || !hubId) return;

    const mainFunc = testPlan.find(mf => mf.id === mainFuncId);
    if (!mainFunc) return;

    const docRef = doc(firestore, `quality_control_hubs/${hubId}/test_plans/${mainFuncId}`);
    
    // Create a deep copy to modify
    const mutableMainFunc = JSON.parse(JSON.stringify(mainFunc));

    if (!subFuncId) { // It's the main function status
        mutableMainFunc.status = newStatus;
    } else { // It's a sub-function or a verification status
        const subFuncIndex = mutableMainFunc.subFunctions.findIndex((sf: SubFunction) => sf.id === subFuncId);
        if (subFuncIndex === -1) return;
        
        if (!verificationId) { // It's the sub-function status
            mutableMainFunc.subFunctions[subFuncIndex].status = newStatus;
        } else { // It's a verification item status
            const verificationIndex = mutableMainFunc.subFunctions[subFuncIndex].verifications.findIndex((v: Verification) => v.id === verificationId);
            if (verificationIndex === -1) return;
            mutableMainFunc.subFunctions[subFuncIndex].verifications[verificationIndex].status = newStatus;
        }
    }
    
    try {
        await updateDoc(docRef, mutableMainFunc);
    } catch(error) {
        console.error("Failed to update status:", error);
        toast({ variant: 'destructive', title: 'Erro', description: 'Não foi possível salvar a alteração de status.' });
    }
  };

  const isMainFunctionPendent = (mainFunction: MainFunction) => {
    return mainFunction.subFunctions.some(sf => sf.status !== 'Testado em ambiente real' || sf.verifications.some(v => v.status !== 'Testado em ambiente real'));
  };
  
  const isSubFunctionPendent = (subFunction: SubFunction) => {
    return subFunction.verifications.some(v => v.status !== 'Testado em ambiente real');
  };

  const handleAddControl = async () => {
    if (!hubId || !firestore) return;
    if (!newControl.title || !newControl.description) {
        toast({ variant: 'destructive', title: 'Erro', description: 'Título da Seção e Descrição são obrigatórios.' });
        return;
    }
    
    setIsSaving(true);
    try {
        // Use server action to add new section
        await createTestSection(hubId, newControl);
        
        toast({ title: 'Sucesso', description: 'Nova seção de controle adicionada.' });
        setNewControl({ title: '', description: '', subVerifications: '' });
        setIsDialogOpen(false);
    } catch(error) {
        console.error("Failed to add control:", error);
        toast({ variant: 'destructive', title: 'Erro', description: 'Não foi possível adicionar a nova seção de controle.' });
    } finally {
        setIsSaving(false);
    }
};


 const isLoading = isLoadingHub || isLoadingPlan;

  if (isLoading && !hubData) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!hubData && !isLoading) {
    return (
         <div className="flex flex-col items-center justify-center gap-4 text-center h-full">
            <h1 className="text-2xl font-bold">Plano de Teste Não Encontrado</h1>
            <p className="text-muted-foreground">O plano de teste que você está procurando não existe ou ainda não foi criado.</p>
            <Button onClick={() => router.push('/boss/podc/controle')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para o Hub
            </Button>
      </div>
    )
  }


  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push('/boss/podc/controle')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {hubData?.title}
            </h1>
            <p className="text-muted-foreground">
              ETAPA 1 — VERIFICAÇÕES FUNCIONAIS E DE INTERFACE
            </p>
          </div>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Adicionar Controle
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                <DialogTitle>Adicionar Nova Seção de Controle</DialogTitle>
                <DialogDescription>
                    Defina uma nova função principal e suas sub-verificações para adicionar ao plano de teste.
                </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="control-title">Título da Seção</Label>
                        <Input id="control-title" value={newControl.title} onChange={e => setNewControl({...newControl, title: e.target.value})} placeholder="Ex: Gerenciamento de Faturas" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="control-desc">Descrição da Verificação Principal</Label>
                        <Input id="control-desc" value={newControl.description} onChange={e => setNewControl({...newControl, description: e.target.value})} placeholder="Ex: Verifica a listagem e download de faturas." />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="control-subs">Lista de Subverificações (uma por linha)</Label>
                        <Textarea id="control-subs" value={newControl.subVerifications} onChange={e => setNewControl({...newControl, subVerifications: e.target.value})} placeholder={"Verificar se a tabela de faturas é exibida\nVerificar se o download da fatura funciona\nVerificar se o status da fatura está correto"} />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isSaving}>Cancelar</Button>
                    <Button onClick={handleAddControl} disabled={isSaving}>
                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Salvar Seção
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Controle de Qualidade Funcional</CardTitle>
          <CardDescription>
            Lista de funções e sub-funções para verificação manual e status de
            implementação.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingPlan && (!testPlan || testPlan.length === 0) ? (
             <div className="flex justify-center items-center h-48">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
          ) : !testPlan || testPlan.length === 0 ? (
            <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
                Nenhuma seção de controle foi adicionada para esta tela ainda. Clique em "Adicionar Controle" para começar.
            </div>
          ) : (
          <Accordion
            type="multiple"
            defaultValue={testPlan?.map(func => func.id)}
            className="w-full space-y-4"
          >
            {testPlan?.map((mainFunc) => (
              <AccordionItem
                value={mainFunc.id}
                key={mainFunc.id}
                className="border rounded-lg bg-muted/20"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full p-4 gap-2">
                  <AccordionTrigger className="flex-1 p-0 hover:no-underline [&>svg]:hidden">
                    <div className="flex items-center gap-3 text-left">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-semibold">{mainFunc.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {mainFunc.description}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <StatusSelector
                    status={mainFunc.status}
                    onStatusChange={(newStatus) =>
                      handleStatusChange(mainFunc.id, null, null, newStatus)
                    }
                    disabled={isMainFunctionPendent(mainFunc)}
                  />
                </div>
                <AccordionContent className="p-4 pt-0 bg-background rounded-b-lg">
                  <Accordion
                    type="multiple"
                    defaultValue={mainFunc.subFunctions.map(sf => sf.id)}
                    className="w-full space-y-3"
                  >
                    {mainFunc.subFunctions.map((subFunc) => (
                      <AccordionItem
                        value={subFunc.id}
                        key={subFunc.id}
                        className="border rounded-md"
                      >
                         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full px-3 py-2 bg-muted/40 rounded-t-md gap-2">
                            <AccordionTrigger className="flex-1 p-0 hover:no-underline [&>svg]:hidden">
                                <div className="flex flex-col items-start gap-1 text-left">
                                    <p className="font-bold text-sm">Verificação principal</p>
                                    <h4 className="font-medium">{subFunc.title}</h4>
                                </div>
                            </AccordionTrigger>
                            <StatusSelector 
                                status={subFunc.status}
                                onStatusChange={(newStatus) => handleStatusChange(mainFunc.id, subFunc.id, null, newStatus)}
                                disabled={isSubFunctionPendent(subFunc)}

                            />
                        </div>
                        <AccordionContent className="p-4">
                          <p className="text-sm text-muted-foreground mb-4">
                            {subFunc.description}
                          </p>
                           <p className="font-bold text-sm mb-3">Lista de Subverificações</p>
                          <ul className="space-y-3">
                            {subFunc.verifications.map((item) => (
                              <li
                                key={item.id}
                                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-sm p-2 rounded-md border"
                              >
                                <div className="flex items-center gap-2">
                                  <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                  <span>{item.text}</span>
                                </div>
                                <StatusSelector
                                  status={item.status}
                                  onStatusChange={(newStatus) =>
                                    handleStatusChange(
                                      mainFunc.id,
                                      subFunc.id,
                                      item.id,
                                      newStatus
                                    )
                                  }
                                />
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
