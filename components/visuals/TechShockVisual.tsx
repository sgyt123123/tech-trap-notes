import React from 'react';
import { Zap, Scale, TrendingUp } from 'lucide-react';

const TechShockVisual: React.FC = () => (
  <div className="bg-slate-900/70 rounded-xl border border-slate-600/80 mb-4 p-4 lg:p-5 relative overflow-visible group">
    <div className="text-xs font-bold text-slate-200 tracking-[0.16em] mb-4 z-10 relative">
      技术分岔路径
    </div>
    
    <div className="w-full h-[250px] md:h-[280px] lg:h-[310px]">
        <svg className="w-full h-full overflow-visible" preserveAspectRatio="xMidYMid meet" viewBox="-16 -8 336 300">
            <defs>
                <marker id="arrow-red" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                    <polygon points="0 0, 6 2, 0 4" fill="#f87171" />
                </marker>
                 <marker id="arrow-green" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                    <polygon points="0 0, 6 2, 0 4" fill="#34d399" />
                </marker>
            </defs>

            {/* Paths */}
            {/* Source (150, 40) to Replacing (80, 160) */}
            <path d="M150,65 C150,110 80,110 80,150" fill="none" stroke="#f87171" strokeWidth="2" strokeDasharray="4 3" className="animate-[flow_2s_linear_infinite]" markerEnd="url(#arrow-red)" />
            
            {/* Source (150, 40) to Enabling (220, 160) */}
            <path d="M150,65 C150,110 220,110 220,150" fill="none" stroke="#34d399" strokeWidth="2" className="animate-[flow_2s_linear_infinite]" markerEnd="url(#arrow-green)" />

            {/* Top Node: Technology */}
            <foreignObject x="78" y="20" width="144" height="48">
                <div className="flex justify-center">
                    <div className="bg-slate-950 text-cyan-300 px-3 py-1.5 rounded-full border border-cyan-400/60 shadow-[0_0_15px_rgba(6,182,212,0.2)] font-bold text-[11px] flex items-center gap-2 z-20">
                        <Zap size={13} className="fill-current"/> 新技术引入
                    </div>
                </div>
            </foreignObject>

            {/* Left Node: Replacing */}
            <foreignObject x="10" y="150" width="132" height="126">
                 <div className="bg-slate-950/85 border border-red-400/40 rounded-xl p-3 flex flex-col items-center text-center shadow-lg backdrop-blur-sm">
                     <div className="p-1.5 bg-red-500/10 rounded-lg mb-2 text-red-300"><Scale size={15} /></div>
                     <h4 className="text-red-300 font-bold text-[11px] mb-1">替代型</h4>
                     <div className="text-[10px] text-slate-200 leading-tight mb-2">机器取代人类</div>
                     
                     {/* Lower Progress Bar for Contrast */}
                     <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
                         <div className="bg-red-500 h-full w-[25%]"></div>
                     </div>
                     <span className="text-[10px] text-red-300/90 mt-1 font-mono">需求 ↓↓↓</span>
                </div>
            </foreignObject>

            {/* Right Node: Enabling */}
            <foreignObject x="178" y="150" width="132" height="126">
                 <div className="bg-slate-950/85 border border-emerald-400/40 rounded-xl p-3 flex flex-col items-center text-center shadow-lg backdrop-blur-sm">
                     <div className="p-1.5 bg-emerald-500/10 rounded-lg mb-2 text-emerald-300"><TrendingUp size={15} /></div>
                     <h4 className="text-emerald-300 font-bold text-[11px] mb-1">赋能型</h4>
                     <div className="text-[10px] text-slate-200 leading-tight mb-2">机器辅助人类</div>
                     
                     {/* Higher Progress Bar for Contrast */}
                     <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
                         <div className="bg-emerald-500 h-full w-[95%] shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                     </div>
                     <span className="text-[10px] text-emerald-300/90 mt-1 font-mono">需求 ↑↑↑</span>
                </div>
            </foreignObject>
        </svg>
    </div>
  </div>
);

export default TechShockVisual;
