
'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { 
    Workflow as WorkflowIcon,
    LogIn,
    UserPlus,
    Database,
    ArrowRight,
    Users,
    User,
    KeyRound,
    Briefcase,
    Building,
    Handshake,
    Shield,
    BrainCircuit,
    ArrowDown
} from 'lucide-react';

const FlowCard = ({ icon: Icon, title, description, children, className }: { icon: React.ElementType, title: string, description?: string, children?: React.ReactNode, className?: string }) => (
    <Card className={className}>
        <CardHeader>
            <CardTitle className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                </div>
                <span>{title}</span>
            </CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        {children && <CardContent>{children}</CardContent>}
    </Card>
);

const Arrow = ({ label, vertical = false }: { label?: string, vertical?: boolean }) => (
    <div className={`flex items-center justify-center my-4 ${vertical ? 'flex-col' : 'flex-row'}`}>
        {vertical ? <ArrowDown className="h-8 w-8 text-muted-foreground" /> : <ArrowRight className="h-8 w-8 text-muted-foreground" />}
        {label && <span className="text-xs text-muted-foreground font-mono bg-background p-1 rounded-md mx-2">{label}</span>}
    </div>
);

export default function WorkflowPage() {

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Workflow do Sistema</h1>
        <p className="text-muted-foreground">
          Um mapa visual do fluxo de informações, interações entre telas e armazenamento de dados.
        </p>
      </div>
      
      <div className="space-y-8">
        {/* Section 1: User Entry Points */}
        <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><LogIn /> Pontos de Entrada</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <FlowCard icon={User} title="Portal do Cliente" description="Acesso pela página inicial (/) com login." />
                <FlowCard icon={Handshake} title="Área do Parceiro" description="Acesso por /partner/login." />
                <FlowCard icon={Briefcase} title="Área do Colaborador" description="Acesso por /collaborator/login." />
                <FlowCard icon={Shield} title="Portal BOSS" description="Acesso por /boss/login." />
            </div>
        </div>
        
        {/* Section 2: Registration Flow */}
        <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><UserPlus /> Fluxo de Cadastro de Usuários</h2>
            <div className="flex flex-col items-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                    <FlowCard icon={User} title="Pessoa Física" description="/signup" />
                    <FlowCard icon={Building} title="Pessoa Jurídica" description="/signup" />
                    <FlowCard icon={Handshake} title="Parceiro" description="/partner/signup" />
                </div>
                
                <Arrow label="Preenche formulário" vertical />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FlowCard icon={KeyRound} title="Firebase Authentication" description="createUserWithEmailAndPassword">
                        <CardContent>
                            <p className="text-sm text-muted-foreground">Cria um novo usuário com e-mail e senha, gerando um UID único.</p>
                        </CardContent>
                    </FlowCard>
                    <FlowCard icon={Database} title="Firestore Database" description="setDoc">
                        <CardContent>
                            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                                <li>Salva os dados do perfil na coleção (`clients` ou `partners`).</li>
                                <li>O ID do documento é o mesmo UID da autenticação.</li>
                            </ul>
                        </CardContent>
                    </FlowCard>
                </div>
            </div>
        </div>

        {/* Section 3: Collaborator Flow */}
        <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Briefcase /> Fluxo de Gerenciamento de Colaboradores</h2>
             <div className="flex flex-col items-center text-center">
                <FlowCard icon={Shield} title="BOSS/Admin acessa Cadastro" description="/collaborator/signup" />
                <Arrow label="Preenche formulário completo do colaborador" vertical />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FlowCard icon={KeyRound} title="Firebase Authentication" description="createUserWithEmailAndPassword">
                        <CardContent>
                            <p className="text-sm text-muted-foreground">Cria o login (e-mail/senha) do colaborador, gerando um UID.</p>
                        </CardContent>
                    </FlowCard>
                    <FlowCard icon={Database} title="Firestore Database" description="setDoc">
                        <CardContent>
                            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                                <li>Salva todos os dados na coleção `collaborators` usando o UID como ID do documento.</li>
                                <li>Se o tipo for 'Advogado', também salva um resumo na coleção `team` para exibição pública.</li>
                            </ul>
                        </CardContent>
                    </FlowCard>
                </div>

                <Arrow label="Colaborador faz login" vertical />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FlowCard icon={Briefcase} title="Portal do Colaborador" description="/collaborator/dashboard">
                        <CardContent>
                            <p className="text-sm text-muted-foreground">Colaborador acessa suas ferramentas de trabalho.</p>
                        </CardContent>
                    </FlowCard>
                    <FlowCard icon={Users} title="Painel de Colaboradores (BOSS)" description="/boss/collaborators">
                        <CardContent>
                            <p className="text-sm text-muted-foreground">BOSS pode consultar, buscar e ver detalhes de todos os colaboradores cadastrados.</p>
                        </CardContent>
                    </FlowCard>
                </div>
            </div>
        </div>

        {/* Section 4: Data Interaction Flow */}
        <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><WorkflowIcon /> Fluxo de Interação de Dados (Ex: Painel BOSS)</h2>
             <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 text-center">
                <div className="flex flex-col items-center">
                    <FlowCard icon={Users} title="Tela: Painel de Clientes" description="/boss/dashboard" />
                    <Arrow label="Usuário clica em 'Buscar'" vertical />
                    <p className="font-mono text-sm p-2 bg-muted rounded-md">handleSearch()</p>
                </div>

                <div className="hidden md:flex items-center">
                    <Arrow label="Executa query no..." />
                </div>
                <div className="flex md:hidden items-center justify-center">
                    <Arrow label="Executa query no..." vertical />
                </div>

                <div className="flex flex-col items-center">
                    <FlowCard icon={Database} title="Firestore" description="Coleção 'clients'" />
                     <Arrow label="Retorna documentos" vertical />
                    <p className="font-mono text-sm p-2 bg-muted rounded-md">setClients(results)</p>
                </div>
                
                <div className="hidden md:flex items-center">
                    <Arrow label="Atualiza a..." />
                </div>
                 <div className="flex md:hidden items-center justify-center">
                    <Arrow label="Atualiza a..." vertical />
                </div>

                <div className="flex flex-col items-center justify-center">
                    <FlowCard icon={Users} title="Tela: Painel de Clientes" description="Tabela é re-renderizada com os resultados" />
                </div>
            </div>
        </div>

        {/* Section 5: AI Flow */}
        <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><BrainCircuit /> Fluxo de Inteligência Artificial</h2>
             <div className="flex flex-col md:flex-row items-stretch justify-center gap-4 text-center">
                <div className="flex flex-col items-center">
                    <FlowCard icon={User} title="Tela: Assistente IA" description="/recommendations" />
                    <Arrow label="Usuário preenche e envia" vertical />
                    <p className="font-mono text-sm p-2 bg-muted rounded-md">getRecommendations()</p>
                </div>

                <div className="hidden md:flex items-center">
                    <Arrow label="Chama o server action..." />
                </div>
                <div className="flex md:hidden items-center justify-center">
                    <Arrow label="Chama o server action..." vertical />
                </div>

                <div className="flex flex-col items-center">
                    <FlowCard icon={BrainCircuit} title="Genkit Flow" description="/ai/flows/..." />
                     <Arrow label="Envia prompt para o LLM" vertical />
                    <p className="font-mono text-sm p-2 bg-muted rounded-md">{'const { output } = await prompt(input)'}</p>
                </div>
                
                <div className="hidden md:flex items-center">
                    <Arrow label="Retorna resultado para a..." />
                </div>
                <div className="flex md:hidden items-center justify-center">
                    <Arrow label="Retorna resultado para a..." vertical />
                </div>

                <div className="flex flex-col items-center justify-center">
                    <FlowCard icon={User} title="Tela: Assistente IA" description="Exibe as recomendações na UI" />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
