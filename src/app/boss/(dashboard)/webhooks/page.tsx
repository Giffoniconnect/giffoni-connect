
'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Network, ArrowRight, CornerDownRight } from 'lucide-react';


const webhooksData = [
    {
        id: 'wh-001',
        name: 'Agendamento de Reunião via Website',
        sourceApp: 'Website (Formulário de Contato)',
        destinationApp: 'Google Agenda',
        trigger: 'Quando um cliente preenche o formulário de contato solicitando uma reunião.',
        dataSent: [
            'Nome do Cliente',
            'E-mail do Cliente',
            'Telefone do Cliente',
            'Sugestão de data/hora',
            'Assunto da Reunião'
        ],
        action: 'Cria um evento preliminar na agenda "Novos Agendamentos" e envia um convite para o cliente e para a equipe interna responsável.'
    }
];

const InfoBlock = ({ label, children }: { label: string, children: React.ReactNode }) => (
    <div className="space-y-1">
        <p className="text-sm font-semibold text-muted-foreground">{label}</p>
        <div className="text-foreground">{children}</div>
    </div>
);


export default function WebhooksPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Base de Webhooks</h1>
        <p className="text-muted-foreground">
          Mapa de automações que conectam o ecossistema Giffoni Connect.
        </p>
      </div>

        {webhooksData.map(webhook => (
            <Card key={webhook.id}>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Network className="h-6 w-6 text-primary" />
                        {webhook.name}
                    </CardTitle>
                    <CardDescription>
                        Fluxo de automação que conecta diferentes aplicativos para otimizar processos.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between rounded-lg border p-4 gap-4">
                        <div className="font-semibold text-lg text-center sm:text-left">{webhook.sourceApp}</div>
                        <ArrowRight className="h-6 w-6 text-primary flex-shrink-0" />
                        <div className="font-semibold text-lg text-center sm:text-left">{webhook.destinationApp}</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InfoBlock label="Gatilho (O que inicia a automação?)">
                            <p>{webhook.trigger}</p>
                        </InfoBlock>

                        <InfoBlock label="Ação no Destino (O que acontece depois?)">
                           <p>{webhook.action}</p>
                        </InfoBlock>
                    </div>

                    <InfoBlock label="Dados Enviados (Quais informações são transferidas?)">
                        <ul className="space-y-2">
                            {webhook.dataSent.map((data, index) => (
                                <li key={index} className="flex items-center gap-2 text-sm">
                                    <CornerDownRight className="h-4 w-4 text-muted-foreground" />
                                    <span>{data}</span>
                                </li>
                            ))}
                        </ul>
                    </InfoBlock>
                </CardContent>
            </Card>
        ))}

        <Card className="border-dashed">
             <CardHeader>
                <CardTitle className="text-muted-foreground">Novo Webhook</CardTitle>
             </CardHeader>
             <CardContent className="text-center text-muted-foreground">
                Novas automações aparecerão aqui à medida que forem implementadas.
             </CardContent>
        </Card>

    </div>
  );
}
