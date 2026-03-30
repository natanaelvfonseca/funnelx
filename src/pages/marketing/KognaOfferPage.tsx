import { Maximize2, Play, Volume2 } from 'lucide-react';

const marqueeText = 'A Meta (Dona do WhatsApp) Acaba de Revelar a Nova "Regra de Ouro" das Vendas para 2026...';

export function KognaOfferPage() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_32%),radial-gradient(circle_at_18%_20%,rgba(245,121,59,0.16),transparent_22%),radial-gradient(circle_at_82%_18%,rgba(239,68,68,0.16),transparent_24%),linear-gradient(180deg,#090909_0%,#020202_100%)]" />
                <div aria-hidden className="offer-grid absolute inset-0" />
                <div aria-hidden className="offer-grid-glow absolute inset-0" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_44%)]" />
            </div>

            <div className="relative z-10 flex min-h-screen flex-col">
                <div className="border-b border-white/10 bg-[#b01616]/95 shadow-[0_12px_40px_rgba(176,22,22,0.45)] backdrop-blur-md">
                    <div className="overflow-hidden">
                        <div className="offer-marquee py-3 text-[12px] font-semibold tracking-[0.08em] text-white sm:py-4 sm:text-sm">
                            {Array.from({ length: 2 }).map((_, groupIndex) => (
                                <div key={groupIndex} className="offer-marquee-group">
                                    {Array.from({ length: 3 }).map((__, itemIndex) => (
                                        <span key={`${groupIndex}-${itemIndex}`} className="pr-10 sm:pr-14">
                                            {marqueeText}
                                        </span>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <section className="relative flex flex-1 items-center px-4 pb-16 pt-14 sm:px-6 lg:px-8">
                    <div className="mx-auto flex w-full max-w-[90rem] flex-col items-center gap-10 text-center sm:gap-14">
                        <div className="max-w-5xl space-y-6">
                            <p className="inline-flex items-center rounded-full border border-white/12 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/72 shadow-[0_0_40px_rgba(255,255,255,0.06)] backdrop-blur sm:text-xs">
                                O Dossie Meta 2026: O Fim do Atendimento Humano (E a Nova Ciencia das Vendas
                                Automaticas)
                            </p>

                            <h1 className="mx-auto max-w-6xl bg-[linear-gradient(180deg,#f8fafc_0%,#d9dde5_34%,#7d848e_100%)] bg-clip-text font-display text-[clamp(2.55rem,4.1vw,3.95rem)] font-bold leading-[1.02] tracking-[-0.04em] text-transparent">
                                Descubra por que 11.056 consumidores
                                <br className="hidden lg:block" />
                                revelam onde suas vendas estao vazando
                                <br className="hidden lg:block" />
                                e como a primeira "IA Humanizada"
                                <br className="hidden lg:block" />
                                pode multiplicar suas conversoes
                            </h1>

                            <p className="mx-auto max-w-4xl text-sm leading-7 text-white/62 sm:text-base sm:leading-8">
                                Os dados vazados da pesquisa global mostram por que voce perde vendas todos os dias e
                                como a Kogna, a primeira "IA Humanizada" do mercado, pode estancar esse vazamento e
                                transformar conversas em receita no piloto automatico.
                            </p>
                        </div>

                        <div className="relative mx-auto w-full max-w-5xl pt-6 sm:pt-8">
                            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.22)_0%,rgba(245,121,59,0.2)_28%,rgba(239,68,68,0.12)_46%,transparent_72%)] blur-3xl" />

                            <div className="relative overflow-hidden rounded-[32px] border border-white/12 bg-[#060606]/78 p-3 shadow-[0_30px_120px_rgba(0,0,0,0.65),0_0_80px_rgba(255,255,255,0.05)] backdrop-blur-xl sm:p-5">
                                <div className="rounded-[26px] border border-white/12 bg-[#0a0a0a] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-5">
                                    <div className="relative aspect-video overflow-hidden rounded-[22px] border border-white/10 bg-[radial-gradient(circle_at_center,rgba(24,24,24,0.88)_0%,rgba(8,8,8,1)_66%)]">
                                        <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-white/10 bg-black/35 px-4 py-3 text-[10px] uppercase tracking-[0.32em] text-white/45 sm:px-6 sm:text-[11px]">
                                            <div className="flex items-center gap-2">
                                                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                                                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                                                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                                            </div>
                                            <span>Kogna Presentation Deck</span>
                                            <span>VSL 01</span>
                                        </div>

                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_42%),linear-gradient(135deg,rgba(255,255,255,0.03),transparent_42%,rgba(255,255,255,0.03)_100%)]" />
                                        <div className="absolute inset-0 bg-[repeating-linear-gradient(180deg,rgba(255,255,255,0.04)_0px,rgba(255,255,255,0.04)_1px,transparent_2px,transparent_6px)] opacity-20" />

                                        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 px-6 text-center">
                                            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/15 bg-white/10 shadow-[0_0_40px_rgba(255,255,255,0.12)] backdrop-blur">
                                                <Play className="ml-1 h-10 w-10 fill-white text-white" />
                                            </div>

                                            <div className="space-y-2">
                                                <p className="text-[11px] font-semibold uppercase tracking-[0.42em] text-primary-light sm:text-xs">
                                                    Espaco reservado para VSL
                                                </p>
                                                <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
                                                    A tela do video entra aqui
                                                </h2>
                                                <p className="mx-auto max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
                                                    Player ilustrativo pronto para receber sua VSL central com maximo
                                                    destaque visual.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 border-t border-white/10 bg-black/55 px-4 py-3 text-white/70 sm:px-6">
                                            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/8 ring-1 ring-white/10">
                                                <Play className="ml-0.5 h-4 w-4 fill-white text-white" />
                                            </button>
                                            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                                                <div className="h-full w-[34%] rounded-full bg-[linear-gradient(90deg,#f8fafc_0%,#f5793b_100%)] shadow-[0_0_20px_rgba(245,121,59,0.5)]" />
                                            </div>
                                            <span className="text-xs font-semibold tracking-[0.22em] text-white/55">08:47</span>
                                            <Volume2 className="h-4 w-4" />
                                            <Maximize2 className="h-4 w-4" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
