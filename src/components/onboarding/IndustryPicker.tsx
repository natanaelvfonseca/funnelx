import { Check } from 'lucide-react';
import { industryProfiles, type IndustryProfile } from '../../data/industryProfiles';

interface IndustryPickerProps {
    selected: string | null;
    onSelect: (slug: string) => void;
}

export function IndustryPicker({ selected, onSelect }: IndustryPickerProps) {
    return (
        <div className="space-y-4">
            <div className="text-center mb-2">
                <h3 className="text-xl font-bold text-foreground">Seu negócio pertence a algum desses setores?</h3>
                <p className="text-sm text-muted-foreground mt-1">
                    Vamos pré-configurar agentes, funil e objeções otimizados para o seu mercado.
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {industryProfiles.map((profile: IndustryProfile) => {
                    const isSelected = selected === profile.slug;
                    const isGeneric = profile.slug === 'generico';
                    return (
                        <button
                            key={profile.slug}
                            type="button"
                            onClick={() => onSelect(profile.slug)}
                            className={`
                                relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 text-center
                                ${isSelected
                                    ? 'border-primary bg-primary/5 shadow-md shadow-primary/10 scale-[1.02]'
                                    : isGeneric
                                        ? 'border-dashed border-border hover:border-primary/40 hover:bg-muted/30'
                                        : 'border-border hover:border-primary/40 hover:bg-muted/30'
                                }
                            `}
                        >
                            {isSelected && (
                                <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center animate-in zoom-in duration-200">
                                    <Check size={11} className="text-white" />
                                </div>
                            )}
                            <span className="text-2xl">{profile.icon}</span>
                            <span className={`text-xs font-semibold leading-tight ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                                {profile.name}
                            </span>
                        </button>
                    );
                })}
            </div>

            {selected && selected !== 'generico' && (
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 animate-in fade-in duration-300">
                    {(() => {
                        const profile = industryProfiles.find(p => p.slug === selected);
                        if (!profile) return null;
                        return (
                            <div className="space-y-2">
                                <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                                    {profile.icon} Perfil selecionado: {profile.name}
                                </p>
                                <p className="text-xs text-muted-foreground">{profile.description}</p>
                                {profile.defaultPipeline.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {profile.defaultPipeline.map((stage, i) => (
                                            <span key={i} className="text-[10px] bg-background border border-border rounded-full px-2 py-0.5 text-muted-foreground">
                                                {stage}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })()}
                </div>
            )}
        </div>
    );
}
