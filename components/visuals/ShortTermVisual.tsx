import React from 'react';

const ShortTermVisual: React.FC = () => (
  <div className="bg-slate-900/50 rounded-xl p-4 lg:p-5 border border-slate-800 mb-4 relative overflow-visible group">
    <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 z-10 relative">
      <span>The Decoupling (大分流)</span>
    </div>
    
    <div className="h-[160px] md:h-[180px] lg:h-[200px] w-full relative mt-1 z-10">
        <svg className="w-full h-full overflow-visible" preserveAspectRatio="xMidYMid meet" viewBox="0 0 300 120">
            <defs>
                <pattern id="painZone" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="6" stroke="#f87171" strokeWidth="2" opacity="0.2" />
                </pattern>
            </defs>

            {/* Grid */}
            <line x1="0" y1="120" x2="300" y2="120" stroke="#334155" strokeWidth="1" />
            <line x1="0" y1="0" x2="0" y2="120" stroke="#334155" strokeWidth="1" />

            {/* The Gap Area */}
            <path d="M0,110 Q100,100 280,10 L280,90 Q150,105 0,110 Z" fill="url(#painZone)" />

            {/* Productivity Curve */}
            <path d="M0,110 Q100,100 280,10" fill="none" stroke="#22d3ee" strokeWidth="3" />
            <circle cx="280" cy="10" r="3" fill="#22d3ee" />
            <text x="285" y="15" fill="#22d3ee" fontSize="10" fontWeight="bold">产出</text>
            
            {/* Wages Curve */}
            <path d="M0,110 Q150,105 280,90" fill="none" stroke="#94a3b8" strokeWidth="3" strokeDasharray="6 4" />
            <circle cx="280" cy="90" r="3" fill="#94a3b8" />
            <text x="285" y="95" fill="#94a3b8" fontSize="10" fontWeight="bold">工资</text>

            {/* Annotations */}
            <g transform="translate(140, 60)">
                <rect x="-45" y="-12" width="90" height="24" rx="4" fill="#0f172a" stroke="#f87171" strokeWidth="1" className="shadow-lg" />
                <text x="0" y="4" textAnchor="middle" fill="#f87171" fontSize="11" fontWeight="bold">痛苦区间</text>
            </g>
        </svg>
    </div>
    
    <div className="mt-3 flex justify-between text-[10px] text-slate-500 font-mono border-t border-slate-800/50 pt-2">
        <span>Start</span>
        <span className="text-red-400">~40 Years Lag</span>
        <span>Future</span>
    </div>
  </div>
);

export default ShortTermVisual;
