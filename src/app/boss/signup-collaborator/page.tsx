
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
import { Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

const brazilianStates = [
    { value: 'AC', label: 'AC' }, { value: 'AL', label: 'AL' }, { value: 'AP', label: 'AP' }, 
    { value: 'AM', label: 'AM' }, { value: 'BA', label: 'BA' }, { value: 'CE', label: 'CE' }, 
    { value: 'DF', label: 'DF' }, { value: 'ES', label: 'ES' }, { value: 'GO', label: 'GO' }, 
    { value: 'MA', label: 'MA' }, { value: 'MT', label: 'MT' }, { value: 'MS', label: 'MS' }, 
    { value: 'MG', label: 'MG' }, { value: 'PA', label: 'PA' }, { value: 'PB', label: 'PB' }, 
    { value: 'PR', label: 'PR' }, { value: 'PE', label: 'PE' }, { value: 'PI', label: 'PI' }, 
    { value: 'RJ', label: 'RJ' }, { value: 'RN', label: 'RN' }, { value: 'RS', label: 'RS' }, 
    { value: 'RO', label: 'RO' }, { value: 'RR', label: 'RR' }, { value: 'SC', label: 'SC' }, 
    { value: 'SP', label: 'SP' }, { value: 'SE', label: 'SE' }, { value: 'TO', label: 'TO' }
  ];


export default function SignupCollaboratorPage() {
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [collaboratorType, setCollaboratorType] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [id]: value }));
  };
  
  const handleBankDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev:any) => ({
      ...prev,
      bankDetails: {
        ...prev?.bankDetails,
        [id]: value
      }
    }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [id]: value }));
    if (id === 'collaboratorType') {
        setCollaboratorType(value);
    }
  };
  
  const handleBankSelectChange = (id: string, value: string) => {
    setFormData((prev:any) => ({
      ...prev,
      bankDetails: {
        ...prev?.bankDetails,
        [id]: value
      }
    }));
  };

  const handleRadioChange = (id: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [id]: value }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { email, password, name } = formData;

    if (!email || !password || !name) {
      toast({
        variant: 'destructive',
        title: 'Erro de Validação',
        description: 'Nome, e-mail e senha são obrigatórios.',
      });
      setIsLoading(false);
      return;
    }
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const { password: _, ...collaboratorData } = formData;

      await setDoc(doc(firestore, 'collaborators', user.uid), {
        ...collaboratorData,
        uid: user.uid,
        createdAt: serverTimestamp(),
      });
      
      // Also add to 'team' collection to appear on the public site
      await setDoc(doc(firestore, 'team', user.uid), {
        name,
        role: formData.collaboratorType || 'Colaborador',
        avatarUrl: `https://picsum.photos/seed/${user.uid}/200`,
        createdAt: serverTimestamp(),
      });

      toast({
        title: 'Colaborador Cadastrado!',
        description: `${name} foi adicionado com sucesso.`,
      });

      router.push('/boss/login');
    } catch (error: any) {
      console.error('Erro no cadastro do colaborador:', error);
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
    <div className="flex min-h-screen items-center justify-center bg-muted/40 py-12">
      <div className="mx-auto w-full max-w-3xl space-y-6 px-4">
        <div className="grid gap-2 text-center">
          <div className="flex justify-center">
            <Logo />
          </div>
          <h1 className="text-3xl font-bold">Cadastrar Novo Colaborador</h1>
          <p className="text-balance text-muted-foreground">
            Crie uma conta de acesso para um novo membro da equipe.
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardContent className="pt-6 space-y-8">
                {/* DADOS DE ACESSO */}
                <div className="space-y-4">
                    <CardTitle>Dados de Acesso</CardTitle>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <Label htmlFor="email">E-mail de Acesso</Label>
                           <Input id="email" type="email" placeholder="colaborador@giffoni.com" required onChange={handleInputChange} disabled={isLoading} />
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="password">Senha</Label>
                           <Input id="password" type="password" required onChange={handleInputChange} disabled={isLoading} />
                        </div>
                     </div>
                </div>

                {/* DADOS PESSOAIS */}
                <div className="space-y-4">
                    <CardTitle>Dados Pessoais</CardTitle>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2 space-y-2">
                            <Label htmlFor="name">Nome Completo</Label>
                            <Input id="name" placeholder="Nome do colaborador" required onChange={handleInputChange} disabled={isLoading} />
                        </div>
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
                    </div>
                </div>

                {/* ENDEREÇO */}
                <div className="space-y-4 rounded-md border p-4">
                    <Label className="font-medium">Endereço Completo</Label>
                    <div className="grid grid-cols-1 gap-y-4 gap-x-4 md:grid-cols-6">
                        <div className="md:col-span-4"><Label htmlFor="street">Rua</Label><Input id="street" required onChange={handleInputChange} disabled={isLoading} /></div>
                        <div className="md:col-span-2"><Label htmlFor="number">Número</Label><Input id="number" required onChange={handleInputChange} disabled={isLoading} /></div>
                        <div className="md:col-span-3"><Label htmlFor="complement">Complemento</Label><Input id="complement" placeholder="Apto, Bloco, etc." onChange={handleInputChange} disabled={isLoading} /></div>
                        <div className="md:col-span-3"><Label htmlFor="neighborhood">Bairro</Label><Input id="neighborhood" required onChange={handleInputChange} disabled={isLoading} /></div>
                        <div className="md:col-span-3"><Label htmlFor="city">Cidade</Label><Input id="city" required onChange={handleInputChange} disabled={isLoading} /></div>
                        <div className="md:col-span-1"><Label htmlFor="state">Estado</Label>
                            <Select onValueChange={(value) => handleSelectChange('state', value)} disabled={isLoading}><SelectTrigger id="state"><SelectValue placeholder="UF" /></SelectTrigger>
                                <SelectContent>{brazilianStates.map(state => (<SelectItem key={state.value} value={state.value}>{state.label}</SelectItem>))}</SelectContent>
                            </Select>
                        </div>
                        <div className="md:col-span-2"><Label htmlFor="zipCode">CEP</Label><Input id="zipCode" required onChange={handleInputChange} disabled={isLoading} /></div>
                    </div>
                </div>
                 
                {/* CONTATO */}
                <div className="space-y-4">
                     <CardTitle>Contato</CardTitle>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <Label htmlFor="phone">Telefone de Contato</Label>
                           <Input id="phone" type="tel" placeholder="(00) 90000-0000" onChange={handleInputChange} disabled={isLoading} />
                       </div>
                       <div className="space-y-2">
                           <Label htmlFor="professionalEmail">E-mail Profissional</Label>
                           <Input id="professionalEmail" type="email" placeholder="nome.sobrenome@giffoni.com" onChange={handleInputChange} disabled={isLoading} />
                       </div>
                     </div>
                </div>

                {/* DADOS PROFISSIONAIS */}
                <div className="space-y-4">
                    <CardTitle>Dados Profissionais</CardTitle>
                    <div className="space-y-2">
                        <Label htmlFor="collaboratorType">Tipo de Colaborador</Label>
                        <Select onValueChange={(value) => handleSelectChange('collaboratorType', value)} required disabled={isLoading}>
                            <SelectTrigger id="collaboratorType"><SelectValue placeholder="Selecione o tipo..." /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Advogado">Advogado(a)</SelectItem>
                                <SelectItem value="Estagiário">Estagiário(a)</SelectItem>
                                <SelectItem value="Secretaria">Secretaria</SelectItem>
                                <SelectItem value="Perito">Perito(a)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {collaboratorType === 'Advogado' && (
                         <div className="space-y-4 rounded-md border p-4">
                            <Label className="font-medium">Dados da OAB</Label>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="oabNumber">Número da Inscrição</Label>
                                    <Input id="oabNumber" placeholder="MG123456" required onChange={handleInputChange} disabled={isLoading} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="oabState">UF da Inscrição</Label>
                                    <Select onValueChange={(value) => handleSelectChange('oabState', value)} required disabled={isLoading}>
                                        <SelectTrigger id="oabState"><SelectValue placeholder="Selecione o estado..." /></SelectTrigger>
                                        <SelectContent>{brazilianStates.map(state => (<SelectItem key={state.value} value={state.value}>{state.label}</SelectItem>))}</SelectContent>
                                    </Select>
                                </div>
                             </div>
                         </div>
                    )}

                    {collaboratorType === 'Estagiário' && (
                         <div className="space-y-4 rounded-md border p-4">
                            <Label className="font-medium">Dados da Faculdade</Label>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2 space-y-2">
                                    <Label htmlFor="universityName">Nome da Faculdade</Label>
                                    <Input id="universityName" onChange={handleInputChange} disabled={isLoading} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="universityPhone">Telefone da Faculdade</Label>
                                    <Input id="universityPhone" type="tel" onChange={handleInputChange} disabled={isLoading} />
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="universityEmail">E-mail da Faculdade</Label>
                                    <Input id="universityEmail" type="email" onChange={handleInputChange} disabled={isLoading} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="currentSemester">Período</Label>
                                    <Input id="currentSemester" type="number" onChange={handleInputChange} disabled={isLoading} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Tipo de Estágio</Label>
                                    <RadioGroup onValueChange={(value) => handleRadioChange('internshipType', value)} className="flex gap-4" disabled={isLoading}>
                                        <div className="flex items-center space-x-2"><RadioGroupItem value="obrigatorio" id="obrigatorio" /><Label htmlFor="obrigatorio">Obrigatório</Label></div>
                                        <div className="flex items-center space-x-2"><RadioGroupItem value="nao_obrigatorio" id="nao_obrigatorio" /><Label htmlFor="nao_obrigatorio">Não Obrigatório</Label></div>
                                    </RadioGroup>
                                </div>
                             </div>
                         </div>
                    )}

                    {collaboratorType === 'Perito' && (
                         <div className="space-y-2">
                            <Label htmlFor="expertiseArea">Área de Atuação da Perícia</Label>
                            <Input id="expertiseArea" placeholder="Ex: Contábil, Médica, Engenharia" onChange={handleInputChange} disabled={isLoading} />
                        </div>
                    )}
                </div>

                {/* DADOS BANCÁRIOS */}
                <div className="space-y-4">
                    <CardTitle>Dados Bancários (para Pagamentos)</CardTitle>
                    <div className="space-y-2"><Label htmlFor="accountHolderName">Titular da Conta</Label><Input id="accountHolderName" placeholder="Nome completo do titular" onChange={handleBankDetailsChange} disabled={isLoading} /></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2"><Label htmlFor="pixKeyType">Tipo da Chave Pix</Label>
                            <Select onValueChange={(value) => handleBankSelectChange('pixKeyType', value)} disabled={isLoading}><SelectTrigger id="pixKeyType"><SelectValue placeholder="Selecione o tipo..." /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="CPF/CNPJ">CPF/CNPJ</SelectItem><SelectItem value="Celular">Celular</SelectItem><SelectItem value="E-mail">E-mail</SelectItem><SelectItem value="Aleatória">Aleatória</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2"><Label htmlFor="pixKey">Chave Pix</Label><Input id="pixKey" placeholder="Sua chave pix" onChange={handleBankDetailsChange} disabled={isLoading} /></div>
                    </div>
                    <p className="text-center text-sm text-muted-foreground">Ou informe os dados tradicionais:</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2"><Label htmlFor="bankName">Banco</Label><Input id="bankName" placeholder="Nome do Banco" onChange={handleBankDetailsChange} disabled={isLoading} /></div>
                        <div className="space-y-2"><Label htmlFor="agency">Agência</Label><Input id="agency" placeholder="0000" onChange={handleBankDetailsChange} disabled={isLoading} /></div>
                        <div className="space-y-2"><Label htmlFor="accountNumber">Conta (com dígito)</Label><Input id="accountNumber" placeholder="00000-0" onChange={handleBankDetailsChange} disabled={isLoading} /></div>
                    </div>
                    <div className="space-y-2"><Label>Tipo de Conta</Label>
                        <RadioGroup onValueChange={(value) => handleBankSelectChange('accountType', value)} className="flex gap-4" disabled={isLoading}>
                            <div className="flex items-center space-x-2"><RadioGroupItem value="Corrente" id="corrente" /><Label htmlFor="corrente">Corrente</Label></div>
                            <div className="flex items-center space-x-2"><RadioGroupItem value="Poupança" id="poupanca" /><Label htmlFor="poupanca">Poupança</Label></div>
                        </RadioGroup>
                    </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Cadastrar Colaborador'}
                </Button>
            </CardContent>
          </form>
        </Card>
        <div className="mt-4 text-center text-sm">
          Já cadastrado?{' '}
          <Link href="/boss/login" className="underline" prefetch={false}>
            Voltar para o Login
          </Link>
        </div>
      </div>
    </div>
  );
}
