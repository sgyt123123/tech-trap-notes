import { TRAP_LOGIC_MAP } from '@/constants';
import type { Link, Node as TrapNode } from '@/types';

export interface StoryHighlight {
  highlightedNodeIds: Set<string>;
  highlightedEdgeKeys: Set<string>;
}

export function createStoryHighlight(stepNodeIds: string[]): StoryHighlight {
  const highlightedNodeIds = new Set(stepNodeIds);
  const highlightedEdgeKeys = new Set<string>();

  for (let index = 1; index < stepNodeIds.length; index += 1) {
    highlightedEdgeKeys.add(`${stepNodeIds[index - 1]}->${stepNodeIds[index]}`);
  }

  return {
    highlightedNodeIds,
    highlightedEdgeKeys,
  };
}

export function getActiveNodeId(
  selectedNodeId: string | null,
  hoveredNodeId: string | null,
): string | null {
  return hoveredNodeId ?? selectedNodeId;
}

export function isNodeConnectedToActiveNode(nodeId: string, activeNodeId: string | null): boolean {
  if (!activeNodeId) {
    return true;
  }

  if (nodeId === activeNodeId) {
    return true;
  }

  return TRAP_LOGIC_MAP.links.some(
    (link) =>
      (link.source === activeNodeId && link.target === nodeId) ||
      (link.target === activeNodeId && link.source === nodeId),
  );
}

export function isEdgeConnectedToActiveNode(link: Link, activeNodeId: string | null): boolean {
  if (!activeNodeId) {
    return true;
  }

  return link.source === activeNodeId || link.target === activeNodeId;
}

export function createRelatedNodeIds(activeNodeId: string | null): Set<string> {
  const relatedNodeIds = new Set<string>();

  if (!activeNodeId) {
    for (const node of TRAP_LOGIC_MAP.nodes) {
      relatedNodeIds.add(node.id);
    }
    return relatedNodeIds;
  }

  relatedNodeIds.add(activeNodeId);
  for (const link of TRAP_LOGIC_MAP.links) {
    if (link.source === activeNodeId) {
      relatedNodeIds.add(link.target);
    }
    if (link.target === activeNodeId) {
      relatedNodeIds.add(link.source);
    }
  }

  return relatedNodeIds;
}

export type SemanticPathType = 'default' | 'prosperity' | 'trap' | 'feedback';

export function getSemanticPathType(source: TrapNode, target: TrapNode): SemanticPathType {
  const isProsperityPath = target.type === 'solution';
  const isTrapPath = target.type === 'trap' || target.id === 'ford_paradox' || target.id === 'resistance';
  const isFeedbackPath = source.y > target.y;

  if (isProsperityPath) {
    return 'prosperity';
  }

  if (isTrapPath) {
    return 'trap';
  }

  if (isFeedbackPath) {
    return 'feedback';
  }

  return 'default';
}
