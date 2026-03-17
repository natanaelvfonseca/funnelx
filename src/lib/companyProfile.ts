export interface ObjectionPlaybookItem {
    id: string;
    label: string;
    signals: string[];
    context: string;
    recommended_approach: string;
    allowed_arguments: string[];
    avoid_phrases: string[];
    cta_after_resolution: string;
    priority: number;
    is_active: boolean;
}

export interface CompanyProfileData {
    companyName: string;
    companyProduct: string;
    targetAudience: string;
    customerPain: string;
    customerDesires: string;
    differentiators: string;
    industry: string;
    industryDetail: string;
    channels: string[];
    salesCycle: string;
    revenueGoal: string;
    productPrice: string;
    agentName: string;
    agentObjective: string;
    voiceTone: string;
    unknownBehavior: string;
    humanHandoffPolicy: string;
    restrictions: string;
    buyingSignals: string;
    qualificationCriteria: string;
    objectionHandling: string;
    idealNextStep: string;
    agendaPolicy: string;
    advancedInstructions: string;
    responsePlaybook: Record<string, unknown> | null;
    qualificationStrategy: Record<string, unknown> | null;
    offerStrategy: Record<string, unknown> | null;
    handoffStrategy: Record<string, unknown> | null;
    objectionPlaybook: ObjectionPlaybookItem[];
    improvementFeedback: Array<{ id?: string; category?: string; detail?: string; created_at?: string }>;
    testTranscript: Array<{ role?: string; text?: string; created_at?: string }>;
    playbookVersion: string | null;
    lastPlaybookGeneratedAt: string | null;
}

export const EMPTY_COMPANY_PROFILE: CompanyProfileData = {
    companyName: '',
    companyProduct: '',
    targetAudience: '',
    customerPain: '',
    customerDesires: '',
    differentiators: '',
    industry: '',
    industryDetail: '',
    channels: [],
    salesCycle: '',
    revenueGoal: '',
    productPrice: '',
    agentName: '',
    agentObjective: '',
    voiceTone: '',
    unknownBehavior: '',
    humanHandoffPolicy: '',
    restrictions: '',
    buyingSignals: '',
    qualificationCriteria: '',
    objectionHandling: '',
    idealNextStep: '',
    agendaPolicy: '',
    advancedInstructions: '',
    responsePlaybook: null,
    qualificationStrategy: null,
    offerStrategy: null,
    handoffStrategy: null,
    objectionPlaybook: [],
    improvementFeedback: [],
    testTranscript: [],
    playbookVersion: null,
    lastPlaybookGeneratedAt: null,
};

export function createEmptyObjection(): ObjectionPlaybookItem {
    return {
        id: `obj_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        label: '',
        signals: [],
        context: '',
        recommended_approach: '',
        allowed_arguments: [],
        avoid_phrases: [],
        cta_after_resolution: '',
        priority: 1,
        is_active: true,
    };
}

export function parseListInput(value: string): string[] {
    return [...new Set(
        value
            .split(/\r?\n|,|;/)
            .map((item) => item.trim())
            .filter(Boolean)
    )];
}

export function serializeListInput(values: string[] | undefined): string {
    return (values || []).join(', ');
}
