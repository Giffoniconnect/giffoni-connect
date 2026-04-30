'use client';

import { useParams, useRouter } from 'next/navigation';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { Partner } from '@/app/partner/signup/page';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Building, Contact, Landmark, Pencil } from 'lucide-react';
import { Loader2 } from 'lucide-react';

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

export default function BossPartnerDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const partnerId = params.partnerId as string;
  const firestore = useFirestore();

  const partnerRef = useMemoFirebase(() => firestore ? doc(firestore, 'partners', partnerId) : null, [firestore, partnerId]);
  const { data: partner, isLoading } = useDoc<Partner>(partnerRef);

  if (isLoading) {
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
        <Button variant="outline" size="icon" onClick={() => router.push('/boss/partners')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Detalhes do Parceiro</h1>
            <p className="text-muted-foreground">Informações cadastrais completas de {partner.name}.</p>
        </div>
      </div>

       <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Building className="h-5 w-5"/> Informações Profissionais e Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               <DetailItem label="Nome Completo" value={partner.name} />
               <DetailItem label="Empresa" value={partner.company} />
               <DetailItem label="Cargo" value={partner.role} />
               <DetailItem label="Nº OAB (se aplicável)" value={partner.oabNumber} />
               <DetailItem label="Nacionalidade" value={partner.nationality} />
               <DetailItem label="Estado Civil" value={partner.maritalStatus} />
               <DetailItem label="RG" value={partner.rg} />
               <DetailItem label="CPF" value={partner.cpf} />
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Contact className="h-5 w-5"/> Contato e Redes Sociais</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <DetailItem label="E-mail" value={partner.email} />
                <DetailItem label="Telefone de Contato" value={partner.phone} />
                <DetailItem label="Endereço Completo" value={partner.address} />
                <DetailItem label="Instagram" value={partner.instagram} />
                <DetailItem label="TikTok" value={partner.tiktok} />
                <DetailItem label="Facebook" value={partner.facebook} />
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Landmark className="h-5 w-5"/> Dados Bancários</CardTitle>
                <CardDescription>Informações para repasse de honorários.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               <DetailItem label="Titular da Conta" value={partner.bankDetails?.accountHolderName} />
               <DetailItem label="Tipo da Chave Pix" value={partner.bankDetails?.pixKeyType} />
               <DetailItem label="Chave Pix" value={partner.bankDetails?.pixKey} />
               <DetailItem label="Banco" value={partner.bankDetails?.bankName} />
               <DetailItem label="Agência" value={partner.bankDetails?.agency} />
               <DetailItem label="Conta" value={partner.bankDetails?.accountNumber} />
               <DetailItem label="Tipo de Conta" value={partner.bankDetails?.accountType} />
            </CardContent>
        </Card>
    </div>
  );
}

