import React, { useMemo, useState } from 'react';
import { TRAP_LOGIC_MAP } from '../../constants';
import { Node } from '../../types';
import { Keyboard, MousePointerClick } from 'lucide-react';
import LogicNode from './LogicNode';
import LogicLink from './LogicLink';
import { Card } from '@/components/ui/card';

interface LogicMapProps {
  onNodeSelect: (node: Node) => void;
  selectedNodeId: string | null;
}

const LogicMap: React.FC<LogicMapProps> = ({ onNodeSelect, selectedNodeId }) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const activeNodeId = hoveredNode || selectedNodeId;
  const nodesById = useMemo(
    () => new Map(TRAP_LOGIC_MAP.nodes.map((node) => [node.id, node])),
    []
  );

  return (
    <Card className="w-full overflow-hidden bg-slate-950 rounded-2xl border border-slate-800/60 shadow-2xl relative group selection:bg-cyan-500/30 p-0">
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      ></div>

      <div className="absolute top-6 left-8 z-10 pointer-events-none">
        <h3 className="text-3xl font-serif font-black text-slate-100 flex items-center gap-3">
          机制图谱
          <span className="text-xs font-sans font-normal text-slate-500 bg-slate-900/80 px-2 py-1 rounded border border-slate-800 backdrop-blur">
            System Dynamics
          </span>
        </h3>
      </div>

      <svg
        viewBox="0 0 900 1200"
        className="w-full h-auto min-h-[680px] lg:min-h-[800px] relative z-20"
        role="img"
        aria-label="技术陷阱机制图谱，可使用 Tab 键选中节点并回车查看详情"
      >
        <defs>
          <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="24" refY="2" orient="auto">
            <polygon points="0 0, 6 2, 0 4" fill="#64748b" />
          </marker>
          <marker id="arrowhead-success" markerWidth="6" markerHeight="4" refX="24" refY="2" orient="auto">
            <polygon points="0 0, 6 2, 0 4" fill="#34d399" />
          </marker>
          <marker id="arrowhead-danger" markerWidth="6" markerHeight="4" refX="24" refY="2" orient="auto">
            <polygon points="0 0, 6 2, 0 4" fill="#f87171" />
          </marker>
          <marker id="arrowhead-cyan" markerWidth="6" markerHeight="4" refX="24" refY="2" orient="auto">
            <polygon points="0 0, 6 2, 0 4" fill="#22d3ee" />
          </marker>

          <filter id="glow-node" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {TRAP_LOGIC_MAP.links.map((link) => {
          const source = nodesById.get(link.source);
          const target = nodesById.get(link.target);

          if (!source || !target) {
            return null;
          }

          const isConnected = !activeNodeId || link.source === activeNodeId || link.target === activeNodeId;

          return (
            <LogicLink
              key={`${link.source}-${link.target}-${link.label ?? 'path'}`}
              link={link}
              source={source}
              target={target}
              isConnected={isConnected}
              activeNodeId={activeNodeId}
            />
          );
        })}

        {TRAP_LOGIC_MAP.nodes.map((node) => {
          const isRelated = activeNodeId
            ? TRAP_LOGIC_MAP.links.some(
                (link) =>
                  (link.source === activeNodeId && link.target === node.id) ||
                  (link.target === activeNodeId && link.source === node.id)
              ) || activeNodeId === node.id
            : true;

          return (
            <LogicNode
              key={node.id}
              node={node}
              isSelected={selectedNodeId === node.id}
              isHovered={hoveredNode === node.id}
              isRelated={isRelated}
              onSelect={onNodeSelect}
              setHovered={setHoveredNode}
            />
          );
        })}
      </svg>

      <div className="absolute bottom-4 right-4 pointer-events-none opacity-40">
        <div className="inline-flex items-center gap-2 text-[10px] text-slate-400">
          <MousePointerClick size={12} /> 点击节点详解
        </div>
        <div className="inline-flex items-center gap-2 text-[10px] text-slate-500 mt-1">
          <Keyboard size={12} /> 支持 Tab + Enter 键盘导航
        </div>
      </div>
    </Card>
  );
};

export default LogicMap;
