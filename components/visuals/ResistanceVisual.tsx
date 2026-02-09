import React from 'react';
import { Hammer, Flame } from 'lucide-react';

const ResistanceVisual: React.FC = () => (
    <div className="bg-slate-900/70 rounded-xl p-4 lg:p-5 border border-slate-600/80 mb-4 flex flex-col items-center relative overflow-visible group">
      <div className="w-full flex justify-between items-center text-xs font-bold text-slate-200 uppercase tracking-widest mb-4 z-10">
        <span>THE BREAKING POINT (阈值突破)</span>
      </div>
      
      {/* SVG Visual Area */}
      <div className="w-full h-[300px] md:h-[350px] lg:h-[395px] relative z-10">
          <svg className="w-full h-full overflow-visible" viewBox="-16 -24 332 350" preserveAspectRatio="xMidYMid meet">
             <defs>
                 <linearGradient id="pressureGrad" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="0%" stopColor="#ef4444" />
                     <stop offset="100%" stopColor="#7f1d1d" />
                 </linearGradient>
                 <filter id="glow-red">
                     <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                     <feMerge>
                         <feMergeNode in="coloredBlur"/>
                         <feMergeNode in="SourceGraphic"/>
                     </feMerge>
                 </filter>
             </defs>

             {/* 1. Hammer Icon (The Trigger) - Top Center */}
             <foreignObject x="70" y="-14" width="160" height="128">
                <div className="flex flex-col items-center animate-in zoom-in duration-700">
                    <div className="bg-red-500/10 p-3 rounded-full border border-red-500/50 shadow-[0_0_25px_rgba(239,68,68,0.4)] mb-2 relative group">
                         <Hammer size={28} className="text-red-500 relative z-10" />
                    </div>
                    <div className="bg-slate-950/90 border border-red-900/60 px-3 py-1 rounded text-center backdrop-blur-sm">
                        <div className="text-red-300 font-black text-[13px] uppercase tracking-wider leading-tight">卢德式反抗</div>
                        <div className="text-[11px] text-red-300/80 font-mono leading-tight">Rational Riots</div>
                    </div>
                </div>
             </foreignObject>

             {/* Dotted Line from Hammer to Fulcrum Crack */}
             <path d="M150,90 L150,150" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 3" opacity="0.6" />

             {/* 2. The Scale System */}
             {/* Fulcrum Base */}
             <path d="M135,190 L165,190 L150,160 Z" fill="#475569" />
             <rect x="110" y="190" width="80" height="4" fill="#1e293b" rx="2" />

             {/* Main Beam (Tilted - Left Down) - Rotated -15deg around (150,160) */}
             <g transform="rotate(-15, 150, 160)">
                 {/* Beam */}
                 <rect x="30" y="155" width="240" height="10" rx="4" fill="#475569" />
                 {/* Hanging Points relative to beam */}
                 <circle cx="50" cy="160" r="3" fill="#94a3b8" />
                 <circle cx="250" cy="160" r="3" fill="#94a3b8" />
             </g>

             {/* The Crack at Fulcrum */}
             <g transform="translate(150, 160) rotate(-15)">
                 <path d="M-2,-8 L2,8" stroke="#ef4444" strokeWidth="3" className="animate-pulse" />
                 <circle cx="0" cy="0" r="12" fill="#ef4444" fillOpacity="0.25" filter="url(#glow-red)" />
             </g>

             {/* 3. Left Weight (Pressure) - Heavy/Down */}
             {/* Coords for (50,160) rotated -15deg around (150,160) -> (53.4, 185.9) */}
             <line x1="53.4" y1="186" x2="53.4" y2="230" stroke="#94a3b8" strokeWidth="2" />
             <g transform="translate(23.4, 230)">
                <rect width="60" height="50" rx="4" fill="url(#pressureGrad)" stroke="#ef4444" strokeWidth="2" filter="url(#glow-red)" />
                <text x="30" y="25" textAnchor="middle" fill="#fee2e2" fontSize="13" fontWeight="black" dominantBaseline="middle">生存压力</text>
             </g>

             {/* 4. Right Weight (Support) - Light/Up */}
             {/* Coords for (250,160) rotated -15deg around (150,160) -> (246.6, 134.1) */}
             <line x1="246.6" y1="134" x2="246.6" y2="170" stroke="#64748b" strokeWidth="1" strokeDasharray="4 2" />
             <g transform="translate(226.6, 170)">
                 <path d="M0,0 L40,0 L30,40 L20,50 L10,40 Z" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" opacity="0.8" />
                 <text x="20" y="25" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontWeight="bold">制度缓冲</text>
             </g>

          </svg>
      </div>

      {/* Equation Panel */}
      <div className="w-full max-w-[95%] bg-slate-950/85 p-3 rounded-xl border border-slate-600/80 shadow-xl backdrop-blur-md flex flex-wrap items-center justify-center gap-3 relative z-20 mt-2">
             <div className="flex flex-col items-center">
                 <span className="text-[10px] text-red-300 font-bold uppercase tracking-wider mb-0.5">PRESSURE</span>
                 <span className="text-xl font-black text-red-500 leading-none">P</span>
             </div>
             
             <div className="text-slate-600 font-black text-xl animate-pulse">≫</div>
             
             <div className="flex flex-col items-center opacity-60">
                 <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider mb-0.5">SUPPORT</span>
                 <span className="text-xl font-black text-slate-200 leading-none">S</span>
             </div>
             
             <div className="h-8 w-px bg-slate-800 mx-2 hidden sm:block"></div>
             
             <div className="bg-red-900/30 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 border border-red-500/30 group-hover:bg-red-900/50 transition-colors">
                 <Flame size={16} className="text-red-500 fill-red-500/50 animate-pulse" />
                 <span className="text-base font-black text-white uppercase tracking-widest">REBELLION</span>
             </div>
      </div>
      
      <p className="text-[11px] text-slate-200 italic text-center max-w-[90%] mt-4">
          "当合法生存途径被堵死，破坏机器就成了理性的谈判手段。"
      </p>
    </div>
);

export default ResistanceVisual;
