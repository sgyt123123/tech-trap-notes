import React from 'react';
import { Zap, Scale, TrendingUp } from 'lucide-react';

const TechShockVisual: React.FC = () => (
  <div className="bg-slate-900/50 rounded-xl border border-slate-800 mb-4 p-4 lg:p-5 relative overflow-visible group">
    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 z-10 relative">
      The Fork in the Road
    </div>
    
    <div className="w-full h-[200px] md:h-[230px] lg:h-[250px]">
        <svg className="w-full h-full overflow-visible" preserveAspectRatio="xMidYMid meet" viewBox="0 0 300 280">
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
            <foreignObject x="100" y="25" width="100" height="40">
                <div className="flex justify-center">
                    <div className="bg-slate-950 text-cyan-400 px-3 py-1.5 rounded-full border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)] font-bold text-[10px] flex items-center gap-2 z-20">
                        <Zap size={12} className="fill-current"/> 新技术引入
                    </div>
                </div>
            </foreignObject>

            {/* Left Node: Replacing */}
            <foreignObject x="20" y="155" width="120" height="120">
                 <div className="bg-slate-950/80 border border-red-500/30 rounded-xl p-3 flex flex-col items-center text-center shadow-lg backdrop-blur-sm">
                     <div className="p-1.5 bg-red-500/10 rounded-lg mb-2 text-red-400"><Scale size={14} /></div>
                     <h4 className="text-red-400 font-bold text-[10px] mb-1">替代型 (Replacing)</h4>
                     <div className="text-[9px] text-slate-400 leading-tight mb-2">机器取代人类</div>
                     
                     {/* Lower Progress Bar for Contrast */}
                     <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
                         <div className="bg-red-500 h-full w-[25%]"></div>
                     </div>
                     <span className="text-[8px] text-red-400/70 mt-1 font-mono">需求 ↓↓↓</span>
                </div>
            </foreignObject>

            {/* Right Node: Enabling */}
            <foreignObject x="160" y="155" width="120" height="120">
                 <div className="bg-slate-950/80 border border-emerald-500/30 rounded-xl p-3 flex flex-col items-center text-center shadow-lg backdrop-blur-sm">
                     <div className="p-1.5 bg-emerald-500/10 rounded-lg mb-2 text-emerald-400"><TrendingUp size={14} /></div>
                     <h4 className="text-emerald-400 font-bold text-[10px] mb-1">赋能型 (Enabling)</h4>
                     <div className="text-[9px] text-slate-400 leading-tight mb-2">机器辅助人类</div>
                     
                     {/* Higher Progress Bar for Contrast */}
                     <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
                         <div className="bg-emerald-500 h-full w-[95%] shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                     </div>
                     <span className="text-[8px] text-emerald-400/70 mt-1 font-mono">需求 ↑↑↑</span>
                </div>
            </foreignObject>
        </svg>
    </div>
  </div>
);

export default TechShockVisual;
