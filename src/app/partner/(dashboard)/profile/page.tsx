'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useUser, useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import type { Partner } from '@/app/partner/signup/page';
import { Building, Contact, Landmark } from 'lucide-react';


const DetailItem = ({ label, value }: { label: string; value?: string | null }) => {
    if (!value) return null;
    return (
      <div>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    );
};


export default function PartnerProfilePage() {
    const { user } = useUser();
    const firestore = useFirestore();
    
    const partnerRef = useMemoFirebase(() => 
        user && firestore ? doc(firestore, 'partners', user.uid) : null,
        [firestore, user]
    );

    const { data: partner, isLoading } = useDoc<Partner>(partnerRef);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Meus Dados</h1>
                <p className="text-muted-foreground">Suas informações de cadastro na plataforma.</p>
            </div>
            
            {isLoading ? (
                <div className="flex items-center justify-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            ) : partner ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Building className="h-5 w-5"/> Informações Profissionais e Pessoais</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
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
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Contact className="h-5 w-5"/> Contato e Redes Sociais</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
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
                            </CardHeader>
                            <CardContent className="space-y-4">
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

                </div>
            ) : (
                <Card>
                    <CardContent className="p-8 text-center text-muted-foreground">
                        Não foi possível carregar os dados do parceiro.
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

