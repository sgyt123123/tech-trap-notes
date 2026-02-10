import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { COMPARISON_PANEL_COPY } from '@/constants';
import { ComparisonInsight, HistoricalEra } from '@/types';
import { Dimension } from './EchoAxis';

interface ComparisonInsightPanelProps {
  activeDimension: string | null;
  activeDimensionGuidance: string | null;
  activeDimensionMeta: Dimension | null;
  eraA: HistoricalEra;
  eraB: HistoricalEra;
  insight: ComparisonInsight;
}

const ComparisonInsightPanel: React.FC<ComparisonInsightPanelProps> = ({
  activeDimension,
  activeDimensionGuidance,
  activeDimensionMeta,
  eraA,
  eraB,
  insight,
}) => {
  const ActiveDimensionIcon = activeDimensionMeta?.icon ?? Info;

  return (
    <AnimatePresence mode="wait">
      <motion.aside
        key={activeDimension ?? `overview-${eraA.id}-${eraB.id}`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        className="w-full lg:sticky lg:top-6 self-start"
      >
        <div className="bg-slate-900/85 border border-slate-700/60 backdrop-blur-xl p-4 lg:p-5 rounded-2xl shadow-2xl">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <ActiveDimensionIcon size={16} className="text-cyan-400" />
            <span className="text-[10px] uppercase font-black tracking-widest text-slate-500">
              {activeDimensionMeta ? COMPARISON_PANEL_COPY.dimensionLabel : COMPARISON_PANEL_COPY.overviewLabel}
            </span>
            {activeDimensionMeta ? (
              <span className="text-[10px] uppercase font-black tracking-widest text-cyan-300 bg-cyan-950/30 border border-cyan-900/60 px-2 py-0.5 rounded-full">
                {activeDimensionMeta.label}
              </span>
            ) : null}
          </div>

          {activeDimensionMeta ? (
            <p className="text-sm text-slate-300 leading-relaxed mb-2">
              {activeDimensionMeta.description}
            </p>
          ) : (
            <div className="grid gap-3 mb-2">
              <p className="text-sm font-semibold text-cyan-300">{insight.title}</p>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">{COMPARISON_PANEL_COPY.summaryLabel}</p>
                <p className="text-sm text-slate-200 leading-relaxed">{insight.summary}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">{COMPARISON_PANEL_COPY.mechanismLabel}</p>
                <p className="text-xs text-slate-300 leading-relaxed">{insight.mechanism}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">{COMPARISON_PANEL_COPY.signalLabel}</p>
                <p className="text-xs text-cyan-200 leading-relaxed">{insight.signal}</p>
              </div>
            </div>
          )}

          {activeDimensionMeta ? (
            <>
              {activeDimension === 'impact' ? (
                <div className="grid gap-2 mb-3">
                  <div className="rounded-lg border border-slate-700/70 bg-slate-950/40 p-2">
                    <p className="text-[10px] uppercase tracking-wider text-amber-300/90 mb-1">{eraA.name}</p>
                    <p className="text-xs leading-relaxed text-slate-300">{eraA.socialImpact}</p>
                  </div>
                  <div className="rounded-lg border border-slate-700/70 bg-slate-950/40 p-2">
                    <p className="text-[10px] uppercase tracking-wider text-cyan-300/90 mb-1">{eraB.name}</p>
                    <p className="text-xs leading-relaxed text-slate-300">{eraB.socialImpact}</p>
                  </div>
                </div>
              ) : null}
              {activeDimensionGuidance ? (
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  {activeDimensionGuidance}
                </p>
              ) : null}
            </>
          ) : null}

        </div>
      </motion.aside>
    </AnimatePresence>
  );
};

export default ComparisonInsightPanel;
