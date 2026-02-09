import React from 'react';
import { Ban, Factory, Users, Activity } from 'lucide-react';

const FordParadoxVisual: React.FC = () => (
    <div className="bg-slate-900/50 rounded-xl p-4 lg:p-5 border border-slate-800 mb-4 w-full">
         <div className="flex items-center justify-between mb-6">
             <h4 className="text-red-400 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                <Ban size={16} /> The Broken Circuit (经济短路)
             </h4>
         </div>
         
         {/* Responsive Visual Canvas */}
         <div className="w-full h-[280px] md:h-[340px] lg:h-[420px] relative z-10 bg-slate-950/50 rounded-xl border border-red-500/10 overflow-visible">
          {/* Background Grid */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#ef4444 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
          </div>

          <svg className="w-full h-full overflow-visible" viewBox="0 0 360 500">
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
             <foreignObject x="310" y="180" width="40" height="140">
                <div className="h-full flex items-center justify-center">
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-950/80 py-3 px-1.5 rounded border border-slate-800 shadow-lg" style={{ writingMode: 'vertical-rl', textOrientation: 'upright', letterSpacing: '4px' }}>
                        消费回流断裂
                    </span>
                </div>
             </foreignObject>

             {/* Left Arc (Wages - The Blocked Artery) */}
             {/* Control point constrained to 20 to leave 20px safety margin on left */}
             <path d="M180,90 Q20,250 180,410" fill="none" stroke="#7f1d1d" strokeWidth="6" className="opacity-50" />
             <path d="M180,90 Q20,250 180,410" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="8 12" className="animate-[flow_3s_linear_infinite]" />
             
             {/* Left Label - Horizontal - Positioned safely (x=10) */}
             <foreignObject x="10" y="110" width="120" height="40">
                <div className="text-[10px] font-bold text-red-400 bg-slate-950/90 px-2 py-1.5 rounded border border-red-900/40 shadow-xl text-center backdrop-blur-sm">
                    工资分配
                </div>
             </foreignObject>

             {/* Top Node: Production (Rich) */}
             <foreignObject x="100" y="10" width="160" height="100">
                 <div className="flex flex-col items-center">
                     <div className="w-14 h-14 bg-slate-900 rounded-2xl border-2 border-cyan-500 flex items-center justify-center text-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.3)] z-10 relative">
                         <Factory size={28} />
                         <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
                     </div>
                     <span className="text-sm font-black text-white mt-2 bg-slate-950 px-3 py-0.5 rounded border border-slate-800 whitespace-nowrap">生产/资本 (AI)</span>
                     <span className="text-[10px] text-cyan-500 font-mono mt-0.5 font-bold">产出爆炸 (High Output)</span>
                 </div>
             </foreignObject>

             {/* Bottom Node: Consumer (Poor) */}
             <foreignObject x="100" y="400" width="160" height="100">
                 <div className="flex flex-col items-center opacity-90">
                     <div className="w-14 h-14 bg-slate-900 rounded-2xl border-2 border-slate-600 flex items-center justify-center text-slate-400 z-10 shadow-lg">
                         <Users size={28} />
                     </div>
                     <span className="text-sm font-black text-slate-300 mt-2 bg-slate-950 px-3 py-0.5 rounded border border-slate-800 whitespace-nowrap">大众/消费者</span>
                     <span className="text-[10px] text-red-500 font-mono mt-0.5 font-bold">购买力枯竭 (No Money)</span>
                 </div>
             </foreignObject>

             {/* The Blockage - Lowered to Y=230 to stagger from "Wage Distribution" label, widened to avoid clipping */}
             <foreignObject x="0" y="230" width="160" height="120">
                 <div className="flex flex-col items-center justify-center w-full h-full z-20 group">
                     {/* Icon */}
                     <div className="bg-red-950 text-red-500 rounded-full p-2.5 border-2 border-red-500 mb-2 shadow-[0_0_20px_rgba(239,68,68,0.6)] animate-pulse relative z-10">
                        <Activity size={24} />
                     </div>
                     {/* Label Box */}
                     <div className="bg-slate-950 border border-red-500 rounded px-2 py-1.5 text-center shadow-2xl relative z-30 min-w-[100px]">
                        <span className="block text-[10px] text-red-400 font-black leading-tight whitespace-nowrap">
                            制度性血栓<br/>(Blockage)
                        </span>
                     </div>
                 </div>
             </foreignObject>

             {/* Core Equation Label - Absolute Center */}
             <foreignObject x="80" y="220" width="200" height="80">
                <div className="flex items-center justify-center h-full">
                    <div className="flex flex-col items-center bg-slate-950 border-2 border-slate-700 px-4 py-3 rounded-xl shadow-2xl z-10 relative">
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-slate-800/50 blur-xl rounded-full -z-10"></div>
                        <span className="text-[10px] text-slate-500 font-mono mb-2 uppercase tracking-[0.2em] border-b border-slate-800 pb-1">The Paradox</span>
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
