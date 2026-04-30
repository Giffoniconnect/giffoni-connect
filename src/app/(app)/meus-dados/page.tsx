'use client';
import { useUser, useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { Client } from '@/lib/data';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Loader2, User as UserIcon, Building } from 'lucide-react';

const DetailItem = ({ label, value }: { label: string, value?: string | boolean | null }) => {
    if (!value && typeof value !== 'boolean') return null;

    const displayValue = typeof value === 'boolean' ? (value ? 'Sim' : 'Não') : value;

    return (
        <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="font-semibold">{displayValue}</p>
        </div>
    );
};

export default function MeusDadosPage() {
    const { user } = useUser();
    const firestore = useFirestore();

    const clientRef = useMemoFirebase(() => 
        user && firestore ? doc(firestore, 'clients', user.uid) : null,
        [user, firestore]
    );

    const { data: client, isLoading } = useDoc<Client>(clientRef);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }
    
    if (!client) {
        return (
            <Card>
                <CardContent className="p-8 text-center text-muted-foreground">
                    Não foi possível carregar seus dados cadastrais. Por favor, tente novamente mais tarde.
                </CardContent>
            </Card>
        );
    }


    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Meus Dados Cadastrais</h1>
                <p className="text-muted-foreground">
                  Estas são as informações registradas em nosso sistema. Para alterá-las, entre em contato com nossa equipe.
                </p>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        {client.type === 'Pessoa Física' ? <UserIcon className="h-5 w-5"/> : <Building className="h-5 w-5"/>}
                        Informações Principais
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   <DetailItem label="Nome / Razão Social" value={client.fullName || client.companyName} />
                   <DetailItem label="Tipo de Cadastro" value={client.type} />
                   <DetailItem label="CPF / CNPJ" value={client.cpf || client.cnpj} />
                   <DetailItem label="E-mail Principal" value={client.email || client['email-pj']} />
                </CardContent>
            </Card>
            
            {client.type === 'Pessoa Física' && (
                <Card>
                    <CardHeader>
                        <CardTitle>Qualificação Pessoal</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <DetailItem label="Nacionalidade" value={client.nationality} />
                        <DetailItem label="Estado Civil" value={client.maritalStatus} />
                        <DetailItem label="Profissão" value={client.profession} />
                        <DetailItem label="RG" value={client.rg} />
                    </CardContent>
                </Card>
            )}

            {client.type === 'Pessoa Jurídica' && client.adminName && (
                <Card>
                    <CardHeader>
                        <CardTitle>Dados do Sócio Administrador</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <DetailItem label="Nome" value={client.adminName} />
                        <DetailItem label="CPF" value={client.adminCpf} />
                        <DetailItem label="RG" value={client.adminRg} />
                        <DetailItem label="E-mail" value={client.adminEmail} />
                        <DetailItem label="Nacionalidade" value={client.adminNationality} />
                        <DetailItem label="Estado Civil" value={client.adminMaritalStatus} />
                        <DetailItem label="Profissão" value={client.adminProfession} />
                    </CardContent>
                </Card>
            )}
            
            <Card>
                <CardHeader>
                    <CardTitle>Informações de Contato e Endereço</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <DetailItem label="Telefone" value={client.phone} />
                    <DetailItem label="Possui WhatsApp?" value={client.hasWhatsapp} />
                    <DetailItem label="Endereço Completo" value={client.address || client['address-pj']} />
                    <DetailItem label="Instagram" value={client.instagram} />
                    <DetailItem label="TikTok" value={client.tiktok} />
                    <DetailItem label="Facebook" value={client.facebook} />
                </CardContent>
            </Card>
        </div>
    );
}
    
