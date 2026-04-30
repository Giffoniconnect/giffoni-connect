
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
  Library,
  Briefcase,
  DollarSign,
  Handshake,
  LayoutDashboard,
} from 'lucide-react';

const collaboratorItems = [
  { href: '/collaborator/dashboard', icon: LayoutDashboard, label: 'Manual do Colaborador' },
  { href: '/collaborator/viability-analysis', icon: Library, label: 'Análises de viabilidade' },
  { href: '/collaborator/delegated-cases', icon: Briefcase, label: 'Casos delegados' },
  { href: '/collaborator/financial', icon: DollarSign, label: 'Financeiro' },
  { href: '/collaborator/internal-partnerships', icon: Handshake, label: 'Parcerias internas' },
];

export function CollaboratorSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname.startsWith(href);
  };

  return (
    <SidebarContent>
      <SidebarMenu>
        {collaboratorItems.map((item) => (
          <SidebarMenuItem key={item.label}>
            <Link href={item.href}>
              <SidebarMenuButton isActive={isActive(item.href)} tooltip={item.label}>
                <item.icon />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarContent>
  );
}
