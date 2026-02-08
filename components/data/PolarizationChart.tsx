import React, { useState, useEffect } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Users } from 'lucide-react';
import { DATA_SOURCES } from '../../constants';

interface PolarizationChartProps {
  activeTab: 'historical' | 'modern';
}

const PolarizationChart: React.FC<PolarizationChartProps> = ({ activeTab }) => {
  // Polarization Data (The Dumbbell Shape)
  const POLARIZATION_DATA = [
    { skill: '低技能 (服务)', change: 15, fill: '#cbd5e1', label: '护工/清洁/餐饮' },
    { skill: '中等技能 (常规)', change: -40, fill: '#f87171', label: '文员/会计/装配' },
    { skill: '高技能 (抽象)', change: 25, fill: '#34d399', label: '管理/研发/创意' },
  ];

  // State control to delay render until container dimensions are valid
  const [isChartReady, setIsChartReady] = useState(false);

  useEffect(() => {
    // Reset readiness when tab changes
    setIsChartReady(false);
    
    // Wait for next tick/layout paint before rendering chart
    const timer = setTimeout(() => {
        if (activeTab === 'modern') {
            setIsChartReady(true);
        }
    }, 100);

    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl flex flex-col w-full h-full">
        <h4 className="text-slate-300 font-bold mb-4 flex items-center gap-2">
            <Users size={18} className="text-amber-400" />
            {activeTab === 'historical' ? '19世纪：去技能化 (Deskilling)' : '21世纪：哑铃型分化 (Polarization)'}
        </h4>
        
        {activeTab === 'modern' ? (
        <div className="w-full h-[220px] sm:h-[240px] relative min-w-0">
            {isChartReady && (
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <BarChart data={POLARIZATION_DATA} layout="vertical" margin={{ left: 12, right: 12 }}>
                    <XAxis type="number" hide />
                    <YAxis
                        dataKey="skill"
                        type="category"
                        width={88}
                        tick={{ fontSize: 10, fill: '#94a3b8' }}
                        tickFormatter={(value) => value.replace(/\s*\(.+\)/, '')}
                    />
                    <Tooltip 
                        cursor={{fill: 'transparent'}}
                        content={({payload}) => {
                            if(payload && payload.length) {
                                return <div className="bg-slate-900 p-2 border border-slate-700 text-xs text-white rounded">{payload[0].payload.label}: {payload[0].value}%</div>
                            }
                            return null;
                        }} 
                    />
                    <Bar dataKey="change" barSize={20} radius={[0, 4, 4, 0]}>
                        {POLARIZATION_DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                    </Bar>
                </BarChart>
                </ResponsiveContainer>
            )}
            {/* Fallback loading state or placeholder to maintain layout if needed */}
            {!isChartReady && <div className="absolute inset-0" />}

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <div className="text-[100px] text-slate-500 font-black tracking-tighter">I X I</div>
            </div>
        </div>
        ) : (
            <div className="flex-1 flex items-center justify-center text-center min-h-[150px]">
                <div className="text-sm text-slate-500">
                    <p className="mb-2"><span className="text-red-400 font-bold">工匠 ↓</span> 技能贬值</p>
                    <p><span className="text-slate-400 font-bold">普工 ↑</span> 需求激增</p>
                    <p className="text-xs mt-2 opacity-60">(单一维度的向下流动)</p>
                </div>
            </div>
        )}
        <div className="mt-2 pt-2 border-t border-slate-800/50 flex flex-col gap-1 items-center">
            <p className="text-xs text-slate-500 text-center">
                {activeTab === 'modern' ? "中产阶级空心化：高薪与低薪岗位增长，中等技能消失。" : "手工技能被机器归零，劳动力同质化。"}
            </p>
            {activeTab === 'modern' && (
                <p className="text-[9px] text-slate-600 font-mono text-center">
                    {DATA_SOURCES.polarization}
                </p>
            )}
        </div>
    </div>
  );
};

export default PolarizationChart;
