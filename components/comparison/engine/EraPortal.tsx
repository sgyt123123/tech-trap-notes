import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HistoricalEra } from '@/types';
import { COMPARISON_DIMENSION_SUB_COPY, COMPARISON_INSTITUTION_COPY } from '@/constants';
import { DIMENSIONS } from './EchoAxis';
import { cn } from '@/lib/utils';

interface EraPortalProps {
  era: HistoricalEra;
  side: 'left' | 'right';
  activeDimension: string | null;
}

interface EraPortalHeaderProps {
  era: HistoricalEra;
  side: 'left' | 'right';
}

export const EraPortalHeader: React.FC<EraPortalHeaderProps> = ({ era, side }) => {
  const isLeft = side === 'left';

  return (
    <div className={cn('h-full', isLeft ? 'text-right' : 'text-left')}>
      <div className={cn(isLeft ? 'pr-4 border-r-4 border-amber-500/30' : 'pl-4 border-l-4 border-cyan-500/30')}>
        <motion.div
          key={era.id + '-title'}
          initial={{ opacity: 0, x: isLeft ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={cn(
            'text-xs uppercase font-black tracking-widest mb-2',
            isLeft ? 'text-amber-500/70' : 'text-cyan-500/70',
          )}
        >
          {era.yearStart} - {era.yearEnd ?? '至今'}
        </motion.div>
        <motion.h3
          key={era.id + '-name'}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn(
            'text-2xl lg:text-4xl font-black mb-2',
            isLeft ? 'font-serif text-slate-100' : 'font-sans text-white',
          )}
        >
          {era.name}
        </motion.h3>
      </div>
    </div>
  );
};

const EraPortal: React.FC<EraPortalProps> = ({ era, side, activeDimension }) => {
  const isLeft = side === 'left';
  const dimensionContentById: Record<string, { content: string; sub: string }> = {
    tech: {
      content: era.keyTechnologies.join(' · '),
      sub: COMPARISON_DIMENSION_SUB_COPY.tech,
    },
    labor: {
      content: era.description,
      sub: COMPARISON_DIMENSION_SUB_COPY.laborByType[era.type],
    },
    institution: {
      content: era.id === 'AI_AGE'
        ? COMPARISON_INSTITUTION_COPY.aiAge
        : COMPARISON_INSTITUTION_COPY.historicalDefault,
      sub: COMPARISON_DIMENSION_SUB_COPY.institution,
    },
    impact: {
      content: era.socialImpact,
      sub: COMPARISON_DIMENSION_SUB_COPY.impact,
    },
  };

  return (
    <div className={cn(
      'h-full px-2 lg:px-4',
      isLeft ? 'text-right items-end' : 'text-left items-start'
    )}>
      <div className="h-full grid grid-rows-4 gap-4 lg:gap-6">
        {DIMENSIONS.map((dim) => {
          const isActive = activeDimension === dim.id;
          const data = dimensionContentById[dim.id];

          return (
            <div
              key={dim.id}
              className={cn(
                'relative h-full flex flex-col justify-center transition-all duration-500 max-w-md',
                activeDimension && !isActive ? 'opacity-20 blur-[1px] scale-95' : 'opacity-100 scale-100',
                isActive ? (isLeft ? 'translate-x-2 lg:translate-x-3' : '-translate-x-2 lg:-translate-x-3') : '',
              )}
            >
              <div className={cn(
                'text-[9px] uppercase tracking-widest mb-1',
                isLeft ? 'text-slate-500/80' : 'text-slate-500/90',
              )}>
                {dim.label}
              </div>
              <div className="text-[10px] uppercase font-bold tracking-tighter mb-1 text-slate-500">
                {data?.sub}
              </div>
              <div
                className={cn(
                  'text-sm lg:text-base leading-relaxed line-clamp-3',
                  isLeft ? 'font-serif text-slate-300' : 'font-sans text-slate-200',
                  isActive && (isLeft ? 'text-amber-200' : 'text-cyan-200'),
                )}
              >
                {data?.content}
              </div>

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    exit={{ width: 0 }}
                    className={cn(
                      'h-px mt-2 bg-gradient-to-r',
                      isLeft ? 'from-transparent to-amber-500/50' : 'from-cyan-500/50 to-transparent',
                    )}
                  />
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EraPortal;
