import React from 'react';
import { Ban, Factory, Users, Activity } from 'lucide-react';

const FordParadoxVisual: React.FC = () => (
    <div className="bg-slate-900/70 rounded-xl p-4 lg:p-5 border border-slate-600/80 mb-4 w-full">
         <div className="flex items-center justify-between mb-6">
             <h4 className="text-red-300 font-bold text-sm tracking-[0.16em] flex items-center gap-2">
                <Ban size={16} /> 经济短路
             </h4>
         </div>
         
         {/* Responsive Visual Canvas */}
         <div className="w-full h-[360px] md:h-[440px] lg:h-[520px] relative z-10 bg-slate-950/60 rounded-xl border border-red-400/20 overflow-visible">
          {/* Background Grid */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#ef4444 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
          </div>

          <svg className="w-full h-full overflow-visible" viewBox="-10 -10 380 520" preserveAspectRatio="xMidYMid meet">
             <defs>
                 <linearGradient id="bloodFlow" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="0%" stopColor="#ef4444" />
                     <stop offset="100%" stopColor="#991b1b" />
                 </linearGradient>
             </defs>

             {/* === CENTER AXIS: X = 180 === */}
             
             {/* Right Arc (Consumption - Withering) */}
             {/* Control point constrained to 340 to leave 20px safety margin on right */}
             <path d="M180,410 Q340,250 180,90" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="6 6" className="opacity-40" />
             
             {/* Right Label: Vertical Layout - Positioned in safety margin (x=310) */}
             <foreignObject x="304" y="174" width="52" height="152">
                <div className="h-full flex items-center justify-center">
                    <span className="text-[11px] font-bold text-slate-200 bg-slate-950/90 py-3 px-1.5 rounded border border-slate-600/80 shadow-lg" style={{ writingMode: 'vertical-rl', textOrientation: 'upright', letterSpacing: '3px' }}>
                        消费回流断裂
                    </span>
                </div>
             </foreignObject>

             {/* Left Arc (Wages - The Blocked Artery) */}
             {/* Control point constrained to 20 to leave 20px safety margin on left */}
             <path d="M180,90 Q20,250 180,410" fill="none" stroke="#7f1d1d" strokeWidth="6" className="opacity-50" />
             <path d="M180,90 Q20,250 180,410" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="8 12" className="animate-[flow_3s_linear_infinite]" />
             
             {/* Left Label - Horizontal - Positioned safely (x=10) */}
             <foreignObject x="6" y="106" width="132" height="44">
                <div className="text-[11px] font-bold text-red-300 bg-slate-950/90 px-2 py-1.5 rounded border border-red-800/50 shadow-xl text-center backdrop-blur-sm">
                    工资分配
                </div>
             </foreignObject>

             {/* Top Node: Production (Rich) */}
             <foreignObject x="96" y="6" width="168" height="108">
                 <div className="flex flex-col items-center">
                     <div className="w-14 h-14 bg-slate-900 rounded-2xl border-2 border-cyan-500 flex items-center justify-center text-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.3)] z-10 relative">
                         <Factory size={28} />
                         <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
                     </div>
                     <span className="text-sm font-black text-white mt-2 bg-slate-950 px-3 py-0.5 rounded border border-slate-800 whitespace-nowrap">生产/资本中枢</span>
                     <span className="text-[11px] text-cyan-300 font-mono mt-0.5 font-bold">产出爆炸</span>
                 </div>
             </foreignObject>

             {/* Bottom Node: Consumer (Poor) */}
             <foreignObject x="96" y="392" width="168" height="112">
                 <div className="flex flex-col items-center opacity-90">
                     <div className="w-14 h-14 bg-slate-900 rounded-2xl border-2 border-slate-600 flex items-center justify-center text-slate-400 z-10 shadow-lg">
                         <Users size={28} />
                     </div>
                     <span className="text-sm font-black text-slate-100 mt-2 bg-slate-950 px-3 py-0.5 rounded border border-slate-700 whitespace-nowrap">大众/消费者</span>
                     <span className="text-[11px] text-red-300 font-mono mt-0.5 font-bold">购买力枯竭</span>
                 </div>
             </foreignObject>

             {/* The Blockage - Lowered to Y=230 to stagger from "Wage Distribution" label, widened to avoid clipping */}
             <foreignObject x="-4" y="224" width="170" height="128">
                 <div className="flex flex-col items-center justify-center w-full h-full z-20 group">
                     {/* Icon */}
                     <div className="bg-red-950 text-red-500 rounded-full p-2.5 border-2 border-red-500 mb-2 shadow-[0_0_20px_rgba(239,68,68,0.6)] animate-pulse relative z-10">
                        <Activity size={24} />
                     </div>
                     {/* Label Box */}
                     <div className="bg-slate-950 border border-red-400 rounded px-2 py-1.5 text-center shadow-2xl relative z-30 min-w-[100px]">
                        <span className="block text-[11px] text-red-300 font-black leading-tight whitespace-nowrap">
                            制度性血栓
                        </span>
                     </div>
                 </div>
             </foreignObject>

             {/* Core Equation Label - Absolute Center */}
             <foreignObject x="74" y="214" width="212" height="92">
                <div className="flex items-center justify-center h-full">
                    <div className="flex flex-col items-center bg-slate-950 border-2 border-slate-700 px-4 py-3 rounded-xl shadow-2xl z-10 relative">
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-slate-800/50 blur-xl rounded-full -z-10"></div>
                        <span className="text-[11px] text-slate-300 font-mono mb-2 tracking-[0.2em] border-b border-slate-700 pb-1">福特悖论</span>
                        <div className="text-sm text-white font-black text-center leading-snug">
                            消灭生产者 <span className="text-red-500 mx-1">=</span><br/>消灭消费者
                        </div>
                    </div>
                </div>
             </foreignObject>

          </svg>
      </div>
    </div>
);

export default FordParadoxVisual;
