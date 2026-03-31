import { type FormEvent, useState } from 'react';
import {
    ArrowRight,
    Building2,
    CheckCircle2,
    Clock3,
    Download,
    FileText,
    MessageCircle,
    ShieldCheck,
    TrendingUp,
    Users,
    type LucideIcon,
} from 'lucide-react';

const reportDownloadPath = '/meta-relatorio-2026-whatsapp.pdf';

type ContentBlock = {
    eyebrow: string;
    title: string;
    description: string;
    icon: LucideIcon;
};

const heroHighlights = [
    'Analise guiada com aplicacao pratica',
    'Relatorio completo liberado junto',
    'Insights para marketing, CRM e vendas',
    'Leitura objetiva e estrategica',
] as const;

const insightCards: ContentBlock[] = [
    {
        eyebrow: 'Novo comportamento',
        title: 'O cliente pesquisa, compara e decide sem sair da conversa.',
        description:
            'Entenda por que o WhatsApp virou ambiente de descoberta e confianca, e nao apenas canal de suporte.',
        icon: MessageCircle,
    },
    {
        eyebrow: 'Jornada comercial',
        title: 'Velocidade sozinha nao basta quando a conversa nao gera contexto.',
        description:
            'Veja os sinais que tornam uma resposta mais convincente, organizada e propensa a avancar para decisao.',
        icon: TrendingUp,
    },
    {
        eyebrow: 'Aplicacao pratica',
        title: 'Marketing, pre-venda e atendimento precisam operar na mesma logica.',
        description:
            'Aprenda a conectar campanha, conversa, qualificacao e proposta dentro de uma experiencia comercial mais fluida.',
        icon: Building2,
    },
];

const chapterCards: ContentBlock[] = [
    {
        eyebrow: 'Capitulo 1',
        title: 'Como o WhatsApp virou canal de descoberta, nao so de suporte.',
        description:
            'O papel da recomendacao, da resposta imediata e da continuidade na formacao de confianca.',
        icon: Users,
    },
    {
        eyebrow: 'Capitulo 2',
        title: 'Quais sinais aumentam confianca antes da proposta.',
        description:
            'Elementos de linguagem, clareza, prova e organizacao que deixam a conversa comercial mais forte.',
        icon: ShieldCheck,
    },
    {
        eyebrow: 'Capitulo 3',
        title: 'Como transformar isso em operacao comercial.',
        description:
            'Como aplicar esses aprendizados em campanhas, pre-venda, CRM e vendas consultivas.',
        icon: Clock3,
    },
];

const experienceItems = [
    'Analise guiada sobre a mudanca do consumo no WhatsApp',
    'Relatorio completo para consulta e aplicacao',
    'Insights para campanhas, qualificacao e fechamento',
    'Referencias praticas para marketing, CRM e vendas',
] as const;

const audienceItems = [
    'Gestores comerciais',
    'Marketing e aquisicao',
    'Operacoes de CRM',
    'Empresas que vendem por conversa',
] as const;

const unlockedGuidance = [
    'Descoberta: o cliente ja usa a conversa para avaliar opcoes e formar percepcao.',
    'Confianca: clareza, prova e continuidade pesam antes mesmo da proposta.',
    'Operacao: campanha, qualificacao e fechamento precisam compartilhar o mesmo contexto.',
] as const;

export function MetaWhatsappReportOfferPage() {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [leadFirstName, setLeadFirstName] = useState('');

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const fullName = String(formData.get('name') ?? '').trim();
        const firstName = fullName.split(/\s+/).filter(Boolean)[0] ?? 'voce';

        setLeadFirstName(firstName);
        setIsUnlocked(true);
    }

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#eef2f7] text-[#18263f]">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,89,152,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(66,103,178,0.14),transparent_30%),linear-gradient(180deg,#f8fbff_0%,#eef2f7_48%,#e9eef7_100%)]" />
                <div className="meta-classic-grid absolute inset-0 opacity-70" />
                <div className="absolute left-[-12%] top-24 h-72 w-72 rounded-full bg-[#98add8]/22 blur-3xl" />
                <div className="absolute right-[-10%] top-[30%] h-80 w-80 rounded-full bg-[#6d84b4]/16 blur-3xl" />
            </div>

            <div className="relative z-10">
                <div className="border-b border-[#d7dfec] bg-[#3b5998] text-white shadow-[0_20px_50px_rgba(59,89,152,0.18)]">
                    <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.18em] sm:px-6">
                        <span>Briefing 2026</span>
                        <span className="hidden h-1 w-1 rounded-full bg-white/60 sm:block" />
                        <span>WhatsApp Behavior</span>
                        <span className="hidden h-1 w-1 rounded-full bg-white/60 sm:block" />
                        <span>Analise Guiada</span>
                    </div>
                </div>

                <section className="px-4 pb-14 pt-8 sm:px-6 sm:pb-16 sm:pt-10 lg:px-8 lg:pb-24">
                    <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:gap-14">
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#d8e1f0] bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4267b2] shadow-[0_12px_30px_rgba(66,103,178,0.12)] backdrop-blur">
                                <FileText className="h-4 w-4" />
                                Meta 2026 Research Brief
                            </div>

                            <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.7rem,7vw,5.4rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-[#1c2b45]">
                                O novo comportamento de compra no WhatsApp em 2026.
                            </h1>

                            <p className="mt-5 max-w-3xl text-base leading-7 text-[#42536f] sm:text-lg">
                                O WhatsApp deixou de ser so atendimento. Nesta analise guiada, voce entende como ele
                                passou a influenciar descoberta, comparacao e decisao, e recebe o relatorio completo
                                para aplicar isso em marketing, pre-venda, CRM e vendas.
                            </p>

                            <div className="mt-7 flex flex-wrap gap-3">
                                <a
                                    href="#capture"
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#4267b2] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(66,103,178,0.28)] transition hover:bg-[#365899]"
                                >
                                    Quero assistir a analise e liberar o relatorio
                                    <ArrowRight className="h-4 w-4" />
                                </a>
                                <a
                                    href="#insights"
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#ccd7ea] bg-white px-6 py-3.5 text-sm font-semibold text-[#35518d] shadow-[0_10px_24px_rgba(53,81,141,0.08)] transition hover:border-[#9eb2d9] hover:text-[#2e467b]"
                                >
                                    Ver os principais insights
                                </a>
                            </div>

                            <div className="mt-8 flex flex-wrap gap-3 text-sm text-[#4f6180]">
                                {heroHighlights.map((item) => (
                                    <span
                                        key={item}
                                        className="inline-flex items-center gap-2 rounded-full border border-[#dbe4f2] bg-white/90 px-4 py-2 shadow-[0_8px_18px_rgba(59,89,152,0.08)]"
                                    >
                                        <CheckCircle2 className="h-4 w-4 text-[#4267b2]" />
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="meta-report-float relative mx-auto w-full max-w-[34rem]">
                            <div className="absolute inset-x-10 top-10 h-full rounded-[32px] bg-[#d5def0] shadow-[0_34px_90px_rgba(59,89,152,0.12)]" />
                            <div className="absolute inset-x-6 top-5 h-full rounded-[32px] border border-[#d8e2f0] bg-white/80 shadow-[0_28px_80px_rgba(59,89,152,0.12)]" />

                            <div className="meta-paper-shine relative overflow-hidden rounded-[34px] border border-[#d7dfec] bg-white p-5 shadow-[0_42px_120px_rgba(28,43,69,0.18)] sm:p-6">
                                <div className="flex items-center justify-between rounded-[22px] border border-[#d5dff0] bg-[#f6f9ff] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5b6e91]">
                                    <span>Strategic Brief</span>
                                    <span>WhatsApp 2026</span>
                                </div>

                                <div className="mt-4 rounded-[30px] bg-[linear-gradient(135deg,#3b5998_0%,#4267b2_58%,#6d84b4_100%)] p-6 text-white sm:p-8">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/78">
                                        Inteligencia de mercado
                                    </p>
                                    <h2 className="mt-3 max-w-sm font-display text-3xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-[2.35rem]">
                                        Analise estrategica + relatorio completo
                                    </h2>
                                    <p className="mt-4 max-w-sm text-sm leading-6 text-white/82">
                                        Um material pensado para quem precisa entender como o WhatsApp influencia a
                                        jornada comercial antes da proposta.
                                    </p>

                                    <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
                                        <div className="rounded-2xl border border-white/16 bg-white/10 p-4 backdrop-blur">
                                            <p className="text-[11px] uppercase tracking-[0.18em] text-white/70">
                                                Estrutura
                                            </p>
                                            <p className="mt-2 font-semibold">3 blocos estrategicos</p>
                                        </div>
                                        <div className="rounded-2xl border border-white/16 bg-white/10 p-4 backdrop-blur">
                                            <p className="text-[11px] uppercase tracking-[0.18em] text-white/70">
                                                Aplicacao
                                            </p>
                                            <p className="mt-2 font-semibold">Marketing + CRM + Vendas</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                    <div className="rounded-[24px] border border-[#d8e2f1] bg-[#f8fbff] p-4">
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5c6f93]">
                                            O que voce vai entender
                                        </p>
                                        <ul className="mt-3 space-y-3 text-sm leading-6 text-[#35455f]">
                                            <li>Como o cliente descobre e compara dentro da conversa.</li>
                                            <li>O que aumenta confianca antes da proposta.</li>
                                            <li>Como alinhar campanha, conversa e fechamento.</li>
                                        </ul>
                                    </div>

                                    <div className="rounded-[24px] border border-[#d8e2f1] bg-white p-4">
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5c6f93]">
                                            Sair com clareza
                                        </p>
                                        <ul className="mt-3 space-y-3 text-sm leading-6 text-[#35455f]">
                                            <li>Referencias para copy e abordagem.</li>
                                            <li>Leituras aplicaveis para equipes comerciais.</li>
                                            <li>Visao pratica para operacao no WhatsApp.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="insights" className="px-4 py-6 sm:px-6 lg:px-8">
                    <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
                        {insightCards.map(({ eyebrow, title, description, icon: Icon }) => (
                            <article
                                key={title}
                                className="rounded-[30px] border border-[#d6e0ee] bg-white/92 p-6 shadow-[0_22px_60px_rgba(59,89,152,0.08)]"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eaf1ff] text-[#4267b2]">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#617492]">
                                    {eyebrow}
                                </p>
                                <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.03em] text-[#1f2d48]">
                                    {title}
                                </h3>
                                <p className="mt-4 text-sm leading-7 text-[#53657f]">{description}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="px-4 pb-8 pt-14 sm:px-6 sm:pt-16 lg:px-8">
                    <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                        <div className="rounded-[34px] border border-[#d4deec] bg-[#f7faff] p-7 shadow-[0_24px_70px_rgba(59,89,152,0.08)] sm:p-8">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#597094]">
                                O que muda em 2026
                            </p>
                            <h2 className="mt-3 max-w-md font-display text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-[#20304b]">
                                O WhatsApp virou vitrine, balcao e negociacao ao mesmo tempo.
                            </h2>
                            <p className="mt-4 max-w-lg text-base leading-7 text-[#52657f]">
                                As empresas que entendem essa mudanca nao usam a conversa so para responder. Elas usam
                                a conversa para orientar percepcao, reduzir friccao e aproximar o cliente da decisao.
                            </p>

                            <div className="mt-8 rounded-[28px] border border-[#d9e2ef] bg-white p-5">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#607593]">
                                    Microconversa ilustrativa
                                </p>
                                <div className="mt-4 space-y-3 text-sm">
                                    <div className="max-w-[85%] rounded-[22px] rounded-bl-md bg-[#eaf1ff] px-4 py-3 text-[#1f2d48]">
                                        Oi, voces atendem meu segmento?
                                    </div>
                                    <div className="ml-auto max-w-[85%] rounded-[22px] rounded-br-md bg-[#4267b2] px-4 py-3 text-white">
                                        Sim. Posso te mostrar rapidamente como funciona e o que faz mais sentido para o
                                        seu caso.
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-5">
                            {chapterCards.map(({ eyebrow, title, description, icon: Icon }) => (
                                <article
                                    key={title}
                                    className="rounded-[30px] border border-[#d6e0ee] bg-white/94 p-6 shadow-[0_22px_60px_rgba(59,89,152,0.08)] sm:p-7"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#edf3ff] text-[#4267b2]">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#607492]">
                                                {eyebrow}
                                            </p>
                                            <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-[-0.03em] text-[#1f2d48]">
                                                {title}
                                            </h3>
                                            <p className="mt-3 text-sm leading-7 text-[#53657f]">{description}</p>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="capture" className="px-4 pb-12 pt-10 sm:px-6 sm:pb-16 lg:px-8">
                    <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.04fr_0.96fr]">
                        <div className="rounded-[34px] border border-[#d7e0ee] bg-white p-7 shadow-[0_28px_90px_rgba(28,43,69,0.14)] sm:p-8">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="inline-flex items-center gap-2 rounded-full border border-[#d8e2f0] bg-[#f6f9ff] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4267b2]">
                                    <FileText className="h-4 w-4" />
                                    Acesso imediato
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-full border border-[#e1e7f2] bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#607493]">
                                    Briefing + relatorio
                                </span>
                            </div>

                            <h2 className="mt-5 max-w-xl font-display text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-[#20304b]">
                                Assista a analise e receba o relatorio completo
                            </h2>

                            <p className="mt-4 max-w-2xl text-base leading-7 text-[#52657f]">
                                Preencha abaixo para acessar a analise comentada e receber o relatorio completo sobre o
                                novo comportamento de consumo e decisao dentro do WhatsApp.
                            </p>

                            <form onSubmit={handleSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
                                <label className="block">
                                    <span className="mb-2 block text-sm font-semibold text-[#253552]">Nome</span>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        autoComplete="name"
                                        placeholder="Seu nome"
                                        className="w-full rounded-2xl border border-[#d5deeb] bg-[#fbfcfe] px-4 py-3.5 text-sm text-[#21314d] outline-none transition placeholder:text-[#8a99b2] focus:border-[#4267b2] focus:bg-white focus:ring-4 focus:ring-[#4267b2]/10"
                                    />
                                </label>

                                <label className="block">
                                    <span className="mb-2 block text-sm font-semibold text-[#253552]">WhatsApp</span>
                                    <input
                                        type="tel"
                                        name="whatsapp"
                                        required
                                        autoComplete="tel"
                                        placeholder="(11) 99999-9999"
                                        className="w-full rounded-2xl border border-[#d5deeb] bg-[#fbfcfe] px-4 py-3.5 text-sm text-[#21314d] outline-none transition placeholder:text-[#8a99b2] focus:border-[#4267b2] focus:bg-white focus:ring-4 focus:ring-[#4267b2]/10"
                                    />
                                </label>

                                <div className="sm:col-span-2">
                                    <button
                                        type="submit"
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-[22px] bg-[#4267b2] px-6 py-4 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(66,103,178,0.28)] transition hover:bg-[#365899]"
                                    >
                                        Liberar analise gratuita
                                        <ArrowRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </form>

                            <p className="mt-4 text-xs leading-6 text-[#72839e]">
                                Acesso imediato a analise e ao relatorio completo.
                            </p>

                            {isUnlocked && (
                                <div className="mt-6 rounded-[28px] border border-[#cfe0cf] bg-[linear-gradient(135deg,#f5fbf6_0%,#edf7ef_100%)] p-5 shadow-[0_18px_40px_rgba(60,133,92,0.10)]">
                                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                                        <div>
                                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4a785d]">
                                                Acesso liberado
                                            </p>
                                            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#214332]">
                                                Pronto, {leadFirstName}.
                                            </h3>
                                            <p className="mt-2 max-w-xl text-sm leading-6 text-[#4d6b5b]">
                                                A leitura guiada e o relatorio completo ja estao disponiveis. Comece
                                                pela interpretacao estrategica e use o material completo como apoio de
                                                consulta.
                                            </p>
                                        </div>

                                        <div className="flex flex-col gap-3 sm:min-w-[16rem]">
                                            <a
                                                href="#insights"
                                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#3d7a58] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(61,122,88,0.22)] transition hover:bg-[#33684b]"
                                            >
                                                Continuar na analise guiada
                                                <ArrowRight className="h-4 w-4" />
                                            </a>
                                            <a
                                                href={reportDownloadPath}
                                                download="relatorio-meta-2026-whatsapp.pdf"
                                                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#b9d7c0] bg-white/70 px-5 py-3.5 text-sm font-semibold text-[#315142] transition hover:bg-white"
                                            >
                                                Abrir relatorio completo
                                                <Download className="h-4 w-4" />
                                            </a>
                                        </div>
                                    </div>

                                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                                        {unlockedGuidance.map((item) => (
                                            <div
                                                key={item}
                                                className="rounded-[22px] border border-[#d4e7d9] bg-white/70 px-4 py-4 text-sm leading-6 text-[#315142]"
                                            >
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <aside className="rounded-[34px] border border-[#d7e0ee] bg-[linear-gradient(180deg,#3b5998_0%,#4267b2_100%)] p-7 text-white shadow-[0_30px_100px_rgba(59,89,152,0.24)] sm:p-8">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/74">
                                O que voce recebe nesta experiencia
                            </p>
                            <div className="mt-6 space-y-4">
                                {experienceItems.map((item) => (
                                    <div
                                        key={item}
                                        className="rounded-[24px] border border-white/14 bg-white/10 px-4 py-4 backdrop-blur"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/14">
                                                <CheckCircle2 className="h-5 w-5" />
                                            </div>
                                            <p className="text-sm leading-6 text-white/88">{item}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 rounded-[28px] border border-white/14 bg-white/10 p-5 backdrop-blur">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/72">
                                    Indicado para
                                </p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {audienceItems.map((item) => (
                                        <span
                                            key={item}
                                            className="rounded-full border border-white/14 bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/88"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </div>
                </section>

                <section id="closing-cta" className="px-4 pb-16 pt-4 sm:px-6 sm:pb-20 lg:px-8">
                    <div className="mx-auto max-w-7xl rounded-[34px] border border-[#d4deec] bg-[linear-gradient(135deg,#f7faff_0%,#edf3ff_55%,#e6eefc_100%)] p-8 shadow-[0_24px_70px_rgba(59,89,152,0.10)] sm:p-10">
                        <div className="max-w-3xl">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#607492]">
                                Fechamento
                            </p>
                            <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-[#20304b]">
                                Entenda a mudanca antes de tentar escalar o canal.
                            </h2>
                            <p className="mt-4 text-base leading-7 text-[#52657f]">
                                Quem ainda trata o WhatsApp apenas como suporte responde mensagens. Quem entende a nova
                                dinamica constroi percepcao, reduz atrito e vende com mais contexto.
                            </p>
                            <a
                                href="#capture"
                                className="mt-7 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#4267b2] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(66,103,178,0.24)] transition hover:bg-[#365899]"
                            >
                                Quero assistir a analise e liberar o relatorio
                                <ArrowRight className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </section>

                <footer className="border-t border-[#d8e0ec] px-4 py-6 text-center text-xs leading-6 text-[#687892] sm:px-6 lg:px-8">
                    Material independente. Sem afiliacao oficial com a Meta.
                </footer>
            </div>
        </main>
    );
}
