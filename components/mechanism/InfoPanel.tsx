import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Node } from '../../types';
import { BookOpen, Quote, Hash, Lightbulb, MousePointerClick } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import TechShockVisual from '../visuals/TechShockVisual';
import ShortTermVisual from '../visuals/ShortTermVisual';
import InstitutionGapVisual from '../visuals/InstitutionGapVisual';
import ResistanceVisual from '../visuals/ResistanceVisual';
import ProsperityVisual from '../visuals/ProsperityVisual';
import FordParadoxVisual from '../visuals/FordParadoxVisual';
import TrapVisual from '../visuals/TrapVisual';
import CausalNavigation from './CausalNavigation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { createFadeInMotion, createFadeSlideMotion, MECHANISM_MOTION } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface InfoPanelProps {
  selectedNode: Node | null;
  onNavigate: (nodeId: string) => void;
  onRequestViewChange?: (mode: 'mechanism' | 'data' | 'compare' | 'future', anchorNodeId?: string) => void;
}

interface NodeTypeConfig {
  color: string;
  border: string;
  background: string;
  label: string;
}

const NODE_TYPE_CONFIG: Record<Node['type'], NodeTypeConfig> = {
  concept: {
    color: 'text-cyan-400',
    border: 'border-cyan-500/50',
    background: 'bg-cyan-500/10',
    label: '概念 (CONCEPT)',
  },
  cause: {
    color: 'text-amber-400',
    border: 'border-amber-500/50',
    background: 'bg-amber-500/10',
    label: '驱动因素 (DRIVER)',
  },
  effect: {
    color: 'text-rose-400',
    border: 'border-rose-500/50',
    background: 'bg-rose-500/10',
    label: '社会后果 (EFFECT)',
  },
  solution: {
    color: 'text-emerald-400',
    border: 'border-emerald-500/50',
    background: 'bg-emerald-500/10',
    label: '破局之道 (SOLUTION)',
  },
  trap: {
    color: 'text-slate-300',
    border: 'border-slate-500/50',
    background: 'bg-slate-500/10',
    label: '系统陷阱 (TRAP)',
  },
};

const NODE_VISUAL_COMPONENTS: Record<string, React.FC> = {
  tech_shock: TechShockVisual,
  short_term: ShortTermVisual,
  institution_gap: InstitutionGapVisual,
  resistance: ResistanceVisual,
  prosperity: ProsperityVisual,
  ford_paradox: FordParadoxVisual,
  trap: TrapVisual,
};

const InfoPanel: React.FC<InfoPanelProps> = ({ selectedNode, onNavigate, onRequestViewChange }) => {
  const shouldReduceMotion = useReducedMotion();
  const emptyStateMotion = createFadeInMotion(shouldReduceMotion, MECHANISM_MOTION.enterDuration);
  const detailMotion = createFadeSlideMotion(
    shouldReduceMotion,
    MECHANISM_MOTION.shiftDistance,
    MECHANISM_MOTION.enterDuration,
  );
  const [activeTab, setActiveTab] = React.useState<'visual' | 'analysis' | 'links'>('visual');

  React.useEffect(() => {
    setActiveTab('visual');
  }, [selectedNode?.id]);

  if (!selectedNode) {
    return (
      <motion.div
        className="h-full flex flex-col items-center justify-center text-slate-500 p-12 text-center bg-slate-950/80 backdrop-blur-md"
        initial={emptyStateMotion.initial}
        animate={emptyStateMotion.animate}
        transition={emptyStateMotion.transition}
      >
        <div className="relative mb-8 group cursor-default">
          <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full group-hover:bg-cyan-500/30 transition-all duration-1000"></div>
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 relative z-10 shadow-2xl group-hover:scale-105 transition-transform duration-500">
            <BookOpen size={48} className="text-cyan-500" />
          </div>
        </div>
        <h3 className="text-3xl font-serif font-bold text-slate-200 mb-4 tracking-wide">探索机制</h3>
        <p className="text-slate-400 leading-relaxed max-w-xs font-light">
          点击左侧图谱中的节点
          <br />
          解构<span className="text-cyan-400 font-bold mx-1">技术陷阱</span>的深层逻辑
        </p>
        <div className="mt-8 flex items-center gap-2 text-xs text-slate-600 animate-pulse">
          <MousePointerClick size={14} />
          <span>Select a node to begin</span>
        </div>
      </motion.div>
    );
  }

  const visualComponent = NODE_VISUAL_COMPONENTS[selectedNode.id];
  const nodeTypeConfig = NODE_TYPE_CONFIG[selectedNode.type];
  const crossViewActions = onRequestViewChange ? (
    <div className="pt-4 border-t border-slate-800">
      <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">跨维度锚点</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onRequestViewChange('data', selectedNode.id)}
          className="justify-start border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white"
        >
          查看对应数据证据
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onRequestViewChange('compare', selectedNode.id)}
          className="justify-start border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white"
        >
          查看历史镜像
        </Button>
      </div>
    </div>
  ) : null;

  const renderScrollableContent = (content: React.ReactNode) => (
    <ScrollArea
      type="always"
      scrollHideDelay={0}
      className="h-full min-h-0 [&_[data-slot=scroll-area-scrollbar]]:w-2.5"
      viewportClassName="h-full min-h-0"
    >
      <motion.div
        key={`${selectedNode.id}-${activeTab}`}
        className="px-4 lg:px-6 py-4 lg:py-5 space-y-5 pb-10"
        initial={detailMotion.initial}
        animate={detailMotion.animate}
        transition={detailMotion.transition}
      >
        {content}
      </motion.div>
    </ScrollArea>
  );

  return (
    <div className="h-full min-h-0 overflow-hidden bg-slate-900 shadow-[-20px_0_50px_rgba(0,0,0,0.45)] relative z-30 grid grid-rows-[auto_minmax(0,1fr)]">
      <div className="p-5 lg:p-6 pb-4 bg-slate-900/95 backdrop-blur-sm shadow-xl border-b border-slate-700 relative z-20">
        <div className="flex items-center gap-3 mb-4">
          <span
            className={cn(
              'px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-[0.2em] border shadow-[0_0_15px_rgba(0,0,0,0.2)]',
              nodeTypeConfig.border,
              nodeTypeConfig.background,
              nodeTypeConfig.color,
            )}
          >
            {nodeTypeConfig.label}
          </span>
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
            ID: {selectedNode.id.toUpperCase()}
          </span>
        </div>

        <h2 className="text-2xl lg:text-3xl font-serif font-black text-white mb-3 leading-tight tracking-tight">
          {selectedNode.label}
        </h2>

        <div className="relative pl-6 py-2 border-l-2 border-slate-700 mr-4">
          <Quote size={20} className="absolute -left-3 -top-3 text-slate-500 bg-slate-900 p-0.5 rounded-full z-10" />
          <p className="text-base lg:text-lg text-slate-100 font-serif italic leading-relaxed opacity-95">
            {selectedNode.description}
          </p>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as 'visual' | 'analysis' | 'links')}
        className="h-full min-h-0 gap-0"
      >
        <div className="px-4 lg:px-6 py-2 border-b border-slate-700/80">
          <TabsList className="w-full grid grid-cols-3 bg-slate-800/90 border border-slate-600/80">
            <TabsTrigger value="visual" className="text-xs">图解</TabsTrigger>
            <TabsTrigger value="analysis" className="text-xs">解析</TabsTrigger>
            <TabsTrigger value="links" className="text-xs">关联</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="visual" className="h-full min-h-0 m-0">
          {renderScrollableContent(
            <>
              {visualComponent ? (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 min-w-0 overflow-visible">
                  {React.createElement(visualComponent)}
                </div>
              ) : null}
              {crossViewActions}
            </>
          )}
        </TabsContent>

        <TabsContent value="analysis" className="h-full min-h-0 m-0">
          {renderScrollableContent(
            <>
              <div className="prose prose-invert prose-sm max-w-none prose-headings:font-sans prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-200 prose-h3:text-xl prose-h3:text-cyan-100 prose-h3:mt-8 prose-h3:mb-4 prose-h3:border-b prose-h3:border-slate-800 prose-h3:pb-2 prose-h4:text-xs prose-h4:uppercase prose-h4:tracking-widest prose-h4:text-slate-500 prose-h4:mt-8 prose-p:text-slate-400 prose-p:leading-7 prose-p:font-light prose-p:mb-4 prose-strong:text-white prose-strong:font-bold prose-li:text-slate-400 prose-li:marker:text-slate-700 prose-blockquote:border-l-cyan-500 prose-blockquote:bg-slate-900/50 prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-slate-300 hr:border-slate-800 hr:my-8">
                <ReactMarkdown>{selectedNode.detailedMarkdown}</ReactMarkdown>
              </div>
              {selectedNode.relatedConcepts.length > 0 && (
                <div className="pt-6 border-t border-slate-800">
                  <div className="flex items-center gap-2 mb-4 text-slate-500">
                    <Hash size={14} className="text-slate-600" />
                    <span className="text-xs uppercase tracking-wider font-bold font-mono">Related Concepts</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedNode.relatedConcepts.map((concept, index) => (
                      <span
                        key={`${selectedNode.id}-${concept}-${index}`}
                        className="group cursor-help flex items-center text-xs font-medium bg-slate-900 border border-slate-800 text-slate-400 px-3 py-1.5 rounded-lg transition-all hover:border-cyan-500/30 hover:text-cyan-300 hover:bg-cyan-950/20"
                      >
                        <Lightbulb size={12} className="mr-2 text-slate-700 group-hover:text-yellow-400 transition-colors" />
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="links" className="h-full min-h-0 m-0">
          {renderScrollableContent(
            <>
              <div className="text-xs text-slate-400 bg-slate-900/50 border border-slate-800 rounded-lg px-3 py-2">
                从当前节点出发，查看上游驱动与下游后果，形成完整因果链。
              </div>
              <CausalNavigation nodeId={selectedNode.id} onNavigate={onNavigate} />
              {crossViewActions}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InfoPanel;
