'use client';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, User, Handshake } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const logTypes = [
    {
        title: "Logs de Acesso Clientes",
        description: "Consulte o histórico de logins e atividades de segurança dos clientes.",
        href: "/boss/security-logs",
        icon: User,
    },
    {
        title: "Logs de Acesso Parceiro",
        description: "Consulte o histórico de logins e atividades de segurança dos parceiros.",
        href: "/boss/partner-logs",
        icon: Handshake,
    },
];

export default function AccessLogsHubPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => router.push('/boss/developer-hub')}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Logs de Acesso</h1>
                    <p className="text-muted-foreground">
                        Selecione o tipo de log que deseja consultar.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {logTypes.map((log) => (
                    <Card key={log.title} className="flex flex-col justify-between hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                <log.icon className="h-6 w-6 text-primary" />
                                {log.title}
                            </CardTitle>
                            <CardDescription>{log.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link href={log.href}>
                                <Button className="w-full">
                                    Ver Logs
                                    <ArrowRight className="ml-auto h-4 w-4" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
