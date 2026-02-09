import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ERAS, COMPARISON_INSIGHTS, TRAP_LOGIC_MAP } from '../constants';
import { HistoricalEra } from '../types';
import { ArrowLeft, ArrowRightLeft, ScrollText, Brain } from 'lucide-react';
import EraCard from './comparison/EraCard';
import ParadoxCard from './comparison/ParadoxCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { createFadeSlideMotion } from '@/lib/motion';

interface ComparisonViewProps {
  contextNodeId?: string | null;
  onBackToMechanism?: (nodeId: string) => void;
}

const ComparisonView: React.FC<ComparisonViewProps> = ({ contextNodeId = null, onBackToMechanism }) => {
  const [era1, setEra1] = useState<HistoricalEra>(ERAS[0]); // IR1
  const [era2, setEra2] = useState<HistoricalEra>(ERAS[3]); // AI Age
  const shouldReduceMotion = useReducedMotion();
  const textMotion = createFadeSlideMotion(shouldReduceMotion, 6, 0.18);
  const paradoxMotion = createFadeSlideMotion(shouldReduceMotion, 8, 0.2);
  const contextNode = useMemo(
    () => TRAP_LOGIC_MAP.nodes.find((node) => node.id === contextNodeId) ?? null,
    [contextNodeId],
  );

  // Consistency Logic: Always sort eras chronologically to fetch the analysis text.
  const getComparisonText = (e1: HistoricalEra, e2: HistoricalEra) => {
      if (e1.id === e2.id) return "请选择两个不同的时期进行对比。";
      
      const sorted = [e1, e2].sort((a, b) => a.yearStart - b.yearStart);
      const key = `${sorted[0].id}_${sorted[1].id}`;

      return COMPARISON_INSIGHTS[key] || "暂无该组合的详细对比数据。";
  };

  const comparisonText = useMemo(() => getComparisonText(era1, era2), [era1, era2]);
  const sortedIds = [era1.id, era2.id].sort();
  const isFordVsAI = sortedIds[0] === 'IR2' && sortedIds[1] === 'AI_AGE';
  const comparisonKey = `${era1.id}-${era2.id}`;

  const comparisonParagraphs = useMemo(
    () => comparisonText.split('。').map((sentence) => sentence.trim()).filter(Boolean),
    [comparisonText]
  );

  const handleSwapEras = () => {
    const currentEra = era1;
    setEra1(era2);
    setEra2(currentEra);
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
            <div className="mb-6 lg:mb-10 text-center shrink-0">
                    <h2 className="text-3xl lg:text-4xl font-serif font-black text-white mb-4">历史镜像</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto font-light text-base lg:text-lg">
                        "我们是否正在重演19世纪的悲剧？"<br/>
                        <span className="text-sm text-slate-600 font-mono mt-2 block">Compare systemic impacts across centuries</span>
                    </p>
            </div>

            {contextNode ? (
              <Card className="bg-slate-900/40 border-slate-800 shadow-none mb-4">
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
                      <ArrowLeft size={14} /> 返回机制图谱
                    </Button>
                  ) : null}
                </CardContent>
              </Card>
            ) : null}

            <div className="flex-1 min-h-0 flex flex-col gap-6">
                <div className="flex flex-col lg:flex-row gap-6 shrink-0 h-auto lg:h-[500px]">
                    <div className="flex-1 min-w-0 h-[400px] lg:h-auto">
                        <EraCard era={era1} setEra={setEra1} label="卡片 A" />
                    </div>

                    {/* Analysis Center */}
                    <div className="lg:w-2/5 flex flex-col shrink-0">
                        <div className="flex items-center justify-center -my-3 z-10 lg:my-auto lg:-mx-4 lg:order-none order-first">
                          <TooltipProvider delayDuration={150}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  type="button"
                                  size="icon"
                                  variant="outline"
                                  onClick={handleSwapEras}
                                  aria-label="交换两侧时代卡片"
                                  className="bg-slate-800 border-slate-700 text-cyan-400 relative hover:scale-110 transition-transform rounded-full size-12"
                                >
                                  <ArrowRightLeft size={24} />
                                  <div className="absolute inset-0 bg-cyan-400/20 rounded-full animate-ping opacity-20"></div>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="top" sideOffset={8}>
                                交换左右时期
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>

                        <Card className="bg-slate-900 p-6 lg:p-8 rounded-xl border border-slate-800 shadow-2xl flex-1 flex flex-col justify-center min-h-[250px] relative overflow-hidden">
                            {/* Decorative background */}
                            <div className="absolute top-0 right-0 p-32 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                            <CardHeader className="px-0 pb-4 border-b border-slate-800 shrink-0 relative z-10">
                              <CardTitle className="text-cyan-400 text-xs font-black uppercase flex items-center gap-2 tracking-widest">
                                <ScrollText size={14} /> 历史回响分析
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="px-0 pt-4 flex-1 min-h-0 relative z-10">
                              <ScrollArea className="h-full pr-2">
                                <AnimatePresence mode="wait">
                                  <motion.div
                                    key={comparisonKey}
                                    initial={textMotion.initial}
                                    animate={textMotion.animate}
                                    exit={textMotion.exit}
                                    transition={textMotion.transition}
                                    className="text-sm lg:text-base text-slate-300 leading-relaxed text-justify font-light font-serif"
                                  >
                                    {comparisonParagraphs.map((sentence, index) => (
                                      <p key={`${comparisonKey}-${index}`} className="mb-4 last:mb-0">
                                        {sentence}。
                                      </p>
                                    ))}
                                  </motion.div>
                                </AnimatePresence>
                              </ScrollArea>
                            </CardContent>
                            
                            <div className="mt-6 p-4 bg-slate-950 rounded-lg border border-slate-800/50 shrink-0 relative z-10">
                                <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-2 font-bold flex items-center gap-2">
                                    <Brain size={12} /> 核心洞察
                                </p>
                                <p className="text-xs text-slate-400 italic">
                                    "技术红利的分配存在时间滞后效应。我们今天面临的风险，不是技术本身，而是我们是否准备好度过这 30-40 年的制度调整期。"
                                </p>
                            </div>
                        </Card>
                    </div>

                    <div className="flex-1 min-w-0 h-[400px] lg:h-auto">
                        <EraCard era={era2} setEra={setEra2} label="卡片 B" />
                    </div>
                </div>

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
