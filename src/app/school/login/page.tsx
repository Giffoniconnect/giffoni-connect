'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2, GraduationCap } from 'lucide-react';
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

export default function SchoolLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement actual login logic for students
    toast({
      title: 'Em Construção',
      description: 'O login do Portal do Aluno será implementado em breve.',
    });
    setIsLoading(false);
  };

  const handlePasswordReset = async () => {
    if (!resetEmail) {
      toast({
        variant: 'destructive',
        title: 'Campo obrigatório',
        description: 'Por favor, insira seu e-mail para redefinir a senha.',
      });
      return;
    }
    setIsLoading(true);
    // TODO: Implement actual password reset logic
    setTimeout(() => {
        toast({
            title: 'E-mail enviado!',
            description: `(Simulado) Um e-mail de redefinição foi enviado para ${resetEmail}.`,
        });
        setIsLoading(false);
    }, 1500)
  };

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto grid w-[380px] gap-6">
        <div className="grid gap-2 text-center">
          <GraduationCap className="mx-auto h-12 w-12 text-primary" />
          <h1 className="text-3xl font-bold">Portal do Aluno</h1>
          <p className="text-balance text-muted-foreground">
            Acesso exclusivo para alunos da Giffoni School.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="aluno@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                   <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button type="button" className="ml-auto inline-block text-sm underline" disabled={isLoading}>
                          Esqueceu sua senha?
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Redefinir Senha</AlertDialogTitle>
                          <AlertDialogDescription>
                            Digite seu e-mail para receber um link de redefinição de senha.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="grid gap-2">
                          <Label htmlFor="reset-email">E-mail</Label>
                          <Input
                            id="reset-email"
                            type="email"
                            placeholder="seu.email@giffoni.com"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                          />
                        </div>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={handlePasswordReset}>Enviar E-mail</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Entrar'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        <div className="mt-4 text-center text-sm">
          Não é aluno?{' '}
          <Link href="/school/home" className="underline">
            Voltar para a Giffoni School
          </Link>
        </div>
      </div>
    </div>
  );
}
