'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Database, Users, Handshake, Briefcase, LucideIcon } from 'lucide-react';

// --- Data Mockup ---
// Em um cenário real, estes dados viriam de uma API de backend que se conecta ao Google Cloud/Firebase Usage API.
const mockUsageData = {
    totalCapacity: 1024, // MB (1GB)
    subBarsData: [
        { name: 'Clientes (clients)', usage: 120, icon: Users },
        { name: 'Parceiros (partners)', usage: 50, icon: Handshake },
        { name: 'Colaboradores (collaborators)', usage: 30, icon: Briefcase },
        { name: 'Outros (team, hubs, etc.)', usage: 50, icon: Database },
    ]
};

// --- Helper Functions & Components ---

const getUsageColor = (percentage: number): string => {
    if (percentage > 75) return 'bg-red-500';
    if (percentage > 40) return 'bg-yellow-500';
    return 'bg-green-500';
};

const UsageBar = ({ title, usage, capacity, icon: Icon }: { title: string; usage: number; capacity: number; icon?: LucideIcon }) => {
    const percentage = (usage / capacity) * 100;
    const colorClass = getUsageColor(percentage);

    return (
        <div>
            <div className="flex justify-between mb-1">
                <div className="flex items-center gap-2 text-sm font-medium">
                    {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
                    <span>{title}</span>
                </div>
                <span className="text-sm text-muted-foreground">{usage} MB</span>
            </div>
            <Progress value={percentage} className="h-2 [&>*]:bg-primary" indicatorClassName={colorClass} />
        </div>
    );
};


export default function CapacityPage() {
    const totalUsage = mockUsageData.subBarsData.reduce((acc, bar) => acc + bar.usage, 0);
    const totalCapacity = mockUsageData.totalCapacity;
    const totalUsagePercentage = (totalUsage / totalCapacity) * 100;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Gerenciamento de Capacidade do Sistema</h1>
        <p className="text-muted-foreground">
          Monitore o uso de armazenamento dos bancos de dados do Firebase (Firestore).
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Capacidade de Armazenamento do Firebase (Firestore)</CardTitle>
          <CardDescription>
            Representação visual do uso de dados, com cores indicando o nível de uso para diagnóstico rápido. Atualmente, os dados são simulados.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
            {/* Main Usage Bar */}
            <div>
                <div className="flex justify-between mb-1 text-sm font-medium">
                    <span className="font-bold">Uso Total</span>
                    <span className="font-bold">{totalUsage} MB / {totalCapacity / 1024} GB</span>
                </div>
                <Progress 
                    value={totalUsagePercentage} 
                    indicatorClassName={getUsageColor(totalUsagePercentage)}
                />
                 <div className="flex justify-end text-xs text-muted-foreground mt-1">
                    ({totalUsagePercentage.toFixed(2)}% da capacidade total)
                </div>
            </div>

            {/* Sub-bars for each database/collection */}
            <div className="space-y-6 border-t pt-6">
                 <h3 className="font-semibold text-lg">Uso por Banco de Dados (Coleção)</h3>
                {mockUsageData.subBarsData.map(bar => (
                    <UsageBar
                        key={bar.name}
                        title={bar.name}
                        usage={bar.usage}
                        capacity={totalCapacity}
                        icon={bar.icon}
                    />
                ))}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
