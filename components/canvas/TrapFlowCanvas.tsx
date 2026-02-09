import React, { useMemo } from 'react';
import {
  Background,
  BackgroundVariant,
  MarkerType,
  ReactFlow,
  type EdgeTypes,
  type NodeMouseHandler,
  type NodeTypes,
  type OnMoveEnd,
  type OnNodeDrag,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import TrapNode from '@/components/canvas/nodes/TrapNode';
import SemanticEdge from '@/components/canvas/edges/SemanticEdge';
import { createFlowEdges, createFlowNodes } from '@/lib/flow/adapters';
import {
  createRelatedNodeIds,
  createStoryHighlight,
  getActiveNodeId,
} from '@/lib/flow/semantics';
import { STORY_STEPS, useTrapFlowStore } from '@/state/trapFlowStore';
import { cn } from '@/lib/utils';

const nodeTypes: NodeTypes = {
  trapNode: TrapNode,
};

const edgeTypes: EdgeTypes = {
  semantic: SemanticEdge,
};

interface TrapFlowCanvasProps {
  className?: string;
}

const TrapFlowCanvas: React.FC<TrapFlowCanvasProps> = ({ className }) => {
  const selectedNodeId = useTrapFlowStore((state) => state.selectedNodeId);
  const hoveredNodeId = useTrapFlowStore((state) => state.hoveredNodeId);
  const story = useTrapFlowStore((state) => state.story);
  const viewport = useTrapFlowStore((state) => state.viewport);
  const selectNode = useTrapFlowStore((state) => state.selectNode);
  const setHoveredNode = useTrapFlowStore((state) => state.setHoveredNode);
  const setViewport = useTrapFlowStore((state) => state.setViewport);
  const activeNodeId = getActiveNodeId(selectedNodeId, hoveredNodeId);

  const guidedStepNodeIds = useMemo(
    () => STORY_STEPS.slice(0, story.stepIndex + 1).map((step) => step.nodeId),
    [story.stepIndex],
  );
  const storyHighlight = useMemo(
    () => createStoryHighlight(guidedStepNodeIds),
    [guidedStepNodeIds],
  );
  const relatedNodeIds = useMemo(
    () =>
      story.mode === 'guided'
        ? storyHighlight.highlightedNodeIds
        : createRelatedNodeIds(activeNodeId),
    [activeNodeId, story.mode, storyHighlight.highlightedNodeIds],
  );

  const nodes = useMemo(
    () =>
      createFlowNodes({
        selectedNodeId,
        relatedNodeIds,
        storyMode: story.mode === 'guided',
        highlightedNodeIds: storyHighlight.highlightedNodeIds,
      }),
    [relatedNodeIds, selectedNodeId, story.mode, storyHighlight.highlightedNodeIds],
  );

  const edges = useMemo(
    () =>
      createFlowEdges({
        activeNodeId,
        storyMode: story.mode === 'guided',
        highlightedEdgeKeys: storyHighlight.highlightedEdgeKeys,
      }),
    [activeNodeId, story.mode, storyHighlight.highlightedEdgeKeys],
  );

  const handleNodeClick: NodeMouseHandler = (_, node) => {
    selectNode(node.id, 'canvas');
  };

  const handleNodeMouseEnter: NodeMouseHandler = (_, node) => {
    setHoveredNode(node.id);
  };

  const handleNodeMouseLeave: NodeMouseHandler = () => {
    setHoveredNode(null);
  };

  const handleNodeDragStart: OnNodeDrag = () => {
    setHoveredNode(null);
  };

  const handleMoveEnd: OnMoveEnd = (_, nextViewport) => {
    setViewport(nextViewport);
  };

  return (
    <div
      className={cn(
        'h-full min-h-0 w-full rounded-2xl border border-slate-300/35 overflow-hidden bg-gradient-to-br from-[#1a4a74] via-[#123a62] to-[#0c2b4b]',
        className,
      )}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultViewport={viewport}
        minZoom={1}
        maxZoom={1}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        panOnScroll
        panOnDrag
        onNodeClick={handleNodeClick}
        onNodeMouseEnter={handleNodeMouseEnter}
        onNodeMouseLeave={handleNodeMouseLeave}
        onNodeDragStart={handleNodeDragStart}
        onMoveEnd={handleMoveEnd}
        onPaneClick={() => setHoveredNode(null)}
        className="bg-transparent"
        defaultEdgeOptions={{
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: '#94a3b8',
            width: 20,
            height: 20,
          },
        }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          color="#dbeafe"
          gap={26}
          size={1.15}
          className="opacity-[0.34]"
        />
      </ReactFlow>
    </div>
  );
};

export default TrapFlowCanvas;
