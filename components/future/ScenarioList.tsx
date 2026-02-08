import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FUTURE_SCENARIOS } from '../../constants';
import { History, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { createFadeInMotion, createFadeSlideMotion } from '@/lib/motion';

const ScenarioList: React.FC = () => {
    const shouldReduceMotion = useReducedMotion();
    const listMotion = createFadeInMotion(shouldReduceMotion);
    const cardMotion = createFadeSlideMotion(shouldReduceMotion, 10, 0.22);

    return (
        <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0 pb-6"
            initial={listMotion.initial}
            animate={listMotion.animate}
            transition={listMotion.transition}
        >
            {FUTURE_SCENARIOS.map((scenario, index) => {
                const Icon = scenario.icon;
                return (
                    <motion.div
                        key={scenario.id}
                        initial={cardMotion.initial}
                        animate={cardMotion.animate}
                        transition={
                            shouldReduceMotion
                                ? { duration: 0 }
                                : { ...cardMotion.transition, delay: index * 0.04 }
                        }
                    >
                    <Card className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-all group flex flex-col relative overflow-hidden min-h-[400px] lg:min-h-[450px] shadow-none">
                        <div className={`absolute top-0 left-0 w-full h-1 ${scenario.id === 'nordic' ? 'bg-green-500' : scenario.id === 'us' ? 'bg-cyan-500' : 'bg-yellow-500'}`}></div>
                        
                        <CardHeader className="px-6 pt-6 pb-4 flex flex-row items-start gap-3 shrink-0">
                            <div className={`p-3 rounded-lg bg-slate-950 border border-slate-800 ${scenario.color}`}>
                                <Icon size={24} />
                            </div>
                            <CardTitle className={`font-bold text-lg leading-tight ${scenario.color}`}>{scenario.name}</CardTitle>
                        </CardHeader>

                        <CardContent className="px-6 pt-0 pb-6 flex-1 min-h-0">
                        <ScrollArea className="h-[clamp(260px,38vh,360px)] pr-2">
                        <div className="space-y-8">
                            <div>
                                <h4 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">核心机制</h4>
                                <ul className="space-y-2">
                                    {scenario.mechanism.map((mechanism) => (
                                        <li key={mechanism} className="text-sm text-slate-300 flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-1.5 shrink-0"></div>
                                            {mechanism}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/50">
                                <h4 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2 flex items-center gap-1">
                                    <History size={10} /> 历史镜像
                                </h4>
                                <p className="text-xs text-slate-400 leading-relaxed">{scenario.history}</p>
                            </div>

                            <div>
                                <h4 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">2035 预测结果</h4>
                                <ul className="space-y-2">
                                    {scenario.outcome.map((outcome, index) => (
                                        <li key={`${scenario.id}-${outcome}-${index}`} className="text-xs text-slate-300 flex items-center gap-2 font-medium">
                                            {outcome.startsWith('✓') ? <CheckCircle size={12} className="text-green-500 shrink-0" /> : 
                                             outcome.startsWith('❌') ? <XCircle size={12} className="text-red-500 shrink-0" /> : 
                                             <AlertTriangle size={12} className="text-yellow-500 shrink-0" />}
                                            {outcome.substring(2)}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-slate-950 p-4 rounded-lg border border-red-900/40">
                                <h4 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2 flex items-center gap-1">
                                    <AlertTriangle size={10} className="text-red-400" /> 主要风险
                                </h4>
                                <p className="text-xs text-slate-400 leading-relaxed">{scenario.risk}</p>
                            </div>
                        </div>
                        </ScrollArea>
                        </CardContent>
                    </Card>
                    </motion.div>
                )
            })}
        </motion.div>
    );
};

export default ScenarioList;
