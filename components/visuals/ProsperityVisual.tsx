import React from 'react';
import { Zap, GraduationCap, ShieldCheck, TrendingUp } from 'lucide-react';

const ProsperityVisual: React.FC = () => (
    <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-800 mb-6 relative overflow-visible min-h-[200px] flex flex-col">
       <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 relative z-10">
        <span>The Great Coupling (大融合)</span>
      </div>
      
      {/* Background Blueprint Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      <div className="flex-1 flex items-center justify-center relative z-10 px-2 md:px-4">
          {/* Mechanism */}
          <div className="relative w-full max-w-[320px] h-[180px]">
              {/* Connecting Belt/Chain */}
              <svg className="absolute inset-0 w-full h-full overflow-visible">
                  <defs>
                      <pattern id="gearTeeth" x="0" y="0" width="8" height="10" patternUnits="userSpaceOnUse">
                          <rect x="2" y="0" width="4" height="10" fill="#475569" />
                      </pattern>
                  </defs>
                  {/* Belt */}
                  <path d="M40,64 L140,64" stroke="#334155" strokeWidth="4" strokeDasharray="4 4" className="animate-[flow_1s_linear_infinite]" />
                  
                  {/* Connection Lines */}
                  <line x1="40" y1="64" x2="140" y2="30" stroke="#10b981" strokeWidth="2" strokeOpacity="0.3" strokeDasharray="2 2" />
                  <line x1="40" y1="64" x2="140" y2="98" stroke="#a855f7" strokeWidth="2" strokeOpacity="0.3" strokeDasharray="2 2" />
              </svg>

              {/* Gear 1: Tech (Driver) */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-20 h-20">
                   <div className="w-full h-full rounded-full border-[6px] border-dashed border-cyan-500 bg-slate-950 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)] animate-[spin_4s_linear_infinite]">
                        <Zap size={24} className="text-cyan-400" />
                   </div>
                   <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold text-cyan-500 bg-slate-950 px-2 rounded border border-cyan-900">
                       技术引擎
                   </div>
              </div>

              {/* Gear 2: Education (Follower Top) */}
              <div className="absolute right-0 top-1 w-14 h-14">
                   <div className="w-full h-full rounded-full border-[4px] border-dashed border-emerald-500 bg-slate-950 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.2)] animate-[spin_4s_linear_infinite_reverse]">
                        <GraduationCap size={16} className="text-emerald-400" />
                   </div>
                   <div className="absolute left-1/2 top-full mt-1 -translate-x-1/2 text-[9px] font-bold text-emerald-500 bg-slate-950 px-1.5 rounded border border-emerald-900 whitespace-nowrap">
                       技能适配
                   </div>
              </div>

              {/* Gear 3: Welfare (Follower Bottom) */}
              <div className="absolute right-0 bottom-1 w-14 h-14">
                   <div className="w-full h-full rounded-full border-[4px] border-dashed border-purple-500 bg-slate-950 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.2)] animate-[spin_4s_linear_infinite_reverse]">
                        <ShieldCheck size={16} className="text-purple-400" />
                   </div>
                   <div className="absolute left-1/2 top-full mt-1 -translate-x-1/2 text-[9px] font-bold text-purple-500 bg-slate-950 px-1.5 rounded border border-purple-900 whitespace-nowrap">
                       利益分配
                   </div>
              </div>
          </div>
      </div>
      
      <div className="mt-4 flex items-center gap-3 bg-emerald-950/20 border border-emerald-500/20 p-3 rounded-lg">
          <div className="bg-emerald-500/20 p-1.5 rounded-full animate-pulse">
              <TrendingUp size={16} className="text-emerald-400" />
          </div>
          <div className="flex-1">
              <div className="text-[10px] uppercase text-emerald-500/70 font-bold">System Output</div>
              <div className="text-xs text-emerald-100 font-medium">工资与产出同步增长 (Shared Growth)</div>
          </div>
          <div className="text-lg font-black text-emerald-400">
              High
          </div>
      </div>
    </div>
);

export default ProsperityVisual;
