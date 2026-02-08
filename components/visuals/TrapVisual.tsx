import React from 'react';
import { Repeat } from 'lucide-react';

const TrapVisual: React.FC = () => (
    <div className="bg-slate-900/50 rounded-xl p-4 lg:p-5 border border-slate-800 mb-4 w-full">
      <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-widest mb-5">
        <span>System Failure: The Stagnation Cycle</span>
      </div>

      {/* Ancient Trap: The Triangle of Stagnation */}
      <div className="relative">
         <div className="flex items-center justify-between mb-4 px-2">
            <h4 className="text-amber-500 font-bold text-sm flex items-center gap-2">
                <Repeat size={16} /> 罗马式停滞 (Stagnation Trap)
            </h4>
         </div>
         
         <div className="w-full min-h-[180px] aspect-[18/13] max-h-[240px] lg:max-h-[260px] relative bg-amber-950/10 rounded-xl border border-amber-900/20 px-2 py-1">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 360 260" preserveAspectRatio="xMidYMid meet">
                <defs>
                    <marker id="arrow-amber" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                        <polygon points="0 0, 6 2, 0 4" fill="#d97706" />
                    </marker>
                </defs>

                <path d="M180,36 L300,206 L60,206 Z" fill="none" stroke="#78350f" strokeWidth="1" strokeDasharray="4 4" />
                <path d="M180,36 L300,206 L60,206 Z" fill="none" stroke="#d97706" strokeWidth="2" strokeDasharray="8 8" className="animate-[flow_6s_linear_infinite]" />

                <g>
                    <rect x="118" y="6" width="124" height="54" rx="8" fill="#020617" stroke="#d97706" strokeOpacity="0.55" />
                    <text x="180" y="28" textAnchor="middle" fontSize="12" fontWeight="700" fill="#f59e0b">劳动力廉价</text>
                    <text x="180" y="47" textAnchor="middle" fontSize="10" fill="#94a3b8">奴隶制 / 低工资</text>
                </g>

                <g>
                    <rect x="18" y="182" width="120" height="58" rx="8" fill="#020617" stroke="#d97706" strokeOpacity="0.55" />
                    <text x="78" y="204" textAnchor="middle" fontSize="12" fontWeight="700" fill="#f59e0b">产出停滞</text>
                    <text x="78" y="223" textAnchor="middle" fontSize="10" fill="#94a3b8">维稳 &gt; 发展</text>
                </g>

                <g>
                    <rect x="222" y="182" width="120" height="58" rx="8" fill="#020617" stroke="#d97706" strokeOpacity="0.55" />
                    <text x="282" y="204" textAnchor="middle" fontSize="12" fontWeight="700" fill="#f59e0b">动力缺失</text>
                    <text x="282" y="223" textAnchor="middle" fontSize="10" fill="#94a3b8">替代成本过高</text>
                </g>

                <g opacity="0.5">
                    <rect x="171" y="122" width="18" height="16" rx="3" stroke="#d97706" fill="none" />
                    <path d="M174,122 v-5 a6,6 0 0 1 12,0 v5" stroke="#d97706" fill="none" />
                </g>

                <text x="248" y="114" fill="#a16207" fontSize="10" fontWeight="700" transform="rotate(25, 248, 114)">无需机器</text>
                <text x="180" y="214" fill="#a16207" fontSize="10" fontWeight="700" textAnchor="middle">无法增长</text>
                <text x="112" y="114" fill="#a16207" fontSize="10" fontWeight="700" transform="rotate(-25, 112, 114)">巩固低薪</text>
            </svg>
         </div>
      </div>
    </div>
);

export default TrapVisual;
