import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { contacts, messages as allMessages } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Paperclip, Send } from "lucide-react";

export default function MessagesPage() {
    const activeContact = contacts[0];
    const messages = allMessages.filter(m => m.contactName === activeContact.name);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Mensagens Seguras</h1>
        <p className="text-muted-foreground">
          Comunique-se de forma direta e segura com sua equipe jurídica.
        </p>
      </div>
      <Card className="h-[calc(100vh-12rem)]">
        <div className="grid h-full grid-cols-1 md:grid-cols-[300px_1fr]">
          <div className="border-r">
            <CardHeader>
                <CardTitle>Contatos</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    {contacts.map(contact => (
                        <div key={contact.name} className={cn("flex items-center gap-3 rounded-lg p-2 transition-colors cursor-pointer", contact.name === activeContact.name ? 'bg-accent' : 'hover:bg-accent')}>
                            <Avatar>
                                <AvatarImage src={contact.avatarUrl} />
                                <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <p className="font-semibold">{contact.name}</p>
                                <p className="text-sm text-muted-foreground">{contact.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
          </div>
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-4 p-4 border-b">
                <Avatar>
                    <AvatarImage src={activeContact.avatarUrl} />
                    <AvatarFallback>{activeContact.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="font-semibold">{activeContact.name}</p>
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="flex flex-col gap-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                      message.sender === "user"
                        ? "ml-auto bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    {message.text}
                    <span className={cn("text-xs", message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground/70' )}>
                        {message.timestamp}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t">
              <form className="relative">
                <Input placeholder="Digite sua mensagem..." />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <Button type="button" size="icon" variant="ghost">
                        <Paperclip className="h-4 w-4" />
                        <span className="sr-only">Anexar arquivo</span>
                    </Button>
                    <Button type="submit" size="icon" variant="ghost">
                        <Send className="h-4 w-4" />
                        <span className="sr-only">Enviar</span>
                    </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
