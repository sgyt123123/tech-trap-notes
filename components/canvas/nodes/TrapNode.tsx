import React from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import {
  Activity,
  AlertTriangle,
  Ban,
  Hammer,
  Hourglass,
  Info,
  Skull,
  Sprout,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TrapFlowNode } from '@/lib/flow/adapters';

interface NodeVisualStyle {
  borderClass: string;
  glowClass: string;
  textClass: string;
  backgroundClass: string;
}

type TrapNodeType = TrapFlowNode['data']['trapNode']['type'];

const NODE_STYLE_BY_TYPE: Record<TrapNodeType, NodeVisualStyle> = {
  concept: {
    borderClass: 'border-cyan-300/80',
    glowClass: 'shadow-[0_0_34px_rgba(34,211,238,0.42)]',
    textClass: 'text-cyan-100',
    backgroundClass: 'bg-cyan-900/65',
  },
  cause: {
    borderClass: 'border-amber-300/80',
    glowClass: 'shadow-[0_0_34px_rgba(251,191,36,0.38)]',
    textClass: 'text-amber-100',
    backgroundClass: 'bg-amber-900/65',
  },
  effect: {
    borderClass: 'border-rose-300/80',
    glowClass: 'shadow-[0_0_34px_rgba(244,63,94,0.38)]',
    textClass: 'text-rose-100',
    backgroundClass: 'bg-rose-900/65',
  },
  solution: {
    borderClass: 'border-emerald-300/80',
    glowClass: 'shadow-[0_0_34px_rgba(16,185,129,0.38)]',
    textClass: 'text-emerald-100',
    backgroundClass: 'bg-emerald-900/65',
  },
  trap: {
    borderClass: 'border-slate-300/70',
    glowClass: 'shadow-[0_0_34px_rgba(148,163,184,0.36)]',
    textClass: 'text-slate-100',
    backgroundClass: 'bg-slate-800/70',
  },
};

function getNodeIcon(nodeId: string, nodeType: TrapNodeType): React.ReactNode {
  if (nodeId === 'ford_paradox') return <Ban size={18} />;
  if (nodeId === 'resistance') return <Hammer size={18} />;
  if (nodeId === 'institution_gap') return <Hourglass size={18} />;
  if (nodeId === 'short_term') return <Activity size={18} />;

  if (nodeType === 'cause') return <Zap size={18} />;
  if (nodeType === 'effect') return <AlertTriangle size={18} />;
  if (nodeType === 'solution') return <Sprout size={18} />;
  if (nodeType === 'trap') return <Skull size={18} />;
  return <Info size={18} />;
}

const TrapNode: React.FC<NodeProps<TrapFlowNode>> = ({ data, selected }) => {
  const { trapNode, isRelated, isStoryHighlighted } = data;
  const style = NODE_STYLE_BY_TYPE[trapNode.type];
  const nodeIcon = getNodeIcon(trapNode.id, trapNode.type);
  const isActive = selected || data.isSelected;

  return (
    <div
      className={cn(
        'w-[268px] rounded-[22px] border backdrop-blur-md transition-all duration-500 px-5 py-[18px]',
        style.borderClass,
        style.backgroundClass,
        isActive && style.glowClass,
        isActive ? 'scale-[1.05] ring-1 ring-white/35' : 'scale-100',
        isRelated ? 'opacity-100' : 'opacity-72 grayscale-[0.06]',
        isActive && 'animate-pulse-subtle',
      )}
      aria-label={`节点 ${trapNode.label}`}
    >
      <Handle id="target-top" type="target" position={Position.Top} className="!w-1 !h-1 !bg-transparent !border-0 !opacity-0" />
      <Handle id="target-bottom" type="target" position={Position.Bottom} className="!w-1 !h-1 !bg-transparent !border-0 !opacity-0" />
      <Handle id="target-left" type="target" position={Position.Left} className="!w-1 !h-1 !bg-transparent !border-0 !opacity-0" />
      <Handle id="target-right" type="target" position={Position.Right} className="!w-1 !h-1 !bg-transparent !border-0 !opacity-0" />
      <Handle id="source-top" type="source" position={Position.Top} className="!w-1 !h-1 !bg-transparent !border-0 !opacity-0" />
      <Handle id="source-bottom" type="source" position={Position.Bottom} className="!w-1 !h-1 !bg-transparent !border-0 !opacity-0" />
      <Handle id="source-left" type="source" position={Position.Left} className="!w-1 !h-1 !bg-transparent !border-0 !opacity-0" />
      <Handle id="source-right" type="source" position={Position.Right} className="!w-1 !h-1 !bg-transparent !border-0 !opacity-0" />

      <div className="flex items-center justify-between gap-2">
        <div className={cn('inline-flex items-center gap-1.5', style.textClass)}>
          {nodeIcon}
          <span className="text-base font-bold tracking-wide leading-none">{trapNode.label}</span>
        </div>
        <span className="text-[11px] uppercase tracking-wider text-slate-100/90">{trapNode.type}</span>
      </div>

      <p className="text-[13px] leading-snug text-slate-100/95 mt-2.5 line-clamp-3">{trapNode.description}</p>

      {isStoryHighlighted ? (
        <div className="mt-2 h-0.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.7)]" />
      ) : null}
    </div>
  );
};

export default TrapNode;
