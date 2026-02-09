import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PERSONAL_STRATEGIES } from '../../constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createFadeInMotion, createFadeSlideMotion } from '@/lib/motion';

const PersonalStrategies: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const sectionMotion = createFadeInMotion(shouldReduceMotion);
  const strategyMotion = createFadeSlideMotion(shouldReduceMotion, 10, 0.22);

  return (
    <Card className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden relative shadow-none animate-in fade-in slide-in-from-bottom-4 duration-500">
      <CardHeader className="px-4 lg:px-8 pt-6 lg:pt-8 pb-2 text-center shrink-0">
        <CardTitle className="text-2xl lg:text-3xl font-serif font-black text-white mb-2">个体进化策略：与 AI 共舞</CardTitle>
        <p className="text-slate-400 text-sm">在算法洪流中，建立不可替代的人类护城河</p>
      </CardHeader>
      <CardContent className="px-4 lg:px-8 pb-6 lg:pb-8 pt-0">
          <motion.div
            className="max-w-4xl mx-auto flex flex-col py-6 pr-2"
            initial={sectionMotion.initial}
            animate={sectionMotion.animate}
            transition={sectionMotion.transition}
          >
            <div className="flex flex-col gap-4 relative">
              <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-slate-700 hidden lg:block opacity-30"></div>

              {PERSONAL_STRATEGIES.map((strategy, index) => {
                const Icon = strategy.icon;
                const isPriority = index === 0;

                return (
                  <motion.article
                    key={strategy.title}
                    className="flex gap-4 lg:gap-8 group"
                    initial={strategyMotion.initial}
                    animate={strategyMotion.animate}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { ...strategyMotion.transition, delay: index * 0.04 }
                    }
                  >
                    <div className="hidden lg:flex flex-col items-center justify-center w-16 shrink-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 z-10 bg-slate-950 transition-colors ${isPriority ? 'border-purple-500 text-purple-400 group-hover:bg-purple-500/10' : 'border-slate-700 text-slate-500 group-hover:border-cyan-500 group-hover:text-cyan-400'}`}>
                        <Icon size={20} />
                      </div>
                    </div>

                    <div className={`flex-1 p-6 rounded-xl border transition-all duration-300 hover:translate-x-2 ${isPriority ? 'bg-purple-900/10 border-purple-500/30' : 'bg-slate-950 border-slate-800 hover:border-cyan-500/30'}`}>
                      <div className="flex justify-between items-start mb-2 gap-3">
                        <h4 className={`text-lg font-bold ${isPriority ? 'text-purple-400' : 'text-slate-200 group-hover:text-cyan-400'}`}>{strategy.title}</h4>
                        <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono border border-slate-800 px-2 py-0.5 rounded shrink-0">{strategy.level}</span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {strategy.skills.map((skill) => (
                          <span key={skill} className="text-xs bg-black/30 px-2 py-1 rounded text-slate-400 border border-white/5">
                            {skill}
                          </span>
                        ))}
                      </div>

                      <p className="text-sm text-slate-500 leading-relaxed italic border-l-2 border-slate-800 pl-3">
                        "{strategy.desc}"
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </motion.div>
      </CardContent>
    </Card>
  );
};

export default PersonalStrategies;
