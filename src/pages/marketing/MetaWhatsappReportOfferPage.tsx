import { useEffect, useRef, useState } from 'react';
import {
    ArrowRight,
    FileText,
    MessageCircle,
    Play,
    ShieldCheck,
    TrendingUp,
    type LucideIcon,
} from 'lucide-react';

const analysisVideoUrl = '';

type InsightCard = {
    eyebrow: string;
    title: string;
    description: string;
    icon: LucideIcon;
};

type MobileStoryCard = InsightCard & {
    contextTitle?: string;
    contextDescription?: string;
    showAction?: boolean;
};

const reasonsToWatch: InsightCard[] = [
    {
        eyebrow: 'Comportamento',
        title: 'Por que o WhatsApp passou a influenciar descoberta e decisao.',
        description: 'Entenda como a conversa deixou de ser suporte e virou parte da jornada de compra.',
        icon: MessageCircle,
    },
    {
        eyebrow: 'Conversa comercial',
        title: 'O que torna uma interacao mais convincente.',
        description: 'Veja o que aumenta clareza, confianca e progresso antes mesmo da proposta.',
        icon: ShieldCheck,
    },
    {
        eyebrow: 'Impacto operacional',
        title: 'Como isso afeta marketing, pre-venda e fechamento.',
        description: 'A leitura mostra por que campanha, contexto e decisao precisam operar juntos.',
        icon: TrendingUp,
    },
];

const mobileStoryCards: MobileStoryCard[] = [
    reasonsToWatch[0],
    reasonsToWatch[1],
    {
        ...reasonsToWatch[2],
        contextTitle: 'O WhatsApp deixou de ser so um canal de resposta.',
        contextDescription:
            'Hoje, muita gente descobre, compara e decide dentro da propria conversa. Empresas que entendem isso usam o canal para construir percepcao, reduzir atrito e acelerar decisao.',
        showAction: true,
    },
];

function toEmbedUrl(rawUrl: string) {
    const trimmed = rawUrl.trim();

    if (!trimmed) return '';

    try {
        const parsed = new URL(trimmed);

        if (parsed.hostname.includes('youtube.com')) {
            const videoId = parsed.searchParams.get('v');
            return videoId ? `https://www.youtube.com/embed/${videoId}` : trimmed;
        }

        if (parsed.hostname.includes('youtu.be')) {
            const videoId = parsed.pathname.replace('/', '');
            return videoId ? `https://www.youtube.com/embed/${videoId}` : trimmed;
        }

        if (parsed.hostname.includes('vimeo.com')) {
            const videoId = parsed.pathname.split('/').filter(Boolean).pop();
            return videoId ? `https://player.vimeo.com/video/${videoId}` : trimmed;
        }

        return trimmed;
    } catch {
        return trimmed;
    }
}

export function MetaWhatsappReportOfferPage() {
    const mobileStoryRef = useRef<HTMLElement | null>(null);
    const videoEmbedUrl = toEmbedUrl(analysisVideoUrl);
    const isDirectVideo = videoEmbedUrl.endsWith('.mp4');
    const [activeMobileCard, setActiveMobileCard] = useState(0);

    useEffect(() => {
        let frameId = 0;

        const updateActiveCard = () => {
            frameId = 0;

            if (window.innerWidth >= 768) {
                setActiveMobileCard(0);
                return;
            }

            const section = mobileStoryRef.current;
            if (!section) return;

            const rect = section.getBoundingClientRect();
            const totalScrollable = rect.height - window.innerHeight;

            if (totalScrollable <= 0) {
                setActiveMobileCard(0);
                return;
            }

            const scrolled = Math.min(Math.max(-rect.top, 0), totalScrollable);
            const progress = scrolled / totalScrollable;
            const nextIndex = Math.min(
                mobileStoryCards.length - 1,
                Math.floor(progress * mobileStoryCards.length),
            );

            setActiveMobileCard(nextIndex);
        };

        const requestUpdate = () => {
            if (frameId) return;
            frameId = window.requestAnimationFrame(updateActiveCard);
        };

        requestUpdate();
        window.addEventListener('scroll', requestUpdate, { passive: true });
        window.addEventListener('resize', requestUpdate);

        return () => {
            if (frameId) {
                window.cancelAnimationFrame(frameId);
            }
            window.removeEventListener('scroll', requestUpdate);
            window.removeEventListener('resize', requestUpdate);
        };
    }, []);

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#eef2f7] text-[#18263f]">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,89,152,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(66,103,178,0.14),transparent_30%),linear-gradient(180deg,#f8fbff_0%,#eef2f7_48%,#e9eef7_100%)]" />
                <div className="meta-classic-grid absolute inset-0 opacity-70" />
                <div className="absolute left-[-12%] top-24 h-72 w-72 rounded-full bg-[#98add8]/22 blur-3xl" />
                <div className="absolute right-[-10%] top-[30%] h-80 w-80 rounded-full bg-[#6d84b4]/16 blur-3xl" />
            </div>

            <div className="relative z-10">
                <div className="border-b border-[#8ee0b6] bg-[#25d366] text-white shadow-[0_20px_50px_rgba(37,211,102,0.22)]">
                    <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.18em] sm:px-6">
                        <span>Briefing 2026</span>
                        <span className="hidden h-1 w-1 rounded-full bg-white/60 sm:block" />
                        <span>WhatsApp Behavior</span>
                        <span className="hidden h-1 w-1 rounded-full bg-white/60 sm:block" />
                        <span>Video Analysis</span>
                    </div>
                </div>

                <section className="px-4 pb-10 pt-8 sm:px-6 sm:pb-12 sm:pt-10 lg:px-8 lg:pb-16">
                    <div className="mx-auto max-w-5xl text-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#d8e1f0] bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4267b2] shadow-[0_12px_30px_rgba(66,103,178,0.12)] backdrop-blur">
                            <FileText className="h-4 w-4" />
                            WhatsApp 2026 Strategic Brief
                        </div>

                        <h1 className="mt-5 font-display text-[clamp(2.5rem,8vw,5.4rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-[#1c2b45]">
                            O novo comportamento de compra no WhatsApp em 2026.
                        </h1>

                        <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-[#42536f] sm:text-lg">
                            Assista a analise e entenda como o WhatsApp deixou de ser apenas atendimento para se
                            tornar um canal de descoberta, confianca e decisao.
                        </p>

                    </div>

                    <div className="mx-auto mt-8 max-w-6xl">
                        <div className="meta-report-float relative mx-auto w-full max-w-[70rem]">
                            <div className="absolute inset-x-10 top-10 h-full rounded-[32px] bg-[#d5def0] shadow-[0_34px_90px_rgba(59,89,152,0.12)]" />
                            <div className="absolute inset-x-6 top-5 h-full rounded-[32px] border border-[#d8e2f0] bg-white/80 shadow-[0_28px_80px_rgba(59,89,152,0.12)]" />

                            <div className="meta-paper-shine relative overflow-hidden rounded-[34px] border border-[#d7dfec] bg-white p-3 shadow-[0_42px_120px_rgba(28,43,69,0.18)] sm:p-5">
                                <div className="flex items-center justify-between rounded-[22px] border border-[#d5dff0] bg-[#f6f9ff] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5b6e91]">
                                    <span>Strategic Video Brief</span>
                                    <span>WhatsApp 2026</span>
                                </div>

                                <div
                                    id="analysis-video"
                                    className="mt-4 overflow-hidden rounded-[28px] border border-[#d7e1ef] bg-[radial-gradient(circle_at_top,rgba(76,105,165,0.35),rgba(23,31,49,1)_58%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
                                >
                                    {videoEmbedUrl ? (
                                        isDirectVideo ? (
                                            <video controls className="aspect-video w-full bg-black object-cover">
                                                <source src={videoEmbedUrl} />
                                            </video>
                                        ) : (
                                            <iframe
                                                src={videoEmbedUrl}
                                                title="Analise em video sobre comportamento de compra no WhatsApp"
                                                className="aspect-video w-full bg-black"
                                                allow="autoplay; encrypted-media; picture-in-picture"
                                                allowFullScreen
                                            />
                                        )
                                    ) : (
                                        <div className="relative flex aspect-[1.08] min-h-[20rem] items-center justify-center px-5 pb-6 pt-14 text-center sm:aspect-video sm:min-h-0 sm:px-6 sm:pb-0 sm:pt-0">
                                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_42%),linear-gradient(135deg,rgba(255,255,255,0.05),transparent_42%,rgba(255,255,255,0.03)_100%)]" />
                                            <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-white/10 bg-black/25 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50 sm:px-6 sm:text-[11px]">
                                                <span>Analise em video</span>
                                                <span>Research Interface</span>
                                            </div>
                                            <div className="relative z-10 flex max-w-xl -translate-y-2 flex-col items-center gap-4 sm:translate-y-0">
                                                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/16 bg-white/10 shadow-[0_0_40px_rgba(255,255,255,0.12)] backdrop-blur sm:h-20 sm:w-20">
                                                    <Play className="h-7 w-7 translate-x-[1px] fill-white text-white sm:h-8 sm:w-8" />
                                                </div>
                                                <div className="space-y-2">
                                                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/68">
                                                        Analise central
                                                    </p>
                                                    <h2 className="font-display text-2xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-3xl">
                                                        O que mudou na descoberta, confianca e decisao dentro do WhatsApp.
                                                    </h2>
                                                    <p className="mx-auto max-w-lg text-sm leading-6 text-white/72 sm:text-base">
                                                        Uma leitura direta sobre comportamento, contexto comercial e
                                                        impacto na operacao.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section ref={mobileStoryRef} className="px-4 pb-8 md:hidden">
                    <div className="mx-auto max-w-md">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#607492]">
                            O que voce vai entender nesta analise
                        </p>

                        <div className="mt-5" style={{ height: `${mobileStoryCards.length * 88}vh` }}>
                            <div className="sticky top-4 h-[78vh] min-h-[32rem]">
                                <div className="relative h-full">
                                    {mobileStoryCards.map(
                                        (
                                            { eyebrow, title, description, icon: Icon, contextTitle, contextDescription, showAction },
                                            index,
                                        ) => {
                                            const isActive = index === activeMobileCard;
                                            const isPassed = index < activeMobileCard;
                                            const isUpcoming = index > activeMobileCard;

                                            return (
                                                <article
                                                    key={title}
                                                    className="absolute inset-0 flex flex-col rounded-[32px] border border-[#d6e0ee] bg-white/94 p-6 shadow-[0_30px_90px_rgba(59,89,152,0.10)] transition-[transform,opacity,filter] duration-500 ease-out"
                                                    style={{
                                                        zIndex: index + 1,
                                                        opacity: isActive ? 1 : isPassed ? 0.32 : 0,
                                                        transform: isActive
                                                            ? 'translate3d(0,0,0) scale(1)'
                                                            : isPassed
                                                                ? 'translate3d(0,-16px,0) scale(0.965)'
                                                                : isUpcoming
                                                                    ? 'translate3d(0,30px,0) scale(0.985)'
                                                                    : 'translate3d(0,0,0) scale(1)',
                                                        filter: isActive ? 'blur(0px)' : isPassed ? 'blur(0.4px)' : 'blur(2px)',
                                                        pointerEvents: isActive ? 'auto' : 'none',
                                                    }}
                                                >
                                                    <div>
                                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eaf1ff] text-[#4267b2]">
                                                            <Icon className="h-5 w-5" />
                                                        </div>
                                                        <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#617492]">
                                                            {eyebrow}
                                                        </p>
                                                        <h3 className="mt-2 text-[1.75rem] font-semibold leading-[1.05] tracking-[-0.04em] text-[#1f2d48]">
                                                            {title}
                                                        </h3>
                                                        <p className="mt-4 text-sm leading-6 text-[#53657f]">
                                                            {description}
                                                        </p>
                                                    </div>

                                                    {showAction ? (
                                                        <div className="mt-6 rounded-[28px] border border-[#d4deec] bg-[linear-gradient(135deg,#f7faff_0%,#edf3ff_55%,#e6eefc_100%)] p-5 shadow-[0_18px_40px_rgba(59,89,152,0.08)]">
                                                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#607492]">
                                                                Contexto estrategico
                                                            </p>
                                                            <h4 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.03em] text-[#20304b]">
                                                                {contextTitle}
                                                            </h4>
                                                            <p className="mt-3 text-sm leading-6 text-[#52657f]">
                                                                {contextDescription}
                                                            </p>
                                                            <a
                                                                href="#analysis-video"
                                                                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#4267b2] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(66,103,178,0.24)] transition hover:bg-[#365899]"
                                                            >
                                                                Assistir a analise agora
                                                                <ArrowRight className="h-4 w-4" />
                                                            </a>
                                                            <p className="mt-4 text-center text-xs leading-6 text-[#687892]">
                                                                Material independente. Sem afiliacao oficial com a Meta.
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <div className="mt-auto pt-6">
                                                            <div className="h-[3px] w-14 rounded-full bg-[#4267b2]/25" />
                                                        </div>
                                                    )}
                                                </article>
                                            );
                                        },
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="hidden px-4 pb-8 md:block md:px-6 lg:px-8">
                    <div className="mx-auto max-w-6xl">
                        <div className="max-w-2xl">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#607492]">
                                O que voce vai entender nesta analise
                            </p>
                        </div>

                        <div className="mt-5 grid gap-3 sm:gap-4 md:grid-cols-3">
                            {reasonsToWatch.map(({ eyebrow, title, description, icon: Icon }) => (
                                <article
                                    key={title}
                                    className="rounded-[28px] border border-[#d6e0ee] bg-white/92 p-5 shadow-[0_18px_50px_rgba(59,89,152,0.08)]"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eaf1ff] text-[#4267b2]">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#617492]">
                                        {eyebrow}
                                    </p>
                                    <h3 className="mt-2 text-xl font-semibold leading-tight tracking-[-0.03em] text-[#1f2d48]">
                                        {title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-6 text-[#53657f]">{description}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="hidden px-4 pb-10 md:block md:px-6 lg:px-8">
                    <div className="mx-auto max-w-5xl rounded-[34px] border border-[#d4deec] bg-[linear-gradient(135deg,#f7faff_0%,#edf3ff_55%,#e6eefc_100%)] p-6 shadow-[0_24px_70px_rgba(59,89,152,0.10)] sm:p-8">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#607492]">
                            Contexto estrategico
                        </p>
                        <h2 className="mt-3 font-display text-3xl font-semibold leading-[1.04] tracking-[-0.04em] text-[#20304b] sm:text-4xl">
                            O WhatsApp deixou de ser so um canal de resposta.
                        </h2>
                        <p className="mt-4 max-w-3xl text-base leading-7 text-[#52657f]">
                            Hoje, muita gente descobre, compara e decide dentro da propria conversa. Empresas que
                            entendem isso nao usam o WhatsApp apenas para responder mensagens. Elas usam para
                            construir percepcao, reduzir atrito e acelerar decisao.
                        </p>
                    </div>
                </section>

                <section className="hidden px-4 pb-16 md:block md:px-6 md:pb-20 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <a
                            href="#analysis-video"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#4267b2] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(66,103,178,0.24)] transition hover:bg-[#365899]"
                        >
                            Assistir a analise agora
                            <ArrowRight className="h-4 w-4" />
                        </a>
                    </div>
                </section>

                <footer className="hidden border-t border-[#d8e0ec] px-4 py-6 text-center text-xs leading-6 text-[#687892] md:block md:px-6 lg:px-8">
                    Material independente. Sem afiliacao oficial com a Meta.
                </footer>
            </div>
        </main>
    );
}
