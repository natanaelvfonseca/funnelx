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

                <section className="relative flex flex-1 items-center px-4 pb-8 pt-6 sm:px-6 sm:pb-10 sm:pt-8 lg:px-8 lg:pb-12">
                    <div className="mx-auto flex w-full max-w-[84rem] flex-col items-center gap-6 text-center sm:gap-8 lg:gap-9">
                        <div className="max-w-5xl space-y-3 sm:space-y-4">
                            <p className="inline-flex items-center rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/72 shadow-[0_0_40px_rgba(255,255,255,0.06)] backdrop-blur sm:px-4 sm:py-2 sm:text-[11px]">
                                O Dossie Meta 2026
                            </p>

                            <h1 className="mx-auto max-w-5xl bg-[linear-gradient(180deg,#f8fafc_0%,#d9dde5_34%,#7d848e_100%)] bg-clip-text font-display text-[clamp(1.18rem,4.2vw,1.9rem)] font-bold leading-[1.03] tracking-[-0.04em] text-transparent sm:text-[clamp(1.65rem,4.8vw,2.6rem)] lg:text-[clamp(2rem,2.55vw,3.05rem)]">
                                <span className="block lg:whitespace-nowrap">Descubra por que 11.056 consumidores</span>
                                <span className="block lg:whitespace-nowrap">revelam onde suas vendas estao vazando</span>
                                <span className="block lg:whitespace-nowrap">e como a primeira "IA Humanizada".</span>
                                <span className="block lg:whitespace-nowrap">pode multiplicar suas conversoes</span>
                            </h1>

                            <p className="mx-auto max-w-4xl text-sm font-semibold leading-6 text-white/74 sm:text-base sm:leading-7">
                                O Fim do Atendimento Humano (E a Nova Ciencia das Vendas Automaticas)
                            </p>
                        </div>

                        <div className="relative mx-auto w-full max-w-4xl pt-1 sm:pt-2">
                            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[14rem] w-[14rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.22)_0%,rgba(245,121,59,0.2)_28%,rgba(239,68,68,0.12)_46%,transparent_72%)] blur-3xl sm:h-[18rem] sm:w-[18rem]" />

                            <div className="relative overflow-hidden rounded-[28px] border border-white/12 bg-[#060606]/78 p-2.5 shadow-[0_30px_120px_rgba(0,0,0,0.65),0_0_80px_rgba(255,255,255,0.05)] backdrop-blur-xl sm:rounded-[32px] sm:p-4">
                                <div className="rounded-[22px] border border-white/12 bg-[#0a0a0a] p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:rounded-[26px] sm:p-4">
                                    <div className="relative aspect-video overflow-hidden rounded-[18px] border border-white/10 bg-[radial-gradient(circle_at_center,rgba(24,24,24,0.88)_0%,rgba(8,8,8,1)_66%)] sm:rounded-[22px]">
                                        <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-white/10 bg-black/35 px-3 py-2 text-[9px] uppercase tracking-[0.22em] text-white/45 sm:px-5 sm:py-3 sm:text-[11px] sm:tracking-[0.32em]">
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

                                        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-3 px-4 text-center sm:gap-5 sm:px-6">
                                            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-white/10 shadow-[0_0_40px_rgba(255,255,255,0.12)] backdrop-blur sm:h-24 sm:w-24">
                                                <Play className="ml-0.5 h-6 w-6 fill-white text-white sm:ml-1 sm:h-10 sm:w-10" />
                                            </div>

                                            <div className="space-y-1.5 sm:space-y-2">
                                                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary-light sm:text-xs sm:tracking-[0.42em]">
                                                    Espaco reservado para VSL
                                                </p>
                                                <h2 className="font-display text-lg font-semibold text-white sm:text-2xl lg:text-3xl">
                                                    A tela do video entra aqui
                                                </h2>
                                                <p className="mx-auto max-w-xl text-xs leading-5 text-white/60 sm:text-sm sm:leading-6">
                                                    Player ilustrativo pronto para receber sua VSL central com maximo
                                                    destaque visual.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 border-t border-white/10 bg-black/55 px-3 py-2 text-white/70 sm:gap-3 sm:px-6 sm:py-3">
                                            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/8 ring-1 ring-white/10 sm:h-10 sm:w-10">
                                                <Play className="ml-0.5 h-3.5 w-3.5 fill-white text-white sm:h-4 sm:w-4" />
                                            </button>
                                            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                                                <div className="h-full w-[34%] rounded-full bg-[linear-gradient(90deg,#f8fafc_0%,#f5793b_100%)] shadow-[0_0_20px_rgba(245,121,59,0.5)]" />
                                            </div>
                                            <span className="text-[10px] font-semibold tracking-[0.14em] text-white/55 sm:text-xs sm:tracking-[0.22em]">08:47</span>
                                            <Volume2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                            <Maximize2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p className="mx-auto mt-5 max-w-4xl text-center text-xs leading-6 text-white/62 sm:mt-6 sm:text-sm sm:leading-7">
                                Os dados vazados da pesquisa global mostram por que voce perde vendas todos os dias e
                                como a Kogna, a primeira "IA Humanizada" do mercado, pode estancar esse vazamento e
                                transformar conversas em receita no piloto automatico.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
