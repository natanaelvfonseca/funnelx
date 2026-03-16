import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
    Bell,
    CheckCircle2,
    Clock3,
    Loader2,
    Mail,
    MessageSquare,
    Monitor,
    Play,
    Plus,
    RefreshCw,
    Save,
    Send,
    Settings2,
    Smartphone,
    Sparkles,
    Trash2,
    X,
    XCircle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface WaInstance {
    instance_name: string;
    agent_name: string | null;
    status: string;
}

interface Automation {
    id: string;
    name: string;
    trigger_event: string;
    trigger_rule: Record<string, unknown>;
    audience_type: 'all' | 'filtered' | 'specific';
    audience_filter: Record<string, unknown>;
    channels: string[];
    message_template: string;
    is_active: boolean;
    created_at: string;
    wa_instance?: string | null;
}

interface AutoLog {
    id: string;
    automation_name: string;
    sent_at: string;
    recipients_count: number;
    channel: string;
    status: 'sent' | 'error';
    error?: string;
}

interface AutomationFormState {
    name: string;
    trigger_event: string;
    trigger_rule: Record<string, unknown>;
    audience_type: 'all' | 'filtered';
    audience_filter: Record<string, unknown>;
    channels: string[];
    message_template: string;
    wa_instance: string;
}

const TRIGGER_EVENTS = [
    { value: 'user_created', label: 'Cadastro criado', description: 'Dispara quando uma conta e criada na plataforma.' },
    { value: 'onboarding_completed', label: 'Cadastro concluido', description: 'Envia a mensagem quando o usuario conclui o onboarding.' },
    { value: 'user_inactive', label: 'Usuario inativo', description: 'Usa a regra de dias sem atividade para reengajar o usuario.' },
    { value: 'koins_low', label: 'Koins abaixo do limite', description: 'Avisa quando o saldo fica abaixo do valor definido.' },
    { value: 'koins_zero', label: 'Koins zerados', description: 'Aciona quando o usuario nao tem mais saldo.' },
    { value: 'agent_created', label: 'IA criada', description: 'Entra em cena quando um novo agente e criado.' },
    { value: 'whatsapp_connected', label: 'WhatsApp conectado', description: 'Executa quando uma conexao de WhatsApp fica online.' },
    { value: 'ai_tested', label: 'Teste da IA realizado', description: 'Executa quando o usuario testa a IA durante o onboarding.' },
    { value: 'manual', label: 'Disparo manual', description: 'A regra fica pronta para ser disparada manualmente.' },
] as const;

const CHANNEL_OPTIONS = [
    { value: 'email', label: 'E-mail', icon: Mail, tone: 'blue' },
    { value: 'internal', label: 'Interno', icon: Monitor, tone: 'slate' },
    { value: 'whatsapp', label: 'WhatsApp', icon: MessageSquare, tone: 'emerald' },
] as const;

const TEMPLATE_VARS = ['{nome}', '{empresa}', '{koins}', '{email}', '{link_dashboard}', '{link_pagamento}'];

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(' ');
}

function getTriggerMeta(triggerEvent: string) {
    return TRIGGER_EVENTS.find((item) => item.value === triggerEvent) || TRIGGER_EVENTS[0];
}

function getChannelMeta(channel: string) {
    return CHANNEL_OPTIONS.find((item) => item.value === channel);
}

function getToneClasses(tone: 'blue' | 'slate' | 'emerald' | 'orange' | 'green' | 'red') {
    const map = {
        blue: 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-200',
        slate: 'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-500/20 dark:bg-slate-500/10 dark:text-slate-200',
        emerald: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200',
        orange: 'border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-200',
        green: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200',
        red: 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-200',
    } as const;

    return map[tone];
}

function formatDateTime(value?: string | null) {
    if (!value) return '--';
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return '--';
    return parsed.toLocaleString('pt-BR');
}

function formatInstanceLabel(value?: string | null) {
    if (!value) return 'Sem conexao definida';
    if (!value.includes('_')) return value;
    return value.split('_').slice(1).join(' ') || value;
}

function Surface({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <section
            className={cn(
                'relative overflow-hidden rounded-[30px] border border-black/[0.06] bg-white/[0.88] shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur dark:border-white/[0.08] dark:bg-[#101113]',
                className,
            )}
        >
            {children}
        </section>
    );
}

function HeaderStat({ label, value, hint }: { label: string; value: string | number; hint: string }) {
    return (
        <div className="rounded-[22px] border border-black/[0.06] bg-white/82 px-4 py-4 shadow-[0_12px_28px_rgba(15,23,42,0.05)] dark:border-white/[0.08] dark:bg-white/[0.04]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">{label}</p>
            <p className="mt-3 text-3xl font-bold tracking-tight text-foreground">{value}</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">{hint}</p>
        </div>
    );
}

function Pill({ children, tone = 'slate' }: { children: ReactNode; tone?: 'blue' | 'slate' | 'emerald' | 'orange' | 'green' | 'red' }) {
    return (
        <span className={cn('inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold', getToneClasses(tone))}>
            {children}
        </span>
    );
}

function TriggerRuleFields({
    triggerEvent,
    triggerRule,
    onChange,
}: {
    triggerEvent: string;
    triggerRule: Record<string, unknown>;
    onChange: (rule: Record<string, unknown>) => void;
}) {
    if (triggerEvent === 'koins_low' || triggerEvent === 'koins_zero') {
        return (
            <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Limite de Koins</label>
                <input
                    type="number"
                    min={0}
                    value={String(triggerRule.koins_threshold ?? '')}
                    onChange={(event) => onChange({ ...triggerRule, koins_threshold: Number(event.target.value) || 0 })}
                    placeholder="Ex: 10"
                    className="h-12 w-full rounded-2xl border border-black/[0.08] bg-white px-4 text-sm text-foreground outline-none transition focus:border-primary/35 dark:border-white/[0.08] dark:bg-white/[0.04]"
                />
            </div>
        );
    }

    if (triggerEvent === 'user_inactive') {
        return (
            <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Dias sem atividade</label>
                <input
                    type="number"
                    min={1}
                    value={String(triggerRule.inactive_days ?? '')}
                    onChange={(event) => onChange({ ...triggerRule, inactive_days: Number(event.target.value) || 1 })}
                    placeholder="Ex: 7"
                    className="h-12 w-full rounded-2xl border border-black/[0.08] bg-white px-4 text-sm text-foreground outline-none transition focus:border-primary/35 dark:border-white/[0.08] dark:bg-white/[0.04]"
                />
            </div>
        );
    }

    return (
        <div className="rounded-[22px] border border-dashed border-black/[0.08] bg-[#F8F8FA] px-4 py-4 text-sm text-muted-foreground dark:border-white/[0.10] dark:bg-white/[0.03]">
            Esse gatilho nao precisa de regra extra. A automacao executa quando o evento acontecer.
        </div>
    );
}

function ChannelButton({
    active,
    label,
    icon,
    onClick,
}: {
    active: boolean;
    label: string;
    icon: ReactNode;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                'inline-flex h-12 items-center gap-2 rounded-2xl border px-4 text-sm font-semibold transition-all',
                active
                    ? 'border-primary/20 bg-primary/[0.10] text-primary shadow-[0_14px_30px_rgba(245,121,59,0.12)]'
                    : 'border-black/[0.08] bg-white text-muted-foreground hover:border-primary/15 hover:text-foreground dark:border-white/[0.08] dark:bg-white/[0.04]',
            )}
        >
            {icon}
            {label}
        </button>
    );
}

function AutomationCard({
    automation,
    triggering,
    triggerResult,
    onToggleActive,
    onTrigger,
    onEdit,
    onDelete,
}: {
    automation: Automation;
    triggering: boolean;
    triggerResult: { id: string; sent: number; total: number } | null;
    onToggleActive: () => void;
    onTrigger: () => void;
    onEdit: () => void;
    onDelete: () => void;
}) {
    const triggerMeta = getTriggerMeta(automation.trigger_event);
    const channels = Array.isArray(automation.channels) ? automation.channels : [];

    return (
        <Surface className="p-6">
            <div className="flex flex-col gap-5">
                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                        <div className="inline-flex rounded-full border border-primary/15 bg-primary/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                            {triggerMeta.label}
                        </div>
                        <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground">{automation.name}</h3>
                        <p className="mt-2 max-w-xl text-sm leading-7 text-muted-foreground">{triggerMeta.description}</p>
                    </div>
                    <Pill tone={automation.is_active ? 'green' : 'slate'}>
                        <span className={cn('h-2 w-2 rounded-full', automation.is_active ? 'bg-emerald-500' : 'bg-slate-400')} />
                        {automation.is_active ? 'Ativa' : 'Pausada'}
                    </Pill>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-[22px] border border-black/[0.06] bg-[#F8F8FA] px-4 py-4 dark:border-white/[0.08] dark:bg-[#111214]">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Canais</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                            {channels.length === 0 ? (
                                <Pill tone="slate">Sem canais</Pill>
                            ) : (
                                channels.map((channel) => {
                                    const meta = getChannelMeta(channel);
                                    const tone = meta?.tone === 'emerald' ? 'emerald' : meta?.tone === 'blue' ? 'blue' : 'slate';
                                    return <Pill key={channel} tone={tone}>{meta?.label || channel}</Pill>;
                                })
                            )}
                        </div>
                    </div>

                    <div className="rounded-[22px] border border-black/[0.06] bg-[#F8F8FA] px-4 py-4 dark:border-white/[0.08] dark:bg-[#111214]">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Publico</p>
                        <p className="mt-3 text-sm font-semibold text-foreground">
                            {automation.audience_type === 'filtered' ? 'Usuarios com tags' : 'Usuario do evento'}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                            {automation.audience_type === 'filtered'
                                ? `Tags: ${((automation.audience_filter?.tags as string[]) || []).join(', ') || 'nenhuma'}`
                                : 'Para gatilhos automaticos, o disparo vai para quem gerou o evento.'}
                        </p>
                    </div>

                    <div className="rounded-[22px] border border-black/[0.06] bg-[#F8F8FA] px-4 py-4 dark:border-white/[0.08] dark:bg-[#111214]">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Conexao WhatsApp</p>
                        <p className="mt-3 text-sm font-semibold text-foreground">{formatInstanceLabel(automation.wa_instance)}</p>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                            {channels.includes('whatsapp')
                                ? 'Essa conexao sera usada em todos os disparos via WhatsApp.'
                                : 'Canal WhatsApp nao selecionado nessa automacao.'}
                        </p>
                    </div>
                </div>

                <div className="rounded-[24px] border border-black/[0.06] bg-white/78 px-4 py-4 dark:border-white/[0.08] dark:bg-white/[0.03]">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Mensagem configurada</p>
                    <p className="mt-3 line-clamp-3 text-sm leading-7 text-foreground/90">
                        {automation.message_template || 'Nenhuma mensagem definida.'}
                    </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="text-xs text-muted-foreground">Criada em {formatDateTime(automation.created_at)}</div>
                    <div className="flex flex-wrap gap-3">
                        {triggerResult?.id === automation.id && (
                            <Pill tone="green">{triggerResult.sent}/{triggerResult.total} enviados</Pill>
                        )}
                        <button type="button" onClick={onToggleActive} className="inline-flex h-11 items-center gap-2 rounded-2xl border border-black/[0.08] bg-white px-4 text-sm font-semibold text-foreground transition hover:border-primary/20 dark:border-white/[0.08] dark:bg-white/[0.04]">
                            {automation.is_active ? 'Pausar' : 'Ativar'}
                        </button>
                        <button type="button" onClick={onTrigger} disabled={triggering} className="inline-flex h-11 items-center gap-2 rounded-2xl bg-gradient-to-r from-[#FF7A1A] via-[#FF6B2D] to-[#FF9A5A] px-4 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(245,121,59,0.22)] disabled:opacity-60">
                            {triggering ? <Loader2 size={15} className="animate-spin" /> : <Play size={15} />}
                            Disparar agora
                        </button>
                        <button type="button" onClick={onEdit} className="inline-flex h-11 items-center gap-2 rounded-2xl border border-black/[0.08] bg-white px-4 text-sm font-semibold text-foreground transition hover:border-primary/20 dark:border-white/[0.08] dark:bg-white/[0.04]">
                            <Settings2 size={15} />
                            Configurar
                        </button>
                        <button type="button" onClick={onDelete} className="inline-flex h-11 items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-200">
                            <Trash2 size={15} />
                            Excluir
                        </button>
                    </div>
                </div>
            </div>
        </Surface>
    );
}

export function AdminAutomations() {
    const { token } = useAuth();
    const [activeTab, setActiveTab] = useState<'automations' | 'manual' | 'history'>('automations');
    const [automations, setAutomations] = useState<Automation[]>([]);
    const [logs, setLogs] = useState<AutoLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editTarget, setEditTarget] = useState<Automation | null>(null);
    const [triggeringId, setTriggeringId] = useState<string | null>(null);
    const [triggerResult, setTriggerResult] = useState<{ id: string; sent: number; total: number } | null>(null);

    const apiHeaders = useCallback(() => ({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    }), [token]);

    const fetchAutomations = useCallback(async () => {
        const response = await fetch('/api/admin/automations', { headers: apiHeaders() });
        if (!response.ok) return;
        setAutomations(await response.json());
    }, [apiHeaders]);

    const fetchLogs = useCallback(async () => {
        const response = await fetch('/api/admin/automation-logs', { headers: apiHeaders() });
        if (!response.ok) return;
        setLogs(await response.json());
    }, [apiHeaders]);

    useEffect(() => {
        setLoading(true);
        Promise.all([fetchAutomations(), fetchLogs()]).finally(() => setLoading(false));
    }, [fetchAutomations, fetchLogs]);

    const stats = useMemo(() => {
        const activeCount = automations.filter((item) => item.is_active).length;
        const whatsappCount = automations.filter((item) => item.channels?.includes('whatsapp')).length;
        const sentLogs = logs.filter((item) => item.status === 'sent').length;
        return { activeCount, whatsappCount, sentLogs };
    }, [automations, logs]);

    const handleToggleActive = async (automation: Automation) => {
        await fetch(`/api/admin/automations/${automation.id}`, {
            method: 'PATCH',
            headers: apiHeaders(),
            body: JSON.stringify({ is_active: !automation.is_active }),
        });
        fetchAutomations();
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Excluir esta automacao?')) return;
        await fetch(`/api/admin/automations/${id}`, {
            method: 'DELETE',
            headers: apiHeaders(),
        });
        fetchAutomations();
    };

    const handleTrigger = async (automation: Automation) => {
        setTriggeringId(automation.id);
        setTriggerResult(null);
        const response = await fetch(`/api/admin/automations/${automation.id}/trigger`, {
            method: 'POST',
            headers: apiHeaders(),
        });
        const data = await response.json();
        setTriggeringId(null);
        if (response.ok) {
            setTriggerResult({ id: automation.id, sent: data.sent || 0, total: data.total || 0 });
        }
        fetchLogs();
    };

    const openCreate = () => {
        setEditTarget(null);
        setShowModal(true);
    };

    const openEdit = (automation: Automation) => {
        setEditTarget(automation);
        setShowModal(true);
    };

    return (
        <div className="space-y-8 px-6 py-8 lg:px-8">
            <Surface className="p-6 sm:p-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,122,26,0.16),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,122,26,0.08),transparent_28%)]" />
                <div className="relative space-y-8">
                    <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
                        <div className="max-w-3xl">
                            <div className="inline-flex rounded-full border border-primary/15 bg-primary/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                                Admin automations
                            </div>
                            <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                                Automacoes que acompanham a jornada do usuario
                            </h1>
                            <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
                                Organize notificacoes automaticas, defina qual conexao do WhatsApp dispara cada mensagem e mantenha os gatilhos do ciclo comercial funcionando com mais consistencia.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setLoading(true);
                                    Promise.all([fetchAutomations(), fetchLogs()]).finally(() => setLoading(false));
                                }}
                                className="inline-flex h-12 items-center gap-2 rounded-2xl border border-black/[0.08] bg-white px-4 text-sm font-semibold text-foreground transition hover:border-primary/20 dark:border-white/[0.08] dark:bg-white/[0.04]"
                            >
                                <RefreshCw size={16} />
                                Atualizar
                            </button>
                            <button
                                type="button"
                                onClick={openCreate}
                                className="inline-flex h-12 items-center gap-2 rounded-2xl bg-gradient-to-r from-[#FF7A1A] via-[#FF6B2D] to-[#FF9A5A] px-5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(245,121,59,0.28)]"
                            >
                                <Plus size={16} />
                                Nova automacao
                            </button>
                        </div>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-3">
                        <HeaderStat label="Fluxos ativos" value={stats.activeCount} hint="Regras automaticas prontas para operar." />
                        <HeaderStat label="WhatsApp nas regras" value={stats.whatsappCount} hint="Automacoes com envio via conexao escolhida." />
                        <HeaderStat label="Envios registrados" value={stats.sentLogs} hint="Historico consolidado de disparos." />
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {([
                            { id: 'automations', label: 'Automacoes', icon: Sparkles },
                            { id: 'manual', label: 'Disparo manual', icon: Send },
                            { id: 'history', label: 'Historico', icon: Clock3 },
                        ] as const).map(({ id, label, icon: Icon }) => (
                            <button
                                key={id}
                                type="button"
                                onClick={() => setActiveTab(id)}
                                className={cn(
                                    'inline-flex h-12 items-center gap-2 rounded-2xl border px-4 text-sm font-semibold transition-all',
                                    activeTab === id
                                        ? 'border-primary/15 bg-primary/[0.10] text-primary shadow-[0_14px_35px_rgba(245,121,59,0.14)]'
                                        : 'border-black/[0.08] bg-white text-muted-foreground hover:border-primary/15 hover:text-foreground dark:border-white/[0.08] dark:bg-white/[0.04]',
                                )}
                            >
                                <Icon size={16} />
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            </Surface>

            {loading ? (
                <div className="flex h-64 items-center justify-center">
                    <Loader2 size={28} className="animate-spin text-primary" />
                </div>
            ) : (
                <>
                    {activeTab === 'automations' && (
                        <div className="space-y-4">
                            {automations.length === 0 ? (
                                <Surface className="px-6 py-16 text-center">
                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[24px] border border-primary/15 bg-primary/[0.08] text-primary">
                                        <Bell size={28} />
                                    </div>
                                    <h2 className="mt-6 text-2xl font-bold tracking-tight text-foreground">Nenhuma automacao criada ainda</h2>
                                    <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                                        Monte seus gatilhos automaticos com a conexao de WhatsApp certa para avisos de cadastro, onboarding, criacao de IA e outras acoes importantes.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={openCreate}
                                        className="mt-8 inline-flex h-12 items-center gap-2 rounded-2xl bg-gradient-to-r from-[#FF7A1A] via-[#FF6B2D] to-[#FF9A5A] px-5 text-sm font-semibold text-white"
                                    >
                                        <Plus size={16} />
                                        Criar primeira automacao
                                    </button>
                                </Surface>
                            ) : (
                                <div className="grid gap-4">
                                    {automations.map((automation) => (
                                        <AutomationCard
                                            key={automation.id}
                                            automation={automation}
                                            triggering={triggeringId === automation.id}
                                            triggerResult={triggerResult}
                                            onToggleActive={() => handleToggleActive(automation)}
                                            onTrigger={() => handleTrigger(automation)}
                                            onEdit={() => openEdit(automation)}
                                            onDelete={() => handleDelete(automation.id)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'manual' && (
                        <ManualSendPanel apiHeaders={apiHeaders} onSent={fetchLogs} />
                    )}

                    {activeTab === 'history' && (
                        <Surface className="overflow-hidden">
                            <div className="border-b border-black/[0.06] px-6 py-5 dark:border-white/[0.08]">
                                <h2 className="text-xl font-bold tracking-tight text-foreground">Historico de disparos</h2>
                                <p className="mt-2 text-sm text-muted-foreground">Acompanhe o que ja foi enviado, por qual canal e com qual resultado.</p>
                            </div>
                            {logs.length === 0 ? (
                                <div className="px-6 py-16 text-center text-sm text-muted-foreground">Nenhum disparo registrado ainda.</div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-left text-sm">
                                        <thead className="bg-[#F8F8FA] text-[11px] uppercase tracking-[0.18em] text-muted-foreground dark:bg-white/[0.03]">
                                            <tr>
                                                <th className="px-6 py-4">Automacao</th>
                                                <th className="px-6 py-4">Data</th>
                                                <th className="px-6 py-4">Destinatarios</th>
                                                <th className="px-6 py-4">Canal</th>
                                                <th className="px-6 py-4">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-black/[0.06] dark:divide-white/[0.08]">
                                            {logs.map((logItem) => (
                                                <tr key={logItem.id} className="bg-white/72 dark:bg-transparent">
                                                    <td className="px-6 py-4 font-semibold text-foreground">{logItem.automation_name}</td>
                                                    <td className="px-6 py-4 text-muted-foreground">{formatDateTime(logItem.sent_at)}</td>
                                                    <td className="px-6 py-4 font-semibold text-foreground">{logItem.recipients_count}</td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-wrap gap-2">
                                                            {logItem.channel.split(',').filter(Boolean).map((channel) => {
                                                                const meta = getChannelMeta(channel);
                                                                const tone = meta?.tone === 'emerald' ? 'emerald' : meta?.tone === 'blue' ? 'blue' : 'slate';
                                                                return <Pill key={`${logItem.id}-${channel}`} tone={tone}>{meta?.label || channel}</Pill>;
                                                            })}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {logItem.status === 'sent' ? (
                                                            <span className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-300">
                                                                <CheckCircle2 size={16} />
                                                                Enviado
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-2 text-rose-600 dark:text-rose-300" title={logItem.error || 'Erro no disparo'}>
                                                                <XCircle size={16} />
                                                                Erro
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </Surface>
                    )}
                </>
            )}

            {showModal && (
                <AutomationModal
                    automation={editTarget}
                    apiHeaders={apiHeaders}
                    onClose={() => setShowModal(false)}
                    onSaved={() => {
                        fetchAutomations();
                        setShowModal(false);
                    }}
                />
            )}
        </div>
    );
}

function AutomationModal({
    automation,
    apiHeaders,
    onClose,
    onSaved,
}: {
    automation: Automation | null;
    apiHeaders: () => Record<string, string>;
    onClose: () => void;
    onSaved: () => void;
}) {
    const isEdit = Boolean(automation);
    const [form, setForm] = useState<AutomationFormState>({
        name: automation?.name ?? '',
        trigger_event: automation?.trigger_event ?? 'user_created',
        trigger_rule: automation?.trigger_rule ?? {},
        audience_type: (automation?.audience_type === 'filtered' ? 'filtered' : 'all'),
        audience_filter: automation?.audience_filter ?? {},
        channels: automation?.channels ?? ['internal'],
        message_template: automation?.message_template ?? '',
        wa_instance: automation?.wa_instance ?? '',
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [tagInput, setTagInput] = useState('');
    const [waInstances, setWaInstances] = useState<WaInstance[]>([]);

    useEffect(() => {
        fetch('/api/admin/whatsapp-instances', { headers: apiHeaders() })
            .then((response) => (response.ok ? response.json() : []))
            .then((data) => setWaInstances(Array.isArray(data) ? data : []))
            .catch(() => setWaInstances([]));
    }, [apiHeaders]);

    const setField = <K extends keyof AutomationFormState>(key: K, value: AutomationFormState[K]) => {
        setForm((current) => ({ ...current, [key]: value }));
    };

    const toggleChannel = (channel: string) => {
        setForm((current) => {
            const nextChannels = current.channels.includes(channel)
                ? current.channels.filter((item) => item !== channel)
                : [...current.channels, channel];

            return {
                ...current,
                channels: nextChannels,
                wa_instance: nextChannels.includes('whatsapp') ? current.wa_instance : '',
            };
        });
    };

    const insertVar = (value: string) => {
        setField('message_template', form.message_template + value);
    };

    const addTag = () => {
        const clean = tagInput.trim().toLowerCase();
        if (!clean) return;
        const currentTags = Array.isArray(form.audience_filter.tags) ? (form.audience_filter.tags as string[]) : [];
        if (currentTags.includes(clean)) {
            setTagInput('');
            return;
        }
        setField('audience_filter', { ...form.audience_filter, tags: [...currentTags, clean] });
        setTagInput('');
    };

    const removeTag = (tag: string) => {
        const currentTags = Array.isArray(form.audience_filter.tags) ? (form.audience_filter.tags as string[]) : [];
        setField('audience_filter', {
            ...form.audience_filter,
            tags: currentTags.filter((item) => item !== tag),
        });
    };

    const handleSave = async () => {
        setError('');

        if (!form.name.trim() || !form.message_template.trim()) {
            setError('Nome e mensagem sao obrigatorios.');
            return;
        }

        if (!form.channels.length) {
            setError('Selecione pelo menos um canal.');
            return;
        }

        if (form.channels.includes('whatsapp') && !form.wa_instance) {
            setError('Escolha qual conexao do WhatsApp sera usada nessa automacao.');
            return;
        }

        setSaving(true);
        const url = isEdit ? `/api/admin/automations/${automation!.id}` : '/api/admin/automations';
        const method = isEdit ? 'PATCH' : 'POST';
        const response = await fetch(url, {
            method,
            headers: apiHeaders(),
            body: JSON.stringify({
                ...form,
                wa_instance: form.channels.includes('whatsapp') ? form.wa_instance : '',
            }),
        });
        const data = await response.json();
        setSaving(false);

        if (!response.ok) {
            setError(data.error || 'Erro ao salvar automacao.');
            return;
        }

        onSaved();
    };

    const triggerMeta = getTriggerMeta(form.trigger_event);
    const currentTags = Array.isArray(form.audience_filter.tags) ? (form.audience_filter.tags as string[]) : [];

    return (
        <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-slate-950/45 p-4">
            <div className="absolute inset-0" onClick={onClose} />
            <div className="relative z-10 flex max-h-[calc(100vh-32px)] w-full max-w-4xl flex-col overflow-hidden rounded-[32px] border border-black/[0.06] bg-white shadow-[0_35px_120px_rgba(15,23,42,0.18)] dark:border-white/[0.08] dark:bg-[#111214]">
                <div className="border-b border-black/[0.06] px-6 py-5 dark:border-white/[0.08]">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <div className="inline-flex rounded-full border border-primary/15 bg-primary/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                                Automacao premium
                            </div>
                            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground">{isEdit ? 'Editar automacao' : 'Nova automacao'}</h2>
                            <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
                                Defina o evento, a conexao de WhatsApp e a mensagem que sera enviada quando o disparo acontecer.
                            </p>
                        </div>
                        <button type="button" onClick={onClose} className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-black/[0.08] bg-white text-muted-foreground transition hover:text-foreground dark:border-white/[0.08] dark:bg-white/[0.04]">
                            <X size={16} />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-6">
                    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_360px]">
                        <div className="space-y-6">
                            {error && (
                                <div className="flex items-start gap-3 rounded-[22px] border border-rose-200 bg-rose-50 px-4 py-4 text-sm text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-200">
                                    <XCircle size={18} className="mt-0.5 shrink-0" />
                                    <span>{error}</span>
                                </div>
                            )}

                            <Surface className="p-5">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">Bloco 1</p>
                                <h3 className="mt-3 text-2xl font-bold tracking-tight text-foreground">Base da automacao</h3>
                                <div className="mt-5 grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Nome da automacao</label>
                                        <input value={form.name} onChange={(event) => setField('name', event.target.value)} placeholder="Ex: Boas-vindas apos cadastro" className="h-12 w-full rounded-2xl border border-black/[0.08] bg-white px-4 text-sm text-foreground outline-none transition focus:border-primary/35 dark:border-white/[0.08] dark:bg-white/[0.04]" />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Gatilho do disparo</label>
                                        <select value={form.trigger_event} onChange={(event) => setField('trigger_event', event.target.value)} className="h-12 w-full rounded-2xl border border-black/[0.08] bg-white px-4 text-sm text-foreground outline-none transition focus:border-primary/35 dark:border-white/[0.08] dark:bg-white/[0.04]">
                                            {TRIGGER_EVENTS.map((trigger) => <option key={trigger.value} value={trigger.value}>{trigger.label}</option>)}
                                        </select>
                                        <p className="text-xs leading-6 text-muted-foreground">{triggerMeta.description}</p>
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Regra do gatilho</label>
                                        <TriggerRuleFields triggerEvent={form.trigger_event} triggerRule={form.trigger_rule} onChange={(rule) => setField('trigger_rule', rule)} />
                                    </div>
                                </div>
                            </Surface>

                            <Surface className="p-5">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">Bloco 2</p>
                                <h3 className="mt-3 text-2xl font-bold tracking-tight text-foreground">Publico e canais</h3>
                                <div className="mt-5 space-y-5">
                                    <div className="space-y-3">
                                        <label className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Quem recebe</label>
                                        <div className="flex flex-wrap gap-3">
                                            <button type="button" onClick={() => setField('audience_type', 'all')} className={cn('rounded-2xl border px-4 py-3 text-sm font-semibold transition-all', form.audience_type === 'all' ? 'border-primary/15 bg-primary/[0.10] text-primary' : 'border-black/[0.08] bg-white text-muted-foreground dark:border-white/[0.08] dark:bg-white/[0.04]')}>Usuario do evento</button>
                                            <button type="button" onClick={() => setField('audience_type', 'filtered')} className={cn('rounded-2xl border px-4 py-3 text-sm font-semibold transition-all', form.audience_type === 'filtered' ? 'border-primary/15 bg-primary/[0.10] text-primary' : 'border-black/[0.08] bg-white text-muted-foreground dark:border-white/[0.08] dark:bg-white/[0.04]')}>Usuario do evento com tags</button>
                                        </div>
                                        <p className="text-xs leading-6 text-muted-foreground">Nos gatilhos automaticos, a mensagem vai para a pessoa que gerou o evento. Se quiser restringir, use tags.</p>
                                    </div>

                                    {form.audience_type === 'filtered' && (
                                        <div className="space-y-3 rounded-[22px] border border-black/[0.06] bg-[#F8F8FA] p-4 dark:border-white/[0.08] dark:bg-[#111214]">
                                            <div className="flex gap-3">
                                                <input value={tagInput} onChange={(event) => setTagInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); addTag(); } }} placeholder="Ex: trial, pagante, onboarding" className="h-12 flex-1 rounded-2xl border border-black/[0.08] bg-white px-4 text-sm text-foreground outline-none transition focus:border-primary/35 dark:border-white/[0.08] dark:bg-white/[0.04]" />
                                                <button type="button" onClick={addTag} className="inline-flex h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-[#FF7A1A] via-[#FF6B2D] to-[#FF9A5A] px-4 text-sm font-semibold text-white">Adicionar</button>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {currentTags.length === 0 ? <span className="text-xs text-muted-foreground">Nenhuma tag adicionada.</span> : currentTags.map((tag) => (
                                                    <button key={tag} type="button" onClick={() => removeTag(tag)} className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/[0.08] px-3 py-1 text-xs font-semibold text-primary">
                                                        {tag}
                                                        <X size={12} />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-3">
                                        <label className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Canais de envio</label>
                                        <div className="flex flex-wrap gap-3">
                                            {CHANNEL_OPTIONS.map(({ value, label, icon: Icon }) => <ChannelButton key={value} active={form.channels.includes(value)} label={label} icon={<Icon size={16} />} onClick={() => toggleChannel(value)} />)}
                                        </div>
                                    </div>

                                    {form.channels.includes('whatsapp') && (
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                                                <Smartphone size={14} />
                                                Conexao do WhatsApp
                                            </label>
                                            {waInstances.length === 0 ? (
                                                <div className="rounded-[22px] border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200">
                                                    Nenhuma conexao encontrada. Conecte um numero em /whatsapp antes de salvar esta automacao.
                                                </div>
                                            ) : (
                                                <select value={form.wa_instance} onChange={(event) => setField('wa_instance', event.target.value)} className="h-12 w-full rounded-2xl border border-black/[0.08] bg-white px-4 text-sm text-foreground outline-none transition focus:border-primary/35 dark:border-white/[0.08] dark:bg-white/[0.04]">
                                                    <option value="">Selecione uma conexao...</option>
                                                    {waInstances.map((instance) => <option key={instance.instance_name} value={instance.instance_name}>{formatInstanceLabel(instance.instance_name)}{instance.agent_name ? ` - ${instance.agent_name}` : ''} ({instance.status})</option>)}
                                                </select>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </Surface>

                            <Surface className="p-5">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">Bloco 3</p>
                                <h3 className="mt-3 text-2xl font-bold tracking-tight text-foreground">Mensagem</h3>
                                <div className="mt-5 space-y-3">
                                    <textarea value={form.message_template} onChange={(event) => setField('message_template', event.target.value)} rows={7} placeholder="Ola {nome}, sua conta foi criada e a Kogna ja esta pronta para acelerar suas vendas." className="w-full rounded-[24px] border border-black/[0.08] bg-white px-4 py-4 text-sm leading-7 text-foreground outline-none transition focus:border-primary/35 dark:border-white/[0.08] dark:bg-white/[0.04]" />
                                    <div className="flex flex-wrap gap-2">
                                        {TEMPLATE_VARS.map((variable) => <button key={variable} type="button" onClick={() => insertVar(variable)} className="rounded-full border border-black/[0.08] bg-white px-3 py-1 text-xs font-semibold text-muted-foreground transition hover:border-primary/15 hover:text-primary dark:border-white/[0.08] dark:bg-white/[0.04]">{variable}</button>)}
                                    </div>
                                </div>
                            </Surface>
                        </div>

                        <div className="space-y-6">
                            <Surface className="p-5">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">Resumo</p>
                                <h3 className="mt-3 text-2xl font-bold tracking-tight text-foreground">Como esta regra vai operar</h3>
                                <div className="mt-5 space-y-4">
                                    <div className="rounded-[22px] border border-black/[0.06] bg-[#F8F8FA] px-4 py-4 dark:border-white/[0.08] dark:bg-[#111214]">
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Gatilho</p>
                                        <p className="mt-2 text-sm font-semibold text-foreground">{triggerMeta.label}</p>
                                        <p className="mt-1 text-xs leading-6 text-muted-foreground">{triggerMeta.description}</p>
                                    </div>
                                    <div className="rounded-[22px] border border-black/[0.06] bg-[#F8F8FA] px-4 py-4 dark:border-white/[0.08] dark:bg-[#111214]">
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Publico</p>
                                        <p className="mt-2 text-sm font-semibold text-foreground">{form.audience_type === 'filtered' ? 'Usuario do evento + filtro de tags' : 'Usuario do evento'}</p>
                                    </div>
                                    <div className="rounded-[22px] border border-black/[0.06] bg-[#F8F8FA] px-4 py-4 dark:border-white/[0.08] dark:bg-[#111214]">
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Canais ativos</p>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {form.channels.map((channel) => {
                                                const meta = getChannelMeta(channel);
                                                const tone = meta?.tone === 'emerald' ? 'emerald' : meta?.tone === 'blue' ? 'blue' : 'slate';
                                                return <Pill key={channel} tone={tone}>{meta?.label || channel}</Pill>;
                                            })}
                                        </div>
                                        {form.channels.includes('whatsapp') && <p className="mt-3 text-xs leading-6 text-muted-foreground">Conexao escolhida: {formatInstanceLabel(form.wa_instance)}</p>}
                                    </div>
                                </div>
                            </Surface>

                            <Surface className="p-5">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">Boas praticas</p>
                                <ul className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
                                    <li>Use mensagens curtas, diretas e com contexto do evento.</li>
                                    <li>Se ativar WhatsApp, defina a conexao que vai enviar as mensagens.</li>
                                    <li>Para gatilhos automaticos, evite textos genericos e deixe claro o proximo passo.</li>
                                </ul>
                            </Surface>
                        </div>
                    </div>
                </div>

                <div className="border-t border-black/[0.06] px-6 py-5 dark:border-white/[0.08]">
                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <button type="button" onClick={onClose} className="inline-flex h-12 items-center justify-center rounded-2xl border border-black/[0.08] bg-white px-5 text-sm font-semibold text-foreground transition hover:border-primary/20 dark:border-white/[0.08] dark:bg-white/[0.04]">
                            Cancelar
                        </button>
                        <button type="button" onClick={handleSave} disabled={saving} className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#FF7A1A] via-[#FF6B2D] to-[#FF9A5A] px-5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(245,121,59,0.28)] disabled:opacity-60">
                            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                            {isEdit ? 'Salvar automacao' : 'Criar automacao'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ManualSendPanel({
    apiHeaders,
    onSent,
}: {
    apiHeaders: () => Record<string, string>;
    onSent: () => void;
}) {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [channels, setChannels] = useState<string[]>(['internal']);
    const [audienceType, setAudienceType] = useState<'all' | 'filtered'>('all');
    const [tagFilter, setTagFilter] = useState('');
    const [sending, setSending] = useState(false);
    const [result, setResult] = useState<{ sent: number; total: number } | null>(null);
    const [error, setError] = useState('');
    const [waInstances, setWaInstances] = useState<WaInstance[]>([]);
    const [waInstance, setWaInstance] = useState('');
    const [notifTitle, setNotifTitle] = useState('Mensagem da Kogna');

    useEffect(() => {
        fetch('/api/admin/whatsapp-instances', { headers: apiHeaders() })
            .then((response) => (response.ok ? response.json() : []))
            .then((data) => setWaInstances(Array.isArray(data) ? data : []))
            .catch(() => setWaInstances([]));
    }, [apiHeaders]);

    const toggleChannel = (channel: string) => {
        setChannels((current) => current.includes(channel)
            ? current.filter((item) => item !== channel)
            : [...current, channel]);
        if (channel === 'whatsapp' && channels.includes('whatsapp')) {
            setWaInstance('');
        }
    };

    const insertVar = (value: string) => setMessage((current) => current + value);

    const handleSend = async () => {
        setError('');
        setResult(null);

        if (!message.trim()) {
            setError('A mensagem nao pode ficar vazia.');
            return;
        }

        if (!channels.length) {
            setError('Selecione pelo menos um canal.');
            return;
        }

        if (channels.includes('whatsapp') && !waInstance) {
            setError('Escolha a conexao do WhatsApp para o envio manual.');
            return;
        }

        const target = audienceType === 'all' ? 'todos os usuarios' : `usuarios com as tags "${tagFilter}"`;
        if (!window.confirm(`Confirmar envio para ${target}?`)) return;

        setSending(true);
        const body: Record<string, unknown> = {
            message,
            subject,
            channels,
            audience_type: audienceType,
            notification_title: notifTitle || 'Mensagem da Kogna',
        };

        if (audienceType === 'filtered' && tagFilter.trim()) {
            body.filter_tags = tagFilter.split(',').map((tag) => tag.trim()).filter(Boolean);
        }

        if (channels.includes('whatsapp')) {
            body.wa_instance = waInstance;
        }

        const response = await fetch('/api/admin/notifications/send', {
            method: 'POST',
            headers: apiHeaders(),
            body: JSON.stringify(body),
        });
        const data = await response.json();
        setSending(false);

        if (!response.ok) {
            setError(data.error || 'Erro ao enviar.');
            return;
        }

        setResult({ sent: data.sent || 0, total: data.total || 0 });
        onSent();
    };

    return (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_340px]">
            <Surface className="p-6">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <div className="inline-flex rounded-full border border-primary/15 bg-primary/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                            Disparo manual
                        </div>
                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground">Envie uma comunicacao agora</h2>
                        <p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
                            Escolha o publico, selecione os canais e defina qual conexao do WhatsApp deve ser usada no disparo manual.
                        </p>
                    </div>
                    <div className="rounded-[22px] border border-black/[0.06] bg-white/78 px-4 py-3 text-right dark:border-white/[0.08] dark:bg-white/[0.04]">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Conexoes</p>
                        <p className="mt-2 text-lg font-bold text-foreground">{waInstances.length}</p>
                    </div>
                </div>

                <div className="mt-6 space-y-5">
                    {result && (
                        <div className="flex items-start gap-3 rounded-[22px] border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200">
                            <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                            <span>{result.sent} envio(s) processados com sucesso.</span>
                        </div>
                    )}
                    {error && (
                        <div className="flex items-start gap-3 rounded-[22px] border border-rose-200 bg-rose-50 px-4 py-4 text-sm text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-200">
                            <XCircle size={18} className="mt-0.5 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-3 md:col-span-2">
                            <label className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Publico</label>
                            <div className="flex flex-wrap gap-3">
                                <button type="button" onClick={() => setAudienceType('all')} className={cn('rounded-2xl border px-4 py-3 text-sm font-semibold transition-all', audienceType === 'all' ? 'border-primary/15 bg-primary/[0.10] text-primary' : 'border-black/[0.08] bg-white text-muted-foreground dark:border-white/[0.08] dark:bg-white/[0.04]')}>Todos os usuarios</button>
                                <button type="button" onClick={() => setAudienceType('filtered')} className={cn('rounded-2xl border px-4 py-3 text-sm font-semibold transition-all', audienceType === 'filtered' ? 'border-primary/15 bg-primary/[0.10] text-primary' : 'border-black/[0.08] bg-white text-muted-foreground dark:border-white/[0.08] dark:bg-white/[0.04]')}>Filtrar por tags</button>
                            </div>
                        </div>

                        {audienceType === 'filtered' && (
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Tags</label>
                                <input value={tagFilter} onChange={(event) => setTagFilter(event.target.value)} placeholder="trial, onboarding, pagante" className="h-12 w-full rounded-2xl border border-black/[0.08] bg-white px-4 text-sm text-foreground outline-none transition focus:border-primary/35 dark:border-white/[0.08] dark:bg-white/[0.04]" />
                            </div>
                        )}

                        <div className="space-y-3 md:col-span-2">
                            <label className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Canais</label>
                            <div className="flex flex-wrap gap-3">
                                {CHANNEL_OPTIONS.map(({ value, label, icon: Icon }) => <ChannelButton key={value} active={channels.includes(value)} label={label} icon={<Icon size={16} />} onClick={() => toggleChannel(value)} />)}
                            </div>
                        </div>

                        {channels.includes('whatsapp') && (
                            <div className="space-y-2 md:col-span-2">
                                <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                                    <Smartphone size={14} />
                                    Conexao do WhatsApp
                                </label>
                                <select value={waInstance} onChange={(event) => setWaInstance(event.target.value)} className="h-12 w-full rounded-2xl border border-black/[0.08] bg-white px-4 text-sm text-foreground outline-none transition focus:border-primary/35 dark:border-white/[0.08] dark:bg-white/[0.04]">
                                    <option value="">Selecione uma conexao...</option>
                                    {waInstances.map((instance) => <option key={instance.instance_name} value={instance.instance_name}>{formatInstanceLabel(instance.instance_name)}{instance.agent_name ? ` - ${instance.agent_name}` : ''} ({instance.status})</option>)}
                                </select>
                            </div>
                        )}

                        {channels.includes('email') && (
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Assunto do e-mail</label>
                                <input value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="Ex: Atualizacao importante da Kogna" className="h-12 w-full rounded-2xl border border-black/[0.08] bg-white px-4 text-sm text-foreground outline-none transition focus:border-primary/35 dark:border-white/[0.08] dark:bg-white/[0.04]" />
                            </div>
                        )}

                        {channels.includes('internal') && (
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Titulo interno</label>
                                <input value={notifTitle} onChange={(event) => setNotifTitle(event.target.value)} placeholder="Mensagem da Kogna" className="h-12 w-full rounded-2xl border border-black/[0.08] bg-white px-4 text-sm text-foreground outline-none transition focus:border-primary/35 dark:border-white/[0.08] dark:bg-white/[0.04]" />
                            </div>
                        )}

                        <div className="space-y-3 md:col-span-2">
                            <label className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Mensagem</label>
                            <textarea value={message} onChange={(event) => setMessage(event.target.value)} rows={6} placeholder="Ola {nome}, temos uma novidade para voce..." className="w-full rounded-[24px] border border-black/[0.08] bg-white px-4 py-4 text-sm leading-7 text-foreground outline-none transition focus:border-primary/35 dark:border-white/[0.08] dark:bg-white/[0.04]" />
                            <div className="flex flex-wrap gap-2">
                                {TEMPLATE_VARS.map((variable) => <button key={variable} type="button" onClick={() => insertVar(variable)} className="rounded-full border border-black/[0.08] bg-white px-3 py-1 text-xs font-semibold text-muted-foreground transition hover:border-primary/15 hover:text-primary dark:border-white/[0.08] dark:bg-white/[0.04]">{variable}</button>)}
                            </div>
                        </div>
                    </div>

                    <button type="button" onClick={handleSend} disabled={sending} className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#FF7A1A] via-[#FF6B2D] to-[#FF9A5A] text-sm font-semibold text-white shadow-[0_18px_40px_rgba(245,121,59,0.24)] disabled:opacity-60">
                        {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                        {sending ? 'Enviando...' : 'Enviar agora'}
                    </button>
                </div>
            </Surface>

            <Surface className="p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">Operacao</p>
                <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground">Checklist rapido</h3>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-muted-foreground">
                    <li>Defina a conexao certa para evitar disparos no numero errado.</li>
                    <li>Use filtros por tags quando o envio nao for para toda a base.</li>
                    <li>Teste antes de escalar um novo texto em canais sensiveis como WhatsApp.</li>
                </ul>
            </Surface>
        </div>
    );
}
