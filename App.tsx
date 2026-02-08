import React, { useState } from 'react';
import MechanismView from './components/MechanismView';
import DataView from './components/DataView';
import ComparisonView from './components/ComparisonView';
import FutureView from './components/FutureView';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  LayoutDashboard,
  GitGraph,
  Compass,
  Binary,
  History,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { createFadeSlideMotion } from '@/lib/motion';

enum ViewMode {
  MECHANISM = 'mechanism',
  DATA = 'data',
  COMPARE = 'compare',
  FUTURE = 'future'
}

interface NavItemConfig {
  mode: ViewMode;
  icon: LucideIcon;
  label: string;
  subLabel: string;
}

const NAV_ITEMS: NavItemConfig[] = [
  { mode: ViewMode.MECHANISM, icon: GitGraph, label: '机制', subLabel: 'The Mechanism' },
  { mode: ViewMode.DATA, icon: LayoutDashboard, label: '数据', subLabel: 'The Evidence' },
  { mode: ViewMode.COMPARE, icon: History, label: '镜像', subLabel: 'The History' },
  { mode: ViewMode.FUTURE, icon: Compass, label: '未来', subLabel: 'The Choice' },
];

interface AppNavItemProps {
  isActive: boolean;
  item: NavItemConfig;
}

const AppNavItem: React.FC<AppNavItemProps> = ({ isActive, item }) => {
  const { icon: Icon, label, subLabel, mode } = item;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <TabsTrigger
          value={mode}
          asChild
          className="p-0 h-auto bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none border-0"
        >
          <Button
            type="button"
            variant="ghost"
            className={cn(
              'relative h-10 lg:h-11 px-3 lg:px-4 rounded-xl transition-all duration-300 inline-flex items-center justify-center min-w-[72px] lg:min-w-[92px] border border-transparent',
              'text-slate-500 hover:text-slate-300 hover:bg-slate-900/50',
              isActive && 'bg-slate-800/80 text-white shadow-lg border-slate-700 ring-1 ring-cyan-500/20'
            )}
          >
            <Icon size={16} className={cn('opacity-70', isActive && 'text-cyan-400 opacity-100')} />
            <span className="text-sm font-bold tracking-wide">{label}</span>
            <div
              className={cn(
                'absolute -bottom-px left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-cyan-500 shadow-[0_0_10px_#06b6d4] transition-opacity',
                isActive ? 'opacity-100' : 'opacity-0'
              )}
            ></div>
          </Button>
        </TabsTrigger>
      </TooltipTrigger>
      <TooltipContent side="bottom" sideOffset={6}>
        {subLabel}
      </TooltipContent>
    </Tooltip>
  );
};

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.MECHANISM);
  const shouldReduceMotion = useReducedMotion();
  const contentMotion = createFadeSlideMotion(shouldReduceMotion);

  const handleViewModeChange = (value: string) => {
    if (!Object.values(ViewMode).includes(value as ViewMode)) {
      return;
    }

    setViewMode(value as ViewMode);
  };

  const renderCurrentView = () => {
    if (viewMode === ViewMode.MECHANISM) return <MechanismView />;
    if (viewMode === ViewMode.DATA) return <DataView />;
    if (viewMode === ViewMode.COMPARE) return <ComparisonView />;
    return <FutureView />;
  };

  return (
    <Tabs
      value={viewMode}
      onValueChange={handleViewModeChange}
      className="h-screen w-screen flex flex-col bg-[#020617] text-slate-200 font-sans overflow-hidden selection:bg-cyan-500/30"
    >
      <header className="h-16 lg:h-[72px] border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl sticky top-0 z-50 flex items-center justify-between px-3 lg:px-8 shrink-0 gap-3">
        <div className="flex items-center gap-3 lg:gap-4 min-w-0">
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-cyan-900 to-slate-900 rounded-xl border border-cyan-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            <Binary size={20} className="text-cyan-400 lg:w-6 lg:h-6" />
          </div>
          <div className="min-w-0">
            <h1 className="text-base lg:text-xl font-black tracking-tight text-white leading-none mb-1 font-serif truncate">The Technology Trap</h1>
            <p className="text-[9px] lg:text-[10px] text-slate-500 font-mono uppercase tracking-[0.3em] hidden sm:block">Knowledge Visualization</p>
          </div>
        </div>

        <div className="min-w-0 flex-1 max-w-[62vw] sm:max-w-[66vw] lg:max-w-none">
          <TooltipProvider delayDuration={120}>
            <TabsList
              variant="line"
              className="flex items-center bg-slate-950/50 p-1 rounded-xl border border-white/5 backdrop-blur-md overflow-x-auto no-scrollbar h-auto gap-0 justify-start"
            >
              {NAV_ITEMS.map((item, index) => (
                <React.Fragment key={item.mode}>
                  <AppNavItem isActive={viewMode === item.mode} item={item} />
                  {index < NAV_ITEMS.length - 1 && (
                    <Separator orientation="vertical" className="hidden sm:block h-5 lg:h-6 bg-slate-800 mx-1" />
                  )}
                </React.Fragment>
              ))}
            </TabsList>
          </TooltipProvider>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden relative bg-[#020617]">
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/5 blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/5 blur-[120px] animate-pulse delay-700"></div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            className="flex-1 flex min-h-0 relative z-10"
            initial={contentMotion.initial}
            animate={contentMotion.animate}
            exit={contentMotion.exit}
            transition={contentMotion.transition}
          >
            {renderCurrentView()}
          </motion.div>
        </AnimatePresence>
      </main>
    </Tabs>
  );
};

export default App;
