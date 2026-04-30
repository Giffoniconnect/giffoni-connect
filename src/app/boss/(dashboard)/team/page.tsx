
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
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
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  PlusCircle,
  Pencil,
  Trash2,
  ImageUp,
  Loader2,
  Users,
  User,
  Briefcase,
  GraduationCap,
  Building,
  ArrowLeft,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore';
import type { TeamMember as TeamMemberType } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const roleOptions = [
  'CEO - Sócio Fundador',
  'Sócia',
  'Sócio',
  'Advogado Associado',
  'Advogada Associada',
  'Gerente Jurídica',
  'Secretária',
  'Estagiário',
  'Estagiária',
];

const hierarchy = {
  socios: ['CEO - Sócio Fundador', 'Sócio', 'Sócia'],
  advogados: ['Advogado Associado', 'Advogada Associada'],
  estagiarios: ['Estagiário', 'Estagiária'],
  suporte: ['Gerente Jurídica', 'Secretária'],
};

const SectionTitle = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
    <div className="flex items-center gap-3 mb-6 mt-8">
      <Icon className="h-6 w-6 text-primary" />
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
    </div>
);
  
export default function BossTeamPage() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const router = useRouter();

  const teamRef = useMemoFirebase(
    () => firestore ? query(collection(firestore, 'team'), orderBy('createdAt', 'asc')) : null,
    [firestore]
  );
  const { data: team, isLoading } = useCollection<TeamMemberType>(teamRef);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [memberToRemove, setMemberToRemove] = useState<TeamMemberType | null>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMemberType | Partial<TeamMemberType> | null>(null);
  
  const { socios, advogados, estagiarios, suporte } = useMemo(() => {
    if (!team) return { socios: [], advogados: [], estagiarios: [], suporte: [] };

    return {
      socios: team.filter(m => hierarchy.socios.includes(m.role)),
      advogados: team.filter(m => hierarchy.advogados.includes(m.role)),
      estagiarios: team.filter(m => hierarchy.estagiarios.includes(m.role)),
      suporte: team.filter(m => hierarchy.suporte.includes(m.role)),
    };
  }, [team]);


  const handleAdd = () => {
    setSelectedMember({ avatarUrl: `https://picsum.photos/seed/${Date.now()}/200` });
    setIsDialogOpen(true);
  };

  const handleEdit = (member: TeamMemberType) => {
    setSelectedMember({ ...member });
    setIsDialogOpen(true);
  };
  
  const handleConfirmRemove = async () => {
    if (!memberToRemove || !firestore) return;
    setIsSaving(true);
    try {
      await deleteDoc(doc(firestore, 'team', memberToRemove.id));
      toast({
        title: 'Sucesso!',
        description: `Membro '${memberToRemove.name}' removido com sucesso.`,
      });
    } catch (error) {
      console.error('Error removing member: ', error);
      toast({
        variant: 'destructive',
        title: 'Erro!',
        description: 'Não foi possível remover o membro da equipe.',
      });
    } finally {
      setIsSaving(false);
      setMemberToRemove(null);
    }
  };


  const handleSave = async () => {
    if (!selectedMember || !selectedMember.name || !selectedMember.role || !firestore) {
      toast({
        variant: 'destructive',
        title: 'Erro de Validação',
        description: 'Nome e Cargo são obrigatórios.',
      });
      return;
    }
    setIsSaving(true);

    try {
      if ('id' in selectedMember && selectedMember.id) {
        // Editing existing member
        const memberDoc = doc(firestore, 'team', selectedMember.id);
        const { id, ...dataToUpdate } = selectedMember;
        await updateDoc(memberDoc, dataToUpdate);
        toast({
          title: 'Sucesso!',
          description: `Membro '${selectedMember.name}' atualizado com sucesso.`,
        });
      } else {
        // Adding new member
        const newDoc = await addDoc(collection(firestore, 'team'), {
          ...selectedMember,
          createdAt: serverTimestamp(),
        });
        // Now update the local state to include the new ID for consistency
        setSelectedMember(prev => ({...prev, id: newDoc.id}));
      }
      setIsDialogOpen(false);
      setSelectedMember(null);
    } catch (error) {
      console.error('Error saving member: ', error);
      toast({
        variant: 'destructive',
        title: 'Erro!',
        description: 'Não foi possível salvar as informações do membro.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleFieldChange = (
    field: keyof TeamMemberType,
    value: string
  ) => {
    if (selectedMember) {
      setSelectedMember((prev) => ({ ...prev!, [field]: value }));
    }
  };

  const renderTeamGrid = (members: TeamMemberType[], gridClass: string) => {
    if (isLoading && members.length === 0) {
       return (
        <div className={cn("grid gap-6 w-full", gridClass)}>
            {Array.from({ length: 2 }).map((_, i) => (
                <Card key={i} className="flex flex-col">
                    <CardHeader className="items-center pt-6"><Skeleton className="h-24 w-24 rounded-full" /></CardHeader>
                    <CardContent className="text-center flex-1 space-y-2 py-4">
                        <Skeleton className="h-5 w-3/4 mx-auto rounded" />
                        <Skeleton className="h-4 w-1/2 mx-auto rounded" />
                    </CardContent>
                    <CardFooter className="justify-center gap-2 p-4">
                        <Skeleton className="h-9 w-9 rounded" />
                        <Skeleton className="h-9 w-9 rounded" />
                    </CardFooter>
                </Card>
            ))}
        </div>
       );
    }

    if (members.length === 0) return null;

    return (
        <div className={cn("grid gap-6 w-full", gridClass)}>
        {members.map((member) => (
          <Card key={member.id} className="flex flex-col">
            <CardHeader className="items-center pt-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={member.avatarUrl} alt={member.name} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent className="text-center flex-1 flex flex-col justify-center py-2">
              <p className="font-semibold text-lg">{member.name}</p>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </CardContent>
            <CardFooter className="justify-center gap-2 p-4">
              <Button variant="outline" size="icon" onClick={() => handleEdit(member)}>
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Editar</span>
              </Button>
              <AlertDialog onOpenChange={(open) => !open && setMemberToRemove(null)}>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="icon" onClick={() => setMemberToRemove(member)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Isso irá remover permanentemente o membro '{member.name}' da equipe.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirmRemove} disabled={isSaving}>
                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Continuar
                    </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.push('/boss/site-editor')}>
            <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Gerenciar Equipe</h1>
            <p className="text-muted-foreground">
            Adicione, edite ou remova membros da equipe que são exibidos na página
            institucional.
            </p>
        </div>
      </div>

      <div className="flex justify-end items-center gap-2">
        <div className='flex flex-col items-end gap-2'>
            <Button onClick={handleAdd}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Adicionar Novo Membro
            </Button>
            <Link href="/about/team" target="_blank" rel="noopener noreferrer">
                <Button variant="outline">
                    <Users className="mr-2 h-4 w-4" />
                    Ver página Principal - Nossa Equipe
                </Button>
            </Link>
        </div>
      </div>
      
      <div className="space-y-12">
        { (isLoading || socios.length > 0) && (
            <div className="flex flex-col items-center">
                <SectionTitle icon={User} title="Sócios" />
                {renderTeamGrid(socios, "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 max-w-2xl")}
            </div>
        )}
        { (isLoading || advogados.length > 0) && (
            <div className="flex flex-col items-center">
                <SectionTitle icon={Briefcase} title="Advogados Associados" />
                {renderTeamGrid(advogados, "grid-cols-1 sm:grid-cols-2 max-w-2xl")}
            </div>
        )}
        { (isLoading || estagiarios.length > 0) && (
            <div className="flex flex-col items-center">
                <SectionTitle icon={GraduationCap} title="Estagiários" />
                {renderTeamGrid(estagiarios, "grid-cols-1 sm:grid-cols-2 max-w-2xl")}
            </div>
        )}
        { (isLoading || suporte.length > 0) && (
            <div className="flex flex-col items-center">
                <SectionTitle icon={Building} title="Suporte Administrativo/Jurídico" />
                {renderTeamGrid(suporte, "grid-cols-1 sm:grid-cols-2 max-w-2xl")}
            </div>
        )}

         {!isLoading && team?.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-12 border rounded-lg">
                Nenhum membro na equipe ainda. Clique em "Adicionar Novo Membro" para começar.
            </div>
        )}
      </div>

      {/* Dialog para Adicionar/Editar Membro */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {selectedMember && 'id' in selectedMember && selectedMember.id ? 'Editar Membro' : 'Adicionar Novo Membro'}
            </DialogTitle>
            <DialogDescription>
              Faça as alterações abaixo e clique em salvar.
            </DialogDescription>
          </DialogHeader>
          {selectedMember && (
            <div className="grid gap-4 py-4">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={selectedMember.avatarUrl} alt={selectedMember.name} />
                  <AvatarFallback>{selectedMember.name?.charAt(0) || '?'}</AvatarFallback>
                </Avatar>
                <Button variant="outline" disabled>
                  <ImageUp className="mr-2 h-4 w-4" />
                  Alterar Foto (Em breve)
                </Button>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input
                  id="name"
                  value={selectedMember.name}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                  className="col-span-3"
                  disabled={isSaving}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Cargo
                </Label>
                <Select
                  value={selectedMember.role}
                  onValueChange={(value) => handleFieldChange('role', value)}
                  disabled={isSaving}
                >
                  <SelectTrigger id="role" className="col-span-3">
                    <SelectValue placeholder="Selecione o cargo..." />
                  </SelectTrigger>
                  <SelectContent>
                    {roleOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary" disabled={isSaving}>
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" onClick={handleSave} disabled={isSaving}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
