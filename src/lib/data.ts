

import { IconName } from "./icon-map";

export type Case = {
  id: string;
  name: string; // Nome interno/apelido do caso
  clientName: string;
  opposingParty: string;
  caseNumber: string;
  court: string; // Vara
  district: string; // Comarca
  status: 'Ativo' | 'Pendente' | 'Arquivado';
  description: string;
  lastUpdate: string;
  latestUpdateDetail: string; // Adicionado para detalhe da movimentação
  actionType: string;
  lawyer: string;
  infoRequestStatus: 'pending' | 'completed' | 'none';
  proofRequestStatus: 'pending' | 'completed' | 'none';
};

export const cases: Case[] = [
  {
    id: '1',
    name: 'Reestruturação Corporativa',
    clientName: 'João da Silva',
    opposingParty: 'Empresa ABC Ltda',
    caseNumber: '0012345-67.2023.8.26.0100',
    actionType: 'Societário',
    court: '1ª Vara Empresarial',
    district: 'São Paulo',
    lawyer: 'Dr. Rodrigo Giffoni',
    status: 'Ativo',
    description: 'Assessoria nos aspectos legais do processo de reestruturação societária.',
    lastUpdate: '2023-10-26',
    latestUpdateDetail: 'CONCLUSOS PARA DESPACHO',
    infoRequestStatus: 'pending',
    proofRequestStatus: 'completed',
  },
  {
    id: '2',
    name: 'Disputa de Propriedade Intelectual',
    clientName: 'Maria Oliveira',
    opposingParty: 'Designer XYZ',
    caseNumber: '0054321-98.2023.8.19.0001',
    actionType: 'Propriedade Intelectual',
    court: '5ª Vara Cível',
    district: 'Rio de Janeiro',
    lawyer: 'Dra. Ana Clara',
    status: 'Ativo',
    description: 'Representando o cliente em um caso de violação de marca registrada.',
    lastUpdate: '2023-10-25',
    latestUpdateDetail: 'JUNTADA DE PETIÇÃO',
    infoRequestStatus: 'none',
    proofRequestStatus: 'pending',
  },
  {
    id: '3',
    name: 'Transação Imobiliária',
    clientName: 'Tecnologia LTDA',
    opposingParty: 'Construtora Y',
    caseNumber: '1122334-55.2023.8.13.0024',
    actionType: 'Imobiliário',
    court: '10ª Vara Cível',
    district: 'Belo Horizonte',
    lawyer: 'Dr. Rodrigo Giffoni',
    status: 'Pendente',
    description: 'Due diligence e preparação de contrato para compra de imóvel comercial.',
    lastUpdate: '2023-10-20',
    latestUpdateDetail: 'ATO ORDINATÓRIO PRATICADO',
    infoRequestStatus: 'completed',
    proofRequestStatus: 'completed',
  },
  {
    id: '4',
    name: 'Revisão de Contrato de Trabalho',
    clientName: 'João da Silva',
    opposingParty: 'Ex-empregador S.A.',
    caseNumber: '2233445-66.2022.5.02.0010',
    actionType: 'Trabalhista',
    court: '10ª Vara do Trabalho',
    district: 'São Paulo',
    lawyer: 'Dra. Ana Clara',
    status: 'Arquivado',
    description: 'Revisou e assessorou o contrato de trabalho executivo.',
    lastUpdate: '2023-01-15',
    latestUpdateDetail: 'ARQUIVADO DEFINITIVAMENTE',
    infoRequestStatus: 'none',
    proofRequestStatus: 'none',
  },
  {
    id: '5',
    name: 'Ação de Alimentos',
    clientName: 'Joanisio da Silva Sauro',
    opposingParty: 'Maria da Silva Sauro',
    caseNumber: '5566778-89.2024.8.16.0014',
    actionType: 'Direito de Família',
    court: '2ª Vara de Família',
    district: 'Curitiba',
    lawyer: 'Dr. Rodrigo Giffoni',
    status: 'Ativo',
    description: 'Ação de fixação de alimentos para o filho menor.',
    lastUpdate: '2024-08-01',
    latestUpdateDetail: 'AGUARDANDO CITAÇÃO',
    infoRequestStatus: 'pending',
    proofRequestStatus: 'pending',
  },
];


export type Document = {
  id: string;
  name: string;
  caseName: string;
  dateUploaded: string;
  fileUrl: string;
};

export const documents: Document[] = [
  {
    id: '1',
    name: 'Plano de Reestruturacao v2.pdf',
    caseName: 'Reestruturação Corporativa',
    dateUploaded: '2023-10-15',
    fileUrl: '#',
  },
  {
    id: '2',
    name: 'Rascunho Carta de Cessar e Desistir.docx',
    caseName: 'Disputa de Propriedade Intelectual',
    dateUploaded: '2023-10-12',
    fileUrl: '#',
  },
  {
    id: '3',
    name: 'Escritura do Imovel.pdf',
    caseName: 'Transação Imobiliária',
    dateUploaded: '2023-10-10',
    fileUrl: '#',
  },
  {
    id: '4',
    name: 'Envio de Provas_Out_25.zip',
    caseName: 'Disputa de Propriedade Intelectual',
    dateUploaded: '2023-10-25',
    fileUrl: '#',
  },
];

export type Invoice = {
  id: string;
  invoiceNumber: string;
  amount: number;
  dueDate: string;
  status: 'Pago' | 'Não Pago' | 'Vencido';
  fileUrl: string;
};

export const invoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'FAT-2023-001',
    amount: 5000.0,
    dueDate: '2023-11-01',
    status: 'Não Pago',
    fileUrl: '#',
  },
  {
    id: '2',
    invoiceNumber: 'FAT-2023-002',
    amount: 12500.0,
    dueDate: '2023-10-15',
    status: 'Pago',
    fileUrl: '#',
  },
  {
    id: '3',
    invoiceNumber: 'FAT-2023-003',
    amount: 750.0,
    dueDate: '2023-09-20',
    status: 'Pago',
    fileUrl: '#',
  },
  {
    id: '4',
    invoiceNumber: 'FAT-2023-004',
    amount: 3200.0,
    dueDate: '2023-08-30',
    status: 'Vencido',
    fileUrl: '#',
  },
];

export type User = {
    name: string;
    email: string;
    avatarUrl: string;
};

export const user: User = {
    name: 'Nome do Cliente',
    email: 'cliente.nome@exemplo.com',
    avatarUrl: 'https://picsum.photos/seed/avatar1/100/100'
}

export type Message = {
    id: string;
    sender: 'user' | 'lawyer';
    text: string;
    timestamp: string;
    contactName: string;
    contactAvatarUrl: string;
}

export const messages: Message[] = [
    {
        id: '1',
        sender: 'lawyer',
        text: 'Olá, tenho uma atualização sobre o CASO-2023-001. Por favor, revise o documento em anexo "Plano de Reestruturacao v2.pdf" na seção de documentos.',
        timestamp: '26/10/2023 10:00',
        contactName: 'Dr. Giffoni',
        contactAvatarUrl: 'https://picsum.photos/seed/lawyer1/100/100'
    },
    {
        id: '2',
        sender: 'user',
        text: 'Obrigado, vou revisar em breve.',
        timestamp: '26/10/2023 10:05',
        contactName: 'Dr. Giffoni',
        contactAvatarUrl: 'https://picsum.photos/seed/lawyer1/100/100'
    },
    {
        id: '3',
        sender: 'lawyer',
        text: 'Perfeito. Se tiver alguma dúvida, me avise.',
        timestamp: '26/10/2023 10:06',
        contactName: 'Dr. Giffoni',
        contactAvatarUrl: 'https://picsum.photos/seed/lawyer1/100/100'
    }
]

export const contacts = [
    {
        name: 'Dr. Giffoni',
        role: 'Advogado Principal',
        avatarUrl: 'https://picsum.photos/seed/lawyer1/100/100'
    },
    {
        name: 'Ana Clara',
        role: 'Paralegal',
        avatarUrl: 'https://picsum.photos/seed/lawyer2/100/100'
    }
]

export type Client = {
    id: string;
    type: 'Pessoa Física' | 'Pessoa Jurídica';
    name?: string; // Used for search, can be PF or PJ
    email: string;
    caseNumber?: string;
    // Common
    phone?: string;
    hasWhatsapp?: boolean;
    instagram?: string;
    tiktok?: string;
    facebook?: string;
    address?: string;
    // Pessoa Física
    nationality?: string;
    maritalStatus?: string;
    profession?: string;
    rg?: string;
    cpf?: string;
    fullName?: string; // Specific for PF
    // Pessoa Jurídica
    cnpj?: string;
    companyName?: string; // Specific for PJ
    adminName?: string;
    adminNationality?: string;
    adminMaritalStatus?: string;
    adminProfession?: string;
    adminEmail?: string;
    adminRg?: string;
    adminCpf?: string;
    adminPhone?: string;
    adminWhatsapp?: boolean;
    adminInstagram?: string;
    adminTiktok?: string;
    adminFacebook?: string;
    ['address-pj']?: string;
    ['email-pj']?: string;
  };
  
  export const allClients: Client[] = [
    {
      id: '1',
      type: 'Pessoa Física',
      name: 'João da Silva',
      fullName: 'João da Silva',
      nationality: 'Brasileiro(a)',
      maritalStatus: 'Solteiro(a)',
      profession: 'Engenheiro de Software',
      email: 'joao.silva@example.com',
      rg: '11.222.333-4',
      cpf: '111.222.333-44',
      phone: '(11) 98765-4321',
      hasWhatsapp: true,
      instagram: '@joaosilva',
      tiktok: '',
      facebook: 'facebook.com/joao.silva',
      address: 'Rua das Flores, 123, São Paulo, SP, 01234-567',
      caseNumber: 'CASO-2023-001',
    },
    {
      id: '2',
      type: 'Pessoa Física',
      name: 'Maria Oliveira',
      fullName: 'Maria Oliveira',
      nationality: 'Brasileiro(a)',
      maritalStatus: 'Casado(a)',
      profession: 'Advogada',
      email: 'maria.oliveira@example.com',
      rg: '22.333.444-5',
      cpf: '444.555.666-77',
      phone: '(21) 91234-5678',
      hasWhatsapp: true,
      instagram: '',
      tiktok: '',
      facebook: '',
      address: 'Avenida Copacabana, 456, Rio de Janeiro, RJ, 23456-789',
      caseNumber: 'CASO-2023-002',
    },
    {
      id: '3',
      type: 'Pessoa Jurídica',
      name: 'Tecnologia LTDA',
      companyName: 'Tecnologia LTDA',
      cnpj: '12.345.678/0001-99',
      email: 'contato@tecnologia.com',
      adminName: 'Carlos Pereira',
      adminNationality: 'Brasileiro(a)',
      adminMaritalStatus: 'Casado(a)',
      adminProfession: 'CEO',
      adminEmail: 'carlos.pereira@tecnologia.com',
      adminRg: '33.444.555-6',
      adminCpf: '888.999.000-11',
      phone: '(31) 99999-8888',
      hasWhatsapp: false,
      instagram: '@tecnologialtda',
      tiktok: '@tecnologialtda',
      facebook: 'facebook.com/tecnologialtda',
      address: 'Rua dos Inconfidentes, 789, Belo Horizonte, MG, 34567-890',
      caseNumber: 'CASO-2023-003',
    },
    {
        id: '4',
        type: 'Pessoa Física',
        name: 'Joanisio da Silva Sauro',
        fullName: 'Joanisio da Silva Sauro',
        nationality: 'Brasileiro(a)',
        maritalStatus: 'Solteiro(a)',
        profession: 'Programador',
        email: 'joanisio.sauro@example.com',
        rg: '44.555.666-7',
        cpf: '222.333.444-55',
        phone: '(41) 98765-1234',
        hasWhatsapp: true,
        instagram: '@joanisiosauro',
        tiktok: '',
        facebook: '',
        address: 'Rua dos Dinossauros, 10, Curitiba, PR, 80000-000',
        caseNumber: 'CASO-2024-004',
      },
      {
        id: '5',
        type: 'Pessoa Física',
        name: 'Rodrigo Giffoni',
        fullName: 'Rodrigo Giffoni',
        nationality: 'Brasileiro(a)',
        maritalStatus: 'Casado(a)',
        profession: 'Advogado',
        email: 'rodrigo.giffoni@example.com',
        rg: 'MG-12.345.678',
        cpf: '123.456.789-00',
        phone: '(31) 98863-9056',
        hasWhatsapp: true,
        instagram: '@giffoniadvocacia',
        tiktok: '@giffoniadvocacia',
        facebook: 'facebook.com/giffoniadvocacia',
        address: 'Rua Doutor Milton Bandeira, 346, Viçosa, MG, 36570-000',
        caseNumber: 'CASO-2024-005',
      }
  ];

  export type CybersecurityRule = {
    id: string;
    name: string;
    category: 'Acesso' | 'Dados' | 'Autenticação' | 'Integração' | 'Automação' | 'Financeiro';
    description: string;
    scope: 'Portal BOSS' | 'Área do Cliente' | 'Área do Parceiro' | 'Backend' | 'Integrações Externas';
    reason: 'Proteção' | 'Controle' | 'Prevenção de Risco' | 'Organização';
    impact: 'Baixo' | 'Médio' | 'Alto';
    creationDate: string;
    history: string;
    status: 'Ativa' | 'Desativada' | 'Experimental';
  }

  export const cybersecurityRules: CybersecurityRule[] = [
    {
        id: '1',
        name: 'Acesso Exclusivo ao Portal BOSS',
        category: 'Acesso',
        description: 'Garante que apenas administradores autenticados possam acessar a área do Portal BOSS.',
        scope: 'Portal BOSS',
        reason: 'Proteção',
        impact: 'Alto',
        creationDate: new Date().toISOString(),
        history: 'v1.0 - Criação da regra.',
        status: 'Ativa'
    },
    {
        id: '2',
        name: 'Isolamento de Dados do Cliente',
        category: 'Dados',
        description: 'Impede que um cliente possa ver dados de outros clientes. A consulta é sempre isolada.',
        scope: 'Área do Cliente',
        reason: 'Proteção',
        impact: 'Alto',
        creationDate: new Date().toISOString(),
        history: 'v1.0 - Criação da regra.',
        status: 'Ativa'
    },
    {
      id: '3',
      name: 'Simulação de Autenticação',
      category: 'Autenticação',
      description: 'A autenticação de usuários é simulada, sem senhas reais, para fins de desenvolvimento.',
      scope: 'Portal BOSS',
      reason: 'Prevenção de Risco',
      impact: 'Médio',
      creationDate: new Date().toISOString(),
      history: 'v1.0 - Criação da regra.',
      status: 'Experimental'
    },
    {
      id: '4',
      name: 'Ocultação da Barra Lateral no Login do Boss',
      category: 'Acesso',
      description: 'A barra lateral de navegação principal não deve ser renderizada ou acessível na página de login do "Portal do Boss" para evitar que usuários não autenticados vejam a estrutura interna do sistema.',
      scope: 'Portal BOSS',
      reason: 'Prevenção de Risco',
      impact: 'Médio',
      creationDate: new Date().toISOString(),
      history: 'v1.0 - Criação da regra.',
      status: 'Ativa'
    },
    {
        id: '5',
        name: 'Proteção de Dados Sensíveis no Firebase',
        category: 'Dados',
        description: 'Todas as interações com o Firebase (Firestore, Auth) devem seguir regras de segurança estritas para proteger dados sensíveis como informações pessoais, credenciais e dados financeiros. O acesso deve ser bloqueado por padrão.',
        scope: 'Backend',
        reason: 'Proteção',
        impact: 'Alto',
        creationDate: new Date().toISOString(),
        history: 'v1.0 - Criação da regra.',
        status: 'Ativa'
    },
    {
      id: '6',
      name: 'Parceiros não podem alterar status de pagamento',
      category: 'Financeiro',
      description: 'Garante que usuários do tipo "Parceiro" possam visualizar dados financeiros, mas não tenham permissão para alterar o status de um pagamento ou repasse.',
      scope: 'Área do Parceiro',
      reason: 'Controle',
      impact: 'Médio',
      creationDate: new Date().toISOString(),
      history: 'v1.0 - Criação da regra.',
      status: 'Ativa'
    }
  ]

  type Installment = {
    installmentNumber: number;
    value: number;
    dueDate: string;
    partnerPayoutValue: number;
    payoutComplete: boolean;
  };
  
  export type FinancialRecord = {
    id: string;
    processNumber: string;
    clientName: string;
    opposingParty: string;
    serviceType: 'Consulta' | 'Acompanhamento' | 'Parecer' | 'Êxito' | 'Infoproduto';
    contractType: 'Êxito' | 'Honorários Iniciais';
    serviceDescription: string;
    contractDate: string;
    value: number;
    paymentMethod: 'Pix' | 'Boleto' | 'Transferência' | 'Plataforma Externa';
    status: 'Contratado' | 'Pago' | 'Pendente' | 'Cancelado';
    notes: string;
    contractDetails: {
      totalFees: number;
      feeSplit: string;
      partnerExpectedPayout: number;
      dueDate?: string;
      payoutDate?: string;
      payoutComplete?: boolean;
      installments?: Installment[];
    };
  };

  export const financialRecords: FinancialRecord[] = [
    {
      id: '1',
      processNumber: '0012345-67.2023.8.26.0100',
      clientName: 'João da Silva',
      opposingParty: 'Empresa ABC Ltda',
      serviceType: 'Acompanhamento',
      contractType: 'Honorários Iniciais',
      serviceDescription: 'Taxas mensais para reestruturação corporativa.',
      contractDate: '2023-09-01T00:00:00Z',
      value: 60000.00,
      paymentMethod: 'Boleto',
      status: 'Contratado',
      notes: 'Contrato de 12 meses com pagamentos mensais.',
      contractDetails: {
        totalFees: 60000.00,
        feeSplit: '50% para o parceiro A',
        partnerExpectedPayout: 30000.00,
        installments: [
          { installmentNumber: 1, value: 5000.00, dueDate: '2023-10-10T00:00:00Z', partnerPayoutValue: 2500, payoutComplete: true },
          { installmentNumber: 2, value: 5000.00, dueDate: '2023-11-10T00:00:00Z', partnerPayoutValue: 2500, payoutComplete: true },
          { installmentNumber: 3, value: 5000.00, dueDate: '2023-12-10T00:00:00Z', partnerPayoutValue: 2500, payoutComplete: false },
          { installmentNumber: 4, value: 5000.00, dueDate: '2024-01-10T00:00:00Z', partnerPayoutValue: 2500, payoutComplete: false },
        ]
      }
    },
    {
        id: '2',
        processNumber: '0054321-98.2023.8.19.0001',
        clientName: 'Maria Oliveira',
        opposingParty: 'Designer XYZ',
        serviceType: 'Consulta',
        contractType: 'Honorários Iniciais',
        serviceDescription: 'Consulta inicial sobre Propriedade Intelectual.',
        contractDate: '2023-08-15T00:00:00Z',
        value: 800.00,
        paymentMethod: 'Pix',
        status: 'Pago',
        notes: 'Consulta avulsa.',
        contractDetails: {
            totalFees: 800.00,
            feeSplit: '20% para o parceiro B',
            partnerExpectedPayout: 160.00,
            dueDate: '2023-08-15T00:00:00Z',
            payoutDate: '2023-08-20T00:00:00Z',
            payoutComplete: true,
        }
    },
    {
        id: '3',
        processNumber: '1122334-55.2023.8.13.0024',
        clientName: 'Tecnologia LTDA',
        opposingParty: 'Construtora Y',
        serviceType: 'Infoproduto',
        contractType: 'Honorários Iniciais',
        serviceDescription: 'Aquisição do "Guia de Contratos para Startups v2.0".',
        contractDate: '2023-10-10T00:00:00Z',
        value: 499.90,
        paymentMethod: 'Plataforma Externa',
        status: 'Pago',
        notes: 'Venda via Hotmart. Cliente já possui acesso.',
        contractDetails: {
            totalFees: 499.90,
            feeSplit: 'N/A (Venda direta)',
            partnerExpectedPayout: 0,
            dueDate: '2023-10-10T00:00:00Z',
            payoutDate: '2023-10-10T00:00:00Z',
            payoutComplete: true,
        }
    }
  ];

  export type TeamMember = {
    id: string;
    name: string;
    role: string;
    avatarUrl: string;
    createdAt?: any;
    oab?: string;
    bio?: string;
  };
  
  export type LoginHistoryEntry = {
    id: string;
    clientId: string;
    loginTimestamp: { seconds: number; nanoseconds: number; };
    ipAddress: string;
    userAgent: string;
  };

  export type UpdateDetail = {
    id: string;
    date: string;
    description: string;
    status: 'OK' | 'Pendente';
  };
  
  export type ScreenUpdate = {
    screenName: string;
    screenRoute: string;
    updates: UpdateDetail[];
  };

  export const screenUpdates: ScreenUpdate[] = [
    {
        screenName: "Módulos de Cadastro e Login",
        screenRoute: "/signup, /, /partner/login, /collaborator/login",
        updates: [
            { id: "auth-1", date: '2024-07-28T00:00:00Z', description: 'Criação do formulário de cadastro dinâmico para Pessoa Física e Jurídica.', status: 'OK' },
            { id: "auth-2", date: '2024-07-28T00:00:00Z', description: 'Sincronização do cadastro de clientes com a coleção `clients` no Firestore.', status: 'OK' },
            { id: "auth-3", date: '2024-07-30T00:00:00Z', description: 'Implementação dos formulários de cadastro e login para Parceiros.', status: 'OK' },
            { id: "auth-4", date: '2024-07-30T00:00:00Z', description: 'Implementação dos formulários de cadastro e login para Colaboradores.', status: 'OK' },
            { id: "auth-5", date: '2024-08-05T00:00:00Z', description: 'Criação do fluxo de dados e gerenciamento de Colaboradores no Portal BOSS.', status: 'OK' },
            { id: "auth-6", date: '2024-08-06T00:00:00Z', description: 'Correção e implementação completa do fluxo de salvamento de dados para novos colaboradores.', status: 'OK'},
        ],
    },
    {
        screenName: "Portal do Cliente",
        screenRoute: "/dashboard, /cases, /documents, etc.",
        updates: [
            { id: "client-1", date: '2024-07-29T00:00:00Z', description: 'Criação do layout principal (Dashboard) com sidebar de navegação.', status: 'OK' },
            { id: "client-2", date: '2024-07-29T00:00:00Z', description: 'Desenvolvimento das telas de visualização de Casos, Documentos e Faturas.', status: 'OK' },
            { id: "client-3", date: '2024-08-01T00:00:00Z', description: 'Implementação do assistente de IA para recomendação de documentos.', status: 'OK' },
        ],
    },
    {
        screenName: "Portal BOSS",
        screenRoute: "/boss/dashboard, /boss/partners, etc.",
        updates: [
            { id: "boss-1", date: '2024-07-29T00:00:00Z', description: 'Criação do painel de consulta e busca de clientes.', status: 'OK' },
            { id: "boss-2", date: '2024-07-30T00:00:00Z', description: 'Criação do painel de consulta e busca de parceiros.', status: 'OK' },
            { id: "boss-3", date: '2024-08-02T00:00:00Z', description: 'Criação do painel de consulta e busca de colaboradores.', status: 'OK' },
            { id: "boss-4", date: '2024-08-02T00:00:00Z', description: 'Integração do Módulo Financeiro para registro de contratos.', status: 'OK' },
            { id: "boss-5", date: '2024-08-03T00:00:00Z', description: 'Implementação da tela de Histórico de Updates.', status: 'Pendente' },
            { id: "boss-6", date: '2024-08-05T00:00:00Z', description: 'Implementação da tela de Workflow do Sistema.', status: 'OK' },
            { id: "boss-7", date: '2024-08-07T00:00:00Z', description: 'Implementação do CRUD completo para gerenciamento da equipe.', status: 'OK' },
        ],
    },
    {
        screenName: "Área do Parceiro",
        screenRoute: "/partner/dashboard, etc.",
        updates: [
            { id: "partner-1", date: '2024-07-31T00:00:00Z', description: 'Criação do dashboard e navegação da área de parceiros.', status: 'OK' },
            { id: "partner-2", date: '2024-08-01T00:00:00Z', description: 'Implementação do controle financeiro com detalhamento de contratos e repasses.', status: 'OK' },
            { id: "partner-3", date: '2024-08-03T00:00:00Z', description: 'Criação da tela de FAQ para parceiros.', status: 'OK' },
        ],
    },
    {
        screenName: "Páginas Públicas / Institucionais",
        screenRoute: "/about/...",
        updates: [
            { id: "public-1", date: '2024-08-07T00:00:00Z', description: 'Sincronização da página "Nossa Equipe" com o banco de dados Firestore.', status: 'OK' },
        ],
    },
    {
        screenName: "Sistema e Backend",
        screenRoute: "N/A",
        updates: [
            { id: "system-1", date: '2024-07-29T00:00:00Z', description: 'Implementação da regra de segurança para Acesso Exclusivo ao Portal BOSS.', status: 'OK' },
            { id: "system-2", date: '2024-08-02T00:00:00Z', description: 'Sincronização automática com sistema de processos dos tribunais.', status: 'Pendente' },
            { id: "system-3", date: '2024-08-03T00:00:00Z', description: 'Criação do Snapshot Evolutivo do Projeto para auditoria.', status: 'OK' },
        ],
    },
  ];

  // --- New Mock Data for System Tree ---

  export type SystemAction = {
    id_acao: string;
    id_funcao: string;
    tipo: 'botao' | 'submit' | 'evento_automatico';
    identificador_frontend: string;
    evento_firebase: string;
    tela_origem: string;
    ultima_execucao: string | null;
    status_acao: 'ativa_nao_testada' | 'ativa' | 'quebrada';
  };
  
  export type SystemFunction = {
    id_funcao: string;
    id_subsecao: string;
    descricao_funcional: string;
    status_funcao: 'nao_implementada' | 'implementada' | 'testada' | 'estavel' | 'bugada';
    implementado_em: string | null;
    testado_em: string | null;
    bugs: string[];
    reteste_habilitado: boolean;
    acoes: SystemAction[];
  };
  
  export type SystemSubSection = {
    id_subsecao: string;
    id_secao: string;
    nome_subsecao: string;
    status: string;
    funcoes: SystemFunction[];
  };
  
  export type SystemSection = {
    id_secao: string;
    id_tela: string;
    nome_secao: string;
    origem: 'inferida' | 'manual';
    status: string;
    subsecoes: SystemSubSection[];
  };
  
  export type SystemScreen = {
    id_tela: string;
    nome_tela: string;
    rota_frontend: string;
    status_geral: 'em_desenvolvimento' | 'estavel';
    criado_em: string;
    ultima_atualizacao: string;
    secoes: SystemSection[];
  };
  
  export const mockSystemTree: SystemScreen[] = [
    {
      id_tela: 'boss_dashboard',
      nome_tela: 'Painel de Clientes',
      rota_frontend: '/boss/dashboard',
      status_geral: 'estavel',
      criado_em: '2024-07-29T00:00:00Z',
      ultima_atualizacao: '2024-07-29T00:00:00Z',
      secoes: [
        {
          id_secao: 'busca_clientes',
          id_tela: 'boss_dashboard',
          nome_secao: 'Ferramentas de Busca',
          origem: 'manual',
          status: 'ativa',
          subsecoes: [
            {
              id_subsecao: 'filtro_principal_cli',
              id_secao: 'busca_clientes',
              nome_subsecao: 'Campo de Busca Principal',
              status: 'ativa',
              funcoes: [
                {
                  id_funcao: 'executar_busca_cli',
                  id_subsecao: 'filtro_principal_cli',
                  descricao_funcional: 'Realiza a busca de clientes no Firestore com base no termo digitado.',
                  status_funcao: 'estavel',
                  implementado_em: '2024-07-29T00:00:00Z',
                  testado_em: '2024-07-29T00:00:00Z',
                  bugs: [],
                  reteste_habilitado: true,
                  acoes: [
                    { id_acao: 'btn_buscar_cli', id_funcao: 'executar_busca_cli', tipo: 'botao', identificador_frontend: 'handleSearch', evento_firebase: 'boss_search_client', tela_origem: '/boss/dashboard', ultima_execucao: null, status_acao: 'ativa' }
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id_tela: 'boss_partners',
      nome_tela: 'Painel de Parceiros',
      rota_frontend: '/boss/partners',
      status_geral: 'estavel',
      criado_em: '2024-07-30T00:00:00Z',
      ultima_atualizacao: '2024-07-30T00:00:00Z',
      secoes: [
          // Mapeamento das seções, subseções, etc.
      ],
    },
    {
      id_tela: 'boss_collaborators',
      nome_tela: 'Painel de Colaboradores',
      rota_frontend: '/boss/collaborators',
      status_geral: 'estavel',
      criado_em: '2024-08-02T00:00:00Z',
      ultima_atualizacao: '2024-08-02T00:00:00Z',
      secoes: [
          // Mapeamento das seções, subseções, etc.
      ],
    },
    {
      id_tela: 'boss_team',
      nome_tela: 'Nossa Equipe',
      rota_frontend: '/boss/team',
      status_geral: 'estavel',
      criado_em: '2024-08-07T00:00:00Z',
      ultima_atualizacao: '2024-08-07T00:00:00Z',
      secoes: [
        {
          id_secao: 'crud_equipe',
          id_tela: 'boss_team',
          nome_secao: 'Gerenciamento de Membros',
          origem: 'manual',
          status: 'ativa',
          subsecoes: [
            {
              id_subsecao: 'form_membro',
              id_secao: 'crud_equipe',
              nome_subsecao: 'Formulário de Adição/Edição',
              status: 'ativa',
              funcoes: [
                {
                  id_funcao: 'salvar_membro',
                  id_subsecao: 'form_membro',
                  descricao_funcional: 'Cria ou atualiza um membro da equipe no Firestore.',
                  status_funcao: 'estavel',
                  implementado_em: '2024-08-07T00:00:00Z',
                  testado_em: '2024-08-07T00:00:00Z',
                  bugs: [],
                  reteste_habilitado: true,
                  acoes: [
                    { id_acao: 'btn_salvar_membro', id_funcao: 'salvar_membro', tipo: 'submit', identificador_frontend: 'handleSave', evento_firebase: 'boss_save_team_member', tela_origem: '/boss/team', ultima_execucao: null, status_acao: 'ativa' }
                  ],
                },
              ],
            },
            {
              id_subsecao: 'lista_membros',
              id_secao: 'crud_equipe',
              nome_subsecao: 'Listagem de Membros',
              status: 'ativa',
              funcoes: [
                {
                  id_funcao: 'remover_membro',
                  id_subsecao: 'lista_membros',
                  descricao_funcional: 'Remove um membro da equipe do Firestore.',
                  status_funcao: 'estavel',
                  implementado_em: '2024-08-07T00:00:00Z',
                  testado_em: '2024-08-07T00:00:00Z',
                  bugs: [],
                  reteste_habilitado: true,
                  acoes: [
                    { id_acao: 'btn_remover_membro', id_funcao: 'remover_membro', tipo: 'botao', identificador_frontend: 'handleConfirmRemove', evento_firebase: 'boss_delete_team_member', tela_origem: '/boss/team', ultima_execucao: null, status_acao: 'ativa' }
                  ],
                }
              ]
            }
          ],
        },
      ],
    },
    {
        id_tela: 'boss_messages',
        nome_tela: 'Mensagens Recebidas',
        rota_frontend: '/boss/messages',
        status_geral: 'estavel',
        criado_em: '2024-08-02T00:00:00Z',
        ultima_atualizacao: '2024-08-02T00:00:00Z',
        secoes: [],
    },
    {
        id_tela: 'boss_financial',
        nome_tela: 'Financeiro',
        rota_frontend: '/boss/financial',
        status_geral: 'estavel',
        criado_em: '2024-08-02T00:00:00Z',
        ultima_atualizacao: '2024-08-02T00:00:00Z',
        secoes: [],
    },
    {
        id_tela: 'boss_security_rules',
        nome_tela: 'Regras de CyberSegurança',
        rota_frontend: '/boss/security-rules',
        status_geral: 'estavel',
        criado_em: '2024-08-03T00:00:00Z',
        ultima_atualizacao: '2024-08-03T00:00:00Z',
        secoes: [],
    },
    {
        id_tela: 'boss_security_logs',
        nome_tela: 'Relação Logins e Senhas',
        rota_frontend: '/boss/security-logs',
        status_geral: 'estavel',
        criado_em: '2024-08-03T00:00:00Z',
        ultima_atualizacao: '2024-08-03T00:00:00Z',
        secoes: [],
    },
    {
        id_tela: 'boss_partner_logs',
        nome_tela: 'Logs de Parceiros',
        rota_frontend: '/boss/partner-logs',
        status_geral: 'estavel',
        criado_em: '2024-08-03T00:00:00Z',
        ultima_atualizacao: '2024-08-03T00:00:00Z',
        secoes: [],
    },
    {
        id_tela: 'boss_snapshot',
        nome_tela: 'Backup do Sistema',
        rota_frontend: '/boss/snapshot',
        status_geral: 'estavel',
        criado_em: '2024-08-03T00:00:00Z',
        ultima_atualizacao: '2024-08-03T00:00:00Z',
        secoes: [],
    },
    {
        id_tela: 'boss_workflow',
        nome_tela: 'Workflow',
        rota_frontend: '/boss/workflow',
        status_geral: 'estavel',
        criado_em: '2024-08-05T00:00:00Z',
        ultima_atualizacao: '2024-08-05T00:00:00Z',
        secoes: [],
    },
    {
      id_tela: 'boss_updates_hub',
      nome_tela: 'Mapa de Updates',
      rota_frontend: '/boss/updates',
      status_geral: 'em_desenvolvimento',
      criado_em: '2024-08-08T00:00:00Z',
      ultima_atualizacao: '2024-08-08T00:00:00Z',
      secoes: [
        {
          id_secao: 'selecao_mapa',
          id_tela: 'boss_updates_hub',
          nome_secao: 'Seleção de Portal para Mapeamento',
          origem: 'manual',
          status: 'ativa',
          subsecoes: [
            {
              id_subsecao: 'navegacao_mapas',
              id_secao: 'selecao_mapa',
              nome_subsecao: 'Navegação para Mapas',
              status: 'ativa',
              funcoes: [
                {
                  id_funcao: 'navegar_mapa_boss',
                  id_subsecao: 'navegacao_mapas',
                  descricao_funcional: 'Navega para a tela de mapa de sistema do Portal BOSS.',
                  status_funcao: 'estavel',
                  implementado_em: '2024-08-08T00:00:00Z',
                  testado_em: '2024-08-08T00:00:00Z',
                  bugs: [],
                  reteste_habilitado: true,
                  acoes: [
                    { id_acao: 'link_mapa_boss', id_funcao: 'navegar_mapa_boss', tipo: 'botao', identificador_frontend: 'Link[href="/boss/updates/system-map"]', evento_firebase: 'navigate_to_system_map', tela_origem: '/boss/updates', ultima_execucao: null, status_acao: 'ativa' }
                  ],
                },
              ],
            },
          ],
        },
      ],
    }
  ];

  export const mockClientPortalTree: SystemScreen[] = [
    {
      id_tela: 'client_dashboard',
      nome_tela: 'Painel do Cliente',
      rota_frontend: '/dashboard',
      status_geral: 'estavel',
      criado_em: '2024-07-29T00:00:00Z',
      ultima_atualizacao: '2024-07-29T00:00:00Z',
      secoes: [],
    },
    {
        id_tela: 'client_cases',
        nome_tela: 'Casos',
        rota_frontend: '/cases',
        status_geral: 'estavel',
        criado_em: '2024-07-29T00:00:00Z',
        ultima_atualizacao: '2024-07-29T00:00:00Z',
        secoes: [],
    },
    {
        id_tela: 'client_documents',
        nome_tela: 'Documentos',
        rota_frontend: '/documents',
        status_geral: 'estavel',
        criado_em: '2024-07-29T00:00:00Z',
        ultima_atualizacao: '2024-07-29T00:00:00Z',
        secoes: [],
    },
    {
        id_tela: 'client_messages',
        nome_tela: 'Mensagens',
        rota_frontend: '/messages',
        status_geral: 'estavel',
        criado_em: '2024-07-29T00:00:00Z',
        ultima_atualizacao: '2024-07-29T00:00:00Z',
        secoes: [],
    },
    {
        id_tela: 'client_invoices',
        nome_tela: 'Faturas',
        rota_frontend: '/invoices',
        status_geral: 'estavel',
        criado_em: '2024-07-29T00:00:00Z',
        ultima_atualizacao: '2024-07-29T00:00:00Z',
        secoes: [],
    },
    {
        id_tela: 'client_ai_assistant',
        nome_tela: 'Assistente IA',
        rota_frontend: '/recommendations',
        status_geral: 'estavel',
        criado_em: '2024-08-01T00:00:00Z',
        ultima_atualizacao: '2024-08-01T00:00:00Z',
        secoes: [],
    }
  ];

  export const mockPartnerPortalTree: SystemScreen[] = [
    {
        id_tela: 'partner_alliances',
        nome_tela: 'Alianças Estratégicas',
        rota_frontend: '/partner/strategic-alliances',
        status_geral: 'estavel',
        criado_em: '2024-07-31T00:00:00Z',
        ultima_atualizacao: '2024-07-31T00:00:00Z',
        secoes: [],
    },
    {
        id_tela: 'partner_cases',
        nome_tela: 'Casos da Parceria',
        rota_frontend: '/partner/cases',
        status_geral: 'estavel',
        criado_em: '2024-07-31T00:00:00Z',
        ultima_atualizacao: '2024-07-31T00:00:00Z',
        secoes: [],
    },
    {
        id_tela: 'partner_financials',
        nome_tela: 'Controle Financeiro',
        rota_frontend: '/partner/financials',
        status_geral: 'estavel',
        criado_em: '2024-08-01T00:00:00Z',
        ultima_atualizacao: '2024-08-01T00:00:00Z',
        secoes: [],
    },
    {
        id_tela: 'partner_propose',
        nome_tela: 'Propor nova parceria',
        rota_frontend: '/partner/propose',
        status_geral: 'estavel',
        criado_em: '2024-07-31T00:00:00Z',
        ultima_atualizacao: '2024-07-31T00:00:00Z',
        secoes: [],
    },
    {
        id_tela: 'partner_profile',
        nome_tela: 'Meus Dados',
        rota_frontend: '/partner/profile',
        status_geral: 'estavel',
        criado_em: '2024-07-31T00:00:00Z',
        ultima_atualizacao: '2024-07-31T00:00:00Z',
        secoes: [],
    },
    {
        id_tela: 'partner_faq',
        nome_tela: 'Perguntas Frequentes',
        rota_frontend: '/partner/faq',
        status_geral: 'estavel',
        criado_em: '2024-08-03T00:00:00Z',
        ultima_atualizacao: '2024-08-03T00:00:00Z',
        secoes: [],
    }
  ];

  export const mockCollaboratorPortalTree: SystemScreen[] = [
    {
        id_tela: 'collaborator_dashboard',
        nome_tela: 'Dashboard',
        rota_frontend: '/collaborator/dashboard',
        status_geral: 'estavel',
        criado_em: '2024-07-30T00:00:00Z',
        ultima_atualizacao: '2024-07-30T00:00:00Z',
        secoes: [],
    },
    {
        id_tela: 'collaborator_viability',
        nome_tela: 'Análises de viabilidade',
        rota_frontend: '/collaborator/viability-analysis',
        status_geral: 'em_desenvolvimento',
        criado_em: '2024-07-30T00:00:00Z',
        ultima_atualizacao: '2024-07-30T00:00:00Z',
        secoes: [],
    },
    {
        id_tela: 'collaborator_cases',
        nome_tela: 'Casos delegados',
        rota_frontend: '/collaborator/delegated-cases',
        status_geral: 'em_desenvolvimento',
        criado_em: '2024-07-30T00:00:00Z',
        ultima_atualizacao: '2024-07-30T00:00:00Z',
        secoes: [],
    },
    {
        id_tela: 'collaborator_financial',
        nome_tela: 'Financeiro',
        rota_frontend: '/collaborator/financial',
        status_geral: 'em_desenvolvimento',
        criado_em: '2024-07-30T00:00:00Z',
        ultima_atualizacao: '2024-07-30T00:00:00Z',
        secoes: [],
    },
    {
        id_tela: 'collaborator_partnerships',
        nome_tela: 'Parcerias internas',
        rota_frontend: '/collaborator/internal-partnerships',
        status_geral: 'em_desenvolvimento',
        criado_em: '2024-07-30T00:00:00Z',
        ultima_atualizacao: '2024-07-30T00:00:00Z',
        secoes: [],
    }
  ];

  // Types for Quality Control Test Plan
  export type Status =
  | 'Pendente de Verificação'
  | 'Aguardando Teste'
  | 'Com Defeito'
  | 'Testado em ambiente simulado'
  | 'Testado em ambiente real';

  export type Verification = {
    id: string;
    text: string;
    status: Status;
  };
  
  export type SubFunction = {
    id: string;
    title: string;
    description: string;
    status: Status;
    verifications: Verification[];
  };
  
  export type MainFunction = {
    id: string;
    title: string;
    description: string;
    status: Status;
    createdAt?: any;
    subFunctions: SubFunction[];
  };
  
  export const initialTestPlan: Omit<MainFunction, 'id' | 'createdAt'>[] = [
    {
      title: '🔐 Seção: Login do Cliente',
      description:
        'Verifica todas as funcionalidades e validações da tela de login principal.',
      status: 'Pendente de Verificação',
      subFunctions: [
        {
          id: 'sub-email-cpf',
          title: 'Verificar campo Email/CPF',
          description:
            'Garantir que o campo de entrada principal aceite os formatos corretos e lide com erros.',
          status: 'Pendente de Verificação',
          verifications: [
            {
              id: 'v1.1',
              text: 'Verificar se o campo aceita email válido',
              status: 'Pendente de Verificação',
            },
            {
              id: 'v1.2',
              text: 'Verificar se o campo aceita CPF com e sem máscara (validação futura)',
              status: 'Pendente de Verificação',
            },
            {
              id: 'v1.3',
              text: 'Verificar se o campo bloqueia envio vazio',
              status: 'Pendente de Verificação',
            },
            {
              id: 'v1.4',
              text: 'Verificar mensagem de erro para formato inválido',
              status: 'Pendente de Verificação',
            },
            {
              id: 'v1.5',
              text: 'Verificar se o placeholder “seu@email.com” é exibido corretamente',
              status: 'Pendente de Verificação',
            },
          ],
        },
        {
          id: 'sub-senha',
          title: 'Verificar campo Senha',
          description: 'Garantir que o campo de senha funcione como esperado.',
          status: 'Pendente de Verificação',
          verifications: [
            {
              id: 'v2.1',
              text: 'Verificar se o campo está mascarado',
              status: 'Pendente de Verificação',
            },
            {
              id: 'v2.2',
              text: 'Verificar se o link "Esqueceu sua senha?" está visível',
              status: 'Pendente de Verificação',
            },
          ],
        },
      ],
    },
    {
      title: '📊 Seção: Dashboard do Cliente',
      description: 'Verifica a correta exibição dos dados e componentes no painel principal do cliente.',
      status: 'Pendente de Verificação',
      subFunctions: [
          {
              id: 'sub-cards-kpi',
              title: 'Verificar Cards de Indicadores',
              description: 'Garantir que os cards de resumo (Casos, Mensagens, Faturas, Documentos) carreguem e exibam os números corretos.',
              status: 'Pendente de Verificação',
              verifications: [
                  { id: 'v3.1', text: 'Verificar se o card "Casos Ativos" exibe a contagem correta.', status: 'Pendente de Verificação' },
                  { id: 'v3.2', text: 'Verificar se o card "Mensagens não lidas" exibe a contagem correta.', status: 'Pendente de Verificação' },
                  { id: 'v3.3', text: 'Verificar se o card "Faturas pendentes" exibe a contagem correta.', status: 'Pendente de Verificação' },
                  { id: 'v3.4', text: 'Verificar se o card "Documentos Totais" exibe a contagem correta.', status: 'Pendente de Verificação' },
              ]
          },
          {
              id: 'sub-tabela-casos',
              title: 'Verificar Tabela de Casos',
              description: 'Testar a funcionalidade da tabela de casos na tela /cases.',
              status: 'Pendente de Verificação',
              verifications: [
                  { id: 'v4.1', text: 'Verificar se todos os casos do cliente são listados.', status: 'Pendente de Verificação' },
                  { id: 'v4.2', text: 'Verificar se o botão "Ver atualização" redireciona para a URL correta.', status: 'Pendente de Verificação' },
                  { id: 'v4.3', text: 'Verificar se o status do caso (Badge) é exibido com a cor correta.', status: 'Pendente de Verificação' },
              ]
          }
      ]
    },
    {
      title: '📝 Seção: Cadastro de Novo Cliente',
      description: 'Verifica todo o fluxo de cadastro para Pessoas Físicas e Jurídicas.',
      status: 'Pendente de Verificação',
      subFunctions: [
        {
          id: 'sub-tipo-pessoa',
          title: 'Verificar Seleção de Tipo de Pessoa',
          description: 'Garantir que a alternância entre Pessoa Física e Jurídica funciona e exibe os campos corretos.',
          status: 'Pendente de Verificação',
          verifications: [
            { id: 'v5.1', text: 'Ao clicar em "Pessoa Jurídica", verificar se os campos de PF são ocultados e os de PJ são exibidos.', status: 'Pendente de Verificação' },
            { id: 'v5.2', text: 'Ao clicar em "Pessoa Física", verificar se os campos de PJ são ocultados e os de PF são exibidos.', status: 'Pendente de Verificação' },
          ],
        },
        {
          id: 'sub-submit-form',
          title: 'Verificar Submissão do Formulário',
          description: 'Garantir que os dados são corretamente salvos no Firestore e o usuário é redirecionado.',
          status: 'Pendente de Verificação',
          verifications: [
            { id: 'v6.1', text: 'Verificar se um novo usuário é criado no Firebase Auth após o cadastro.', status: 'Pendente de Verificação' },
            { id: 'v6.2', text: 'Verificar se um documento correspondente é criado na coleção `clients` do Firestore com o mesmo UID.', status: 'Pendente de Verificação' },
            { id: 'v6.3', text: 'Verificar se o usuário é redirecionado para /dashboard após o sucesso.', status: 'Pendente de Verificação' },
            { id: 'v6.4', text: 'Verificar se a mensagem de "Cadastro Realizado com Sucesso!" é exibida (toast).', status: 'Pendente de Verificação' },
          ],
        },
      ],
    },
    {
        title: '⚡ Seção: Teste de Performance',
        description: 'Verifica a performance e a velocidade de carregamento da aplicação.',
        status: 'Pendente de Verificação',
        subFunctions: [
          {
            id: 'perf-sub-lcp',
            title: 'Tempo de Carregamento Inicial (LCP)',
            description: 'Mede o tempo que o maior elemento de conteúdo leva para se tornar visível na tela.',
            status: 'Pendente de Verificação',
            verifications: [
              { id: 'perf-v1.1', text: 'Página deve atingir LCP em menos de 2.5s em conexão 4G rápida.', status: 'Pendente de Verificação' },
              { id: 'perf-v1.2', text: 'Verificar o tamanho do bundle Javascript inicial e otimizar se necessário.', status: 'Pendente de Verificação' },
            ],
          },
          {
            id: 'perf-sub-inp',
            title: 'Responsividade da Interface (INP)',
            description: 'Mede a latência de todas as interações do usuário com a página.',
            status: 'Pendente de Verificação',
            verifications: [
              { id: 'perf-v2.1', text: 'INP deve ser consistentemente abaixo de 200ms.', status: 'Pendente de Verificação' },
              { id: 'perf-v2.2', text: 'Analisar e otimizar tarefas longas de Javascript que bloqueiam a thread principal.', status: 'Pendente de Verificação' },
            ],
          },
        ],
    },
  ];

  export const initialBossTestPlan: Omit<MainFunction, 'id' | 'createdAt'>[] = [
    {
      title: '💡 Seção: Planejamento Estratégico',
      description: 'Registra ideias e diretrizes estratégicas para o futuro do projeto.',
      status: 'Pendente de Verificação',
      subFunctions: [
        {
          id: 'plan-sub-sequential-tabs',
          title: 'Implementar Travas Sequenciais no Funil de Atendimento',
          description: 'No Funil de Atendimento (CEDRP), implementar uma lógica onde uma aba (etapa) só é habilitada após a conclusão da etapa anterior. Isso garantirá que o fluxo de trabalho seja seguido corretamente quando o sistema estiver em produção.',
          status: 'Pendente de Verificação',
          verifications: [
            { id: 'plan-seq-tabs-v1.1', text: 'Mapear as condições de conclusão para cada aba do funil (ex: aba "Informações" concluída quando o formulário é salvo).', status: 'Pendente de Verificação' },
            { id: 'plan-seq-tabs-v1.2', text: 'Implementar a lógica `disabled` condicional nos componentes `TabsTrigger` no arquivo `/boss/service-desk/page.tsx`.', status: 'Pendente de Verificação' },
            { id: 'plan-seq-tabs-v1.3', text: 'Garantir que haja um feedback visual claro para o usuário sobre por que uma aba está desabilitada.', status: 'Pendente de Verificação' },
          ],
        },
        {
          id: 'plan-sub-dashboard-unification',
          title: 'Unificação do Dashboard do Cliente para Escalabilidade',
          description: 'Reavaliar a arquitetura do Portal do Cliente para unificar informações que orbitam um "Processo" (como audiências, perícias, solicitações) em uma única visão ou dashboard consolidado. O objetivo é otimizar a UI/UX, evitar a proliferação de abas e controlar custos de leitura do Firebase em escala.',
          status: 'Pendente de Verificação',
          verifications: [
            { id: 'plan-unification-v1.1', text: 'Mapear todas as entidades de dados que se relacionam diretamente com um "Processo".', status: 'Pendente de Verificação' },
            { id: 'plan-unification-v1.2', text: 'Desenhar um protótipo de UI para o novo dashboard unificado, considerando a clareza e a hierarquia da informação.', status: 'Pendente de Verificação' },
            { id: 'plan-unification-v1.3', text: 'Analisar o impacto na estrutura de dados do Firestore e planejar a desnormalização de dados necessária para otimizar as consultas.', status: 'Pendente de Verificação' },
            { id: 'plan-unification-v1.4', text: 'Estimar a redução de leituras no Firebase com a nova abordagem em um cenário com múltiplos processos por cliente.', status: 'Pendente de Verificação' },
          ],
        },
        {
          id: 'plan-sub-hub-clarity',
          title: 'Reavaliação da Clareza do Hub Principal',
          description: 'Analisar o hub de portais (/), sob a perspectiva de um usuário final, para mitigar possíveis dúvidas sobre qual portal acessar. O objetivo é garantir que a distinção entre cada portal seja imediatamente clara.',
          status: 'Pendente de Verificação',
          verifications: [
            { id: 'plan-hub-v1.1', text: 'Conduzir teste de usabilidade (simulado) com foco no tempo e cliques necessários para o usuário encontrar o portal correto.', status: 'Pendente de Verificação' },
            { id: 'plan-hub-v1.2', text: 'Avaliar a necessidade de adicionar subtítulos ou tooltips mais descritivos nos cards dos portais.', status: 'Pendente de Verificação' },
            { id: 'plan-hub-v1.3', text: 'Considerar a reorganização da ordem dos portais com base na frequência de acesso ou na importância estratégica.', status: 'Pendente de Verificação' },
          ],
        },
        {
          id: 'plan-sub-usage-api',
          title: 'Integrar com API de Usage do Firebase/GC',
          description: 'Substituir os dados mockados da tela de Capacidade por dados reais. Ponto crítico: Exige implementação de backend para chamadas autenticadas, o que está fora do escopo atual da ferramenta.',
          status: 'Pendente de Verificação',
          verifications: [
            { id: 'plan-v1.1', text: 'Analisar a documentação da API de Billing e Usage do Google Cloud.', status: 'Pendente de Verificação' },
            { id: 'plan-v1.2', text: 'Definir a arquitetura de backend necessária (ex: Cloud Function).', status: 'Pendente de Verificação' },
            { id: 'plan-v1.3', text: 'Implementar a lógica de cache para evitar chamadas excessivas à API.', status: 'Pendente de Verificação' },
          ],
        },
        {
          id: 'plan-sub-partner-portal',
          title: 'Criar Portal do Parceiro Externo',
          description: 'Desenvolver um novo portal para parceiros estratégicos (Contabilidade, Marketing, etc.) para colaboração e indicação de clientes.',
          status: 'Pendente de Verificação',
          verifications: [
            { id: 'plan-v2.1', text: 'Definir o escopo de funcionalidades do portal (MVP).', status: 'Pendente de Verificação' },
            { id: 'plan-v2.2', text: 'Estruturar o modelo de dados no Firestore para parceiros externos.', status: 'Pendente de Verificação' },
          ],
        },
        {
          id: 'plan-sub-consulting-page',
          title: 'Alterar Página "Conheça +" para Consultoria',
          description: 'Redirecionar ou adaptar a página "Conheça + a Giffoni Advogados Associados" no canto superior direito para focar na área de consultoria.',
          status: 'Pendente de Verificação',
          verifications: [
            { id: 'plan-v3.1', text: 'Avaliar se será uma nova página ou um redirecionamento.', status: 'Pendente de Verificação' },
            { id: 'plan-v3.2', text: 'Definir o conteúdo e o design da nova seção/página de consultoria.', status: 'Pendente de Verificação' },
          ],
        },
        {
          id: 'plan-sub-crm-integration',
          title: 'Integrar com CRMs (Facebook, Instagram, WhatsApp)',
          description: 'Analisar e amadurecer a ideia de integrar o sistema com plataformas de redes sociais para captura e gerenciamento de leads.',
          status: 'Pendente de Verificação',
          verifications: [
            { id: 'plan-v4.1', text: 'Pesquisar as APIs disponíveis para Facebook, Instagram e WhatsApp Business.', status: 'Pendente de Verificação' },
            { id: 'plan-v4.2', text: 'Definir o fluxo de dados: como um lead capturado na rede social chegaria ao Portal BOSS.', status: 'Pendente de Verificação' },
            { id: 'plan-v4.3', text: 'Avaliar a complexidade e o custo de implementação.', status: 'Pendente de Verificação' },
          ],
        },
        {
            id: 'plan-sub-gdocs-integration',
            title: 'Automatizar "1º Atendimento" com Google Docs',
            description: 'Integrar o formulário de cadastro de novos clientes do site para que os dados preenchidos sejam automaticamente enviados para um novo Google Doc, formatado como a ficha de "1º atendimento".',
            status: 'Pendente de Verificação',
            verifications: [
              { id: 'plan-v5.1', text: 'Pesquisar a API do Google Docs para criação e edição de documentos.', status: 'Pendente de Verificação' },
              { id: 'plan-v5.2', text: 'Definir a arquitetura de backend (ex: Cloud Function) para orquestrar a chamada à API do Google Docs após o cadastro do cliente no Firestore.', status: 'Pendente de Verificação' },
              { id: 'plan-v5.3', text: 'Criar um template base do documento "1º atendimento" no Google Docs para ser usado na automação.', status: 'Pendente de Verificação' },
            ],
          },
          {
            id: 'plan-sub-api-key-auth',
            title: 'Implementar Segunda Camada de Autenticação para Chaves de API',
            description: 'Para proteger o acesso à tela de "Chaves de API\'s", implementar um segundo fator de autenticação na forma de uma senha mestra (com no mínimo 20 caracteres) que será solicitada sempre que o usuário tentar acessar esta seção crítica.',
            status: 'Pendente de Verificação',
            verifications: [
              { id: 'plan-v6.1', text: 'Desenvolver o modal de senha mestra.', status: 'Pendente de Verificação' },
              { id: 'plan-v6.2', text: 'Armazenar o hash da senha mestra de forma segura no backend.', status: 'Pendente de Verificação' },
              { id: 'plan-v6.3', text: 'Garantir que a verificação da senha bloqueie o acesso à página de Chaves de API em caso de falha.', status: 'Pendente de Verificação' },
            ],
          },
          {
            id: 'plan-sub-dev-mode-auth',
            title: 'Proteger Modo Desenvolvedor com Autenticação',
            description: 'Para prevenir acesso não autorizado em caso de comprometimento do ambiente de desenvolvimento (roubo de notebook, ataque hacker), o próprio modo desenvolvedor deve ser protegido por uma camada de autenticação separada.',
            status: 'Pendente de Verificação',
            verifications: [
              { id: 'plan-v7.1', text: 'Avaliar a melhor abordagem para a autenticação (ex: senha de ambiente, login específico).', status: 'Pendente de Verificação' },
              { id: 'plan-v7.2', text: 'Implementar a lógica de bloqueio antes que qualquer funcionalidade de desenvolvedor seja carregada.', status: 'Pendente de Verificação' },
              { id: 'plan-v7.3', text: 'Garantir que esta proteção não afete o ambiente de produção.', status: 'Pendente de Verificação' },
            ],
          },
          {
            id: 'plan-sub-trigger-report',
            title: 'Criar Relatório de Gatilhos, Ações e Reações',
            description: 'Desenvolver um relatório no Portal BOSS que mapeie todos os gatilhos do sistema (ex: "usuário clica em botão X"), as ações de backend/frontend que são executadas, e as reações esperadas na interface, criando uma matriz de causa e efeito para debug e análise de comportamento.',
            status: 'Pendente de Verificação',
            verifications: [
              { id: 'plan-v8.1', text: 'Definir o formato e a estrutura visual do relatório.', status: 'Pendente de Verificação' },
              { id: 'plan-v8.2', text: 'Avaliar como capturar e documentar os gatilhos de forma semi-automatizada.', status: 'Pendente de Verificação' },
              { id: 'plan-v8.3', text: 'Integrar o relatório à sidebar e ao painel de Updates ou criar uma nova seção.', status: 'Pendente de Verificação' },
            ],
          },
          {
            id: 'plan-sub-ai-agent-integration',
            title: 'Terceira Onda: Integrar Agentes de IA ao Workflow',
            description: 'Planejar a integração de agentes de IA autônomos que possam executar tarefas complexas do workflow, como pré-análise de documentos ou preenchimento automático de formulários, visando a eliminação de trabalho humano repetitivo.',
            status: 'Pendente de Verificação',
            verifications: [
              { id: 'plan-v9.1', text: 'Identificar 2 a 3 tarefas do workflow atual que sejam bons candidatos para automação por IA.', status: 'Pendente de Verificação' },
              { id: 'plan-v9.2', text: 'Pesquisar e definir a stack de tecnologia para criar e gerenciar agentes autônomos (ex: LangChain, Genkit com tools).', status: 'Pendente de Verificação' },
              { id: 'plan-v9.3', text: 'Desenvolver um protótipo de agente para uma das tarefas identificadas.', status: 'Pendente de Verificação' },
            ],
          },
          {
            id: 'plan-sub-funnel-redesign',
            title: 'Redesenhar Funil de Eventos para Automação',
            description: 'Adaptar o conceito de funil de eventos para incluir interações e gatilhos originados por automações e agentes de IA, não apenas por usuários humanos, garantindo uma análise de fluxo de trabalho completa.',
            status: 'Pendente de Verificação',
            verifications: [
              { id: 'plan-v10.1', text: 'Mapear o funil de eventos atual, focado em interações humanas.', status: 'Pendente de Verificação' },
              { id: 'plan-v10.2', text: 'Identificar pontos no workflow onde agentes de IA ou automações (Webhooks) podem iniciar ou continuar um fluxo.', status: 'Pendente de Verificação' },
              { id: 'plan-v10.3', text: 'Desenhar um novo esquema para o funil que diferencie eventos de "usuário" de eventos de "sistema/agente".', status: 'Pendente de Verificação' },
            ],
          },
          {
            id: 'plan-sub-workflow-automation',
            title: 'Criar Workflows Automatizados Multi-Sistemas',
            description: 'Desenvolver automações que conectam eventos do sistema a múltiplas ferramentas externas. Exemplo: Uma atualização de status de caso no portal dispara uma atualização no Todoist para a controladoria e, simultaneamente, envia uma notificação agendada ao cliente via CRM (W.A. Speed).',
            status: 'Pendente de Verificação',
            verifications: [
              { id: 'plan-v11.1', text: 'Mapear os gatilhos-chave no sistema (ex: atualização de caso, novo documento).', status: 'Pendente de Verificação' },
              { id: 'plan-v11.2', text: 'Definir as ações correspondentes em sistemas externos (Todoist, W.A. Speed, etc.).', status: 'Pendente de Verificação' },
              { id: 'plan-v11.3', text: 'Estudar a viabilidade de usar uma ferramenta de orquestração como n8n ou criar um serviço de backend próprio para gerenciar esses fluxos.', status: 'Pendente de Verificação' },
            ],
          },
          {
            id: 'plan-sub-role-based-portals',
            title: 'Avaliar Criação de Portais por Função',
            description: 'Avaliar a viabilidade e necessidade de desmembrar o "Portal do Colaborador" em portais específicos por função, como Portal da Gerência, Portal do Secretariado e Portal do Advogado Associado, para oferecer interfaces e ferramentas mais focadas.',
            status: 'Pendente de Verificação',
            verifications: [
              { id: 'plan-v12.1', text: 'Mapear as funcionalidades exclusivas de cada função (Gerência, Secretariado, Advogado).', status: 'Pendente de Verificação' },
              { id: 'plan-v12.2', text: 'Analisar o custo-benefício de criar e manter múltiplos portais versus usar um sistema de permissões no portal unificado.', status: 'Pendente de Verificação' },
              { id: 'plan-v12.3', text: 'Desenhar um protótipo de interface para um dos portais específicos, como o da Gerência.', status: 'Pendente de Verificação' },
            ],
          },
          {
            id: 'plan-sub-educational-portal',
            title: 'Planejar Portal "Giffoni - Gestão para Advogados"',
            description: 'Estruturar o projeto de um novo portal educacional para ensinar gestão a advogados, tratando escritórios como empresas. Envolve desafios de hospedagem de mídia e estrutura pedagógica.',
            status: 'Pendente de Verificação',
            verifications: [
              { id: 'plan-v13.1', text: 'Definir o público-alvo e a estrutura de cursos (módulos, aulas).', status: 'Pendente de Verificação' },
              { id: 'plan-v13.2', text: 'Pesquisar e selecionar plataformas de hospedagem de vídeo e conteúdo (ex: Vimeo, Mux, plataformas LMS).', status: 'Pendente de Verificação' },
              { id: 'plan-v13.3', text: 'Desenvolver um MVP (Produto Mínimo Viável) com um curso piloto para validar o modelo de negócio.', status: 'Pendente de Verificação' },
              { id: 'plan-v13.4', text: 'Criar o modelo de dados no Firestore para gerenciar alunos, cursos e progresso.', status: 'Pendente de Verificação' },
            ],
          },
          {
            id: 'plan-sub-info-type-bank',
            title: 'Otimizar Solicitações com Banco de Tipos de Informação',
            description: 'Desenvolver um "banco de tipos" para as informações mais frequentemente solicitadas aos clientes, permitindo que a equipe selecione um tipo pré-definido (ex: "Endereço da testemunha", "Dados bancários para reembolso") em vez de digitar repetidamente, otimizando o fluxo de trabalho.',
            status: 'Pendente de Verificação',
            verifications: [
              { id: 'plan-v14.1', text: 'Analisar as 10 informações mais comuns solicitadas aos clientes.', status: 'Pendente de Verificação' },
              { id: 'plan-v14.2', text: 'Modelar a estrutura no Firestore para armazenar esses "tipos de informação".', status: 'Pendente de Verificação' },
              { id: 'plan-v14.3', text: 'Prototipar a interface no Portal BOSS para que a equipe possa usar o banco de tipos ao criar uma nova solicitação.', status: 'Pendente de Verificação' },
            ],
          },
          {
            id: 'plan-sub-gdrive-automation',
            title: '🤖 Automação: Envio de Provas para Google Drive',
            description: 'Aprimorar a tela de "Solicitação de Provas" para automatizar o recebimento de documentos. O cliente poderá anexar arquivos que serão enviados via API para uma pasta específica do cliente no Google Drive.',
            status: 'Pendente de Verificação',
            verifications: [
              { id: 'plan-v15.1', text: 'Implementar a interface de upload de arquivos no modal de "Enviar Prova" no Portal do Cliente.', status: 'Pendente de Verificação' },
              { id: 'plan-v15.2', text: 'Configurar a API do Google Drive e a autenticação necessária (OAuth 2.0).', status: 'Pendente de Verificação' },
              { id: 'plan-v15.3', text: 'Desenvolver um backend (ex: Cloud Function) que receba o arquivo, identifique o cliente e o caso, e o envie para a pasta correta no Drive.', status: 'Pendente de Verificação' },
              { id: 'plan-v15.4', text: 'Adicionar a coluna "Forma de Envio" na tabela de solicitações, com as opções: "Via Drive", "E-mail", "WhatsApp", "Fisicamente".', status: 'Pendente de Verificação' },
            ],
          },
          {
            id: 'plan-sub-gmeet-automation',
            title: '🤖 Automação: Criação de Reuniões no Google Meet',
            description: 'No Portal BOSS, na tela de gerenciamento de reuniões, adicionar um botão "Criar Reunião via Google Meet". Ao ser clicado, o sistema deve usar a API do Google Calendar para criar um novo evento com um link do Meet gerado automaticamente, e então salvar esse link no registro da reunião no Firestore, atualizando o Portal do Cliente.',
            status: 'Pendente de Verificação',
            verifications: [
              { id: 'plan-v16.1', text: 'Pesquisar a API do Google Calendar para criação de eventos e geração de links do Meet.', status: 'Pendente de Verificação' },
              { id: 'plan-v16.2', text: 'Implementar a interface no Portal BOSS, incluindo o botão "Criar Reunião".', status: 'Pendente de Verificação' },
              { id: 'plan-v16.3', text: 'Desenvolver o backend (ex: Cloud Function) para orquestrar a chamada à API do Google Calendar e a atualização no Firestore.', status: 'Pendente de Verificação' },
            ],
          },
      ],
    },
    {
        title: '✅ Seção: Validação dos Manuais do Usuário (Passo a Passo)',
        description: 'Garante que os guias "Passo a Passo" em todos os portais sejam detalhados, visuais e funcionais.',
        status: 'Pendente de Verificação',
        subFunctions: [
          {
            id: 'val-manual-v1',
            title: 'Verificar Estrutura e Funcionalidade dos Modais',
            description: 'Testa a funcionalidade básica dos modais de passo a passo em todos os portais.',
            status: 'Pendente de Verificação',
            verifications: [
              { id: 'val-v1.1', text: 'Verificar se o modal abre ao clicar no botão "Passo a passo" em todas as seções de todos os portais.', status: 'Pendente de Verificação' },
              { id: 'val-v1.2', text: 'Verificar se o modal pode ser fechado corretamente.', status: 'Pendente de Verificação' },
              { id: 'val-v1.3', text: 'Verificar se o conteúdo do modal é exibido como uma lista numerada (<ol>).', status: 'Pendente de Verificação' },
            ],
          },
          {
            id: 'val-manual-v2',
            title: 'Verificar Conteúdo e Clareza das Instruções',
            description: 'Garante que as instruções sejam claras, usem destaques visuais e sigam o padrão "receita de bolo".',
            status: 'Pendente de Verificação',
            verifications: [
              { id: 'val-v2.1', text: 'Confirmar que todos os nomes de botões, seções e menus mencionados no texto estão em negrito.', status: 'Pendente de Verificação' },
              { id: 'val-v2.2', text: 'Verificar se o conteúdo de cada passo é objetivo e fácil de entender por um usuário leigo.', status: 'Pendente de Verificação' },
            ],
          },
        ],
    },
    {
      title: '🛡️ Seção: Gerenciamento de Clientes (BOSS)',
      description: 'Verifica as funcionalidades do painel de clientes no Portal BOSS.',
      status: 'Pendente de Verificação',
      subFunctions: [
        {
          id: 'boss-sub-search-client',
          title: 'Verificar Busca de Clientes',
          description: 'Garantir que a busca por nome, CPF e CNPJ funciona corretamente.',
          status: 'Pendente de Verificação',
          verifications: [
            { id: 'boss-v1.1', text: 'Buscar por nome completo deve retornar o cliente correto.', status: 'Pendente de Verificação' },
            { id: 'boss-v1.2', text: 'Buscar por parte do nome deve retornar resultados correspondentes.', status: 'Pendente de Verificação' },
            { id: 'boss-v1.3', text: 'Buscar por CPF exato deve retornar o cliente correto.', status: 'Pendente de Verificação' },
            { id: 'boss-v1.4', text: 'Buscar por CNPJ exato deve retornar o cliente correto.', status: 'Pendente de Verificação' },
            { id: 'boss-v1.5', text: 'Uma busca sem resultados deve exibir a mensagem "Nenhum cliente encontrado".', status: 'Pendente de Verificação' },
          ],
        },
        {
          id: 'boss-sub-view-details',
          title: 'Verificar Detalhes do Cliente',
          description: 'Garantir que a navegação para a página de detalhes e a exibição dos dados estão corretas.',
          status: 'Pendente de Verificação',
          verifications: [
            { id: 'boss-v2.1', text: 'Clicar em "Ver Detalhes" deve redirecionar para /boss/dashboard/[clientId].', status: 'Pendente de Verificação' },
            { id: 'boss-v2.2', text: 'Todos os campos preenchidos no cadastro devem ser exibidos corretamente na página de detalhes.', status: 'Pendente de Verificação' },
          ],
        },
      ],
    },
    {
      title: '👥 Seção: Gerenciamento de Equipe (BOSS)',
      description: 'Verifica o CRUD (Criar, Ler, Editar, Deletar) de membros da equipe.',
      status: 'Pendente de Verificação',
      subFunctions: [
        {
          id: 'boss-sub-team-crud',
          title: 'Verificar CRUD de Membros',
          description: 'Testar a adição, edição e remoção de membros da equipe na tela /boss/team.',
          status: 'Pendente de Verificação',
          verifications: [
            { id: 'boss-v3.1', text: 'Adicionar um novo membro deve exibi-lo na lista correta (Sócio, Advogado, etc).', status: 'Pendente de Verificação' },
            { id: 'boss-v3.2', text: 'Editar o nome e cargo de um membro deve refletir as mudanças na tela.', status: 'Pendente de Verificação' },
            { id: 'boss-v3.3', text: 'Remover um membro deve retirá-lo da lista.', status: 'Pendente de Verificação' },
            { id: 'boss-v3.4', text: 'A página pública /about/team deve refletir todas as alterações feitas no painel.', status: 'Pendente de Verificação' },
          ],
        },
      ],
    },
    {
        title: '💰 Seção: Financeiro (BOSS)',
        description: 'Verifica as funcionalidades do módulo financeiro.',
        status: 'Pendente de Verificação',
        subFunctions: [
          {
            id: 'boss-sub-new-contract',
            title: 'Verificar Criação de Contrato',
            description: 'Garantir o fluxo de adição de um novo contrato de honorários.',
            status: 'Pendente de Verificação',
            verifications: [
              { id: 'boss-v4.1', text: 'A busca por cliente no passo 1 deve funcionar.', status: 'Pendente de Verificação' },
              { id: 'boss-v4.2', text: 'A seleção de tipo de contrato (Particular/Parceria) deve exibir/ocultar o passo de seleção de parceiro.', status: 'Pendente de Verificação' },
              { id: 'boss-v4.3', text: 'A busca por parceiro (se aplicável) deve funcionar.', status: 'Pendente de Verificação' },
              { id: 'boss-v4.4', text: 'Após selecionar cliente (e parceiro), o formulário de detalhes financeiros deve ser exibido.', status: 'Pendente de Verificação' },
            ],
          },
        ],
    },
    {
        title: '⚡ Seção: Teste de Performance',
        description: 'Verifica a performance e a velocidade de carregamento da aplicação.',
        status: 'Pendente de Verificação',
        subFunctions: [
          {
            id: 'perf-sub-lcp',
            title: 'Tempo de Carregamento Inicial (LCP)',
            description: 'Mede o tempo que o maior elemento de conteúdo leva para se tornar visível na tela.',
            status: 'Pendente de Verificação',
            verifications: [
              { id: 'perf-v1.1', text: 'Página deve atingir LCP em menos de 2.5s em conexão 4G rápida.', status: 'Pendente de Verificação' },
              { id: 'perf-v1.2', text: 'Verificar o tamanho do bundle Javascript inicial e otimizar se necessário.', status: 'Pendente de Verificação' },
            ],
          },
          {
            id: 'perf-sub-inp',
            title: 'Responsividade da Interface (INP)',
            description: 'Mede a latência de todas as interações do usuário com a página.',
            status: 'Pendente de Verificação',
            verifications: [
              { id: 'perf-v2.1', text: 'INP deve ser consistentemente abaixo de 200ms.', status: 'Pendente de Verificação' },
              { id: 'perf-v2.2', text: 'Analisar e otimizar tarefas longas de Javascript que bloqueiam a thread principal.', status: 'Pendente de Verificação' },
            ],
          },
        ],
    },
  ];
  
  export const hubInitialData = [
      {
          id: 'TELA-1',
          title: 'TELA 1 — Portal do Cliente',
          description: 'Verificações funcionais e de interface do portal do cliente.',
          linkedRoute: '/dashboard',
      },
      {
          id: 'HUB-BOSS',
          title: 'Tela Master - Portal Boss',
          description: 'Verificações funcionais e de interface do painel administrativo principal.',
          linkedRoute: '/boss/dashboard',
      },
      {
          id: 'HUB-PARTNER',
          title: 'Portal do Parceiro',
          description: 'Verificações funcionais e de interface do portal de parceiros.',
          linkedRoute: '/partner/dashboard',
      },
      {
          id: 'HUB-COLLABORATOR',
          title: 'Portal do Colaborador',
          description: 'Verificações funcionais e de interface da área de trabalho da equipe.',
          linkedRoute: '/collaborator/dashboard',
      }
  ];


export type Audiencia = {
    id: string;
    caseNumber: string;
    court: string;
    district: string;
    type: 'Conciliação' | 'Instrução e Julgamento' | 'Una';
    date: string;
    time: string;
    location: string;
    modality: 'Presencial' | 'Virtual' | 'Híbrida';
};

export const audiencias: Audiencia[] = [
    {
        id: 'aud1',
        caseNumber: '0012345-67.2023.8.26.0100',
        court: '1ª Vara Empresarial',
        district: 'São Paulo',
        type: 'Conciliação',
        date: '2024-09-15T00:00:00Z',
        time: '14:30',
        location: 'https://meet.google.com/xyz-abc-def',
        modality: 'Virtual'
    },
    {
        id: 'aud2',
        caseNumber: '0054321-98.2023.8.19.0001',
        court: '5ª Vara Cível',
        district: 'Rio de Janeiro',
        type: 'Instrução e Julgamento',
        date: '2024-10-20T00:00:00Z',
        time: '10:00',
        location: 'Fórum Central, Sala 202',
        modality: 'Presencial'
    },
];

export type Pericia = {
    id: string;
    caseNumber: string;
    court: string;
    district: string;
    type: string;
    date: string;
    time: string;
    location: string;
    expertName: string;
};

export const pericias: Pericia[] = [
    {
        id: 'per1',
        caseNumber: '1122334-55.2023.8.13.0024',
        court: '10ª Vara Cível',
        district: 'Belo Horizonte',
        type: 'Perícia Contábil',
        date: '2024-09-25T00:00:00Z',
        time: '09:00',
        location: 'Rua do Perito, 123, Belo Horizonte/MG',
        expertName: 'Dr. Fulano de Tal'
    }
];

export type Reuniao = {
    id: string;
    pauta: string;
    date: string;
    time: string;
    location: string;
    format: 'Presencial' | 'Online';
    status: 'Agendada' | 'Confirmada' | 'Realizada' | 'Reagendar' | 'Cancelada';
    pautaDetalhada?: {
        topicos: string[];
        decisoes?: string[];
    };
};

export const reunioes: Reuniao[] = [
    {
        id: 'reu1',
        pauta: 'Alinhamento estratégico sobre o caso de Reestruturação Corporativa.',
        date: '2024-08-30T00:00:00Z',
        time: '16:00',
        location: 'https://meet.google.com/abc-def-ghi',
        format: 'Online',
        status: 'Agendada',
        pautaDetalhada: {
            topicos: [
                "Revisão da proposta de M&A recebida.",
                "Análise dos riscos fiscais da operação.",
                "Definição dos próximos passos com o conselho."
            ]
        }
    },
    {
        id: 'reu2',
        pauta: 'Revisão de documentos para Disputa de Propriedade Intelectual.',
        date: '2024-09-05T00:00:00Z',
        time: '11:00',
        location: 'Escritório Giffoni Advogados Associados',
        format: 'Presencial',
        status: 'Realizada',
        pautaDetalhada: {
            topicos: [
                "Análise da notificação extrajudicial enviada.",
                "Coleta de provas de anterioridade de uso da marca."
            ],
            decisoes: [
                "Ajuizar ação de abstenção de uso de marca.",
                "Notificar o INPI sobre o conflito."
            ]
        }
    }
];

type Andamento = {
    id: string;
    date: string;
    type: string;
    description: string;
};
  
  // Dados mockados para os andamentos, simulando a subcoleção
export const mockAndamentos: { [key: string]: Andamento[] } = {
    '1': [
        { id: 'a1', date: '2023-10-26', type: 'Despacho', description: 'CONCLUSOS PARA DESPACHO' },
        { id: 'a2', date: '2023-10-20', type: 'Juntada', description: 'Juntada de petição da parte autora.' },
        { id: 'a3', date: '2023-10-15', type: 'Ato Ordinatório', description: 'Publicado ato ordinatório.' },
        { id: 'a4', date: '2023-09-28', type: 'Citação', description: 'Realizada a citação da parte ré.' },
        { id: 'a5', date: '2023-09-10', type: 'Distribuição', description: 'Processo distribuído para a 1ª Vara Empresarial.' },
    ],
    '2': [
        { id: 'b1', date: '2023-10-25', type: 'Juntada', description: 'JUNTADA DE PETIÇÃO' },
        { id: 'b2', date: '2023-10-18', type: 'Despacho', 'description': 'Despacho de mero expediente para cumprimento de diligências.' },
        { id: 'b3', date: '2023-10-05', type: 'Audiência', 'description': 'Designada audiência de conciliação.' },
    ],
    // Adicione andamentos para outros casos se necessário
};

export type { Partner } from '../app/partner/signup/page';
export type { Collaborator } from '../app/boss/dashboard/collaborators/page';

export type PracticeAreaSeed = {
    id: string;
    title: string;
    description: string;
    href: string;
    icon: IconName;
};

export const practiceAreasInitialData: PracticeAreaSeed[] = [
    {
      id: 'direito-civil',
      title: 'Direito Civil',
      description: 'Regula as relações cotidianas, de contratos a questões familiares, protegendo seus direitos e interesses pessoais.',
      href: '/infoprodutos/direito-civil',
      icon: 'Scale',
    },
    {
      id: 'direito-empresarial',
      title: 'Direito Empresarial',
      description: 'Oferece suporte jurídico completo para empresas, desde a abertura até a gestão de contratos e questões societárias.',
      href: '/infoprodutos/direito-empresarial',
      icon: 'Building',
    },
    {
      id: 'direito-consumidor',
      title: 'Direito do Consumidor',
      description: 'Defende seus direitos em relações de consumo, atuando contra práticas abusivas e produtos defeituosos.',
      href: '/infoprodutos/direito-consumidor',
      icon: 'Shield',
    },
    {
      id: 'direito-trabalho',
      title: 'Direito do Trabalho',
      description: 'Assessoria em relações de emprego, garantindo os direitos e deveres de empregadores e empregados.',
      href: '/infoprodutos/direito-trabalho',
      icon: 'Briefcase',
    },
    {
      id: 'direito-administrativo',
      title: 'Direito Administrativo',
      description: 'Atuação em questões envolvendo a Administração Pública, como concursos, licitações e processos disciplinares.',
      href: '/infoprodutos/direito-administrativo',
      icon: 'Landmark',
    },
    {
      id: 'direito-servidor-publico',
      title: 'Direito do Servidor Público',
      description: 'Defesa dos direitos e interesses de servidores públicos em todas as esferas do governo.',
      href: '/infoprodutos/direito-servidor-publico',
      icon: 'UserCheck',
    },
    {
      id: 'direito-licitacoes',
      title: 'Direito Administrativo das Licitações',
      description: 'Assessoria completa para empresas que participam de processos licitatórios e contratos com o governo.',
      href: '/infrodutos/direito-licitacoes',
      icon: 'FileCheck2',
    },
    {
      id: 'direito-ambiental',
      title: 'Direito Ambiental',
      description: 'Consultoria e atuação em contencioso para questões de legislação ambiental e licenciamento.',
      href: '/infoprodutos/direito-ambiental',
      icon: 'Leaf',
    },
    {
        id: 'direito-previdenciario-inss',
        title: 'Direito Previdenciário do INSS',
        description: 'Assessoria completa para aposentadorias, pensões e benefícios do INSS.',
        href: '/infoprodutos/direito-previdenciario-inss',
        icon: 'Landmark',
    },
    {
        id: 'direito-previdenciario-setor-publico',
        title: 'Direito Previdenciário do Setor Público',
        description: 'Defesa dos direitos previdenciários de servidores públicos (RPPS).',
        href: '/infoprodutos/direito-previdenciario-setor-publico',
        icon: 'Shield',
    },
    {
      id: 'compliance',
      title: 'Compliance',
      description: 'Implementação de programas de conformidade e integridade corporativa para prevenir riscos.',
      href: '/infoprodutos/compliance',
      icon: 'BadgeCheck',
    },
    {
      id: 'consultoria-juridica',
      title: 'Consultoria Jurídica',
      description: 'Fornece orientação estratégica e pareceres técnicos para auxiliar na tomada de decisões seguras.',
      href: '/infoprodutos/consultoria-juridica',
      icon: 'Lightbulb',
    },
];

export type InfoproductSeed = {
    id: string;
    title: string;
    description: string;
    href: string;
    icon: IconName;
};

export const infoproductsInitialData: InfoproductSeed[] = [
  {
    id: 'consultoria-juridica',
    title: 'Consultoria Jurídica',
    description: 'Orientação estratégica e pareceres para tomada de decisão segura.',
    href: '/infoprodutos/consultoria-juridica',
    icon: 'Lightbulb',
  },
  {
    id: 'compliance',
    title: 'Compliance',
    description: 'Implementação de programas de conformidade e integridade corporativa.',
    href: '/infoprodutos/compliance',
    icon: 'BadgeCheck',
  },
  {
    id: 'direito-licitacoes',
    title: 'Direito das Licitações',
    description: 'Assessoria completa em processos licitatórios e contratos públicos.',
    href: '/infrodutos/direito-licitacoes',
    icon: 'FileCheck2',
  },
  {
    id: 'direito-empresarial',
    title: 'Direito Empresarial',
    description: 'Estruturação societária, fusões, aquisições e governança corporativa.',
    href: '/infoprodutos/direito-empresarial',
    icon: 'Building',
  },
  {
    id: 'direito-trabalho',
    title: 'Direito do Trabalho',
    description: 'Assessoria em relações de emprego, direitos e deveres de empregadores e empregados.',
    href: '/infoprodutos/direito-trabalho',
    icon: 'Briefcase',
  },
  {
    id: 'direito-servidor-publico',
    title: 'Direito do Servidor Público',
    description: 'Defesa dos direitos e interesses de servidores públicos em todas as esferas.',
    href: '/infoprodutos/direito-servidor-publico',
    icon: 'UserCheck',
  },
  {
    id: 'direito-consumidor',
    title: 'Direito do Consumidor',
    description: 'Defesa dos direitos em relações de consumo, práticas abusivas e responsabilidade.',
    href: '/infoprodutos/direito-consumidor',
    icon: 'Shield',
  },
  {
    id: 'direito-administrativo',
    title: 'Direito Administrativo',
    description: 'Atuação em questões envolvendo a Administração Pública, seus atos e regulações.',
    href: '/infoprodutos/direito-administrativo',
    icon: 'Landmark',
  },
  {
    id: 'direito-ambiental',
    title: 'Direito Ambiental',
    description: 'Consultoria e contencioso em legislação e proteção do meio ambiente.',
    href: '/infoprodutos/direito-ambiental',
    icon: 'Leaf',
  },
];

export type CourseModule = {
  id: string;
  title: string;
  phase: string;
  price: number;
  detailedDescription: string;
  learnings: string[];
};

export const courseModules: CourseModule[] = [
  // Fase 1
  {
    id: 'mentalidade-empreendedora',
    title: 'Mentalidade Empreendedora: De Advogado a Dono de Negócio',
    phase: 'Fase 1: A Fundação',
    price: 497.00,
    detailedDescription: 'Este módulo é o ponto de partida para a transformação da sua carreira. Abordamos a mudança de mindset necessária para deixar de pensar apenas como técnico do direito e começar a agir como um verdadeiro empresário, dono do seu futuro e do seu negócio.',
    learnings: [
      'Diferenciar a mentalidade de advogado e a de empreendedor.',
      'Identificar e superar as crenças limitantes que travam seu crescimento.',
      'Desenvolver uma visão de longo prazo para seu escritório.',
      'Entender os pilares de um negócio jurídico sustentável.',
    ],
  },
  {
    id: 'planejamento-estrategico-nicho',
    title: 'Planejamento Estratégico: Definindo seu Nicho e DNA',
    phase: 'Fase 1: A Fundação',
    price: 497.00,
    detailedDescription: 'Um escritório sem direção é apenas um barco à deriva. Neste módulo, você aprenderá a construir a identidade da sua marca, a definir seu posicionamento no mercado e a criar um plano de negócios que servirá como seu mapa para o sucesso.',
    learnings: [
      'Realizar uma análise de mercado para encontrar seu nicho ideal.',
      'Construir a Missão, Visão e Valores do seu escritório.',
      'Definir seu cliente ideal (Persona).',
      'Estruturar um plano de negócios simples e funcional.',
    ],
  },
  {
    id: 'estruturacao-societaria',
    title: 'Estruturação Societária e Acordo de Sócios',
    phase: 'Fase 1: A Fundação',
    price: 497.00,
    detailedDescription: 'Aprenda a escolher o melhor tipo societário (Unipessoal, Sociedade Simples, etc.) e a criar um acordo de sócios que protege a todos e evita conflitos futuros, definindo regras claras desde o início.',
    learnings: [
        'Analisar os diferentes tipos de sociedade para a advocacia.',
        'Elaborar um Acordo de Sócios completo e seguro.',
        'Definir regras para entrada, saída e remuneração de sócios.',
        'Prevenir as disputas mais comuns em sociedades de advogados.',
    ],
  },
  {
    id: 'financas-101',
    title: 'Finanças 101: Custos, Precificação e Capital de Giro',
    phase: 'Fase 1: A Fundação',
    price: 497.00,
    detailedDescription: 'Domine os números do seu escritório desde o primeiro dia. Aprenda a calcular seus custos, a precificar seus serviços de forma inteligente e a gerenciar o fluxo de caixa para garantir a saúde financeira do seu negócio.',
    learnings: [
        'Mapear e controlar os custos fixos e variáveis do escritório.',
        'Desenvolver uma política de precificação lucrativa e competitiva.',
        'Calcular o capital de giro necessário para a operação.',
        'Analisar indicadores financeiros básicos (DRE, Fluxo de Caixa).',
    ],
  },
  // Fase 2
  {
    id: 'marketing-juridico',
    title: 'Marketing Jurídico Ético: Atraindo os Clientes Certos',
    phase: 'Fase 2: A Estruturação',
    price: 597.00,
    detailedDescription: 'Descubra como construir sua autoridade no mercado e atrair clientes qualificados de forma consistente, tudo isso respeitando as normas da OAB. O marketing é a ponte entre sua competência e seu próximo cliente.',
    learnings: [
        'Entender os limites e as oportunidades do marketing na advocacia.',
        'Criar conteúdo de valor para se posicionar como autoridade.',
        'Utilizar as redes sociais e o Google de forma estratégica.',
        'Construir um funil de marketing e vendas para seu escritório.',
    ],
  },
  {
    id: 'processos-internos',
    title: 'Processos Internos: Criando um Fluxo de Trabalho Eficiente',
    phase: 'Fase 2: A Estruturação',
    price: 597.00,
    detailedDescription: 'Mapeie, otimize e padronize suas rotinas, da prospecção ao pós-venda, para aumentar a produtividade, reduzir erros e garantir a qualidade do serviço prestado, independentemente de quem execute a tarefa.',
    learnings: [
        'Mapear o fluxo de trabalho do seu escritório (AS-IS).',
        'Identificar e eliminar gargalos operacionais.',
        'Criar Procedimentos Operacionais Padrão (POPs).',
        'Implementar ferramentas para automatizar tarefas repetitivas.',
    ],
  },
  {
    id: 'gestao-de-pessoas',
    title: 'Gestão de Pessoas: Contratando e Retendo Talentos',
    phase: 'Fase 2: A Estruturação',
    price: 597.00,
    detailedDescription: 'Sua equipe é seu maior ativo. Aprenda a formar um time de alta performance, a delegar tarefas de forma eficaz e a cultivar um ambiente de trabalho que atraia e retenha os melhores talentos do mercado.',
    learnings: [
        'Estruturar um processo seletivo eficiente.',
        'Desenvolver um plano de integração (onboarding) para novos membros.',
        'Criar um plano de cargos e salários.',
        'Aplicar técnicas de feedback e avaliação de desempenho.',
    ],
  },
  {
    id: 'controladoria-juridica',
    title: 'Controladoria Jurídica: Métricas e Indicadores de Sucesso',
    phase: 'Fase 2: A Estruturação',
    price: 597.00,
    detailedDescription: 'Vá além do faturamento. Implemente um sistema de controladoria para medir o que realmente importa: produtividade, rentabilidade por caso, satisfação do cliente e outros KPIs que guiarão suas decisões estratégicas.',
    learnings: [
        'Entender o papel e a importância da controladoria jurídica.',
        'Definir os principais Indicadores de Performance (KPIs) para seu escritório.',
        'Criar dashboards visuais para acompanhar os resultados.',
        'Utilizar dados para tomar decisões estratégicas mais assertivas.',
    ],
  },
  // Fase 3
  {
    id: 'lideranca-e-cultura',
    title: 'Liderança e Cultura Organizacional',
    phase: 'Fase 3: A Escalada',
    price: 797.00,
    detailedDescription: 'Nesta fase avançada, o foco se volta para você, o líder. Desenvolva suas habilidades de liderança e aprenda a construir uma cultura organizacional forte que inspire autonomia, engajamento e um propósito compartilhado em toda a equipe.',
    learnings: [
        'Identificar seu estilo de liderança e como aprimorá-lo.',
        'Definir e disseminar os valores e a cultura do escritório.',
        'Técnicas de comunicação e gestão de conflitos.',
        'Como formar novos líderes dentro da sua equipe.',
    ],
  },
  {
    id: 'tecnologia-e-inovacao',
    title: 'Tecnologia e Inovação: Automatizando para Crescer',
    phase: 'Fase 3: A Escalada',
    price: 797.00,
    detailedDescription: 'Utilize a tecnologia como um acelerador de crescimento. Aprenda a identificar, avaliar e implementar ferramentas que automatizam tarefas, otimizam a gestão, melhoram a experiência do cliente e abrem novas oportunidades de negócio.',
    learnings: [
        'Mapear processos para identificar oportunidades de automação.',
        'Como escolher o software jurídico ideal para seu escritório.',
        'Introdução a conceitos de IA aplicada ao direito.',
        'Garantir a segurança da informação e a conformidade com a LGPD.',
    ],
  },
  {
    id: 'planejamento-financeiro-avancado',
    title: 'Planejamento Financeiro Avançado e Expansão',
    phase: 'Fase 3: A Escalada',
    price: 797.00,
    detailedDescription: 'Prepare seu escritório para grandes saltos. Aprenda a analisar a viabilidade de investimentos, a planejar a abertura de novas filiais ou áreas de atuação, e a estruturar o financeiro para suportar a expansão.',
    learnings: [
        'Análise de ROI (Retorno sobre Investimento) para projetos de expansão.',
        'Modelagem financeira para diferentes cenários de crescimento.',
        'Fontes de financiamento e captação de recursos.',
        'Estruturação de políticas de distribuição de lucros e reinvestimento.',
    ],
  },
  {
    id: 'sucessao-e-legado',
    title: 'Sucessão e Legado: Construindo um Escritório que Dura',
    phase: 'Fase 3: A Escalada',
    price: 797.00,
    detailedDescription: 'Pense no futuro do seu escritório além da sua própria carreira. Este módulo aborda o planejamento sucessório, a criação de um modelo de partnership e a construção de um legado que garanta a perenidade do negócio.',
    learnings: [
        'Modelos de partnership e como implementá-los.',
        'Como preparar e formar a próxima geração de líderes.',
        'Avaliação (Valuation) do seu escritório de advocacia.',
        'Estratégias para garantir a continuidade da cultura e dos valores.',
    ],
  },
];
    
