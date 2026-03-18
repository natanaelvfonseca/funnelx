import { type ReactNode } from 'react';
import {
    ArrowUpRight,
    DollarSign,
    Megaphone,
    MousePointerClick,
    UserPlus,
} from 'lucide-react';

function formatBrl(value?: number) {
    return Number(value || 0).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
}

function Card({
    label,
    value,
    detail,
    icon,
}: {
    label: string;
    value: string;
    detail: string;
    icon: ReactNode;
}) {
    return (
        <article className="rounded-[28px] border border-black/[0.06] bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] dark:border-white/[0.08] dark:bg-white/[0.04]">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-text-muted">{label}</p>
                    <p className="mt-3 text-2xl font-semibold tracking-tight text-text-primary">{value}</p>
                    <p className="mt-2 text-sm leading-6 text-text-muted">{detail}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-200">
                    {icon}
                </div>
            </div>
        </article>
    );
}

export function AdsTab({ data }: { data: any }) {
    if (!data?.ads) {
        return (
            <div className="flex min-h-[380px] items-center justify-center rounded-[32px] border border-black/[0.06] bg-white/75 dark:border-white/[0.08] dark:bg-white/[0.04]">
                <div className="inline-flex items-center gap-3 rounded-full border border-orange-200 bg-orange-50 px-5 py-3 text-sm font-medium text-orange-700 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-200">
                    <span className="h-3 w-3 animate-pulse rounded-full bg-orange-500" />
                    Carregando aquisicao
                </div>
            </div>
        );
    }

    const ads = data.ads;

    return (
        <div className="space-y-6">
            <div className="rounded-[32px] border border-orange-200 bg-[linear-gradient(135deg,rgba(255,76,0,0.08),rgba(255,255,255,0.92))] p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] dark:border-orange-500/20 dark:bg-[linear-gradient(135deg,rgba(255,76,0,0.12),rgba(17,19,23,0.96))]">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-700 dark:text-orange-200">Midia paga</p>
                        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-text-primary">Painel pronto para receber trafego real</h2>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-text-muted">
                            Esta aba nao exibe mais simulacao. Ela permanece zerada ate a entrada de dados reais de Meta Ads ou Google Ads.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-black/[0.06] bg-white/85 px-4 py-3 text-sm text-text-muted shadow-[0_10px_24px_rgba(15,23,42,0.05)] dark:border-white/[0.08] dark:bg-white/[0.04]">
                        Status de tracking: aguardando integracoes
                    </div>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <Card
                    label="Investimento"
                    value={formatBrl(ads.investmentTotal)}
                    detail="Valor confirmado em campanhas conectadas."
                    icon={<DollarSign className="h-5 w-5" />}
                />
                <Card
                    label="Leads captados"
                    value={Number(ads.leadsGenerated || 0).toLocaleString('pt-BR')}
                    detail="Leads recebidos a partir das integracoes de anuncio."
                    icon={<UserPlus className="h-5 w-5" />}
                />
                <Card
                    label="CPL"
                    value={formatBrl(ads.cpl)}
                    detail="Custo por lead calculado apenas com dados reais."
                    icon={<MousePointerClick className="h-5 w-5" />}
                />
                <Card
                    label="ROAS"
                    value={`${Number(ads.roas || 0).toFixed(2)}x`}
                    detail="Retorno exibido somente quando existir spend rastreado."
                    icon={<ArrowUpRight className="h-5 w-5" />}
                />
            </div>

            <section className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
                <div className="rounded-[32px] border border-black/[0.06] bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] dark:border-white/[0.08] dark:bg-white/[0.04]">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-text-muted">O que vai aparecer aqui</p>
                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-text-primary">Leitura comercial de aquisicao</h3>
                    <div className="mt-5 space-y-3">
                        <div className="rounded-2xl border border-black/[0.06] bg-[#F8F8F8] px-4 py-4 dark:border-white/[0.08] dark:bg-white/[0.03]">
                            <p className="text-sm font-medium text-text-primary">Investimento consolidado</p>
                            <p className="mt-1 text-sm text-text-muted">Spend real por origem de campanha, sem percentual estimado em cima da receita.</p>
                        </div>
                        <div className="rounded-2xl border border-black/[0.06] bg-[#F8F8F8] px-4 py-4 dark:border-white/[0.08] dark:bg-white/[0.03]">
                            <p className="text-sm font-medium text-text-primary">Leads, CPL e ROAS</p>
                            <p className="mt-1 text-sm text-text-muted">As metricas entram automaticamente quando as fontes de midia estiverem integradas.</p>
                        </div>
                        <div className="rounded-2xl border border-black/[0.06] bg-[#F8F8F8] px-4 py-4 dark:border-white/[0.08] dark:bg-white/[0.03]">
                            <p className="text-sm font-medium text-text-primary">Canais suportados</p>
                            <p className="mt-1 text-sm text-text-muted">Meta Ads, Google Ads e futuros conectores de atribuicao.</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-[32px] border border-black/[0.06] bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] dark:border-white/[0.08] dark:bg-white/[0.04]">
                    <div className="flex h-full flex-col justify-between">
                        <div>
                            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-200">
                                <Megaphone className="h-6 w-6" />
                            </div>
                            <h3 className="mt-5 text-2xl font-semibold tracking-tight text-text-primary">Aguardando campanhas conectadas</h3>
                            <p className="mt-3 text-sm leading-6 text-text-muted">
                                Quando o tracking estiver ativo, esta aba passa a exibir spend, leads, custo por lead e retorno de forma automatica.
                            </p>
                        </div>

                        <div className="mt-8 rounded-2xl border border-dashed border-black/[0.12] bg-[#FBFBFB] px-4 py-5 text-sm text-text-muted dark:border-white/[0.12] dark:bg-white/[0.03]">
                            No momento, todos os campos ficam em zero por decisao de produto: melhor vazio e verdadeiro do que preenchido por simulacao.
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
