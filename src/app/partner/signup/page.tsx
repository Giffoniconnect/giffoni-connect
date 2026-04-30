
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/logo';
import { useAuth, useFirestore } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export type Partner = {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  createdAt?: any;
  nationality?: string;
  maritalStatus?: string;
  rg?: string;
  cpf?: string;
  oabNumber?: string;
  address?: string;
  phone?: string;
  instagram?: string;
  tiktok?: string;
  facebook?: string;
  bankDetails?: {
    pixKey?: string;
    pixKeyType?: 'CPF/CNPJ' | 'Celular' | 'E-mail' | 'Aleatória';
    bankName?: string;
    agency?: string;
    accountNumber?: string;
    accountType?: 'Corrente' | 'Poupança';
    accountHolderName?: string;
  };
  password?: string;
};

export default function SignupPartnerPage() {
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Partner>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

   const handleBankDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      bankDetails: {
        ...prev?.bankDetails,
        [id]: value
      }
    }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  
  const handleBankSelectChange = (id: keyof NonNullable<Partner['bankDetails']>, value: string) => {
    setFormData(prev => ({
      ...prev,
      bankDetails: {
        ...prev?.bankDetails,
        [id]: value
      }
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { email, password, name, company, role } = formData;

    if (!email || !password || !name || !company || !role) {
      toast({
        variant: 'destructive',
        title: 'Erro de Validação',
        description: 'Nome, E-mail, Senha, Empresa e Cargo são obrigatórios.',
      });
      setIsLoading(false);
      return;
    }
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const { password: _, ...partnerData } = formData;

      await setDoc(doc(firestore, 'partners', user.uid), {
        ...partnerData,
        id: user.uid,
        _searchableName: name.toLowerCase(),
        createdAt: serverTimestamp(),
      });
      
      toast({
        title: 'Parceiro Cadastrado!',
        description: `${name} foi adicionado com sucesso. Faça o login para continuar.`,
      });

      router.push('/partner/login');
    } catch (error: any) {
      console.error('Erro no cadastro do parceiro:', error);
      let description = 'Ocorreu um erro inesperado. Tente novamente.';
      if (error.code === 'auth/email-already-in-use') {
        description = 'Este endereço de e-mail já está em uso.';
      } else if (error.code === 'auth/weak-password') {
        description = 'A senha é muito fraca. Use pelo menos 6 caracteres.';
      }
      toast({
        variant: 'destructive',
        title: 'Falha no Cadastro',
        description,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-muted/40 py-12">
        <Button variant="outline" size="icon" onClick={() => router.back()} className="absolute top-4 left-4">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Voltar</span>
        </Button>
      <div className="mx-auto w-full max-w-2xl space-y-6 px-4">
        <div className="grid gap-2 text-center">
          <div className="flex justify-center">
            <Logo />
          </div>
          <h1 className="text-3xl font-bold">Cadastrar Novo Parceiro</h1>
          <p className="text-balance text-muted-foreground">
            Crie uma conta de parceiro para acessar o portal.
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardContent className="pt-6">
              <div className="space-y-8">
                {/* DADOS DE ACESSO */}
                <div className="space-y-4">
                    <CardTitle>Dados de Acesso</CardTitle>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <Label htmlFor="email">E-mail</Label>
                           <Input id="email" type="email" placeholder="parceiro@empresa.com" required onChange={handleInputChange} disabled={isLoading} />
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="password">Senha</Label>
                           <Input id="password" type="password" required onChange={handleInputChange} disabled={isLoading} />
                        </div>
                     </div>
                </div>

                {/* QUALIFICAÇÃO PROFISSIONAL */}
                <div className="space-y-4">
                    <CardTitle>Qualificação Profissional</CardTitle>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nome Completo</Label>
                            <Input id="name" placeholder="Nome do parceiro" required onChange={handleInputChange} disabled={isLoading} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="company">Empresa</Label>
                            <Input id="company" placeholder="Nome da empresa" required onChange={handleInputChange} disabled={isLoading} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">Cargo</Label>
                            <Input id="role" placeholder="Ex: Advogado, Contador" required onChange={handleInputChange} disabled={isLoading} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="oabNumber">Nº do Registro Profissional (OAB, etc)</Label>
                            <Input id="oabNumber" placeholder="MG123456" onChange={handleInputChange} disabled={isLoading} />
                        </div>
                    </div>
                </div>

                {/* QUALIFICAÇÃO PESSOAL */}
                 <div className="space-y-4">
                    <CardTitle>Qualificação Pessoal</CardTitle>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="nationality">Nacionalidade</Label>
                          <Input id="nationality" defaultValue="Brasileiro(a)" required onChange={handleInputChange} disabled={isLoading} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="maritalStatus">Estado Civil</Label>
                            <Select onValueChange={(value) => handleSelectChange('maritalStatus', value)} disabled={isLoading}>
                                <SelectTrigger id="maritalStatus"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                                    <SelectItem value="casado">Casado(a)</SelectItem>
                                    <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                                    <SelectItem value="viuvo">Viuvo(a)</SelectItem>
                                    <SelectItem value="uniao_estavel">União Estável</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="rg">RG</Label>
                          <Input id="rg" placeholder="00.000.000-0" required onChange={handleInputChange} disabled={isLoading} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cpf">CPF</Label>
                          <Input id="cpf" placeholder="000.000.000-00" required onChange={handleInputChange} disabled={isLoading} />
                        </div>
                    </div>
                </div>

                {/* CONTATO E REDES SOCIAIS */}
                <div className="space-y-4">
                    <CardTitle>Contato e Redes Sociais</CardTitle>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <Label htmlFor="phone">Telefone de Contato</Label>
                            <Input id="phone" placeholder="(00) 90000-0000" onChange={handleInputChange} disabled={isLoading} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="address">Endereço Completo</Label>
                            <Input id="address" placeholder="Rua, nº, Bairro, CEP, Cidade, Estado" required onChange={handleInputChange} disabled={isLoading} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="instagram">Instagram</Label>
                            <Input id="instagram" placeholder="@seuusuario" onChange={handleInputChange} disabled={isLoading} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="tiktok">TikTok</Label>
                            <Input id="tiktok" placeholder="@seuusuario" onChange={handleInputChange} disabled={isLoading} />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <Label htmlFor="facebook">Facebook</Label>
                            <Input id="facebook" placeholder="facebook.com/seu.usuario" onChange={handleInputChange} disabled={isLoading} />
                        </div>
                    </div>
                </div>

                {/* DADOS BANCÁRIOS */}
                <div className="space-y-4">
                    <CardTitle>Dados Bancários (para Repasses)</CardTitle>
                    <div className="space-y-2">
                        <Label htmlFor="accountHolderName">Titular da Conta</Label>
                        <Input id="accountHolderName" placeholder="Nome completo do titular" onChange={handleBankDetailsChange} disabled={isLoading} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <Label htmlFor="pixKeyType">Tipo da Chave Pix</Label>
                           <Select onValueChange={(value) => handleBankSelectChange('pixKeyType', value)} disabled={isLoading}>
                               <SelectTrigger id="pixKeyType"><SelectValue placeholder="Selecione o tipo..." /></SelectTrigger>
                               <SelectContent>
                                   <SelectItem value="CPF/CNPJ">CPF/CNPJ</SelectItem>
                                   <SelectItem value="Celular">Celular</SelectItem>
                                   <SelectItem value="E-mail">E-mail</SelectItem>
                                   <SelectItem value="Aleatória">Aleatória</SelectItem>
                               </SelectContent>
                           </Select>
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="pixKey">Chave Pix</Label>
                           <Input id="pixKey" placeholder="Sua chave pix" onChange={handleBankDetailsChange} disabled={isLoading} />
                        </div>
                    </div>
                    <p className="text-center text-sm text-muted-foreground">Ou informe os dados tradicionais:</p>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="bankName">Banco</Label>
                            <Input id="bankName" placeholder="Nome do Banco" onChange={handleBankDetailsChange} disabled={isLoading} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="agency">Agência</Label>
                            <Input id="agency" placeholder="0000" onChange={handleBankDetailsChange} disabled={isLoading} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="accountNumber">Conta (com dígito)</Label>
                            <Input id="accountNumber" placeholder="00000-0" onChange={handleBankDetailsChange} disabled={isLoading} />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <Label>Tipo de Conta</Label>
                        <RadioGroup onValueChange={(value) => handleBankSelectChange('accountType', value as 'Corrente' | 'Poupança')} className="flex gap-4" disabled={isLoading}>
                           <div className="flex items-center space-x-2"><RadioGroupItem value="Corrente" id="corrente" /><Label htmlFor="corrente">Corrente</Label></div>
                           <div className="flex items-center space-x-2"><RadioGroupItem value="Poupança" id="poupanca" /><Label htmlFor="poupanca">Poupança</Label></div>
                        </RadioGroup>
                     </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Cadastrar Parceiro'}
                </Button>
              </div>
            </CardContent>
          </form>
        </Card>
        <div className="mt-4 text-center text-sm">
          Já tem uma conta?{' '}
          <Link href="/partner/login" className="underline">
            Voltar para o Login
          </Link>
        </div>
      </div>
    </div>
  );
}
