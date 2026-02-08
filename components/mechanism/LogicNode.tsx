
import React from 'react';
import { motion } from 'framer-motion';
import { Node } from '../../types';
import { Info, AlertTriangle, Zap, Sprout, Skull, Ban, Hammer, Hourglass, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogicNodeProps {
  node: Node;
  isSelected: boolean;
  isHovered: boolean;
  isRelated: boolean;
  onSelect: (node: Node) => void;
  setHovered: (id: string | null) => void;
}

interface NodeStyle {
  strokeClass: string;
  fillClass: string;
  textClass: string;
}

const NODE_STYLE_BY_TYPE: Record<Node['type'], NodeStyle> = {
  concept: { strokeClass: 'stroke-cyan-400', fillClass: 'fill-cyan-900/20', textClass: 'text-cyan-400' },
  cause: { strokeClass: 'stroke-amber-400', fillClass: 'fill-amber-900/20', textClass: 'text-amber-400' },
  effect: { strokeClass: 'stroke-rose-500', fillClass: 'fill-rose-900/20', textClass: 'text-rose-500' },
  solution: { strokeClass: 'stroke-emerald-400', fillClass: 'fill-emerald-900/20', textClass: 'text-emerald-400' },
  trap: { strokeClass: 'stroke-slate-500', fillClass: 'fill-slate-800/50', textClass: 'text-slate-500' },
};

const getNodeIcon = (node: Node) => {
  if (node.id === 'ford_paradox') return <Ban size={24} />;
  if (node.id === 'resistance') return <Hammer size={24} />;
  if (node.id === 'institution_gap') return <Hourglass size={24} />;
  if (node.id === 'short_term') return <Activity size={24} />;

  if (node.type === 'cause') return <Zap size={24} />;
  if (node.type === 'effect') return <AlertTriangle size={24} />;
  if (node.type === 'solution') return <Sprout size={24} />;
  if (node.type === 'trap') return <Skull size={24} />;
  return <Info size={24} />;
};

const getNodeStyle = (node: Node): NodeStyle => {
  if (node.id === 'ford_paradox') {
    return { strokeClass: 'stroke-rose-500', fillClass: 'fill-rose-900/20', textClass: 'text-rose-500' };
  }

  if (node.id === 'resistance') {
    return { strokeClass: 'stroke-orange-500', fillClass: 'fill-orange-900/20', textClass: 'text-orange-500' };
  }

  return NODE_STYLE_BY_TYPE[node.type];
};

const LogicNode: React.FC<LogicNodeProps> = ({ node, isSelected, isHovered, isRelated, onSelect, setHovered }) => {
  const nodeStyle = getNodeStyle(node);
  const nodeIcon = getNodeIcon(node);
  const isDecisionNode = node.id === 'institution_gap';
  const isActiveNode = isSelected || isHovered;
  const opacity = isRelated ? 1 : 0.2;

  const handleSelect = () => onSelect(node);
  const handleKeyDown = (event: React.KeyboardEvent<SVGGElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSelect();
    }
  };

  return (
    <motion.g
      onClick={handleSelect}
      onMouseEnter={() => setHovered(node.id)}
      onMouseLeave={() => setHovered(null)}
      onFocus={() => setHovered(node.id)}
      onBlur={() => setHovered(null)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      focusable
      aria-label={`查看节点：${node.label}`}
      className="cursor-pointer group transition-opacity duration-500"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity, scale: isActiveNode ? 1.04 : 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {isDecisionNode ? (
        <motion.rect
          x={node.x - (isActiveNode ? 50 : 40)}
          y={node.y - (isActiveNode ? 50 : 40)}
          width={isActiveNode ? 100 : 80}
          height={isActiveNode ? 100 : 80}
          className={cn('fill-current transition-all duration-700 ease-in-out', nodeStyle.textClass)}
          style={{
            opacity: isActiveNode ? 0.25 : 0.05,
            transformBox: 'fill-box',
            transformOrigin: 'center',
            transform: 'rotate(45deg)',
          }}
        />
      ) : (
        <motion.circle
          cx={node.x}
          cy={node.y}
          r={isActiveNode ? 60 : 45}
          className={cn('fill-current transition-all duration-700 ease-in-out', nodeStyle.textClass)}
          style={{
            opacity: isActiveNode ? 0.25 : 0.05,
            transformBox: 'fill-box',
            transformOrigin: 'center',
          }}
        />
      )}

      {isDecisionNode ? (
        <rect
          x={node.x - 28}
          y={node.y - 28}
          width="56"
          height="56"
          className={cn(
            nodeStyle.strokeClass,
            nodeStyle.fillClass,
            'bg-slate-950 transition-all duration-300 ease-out',
            isActiveNode ? 'stroke-[3px]' : 'stroke-[1.5px]',
            'animate-pulse'
          )}
          fill="#020617"
          transform={`rotate(45, ${node.x}, ${node.y})`}
          filter={isActiveNode ? 'url(#glow-node)' : ''}
        />
      ) : (
        <circle
          cx={node.x}
          cy={node.y}
          r="36"
          className={cn(
            nodeStyle.strokeClass,
            nodeStyle.fillClass,
            'bg-slate-950 transition-all duration-300 ease-out',
            isActiveNode ? 'stroke-[3px]' : 'stroke-[1.5px]'
          )}
          fill="#020617"
          filter={isActiveNode ? 'url(#glow-node)' : ''}
        />
      )}

      <foreignObject x={node.x - 12} y={node.y - 12} width="24" height="24" className={cn('pointer-events-none', nodeStyle.textClass)}>
        <div className="flex items-center justify-center w-full h-full transition-transform duration-300 group-hover:scale-110">
          {nodeIcon}
        </div>
      </foreignObject>

      <text
        x={node.x}
        y={node.y + 70}
        textAnchor="middle"
        className={cn(
          'text-sm font-bold pointer-events-none transition-all duration-300',
          isActiveNode ? 'fill-white' : 'fill-slate-300'
        )}
        style={{
          paintOrder: 'stroke',
          stroke: '#020617',
          strokeWidth: '4px',
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }}
      >
        {node.label}
      </text>

      <text
        x={node.x}
        y={node.y - 50}
        textAnchor="middle"
        className="fill-slate-500 text-[9px] font-mono uppercase tracking-[0.2em] opacity-60"
      >
        {node.type}
      </text>
    </motion.g>
  );
};

export default LogicNode;
