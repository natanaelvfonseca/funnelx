import { useState, useEffect, useCallback } from 'react';
import {
    Plus, Save, Trash2, Clock,
    Settings, BarChart3,
    CheckCircle2, Bell, MessageSquare, List, ChevronDown, ChevronRight,
    Brain, RefreshCw, X,
    TrendingUp, Users, Timer, Target
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line, Legend
} from 'recharts';
import { useAuth } from '../../context/AuthContext';

// ─ Types ──────────────────────────────────────────────────────────────────────

interface FollowupSequence {
    id: string;
    name: string;
    pipeline_stage: string | null;
    active: boolean;
    ai_mode: boolean;
    step_count: number;
}

interface FollowupStep {
    id: string;
    sequence_id: string;
    step_number: number;
    delay_minutes: number;
    message_template: string;
    media_url: string | null;
    followup_type: string;
}

interface FollowupSettings {
    enabled: boolean;
    ai_mode_enabled: boolean;
    max_followups_per_lead: number;
    quente_delay_minutes: number;
    morno_delay_minutes: number;
    frio_delay_minutes: number;
}

interface QueueEntry {
    id: string;
    lead_name: string | null;
    remote_jid: string;
    sequence_name: string | null;
    status: string;
    current_step: number;
    total_steps: number;
    scheduled_at: string;
    conversation_temperature: string;
    pipeline_stage: string | null;
}

interface DashboardData {
    kpis: {
        recovered: number;
        responseRate: number;
        avgReplyMinutes: number;
        conversions: number;
    };
    byStep: Array<{ step_number: number; sent: number; replied: number }>;
    trend: Array<{ day: string; sent: number; replied: number }>;
}

const PIPELINE_STAGES = ['Novo Lead', 'Qualificação', 'Interesse', 'Proposta', 'Negociação', 'Fechamento'];
const FOLLOWUP_TYPES = [
    { value: 'reminder', label: '🔔 Lembrete Leve' },
    { value: 'value', label: '💡 Entrega de Valor' },
    { value: 'urgency', label: '⚡ Urgência' },
    { value: 'reengagement', label: '🤝 Reengajamento' },
    { value: 'objection_price', label: '💰 Objeção de Preço' },
];

const TEMP_COLORS: Record<string, string> = {
    quente: 'text-red-400 bg-red-500/10 border-red-500/30',
    morno: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
    frio: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
};

const STATUS_COLORS: Record<string, string> = {
    pending: 'text-yellow-400 bg-yellow-500/10',
    sent: 'text-blue-400 bg-blue-500/10',
    replied: 'text-green-400 bg-green-500/10',
    cancelled: 'text-gray-400 bg-gray-500/10',
};

// ─ Main Component ─────────────────────────────────────────────────────────────

export function FollowupManager() {
    const { token } = useAuth();
    const [activeTab, setActiveTab] = useState<'sequences' | 'queue' | 'dashboard' | 'settings'>('sequences');

    const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

    // ── Sequences State ────────────────────────────────────────────────────────
    const [sequences, setSequences] = useState<FollowupSequence[]>([]);
    const [expandedSeq, setExpandedSeq] = useState<string | null>(null);
    const [stepsBySeq, setStepsBySeq] = useState<Record<string, FollowupStep[]>>({});
    const [loadingSeqs, setLoadingSeqs] = useState(true);
    const [showNewSeq, setShowNewSeq] = useState(false);
    const [newSeqName, setNewSeqName] = useState('');
    const [newSeqStage, setNewSeqStage] = useState('');
    const [newSeqAI, setNewSeqAI] = useState(false);
    const [addingStepFor, setAddingStepFor] = useState<string | null>(null);
    const [newStep, setNewStep] = useState({ delay_minutes: 60, message_template: '', followup_type: 'reminder' });

    // ── Queue State ────────────────────────────────────────────────────────────
    const [queue, setQueue] = useState<QueueEntry[]>([]);
    const [loadingQueue, setLoadingQueue] = useState(false);

    // ── Dashboard State ────────────────────────────────────────────────────────
    const [dashData, setDashData] = useState<DashboardData | null>(null);
    const [loadingDash, setLoadingDash] = useState(false);

    // ── Settings State ─────────────────────────────────────────────────────────
    const [settings, setSettings] = useState<FollowupSettings>({
        enabled: true,
        ai_mode_enabled: false,
        max_followups_per_lead: 4,
        quente_delay_minutes: 30,
        morno_delay_minutes: 120,
        frio_delay_minutes: 720,
    });
    const [savingSettings, setSavingSettings] = useState(false);
    const [settingsMsg, setSettingsMsg] = useState<string | null>(null);

    // ── Fetch Functions ────────────────────────────────────────────────────────
    const fetchSequences = useCallback(async () => {
        setLoadingSeqs(true);
        try {
            const res = await fetch('/api/followup/sequences', { headers });
            if (res.ok) setSequences(await res.json());
        } finally { setLoadingSeqs(false); }
    }, [token]);

    const fetchSteps = async (seqId: string) => {
        const res = await fetch(`/api/followup/sequences/${seqId}/steps`, { headers });
        if (res.ok) {
            const steps = await res.json();
            setStepsBySeq(prev => ({ ...prev, [seqId]: steps }));
        }
    };

    const fetchQueue = async () => {
        setLoadingQueue(true);
        try {
            const res = await fetch('/api/followup/queue', { headers });
            if (res.ok) setQueue(await res.json());
        } finally { setLoadingQueue(false); }
    };

    const fetchDashboard = async () => {
        setLoadingDash(true);
        try {
            const res = await fetch('/api/followup/dashboard', { headers });
            if (res.ok) setDashData(await res.json());
        } finally { setLoadingDash(false); }
    };

    const fetchSettings = async () => {
        const res = await fetch('/api/followup/settings', { headers });
        if (res.ok) setSettings(await res.json());
    };

    useEffect(() => { fetchSequences(); fetchSettings(); }, []);
    useEffect(() => {
        if (activeTab === 'queue') fetchQueue();
        if (activeTab === 'dashboard') fetchDashboard();
    }, [activeTab]);

    // ── Sequence Actions ───────────────────────────────────────────────────────
    const createSequence = async () => {
        if (!newSeqName.trim()) return;
        const res = await fetch('/api/followup/sequences', {
            method: 'POST', headers,
            body: JSON.stringify({ name: newSeqName, pipeline_stage: newSeqStage || null, ai_mode: newSeqAI }),
        });
        if (res.ok) {
            setShowNewSeq(false); setNewSeqName(''); setNewSeqStage(''); setNewSeqAI(false);
            fetchSequences();
        }
    };

    const toggleSequence = async (seq: FollowupSequence) => {
        await fetch(`/api/followup/sequences/${seq.id}`, {
            method: 'PUT', headers,
            body: JSON.stringify({ active: !seq.active }),
        });
        fetchSequences();
    };

    const deleteSequence = async (id: string) => {
        if (!confirm('Excluir sequência e todos os seus passos?')) return;
        await fetch(`/api/followup/sequences/${id}`, { method: 'DELETE', headers });
        fetchSequences();
    };

    const expandSequence = async (seqId: string) => {
        if (expandedSeq === seqId) { setExpandedSeq(null); return; }
        setExpandedSeq(seqId);
        if (!stepsBySeq[seqId]) await fetchSteps(seqId);
    };

    const addStep = async (seqId: string) => {
        if (!newStep.message_template.trim()) return;
        await fetch(`/api/followup/sequences/${seqId}/steps`, {
            method: 'POST', headers,
            body: JSON.stringify(newStep),
        });
        setAddingStepFor(null);
        setNewStep({ delay_minutes: 60, message_template: '', followup_type: 'reminder' });
        await fetchSteps(seqId);
        fetchSequences();
    };

    const deleteStep = async (seqId: string, stepId: string) => {
        await fetch(`/api/followup/steps/${stepId}`, { method: 'DELETE', headers });
        await fetchSteps(seqId);
        fetchSequences();
    };

    // ── Queue Actions ──────────────────────────────────────────────────────────
    const cancelQueue = async (id: string) => {
        await fetch(`/api/followup/queue/${id}`, { method: 'DELETE', headers });
        fetchQueue();
    };

    // ── Settings Actions ───────────────────────────────────────────────────────
    const saveSettings = async () => {
        setSavingSettings(true);
        try {
            const res = await fetch('/api/followup/settings', {
                method: 'PUT', headers,
                body: JSON.stringify(settings),
            });
            if (res.ok) { setSettingsMsg('Configurações salvas com sucesso!'); setTimeout(() => setSettingsMsg(null), 3000); }
        } finally { setSavingSettings(false); }
    };

    // ── Helpers ────────────────────────────────────────────────────────────────
    const formatDelay = (mins: number) => {
        if (mins < 60) return `${mins}min`;
        if (mins < 1440) return `${Math.round(mins / 60)}h`;
        return `${Math.round(mins / 1440)}d`;
    };

    const tabs = [
        { key: 'sequences', label: 'Sequências', icon: List },
        { key: 'queue', label: 'Fila Ativa', icon: Bell },
        { key: 'dashboard', label: 'Dashboard', icon: BarChart3 },
        { key: 'settings', label: 'Configurações', icon: Settings },
    ] as const;

    // ─ Render ──────────────────────────────────────────────────────────────────
    return (
        <div className="space-y-6 p-6 animate-in fade-in duration-500">

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        AI Follow-up Engine
                    </h1>
                    <p className="text-sm text-gray-400 mt-1">
                        Smart Revenue Recovery System — converta silêncio em oportunidade
                    </p>
                </div>
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${settings.enabled ? 'text-green-400 bg-green-500/10 border-green-500/30' : 'text-gray-400 bg-gray-500/10 border-gray-500/30'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${settings.enabled ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`} />
                    {settings.enabled ? 'Engine Ativa' : 'Engine Pausada'}
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-white/5 rounded-xl border border-white/10 w-fit">
                {tabs.map(({ key, label, icon: Icon }) => (
                    <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === key
                            ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <Icon size={15} />
                        {label}
                    </button>
                ))}
            </div>

            {/* ── TAB: SEQUENCES ─── */}
            {activeTab === 'sequences' && (
                <div className="space-y-4">
                    {/* Create button */}
                    <div className="flex justify-end">
                        <button
                            onClick={() => setShowNewSeq(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-purple-500/20"
                        >
                            <Plus size={16} /> Nova Sequência
                        </button>
                    </div>

                    {/* New Sequence Form */}
                    {showNewSeq && (
                        <div className="border border-purple-500/30 bg-purple-500/5 rounded-xl p-5 space-y-4">
                            <h3 className="text-sm font-semibold text-purple-300 flex items-center gap-2">
                                <Plus size={14} /> Criar Nova Sequência
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-gray-400 mb-1 block">Nome da sequência</label>
                                    <input
                                        value={newSeqName}
                                        onChange={e => setNewSeqName(e.target.value)}
                                        placeholder="Ex: Reengajamento Quente"
                                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-400 mb-1 block">Etapa do pipeline (opcional)</label>
                                    <select
                                        value={newSeqStage}
                                        onChange={e => setNewSeqStage(e.target.value)}
                                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-purple-500"
                                    >
                                        <option value="">Todas as etapas</option>
                                        {PIPELINE_STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                            </div>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <div
                                    onClick={() => setNewSeqAI(!newSeqAI)}
                                    className={`relative w-10 h-5 rounded-full transition-colors ${newSeqAI ? 'bg-purple-500' : 'bg-gray-600'}`}
                                >
                                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${newSeqAI ? 'translate-x-5' : 'translate-x-0.5'}`} />
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-white flex items-center gap-1.5"><Brain size={13} className="text-purple-400" /> Modo IA</span>
                                    <p className="text-xs text-gray-500">A IA gera mensagens personalizadas por conversa</p>
                                </div>
                            </label>
                            <div className="flex gap-2">
                                <button onClick={createSequence} className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-medium transition-all">
                                    <Save size={14} /> Criar
                                </button>
                                <button onClick={() => setShowNewSeq(false)} className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-400 rounded-lg text-sm transition-all">
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Sequences List */}
                    {loadingSeqs ? (
                        <div className="flex justify-center py-12">
                            <RefreshCw size={20} className="text-purple-400 animate-spin" />
                        </div>
                    ) : sequences.length === 0 ? (
                        <div className="border border-dashed border-white/10 rounded-xl py-16 flex flex-col items-center gap-3 text-gray-500">
                            <MessageSquare size={32} className="opacity-30" />
                            <p className="text-sm">Nenhuma sequência criada.</p>
                            <p className="text-xs">Crie sua primeira sequência de follow-up acima.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {sequences.map(seq => (
                                <div key={seq.id} className="border border-white/10 rounded-xl overflow-hidden bg-white/2">
                                    {/* Sequence Header */}
                                    <div className="flex items-center gap-3 p-4">
                                        <button onClick={() => expandSequence(seq.id)} className="text-gray-400 hover:text-white transition-colors">
                                            {expandedSeq === seq.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                        </button>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-semibold text-white">{seq.name}</span>
                                                {seq.ai_mode && <span className="text-xs px-1.5 py-0.5 bg-purple-500/20 text-purple-300 rounded-full flex items-center gap-1"><Brain size={10} /> IA</span>}
                                                {seq.pipeline_stage && <span className="text-xs px-1.5 py-0.5 bg-blue-500/20 text-blue-300 rounded-full">{seq.pipeline_stage}</span>}
                                            </div>
                                            <p className="text-xs text-gray-500 mt-0.5">{seq.step_count} passo{seq.step_count !== 1 ? 's' : ''}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => toggleSequence(seq)}
                                                className={`text-xs px-2.5 py-1 rounded-full border font-medium transition-colors ${seq.active ? 'text-green-400 border-green-500/30 hover:bg-green-500/10' : 'text-gray-500 border-gray-600 hover:bg-white/5'}`}
                                            >
                                                {seq.active ? 'Ativa' : 'Inativa'}
                                            </button>
                                            <button onClick={() => deleteSequence(seq.id)} className="text-gray-500 hover:text-red-400 transition-colors p-1">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Expanded Steps */}
                                    {expandedSeq === seq.id && (
                                        <div className="border-t border-white/5 bg-black/20 p-4 space-y-3">
                                            {(stepsBySeq[seq.id] || []).map((step) => (
                                                <div key={step.id} className="flex items-start gap-3 group">
                                                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-xs font-bold text-purple-300">
                                                        {step.step_number}
                                                    </div>
                                                    <div className="flex-1 border border-white/5 rounded-lg p-3 bg-white/2">
                                                        <div className="flex items-center gap-2 mb-1.5">
                                                            <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={10} /> {formatDelay(step.delay_minutes)}</span>
                                                            <span className="text-xs text-purple-300">{FOLLOWUP_TYPES.find(t => t.value === step.followup_type)?.label || step.followup_type}</span>
                                                        </div>
                                                        <p className="text-xs text-gray-300 whitespace-pre-wrap font-mono bg-black/20 p-2 rounded">{step.message_template}</p>
                                                        {/* Variable hints */}
                                                        <p className="text-xs text-gray-600 mt-1">Variáveis: {'{{nome_cliente}} {{produto_interesse}} {{tempo_sem_resposta}} {{ultima_pergunta}}'}</p>
                                                    </div>
                                                    <button onClick={() => deleteStep(seq.id, step.id)} className="text-gray-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 p-1 mt-1">
                                                        <X size={13} />
                                                    </button>
                                                </div>
                                            ))}

                                            {/* Add Step Form */}
                                            {addingStepFor === seq.id ? (
                                                <div className="border border-purple-500/20 bg-purple-500/5 rounded-lg p-4 space-y-3 ml-10">
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <div>
                                                            <label className="text-xs text-gray-400 mb-1 block">Delay (minutos)</label>
                                                            <input
                                                                type="number" min={1}
                                                                value={newStep.delay_minutes}
                                                                onChange={e => setNewStep(p => ({ ...p, delay_minutes: parseInt(e.target.value) || 60 }))}
                                                                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-purple-500"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="text-xs text-gray-400 mb-1 block">Tipo de follow-up</label>
                                                            <select
                                                                value={newStep.followup_type}
                                                                onChange={e => setNewStep(p => ({ ...p, followup_type: e.target.value }))}
                                                                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-purple-500"
                                                            >
                                                                {FOLLOWUP_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="text-xs text-gray-400 mb-1 block">Template da mensagem</label>
                                                        <textarea
                                                            value={newStep.message_template}
                                                            onChange={e => setNewStep(p => ({ ...p, message_template: e.target.value }))}
                                                            placeholder={'Olá {{nome_cliente}}! Vi que você estava interessado em {{produto_interesse}}...'}
                                                            rows={4}
                                                            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 font-mono resize-none"
                                                        />
                                                        <p className="text-xs text-gray-600 mt-1">{'{{nome_cliente}} {{produto_interesse}} {{tempo_sem_resposta}} {{ultima_pergunta}}'}</p>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button onClick={() => addStep(seq.id)} className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-medium">
                                                            <Save size={12} /> Salvar Passo
                                                        </button>
                                                        <button onClick={() => setAddingStepFor(null)} className="px-3 py-1.5 bg-white/5 text-gray-400 rounded-lg text-xs hover:bg-white/10">Cancelar</button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => setAddingStepFor(seq.id)}
                                                    className="flex items-center gap-1.5 ml-10 text-xs text-purple-400 hover:text-purple-300 transition-colors py-1.5"
                                                >
                                                    <Plus size={12} /> Adicionar Passo
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* ── TAB: QUEUE ─── */}
            {activeTab === 'queue' && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-white">Fila de Follow-ups Ativos</h2>
                        <button onClick={fetchQueue} className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5">
                            <RefreshCw size={15} />
                        </button>
                    </div>

                    {loadingQueue ? (
                        <div className="flex justify-center py-12">
                            <RefreshCw size={20} className="text-purple-400 animate-spin" />
                        </div>
                    ) : queue.length === 0 ? (
                        <div className="border border-dashed border-white/10 rounded-xl py-16 flex flex-col items-center gap-3 text-gray-500">
                            <CheckCircle2 size={32} className="opacity-30" />
                            <p className="text-sm">Nenhum follow-up na fila no momento.</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {queue.map(entry => (
                                <div key={entry.id} className="flex items-center gap-4 p-4 border border-white/10 rounded-xl bg-white/2 hover:bg-white/3 transition-colors group">
                                    <div className={`text-xs font-semibold px-2 py-1 rounded-full border ${TEMP_COLORS[entry.conversation_temperature] || TEMP_COLORS.frio}`}>
                                        {entry.conversation_temperature === 'quente' ? '🔥' : entry.conversation_temperature === 'morno' ? '🌡️' : '❄️'}
                                        {' '}{entry.conversation_temperature}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-white truncate">
                                                {entry.lead_name || entry.remote_jid.split('@')[0]}
                                            </span>
                                            {entry.pipeline_stage && (
                                                <span className="text-xs text-gray-500">{entry.pipeline_stage}</span>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-500 truncate">
                                            {entry.sequence_name} · Passo {entry.current_step}/{entry.total_steps}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_COLORS[entry.status] || 'text-gray-400 bg-gray-500/10'}`}>
                                            {entry.status === 'pending' ? '⏱ Pendente' : entry.status === 'sent' ? '📤 Enviado' : entry.status === 'replied' ? '✅ Respondeu' : entry.status}
                                        </div>
                                        <p className="text-xs text-gray-600 mt-0.5">
                                            {new Date(entry.scheduled_at).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                    {entry.status === 'pending' && (
                                        <button
                                            onClick={() => cancelQueue(entry.id)}
                                            className="text-gray-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-500/10"
                                            title="Cancelar follow-up"
                                        >
                                            <X size={14} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* ── TAB: DASHBOARD ─── */}
            {activeTab === 'dashboard' && (
                <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-white">Revenue Recovery Dashboard</h2>

                    {loadingDash ? (
                        <div className="flex justify-center py-12">
                            <RefreshCw size={20} className="text-purple-400 animate-spin" />
                        </div>
                    ) : !dashData ? (
                        <div className="text-center py-12 text-gray-500">Sem dados disponíveis.</div>
                    ) : (
                        <>
                            {/* KPIs */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                {[
                                    { icon: Users, label: 'Leads Recuperados', value: dashData.kpis.recovered, unit: '', color: 'from-purple-500 to-violet-600' },
                                    { icon: Target, label: 'Taxa de Resposta', value: (dashData.kpis.responseRate * 100).toFixed(1), unit: '%', color: 'from-green-500 to-emerald-600' },
                                    { icon: Timer, label: 'Tempo Médio Resposta', value: dashData.kpis.avgReplyMinutes < 60 ? dashData.kpis.avgReplyMinutes : Math.round(dashData.kpis.avgReplyMinutes / 60), unit: dashData.kpis.avgReplyMinutes < 60 ? 'min' : 'h', color: 'from-blue-500 to-cyan-600' },
                                    { icon: TrendingUp, label: 'Conversões', value: dashData.kpis.conversions, unit: '', color: 'from-amber-500 to-orange-600' },
                                ].map(({ icon: Icon, label, value, unit, color }) => (
                                    <div key={label} className="border border-white/10 rounded-xl p-5 bg-white/2">
                                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center mb-3`}>
                                            <Icon size={16} className="text-white" />
                                        </div>
                                        <div className="text-2xl font-bold text-white">{value}<span className="text-sm text-gray-400 ml-0.5">{unit}</span></div>
                                        <div className="text-xs text-gray-500 mt-0.5">{label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Charts */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* By Step */}
                                <div className="border border-white/10 rounded-xl p-5 bg-white/2">
                                    <h3 className="text-sm font-semibold text-white mb-4">Follow-ups por Passo</h3>
                                    {dashData.byStep.length === 0 ? (
                                        <div className="text-center py-8 text-gray-500 text-sm">Sem dados ainda</div>
                                    ) : (
                                        <ResponsiveContainer width="100%" height={200}>
                                            <BarChart data={dashData.byStep.map(s => ({ name: `Passo ${s.step_number}`, Enviados: s.sent, Respondidos: s.replied }))}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                                <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 11 }} />
                                                <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} />
                                                <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
                                                <Bar dataKey="Enviados" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                                                <Bar dataKey="Respondidos" fill="#10b981" radius={[4, 4, 0, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    )}
                                </div>

                                {/* Trend */}
                                <div className="border border-white/10 rounded-xl p-5 bg-white/2">
                                    <h3 className="text-sm font-semibold text-white mb-4">Tendência (14 dias)</h3>
                                    {dashData.trend.length === 0 ? (
                                        <div className="text-center py-8 text-gray-500 text-sm">Sem dados ainda</div>
                                    ) : (
                                        <ResponsiveContainer width="100%" height={200}>
                                            <LineChart data={dashData.trend.map(t => ({ name: new Date(t.day).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }), Enviados: t.sent, Respondidos: t.replied }))}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                                <XAxis dataKey="name" tick={{ fill: '#9ca3af', fontSize: 11 }} />
                                                <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} />
                                                <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
                                                <Legend wrapperStyle={{ fontSize: 11, color: '#9ca3af' }} />
                                                <Line type="monotone" dataKey="Enviados" stroke="#7c3aed" strokeWidth={2} dot={false} />
                                                <Line type="monotone" dataKey="Respondidos" stroke="#10b981" strokeWidth={2} dot={false} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* ── TAB: SETTINGS ─── */}
            {activeTab === 'settings' && (
                <div className="max-w-2xl space-y-6">
                    <h2 className="text-lg font-semibold text-white">Configurações da Engine</h2>

                    {/* Master toggle */}
                    <div className="border border-white/10 rounded-xl p-5 bg-white/2 space-y-4">
                        <label className="flex items-center justify-between cursor-pointer">
                            <div>
                                <span className="text-sm font-medium text-white">Follow-up Automático</span>
                                <p className="text-xs text-gray-500 mt-0.5">Ativar ou pausar todo o engine de follow-up</p>
                            </div>
                            <div onClick={() => setSettings(p => ({ ...p, enabled: !p.enabled }))}
                                className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${settings.enabled ? 'bg-purple-500' : 'bg-gray-600'}`}>
                                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${settings.enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                            </div>
                        </label>

                        <label className="flex items-center justify-between cursor-pointer">
                            <div>
                                <span className="text-sm font-medium text-white flex items-center gap-1.5"><Brain size={14} className="text-purple-400" /> Modo IA Global</span>
                                <p className="text-xs text-gray-500 mt-0.5">A IA gera mensagens personalizadas para todas as sequências</p>
                            </div>
                            <div onClick={() => setSettings(p => ({ ...p, ai_mode_enabled: !p.ai_mode_enabled }))}
                                className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${settings.ai_mode_enabled ? 'bg-purple-500' : 'bg-gray-600'}`}>
                                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${settings.ai_mode_enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                            </div>
                        </label>

                        <div>
                            <label className="text-xs text-gray-400 mb-1 block">Limite máximo de follow-ups por lead</label>
                            <input type="number" min={1} max={20}
                                value={settings.max_followups_per_lead}
                                onChange={e => setSettings(p => ({ ...p, max_followups_per_lead: parseInt(e.target.value) || 4 }))}
                                className="w-32 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-purple-500"
                            />
                        </div>
                    </div>

                    {/* Adaptive delays */}
                    <div className="border border-white/10 rounded-xl p-5 bg-white/2 space-y-4">
                        <h3 className="text-sm font-semibold text-white">Delays Adaptativos por Temperatura</h3>
                        {[
                            { key: 'quente_delay_minutes', label: '🔥 Lead Quente', desc: 'Score ≥ 70', color: 'text-red-400' },
                            { key: 'morno_delay_minutes', label: '🌡️ Lead Morno', desc: 'Score 40–69', color: 'text-yellow-400' },
                            { key: 'frio_delay_minutes', label: '❄️ Lead Frio', desc: 'Score < 40', color: 'text-blue-400' },
                        ].map(({ key, label, desc, color }) => (
                            <div key={key} className="flex items-center justify-between gap-4">
                                <div>
                                    <span className={`text-sm font-medium ${color}`}>{label}</span>
                                    <p className="text-xs text-gray-500">{desc}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="number" min={5}
                                        value={(settings as any)[key]}
                                        onChange={e => setSettings(p => ({ ...p, [key]: parseInt(e.target.value) || 60 }))}
                                        className="w-24 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white text-center focus:outline-none focus:border-purple-500"
                                    />
                                    <span className="text-xs text-gray-500">min</span>
                                    <span className="text-xs text-gray-600">
                                        ({formatDelay((settings as any)[key])})
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {settingsMsg && (
                        <div className="flex items-center gap-2 text-green-400 text-sm bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-2.5">
                            <CheckCircle2 size={15} /> {settingsMsg}
                        </div>
                    )}

                    <button
                        onClick={saveSettings}
                        disabled={savingSettings}
                        className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50"
                    >
                        {savingSettings ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
                        Salvar Configurações
                    </button>
                </div>
            )}
        </div>
    );
}
