export interface IndustryAgent {
    id: string;
    name: string;
    icon: string;
    role: string;
    description: string;
    systemPrompt: string;
}

export interface IndustryProfile {
    id: string;
    name: string;
    slug: string;
    icon: string;
    description: string;
    defaultPipeline: string[];
    defaultIntents: string[];
    defaultObjections: string[];
    recommendedAgents: IndustryAgent[];
    recommendedFollowupSequences: Array<{
        trigger: string;
        delay_minutes: number;
        message_hint: string;
    }>;
}

export const industryProfiles: IndustryProfile[] = [
    {
        id: 'educacao',
        slug: 'educacao',
        name: 'Educação',
        icon: '🎓',
        description: 'Matrícula de alunos, cursos, faculdades, escolas e treinamentos.',
        defaultPipeline: ['Novo Lead', 'Interesse no Curso', 'Qualificação', 'Agendamento', 'Comparecimento', 'Matrícula', 'Perdido'],
        defaultIntents: ['interesse_curso', 'preco_curso', 'horario_aula', 'duracao_curso', 'certificado', 'formas_pagamento', 'agendar_visita', 'bolsa_desconto'],
        defaultObjections: ['preco_alto', 'falta_tempo', 'distancia', 'duvida_certificado', 'precisa_falar_com_pais'],
        recommendedAgents: [
            {
                id: 'edu_sdr',
                name: 'AI SDR – Captação de Alunos',
                icon: '📚',
                role: 'SDR',
                description: 'Qualifica interessados e agenda visitas ou matrículas.',
                systemPrompt: `Você é um SDR especialista em captação de alunos. Sua missão é qualificar o interesse, entender a necessidade educacional e agendar uma visita ou matricular o aluno.\n\nAbordagem:\n1. Pergunte qual curso/área desperta mais interesse.\n2. Entenda o objetivo (carreira, crescimento, reconversão).\n3. Apresente o diferencial da instituição.\n4. Ofereça visita, trial ou matrícula imediata.\n\nTrate objeções de preço mostrando condições: bolsas, parcelamento, financiamento.\nRESTRIÇÕES: {{restrictions}}`
            },
            {
                id: 'edu_followup',
                name: 'AI Follow-up de Interessados',
                icon: '🔔',
                role: 'Follow-up',
                description: 'Reativa alunos que pediram informações e não retornaram.',
                systemPrompt: `Você é um especialista em reativação de leads educacionais. Retome o contato de forma calorosa, relembre o interesse do aluno e crie urgência com datas de início de turma ou vagas limitadas.\n\nRESTRIÇÕES: {{restrictions}}`
            }
        ],
        recommendedFollowupSequences: [
            { trigger: 'lead_pediu_preco', delay_minutes: 30, message_hint: 'Retome o contato com condições de pagamento e bolsa disponível.' },
            { trigger: 'lead_pediu_informacoes', delay_minutes: 120, message_hint: 'Envie o calendário de turmas e reforce o diferencial.' },
            { trigger: 'lead_interessado', delay_minutes: 1440, message_hint: 'Lembre da data de início da próxima turma e urgência de vagas.' }
        ]
    },
    {
        id: 'imobiliario',
        slug: 'imobiliario',
        name: 'Imobiliário',
        icon: '🏠',
        description: 'Venda e locação de imóveis, loteamentos e construtoras.',
        defaultPipeline: ['Novo Lead', 'Qualificação', 'Visita Agendada', 'Proposta', 'Aprovação de Crédito', 'Contrato', 'Perdido'],
        defaultIntents: ['interesse_imovel', 'preco_imovel', 'localizacao', 'financiamento', 'agendar_visita', 'planta_baixa', 'condicoes_pagamento'],
        defaultObjections: ['preco_alto', 'nao_aprovado_credito', 'precisa_vender_atual', 'localizacao_longe', 'nao_decidiu'],
        recommendedAgents: [
            {
                id: 'imob_sdr',
                name: 'AI SDR – Qualificação Imobiliária',
                icon: '🏡',
                role: 'SDR',
                description: 'Qualifica perfil de compra e agenda visitas ao imóvel.',
                systemPrompt: `Você é um SDR imobiliário. Qualifique renda, perfil de imóvel desejado e capacidade de financiamento. Agende a visita ao imóvel ideal.\n\nRESTRIÇÕES: {{restrictions}}`
            },
            {
                id: 'imob_vendedor',
                name: 'AI Corretora Digital',
                icon: '🔑',
                role: 'Vendedor',
                description: 'Apresenta imóveis, trata objeções e conduz ao fechamento.',
                systemPrompt: `Você é uma corretora digital de alto desempenho. Apresente o imóvel destacando localização, valor de valorização e condições de financiamento. Conduza ao fechamento.\n\nRESTRIÇÕES: {{restrictions}}`
            }
        ],
        recommendedFollowupSequences: [
            { trigger: 'lead_pediu_preco', delay_minutes: 60, message_hint: 'Envie simulação de financiamento personalizada.' },
            { trigger: 'lead_agendou_visita', delay_minutes: 60, message_hint: 'Confirme a visita e envie o endereço com link do mapa.' }
        ]
    },
    {
        id: 'seguros',
        slug: 'seguros',
        name: 'Seguros',
        icon: '🛡️',
        description: 'Seguros de vida, auto, residencial, empresarial e saúde.',
        defaultPipeline: ['Novo Lead', 'Cotação Solicitada', 'Proposta Enviada', 'Análise do Cliente', 'Fechamento', 'Perdido'],
        defaultIntents: ['cotar_seguro', 'comparar_planos', 'preco_seguro', 'coberturas', 'sinistro', 'renovacao'],
        defaultObjections: ['preco_alto', 'ja_tem_seguro', 'nao_ve_necessidade', 'nao_confia_seguradora'],
        recommendedAgents: [
            {
                id: 'seg_corretor',
                name: 'AI Corretor de Seguros',
                icon: '🛡️',
                role: 'Vendedor',
                description: 'Cotação interativa, comparação de coberturas e fechamento.',
                systemPrompt: `Você é um corretor de seguros digital. Identifique o tipo de seguro, perfil de risco e necessidades específicas. Apresente coberturas com linguagem simples e conduza ao fechamento.\n\nRESTRIÇÕES: {{restrictions}}`
            }
        ],
        recommendedFollowupSequences: [
            { trigger: 'lead_pediu_cotacao', delay_minutes: 30, message_hint: 'Envie a cotação e destaque a principal cobertura diferencial.' },
            { trigger: 'lead_nao_respondeu', delay_minutes: 1440, message_hint: 'Pergunte se teve alguma dúvida sobre a proposta.' }
        ]
    },
    {
        id: 'clinicas',
        slug: 'clinicas',
        name: 'Clínicas',
        icon: '🏥',
        description: 'Clínicas médicas, odontológicas, estética e bem-estar.',
        defaultPipeline: ['Novo Lead', 'Interesse', 'Consulta Agendada', 'Comparecimento', 'Tratamento', 'Fidelização', 'Perdido'],
        defaultIntents: ['agendar_consulta', 'preco_procedimento', 'convenio', 'duvida_tratamento', 'resultado_esperado', 'disponibilidade'],
        defaultObjections: ['preco_alto', 'sem_convenio', 'medo_procedimento', 'indisponibilidade_horario', 'nao_urgente'],
        recommendedAgents: [
            {
                id: 'clinica_atendente',
                name: 'AI Atendente de Clínica',
                icon: '👩‍⚕️',
                role: 'Atendente',
                description: 'Agenda consultas, informa procedimentos e convênios aceitos.',
                systemPrompt: `Você é a atendente virtual da clínica. Com empatia e agilidade, informe os procedimentos disponíveis, convênios aceitos e agende a consulta no melhor horário disponível.\n\nRESTRIÇÕES: {{restrictions}}`
            },
            {
                id: 'clinica_reativacao',
                name: 'AI Reativação de Pacientes',
                icon: '💊',
                role: 'Follow-up',
                description: 'Reativa pacientes inativos e lembra de consultas de retorno.',
                systemPrompt: `Você é responsável por reativar pacientes que não retornam à clínica. Retome o contato de forma cuidadosa, lembrando da importância do acompanhamento regular.\n\nRESTRIÇÕES: {{restrictions}}`
            }
        ],
        recommendedFollowupSequences: [
            { trigger: 'lead_pediu_informacoes', delay_minutes: 60, message_hint: 'Confirme a disponibilidade de horários e incentive o agendamento.' },
            { trigger: 'consulta_agendada', delay_minutes: 1440, message_hint: 'Lembre da consulta de amanhã e envie o endereço.' }
        ]
    },
    {
        id: 'varejo',
        slug: 'varejo',
        name: 'Varejo',
        icon: '🛒',
        description: 'Lojas físicas e e-commerce de produtos físicos.',
        defaultPipeline: ['Novo Lead', 'Interesse', 'Carrinho', 'Checkout', 'Pedido Realizado', 'Entregue', 'Perdido'],
        defaultIntents: ['interesse_produto', 'preco', 'disponibilidade', 'frete', 'prazo_entrega', 'troca_devolucao', 'promocao'],
        defaultObjections: ['preco_alto', 'frete_caro', 'prazo_longo', 'desconfia_loja', 'ja_comprou_outro'],
        recommendedAgents: [
            {
                id: 'varejo_vendedor',
                name: 'AI Consultora de Vendas',
                icon: '🛍️',
                role: 'Vendedor',
                description: 'Apresenta produtos, informa estoque e conduz ao pedido.',
                systemPrompt: `Você é uma consultora de vendas digital. Descubra o que o cliente busca, apresente as melhores opções do catálogo, informe disponibilidade e conduza ao pedido.\n\nRESTRIÇÕES: {{restrictions}}`
            }
        ],
        recommendedFollowupSequences: [
            { trigger: 'carrinho_abandonado', delay_minutes: 30, message_hint: 'Lembre do produto no carrinho e ofereça um cupom de desconto.' },
            { trigger: 'pedido_entregue', delay_minutes: 2880, message_hint: 'Peça avaliação e sugira produto complementar.' }
        ]
    },
    {
        id: 'servicos',
        slug: 'servicos',
        name: 'Serviços',
        icon: '⚙️',
        description: 'Prestadores de serviços B2B e B2C: manutenção, consultoria, agências.',
        defaultPipeline: ['Novo Lead', 'Briefing', 'Proposta', 'Negociação', 'Contrato', 'Execução', 'Perdido'],
        defaultIntents: ['solicitar_orcamento', 'prazo_execucao', 'portfolio', 'formas_pagamento', 'garantia', 'disponibilidade'],
        defaultObjections: ['preco_alto', 'precisa_comparar', 'nao_urgente', 'ja_tem_fornecedor', 'sem_orcamento_agora'],
        recommendedAgents: [
            {
                id: 'servicos_sdr',
                name: 'AI SDR Comercial',
                icon: '💼',
                role: 'SDR',
                description: 'Qualifica a necessidade, coleta briefing e agenda reunião.',
                systemPrompt: `Você é um SDR para prestadores de serviços. Entenda a necessidade do cliente, colete o briefing básico (escopo, prazo, orçamento disponível) e agende uma reunião de proposta.\n\nRESTRIÇÕES: {{restrictions}}`
            }
        ],
        recommendedFollowupSequences: [
            { trigger: 'orcamento_enviado', delay_minutes: 120, message_hint: 'Pergunte se teve alguma dúvida sobre a proposta enviada.' },
            { trigger: 'lead_nao_respondeu', delay_minutes: 1440, message_hint: 'Retome o contato perguntando se ainda tem interesse.' }
        ]
    },
    {
        id: 'generico',
        slug: 'generico',
        name: 'Genérico',
        icon: '⚡',
        description: 'Configuração padrão sem perfil específico. Ideal para negócios únicos.',
        defaultPipeline: [],
        defaultIntents: [],
        defaultObjections: [],
        recommendedAgents: [],
        recommendedFollowupSequences: []
    }
];

export function getProfileBySlug(slug: string): IndustryProfile | undefined {
    return industryProfiles.find(p => p.slug === slug);
}
