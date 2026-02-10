import React from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  type EdgeProps,
} from '@xyflow/react';
import { cn } from '@/lib/utils';
import type { SemanticEdgeData, TrapFlowEdge } from '@/lib/flow/adapters';

interface EdgeVisualStyle {
  stroke: string;
  labelClassName: string;
  glowColor: string;
  dashArray?: string;
}

const EDGE_STYLE_BY_TYPE: Record<SemanticEdgeData['pathType'], EdgeVisualStyle> = {
  default: {
    stroke: '#9fb2c8',
    labelClassName: 'bg-slate-900/75 text-slate-100 border-slate-500/70',
    glowColor: 'rgba(148,163,184,0.2)',
  },
  prosperity: {
    stroke: '#52e0ae',
    labelClassName: 'bg-emerald-900/78 text-emerald-100 border-emerald-400/70',
    glowColor: 'rgba(52,211,153,0.42)',
  },
  trap: {
    stroke: '#fb8798',
    labelClassName: 'bg-rose-900/78 text-rose-100 border-rose-400/70',
    glowColor: 'rgba(251,113,133,0.42)',
    dashArray: '7 6',
  },
  feedback: {
    stroke: '#58d9f5',
    labelClassName: 'bg-cyan-900/78 text-cyan-100 border-cyan-400/70',
    glowColor: 'rgba(34,211,238,0.38)',
    dashArray: '5 6',
  },
};

const SemanticEdge: React.FC<EdgeProps<TrapFlowEdge>> = (props) => {
  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    markerEnd,
    data,
  } = props;

  const edgeData: SemanticEdgeData = data ?? {
    pathType: 'default',
    isConnected: true,
    isHighlighted: false,
    storyMode: false,
  };
  const style = EDGE_STYLE_BY_TYPE[edgeData.pathType];
  const opacity = edgeData.storyMode
    ? edgeData.isHighlighted
      ? 1
      : 0.5
    : edgeData.isConnected
      ? 0.94
      : 0.46;
  const strokeWidth = edgeData.isHighlighted ? 3.2 : edgeData.isConnected ? 2.5 : 1.9;
  const shouldShowLabel = Boolean(edgeData.label) && (edgeData.isHighlighted || edgeData.isConnected);

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          stroke: style.stroke,
          strokeWidth,
          strokeOpacity: opacity,
          strokeDasharray: style.dashArray,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          filter: `drop-shadow(0 0 5px rgba(2,6,23,0.45)) drop-shadow(0 0 ${
            edgeData.isHighlighted ? 12 : edgeData.isConnected ? 9 : 6
          }px ${style.glowColor})`,
          transition: 'opacity 220ms ease, stroke-width 220ms ease, filter 220ms ease',
        }}
      />

      {shouldShowLabel ? (
        <EdgeLabelRenderer>
          <div
            className={cn(
              'absolute -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full border text-[11px] font-semibold tracking-[0.08em] pointer-events-none backdrop-blur-sm',
              style.labelClassName,
            )}
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              opacity: Math.max(opacity, 0.7),
            }}
          >
            {edgeData.label}
          </div>
        </EdgeLabelRenderer>
      ) : null}
    </>
  );
};

export default SemanticEdge;
