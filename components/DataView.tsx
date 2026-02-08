import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import ProductivityChart from './data/ProductivityChart';
import PolarizationChart from './data/PolarizationChart';
import ConceptCards from './data/ConceptCards';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { createFadeSlideMotion } from '@/lib/motion';

type DataTab = 'historical' | 'modern';

interface DataTabOption {
  value: DataTab;
  label: string;
  activeClassName: string;
}

const DATA_TAB_OPTIONS: DataTabOption[] = [
  {
    value: 'historical',
    label: '19世纪：恩格斯停顿',
    activeClassName: 'data-[state=active]:bg-cyan-900/30 data-[state=active]:text-cyan-400',
  },
  {
    value: 'modern',
    label: '21世纪：现代大分流',
    activeClassName: 'data-[state=active]:bg-pink-900/30 data-[state=active]:text-pink-400',
  },
];

const DataView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DataTab>('historical');
  const shouldReduceMotion = useReducedMotion();
  const tabContentMotion = createFadeSlideMotion(shouldReduceMotion, 6, 0.18);
  const gapName = activeTab === 'historical' ? '恩格斯的停顿 (1790-1840)' : '大分流 (1980-2024)';

  const handleActiveTabChange = (value: string) => {
    if (value === 'historical' || value === 'modern') {
      setActiveTab(value);
    }
  };

  return (
    <div className="flex-1 p-4 lg:p-10 flex flex-col items-center relative z-10 animate-in slide-in-from-right-4 duration-500 w-full min-h-0">
      <ScrollArea className="h-full w-full">
        <div className="max-w-5xl w-full space-y-10 pb-20 mx-auto pr-2">
          <div className="text-center space-y-4 py-4">
            <h2 className="text-3xl lg:text-5xl font-serif font-black text-white tracking-tight mb-2">History Rhymes</h2>
            <p className="text-slate-500 font-mono text-xs lg:text-sm uppercase tracking-[0.4em]">Evidence: 1790 vs 2024</p>
          </div>

          <div className="w-full flex flex-col gap-6">
            <div className="mb-2 flex flex-wrap justify-between items-start z-10 shrink-0 gap-4">
              <Tabs value={activeTab} onValueChange={handleActiveTabChange} className="w-auto">
                <TabsList className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 h-auto">
                  {DATA_TAB_OPTIONS.map((tab) => (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className={`px-4 py-2 rounded-md text-sm font-bold transition-all text-slate-500 hover:text-slate-300 data-[state=active]:shadow-lg ${tab.activeClassName}`}
                    >
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                className="w-full flex flex-col gap-6"
                initial={tabContentMotion.initial}
                animate={tabContentMotion.animate}
                exit={tabContentMotion.exit}
                transition={tabContentMotion.transition}
              >
                <div className="w-full min-w-0">
                  <ProductivityChart activeTab={activeTab} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                  <Card className="w-full bg-slate-900/40 border-slate-800 shadow-none">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-slate-300 text-base flex items-center gap-2">
                        <TrendingUp size={18} className={activeTab === 'historical' ? 'text-cyan-400' : 'text-pink-400'} />
                        数据解码: {gapName}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {activeTab === 'historical'
                          ? '在工业革命的前50年，英国人均GDP翻倍，但普通工人的实际工资几乎停滞。这是典型的「取代型」技术冲击阶段。利润流向了购买机器的资本家，直到19世纪后期制度改革跟上，工资才开始追赶产出。'
                          : '自1980年代以来，计算机化带来了巨大的生产力提升，但红利主要流向了顶层1%和高技能人才。普通中产阶级的工资增长与生产力彻底脱钩。这标志着我们进入了新的「恩格斯停顿」。'}
                      </p>
                    </CardContent>
                  </Card>

                  <div className="w-full min-w-0">
                    <PolarizationChart activeTab={activeTab} />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <ConceptCards />
        </div>
      </ScrollArea>
    </div>
  );
};

export default DataView;
