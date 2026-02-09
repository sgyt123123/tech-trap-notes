import React from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  type EdgeProps,
} from '@xyflow/react';
import { cn } from '@/lib/utils';
import type { SemanticEdgeData } from '@/lib/flow/adapters';

interface EdgeVisualStyle {
  stroke: string;
  labelClassName: string;
  dashArray?: string;
}

const EDGE_STYLE_BY_TYPE: Record<SemanticEdgeData['pathType'], EdgeVisualStyle> = {
  default: {
    stroke: '#94a3b8',
    labelClassName: 'bg-slate-900/85 text-slate-100 border-slate-500/80',
  },
  prosperity: {
    stroke: '#34d399',
    labelClassName: 'bg-emerald-900/85 text-emerald-100 border-emerald-500/70',
  },
  trap: {
    stroke: '#fb7185',
    labelClassName: 'bg-red-900/85 text-red-100 border-red-500/70',
    dashArray: '8 8',
  },
  feedback: {
    stroke: '#22d3ee',
    labelClassName: 'bg-cyan-900/85 text-cyan-100 border-cyan-500/70',
    dashArray: '6 7',
  },
};

const SemanticEdge: React.FC<EdgeProps<SemanticEdgeData>> = (props) => {
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
      : 0.55
    : edgeData.isConnected
      ? 0.92
      : 0.5;

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
          strokeWidth: edgeData.isHighlighted ? 2.8 : 2.1,
          strokeOpacity: opacity,
          strokeDasharray: style.dashArray,
          transition: 'opacity 220ms ease, stroke-width 220ms ease',
        }}
      />

      {edgeData.label ? (
        <EdgeLabelRenderer>
          <div
            className={cn(
              'absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-full border text-[10px] font-bold tracking-wider pointer-events-none backdrop-blur-sm',
              style.labelClassName,
            )}
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              opacity,
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
