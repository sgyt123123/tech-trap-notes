import React, { useState, useEffect } from 'react';
import { AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts';
import { ENGELS_PAUSE_DATA, MODERN_DIVERGENCE_DATA, DATA_SOURCES } from '../../constants';

interface ProductivityChartProps {
  activeTab: 'historical' | 'modern';
}

const ProductivityChart: React.FC<ProductivityChartProps> = ({ activeTab }) => {
  const currentData = activeTab === 'historical' ? ENGELS_PAUSE_DATA : MODERN_DIVERGENCE_DATA;
  const chartColor = activeTab === 'historical' ? '#22d3ee' : '#f472b6';
  
  // State to ensure chart only renders after layout is stable
  const [isChartReady, setIsChartReady] = useState(false);

  useEffect(() => {
    // Delay rendering slightly to allow parent container to calculate width
    const timer = setTimeout(() => {
      setIsChartReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full bg-slate-900/40 p-6 lg:p-8 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col">
        {/* Integrated Top Legend */}
        <div className="mb-6 flex flex-wrap justify-between items-start border-b border-slate-800/60 pb-4 relative z-10 shrink-0 gap-4">
             <div className="flex flex-col gap-1">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    {activeTab === 'historical' ? '19世纪：恩格斯停顿' : '21世纪：现代大分流'}
                </div>
            </div>
            
            <div className="flex gap-4 lg:gap-6 bg-slate-950/60 p-3 rounded-xl border border-slate-800 backdrop-blur-sm">
                <div className="flex flex-col gap-1">
                    <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${activeTab === 'historical' ? 'text-cyan-400' : 'text-pink-400'}`}>
                        <div className={`w-3 h-3 rounded-full shadow-[0_0_10px] ${activeTab === 'historical' ? 'bg-cyan-400 shadow-cyan-400' : 'bg-pink-400 shadow-pink-400'}`}></div>
                        产出 (GDP/Productivity)
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-slate-300 text-xs font-bold uppercase tracking-wider">
                        <div className="w-8 h-0.5 border-t-2 border-dashed border-slate-300"></div>
                        工资中位数 (Wages)
                    </div>
                </div>
            </div>
        </div>
        
        {/* Main Chart Area with explicit height */}
        <div className="w-full h-[320px] sm:h-[380px] lg:h-[420px] relative min-w-0">
            <div className="absolute top-4 left-4 z-0 pointer-events-none">
                 <h3 className={`text-4xl font-serif font-black opacity-10 ${activeTab === 'historical' ? 'text-cyan-400' : 'text-pink-400'}`}>
                    {activeTab === 'historical' ? 'THE PAUSE' : 'THE DIVERGENCE'}
                 </h3>
            </div>

            {isChartReady && (
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                    <AreaChart data={currentData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                    <defs>
                        <linearGradient id="productivityFade" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={chartColor} stopOpacity={0.2}/>
                            <stop offset="95%" stopColor={chartColor} stopOpacity={0.01}/>
                        </linearGradient>
                    </defs>
                    
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis 
                        dataKey="year" 
                        stroke="#64748b" 
                        tick={{fontSize: 12, fontFamily: 'monospace'}}
                        tickMargin={15}
                        axisLine={false}
                    />
                    <YAxis 
                        stroke="#64748b" 
                        tick={{fontSize: 12, fontFamily: 'monospace'}}
                        axisLine={false}
                        tickLine={false}
                        domain={['auto', 'auto']}
                    />
                    
                    <Tooltip 
                        cursor={{ stroke: '#fff', strokeWidth: 1, strokeDasharray: '4 4', opacity: 0.3 }}
                        content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                                const prod = payload.find(p => p.dataKey === 'productivity')?.value as number;
                                const wage = payload.find(p => p.dataKey === 'wages')?.value as number;
                                const gap = prod - wage;
                                const event = payload[0].payload.event;

                                return (
                                    <div className="bg-slate-900/95 border border-slate-700 p-4 rounded-xl shadow-2xl backdrop-blur-md min-w-[200px]">
                                        <div className="text-slate-400 font-mono text-xs mb-2">{label}</div>
                                        <div className="space-y-2 mb-4">
                                            <div className="flex justify-between items-center">
                                                <span className={`text-sm font-bold ${activeTab === 'historical' ? 'text-cyan-400' : 'text-pink-400'}`}>产出</span>
                                                <span className="font-mono text-white">{prod}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-slate-400 text-sm font-bold">工资</span>
                                                <span className="font-mono text-slate-300">{wage}</span>
                                            </div>
                                        </div>
                                        {gap > 5 && (
                                            <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-2 mb-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-[10px] text-red-400 uppercase tracking-widest font-bold">Gap</span>
                                                    <span className="text-red-400 font-mono font-black">+{gap.toFixed(0)} pts</span>
                                                </div>
                                            </div>
                                        )}
                                        {event && (
                                            <div className="text-xs text-amber-400 italic mt-2 pt-2 border-t border-slate-800">
                                                "{event}"
                                            </div>
                                        )}
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    
                    {/* Highlight Areas */}
                    {activeTab === 'historical' ? (
                        <ReferenceArea x1={1790} x2={1840} fill="#f87171" fillOpacity="0.05" />
                    ) : (
                        <ReferenceArea x1={2000} x2={2024} fill="#f87171" fillOpacity="0.05" />
                    )}

                    <Area type="monotone" dataKey="productivity" stroke="none" fill="url(#productivityFade)" />
                    <Line 
                        type="monotone" 
                        dataKey="productivity" 
                        stroke={chartColor} 
                        strokeWidth={3}
                        dot={false}
                        activeDot={{ r: 6, fill: chartColor, stroke: '#0f172a' }}
                    />
                    <Line 
                        type="monotone" 
                        dataKey="wages" 
                        stroke="#cbd5e1" 
                        strokeWidth={2}
                        strokeDasharray="6 6"
                        dot={false}
                        activeDot={{ r: 6, fill: '#cbd5e1', stroke: '#0f172a' }}
                    />
                    </AreaChart>
                </ResponsiveContainer>
            )}
        </div>
         {/* Source Citation Footer */}
         <div className="mt-2 pt-3 border-t border-slate-800/50 flex justify-between items-center">
            <div className="flex items-center gap-2 opacity-50 text-[10px] text-slate-400 font-mono">
                <span>
                    {activeTab === 'historical' ? DATA_SOURCES.engels : DATA_SOURCES.modern}
                </span>
            </div>
            <span className="text-[10px] text-slate-600 font-mono uppercase tracking-widest">Stylized Data</span>
        </div>
    </div>
  );
};

export default ProductivityChart;
