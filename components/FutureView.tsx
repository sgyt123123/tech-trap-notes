import React, { useEffect, useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { TrendingUp, User, Globe, type LucideIcon } from 'lucide-react';
import ScenarioList from './future/ScenarioList';
import TimelineCurve from './future/TimelineCurve';
import PersonalStrategies from './future/PersonalStrategies';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { createFadeSlideMotion } from '@/lib/motion';

type FutureTab = 'scenarios' | 'curve' | 'personal';

interface FutureTabOption {
  value: FutureTab;
  label: string;
  icon: LucideIcon;
}

const FUTURE_TAB_OPTIONS: FutureTabOption[] = [
  { value: 'scenarios', label: '宏观：制度路径', icon: Globe },
  { value: 'curve', label: '趋势：技术曲线', icon: TrendingUp },
  { value: 'personal', label: '微观：个人策略', icon: User },
];

const FutureView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FutureTab>('scenarios');
  const [isDockCompact, setIsDockCompact] = useState(false);
  const scrollAreaId = useId();
  const shouldReduceMotion = useReducedMotion();
  const contentMotion = createFadeSlideMotion(shouldReduceMotion);

  const handleActiveTabChange = (value: string) => {
    if (value === 'scenarios' || value === 'curve' || value === 'personal') {
      setActiveTab(value);
    }
  };

  const renderActiveContent = () => {
    if (activeTab === 'scenarios') return <ScenarioList />;
    if (activeTab === 'curve') return <TimelineCurve />;
    return <PersonalStrategies />;
  };

  useEffect(() => {
    const rootElement = document.getElementById(scrollAreaId);
    const viewportElement = rootElement?.querySelector('[data-slot="scroll-area-viewport"]') as HTMLDivElement | null;
    if (!viewportElement) return;

    const updateDockState = () => {
      const shouldCompact = viewportElement.scrollTop > 36;
      setIsDockCompact((previous) => (previous === shouldCompact ? previous : shouldCompact));
    };

    updateDockState();
    viewportElement.addEventListener('scroll', updateDockState, { passive: true });
    return () => viewportElement.removeEventListener('scroll', updateDockState);
  }, [scrollAreaId]);

  return (
    <div className="flex-1 px-4 pb-4 pt-2 lg:px-10 lg:pb-10 lg:pt-4 relative z-10 animate-in fade-in duration-700 min-h-0">
      <ScrollArea id={scrollAreaId} className="h-full w-full">
        <div className="max-w-6xl mx-auto pr-2 pb-8">
            <div className="mb-8 lg:mb-12 text-center shrink-0">
                    <h2 className="text-3xl lg:text-4xl font-serif font-black text-white mb-4">未来岔路口</h2>
                    <p className="text-slate-400 max-w-3xl mx-auto text-base lg:text-lg font-light">
                        技术已经就位，现在轮到制度做选择。我们是走向新的镀金时代，还是福利社会？
                    </p>
            </div>
            
            <Tabs value={activeTab} onValueChange={handleActiveTabChange} className="flex flex-col gap-6">
              <div
                className={`sticky top-0 z-20 -mx-1 px-1 transition-all duration-300 bg-gradient-to-b from-[#05162b]/95 via-[#05162b]/90 to-transparent backdrop-blur-sm ${isDockCompact ? 'py-1' : 'py-1.5'}`}
              >
                <div className="flex justify-center shrink-0">
                  <TabsList
                    className={`bg-slate-900 rounded-lg border border-slate-800 inline-flex flex-wrap justify-center gap-1 h-auto transition-all duration-300 ${isDockCompact ? 'p-0.5' : 'p-1'}`}
                  >
                    {FUTURE_TAB_OPTIONS.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <TabsTrigger
                          key={tab.value}
                          value={tab.value}
                          className={`font-medium rounded-md transition-all duration-300 flex items-center gap-2 text-slate-500 hover:text-slate-300 data-[state=active]:bg-slate-800 data-[state=active]:text-white data-[state=active]:shadow data-[state=active]:ring-1 data-[state=active]:ring-cyan-500/20 ${isDockCompact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-xs lg:text-sm'}`}
                        >
                          <Icon size={isDockCompact ? 12 : 14} /> {tab.label}
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  className="flex flex-col"
                  initial={contentMotion.initial}
                  animate={contentMotion.animate}
                  exit={contentMotion.exit}
                  transition={contentMotion.transition}
                >
                  {renderActiveContent()}
                </motion.div>
              </AnimatePresence>
            </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
};

export default FutureView;
