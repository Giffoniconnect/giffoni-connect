
'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Users, Loader2, User, Briefcase, GraduationCap, Building } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import type { TeamMember } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Definição da hierarquia e seus respectivos cargos
const hierarchy = {
  socios: ['CEO - Sócio Fundador', 'Sócio', 'Sócia'],
  advogados: ['Advogado Associado', 'Advogada Associada'],
  estagiarios: ['Estagiário', 'Estagiária'],
  suporte: ['Gerente Jurídica', 'Secretária'],
};

const SectionTitle = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
  <div className="flex items-center gap-3 mb-6">
    <Icon className="h-6 w-6 text-primary" />
    <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
  </div>
);


export default function TeamPage() {
  const firestore = useFirestore();
  const teamRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'team'), orderBy('createdAt', 'asc'));
  }, [firestore]);
  const { data: team, isLoading } = useCollection<TeamMember>(teamRef);

  const { socios, advogados, estagiarios, suporte } = useMemo(() => {
    if (!team) return { socios: [], advogados: [], estagiarios: [], suporte: [] };

    return {
      socios: team.filter(m => hierarchy.socios.includes(m.role)),
      advogados: team.filter(m => hierarchy.advogados.includes(m.role)),
      estagiarios: team.filter(m => hierarchy.estagiarios.includes(m.role)),
      suporte: team.filter(m => hierarchy.suporte.includes(m.role)),
    };
  }, [team]);


  const renderTeamGrid = (members: TeamMember[], gridClass: string) => {
    if (members.length === 0) return null;

    return (
      <div className={cn("grid gap-6 w-full", gridClass)}>
        {members.map((member) => (
          <Card key={member.id} className="text-center flex flex-col">
            <CardHeader className="items-center pt-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={member.avatarUrl} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-center">
              <p className="font-semibold text-lg">{member.name}</p>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </CardContent>
            <CardFooter className="flex-col gap-2 p-4">
                <Link href={`/about/team/${member.id}`} className='w-full'>
                    <Button variant="outline" className="w-full">Ver Detalhes</Button>
                </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };


  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Nossa Equipe</h1>
          <p className="text-muted-foreground">
            Conheça os profissionais que fazem parte da Giffoni Advogados Associados.
          </p>
        </div>
        <Card>
          <CardContent className="p-6">
            {isLoading ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <div className="space-y-12">
                {socios.length > 0 && (
                    <div className="flex flex-col items-center">
                        <SectionTitle icon={User} title="Sócios" />
                        {renderTeamGrid(socios, "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 max-w-2xl")}
                    </div>
                )}
                {advogados.length > 0 && (
                    <div className="flex flex-col items-center">
                        <SectionTitle icon={Briefcase} title="Advogados Associados" />
                        {renderTeamGrid(advogados, "grid-cols-1 sm:grid-cols-2 max-w-2xl")}
                    </div>
                )}
                {estagiarios.length > 0 && (
                    <div className="flex flex-col items-center">
                        <SectionTitle icon={GraduationCap} title="Estagiários" />
                        {renderTeamGrid(estagiarios, "grid-cols-1 sm:grid-cols-2 max-w-2xl")}
                    </div>
                )}
                 {suporte.length > 0 && (
                    <div className="flex flex-col items-center">
                        <SectionTitle icon={Building} title="Suporte Administrativo/Jurídico" />
                        {renderTeamGrid(suporte, "grid-cols-1 sm:grid-cols-2 max-w-2xl")}
                    </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
