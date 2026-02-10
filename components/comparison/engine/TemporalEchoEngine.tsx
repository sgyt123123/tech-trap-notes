import React, { useMemo, useState } from 'react';
import { HistoricalEra } from '@/types';
import EchoAxis, { DIMENSIONS } from './EchoAxis';
import EraPortal, { EraPortalHeader } from './EraPortal';
import EchoBridge from './EchoBridge';
import ComparisonInsightPanel from './ComparisonInsightPanel';
import { COMPARISON_DIMENSION_GUIDANCE, getComparisonInsight } from '@/constants';

interface TemporalEchoEngineProps {
  eraA: HistoricalEra;
  eraB: HistoricalEra;
}

const TemporalEchoEngine: React.FC<TemporalEchoEngineProps> = ({ eraA, eraB }) => {
  const [activeDimension, setActiveDimension] = useState<string | null>(null);
  const comparisonGridColumnsClass = 'grid-cols-[minmax(0,1fr)_100px_minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_140px_minmax(0,1fr)]';

  const insight = useMemo(() => getComparisonInsight(eraA, eraB), [eraA, eraB]);

  const activeDimensionMeta = useMemo(
    () => DIMENSIONS.find((dimension) => dimension.id === activeDimension) ?? null,
    [activeDimension],
  );

  const activeDimensionGuidance = activeDimension
    ? COMPARISON_DIMENSION_GUIDANCE[activeDimension]
    : null;

  return (
    <div className="relative w-full bg-slate-950/20 rounded-3xl border border-slate-800/50 overflow-hidden backdrop-blur-sm">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,23,42,0)_0%,rgba(2,6,23,0.8)_100%)] pointer-events-none" />

      <div className="relative p-5 lg:p-8 flex flex-col gap-6 lg:gap-8">
        <div className={'grid ' + comparisonGridColumnsClass + ' gap-4 lg:gap-6'}>
          <EraPortalHeader era={eraA} side="left" />
          <div />
          <EraPortalHeader era={eraB} side="right" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-6 lg:gap-8">
          <div className="relative h-[460px] lg:h-[560px]">
            <div className={'relative h-full grid ' + comparisonGridColumnsClass + ' gap-4 lg:gap-6'}>
              <div className="relative z-20">
                <EraPortal era={eraA} side="left" activeDimension={activeDimension} />
              </div>

              <div className="relative z-30">
                <EchoAxis
                  activeDimension={activeDimension}
                  onHoverDimension={setActiveDimension}
                />
              </div>

              <div className="relative z-20">
                <EraPortal era={eraB} side="right" activeDimension={activeDimension} />
              </div>

              <EchoBridge
                activeDimension={activeDimension}
                typeA={eraA.type}
                typeB={eraB.type}
              />
            </div>
          </div>

          <ComparisonInsightPanel
            activeDimension={activeDimension}
            activeDimensionGuidance={activeDimensionGuidance}
            activeDimensionMeta={activeDimensionMeta}
            eraA={eraA}
            eraB={eraB}
            insight={insight}
          />
        </div>
      </div>

      {/* Decorative Corners */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full translate-x-1/2 translate-y-1/2" />
    </div>
  );
};

export default TemporalEchoEngine;
