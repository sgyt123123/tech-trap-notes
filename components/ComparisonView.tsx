import React, { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  buildComparisonPairKeyByEraId,
  COMPARISON_NAV_COPY,
  COMPARISON_PAIR_OPTIONS,
  ERAS,
  TRAP_LOGIC_MAP,
} from '../constants';
import { HistoricalEra } from '../types';
import { ArrowLeft, Sparkles } from 'lucide-react';
import TemporalEchoEngine from './comparison/engine/TemporalEchoEngine';
import ParadoxCard from './comparison/ParadoxCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { createFadeSlideMotion } from '@/lib/motion';

interface ComparisonViewProps {
  contextNodeId?: string | null;
  onBackToMechanism?: (nodeId: string) => void;
}

const ComparisonView: React.FC<ComparisonViewProps> = ({ contextNodeId = null, onBackToMechanism }) => {
  const [era1, setEra1] = useState<HistoricalEra>(ERAS[0]); // IR1
  const [era2, setEra2] = useState<HistoricalEra>(ERAS[3]); // AI Age
  const shouldReduceMotion = useReducedMotion();
  const paradoxMotion = createFadeSlideMotion(shouldReduceMotion, 8, 0.2);
  const contextNode = useMemo(
    () => TRAP_LOGIC_MAP.nodes.find((node) => node.id === contextNodeId) ?? null,
    [contextNodeId],
  );
  const eraById = useMemo(
    () => ERAS.reduce<Record<string, HistoricalEra>>((lookup, era) => {
      lookup[era.id] = era;
      return lookup;
    }, {}),
    [],
  );
  const activeComparisonKey = useMemo(
    () => buildComparisonPairKeyByEraId(era1.id, era2.id),
    [era1.id, era2.id],
  );
  const activePair = useMemo(
    () => COMPARISON_PAIR_OPTIONS.find((pair) => pair.key === activeComparisonKey) ?? null,
    [activeComparisonKey],
  );
  const pairOptionByKey = useMemo(
    () => COMPARISON_PAIR_OPTIONS.reduce<Record<string, (typeof COMPARISON_PAIR_OPTIONS)[number]>>((lookup, option) => {
      lookup[option.key] = option;
      return lookup;
    }, {}),
    [],
  );

  const isFordVsAI = activeComparisonKey === 'IR2_AI_AGE';

  const handleSelectPair = (eraAId: string, eraBId: string) => {
    const nextEraA = eraById[eraAId];
    const nextEraB = eraById[eraBId];
    if (!nextEraA || !nextEraB) {
      return;
    }
    setEra1(nextEraA);
    setEra2(nextEraB);
  };

  useEffect(() => {
    if (!contextNodeId) {
      return;
    }

    if (contextNodeId === 'ford_paradox' || contextNodeId === 'trap') {
      const industrialEra = ERAS.find((era) => era.id === 'IR2');
      const aiEra = ERAS.find((era) => era.id === 'AI_AGE');
      if (industrialEra && aiEra) {
        setEra1(industrialEra);
        setEra2(aiEra);
      }
      return;
    }

    const firstEra = ERAS.find((era) => era.id === 'IR1');
    const aiEra = ERAS.find((era) => era.id === 'AI_AGE');
    if (firstEra && aiEra) {
      setEra1(firstEra);
      setEra2(aiEra);
    }
  }, [contextNodeId]);

  return (
    <div className="flex-1 p-4 lg:p-8 relative z-10 animate-in zoom-in-95 duration-500 min-h-0">
      <ScrollArea className="h-full w-full">
        <div className="max-w-7xl mx-auto min-h-full flex flex-col pr-2">
            {/* Header */}
            <div className="mb-8 lg:mb-12 text-center shrink-0">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-4">
                      <Sparkles size={12} /> Temporal Mirroring
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-serif font-black text-white mb-4 tracking-tight">时空镜像引擎</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto font-light text-base lg:text-lg">
                        "剥离技术的表象，透视系统演进的底层同构。"
                    </p>
            </div>

            {contextNode ? (
              <Card className="bg-slate-900/40 border-slate-800 shadow-none mb-6">
                <CardContent className="p-4 lg:p-5 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-cyan-400 font-black mb-1">来自机制图谱的上下文</p>
                    <p className="text-sm text-slate-300">
                      当前查看节点「{contextNode.label}」对应的历史镜像。
                    </p>
                  </div>
                  {onBackToMechanism ? (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => onBackToMechanism(contextNode.id)}
                      className="border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                      <ArrowLeft size={14} className="mr-2" /> 返回机制图谱
                    </Button>
                  ) : null}
                </CardContent>
              </Card>
            ) : null}

            <div className="flex-1 min-h-0 flex flex-col gap-12">
                <Card className="bg-slate-900/35 border-slate-800/80 shadow-none">
                  <CardContent className="p-4 lg:p-5">
                    <div className="flex flex-col gap-1 mb-3">
                      <p className="text-[10px] uppercase tracking-widest text-cyan-400 font-black">
                        {COMPARISON_NAV_COPY.title}
                      </p>
                      <p className="text-xs text-slate-400">{COMPARISON_NAV_COPY.subtitle}</p>
                      <p className="text-xs text-slate-500">{COMPARISON_NAV_COPY.instruction}</p>
                    </div>

                    <ScrollArea className="w-full">
                      <div className="min-w-[820px] grid grid-cols-[170px_repeat(3,minmax(0,1fr))] gap-2">
                        <div className="h-20 rounded-md border border-slate-800/70 bg-slate-950/40" />
                        {ERAS.slice(1).map((columnEra) => (
                          <div
                            key={`column-${columnEra.id}`}
                            className="h-20 rounded-md border border-slate-800/70 bg-slate-950/40 px-3 py-2 flex items-center justify-center text-center"
                          >
                            <p className="text-xs font-semibold text-slate-200 leading-snug">{columnEra.name}</p>
                          </div>
                        ))}

                        {ERAS.slice(0, -1).map((rowEra, rowIndex) => (
                          <React.Fragment key={`row-${rowEra.id}`}>
                            <div className="h-24 rounded-md border border-slate-800/70 bg-slate-950/40 px-3 py-2 flex items-center">
                              <p className="text-xs font-semibold text-slate-200 leading-snug">{rowEra.name}</p>
                            </div>

                            {ERAS.slice(1).map((columnEra, visibleColumnIndex) => {
                              const originalColumnIndex = visibleColumnIndex + 1;
                              if (rowEra.id === columnEra.id) {
                                return (
                                  <div
                                    key={`${rowEra.id}-${columnEra.id}`}
                                    className="h-24 rounded-md border border-slate-800/70 bg-slate-950/30 px-3 py-2 flex items-center justify-center"
                                  >
                                    <span className="text-[11px] uppercase tracking-widest text-slate-600">同时代</span>
                                  </div>
                                );
                              }

                              if (rowIndex > originalColumnIndex) {
                                return (
                                  <div
                                    key={`${rowEra.id}-${columnEra.id}`}
                                    className="h-24 rounded-md border border-dashed border-slate-800/60 bg-slate-950/20 px-3 py-2 flex items-center justify-center"
                                  >
                                    <span className="text-[11px] uppercase tracking-widest text-slate-700">镜像省略</span>
                                  </div>
                                );
                              }

                              const pairKey = buildComparisonPairKeyByEraId(rowEra.id, columnEra.id);
                              const pairOption = pairOptionByKey[pairKey];
                              const isActivePair = pairKey === activeComparisonKey;

                              return (
                                <button
                                  key={`${rowEra.id}-${columnEra.id}`}
                                  type="button"
                                  onClick={() => handleSelectPair(rowEra.id, columnEra.id)}
                                  className={
                                    'h-24 rounded-md border px-3 py-2 text-left transition-colors ' +
                                    (isActivePair
                                      ? 'border-cyan-400/70 bg-cyan-500/15'
                                      : 'border-slate-800/70 bg-slate-950/40 hover:border-slate-600/80 hover:bg-slate-900/80')
                                  }
                                >
                                  <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">{pairOption?.label ?? pairKey}</p>
                                  <p className="text-xs text-slate-200 leading-snug line-clamp-2">
                                    {pairOption?.focus ?? '跨时代结构对照'}
                                  </p>
                                </button>
                              );
                            })}
                          </React.Fragment>
                        ))}
                      </div>
                    </ScrollArea>

                    {activePair ? (
                      <p className="mt-3 text-xs text-slate-500">
                        当前矩阵焦点：{activePair.label} · {activePair.focus}
                      </p>
                    ) : null}
                  </CardContent>
                </Card>

                {/* The New Comparison Engine */}
                <TemporalEchoEngine 
                  eraA={era1} 
                  eraB={era2} 
                />

                {/* Macro Paradox Card (Only for IR2 vs AI) */}
                {isFordVsAI && (
                  <motion.div
                    initial={paradoxMotion.initial}
                    animate={paradoxMotion.animate}
                    transition={paradoxMotion.transition}
                  >
                    <ParadoxCard />
                  </motion.div>
                )}
            </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ComparisonView;
