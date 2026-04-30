
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { TeamMember } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function MemberProfilePage() {
  const router = useRouter();
  const params = useParams();
  const memberId = params.memberId as string;
  const firestore = useFirestore();

  const memberRef = useMemoFirebase(() => {
    if (!firestore || !memberId) return null;
    return doc(firestore, 'team', memberId);
  }, [firestore, memberId]);

  const { data: member, isLoading } = useDoc<TeamMember>(memberRef);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center py-10">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!member) {
    return (
      <div className="container py-8 text-center">
        <h1 className="text-2xl font-bold">Membro não encontrado</h1>
        <p className="text-muted-foreground mt-2">
          O membro da equipe que você está procurando não existe.
        </p>
        <Button onClick={() => router.push('/about/team')} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para a Equipe
        </Button>
      </div>
    );
  }
  
  const isAdvogado = member.role.toLowerCase().includes('advogad') || member.role.toLowerCase().includes('sóci');


  return (
    <div className="container py-8">
      <div className="flex items-start gap-8 flex-col md:flex-row">
        <div className="flex-shrink-0 w-full md:w-1/4 flex flex-col items-center gap-4">
            <Avatar className="h-48 w-48 shadow-lg">
            <AvatarImage src={member.avatarUrl} alt={member.name} />
            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
            </Avatar>
             <Button onClick={() => router.back()} variant="outline" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
            </Button>
        </div>
        <div className="flex-1">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl">{member.name}</CardTitle>
                    <p className="text-lg text-primary">{member.role}</p>
                    {isAdvogado && member.oab && (
                        <p className="text-sm text-muted-foreground font-mono">OAB/MG {member.oab}</p>
                    )}
                </CardHeader>
                <CardContent>
                    <h3 className="font-semibold text-lg mb-2">Descrição Curricular</h3>
                    <p className="text-muted-foreground text-justify">
                        {member.bio || 'A biografia deste membro da equipe será adicionada em breve.'}
                    </p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
