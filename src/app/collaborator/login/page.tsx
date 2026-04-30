'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/logo';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useAuth, useFirestore } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
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

export default function CollaboratorLoginPage() {
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(firestore, 'collaborators', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        router.push('/collaborator/dashboard');
      } else {
        await auth.signOut();
        throw new Error('Acesso não autorizado.');
      }
    } catch (error: any) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Falha no Login',
        description: error.message === 'Acesso não autorizado.' ? 'Apenas membros da equipe podem acessar esta área.' : 'Credenciais inválidas. Verifique seu e-mail e senha.',
      });
    } finally {
      setIsLoading(false);
    }
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
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      toast({
        title: 'E-mail enviado!',
        description: 'Verifique sua caixa de entrada para redefinir sua senha.',
      });
    } catch (error: any) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Falha ao enviar e-mail',
        description: 'Não foi possível enviar o e-mail de redefinição. Verifique o endereço e tente novamente.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-muted/40 p-4">
        <Link href="/" className="absolute top-4 right-4">
            <Button>Voltar</Button>
        </Link>
        <div className="mx-auto grid w-[380px] gap-6">
          <div className="grid gap-2 text-center">
            <Logo className="mx-auto mb-4" />
            <h1 className="text-3xl font-bold">Área do Colaborador</h1>
            <p className="text-balance text-muted-foreground">
              Acesso exclusivo para a equipe.
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="colaborador@giffoni.com"
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
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} required/>
                </div>
                <div className="flex flex-col gap-2">
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Entrar'}
                    </Button>
                    <Link href="/collaborator/signup">
                      <Button variant="outline" className="w-full" disabled={isLoading}>
                          Cadastrar novo colaborador
                      </Button>
                    </Link>
                </div>
              </form>
            </CardContent>
          </Card>
           <div className="mt-4 text-center text-sm">
            &copy; {new Date().getFullYear()} Giffoni Advogados Associados
          </div>
        </div>
      </div>
  );
}
