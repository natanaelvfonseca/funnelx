import { type ReactNode } from 'react';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import {
    Bot,
    Building2,
    Coins,
    DollarSign,
    MessageSquare,
    Sparkles,
    Users,
    Wallet,
} from 'lucide-react';

function formatBrl(value?: number) {
    return Number(value || 0).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
}

function formatUsd(value?: number) {
    return Number(value || 0).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
    });
}

function formatNumber(value?: number) {
    return Number(value || 0).toLocaleString('pt-BR');
}

function formatKoins(value?: number) {
    return `${formatNumber(value)} koins`;
}

function StatCard({
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
        <article className="rounded-[28px] border border-black/[0.06] bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur dark:border-white/[0.08] dark:bg-white/[0.04]">
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

function SnapshotRow({
    label,
    value,
    accent,
}: {
    label: string;
    value: string;
    accent?: string;
}) {
    return (
        <div className="flex items-center justify-between gap-4 border-b border-black/[0.06] py-3 last:border-b-0 dark:border-white/[0.08]">
            <span className="text-sm text-text-muted">{label}</span>
            <span className={`text-sm font-semibold ${accent || 'text-text-primary'}`}>{value}</span>
        </div>
    );
}

export function OverviewTab({ data }: { data: any }) {
    if (!data?.overview || !data?.meta) {
        return (
            <div className="flex min-h-[380px] items-center justify-center rounded-[32px] border border-black/[0.06] bg-white/75 dark:border-white/[0.08] dark:bg-white/[0.04]">
                <div className="inline-flex items-center gap-3 rounded-full border border-orange-200 bg-orange-50 px-5 py-3 text-sm font-medium text-orange-700 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-200">
                    <span className="h-3 w-3 animate-pulse rounded-full bg-orange-500" />
                    Carregando visao geral
                </div>
            </div>
        );
    }

    const overview = data.overview;
    const meta = data.meta;
    const tracking = data.tracking || {};

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    label="Receita aprovada"
                    value={formatBrl(overview.totalRevenue)}
                    detail="Valor confirmado em billing history desde a virada do dashboard."
                    icon={<DollarSign className="h-5 w-5" />}
                />
                <StatCard
                    label="OpenAI API"
                    value={formatUsd(overview.apiCost)}
                    detail="Custo real agregado a partir de token_cost nas mensagens processadas."
                    icon={<Bot className="h-5 w-5" />}
                />
                <StatCard
                    label="Clientes totais"
                    value={formatNumber(meta.totalClients)}
                    detail={`${formatNumber(overview.newClients)} novos clientes dentro do periodo selecionado.`}
                    icon={<Users className="h-5 w-5" />}
                />
                <StatCard
                    label="Koins consumidos"
                    value={formatKoins(overview.koinsConsumed)}
                    detail="Consumo real rastreado em ledger a partir do novo marco operacional."
                    icon={<Coins className="h-5 w-5" />}
                />
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
                <section className="rounded-[32px] border border-black/[0.06] bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] dark:border-white/[0.08] dark:bg-white/[0.04]">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-text-muted">Receita recente</p>
                            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-text-primary">Evolucao financeira do novo ciclo</h3>
                            <p className="mt-1 text-sm text-text-muted">Sem extrapolacao nem preenchimento artificial. O grafico mostra apenas o que entrou de fato.</p>
                        </div>
                        <div className="rounded-2xl border border-black/[0.06] bg-[#F8F8F8] px-4 py-3 text-right dark:border-white/[0.08] dark:bg-white/[0.03]">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted">Crescimento</p>
                            <p className="mt-1 text-lg font-semibold text-text-primary">
                                {overview.growthPercentage > 0 ? '+' : ''}
                                {Number(overview.growthPercentage || 0).toFixed(1)}%
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 h-[320px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={overview.revenueChartData || []} margin={{ top: 10, right: 10, left: -16, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="overviewRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#FF6A1A" stopOpacity={0.35} />
                                        <stop offset="100%" stopColor="#FF6A1A" stopOpacity={0.02} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(38,38,38,0.09)" />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#7A7A7A', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#7A7A7A', fontSize: 12 }} tickFormatter={(value) => `R$${value}`} />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: '18px',
                                        border: '1px solid rgba(38,38,38,0.08)',
                                        background: 'rgba(255,255,255,0.96)',
                                        boxShadow: '0 20px 50px rgba(15,23,42,0.12)',
                                    }}
                                    formatter={(value: number) => [formatBrl(value), 'Receita']}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="total"
                                    stroke="#FF5B22"
                                    strokeWidth={2.5}
                                    fill="url(#overviewRevenue)"
                                    activeDot={{ r: 4, strokeWidth: 0 }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </section>

                <section className="space-y-6">
                    <div className="rounded-[32px] border border-black/[0.06] bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] dark:border-white/[0.08] dark:bg-white/[0.04]">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-text-muted">Operacao</p>
                        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-text-primary">Snapshot real da base</h3>
                        <div className="mt-4">
                            <SnapshotRow label="Mensagens processadas" value={formatNumber(overview.totalMessages)} />
                            <SnapshotRow label="Prompt tokens" value={formatNumber(overview.totalPromptTokens)} />
                            <SnapshotRow label="Completion tokens" value={formatNumber(overview.totalCompletionTokens)} />
                            <SnapshotRow label="Koins vendidos" value={formatKoins(overview.koinsSold)} accent="text-orange-600 dark:text-orange-300" />
                            <SnapshotRow label="Koins em saldo" value={formatKoins(meta.totalKoinsBalance)} />
                            <SnapshotRow label="Parceiros cadastrados" value={formatNumber(meta.totalPartners)} />
                            <SnapshotRow label="Organizacoes ativas" value={formatNumber(meta.totalOrganizations)} />
                        </div>
                    </div>

                    <div className="rounded-[32px] border border-black/[0.06] bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] dark:border-white/[0.08] dark:bg-white/[0.04]">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-text-muted">Tracking do painel</p>
                        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-text-primary">O que ja esta medindo</h3>
                        <div className="mt-5 space-y-3">
                            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200">
                                Consumo de Koins real: ativo a partir desta virada.
                            </div>
                            <div className="rounded-2xl border border-black/[0.06] bg-[#F8F8F8] px-4 py-3 text-sm text-text-muted dark:border-white/[0.08] dark:bg-white/[0.03]">
                                Receita por produto: {tracking.productRevenueTracked ? 'match por catalogo em andamento.' : 'zera enquanto nenhum pagamento novo entra ou enquanto nao houver match confiavel.'}
                            </div>
                            <div className="rounded-2xl border border-black/[0.06] bg-[#F8F8F8] px-4 py-3 text-sm text-text-muted dark:border-white/[0.08] dark:bg-white/[0.03]">
                                Ads: aguardando integracao com Meta Ads e Google Ads.
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <section className="rounded-[32px] border border-black/[0.06] bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] dark:border-white/[0.08] dark:bg-white/[0.04]">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-text-muted">Volume tecnico</p>
                        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-text-primary">Tokens por etapa de uso</h3>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-[#F8F8F8] px-4 py-2 text-xs font-medium text-text-muted dark:border-white/[0.08] dark:bg-white/[0.03]">
                        <Wallet className="h-4 w-4 text-orange-500" />
                        {formatNumber(meta.usersWithKoins)} clientes ainda tem saldo disponivel
                    </div>
                </div>

                <div className="mt-6 h-[260px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={[
                                { name: 'Prompt', total: overview.totalPromptTokens },
                                { name: 'Completion', total: overview.totalCompletionTokens },
                            ]}
                            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                        >
                            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(38,38,38,0.09)" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#7A7A7A', fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#7A7A7A', fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{
                                    borderRadius: '18px',
                                    border: '1px solid rgba(38,38,38,0.08)',
                                    background: 'rgba(255,255,255,0.96)',
                                    boxShadow: '0 20px 50px rgba(15,23,42,0.12)',
                                }}
                                formatter={(value: number) => [formatNumber(value), 'Tokens']}
                            />
                            <Bar dataKey="total" radius={[16, 16, 0, 0]} fill="#FF5B22" barSize={54} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border border-black/[0.06] bg-[#F8F8F8] p-4 dark:border-white/[0.08] dark:bg-white/[0.03]">
                        <div className="flex items-center gap-2 text-sm font-medium text-text-primary">
                            <MessageSquare className="h-4 w-4 text-orange-500" />
                            Mensagens
                        </div>
                        <p className="mt-2 text-xl font-semibold text-text-primary">{formatNumber(overview.totalMessages)}</p>
                    </div>
                    <div className="rounded-2xl border border-black/[0.06] bg-[#F8F8F8] p-4 dark:border-white/[0.08] dark:bg-white/[0.03]">
                        <div className="flex items-center gap-2 text-sm font-medium text-text-primary">
                            <Building2 className="h-4 w-4 text-orange-500" />
                            Organizacoes
                        </div>
                        <p className="mt-2 text-xl font-semibold text-text-primary">{formatNumber(meta.totalOrganizations)}</p>
                    </div>
                    <div className="rounded-2xl border border-black/[0.06] bg-[#F8F8F8] p-4 dark:border-white/[0.08] dark:bg-white/[0.03]">
                        <div className="flex items-center gap-2 text-sm font-medium text-text-primary">
                            <Sparkles className="h-4 w-4 text-orange-500" />
                            Receita conexoes
                        </div>
                        <p className="mt-2 text-xl font-semibold text-text-primary">{formatBrl(overview.connectionsRevenue)}</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
