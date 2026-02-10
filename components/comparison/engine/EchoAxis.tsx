import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, Zap, Users, Landmark, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Dimension {
  id: string;
  label: string;
  icon: LucideIcon;
  description: string;
}

export const DIMENSIONS: Dimension[] = [
  { id: 'tech', label: '核心驱动', icon: Zap, description: '技术本质与生产力特征' },
  { id: 'labor', label: '劳动力分配', icon: Users, description: '技能需求与岗位变迁' },
  { id: 'institution', label: '制度响应', icon: Landmark, description: '政策、教育与社会契约' },
  { id: 'impact', label: '社会影响', icon: TrendingUp, description: '不平等程度与社会稳定性' },
];

interface EchoAxisProps {
  activeDimension: string | null;
  onHoverDimension: (id: string | null) => void;
}

const EchoAxis: React.FC<EchoAxisProps> = ({ activeDimension, onHoverDimension }) => {
  return (
    <div className="relative h-full grid grid-rows-4">
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-slate-700 to-transparent" />
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-cyan-500/20 blur-[2px]" />

      {DIMENSIONS.map((dim) => {
        const Icon = dim.icon;
        const isActive = activeDimension === dim.id;

        return (
          <div
            key={dim.id}
            className="relative z-20 group flex items-center justify-center"
            title={dim.description}
            aria-label={`维度 ${dim.label}：${dim.description}`}
            onMouseEnter={() => onHoverDimension(dim.id)}
            onMouseLeave={() => onHoverDimension(null)}
          >
            {/* Dimension Node */}
            <motion.div
              animate={{
                scale: isActive ? 1.2 : 1,
                backgroundColor: isActive ? 'rgb(8, 145, 178)' : 'rgb(15, 23, 42)',
                borderColor: isActive ? 'rgb(34, 211, 238)' : 'rgb(51, 65, 85)',
              }}
              className={cn(
                "w-12 h-12 rounded-full border-2 flex items-center justify-center cursor-help transition-shadow duration-500",
                isActive ? "shadow-[0_0_20px_rgba(34,211,238,0.4)]" : "shadow-none"
              )}
            >
              <Icon size={20} className={isActive ? "text-white" : "text-slate-500"} />
            </motion.div>

            {/* Dimension Label */}
            <div className={cn(
              'absolute left-1/2 top-1/2 ml-8 -translate-y-1/2 whitespace-nowrap transition-all duration-300 pointer-events-none',
              isActive ? 'opacity-100 scale-100' : 'opacity-50 scale-95'
            )}>
              <span className="text-[10px] uppercase font-black tracking-[0.2em] text-cyan-400 bg-slate-950 px-2 py-0.5 rounded border border-cyan-900/50">
                {dim.label}
              </span>
            </div>

            {/* Connective Glow */}
            {isActive && (
              <motion.div
                layoutId="activeGlow"
                className="absolute inset-0 bg-cyan-500/10 rounded-full blur-xl -z-10"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default EchoAxis;
