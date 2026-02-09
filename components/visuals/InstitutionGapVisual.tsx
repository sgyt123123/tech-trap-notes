import React from 'react';
import { AlertTriangle, Zap, Clock } from 'lucide-react';

const InstitutionGapVisual: React.FC = () => (
  <div className="bg-slate-900/50 rounded-xl p-4 lg:p-5 border border-slate-800 mb-4 group relative overflow-visible">
    <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">
      <span>Velocity Mismatch</span>
    </div>
    
    <div className="relative flex flex-col gap-8 py-1 min-h-[170px] md:min-h-[190px] lg:min-h-[210px]">
        {/* Tech Row */}
        <div className="relative z-10">
            <div className="flex justify-between text-[10px] text-cyan-400 mb-2 font-bold">
                <span className="flex items-center gap-1.5"><Zap size={12} /> 技术迭代 (Tech)</span>
                <span className="font-mono opacity-70">Exponential</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-900 via-cyan-400 to-cyan-900 w-[100%]"></div>
            </div>
        </div>

        {/* Dimension Line for Gap */}
        <div className="absolute top-[28px] bottom-[28px] left-0 right-0 pointer-events-none">
             {/* Dashed drop lines */}
             <div className="absolute left-[20%] top-0 bottom-0 w-px border-l border-dashed border-red-500/30"></div>
             <div className="absolute right-0 top-0 bottom-0 w-px border-r border-dashed border-red-500/30"></div>
             
             {/* Horizontal Dimension Line */}
             <div className="absolute top-1/2 -translate-y-1/2 left-[20%] right-0 flex items-center justify-center">
                 <div className="h-px w-full bg-red-500/30 relative flex items-center justify-center">
                     <div className="absolute left-0 w-1 h-1 bg-red-500 rounded-full -translate-x-1/2"></div>
                     <div className="absolute right-0 w-1 h-1 bg-red-500 rounded-full translate-x-1/2"></div>
                     
                     {/* Label avoiding overlap */}
                     <div className="bg-slate-950 px-3 py-1 rounded-full border border-red-500/30 text-red-400 text-[10px] font-bold shadow-sm z-10 flex items-center gap-1">
                        <AlertTriangle size={10} />
                        Δ GAP: 焦虑与动荡
                     </div>
                 </div>
             </div>
        </div>

        {/* Institution Row */}
        <div className="relative z-10">
            <div className="flex justify-between text-[10px] text-amber-400 mb-2 font-bold">
                <span className="flex items-center gap-1.5"><Clock size={12} /> 制度演变 (Institution)</span>
                <span className="font-mono opacity-70">Linear</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="w-[20%] h-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
            </div>
        </div>
    </div>
  </div>
);

export default InstitutionGapVisual;
