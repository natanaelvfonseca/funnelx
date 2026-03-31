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
    title: string;
    description: string;
    eyebrow: string;
    icon: LucideIcon;
};

const heroHighlights = [
    'Download gratuito em PDF',
    'Leitura rapida para marketing e vendas',
    'Foco total em consumo e decisao via WhatsApp',
] as const;

const insightCards: ContentBlock[] = [
    {
        eyebrow: 'Novo comportamento',
        title: 'O cliente pesquisa, compara e decide sem sair da conversa.',
        description:
            'O relatorio organiza os sinais que mostram por que o WhatsApp virou o ambiente principal para descoberta, confianca e fechamento.',
        icon: MessageCircle,
    },
    {
        eyebrow: 'Jornada comercial',
        title: 'Velocidade sozinha nao basta quando o contexto da conversa e fraco.',
        description:
            'A leitura mostra como empresas que respondem com clareza, continuidade e prova de valor avancam mais rapido para a decisao.',
        icon: TrendingUp,
    },
    {
        eyebrow: 'Aplicacao pratica',
        title: 'Marketing, pre-venda e atendimento precisam falar a mesma lingua.',
        description:
            'Voce baixa um resumo pensado para campanhas, roteiros de abordagem e ofertas que realmente fazem sentido dentro do WhatsApp.',
        icon: Building2,
    },
];

const reportSections: ContentBlock[] = [
    {
        eyebrow: 'Capitulo 1',
        title: 'Como o WhatsApp virou canal de descoberta, nao so de suporte.',
        description:
            'Entenda o papel do conteudo, da recomendacao e da resposta imediata quando o cliente chega comparando opcoes.',
        icon: Users,
    },
    {
        eyebrow: 'Capitulo 2',
        title: 'Quais sinais aumentam confianca antes da proposta.',
        description:
            'Veja os elementos de linguagem, prova social e organizacao que deixam a conversa comercial mais convincente.',
        icon: ShieldCheck,
    },
    {
        eyebrow: 'Capitulo 3',
        title: 'Onde as empresas perdem atencao durante a conversa.',
        description:
            'O material destaca os pontos de friccao mais comuns entre primeiro contato, qualificacao e fechamento.',
        icon: Clock3,
    },
];

const unlockBenefits = [
    'PDF pronto para baixar sem custo',
    'Resumo objetivo para usar em campanhas e CRM',
    'Checklist de adaptacao para equipes de vendas',
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
                        <span>Relatorio 2026</span>
                        <span className="hidden h-1 w-1 rounded-full bg-white/60 sm:block" />
                        <span>WhatsApp Commerce</span>
                        <span className="hidden h-1 w-1 rounded-full bg-white/60 sm:block" />
                        <span>Download Gratuito</span>
                    </div>
                </div>

                <section className="px-4 pb-14 pt-8 sm:px-6 sm:pb-16 sm:pt-10 lg:px-8 lg:pb-24">
                    <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#d8e1f0] bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4267b2] shadow-[0_12px_30px_rgba(66,103,178,0.12)] backdrop-blur">
                                <FileText className="h-4 w-4" />
                                Relatorio Meta 2026
                            </div>

                            <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.7rem,7vw,5.35rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-[#1c2b45]">
                                Como os clientes estao consumindo empresas pelo WhatsApp em 2026.
                            </h1>

                            <p className="mt-5 max-w-2xl text-base leading-7 text-[#42536f] sm:text-lg">
                                Uma pagina de captura com estetica inspirada na era classica do Facebook para vender a
                                ideia certa: o WhatsApp deixou de ser apenas atendimento e passou a ser ambiente de
                                descoberta, comparacao e decisao.
                            </p>

                            <div className="mt-7 flex flex-wrap gap-3">
                                <a
                                    href="#download-report"
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#4267b2] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(66,103,178,0.28)] transition hover:bg-[#365899]"
                                >
                                    Quero baixar o relatorio
                                    <ArrowRight className="h-4 w-4" />
                                </a>
                                <a
                                    href={reportDownloadPath}
                                    download="relatorio-meta-2026-whatsapp.pdf"
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#ccd7ea] bg-white px-6 py-3.5 text-sm font-semibold text-[#35518d] shadow-[0_10px_24px_rgba(53,81,141,0.08)] transition hover:border-[#9eb2d9] hover:text-[#2e467b]"
                                >
                                    Ver a capa do PDF
                                    <Download className="h-4 w-4" />
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
                                    <span>Meta Research</span>
                                    <span>WhatsApp 2026</span>
                                </div>

                                <div className="mt-4 rounded-[30px] bg-[linear-gradient(135deg,#3b5998_0%,#4267b2_58%,#6d84b4_100%)] p-6 text-white sm:p-8">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/78">
                                        Download gratuito
                                    </p>
                                    <h2 className="mt-3 max-w-sm font-display text-3xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-[2.35rem]">
                                        O novo consumo de empresas dentro do WhatsApp.
                                    </h2>
                                    <p className="mt-4 max-w-sm text-sm leading-6 text-white/82">
                                        Um material editorial para campanhas, qualificacao e vendas consultivas que
                                        comecam na conversa.
                                    </p>

                                    <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
                                        <div className="rounded-2xl border border-white/16 bg-white/10 p-4 backdrop-blur">
                                            <p className="text-[11px] uppercase tracking-[0.18em] text-white/70">
                                                Estrutura
                                            </p>
                                            <p className="mt-2 font-semibold">3 blocos de leitura</p>
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
                                            O que o cliente espera
                                        </p>
                                        <ul className="mt-3 space-y-3 text-sm leading-6 text-[#35455f]">
                                            <li>Respostas com contexto, nao so rapidez.</li>
                                            <li>Clareza para comparar opcoes sem friccao.</li>
                                            <li>Continuidade entre anuncio, conversa e proposta.</li>
                                        </ul>
                                    </div>

                                    <div className="rounded-[24px] border border-[#d8e2f1] bg-white p-4">
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5c6f93]">
                                            Saida pratica
                                        </p>
                                        <div className="mt-3 space-y-3 text-sm text-[#35455f]">
                                            <div className="flex items-start gap-3">
                                                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#4267b2]" />
                                                <p>Leitura pensada para times comerciais e de aquisicao.</p>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#6d84b4]" />
                                                <p>Referencias para melhorar copy, roteiro e oferta.</p>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#90a4cf]" />
                                                <p>Checklist rapido para revisar sua operacao no WhatsApp.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="px-4 py-6 sm:px-6 lg:px-8">
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
                                O WhatsApp virou a vitrine, o balcao e a negociacao.
                            </h2>
                            <p className="mt-4 max-w-lg text-base leading-7 text-[#52657f]">
                                A pagina foi desenhada para vender exatamente essa ideia. Em vez de parecer uma oferta
                                generica, ela apresenta o relatorio como um documento relevante, profissional e
                                alinhado ao universo Meta.
                            </p>

                            <div className="mt-8 rounded-[28px] border border-[#d9e2ef] bg-white p-5">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#607593]">
                                    Microconversa ilustrativa
                                </p>
                                <div className="mt-4 space-y-3 text-sm">
                                    <div className="max-w-[85%] rounded-[22px] rounded-bl-md bg-[#eaf1ff] px-4 py-3 text-[#1f2d48]">
                                        Oi. Voces atendem meu segmento ou preciso preencher um formulario primeiro?
                                    </div>
                                    <div className="ml-auto max-w-[85%] rounded-[22px] rounded-br-md bg-[#4267b2] px-4 py-3 text-white">
                                        Atendemos sim. Posso te mostrar o melhor cenario e te mandar exemplos agora.
                                    </div>
                                    <div className="max-w-[85%] rounded-[22px] rounded-bl-md bg-[#eaf1ff] px-4 py-3 text-[#1f2d48]">
                                        Perfeito. Se fizer sentido, eu sigo por aqui mesmo.
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-5">
                            {reportSections.map(({ eyebrow, title, description, icon: Icon }) => (
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

                <section id="download-report" className="px-4 pb-16 pt-8 sm:px-6 sm:pb-20 lg:px-8">
                    <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.04fr_0.96fr]">
                        <div className="rounded-[34px] border border-[#d7e0ee] bg-white p-7 shadow-[0_28px_90px_rgba(28,43,69,0.14)] sm:p-8">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="inline-flex items-center gap-2 rounded-full border border-[#d8e2f0] bg-[#f6f9ff] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4267b2]">
                                    <Download className="h-4 w-4" />
                                    Liberar download
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-full border border-[#e1e7f2] bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#607493]">
                                    Material gratuito
                                </span>
                            </div>

                            <h2 className="mt-5 max-w-xl font-display text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-[#20304b]">
                                Capture o lead e entregue o relatorio na mesma experiencia.
                            </h2>

                            <p className="mt-4 max-w-2xl text-base leading-7 text-[#52657f]">
                                O formulario abaixo ja esta pronto para uma oferta de marketing. Ele aquece a percepcao
                                de valor, coleta os dados essenciais e libera o PDF imediatamente na propria pagina.
                            </p>

                            <form onSubmit={handleSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
                                <label className="block sm:col-span-2">
                                    <span className="mb-2 block text-sm font-semibold text-[#253552]">Nome completo</span>
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
                                    <span className="mb-2 block text-sm font-semibold text-[#253552]">Email profissional</span>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        autoComplete="email"
                                        placeholder="voce@empresa.com"
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

                                <label className="block sm:col-span-2">
                                    <span className="mb-2 block text-sm font-semibold text-[#253552]">Empresa</span>
                                    <input
                                        type="text"
                                        name="company"
                                        required
                                        autoComplete="organization"
                                        placeholder="Nome da empresa"
                                        className="w-full rounded-2xl border border-[#d5deeb] bg-[#fbfcfe] px-4 py-3.5 text-sm text-[#21314d] outline-none transition placeholder:text-[#8a99b2] focus:border-[#4267b2] focus:bg-white focus:ring-4 focus:ring-[#4267b2]/10"
                                    />
                                </label>

                                <div className="sm:col-span-2">
                                    <button
                                        type="submit"
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-[22px] bg-[#4267b2] px-6 py-4 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(66,103,178,0.28)] transition hover:bg-[#365899]"
                                    >
                                        Liberar relatorio gratuito
                                        <ArrowRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </form>

                            <p className="mt-4 text-xs leading-6 text-[#72839e]">
                                Ao enviar, o lead demonstra interesse em estrategias de WhatsApp, conteudo comercial e
                                automacao de relacionamento.
                            </p>

                            {isUnlocked && (
                                <div className="mt-6 rounded-[28px] border border-[#cfe0cf] bg-[linear-gradient(135deg,#f5fbf6_0%,#edf7ef_100%)] p-5 shadow-[0_18px_40px_rgba(60,133,92,0.10)]">
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4a785d]">
                                                Download liberado
                                            </p>
                                            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#214332]">
                                                Pronto, {leadFirstName}.
                                            </h3>
                                            <p className="mt-2 max-w-xl text-sm leading-6 text-[#4d6b5b]">
                                                O relatorio ja pode ser baixado. Se quiser, da para usar este bloco
                                                como ponto de entrega ou conectar depois ao seu fluxo real de captura.
                                            </p>
                                        </div>

                                        <a
                                            href={reportDownloadPath}
                                            download="relatorio-meta-2026-whatsapp.pdf"
                                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#3d7a58] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(61,122,88,0.22)] transition hover:bg-[#33684b]"
                                        >
                                            Baixar PDF agora
                                            <Download className="h-4 w-4" />
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>

                        <aside className="rounded-[34px] border border-[#d7e0ee] bg-[linear-gradient(180deg,#3b5998_0%,#4267b2_100%)] p-7 text-white shadow-[0_30px_100px_rgba(59,89,152,0.24)] sm:p-8">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/74">
                                O pacote da oferta
                            </p>
                            <h2 className="mt-3 max-w-sm font-display text-4xl font-semibold leading-[1.02] tracking-[-0.04em]">
                                A pagina ja comunica valor antes do formulario pedir qualquer dado.
                            </h2>

                            <div className="mt-8 space-y-4">
                                {unlockBenefits.map((item) => (
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
                                    Observacao de marca
                                </p>
                                <p className="mt-3 text-sm leading-7 text-white/86">
                                    O layout usa codigos visuais da fase classica do Facebook para reforcar
                                    autoridade, mas o rodape deixa claro que se trata de um material promocional
                                    independente.
                                </p>
                            </div>

                            <div className="mt-6 rounded-[28px] border border-white/14 bg-[#f7faff] p-5 text-[#22334f]">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#e8f0ff] text-[#4267b2]">
                                        <ShieldCheck className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#607492]">
                                            Uso recomendado
                                        </p>
                                        <p className="mt-2 text-sm leading-7 text-[#4f6180]">
                                            Ideal para campanhas de lead magnet, trafego pago, paginas de retargeting
                                            e aquecimento comercial para WhatsApp.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </section>

                <footer className="border-t border-[#d8e0ec] px-4 py-6 text-center text-xs leading-6 text-[#687892] sm:px-6 lg:px-8">
                    Material promocional independente da Kogna, com visual inspirado na linguagem classica do
                    Facebook. Sem afiliacao oficial com a Meta.
                </footer>
            </div>
        </main>
    );
}
