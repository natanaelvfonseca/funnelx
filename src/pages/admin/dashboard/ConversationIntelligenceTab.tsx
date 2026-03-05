import { useState, useEffect } from 'react';
import { MessageSquare, Zap, CalendarClock, TrendingUp, AlertTriangle } from 'lucide-react';

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { useAuth } from '../../../context/AuthContext';

const STAGE_ORDER = ['novo_lead', 'qualificacao', 'interesse', 'proposta', 'negociacao', 'fechamento'];
const STAGE_LABELS: Record<string, string> = {
    novo_lead: 'Novo Lead', qualificacao: 'Qualificação', interesse: 'Interesse',
    proposta: 'Proposta', negociacao: 'Negociação', fechamento: 'Fechamento',
};
const INTENT_LABELS: Record<string, string> = {
    informacao: 'Informação', comparacao: 'Comparação', compra: 'Compra',
    suporte: 'Suporte', outro: 'Outro',
};
const INTENT_COLORS = ['#7C3AED', '#D4AF37', '#10B981', '#3B82F6', '#6B7280'];
const STAGE_COLORS: Record<string, string> = {
    novo_lead: '#3B82F6', qualificacao: '#8B5CF6', interesse: '#F59E0B',
    proposta: '#EC4899', negociacao: '#EF4444', fechamento: '#10B981',
};

function KpiCard({ title, value, icon, sub }: { title: string; value: string | number; icon: React.ReactNode; sub?: string }) {
    return (
        <div className="bg-card border border-purple-500/15 rounded-xl p-5 relative overflow-hidden group hover:-translate-y-0.5 transition-all shadow-lg shadow-black/20">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-start justify-between relative z-10">
                <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
                    <h2 className="text-2xl font-bold font-mono text-foreground">{value}</h2>
                    {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
                </div>
                <div className="p-2.5 bg-background border border-purple-500/10 rounded-lg group-hover:scale-110 group-hover:bg-purple-500/10 transition-all">
                    {icon}
                </div>
            </div>
        </div>
    );
}

export function ConversationIntelligenceTab() {
    const { token } = useAuth();
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState<any>(null);
    const [intents, setIntents] = useState<any[]>([]);
    const [objections, setObjections] = useState<any[]>([]);
    const [stages, setStages] = useState<any[]>([]);
    const [segments, setSegments] = useState<any>(null);
    const [avgMetrics, setAvgMetrics] = useState<any>(null);

    const apiBase = import.meta.env.VITE_API_BASE_URL || '';

    useEffect(() => {
        const headers = { Authorization: `Bearer ${token}` };
        const base = `${apiBase}/api/admin/conversation-intelligence`;

        setLoading(true);
        Promise.all([
            fetch(`${base}/summary`, { headers }).then(r => r.json()),
            fetch(`${base}/intents`, { headers }).then(r => r.json()),
            fetch(`${base}/objections`, { headers }).then(r => r.json()),
            fetch(`${base}/stages`, { headers }).then(r => r.json()),
            fetch(`${base}/top-segments`, { headers }).then(r => r.json()),
            fetch(`${base}/avg-metrics`, { headers }).then(r => r.json()),
        ]).then(([sum, int, obj, stg, seg, avg]) => {
            setSummary(sum);
            setIntents(Array.isArray(int) ? int.map((r: any) => ({ ...r, name: INTENT_LABELS[r.intent] || r.intent, count: parseInt(r.count) })) : []);
            setObjections(Array.isArray(obj) ? obj.map((r: any) => ({ ...r, count: parseInt(r.count) })) : []);
            setStages(Array.isArray(stg) ? stg.map((r: any) => ({ ...r, count: parseInt(r.count) })) : []);
            setSegments(seg);
            setAvgMetrics(avg);
        }).catch(console.error).finally(() => setLoading(false));
    }, [token]);

    const maxObj = Math.max(...objections.map(o => o.count), 1);

    const stageMap = Object.fromEntries(stages.map(s => [s.stage, parseInt(s.count)]));
    const maxStage = Math.max(...Object.values(stageMap) as number[], 1);

    if (loading) return (
        <div className="h-[60vh] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500" />
        </div>
    );

    const avgProb = avgMetrics?.avg_purchase_probability != null ? (parseFloat(avgMetrics.avg_purchase_probability) * 100).toFixed(1) : '—';
    const avgTime = avgMetrics?.avg_time_to_decision_seconds != null
        ? `${Math.round(parseInt(avgMetrics.avg_time_to_decision_seconds) / 3600)}h`
        : '—';

    return (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <KpiCard
                    title="Conversas Analisadas"
                    value={(summary?.total_conversations ?? 0).toLocaleString()}
                    icon={<MessageSquare className="w-5 h-5 text-purple-400" />}
                    sub="Conversas únicas"
                />
                <KpiCard
                    title="Mensagens Processadas"
                    value={(summary?.total_messages ?? 0).toLocaleString()}
                    icon={<Zap className="w-5 h-5 text-amber-400" />}
                    sub="Total analisadas pela IA"
                />
                <KpiCard
                    title="Eventos Detectados"
                    value={(summary?.total_events ?? 0).toLocaleString()}
                    icon={<TrendingUp className="w-5 h-5 text-green-400" />}
                    sub="Intenções, objeções, etc."
                />
                <KpiCard
                    title="Prob. Média de Compra"
                    value={`${avgProb}%`}
                    icon={<CalendarClock className="w-5 h-5 text-blue-400" />}
                    sub={`Tempo médio p/ decisão: ${avgTime}`}
                />
            </div>

            {/* Intent Distribution + Funnel Heatmap */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Intent BarChart */}
                <div className="bg-card border border-purple-500/15 rounded-xl p-6 shadow-xl shadow-purple-500/5">
                    <h3 className="text-base font-semibold mb-1">Distribuição de Intenções</h3>
                    <p className="text-xs text-muted-foreground mb-5">O que os leads estão buscando nas conversas</p>
                    {intents.length > 0 ? (
                        <div className="h-[220px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={intents} margin={{ top: 4, right: 8, left: -24, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 11 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 11 }} />
                                    <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#7C3AED', borderRadius: '8px' }} />
                                    <Bar dataKey="count" name="Mensagens" radius={[4, 4, 0, 0]} barSize={36}>
                                        {intents.map((_, i) => <Cell key={i} fill={INTENT_COLORS[i % INTENT_COLORS.length]} />)}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <EmptyState label="Nenhuma intenção detectada ainda" />
                    )}
                </div>

                {/* Funnel Stage Heatmap */}
                <div className="bg-card border border-purple-500/15 rounded-xl p-6 shadow-xl shadow-purple-500/5">
                    <h3 className="text-base font-semibold mb-1">Mapa de Calor do Funil</h3>
                    <p className="text-xs text-muted-foreground mb-5">Frequência de conversas por etapa do pipeline</p>
                    <div className="grid grid-cols-3 gap-3">
                        {STAGE_ORDER.map(stage => {
                            const count = stageMap[stage] || 0;
                            const intensity = maxStage > 0 ? count / maxStage : 0;
                            const opacity = Math.max(0.08, intensity * 0.9);
                            const color = STAGE_COLORS[stage] || '#7C3AED';
                            return (
                                <div
                                    key={stage}
                                    className="rounded-xl p-3 flex flex-col items-center justify-center text-center transition-all"
                                    style={{ backgroundColor: `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`, border: `1px solid ${color}33` }}
                                >
                                    <span className="text-xl font-bold font-mono" style={{ color }}>{count}</span>
                                    <span className="text-[10px] font-medium text-muted-foreground mt-0.5 leading-tight">{STAGE_LABELS[stage]}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Objections + Top Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Objections */}
                <div className="bg-card border border-purple-500/15 rounded-xl p-6 shadow-xl shadow-purple-500/5">
                    <div className="flex items-center gap-2 mb-5">
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                        <h3 className="text-base font-semibold">Principais Objeções Detectadas</h3>
                    </div>
                    {objections.length > 0 ? (
                        <div className="space-y-3">
                            {objections.slice(0, 8).map((obj, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <span className="text-xs text-muted-foreground w-4 text-right flex-shrink-0">{i + 1}</span>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-xs font-medium truncate">{obj.objection}</span>
                                            <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">{obj.count}x</span>
                                        </div>
                                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
                                                style={{ width: `${(obj.count / maxObj) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <EmptyState label="Nenhuma objeção detectada ainda" />
                    )}
                </div>

                {/* Top Products / Segments / Cities */}
                <div className="bg-card border border-purple-500/15 rounded-xl p-6 shadow-xl shadow-purple-500/5">
                    <h3 className="text-base font-semibold mb-5">Tabela de Explorações</h3>
                    <div className="space-y-6">
                        <TopList title="🏷️ Top Produtos" items={segments?.top_products || []} />
                        <TopList title="🏢 Top Segmentos" items={segments?.top_segments || []} />
                        <TopList title="📍 Top Cidades" items={segments?.top_cities || []} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function TopList({ title, items }: { title: string; items: { name: string; count: string | number }[] }) {
    return (
        <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{title}</p>
            {items.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                    {items.slice(0, 6).map((item, i) => (
                        <span key={i} className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                            {item.name} <span className="opacity-70 ml-1">{item.count}x</span>
                        </span>
                    ))}
                </div>
            ) : (
                <p className="text-xs text-muted-foreground italic">Sem dados ainda</p>
            )}
        </div>
    );
}

function EmptyState({ label }: { label: string }) {
    return (
        <div className="h-[120px] flex items-center justify-center">
            <p className="text-sm text-muted-foreground italic">{label}</p>
        </div>
    );
}
