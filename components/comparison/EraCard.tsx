import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { HistoricalEra } from '../../types';
import { ERAS } from '../../constants';
import { Brain, Factory, Cpu, Zap, Users } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { createFadeSlideMotion } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface EraCardProps {
  era: HistoricalEra;
  setEra: (e: HistoricalEra) => void;
  label: string;
}

const EraCard: React.FC<EraCardProps> = ({ era, setEra, label }) => {
  const isReplacing = era.type === 'replacing';
  const shouldReduceMotion = useReducedMotion();
  const contentMotion = createFadeSlideMotion(shouldReduceMotion, 5, 0.16);
  const accentColor = isReplacing ? 'text-red-400 border-red-500/30 bg-red-500/5' : 'text-green-400 border-green-500/30 bg-green-500/5';
  const Icon = era.id.includes('AI') ? Brain : era.id.includes('IR1') ? Factory : era.id.includes('IR3') ? Cpu : Zap;

  return (
    <Card
      className={cn(
        'rounded-xl p-1 transition-all h-full flex flex-col bg-transparent',
        isReplacing ? 'border-red-900/50' : 'border-green-900/50'
      )}
    >
      <CardContent className="h-full bg-slate-900/80 rounded-lg p-4 lg:p-6 relative overflow-hidden group flex flex-col">
        <div
          className={cn(
            'absolute -top-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity scale-150',
            isReplacing ? 'text-red-500' : 'text-green-500'
          )}
        >
          <Icon size={120} />
        </div>

        <div className="flex justify-between items-center mb-4 relative z-10 shrink-0">
          <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest flex items-center gap-2">
            {label}
          </p>
          <div className={cn('px-2 py-0.5 text-[10px] uppercase font-bold rounded border', accentColor)}>
            {isReplacing ? '取代型 (Replacing)' : '赋能型 (Enabling)'}
          </div>
        </div>

        <div className="mb-6 shrink-0">
          <Select
            value={era.id}
            onValueChange={(value) => {
              const nextEra = ERAS.find((item) => item.id === value);
              if (nextEra) {
                setEra(nextEra);
              }
            }}
          >
            <SelectTrigger
              aria-label={`${label}时期选择`}
              className="w-full bg-slate-950 border-slate-800 text-white hover:bg-slate-900 hover:border-cyan-500/50 focus-visible:ring-cyan-500/30"
            >
              <SelectValue placeholder="请选择时期" />
            </SelectTrigger>
            <SelectContent className="bg-slate-950 border-slate-800 text-slate-200">
              {ERAS.map((item) => (
                <SelectItem
                  key={item.id}
                  value={item.id}
                  className="focus:bg-cyan-950/40 focus:text-cyan-300 data-[state=checked]:text-cyan-300"
                >
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="mt-2 text-[10px] text-cyan-500 font-medium">点击切换时期</p>
        </div>

        <ScrollArea className="relative z-10 flex-1 min-h-0">
          <motion.div
            key={era.id}
            className="space-y-6 pr-2 custom-scrollbar"
            initial={contentMotion.initial}
            animate={contentMotion.animate}
            transition={contentMotion.transition}
          >
            <div>
              <div className="text-4xl lg:text-6xl font-black text-slate-800 mb-2 font-serif">{era.yearStart}</div>
              <div className={cn('h-1 w-16 mb-4', isReplacing ? 'bg-red-500' : 'bg-green-500')}></div>
              <p className="text-slate-300 text-sm leading-relaxed">{era.description}</p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase mb-3 flex items-center gap-2">
                <Zap size={12} /> 关键技术
              </h4>
              <div className="flex flex-wrap gap-2">
                {era.keyTechnologies.map((technology) => (
                  <span key={technology} className="text-xs font-medium bg-slate-950 border border-slate-800 px-2.5 py-1 rounded text-slate-400">
                    {technology}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-500 uppercase mb-3 flex items-center gap-2">
                <Users size={12} /> 社会影响
              </h4>
              <p className="text-xs text-slate-400 italic border-l-2 border-slate-800 pl-3">{era.socialImpact}</p>
            </div>
          </motion.div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default EraCard;
