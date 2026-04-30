'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { AlertTriangle, Bell, BellOff } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function FeatureFlagsPage() {
    const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
    const [isClientAuthDisabled, setIsClientAuthDisabled] = useState(true);
    const [isBusinessAuthDisabled, setIsBusinessAuthDisabled] = useState(true);
    const [isAssessoriaAuthDisabled, setIsAssessoriaAuthDisabled] = useState(true);
    const [isCollaboratorDataAccessActive, setIsCollaboratorDataAccessActive] = useState(true);


    const handleAuthToggle = (portal: 'client' | 'business' | 'assessoria', checked: boolean) => {
        switch (portal) {
            case 'client':
                setIsClientAuthDisabled(checked);
                break;
            case 'business':
                setIsBusinessAuthDisabled(checked);
                break;
            case 'assessoria':
                setIsAssessoriaAuthDisabled(checked);
                break;
        }
        if (checked) {
            // Automatically enable maintenance mode if any auth is disabled
            setIsMaintenanceMode(true);
        }
    };

    const handleMaintenanceToggle = (checked: boolean) => {
        setIsMaintenanceMode(checked);
    }

    const authControls = [
        {
            id: 'client-auth',
            label: 'Portal do Cliente',
            description: 'Acesso principal dos clientes aos seus casos e documentos.',
            checked: isClientAuthDisabled,
            onCheckedChange: (checked: boolean) => handleAuthToggle('client', checked)
        },
        {
            id: 'business-auth',
            label: 'Portal Giffoni Business',
            description: 'Acesso dos clientes de consultoria de negócios.',
            checked: isBusinessAuthDisabled,
            onCheckedChange: (checked: boolean) => handleAuthToggle('business', checked)
        },
        {
            id: 'assessoria-auth',
            label: 'Portal Giffoni Assessoria',
            description: 'Acesso dos clientes de assessoria jurídica contínua.',
            checked: isAssessoriaAuthDisabled,
            onCheckedChange: (checked: boolean) => handleAuthToggle('assessoria', checked)
        },
    ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Habilitar e Desabilitar Funções</h1>
        <p className="text-muted-foreground">
          Painel de controle para ativar e desativar funcionalidades críticas do sistema (Modo Desenvolvedor).
        </p>
      </div>

      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Atenção: Modo Desenvolvedor</AlertTitle>
        <AlertDescription>
          Alterar estas configurações pode impactar drasticamente a disponibilidade e segurança do sistema. Use com extrema cautela.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Controle de Manutenção do Site</CardTitle>
          <CardDescription>
            Ativar esta opção coloca todo o site em modo de manutenção, tornando-o inacessível para todos os usuários.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 rounded-md border p-4">
            <div className="flex-1 space-y-2">
                <p className="text-sm font-medium leading-none">Tirar o site inteiro do ar</p>
                <div className="text-sm text-muted-foreground">
                    <p><span className="font-mono bg-muted px-1 rounded-sm">Linguagem Técnica:</span> Ativar "Maintenance Mode"</p>
                    <p className="mt-1"><strong className="text-green-600">Efeito (Ligado):</strong> O site inteiro fica inacessível e exibe uma página de manutenção.</p>
                    <p><strong className="text-red-600">Efeito (Desligado):</strong> O site opera normalmente para todos os usuários.</p>
                </div>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                    <div className="flex flex-col items-center gap-1">
                         <span className={`text-xs font-bold ${isMaintenanceMode ? 'text-destructive' : 'text-green-500'}`}>
                            {isMaintenanceMode ? 'Ligado' : 'Desligado'}
                        </span>
                        <div className="flex items-center space-x-2">
                            {isMaintenanceMode ? <BellOff className="text-destructive"/> : <Bell className="text-green-500"/>}
                            <Switch
                                id="maintenance-mode"
                                checked={isMaintenanceMode}
                                onCheckedChange={handleMaintenanceToggle}
                            />
                        </div>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-destructive font-bold">RISCO ALTO: Esta ação torna o site indisponível para todos os usuários.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Controle de Autenticação</CardTitle>
          <CardDescription>
            Desabilita a verificação de login e senha para os portais, permitindo acesso direto para fins de desenvolvimento.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {authControls.map((control) => (
               <div key={control.id} className="flex items-center space-x-4 rounded-md border p-4">
                <div className="flex-1 space-y-2">
                    <p className="text-sm font-medium leading-none">Desativar autenticação do <span className="font-bold">{control.label}</span></p>
                    <div className="text-sm text-muted-foreground">
                        <p><span className="font-mono bg-muted px-1 rounded-sm">Linguagem Técnica:</span> Bypass Auth Checks</p>
                        <p className="mt-1"><strong className="text-green-600">Efeito (Ligado):</strong> O portal se torna público, qualquer um pode acessar sem senha.</p>
                        <p><strong className="text-red-600">Efeito (Desligado):</strong> O portal exige login e senha válidos para acesso.</p>
                    </div>
                </div>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                             <div className="flex flex-col items-center gap-1">
                                <span className={`text-xs font-bold ${control.checked ? 'text-destructive' : 'text-green-500'}`}>
                                    {control.checked ? 'Ligado' : 'Desligado'}
                                </span>
                                <div className="flex items-center space-x-2">
                                    {control.checked ? <BellOff className="text-destructive"/> : <Bell className="text-green-500"/>}
                                    <Switch
                                        id={control.id}
                                        checked={control.checked}
                                        onCheckedChange={control.onCheckedChange}
                                    />
                                </div>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="text-destructive font-bold">RISCO CRÍTICO: Desativa todas as verificações de senha para este portal.</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
              </div>
            ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Controles de Acesso do Banco de Dados (Firestore)</CardTitle>
          <CardDescription>
            Gerencie as regras de segurança do Firestore que podem impactar a navegação e o desenvolvimento.
          </CardDescription>
        </CardHeader>
        <CardContent>
        <div className="flex items-center space-x-4 rounded-md border p-4">
            <div className="flex-1 space-y-2">
                <p className="text-sm font-medium leading-none">Acesso de Colaborador a Todos os Dados</p>
                <div className="text-sm text-muted-foreground">
                    <p><span className="font-mono bg-muted px-1 rounded-sm">Linguagem Técnica:</span> `allow list: if isCollaborator();`</p>
                    <p className="mt-1"><strong className="text-green-600">Efeito (Ligado):</strong> Administradores (BOSS) podem buscar e ver dados de todos os clientes.</p>
                    <p><strong className="text-red-600">Efeito (Desligado):</strong> Administradores não conseguem buscar clientes, causando erros de permissão.</p>
                </div>
            </div>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                         <div className="flex flex-col items-center gap-1">
                            <span className={`text-xs font-bold ${isCollaboratorDataAccessActive ? 'text-green-500' : 'text-destructive'}`}>
                                {isCollaboratorDataAccessActive ? 'Ligado' : 'Desligado'}
                            </span>
                            <div className="flex items-center space-x-2">
                                {isCollaboratorDataAccessActive ? <Bell className="text-green-500"/> : <BellOff className="text-destructive"/>}
                                <Switch
                                    id="collaborator-access"
                                    checked={isCollaboratorDataAccessActive}
                                    onCheckedChange={setIsCollaboratorDataAccessActive}
                                />
                            </div>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>
                            {isCollaboratorDataAccessActive 
                                ? 'Ligado: Permite que administradores (BOSS) busquem e vejam dados de todos os clientes.' 
                                : 'Desligado: Restringe o acesso, podendo causar erros de permissão em painéis administrativos.'
                            }
                        </p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
