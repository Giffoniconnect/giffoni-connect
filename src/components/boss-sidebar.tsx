'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSkeleton,
} from '@/components/ui/sidebar';
import {
  LayoutGrid,
  ShieldCheck,
  DatabaseBackup,
  Mail,
  Users,
  History,
  Handshake,
  Gauge,
  Upload,
  Workflow,
  ClipboardList,
  ToggleRight,
  Building2,
  Briefcase,
  Database,
  BarChart3,
  CreditCard,
  KeyRound,
  Puzzle,
  Bug,
  Network,
  BrainCircuit,
  Contact,
  GraduationCap,
  ChevronRight,
  FileClock,
  Wrench,
  Scale,
  FileSignature,
  Gavel,
  Home,
  User,
  Shield,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useState, useEffect } from 'react';

const bossItems = [
  { href: '/boss/dashboard', icon: LayoutGrid, label: 'Painel de Clientes' },
  { href: '/boss/collaborators', icon: Contact, label: 'Painel de Colaboradores' },
  { href: '/boss/school', icon: GraduationCap, label: 'Giffoni School - Edição' },
  { href: '/boss/business', icon: Building2, label: 'Giffoni Business - Gerência' },
  { href: '/boss/business-reports', icon: BarChart3, label: 'Gerenciar Relatórios Business' },
  { href: '/boss/assessoria', icon: Briefcase, label: 'Giffoni Assessoria - Gerência' },
  { href: '/boss/team', icon: Users, label: 'Editor do Site - Nossa Equipe' },
];

const devToolsItems = [
    { href: "/boss/security-rules", icon: ShieldCheck, label: "Regras de Cybersegurança" },
    { href: "/boss/access-logs-hub", icon: History, label: "Logs de Acesso" },
    { href: "/boss/billing", icon: CreditCard, label: "Controle de Billing" },
    { href: "/boss/api-keys", icon: KeyRound, label: "Gerenciador de Chaves de API" },
    { href: "/boss/integrations", icon: Puzzle, label: "Integrações do Ecossistema" },
    { href: "/boss/webhooks", icon: Network, label: "Base de Webhooks" },
    { href: "/boss/ai-integration", icon: BrainCircuit, label: "Hub de Agentes de IA" },
    { href: "/boss/snapshot", icon: DatabaseBackup, label: "Snapshot Evolutivo de Projetos" },
    { href: "/boss/updates", icon: Upload, label: "Mapas de Updates" },
    { href: "/boss/workflow", icon: Workflow, label: "Workflow do Sistema" },
    { href: "/boss/podc", icon: ClipboardList, label: "PODC do Sistema" },
    { href: "/boss/capacity", icon: Gauge, label: "Capacidade do Sistema" },
    { href: "/boss/database", icon: Database, label: "Banco de Dados (Firestore)" },
    { href: "/boss/feature-flags", icon: ToggleRight, label: "Habilitar/Desabilitar funções" },
    { href: "/boss/debug", icon: Bug, label: "Painel de Debug" },
];

export function BossSidebar() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [menu, setMenu] = useState({
    level1: false,
    level2: false,
    level3: false,
  });

  const [isDevMenuOpen, setDevMenuOpen] = useState(false);
  const [isWorkspaceMenuOpen, setWorkspaceMenuOpen] = useState(false);

  const closeAllMenus = () => {
    setMenu({ level1: false, level2: false, level3: false });
    setDevMenuOpen(false);
    setWorkspaceMenuOpen(false);
  };

  const isActive = (href: string) => pathname.startsWith(href);

  const workspaceMenuItems = [
    { href: "/boss/site-editor", icon: Home, label: "Editar a Página Principal do Escritório" },
    { href: "/boss/client-editor", icon: User, label: "Editar o Portal do Cliente" },
    { href: "/boss/business-editor", icon: Building2, label: "Editar o Portal Giffoni Business" },
    { href: "/boss/assessoria", icon: Briefcase, label: "Editar o Portal Giffoni Assessoria" },
    { href: "/boss/school", icon: GraduationCap, label: "Editar o Portal Giffoni School" },
    { href: "/boss/edit-partner", icon: Handshake, label: "Editar o Portal de Área do Parceiro" },
    { href: "/boss/edit-collaborator", icon: Briefcase, label: "Editar o Portal de Colaboradores" },
    { href: "/boss/podc/controle/HUB-BOSS", icon: Shield, label: "Editar o Portal BOSS" },
  ];

  if (!isMounted) {
    return (
      <SidebarContent>
        <SidebarMenu>
          {Array.from({ length: 12 }).map((_, i) => (
            <SidebarMenuItem key={i}>
              <SidebarMenuSkeleton showIcon />
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    );
  }

  return (
    <SidebarContent
      onMouseLeave={() => {
        setMenu({ level1: false, level2: false, level3: false });
        setDevMenuOpen(false);
        setWorkspaceMenuOpen(false);
      }}
    >
      <SidebarMenu>
        <SidebarMenuItem>
            <SidebarMenuButton tooltip="Funções do Painel BOSS" disabled className="cursor-default opacity-100 hover:bg-transparent font-semibold">
                <Scale className="h-6 w-6" />
                <span>Funções do Painel BOSS</span>
            </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <Link href="/boss/messages">
            <SidebarMenuButton isActive={isActive('/boss/messages')}>
              <Mail />
              <span>Caixa de Entrada - Site</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>

        {/* ÁREA DE TRABALHO */}
        <SidebarMenuItem onMouseEnter={() => setWorkspaceMenuOpen(true)} className="relative">
          <DropdownMenu open={isWorkspaceMenuOpen} onOpenChange={setWorkspaceMenuOpen}>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                tooltip="Área de Trabalho"
                isActive={isActive('/boss/workspace')}
              >
                <LayoutGrid className="h-6 w-6" />
                <span>Área de Trabalho</span>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="right"
              align="start"
              className="w-56 ml-2"
              onMouseLeave={() => setWorkspaceMenuOpen(false)}
            >
              {workspaceMenuItems.map((item) => (
                <DropdownMenuItem key={item.label} asChild onClick={closeAllMenus}>
                    <Link href={item.href}>
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.label}
                    </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <ChevronRight className="h-4 w-4 absolute right-2 top-1/2 -translate-y-1/2 text-sidebar-foreground/70 pointer-events-none group-data-[state=collapsed]/sidebar-wrapper:hidden" />
        </SidebarMenuItem>

        {/* PAINEL DE CLIENTES */}
        <SidebarMenuItem
          onMouseEnter={() => setMenu(prev => ({ ...prev, level1: true, level2: true }))}
          className="relative"
        >
          <DropdownMenu
            open={menu.level2}
            onOpenChange={(open) => setMenu(prev => ({...prev, level2: open, level3: open ? prev.level3 : false}))}
          >
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                tooltip="Editar o Portal do Cliente"
              >
                <Users className="h-6 w-6" />
                <span>Editar o Portal do Cliente</span>
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              side="right"
              align="start"
              className="w-56 ml-2"
              onMouseLeave={() => setMenu(prev => ({...prev, level2: false, level3: false}))}
            >
              <DropdownMenuItem asChild onClick={closeAllMenus}>
                <Link href="/boss/dashboard">
                  <LayoutGrid className="mr-2 h-4 w-4" /> Painel de Clientes
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild onClick={closeAllMenus}>
                <Link href="/boss/service-desk">
                  <Contact className="mr-2 h-4 w-4" /> Funil de Atendimento
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild onClick={closeAllMenus}>
                <Link href="/boss/atualizacao-processual">
                  <FileSignature className="mr-2 h-4 w-4" /> Cadastro de Processos
                </Link>
              </DropdownMenuItem>

              {/* DELEGAÇÃO DE PRAZOS */}
              <DropdownMenu
                open={menu.level3}
                onOpenChange={(open) => setMenu(prev => ({...prev, level3: open}))}
              >
                <DropdownMenuTrigger asChild>
                  <DropdownMenuItem
                    onMouseEnter={() => setMenu(prev => ({ ...prev, level3: true }))}
                    onSelect={(e) => e.preventDefault()}
                    className="justify-between"
                  >
                    <div className="flex items-center">
                      <FileClock className="mr-2 h-4 w-4" />
                      Delegação de Prazos
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </DropdownMenuItem>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  side="right"
                  align="start"
                  className="w-56"
                >
                  <DropdownMenuItem onClick={closeAllMenus}>
                    Prazos Complexos
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={closeAllMenus}>
                    Prazos Simples
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenuItem asChild onClick={closeAllMenus}>
                <Link href="/boss/marcar-audiencia">
                  <Gavel className="mr-2 h-4 w-4" /> Marcar Audiência
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ChevronRight className="h-4 w-4 absolute right-2 top-1/2 -translate-y-1/2 text-sidebar-foreground/70 pointer-events-none group-data-[state=collapsed]/sidebar-wrapper:hidden" />
        </SidebarMenuItem>
        
        {/* DEMAIS ITENS */}
        {bossItems.map((item) => (
          <SidebarMenuItem key={item.label}>
            <Link href={item.href}>
              <SidebarMenuButton isActive={isActive(item.href)}>
                <item.icon />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}

        {/* FERRAMENTAS DE DESENVOLVEDOR */}
        <SidebarMenuItem onMouseEnter={() => setDevMenuOpen(true)} className="relative">
          <DropdownMenu open={isDevMenuOpen} onOpenChange={setDevMenuOpen}>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                tooltip="Ferramentas de desenvolvedor"
                isActive={isActive('/boss/developer-hub')}
              >
                <Wrench className="h-6 w-6" />
                <span>Ferramentas de desenvolvedor</span>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="right"
              align="start"
              className="w-56 ml-2"
              onMouseLeave={() => setDevMenuOpen(false)}
            >
              {devToolsItems.map((item) => (
                <DropdownMenuItem key={item.label} asChild onClick={closeAllMenus}>
                  <Link href={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <ChevronRight className="h-4 w-4 absolute right-2 top-1/2 -translate-y-1/2 text-sidebar-foreground/70 pointer-events-none group-data-[state=collapsed]/sidebar-wrapper:hidden" />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarContent>
  );
}
