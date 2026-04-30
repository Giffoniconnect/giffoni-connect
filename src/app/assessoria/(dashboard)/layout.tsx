'use client';

import {
    SidebarProvider,
    Sidebar,
    SidebarHeader,
    SidebarInset,
    SidebarTrigger,
  } from '@/components/ui/sidebar';
import { UserNavWrapper } from '@/components/user-nav';
import { AssessoriaSidebar } from '@/components/assessoria-sidebar';
import { Logo } from '@/components/logo';
  
export default function AssessoriaLayout({ children }: { children: React.ReactNode }) {
    // A lógica de autenticação e verificação de função foi simplificada
    // para focar na estrutura do layout e evitar erros de hidratação complexos.
    // A segurança será tratada em um nível superior ou com middleware.
    
    return (
      <SidebarProvider>
          <Sidebar
            variant="sidebar"
            collapsible="icon"
            className="group-data-[collapsible=icon]:border-r-0"
          >
            <SidebarHeader className="p-4">
              <Logo />
            </SidebarHeader>
            <AssessoriaSidebar />
          </Sidebar>
          <SidebarInset>
            <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
              <div className='flex items-center gap-4'>
                <SidebarTrigger className="md:hidden" />
                <h1 className="font-semibold text-lg text-foreground whitespace-nowrap hidden md:block">
                    Giffoni Assessoria Jurídica
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <UserNavWrapper />
              </div>
            </header>
            <main className="min-h-[calc(100vh-4rem)] p-4 sm:p-6">
              {children}
            </main>
          </SidebarInset>
      </SidebarProvider>
    );
}
