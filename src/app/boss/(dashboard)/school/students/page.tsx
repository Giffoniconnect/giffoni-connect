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
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2, Users } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function StudentManagementPage() {
  const { toast } = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<any>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [id]: value }));
  };
  
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
    
    // TODO: Implement actual student creation logic
    console.log("Creating student:", formData);
    
    setTimeout(() => {
        toast({
            title: 'Aluno Cadastrado! (Simulado)',
            description: `${name} foi adicionado com sucesso.`,
        });
        setIsLoading(false);
        // Optionally reset form
        setFormData({});
        // router.push('/boss/school'); // Or redirect to a student list
    }, 1500);

  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Área do Aluno</h1>
        <p className="text-muted-foreground">
            Gerencie e cadastre os alunos da Giffoni School.
        </p>
      </div>
      
      <Card>
          <CardHeader>
              <CardTitle>Cadastrar Novo Aluno</CardTitle>
              <CardDescription>Crie uma conta de acesso para um novo aluno.</CardDescription>
          </CardHeader>
          <CardContent>
             <form onSubmit={handleSubmit} className="space-y-8">
                {/* DADOS DE ACESSO */}
                <div className="space-y-4">
                    <h3 className="font-semibold">Dados de Acesso</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <Label htmlFor="email">E-mail de Acesso</Label>
                           <Input id="email" type="email" placeholder="aluno@giffoni.com" required onChange={handleInputChange} disabled={isLoading} />
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="password">Senha</Label>
                           <Input id="password" type="password" required onChange={handleInputChange} disabled={isLoading} />
                        </div>
                     </div>
                </div>

                {/* DADOS PESSOAIS */}
                <div className="space-y-4">
                    <h3 className="font-semibold">Dados Pessoais</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2 space-y-2">
                            <Label htmlFor="name">Nome Completo</Label>
                            <Input id="name" placeholder="Nome do aluno" required onChange={handleInputChange} disabled={isLoading} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Telefone</Label>
                            <Input id="phone" type="tel" onChange={handleInputChange} disabled={isLoading} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cpf">CPF</Label>
                            <Input id="cpf" onChange={handleInputChange} disabled={isLoading} />
                        </div>
                    </div>
                </div>
                 
                <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Cadastrar Aluno'}
                </Button>
            </form>
          </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><Users /> Lista de Alunos</CardTitle>
            <CardDescription>A lista de alunos cadastrados aparecerá aqui.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex flex-col items-center justify-center h-full min-h-[150px] text-center rounded-lg border-2 border-dashed">
                <p className="text-muted-foreground">
                    Tabela de gerenciamento de alunos em construção.
                </p>
            </div>
        </CardContent>
      </Card>

    </div>
  );
}
