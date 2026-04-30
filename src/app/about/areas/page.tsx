
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, orderBy, query } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { iconMap, IconName } from '@/lib/icon-map';
import { useMemo } from 'react';

type PracticeArea = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: IconName;
};

export default function AreasPage() {
  const firestore = useFirestore();

  const areasRef = useMemoFirebase(
    () => (firestore ? query(collection(firestore, 'practice_areas'), orderBy('title', 'asc')) : null),
    [firestore]
  );
  const { data: practiceAreas, isLoading } = useCollection<PracticeArea>(areasRef);

  const IconComponent = ({ iconName }: { iconName: IconName }) => {
    const Icon = useMemo(() => iconMap[iconName] || null, [iconName]);
    if (!Icon) return null;
    return <Icon className="h-6 w-6 text-primary" />;
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Áreas de Atuação</h1>
          <p className="text-muted-foreground">
            Explore nossas áreas de especialização. Cada card representa um campo de atuação do nosso escritório.
          </p>
        </div>
        
        {isLoading ? (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        ) : practiceAreas && practiceAreas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {practiceAreas.map((area) => (
                <Link href={area.href} key={area.id} className="block hover:shadow-lg transition-shadow rounded-lg">
                <Card className="h-full flex flex-col justify-between cursor-pointer">
                    <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <IconComponent iconName={area.icon} />
                        <span>{area.title}</span>
                    </CardTitle>
                    </CardHeader>
                    <CardContent>
                    <p className="text-sm text-muted-foreground">{area.description}</p>
                    </CardContent>
                </Card>
                </Link>
            ))}
            </div>
        ) : (
            <div className="text-center text-muted-foreground py-16">
                Nenhuma área de atuação encontrada.
            </div>
        )}
      </div>
    </div>
  );
}
