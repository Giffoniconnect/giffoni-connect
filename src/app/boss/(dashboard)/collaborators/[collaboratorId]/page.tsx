'use client';

import { useParams, useRouter } from 'next/navigation';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { Collaborator } from '@/docs/backend-types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Briefcase, Landmark, Home, Loader2, Pencil } from 'lucide-react';

const DetailItem = ({ label, value }: { label: string; value?: string | null }) => {
    if (!value) return null;
    return (
      <div className="flex items-start justify-between rounded-md border p-3">
        <div className="flex flex-col">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="text-base font-semibold">{value}</p>
        </div>
         <Button variant="ghost" size="icon">
            <Pencil className="h-4 w-4 text-muted-foreground" />
            <span className="sr-only">Editar {label}</span>
        </Button>
      </div>
    );
};

export default function BossCollaboratorDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const collaboratorId = params.collaboratorId as string;
  const firestore = useFirestore();

  const collaboratorRef = useMemoFirebase(() => firestore ? doc(firestore, 'collaborators', collaboratorId) : null, [firestore, collaboratorId]);
  const { data: collaborator, isLoading } = useDoc<Collaborator>(collaboratorRef);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!collaborator) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 text-center h-full">
        <h1 className="text-2xl font-bold">Colaborador não encontrado</h1>
        <p className="text-muted-foreground">O colaborador que você está procurando não existe.</p>
        <Button onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
      </div>
    );
  }

  const fullAddress = collaborator.address 
    ? `${collaborator.address.street}, ${collaborator.address.number} - ${collaborator.address.neighborhood}, ${collaborator.address.city} - ${collaborator.address.state}, ${collaborator.address.zipCode}`
    : 'Não informado';


  return (
    <div className="flex flex-col gap-6">
       <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.push('/boss/collaborators')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Detalhes do Colaborador</h1>
            <p className="text-muted-foreground">Informações cadastrais completas de {collaborator.name}.</p>
        </div>
      </div>

       <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><User className="h-5 w-5"/> Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               <DetailItem label="Nome Completo" value={collaborator.name} />
               <DetailItem label="E-mail de Acesso" value={collaborator.email} />
               <DetailItem label="E-mail Profissional" value={collaborator.professionalEmail} />
               <DetailItem label="Telefone" value={collaborator.phone} />
               <DetailItem label="Nacionalidade" value={collaborator.nationality} />
               <DetailItem label="Estado Civil" value={collaborator.maritalStatus} />
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Home className="h-5 w-5"/> Endereço</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4">
                <DetailItem label="Endereço Completo" value={fullAddress} />
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Briefcase className="h-5 w-5"/> Informações Profissionais</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <DetailItem label="Tipo de Colaborador" value={collaborator.collaboratorType} />
                {collaborator.collaboratorType === 'Advogado' && (
                    <>
                        <DetailItem label="Nº OAB" value={collaborator.oabNumber} />
                        <DetailItem label="UF OAB" value={collaborator.oabState} />
                    </>
                )}
                {collaborator.collaboratorType === 'Estagiário' && collaborator.universityDetails && (
                     <>
                        <DetailItem label="Universidade" value={collaborator.universityDetails.universityName} />
                        <DetailItem label="Período" value={collaborator.universityDetails.currentSemester} />
                        <DetailItem label="Tipo de Estágio" value={collaborator.universityDetails.internshipType} />
                        <DetailItem label="E-mail da Universidade" value={collaborator.universityDetails.universityEmail} />
                     </>
                )}
                {collaborator.collaboratorType === 'Perito' && (
                    <DetailItem label="Área de Expertise" value={collaborator.expertiseArea} />
                )}
            </CardContent>
        </Card>

        {collaborator.bankDetails && (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Landmark className="h-5 w-5"/> Dados Bancários</CardTitle>
                    <CardDescription>Informações para pagamentos.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <DetailItem label="Titular da Conta" value={collaborator.bankDetails.accountHolderName} />
                <DetailItem label="Tipo da Chave Pix" value={collaborator.bankDetails.pixKeyType} />
                <DetailItem label="Chave Pix" value={collaborator.bankDetails.pixKey} />
                <DetailItem label="Banco" value={collaborator.bankDetails.bankName} />
                <DetailItem label="Agência" value={collaborator.bankDetails.agency} />
                <DetailItem label="Conta" value={collaborator.bankDetails.accountNumber} />
                <DetailItem label="Tipo de Conta" value={collaborator.bankDetails.accountType} />
                </CardContent>
            </Card>
        )}
    </div>
  );
}

