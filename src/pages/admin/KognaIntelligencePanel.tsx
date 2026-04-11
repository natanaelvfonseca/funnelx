import { useState, useEffect, useCallback } from 'react';
import {
    Brain, RefreshCw, Clock, MessageSquare,
    AlertTriangle, Zap, BarChart2, Award
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Cell, PieChart, Pie
} from 'recharts';

const API_BASE = import.meta.env.VITE_API_URL || '/api';
const COLORS = ['#FF4C00', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4'];

const PERIOD_OPTIONS = [
    { label: '7 dias', value: 7 },
    { label: '30 dias', value: 30 },
    { label: '90 dias', value: 90 },
];

function SectionHeader({ icon: Icon, title, sub, color = 'text-primary' }: {
    icon: React.ElementType; title: string; sub?: string; color?: string;
}) {
    return (
        <div className="flex items-center gap-2 mb-4">
            <Icon className={`w-4 h-4 ${color}`} />
            <div>
                <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
            </div>
        </div>
    );
}

function ImpactBadge({ score }: { score: number }) {
    const pct = Math.round(score * 100);
    const color = pct >= 70 ? 'bg-green-500/15 text-green-400' :
        pct >= 40 ? 'bg-yellow-500/15 text-yellow-400' : 'bg-red-500/15 text-red-400';
    return <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${color}`}>{pct}%</span>;
}

function EmptyState({ text = 'Dados insuficientes' }: { text?: string }) {
    return (
        <div className="flex flex-col items-center justify-center h-36 text-muted-foreground text-sm gap-2">
            <Brain className="w-6 h-6 opacity-30" />
            {text}
        </div>
    );
}

export function KognaIntelligencePanel() {
    const [period, setPeriod] = useState(30);
    const [loading, setLoading] = useState(false);
    const [running, setRunning] = useState(false);

    const [objections, setObjections] = useState<any[]>([]);
    const [langPatterns, setLangPatterns] = useState<any[]>([]);
    const [convTime, setConvTime] = useState<any[]>([]);
    const [topQuestions, setTopQuestions] = useState<any[]>([]);
    const [intentDist, setIntentDist] = useState<any[]>([]);

    const headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };

    const fetchAll = useCallback(async () => {
        setLoading(true);
        const qs = `?days=${period}`;
        try {
            const [objRes, langRes, timeRes, qRes, intentRes] = await Promise.all([
                fetch(`${API_BASE}/intelligence/panel/objection-detail${qs}`, { headers }),
                fetch(`${API_BASE}/intelligence/panel/language-patterns${qs}`, { headers }),
                fetch(`${API_BASE}/intelligence/panel/conversion-time${qs}`, { headers }),
                fetch(`${API_BASE}/intelligence/panel/top-questions${qs}`, { headers }),
                fetch(`${API_BASE}/intelligence/panel/intent-distribution${qs}`, { headers }),
            ]);
            if (objRes.ok) setObjections(await objRes.json());
            if (langRes.ok) setLangPatterns(await langRes.json());
            if (timeRes.ok) setConvTime(await timeRes.json());
            if (qRes.ok) setTopQuestions(await qRes.json());
            if (intentRes.ok) setIntentDist(await intentRes.json());
        } catch (e) { console.error(e); }
        setLoading(false);
    }, [period]);

    useEffect(() => { fetchAll(); }, [fetchAll]);

    const handleRunEngine = async () => {
        setRunning(true);
        await fetch(`${API_BASE}/intelligence/run`, { method: 'POST', headers });
        setRunning(false);
        setTimeout(fetchAll, 3000);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                        <Brain className="w-6 h-6 text-primary" />
                        FunnelX Intelligence Panel
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Dados agregados e anonimizados de todas as empresas na plataforma.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex rounded-lg border border-border overflow-hidden">
                        {PERIOD_OPTIONS.map(opt => (
                            <button
                                key={opt.value}
                                onClick={() => setPeriod(opt.value)}
                                className={`px-3 py-1.5 text-xs font-medium transition-colors ${period === opt.value
                                    ? 'bg-primary text-white'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                    }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={handleRunEngine}
                        disabled={running}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                        <Zap className={`w-3.5 h-3.5 ${running ? 'animate-pulse' : ''}`} />
                        {running ? 'Processando...' : 'Rodar Engine'}
                    </button>
                    <button
                        onClick={fetchAll}
                        disabled={loading}
                        className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Row 1: Objections + Intent Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Objections */}
                <div className="bg-card border border-border rounded-xl p-5">
                    <SectionHeader
                        icon={AlertTriangle}
                        title="Objeções mais comuns"
                        sub="Impacto no ticket médio e probabilidade de conversão"
                        color="text-orange-400"
                    />
                    {objections.length > 0 ? (
                        <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                            {objections.slice(0, 10).map((o, i) => {
                                const convRate = o.count > 0 ? Math.round((o.won / o.count) * 100) : 0;
                                const max = objections[0]?.count || 1;
                                return (
                                    <div key={i}>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-xs font-medium text-foreground truncate max-w-[180px]">{o.objection}</span>
                                            <div className="flex items-center gap-2 shrink-0">
                                                {o.avg_ticket && <span className="text-[10px] text-muted-foreground">R$ {parseInt(o.avg_ticket).toLocaleString()}</span>}
                                                <span className="text-[10px] font-semibold text-green-400">{convRate}% conv</span>
                                                <span className="text-xs text-muted-foreground">{o.count}x</span>
                                            </div>
                                        </div>
                                        <div className="bg-muted rounded-full h-1.5">
                                            <div
                                                className="h-1.5 rounded-full bg-orange-500 transition-all"
                                                style={{ width: `${(o.count / max) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : <EmptyState />}
                </div>

                {/* Intent Distribution */}
                <div className="bg-card border border-border rounded-xl p-5">
                    <SectionHeader
                        icon={BarChart2}
                        title="Distribuição de intenção dos leads"
                        sub="Cross-empresa — IDs anonimizados"
                        color="text-blue-400"
                    />
                    {intentDist.length > 0 ? (
                        <ResponsiveContainer width="100%" height={220}>
                            <PieChart>
                                <Pie
                                    data={intentDist.slice(0, 8)}
                                    dataKey="total"
                                    nameKey="intent"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    label={({ intent, percent }) => `${intent} ${(percent * 100).toFixed(0)}%`}
                                    labelLine={false}
                                >
                                    {intentDist.slice(0, 8).map((_, i) => (
                                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(val: any, _: any, props: any) => [
                                        `${val} leads · conv. ${(parseFloat(props.payload.avg_prob || 0) * 100).toFixed(0)}%`,
                                        'Total'
                                    ]}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : <EmptyState />}
                </div>
            </div>

            {/* Row 2: Language Patterns + Top Converting Questions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Language patterns */}
                <div className="bg-card border border-border rounded-xl p-5">
                    <SectionHeader
                        icon={MessageSquare}
                        title="Padrões de linguagem que convertem"
                        sub="Score de impacto nas conversões"
                        color="text-green-400"
                    />
                    {langPatterns.length > 0 ? (
                        <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                            {langPatterns.map((p, i) => (
                                <div key={i} className="flex items-start justify-between gap-3 py-2 border-b border-border last:border-0">
                                    <div className="min-w-0">
                                        <p className="text-xs font-medium text-foreground truncate">"{p.phrase_detected}"</p>
                                        <p className="text-[10px] text-muted-foreground mt-0.5">
                                            {p.context_intent || '—'} · {p.total_detected}x detectado
                                        </p>
                                    </div>
                                    <div className="shrink-0 flex flex-col items-end gap-1">
                                        <ImpactBadge score={parseFloat(p.avg_impact_score || 0)} />
                                        <span className={`text-[9px] font-medium ${p.pattern_type === 'closing_phrase' ? 'text-green-400' : 'text-red-400'}`}>
                                            {p.pattern_type === 'closing_phrase' ? '▲ fecha' : '▼ mata'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : <EmptyState text="Dados de padrão insuficientes" />}
                </div>

                {/* Top Converting Questions */}
                <div className="bg-card border border-border rounded-xl p-5">
                    <SectionHeader
                        icon={Award}
                        title="Perguntas que mais convertem"
                        sub="Closing phrases com maior impacto por empresa"
                        color="text-yellow-400"
                    />
                    {topQuestions.length > 0 ? (
                        <div className="space-y-1 max-h-60 overflow-y-auto pr-1">
                            {topQuestions.map((q, i) => (
                                <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                                    <span className="text-lg font-bold text-muted-foreground/40 w-6 shrink-0">#{i + 1}</span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-medium text-foreground truncate">"{q.phrase_detected}"</p>
                                        <p className="text-[10px] text-muted-foreground">{q.context_intent || '—'} · {q.total_detected}x</p>
                                    </div>
                                    <ImpactBadge score={parseFloat(q.avg_impact_score || 0)} />
                                </div>
                            ))}
                        </div>
                    ) : <EmptyState text="Dados de perguntas insuficientes" />}
                </div>
            </div>

            {/* Row 3: Avg time to purchase */}
            <div className="bg-card border border-border rounded-xl p-5">
                <SectionHeader
                    icon={Clock}
                    title="Tempo médio até a compra"
                    sub="Dias médios para fechamento por segmento de mercado"
                    color="text-purple-400"
                />
                {convTime.length > 0 ? (
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={convTime} layout="vertical" margin={{ left: 8 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis type="number" tick={{ fill: '#888', fontSize: 11 }} unit=" dias" />
                            <YAxis type="category" dataKey="segment" tick={{ fill: '#888', fontSize: 11 }} width={100} />
                            <Tooltip
                                formatter={(val: any, _: any, props: any) => [
                                    `${val} dias · ${props.payload.total_won} ganhos / ${props.payload.total_analyzed} analisados`,
                                    'Tempo médio'
                                ]}
                            />
                            <Bar dataKey="avg_days_to_close" name="Dias médios" radius={[0, 4, 4, 0]}>
                                {convTime.map((_, i) => (
                                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                ) : <EmptyState text="Dados de ciclo de vendas insuficientes" />}
            </div>
        </div>
    );
}
