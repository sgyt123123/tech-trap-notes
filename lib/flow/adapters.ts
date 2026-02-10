import { Position, type Edge, type Node } from '@xyflow/react';
import { TRAP_LOGIC_MAP } from '@/constants';
import type { Link, Node as TrapNode } from '@/types';
import { getSemanticPathType } from '@/lib/flow/semantics';

export interface TrapFlowNodeData extends Record<string, unknown> {
  trapNode: TrapNode;
  isSelected: boolean;
  isRelated: boolean;
  isStoryHighlighted: boolean;
}

export interface SemanticEdgeData extends Record<string, unknown> {
  label?: string;
  pathType: 'default' | 'prosperity' | 'trap' | 'feedback';
  isConnected: boolean;
  isHighlighted: boolean;
  storyMode: boolean;
}

export type TrapFlowNode = Node<TrapFlowNodeData, 'trapNode'>;
export type TrapFlowEdge = Edge<SemanticEdgeData, 'semantic'>;

interface CreateFlowNodesOptions {
  selectedNodeId: string | null;
  relatedNodeIds: Set<string>;
  storyMode: boolean;
  highlightedNodeIds: Set<string>;
}

interface CreateFlowEdgesOptions {
  activeNodeId: string | null;
  storyMode: boolean;
  highlightedEdgeKeys: Set<string>;
}

const NODE_WIDTH = 268;
const NODE_HEIGHT = 124;
const Y_OFFSET = 72;

type NodeHandlePair = {
  sourceHandle: string;
  targetHandle: string;
};

function resolveDirectionalHandles(source: TrapNode, target: TrapNode): NodeHandlePair {
  const deltaX = target.x - source.x;
  const deltaY = target.y - source.y;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX >= 0) {
      return {
        sourceHandle: 'source-right',
        targetHandle: 'target-left',
      };
    }

    return {
      sourceHandle: 'source-left',
      targetHandle: 'target-right',
    };
  }

  if (deltaY >= 0) {
    return {
      sourceHandle: 'source-bottom',
      targetHandle: 'target-top',
    };
  }

  return {
    sourceHandle: 'source-top',
    targetHandle: 'target-bottom',
  };
}

export function createFlowNodes(options: CreateFlowNodesOptions): TrapFlowNode[] {
  const { selectedNodeId, relatedNodeIds, storyMode, highlightedNodeIds } = options;

  return TRAP_LOGIC_MAP.nodes.map((node) => ({
    id: node.id,
    type: 'trapNode' as const,
    position: {
      x: node.x - NODE_WIDTH / 2,
      y: node.y + Y_OFFSET - NODE_HEIGHT / 2,
    },
    draggable: false,
    selectable: true,
    data: {
      trapNode: node,
      isSelected: selectedNodeId === node.id,
      isRelated: storyMode ? highlightedNodeIds.has(node.id) : relatedNodeIds.has(node.id),
      isStoryHighlighted: highlightedNodeIds.has(node.id),
    },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  }));
}

function createEdgeId(link: Link): string {
  return `${link.source}->${link.target}`;
}

export function createFlowEdges(options: CreateFlowEdgesOptions): TrapFlowEdge[] {
  const { activeNodeId, storyMode, highlightedEdgeKeys } = options;
  const nodesById = new Map(TRAP_LOGIC_MAP.nodes.map((node) => [node.id, node]));

  return TRAP_LOGIC_MAP.links.flatMap((link) => {
      const source = nodesById.get(link.source);
      const target = nodesById.get(link.target);

      if (!source || !target) {
        return [];
      }

      const edgeKey = createEdgeId(link);
      const isHighlighted = highlightedEdgeKeys.has(edgeKey);
      const isConnected = storyMode
        ? isHighlighted
        : !activeNodeId || link.source === activeNodeId || link.target === activeNodeId;
      const pathType = getSemanticPathType(source, target);
      const directionalHandles = resolveDirectionalHandles(source, target);

      const edge: TrapFlowEdge = {
        id: edgeKey,
        type: 'semantic',
        source: link.source,
        target: link.target,
        sourceHandle: directionalHandles.sourceHandle,
        targetHandle: directionalHandles.targetHandle,
        animated: false,
        zIndex: isHighlighted ? 20 : 10,
        data: {
          label: link.label,
          pathType,
          isConnected,
          isHighlighted,
          storyMode,
        },
      };

      return [edge];
    });
}
