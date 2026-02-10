import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { DIMENSIONS } from './EchoAxis';

interface EchoBridgeProps {
  activeDimension: string | null;
  typeA: string;
  typeB: string;
}

const EchoBridge: React.FC<EchoBridgeProps> = ({ activeDimension, typeA, typeB }) => {
  if (!activeDimension) return null;

  const activeIndex = Math.max(
    DIMENSIONS.findIndex((dim) => dim.id === activeDimension),
    0,
  );
  const activePosition = ((activeIndex + 0.5) / DIMENSIONS.length) * 100;
  const lineY = `${activePosition}%`;

  // Logic: Is there a structural conflict? (e.g., both are labor-replacing)
  const isStructuralMirror = typeA === typeB;
  const isDanger = isStructuralMirror && typeA === 'replacing';

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      <svg className="w-full h-full">
        <defs>
          <linearGradient id="bridgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={isDanger ? "rgba(239, 68, 68, 0)" : "rgba(245, 158, 11, 0)"} />
            <stop offset="45%" stopColor={isDanger ? "rgba(239, 68, 68, 0.6)" : "rgba(34, 211, 238, 0.4)"} />
            <stop offset="55%" stopColor={isDanger ? "rgba(239, 68, 68, 0.6)" : "rgba(34, 211, 238, 0.4)"} />
            <stop offset="100%" stopColor={isDanger ? "rgba(239, 68, 68, 0)" : "rgba(6, 182, 212, 0)"} />
          </linearGradient>
          
          <filter id="bridgeGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <motion.line
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          x1="15%"
          y1={lineY}
          x2="85%"
          y2={lineY}
          stroke="url(#bridgeGradient)"
          strokeWidth={isDanger ? 3 : 1}
          filter="url(#bridgeGlow)"
          className={cn(isDanger && "animate-pulse")}
        />
      </svg>
    </div>
  );
};

export default EchoBridge;
