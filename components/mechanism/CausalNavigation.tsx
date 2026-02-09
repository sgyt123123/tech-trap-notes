import React from 'react';
import { ArrowDownRight, Share2 } from 'lucide-react';
import { TRAP_LOGIC_MAP } from '../../constants';
import { Button } from '@/components/ui/button';

interface CausalNavigationProps {
    nodeId: string;
    onNavigate: (id: string) => void;
}

const CausalNavigation: React.FC<CausalNavigationProps> = ({ nodeId, onNavigate }) => {
    // Find Incoming (Sources) and Outgoing (Targets)
    const incoming = TRAP_LOGIC_MAP.links.filter(l => l.target === nodeId);
    const outgoing = TRAP_LOGIC_MAP.links.filter(l => l.source === nodeId);
    
    // Helper to get node name
    const getName = (id: string) => TRAP_LOGIC_MAP.nodes.find(n => n.id === id)?.label || id;

    if (incoming.length === 0 && outgoing.length === 0) return null;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-700">
            {/* Incoming / Upstream */}
            <div className="flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-widest text-slate-200 font-bold flex items-center gap-1">
                    <ArrowDownRight size={13} className="rotate-180" /> Upstream (前因)
                </span>
                {incoming.length > 0 ? (
                    incoming.map((link, idx) => (
                        <Button
                            key={`${link.source}-${link.target}-${idx}`}
                            type="button"
                            variant="ghost"
                            onClick={() => onNavigate(link.source)}
                            className="h-auto w-full justify-start text-left text-sm p-2.5 rounded bg-slate-900/60 border border-slate-600/80 hover:border-cyan-400/50 hover:bg-slate-900 transition-all text-slate-100 hover:text-cyan-200 group whitespace-normal"
                            aria-label={`跳转到前因节点 ${getName(link.source)}`}
                        >
                            <span className="block text-[10px] opacity-80 mb-0.5 uppercase">{link.label || 'Caused by'}</span>
                            <span className="font-bold flex items-center gap-1">
                                <Share2 size={12} className="rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" /> 
                                {getName(link.source)}
                            </span>
                        </Button>
                    ))
                ) : (
                    <span className="text-sm text-slate-300 italic">No upstream causes.</span>
                )}
            </div>

            {/* Outgoing / Downstream */}
             <div className="flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-widest text-slate-200 font-bold flex items-center gap-1 justify-end">
                    Downstream (后果) <ArrowDownRight size={13} />
                </span>
                {outgoing.length > 0 ? (
                    outgoing.map((link, idx) => (
                        <Button
                            key={`${link.source}-${link.target}-${idx}`}
                            type="button"
                            variant="ghost"
                            onClick={() => onNavigate(link.target)}
                            className="h-auto w-full justify-end text-right text-sm p-2.5 rounded bg-slate-900/60 border border-slate-600/80 hover:border-cyan-400/50 hover:bg-slate-900 transition-all text-slate-100 hover:text-cyan-200 group whitespace-normal"
                            aria-label={`跳转到后果节点 ${getName(link.target)}`}
                        >
                             <span className="block text-[10px] opacity-80 mb-0.5 uppercase">{link.label || 'Leads to'}</span>
                             <span className="font-bold flex items-center justify-end gap-1">
                                {getName(link.target)}
                                <Share2 size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" /> 
                            </span>
                        </Button>
                    ))
                ) : (
                     <span className="text-sm text-slate-300 italic text-right">End of chain.</span>
                )}
            </div>
        </div>
    )
}

export default CausalNavigation;
