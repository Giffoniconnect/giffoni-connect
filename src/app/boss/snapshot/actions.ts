'use server';
import fs from 'fs/promises';
import path from 'path';

// Helper function to recursively read file paths
async function getFilePaths(dir: string): Promise<string[]> {
    try {
        const dirents = await fs.readdir(dir, { withFileTypes: true });
        const files = await Promise.all(
        dirents.map((dirent) => {
            const res = path.resolve(dir, dirent.name);
            // Ignore node_modules, .next, and other non-source directories
            if (dirent.name.includes('node_modules') || dirent.name.startsWith('.') || dirent.name.includes('public')) {
            return [];
            }
            return dirent.isDirectory() ? getFilePaths(res) : res;
        })
        );
        return Array.prototype.concat(...files);
    } catch (error) {
        // If a directory doesn't exist (like /pages), ignore it.
        return [];
    }
}

function identifyRoutes(filePaths: string[]): string[] {
    const appDir = path.join(process.cwd(), 'src', 'app');
    return filePaths
      .filter((p) => p.startsWith(appDir) && (p.endsWith('/page.tsx') || p.endsWith('/page.js')))
      .map((p) => p.replace(appDir, '').replace(/\\/g, '/').replace(/\/page\.(tsx|js)$/, '') || '/');
}


async function getFileData(filePath: string) {
    try {
        const content = await fs.readFile(path.join(process.cwd(), filePath), 'utf-8');
        return { path: filePath, content };
    } catch (error) {
        return { path: filePath, content: 'Error reading file.' };
    }
}


export async function generateProjectSnapshot(): Promise<{
  success: boolean;
  data?: string;
  error?: string;
}> {
  try {
    const currentDate = new Date();
    const version = '1.0';

    let report = `
#####################################################################
#                                                                   #
#             SNAPSHOT EVOLUTIVO DO PROJETO - Giffoni Connect       #
#                                                                   #
#####################################################################

---
## ETAPA 1 — CONTROLE DE VERSÃO
---
- **ID da Versão:** ${version} (Baseline)
- **Data/Hora de Geração:** ${currentDate.toISOString()}
- **Tipo de Snapshot:** Baseline (Este é o primeiro snapshot detalhado do projeto, servindo como base para futuras comparações.)

---
## ETAPA 2 — DELTA SEMÂNTICO OBRIGATÓRIO (COMPARAÇÃO EVOLUTIVA)
---
- **Análise:** Por ser a versão baseline (v1.0), não há um snapshot anterior para comparação. Esta seção registrará as adições, alterações e remoções a partir da próxima versão (v1.1).

---
## ETAPA 3 — ESTADO ATUAL CONSOLIDADO (DESCRIÇÃO DO PRODUTO)
---

### 3.1 Identificação do projeto
- **Nome do projeto:** Giffoni Connect
- **Ambiente:** Produção (simulado em ambiente de desenvolvimento local)
- **Finalidade atual do website:** Portal do Cliente para o escritório Giffoni Advogados Associados. A plataforma centraliza a comunicação, o gerenciamento de casos, o acesso a documentos e faturas, e oferece ferramentas de assistência baseadas em IA, além de um portal administrativo para a equipe interna.

---
### 3.2 Visão funcional (prioritária)
- **O que o website FAZ:**
  - Permite que clientes e administradores acessem portais distintos com credenciais próprias (atualmente simuladas).
  - Fornece ao cliente um painel de controle (Dashboard) com um resumo visual de casos ativos, mensagens, faturas e documentos.
  - Disponibiliza listas detalhadas para que o cliente possa consultar o status de seus Casos, Documentos e Faturas.
  - Oferece uma interface de Mensagens Seguras para comunicação direta com a equipe jurídica.
  - Integra um Assistente Jurídico com IA que recomenda documentos legais com base em informações fornecidas pelo cliente.
  - Permite o cadastro de novos clientes, diferenciando Pessoa Física de Pessoa Jurídica com formulários específicos.
  - Oferece um portal administrativo (Portal BOSS) para consulta detalhada da base de clientes, com ferramenta de busca.
  - Permite a geração desta documentação (Snapshot Evolutivo) como ferramenta de auditoria e governança.
- **O que o website NÃO FAZ (escopo negativo explícito):**
  - Não processa pagamentos de faturas online. O portal apenas lista as faturas e permite o download.
  - Não permite o upload de arquivos ou documentos por parte do cliente. Apenas a equipe do escritório pode adicionar documentos.
  - A autenticação de usuários e o banco de dados ainda são simulados (mockados), não havendo persistência real dos dados.
  - Não possui integração em tempo real com sistemas de tribunais ou outras fontes de dados externas.

---
`;
    
    // Análise de arquivos para rotas e modelo de dados
    const srcFilePaths = await getFilePaths(path.join(process.cwd(), 'src'));
    const routes = identifyRoutes(srcFilePaths);
    const dataModelFile = await getFileData('src/lib/data.ts');

    report += `
### 3.3 Mapa completo de telas
${routes.sort().map(r => {
    let type = 'Pública';
    let objective = 'Ponto de entrada ou informação.';
    if (r.startsWith('/(app)/') || ['/dashboard', '/cases', '/documents', '/invoices', '/messages', '/recommendations'].includes(r)) {
      type = 'Cliente Autenticado';
      objective = 'Funcionalidades do portal do cliente.';
    } else if (r.startsWith('/boss')) {
      type = 'Administrativa (BOSS)';
      objective = 'Gerenciamento e administração do sistema.';
    }
    
    const conditions = type === 'Pública' ? 'Acesso livre.' : 'Requer autenticação (simulada).';
    const name = r.split('/').pop() || 'home';

    return `- **Tela:** ${name}\n  - **Rota:** ${r}\n  - **Tipo:** ${type}\n  - **Objetivo:** ${objective}\n  - **Condições de acesso:** ${conditions}`;
}).join('\n\n')}

---
### 3.4 Detalhamento de cada tela (nível produto)
(Análise de alto nível baseada na estrutura do código-fonte)

- **Tela: / (Login Principal)**
  - **Estrutura:** Layout de duas colunas com imagem de herói à direita e formulário à esquerda.
  - **Textos:** "Portal da Giffoni Advogados Associados", "Seu Portal Jurídico...", "Acesso do cliente", "Email/CPF", "Senha", "Esqueceu sua senha?".
  - **Botões/Links:** Botão "Login", Botão "Cadastre-se", Link "Acesso do Administrador (Boss)".
  - **Comportamento:** Login leva para "/dashboard", Cadastro para "/signup", Acesso do Admin para "/boss/login".

- **Tela: /signup (Cadastro de Cliente)**
  - **Estrutura:** Formulário centralizado com seletor de tipo de pessoa (Física/Jurídica).
  - **Textos:** "Cadastro de Novo Cliente", labels para todos os campos (Nome, CPF, CNPJ, etc.).
  - **Botões/Links:** Botão "Criar Conta", Link "Faça login".
  - **Comportamento:** O formulário se adapta dinamicamente para PF ou PJ. O botão submete os dados (atualmente sem ação).

- **Tela: /dashboard (Painel do Cliente)**
  - **Estrutura:** Layout autenticado com barra lateral. Cards de estatísticas no topo, card de atividade recente abaixo.
  - **Textos:** "Painel", "Bem-vindo de volta!", "Casos Ativos", "Mensagens não lidas", etc.
  - **Comportamento:** Exibe dados resumidos mockados.

- **Tela: /cases, /documents, /invoices (Listagens do Cliente)**
  - **Estrutura:** Título, subtítulo e uma tabela com os dados.
  - **Textos:** Títulos como "Seus Casos", "Documentos", "Faturas".
  - **Botões/Links:** Botão "Ver Detalhes" ou "Baixar".
  - **Comportamento:** Exibem listas de dados mockados.

- **Tela: /messages (Mensagens Seguras)**
  - **Estrutura:** Layout de chat com lista de contatos à esquerda e conversa à direita.
  - **Textos:** "Mensagens Seguras", nomes dos contatos, conteúdo das mensagens.
  - **Comportamento:** UI de chat estática, sem funcionalidade de envio real.

- **Tela: /recommendations (Assistente IA)**
  - **Estrutura:** Layout de duas colunas: formulário de entrada à esquerda, área de resultados à direita.
  - **Textos:** "Assistente Jurídico com IA", "Detalhes do Caso", "Perfil do Cliente".
  - **Botões/Links:** Botão "Obter Recomendações".
  - **Comportamento:** Envia os dados para um fluxo de GenAI e exibe as recomendações retornadas.

- **Tela: /boss/login (Login do Admin)**
  - **Estrutura:** Formulário de login centralizado.
  - **Textos:** "Portal do Boss", "Acesso exclusivo para administração."
  - **Comportamento:** Leva para "/boss/dashboard".

- **Tela: /boss/dashboard (Painel de Clientes)**
  - **Estrutura:** Layout administrativo com barra lateral. Título, barra de busca e tabela de clientes.
  - **Textos:** "Painel de Clientes", "Gerencie e consulte...".
  - **Botões/Links:** Botão "Buscar", Botão "Ver Detalhes" em cada linha.
  - **Comportamento:** A busca filtra a lista de clientes. "Ver Detalhes" leva para a página de detalhes do cliente.

- **Tela: /boss/dashboard/[clientId] (Detalhes do Cliente)**
  - **Estrutura:** Layout administrativo. Exibe todos os dados cadastrais do cliente selecionado, agrupados em cards.
  - **Textos:** "Detalhes do Cliente", labels para cada campo de dado.
  - **Comportamento:** Página de apenas leitura.

- **Tela: /boss/snapshot (Backup do Sistema)**
  - **Estrutura:** Layout administrativo. Card de controle à esquerda, área de visualização do relatório à direita.
  - **Textos:** "Gerenciar Snapshot Evolutivo do Projeto".
  - **Botões/Links:** Botão "Gerar Relatório de Snapshot", Botão "Baixar Arquivo .txt".
  - **Comportamento:** Gera e exibe este relatório, permitindo o download.

---
### 3.5 Fluxos de navegação
- **Fluxo Principal do Cliente:** Acessa a página inicial (/) -> Preenche login -> Acessa o Dashboard (/dashboard) -> Navega entre as seções (Casos, Documentos, etc.) pela barra lateral esquerda.
- **Fluxo de Novo Cliente:** Acessa a página inicial (/) -> Clica em "Cadastre-se" -> Vai para /signup -> Preenche o formulário -> Clica em "Criar Conta" (fim do fluxo atual).
- **Fluxo do Administrador (Boss):** Acessa a página inicial (/) -> Clica em "Acesso do Administrador (Boss)" -> Vai para /boss/login -> Preenche login -> Acessa o Painel de Clientes (/boss/dashboard) -> Navega pelas seções do admin na barra lateral.

---
### 3.6 Portal BOSS (Admin)
- **Forma de acesso:** Através da rota `/boss/login`.
- **Critérios de autorização:** Autenticação via formulário de login (simulado).
- **Telas administrativas existentes:** Login, Painel de Clientes, Detalhes do Cliente, Snapshot do Sistema.
- **Ações permitidas:** Login, visualização da lista de clientes, busca de clientes, visualização de detalhes de um cliente, geração de snapshot do sistema.
- **Limitações deliberadas:** Não permite edição, criação ou exclusão de dados. A autenticação é simulada. Não há gerenciamento de permissões.

---
### 3.7 Modelo lógico de dados (abstrato)
(Baseado no arquivo \`src/lib/data.ts\`)

- **Entidade 'Client':**
  - **Finalidade:** Representa um cliente do escritório.
  - **Relações:** Possui Casos, Documentos e Faturas.
  - **Status dos dados:** Mockados (simulados para representar dados reais).

- **Entidade 'Case':**
  - **Finalidade:** Representa um caso jurídico.
  - **Relações:** Pertence a um Cliente.
  - **Status dos dados:** Mockados.

- **Entidade 'Document':**
  - **Finalidade:** Representa um documento associado a um caso.
  - **Relações:** Pertence a um Caso.
  - **Status dos dados:** Mockados.

- **Entidade 'Invoice':**
  - **Finalidade:** Representa uma fatura de serviços.
  - **Relações:** Pertence a um Cliente.
  - **Status dos dados:** Mockados.

- **Entidade 'Message':**
  - **Finalidade:** Representa uma mensagem na comunicação segura.
  - **Relações:** Trocada entre um Cliente e um Contato (advogado/paralegal).
  - **Status dos dados:** Mockados.
---
### 3.8 Implementação atual (seção secundária e isolada)
- **Tecnologias:** Next.js (com App Router), React, TypeScript, TailwindCSS, ShadCN/UI para componentes, Genkit para IA (Google AI).
- **Observação:** A implementação atual serve para validar o produto. A stack tecnológica pode ser alterada no futuro sem invalidar os requisitos funcionais descritos neste documento.

---
## ETAPA 4 — FUNCIONALIDADES DESCARTADAS OU ADIADAS
---
- **Chat interno em tempo real:** Descartado para a versão inicial devido à complexidade e custo. A comunicação é feita de forma assíncrona.
- **Upload de documentos pelo cliente:** Adiado. Atualmente, apenas o download é permitido para garantir o controle sobre os documentos do caso.
- **Pagamentos online:** Fora do escopo atual. O portal funciona como um hub de informações, não como uma plataforma de e-commerce.
- **Atualização de processos em tempo real:** Adiado. A atualização é manual e informativa.

---
## ETAPA 5 — HISTÓRICO DE EVOLUÇÃO CONSOLIDADO
---
- **v1.0 (${currentDate.toISOString().split('T')[0]}):**
  - **Baseline:** Geração do snapshot inicial do projeto.
  - **Descrição:** Estrutura do portal do cliente e portal do boss definida. Funcionalidades incluem: login (simulado), dashboard do cliente, visualização de casos/documentos/faturas, mensagens (UI estática), assistente de IA para recomendações, cadastro de cliente e painel de consulta de clientes para o admin. Implementada a funcionalidade de geração deste snapshot.

---
## ETAPA 6 — GERAÇÃO DO ARQUIVO
---
- **Formato:** TXT (texto simples)
- **Nome do Arquivo:** snapshot-v1.0-${currentDate.toISOString().split('T')[0]}.txt
- **Acesso:** Exclusivo para administradores no Portal BOSS.
- **Privacidade:** O relatório opera sobre a estrutura do código e dados mockados, não contendo dados pessoais de usuários finais.
`;

    return { success: true, data: report };
  } catch (error: any) {
    console.error('Snapshot generation failed:', error);
    return {
      success: false,
      error: `Falha ao gerar o snapshot do projeto: ${error.message}`,
    };
  }
}
