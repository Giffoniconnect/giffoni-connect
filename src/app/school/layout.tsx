import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { HomeSidebar } from '@/components/home-sidebar';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';

export default function SchoolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
            <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
                <SidebarTrigger className="md:hidden" />
                <h1 className="text-center font-semibold text-xl text-foreground">Pagina institucional da Giffoni School</h1>
                <Link href="/" >
                    <Button>Voltar ao Hub Principal</Button>
                </Link>
            </header>
            <main className="flex-1 p-4 sm:p-6 lg:p-8">
                {children}
            </main>
            <footer className="py-6 text-center text-sm text-muted-foreground border-t">
                &copy; {new Date().getFullYear()} Giffoni Advogados Associados
            </footer>
        </SidebarInset>
    </SidebarProvider>
  );
}
