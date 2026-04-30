
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu';
import {
  LayoutDashboard,
  ClipboardCheck,
  Network,
  Puzzle,
  CheckSquare,
  Calendar,
  Package,
  Clock,
  User,
  FileText,
  DollarSign,
  MessageCircle,
  Phone,
  ChevronRight,
  BarChart3,
  Home,
} from 'lucide-react';
import { useState } from 'react';

const businessItems = [
  { href: '/business/home', icon: Home, label: 'Página Institucional' },
  { href: '/business/dashboard', icon: LayoutDashboard, label: 'Manual do Usuário' },
  { href: '/business/diagnostico', icon: ClipboardCheck, label: 'Diagnóstico' },
  { href: '/business/plano-de-trabalho', icon: Network, label: 'Plano de Trabalho' },
  { href: '/business/microsolucoes', icon: Puzzle, label: 'Microsoluções' },
  { href: '/business/tarefas', icon: CheckSquare, label: 'Tarefas' },
  { href: '/business/relatorios', icon: BarChart3, label: 'Relatórios' },
  { href: '/business/reunioes', icon: Calendar, label: 'Reuniões' },
  { href: '/business/entregaveis', icon: Package, label: 'Entregáveis' },
  { href: '/business/meus-dados', icon: User, label: 'Meus Dados Cadastrais'},
  { href: '/business/documentos', icon: FileText, label: 'Documentos da Consultoria'},
  { href: '/business/linha-do-tempo', icon: Clock, label: 'Cronograma de Atividades' },
  { href: '/business/financeiro', icon: DollarSign, label: 'Financeiro' },
];

export function BusinessSidebar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const isActive = (href: string) => {
    return pathname.startsWith(href);
  };
  
  const WHATSAPP_LINK = "https://wa.me/5531988639056";
  const PHONE_LINK = "tel:+5531988639056";

  return (
    <SidebarContent>
      <SidebarMenu>
        {businessItems.map((item) => (
          <SidebarMenuItem key={item.label}>
            <Link href={item.href} prefetch={false}>
              <SidebarMenuButton isActive={isActive(item.href)} tooltip={item.label}>
                <item.icon />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
         {/* Fale com a Giffoni */}
         <SidebarMenuItem 
            onMouseEnter={() => setOpenMenu('contact')} 
            onMouseLeave={() => setOpenMenu(null)}
         >
            <DropdownMenu open={openMenu === 'contact'} onOpenChange={(isOpen) => setOpenMenu(isOpen ? 'contact' : null)}>
                <DropdownMenuTrigger asChild>
                    <SidebarMenuButton tooltip="Fale com a Giffoni" className="justify-between">
                        <div className="flex items-center gap-2">
                            <MessageCircle className="h-6 w-6" />
                            <span>Fale com a Giffoni</span>
                        </div>
                        <ChevronRight className="h-4 w-4" />
                    </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="start" className="w-56 ml-2 border-sidebar-border text-sidebar-accent-foreground" style={{ backgroundColor: 'hsl(231 50% 40%)' }} onMouseEnter={() => setOpenMenu('contact')} onMouseLeave={() => setOpenMenu(null)}>
                    <DropdownMenuItem asChild><Link href={PHONE_LINK}><Phone className="mr-2 h-4 w-4" /><span>031-9-8863-9056</span></Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href={WHATSAPP_LINK} target="_blank"><MessageCircle className="mr-2 h-4 w-4" /><span>WhatsApp</span></Link></DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarContent>
  );
}
