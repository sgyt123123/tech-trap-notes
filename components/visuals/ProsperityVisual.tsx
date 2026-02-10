import React from 'react';
import { Zap, GraduationCap, ShieldCheck, TrendingUp } from 'lucide-react';

const ProsperityVisual: React.FC = () => (
  <div className="bg-slate-900/70 rounded-xl p-4 lg:p-5 border border-slate-600/80 mb-4 w-full overflow-visible">
    <div className="flex justify-between items-center text-xs font-bold text-slate-200 tracking-[0.16em] mb-5">
      <span>协同共振</span>
    </div>

    <div className="w-full min-h-[250px] aspect-[19/12] max-h-[340px] lg:max-h-[370px] relative bg-emerald-950/10 rounded-xl border border-emerald-900/30 px-2 py-1">
      <svg className="w-full h-full overflow-visible" viewBox="0 0 420 260" preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="prosperity-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="#94a3b8" strokeWidth="0.5" opacity="0.2" />
          </pattern>
          <marker id="prosperity-arrow" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <polygon points="0 0, 7 2.5, 0 5" fill="#10b981" />
          </marker>
          <marker id="distribution-arrow" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <polygon points="0 0, 7 2.5, 0 5" fill="#a855f7" />
          </marker>
        </defs>

        <rect x="0" y="0" width="420" height="260" fill="url(#prosperity-grid)" />

        <line
          x1="152"
          y1="130"
          x2="274"
          y2="130"
          stroke="#334155"
          strokeWidth="4"
          strokeDasharray="6 6"
          className="animate-[flow_1s_linear_infinite]"
        />
        <line
          x1="138"
          y1="112"
          x2="274"
          y2="78"
          stroke="#10b981"
          strokeWidth="2.5"
          strokeOpacity="0.72"
          strokeDasharray="4 4"
          markerEnd="url(#prosperity-arrow)"
        />
        <line
          x1="138"
          y1="148"
          x2="274"
          y2="182"
          stroke="#a855f7"
          strokeWidth="2.5"
          strokeOpacity="0.72"
          strokeDasharray="4 4"
          markerEnd="url(#distribution-arrow)"
        />

        <g transform="translate(110 130)">
          <circle
            r="42"
            fill="#020617"
            stroke="#06b6d4"
            strokeWidth="6"
            strokeDasharray="7 5"
            className="animate-[spin_4s_linear_infinite]"
          />
          <circle r="32" fill="#082f49" opacity="0.55" />
          <foreignObject x="-13" y="-13" width="26" height="26">
            <div className="flex h-full w-full items-center justify-center text-cyan-400">
              <Zap size={22} />
            </div>
          </foreignObject>
        </g>

        <g transform="translate(304 78)">
          <circle
            r="30"
            fill="#020617"
            stroke="#10b981"
            strokeWidth="4"
            strokeDasharray="6 4"
            className="animate-[spin_4s_linear_infinite_reverse]"
          />
          <circle r="22" fill="#052e1f" opacity="0.55" />
          <foreignObject x="-11" y="-11" width="22" height="22">
            <div className="flex h-full w-full items-center justify-center text-emerald-400">
              <GraduationCap size={16} />
            </div>
          </foreignObject>
        </g>

        <g transform="translate(304 182)">
          <circle
            r="30"
            fill="#020617"
            stroke="#a855f7"
            strokeWidth="4"
            strokeDasharray="6 4"
            className="animate-[spin_4s_linear_infinite_reverse]"
          />
          <circle r="22" fill="#3b0764" opacity="0.4" />
          <foreignObject x="-11" y="-11" width="22" height="22">
            <div className="flex h-full w-full items-center justify-center text-purple-400">
              <ShieldCheck size={16} />
            </div>
          </foreignObject>
        </g>

        <g>
          <rect x="70" y="214" rx="6" width="80" height="24" fill="#020617" stroke="#155e75" />
          <text x="110" y="230" textAnchor="middle" fontSize="11" fontWeight="700" fill="#67e8f9">技术引擎</text>
        </g>
        <g>
          <rect x="266" y="38" rx="6" width="76" height="22" fill="#020617" stroke="#166534" />
          <text x="304" y="53" textAnchor="middle" fontSize="10" fontWeight="700" fill="#6ee7b7">技能适配</text>
        </g>
        <g>
          <rect x="266" y="197" rx="6" width="76" height="22" fill="#020617" stroke="#6b21a8" />
          <text x="304" y="212" textAnchor="middle" fontSize="10" fontWeight="700" fill="#c084fc">利益分配</text>
        </g>
      </svg>
    </div>

    <div className="mt-4 flex items-center gap-3 bg-emerald-950/25 border border-emerald-400/35 p-3 rounded-lg">
      <div className="bg-emerald-500/20 p-1.5 rounded-full animate-pulse">
        <TrendingUp size={16} className="text-emerald-400" />
      </div>
      <div className="flex-1">
        <div className="text-[11px] text-emerald-300/90 font-bold">系统产出</div>
        <div className="text-sm text-emerald-100 font-medium">工资与产出同步增长</div>
      </div>
      <div className="text-xl font-black text-emerald-300">高协同</div>
    </div>
  </div>
);

export default ProsperityVisual;
