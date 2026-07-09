'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/logo';
import {
  Building2,
  Users,
  Library,
  BookMarked,
  Home,
  Handshake,
  Shield,
  LifeBuoy,
  ChevronRight,
  MessageCircle,
  Phone,
  Instagram,
  Briefcase,
  GraduationCap,
  Wrench,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from './ui/sidebar';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { buildOfficeWhatsAppLink } from '@/lib/whatsapp';

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16.1 4.74a4.13 4.13 0 1 1-5.46 3.09V15.5a5.5 5.5 0 1 0 5.5-5.5h-3.09" />
    </svg>
  );

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="0"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
</svg>
);

const mainNavItems = [
    { href: '/', icon: Home, label: 'Portal do Cliente' },
    { href: '/business/home', icon: Building2, label: 'Portal Business' },
    { href: '/assessoria/login', icon: Briefcase, label: 'Portal Assessoria' },
    { href: '/terceirizado/login', icon: Wrench, label: 'Área do Terceirizado' },
    { href: '/school/home', icon: GraduationCap, label: 'Giffoni School' },
    { href: '/partner/home', icon: Handshake, label: 'Área do Parceiro' },
    { href: '/about/areas', icon: Library, label: 'Áreas de Atuação' },
    { href: '/about/infoproducts', icon: BookMarked, label: 'Infoprodutos Jurídicos' },
    { 
      href: '/about/history', 
      icon: Building2, 
      label: "Trajetória e Valores"
    },
    { href: '/about/team', icon: Users, label: 'Nossa Equipe' },
];

export function HomeSidebar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };
  
  const WHATSAPP_LINK = buildOfficeWhatsAppLink();
  const PHONE_LINK = "tel:+5531988639056";

  return (
    <>
      <SidebarHeader className="p-4">
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {mainNavItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href}>
                <SidebarMenuButton
                  isActive={isActive(item.href)}
                  tooltip={item.label}
                >
                  <item.icon className="h-6 w-6"/>
                  <span className="group-data-[state=collapsed]/sidebar-wrapper:hidden">{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}

            {/* Fale com a Giffoni */}
            <SidebarMenuItem>
                <DropdownMenu open={openMenu === 'contact'} onOpenChange={(isOpen) => setOpenMenu(isOpen ? 'contact' : null)}>
                    <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 rounded-md px-2 text-base text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        onMouseEnter={() => setOpenMenu('contact')}
                        >
                        <MessageCircle className="h-6 w-6 shrink-0" />
                        <span className="group-data-[state=collapsed]/sidebar-wrapper:hidden flex-1 text-left">Fale com a Giffoni</span>
                        <ChevronRight className="h-4 w-4 group-data-[state=collapsed]/sidebar-wrapper:hidden" />
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" align="start" className="w-56 ml-2 border-sidebar-border text-sidebar-accent-foreground" style={{ backgroundColor: 'hsl(231 50% 40%)' }} onMouseEnter={() => setOpenMenu('contact')} onMouseLeave={() => setOpenMenu(null)}>
                        <DropdownMenuItem asChild><Link href={PHONE_LINK}><Phone className="mr-2 h-4 w-4" /><span>031-9-8863-9056</span></Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href={WHATSAPP_LINK} target="_blank"><MessageCircle className="mr-2 h-4 w-4" /><span>WhatsApp</span></Link></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>

            {/* Redes Sociais */}
            <SidebarMenuItem>
                <DropdownMenu open={openMenu === 'social'} onOpenChange={(isOpen) => setOpenMenu(isOpen ? 'social' : null)}>
                    <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 rounded-md px-2 text-base text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        onMouseEnter={() => setOpenMenu('social')}
                        >
                            <Users className="h-6 w-6 shrink-0" />
                            <span className="group-data-[state=collapsed]/sidebar-wrapper:hidden flex-1 text-left">Redes Sociais</span>
                            <ChevronRight className="h-4 w-4 group-data-[state=collapsed]/sidebar-wrapper:hidden" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" align="start" className="w-56 ml-2 border-sidebar-border text-sidebar-accent-foreground" style={{ backgroundColor: 'hsl(231 50% 40%)' }} onMouseEnter={() => setOpenMenu('social')} onMouseLeave={() => setOpenMenu(null)}>
                        <DropdownMenuItem asChild><Link href="https://www.instagram.com/giffoniadvocacia/" target="_blank"><Instagram className="mr-2 h-4 w-4" /><span>Instagram</span></Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="https://www.tiktok.com/@giffoniadvocacia" target="_blank"><TikTokIcon className="mr-2 h-4 w-4" /><span>TikTok</span></Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="https://www.facebook.com/" target="_blank"><FacebookIcon className="mr-2 h-4 w-4" /><span>Facebook</span></Link></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
            
            {/* Suporte */}
            <SidebarMenuItem>
              <Link href="/boss/login">
                <SidebarMenuButton
                  isActive={isActive('/boss/login')}
                  tooltip={"Acesso Restrito ao BOSS"}
                >
                  <Shield className="h-6 w-6"/>
                  <span className="group-data-[state=collapsed]/sidebar-wrapper:hidden">Suporte</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>

        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
