'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Scale, User, Shield, Building2, Briefcase, Handshake, Library, Users, GraduationCap, ArrowRight, Instagram, MapPin, Wrench } from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from '@/components/ui/sidebar';
import { HomeSidebar } from '@/components/home-sidebar';
import * as React from 'react';
import { cn } from '@/lib/utils';

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


const portals = [
  {
    title: 'Portal do Cliente da Giffoni Advogados Associados',
    description: 'Acesse seus casos, documentos e faturas.',
    href: '/client-login',
    icon: User,
  },
  {
    title: 'Giffoni Business',
    description: 'Acesso à consultoria para negócios e empreendedores.',
    href: '/business/home',
    icon: Building2,
  },
  {
    title: 'Giffoni Assessoria',
    description: 'Acesso para clientes de assessoria jurídica contínua.',
    href: '/assessoria/login',
    icon: Briefcase,
  },
  {
    title: 'Área do Terceirizado',
    description: 'Acesso de Peritos, Assistentes Técnicos',
    href: '/terceirizado/login',
    icon: Wrench,
  },
  {
    title: 'Giffoni School',
    description: 'Acesse a página institucional e o portal do aluno.',
    href: '/school/home',
    icon: GraduationCap,
  },
  {
    title: 'Área do Parceiro',
    description: 'Acesso exclusivo para parceiros e alianças estratégicas.',
    href: '/partner/home',
    icon: Handshake,
  },
];

const internalPortals: { title: string; href: string; description: string, icon: React.ElementType }[] = [
    {
      title: 'Área do Colaborador',
      description: 'Acesso para a equipe interna.',
      href: '/collaborator/login',
      icon: Users,
    },
    {
        title: 'Portal BOSS',
        description: 'Administração e gerenciamento.',
        href: '/boss/login',
        icon: Shield,
    },
]

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon: React.ElementType }
>(({ className, title, children, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
            <div className="flex items-center gap-2">
                <Icon className="h-5 w-5" />
                <div className="text-sm font-medium leading-none">{title}</div>
            </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"


export default function HubPage() {
  return (
    <SidebarProvider>
      <Sidebar
        variant="sidebar"
        collapsible="icon"
        className="group-data-[collapsible=icon]:border-r-0"
      >
        <HomeSidebar />
      </Sidebar>
      <SidebarInset>
        <div className="relative flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">

            <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8">
                <div className="grid gap-2 text-center">
                  <div className='flex justify-center items-center gap-4 mb-4'>
                    <Scale className="h-12 w-12 text-primary" />
                  </div>
                  <h1 className="text-4xl font-bold">Giffoni Connect</h1>
                  <p className="text-balance text-muted-foreground">
                    Seu ecossistema jurídico digital. Selecione seu portal de acesso.
                  </p>
                </div>

                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                        <NavigationMenuTrigger>Equipe da Giffoni Advogados Associados</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {internalPortals.map((component) => (
                                <ListItem
                                key={component.title}
                                title={component.title}
                                href={component.href}
                                icon={component.icon}
                                >
                                {component.description}
                                </ListItem>
                            ))}
                            </ul>
                        </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                    {portals.map((portal) => (
                        <Card key={portal.title} className="flex flex-col justify-between hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <portal.icon className="h-6 w-6 text-primary" />
                                    {portal.title}
                                </CardTitle>
                                <CardDescription>{portal.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Link href={portal.href}>
                                    <Button className="w-full">Acessar <ArrowRight className="ml-2 h-4 w-4" /></Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                
                <div className="text-center mt-8 pt-8 border-t w-full max-w-2xl">
                    <h3 className="font-semibold text-lg mb-4">Siga-nos e entre em contato</h3>
                    <div className="flex justify-center gap-4 mb-4">
                        <Button variant="outline" size="icon" asChild>
                            <a href="https://www.instagram.com/giffoniadvocacia/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <Instagram className="h-5 w-5" />
                            </a>
                        </Button>
                        <Button variant="outline" size="icon" asChild>
                            <a href="https://www.tiktok.com/@giffoniadvocacia" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                                <TikTokIcon className="h-5 w-5" />
                            </a>
                        </Button>
                         <Button variant="outline" size="icon" asChild>
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <FacebookIcon className="h-5 w-5" />
                            </a>
                        </Button>
                    </div>
                     <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
                        <MapPin className="h-4 w-4" />
                        <span>Rua Doutor Milton Bandeira, número 346, sala 6, Centro, Viçosa - Minas Gerais</span>
                    </div>
                </div>


                <div className="mt-8 text-center text-sm">
                    &copy; {new Date().getFullYear()} Giffoni Advogados Associados
                </div>
            </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
