import { create } from 'zustand';
import type { Viewport } from '@xyflow/react';

export type TrapPerspective = 'mechanism' | 'data' | 'compare' | 'future';
export type InspectorTab = 'visual' | 'analysis' | 'links';
export type StoryMode = 'guided' | 'free';
export type SelectSource = 'canvas' | 'panel' | 'story' | 'context';

export interface StoryStep {
  nodeId: string;
  title: string;
  description: string;
}

const MAX_ZOOM = 1;
const MIN_ZOOM = 1;
const DEFAULT_NODE_ID = 'tech_shock';

export const STORY_STEPS: StoryStep[] = [
  {
    nodeId: 'tech_shock',
    title: '第一步：冲击起点',
    description: '新技术先改变任务结构，冲击从这里开始扩散。',
  },
  {
    nodeId: 'short_term',
    title: '第二步：短期阵痛',
    description: '工资与产出脱钩，社会感知到“增长但没变好”。',
  },
  {
    nodeId: 'institution_gap',
    title: '第三步：制度滞后',
    description: '技术速度快于制度调整速度，矛盾进入放大区间。',
  },
  {
    nodeId: 'resistance',
    title: '第四步：社会反冲',
    description: '被挤压群体出现反抗，系统稳定性显著下降。',
  },
  {
    nodeId: 'trap',
    title: '第五步：技术陷阱',
    description: '若缺乏干预，系统滑向低信任与低增长的锁定状态。',
  },
];

interface StoryState {
  mode: StoryMode;
  stepIndex: number;
}

interface InspectorState {
  open: boolean;
  tab: InspectorTab;
}

interface TrapViewport extends Viewport {}

interface SetStoryStepOptions {
  syncSelectedNode?: boolean;
}

interface SetStoryModeOptions {
  syncSelectedNode?: boolean;
}

export interface TrapFlowState {
  perspective: TrapPerspective;
  selectedNodeId: string | null;
  hoveredNodeId: string | null;
  focusNodeId: string | null;
  inspector: InspectorState;
  story: StoryState;
  viewport: TrapViewport;
  tour: {
    done: boolean;
  };
  setPerspective: (perspective: TrapPerspective) => void;
  selectNode: (nodeId: string, source?: SelectSource) => void;
  setHoveredNode: (nodeId: string | null) => void;
  focusNode: (nodeId: string | null, source?: SelectSource) => void;
  openInspector: (tab?: InspectorTab) => void;
  closeInspector: () => void;
  setInspectorTab: (tab: InspectorTab) => void;
  setStoryMode: (mode: StoryMode, options?: SetStoryModeOptions) => void;
  setStoryStep: (stepIndex: number, options?: SetStoryStepOptions) => void;
  nextStep: () => void;
  prevStep: () => void;
  setViewport: (viewport: TrapViewport) => void;
  markTourDone: () => void;
}

function clampStepIndex(stepIndex: number): number {
  const maxIndex = STORY_STEPS.length - 1;
  if (stepIndex < 0) {
    return 0;
  }

  if (stepIndex > maxIndex) {
    return maxIndex;
  }

  return stepIndex;
}

function clampViewport(viewport: TrapViewport): TrapViewport {
  return {
    ...viewport,
    zoom: Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, viewport.zoom)),
  };
}

export const useTrapFlowStore = create<TrapFlowState>((set, get) => ({
  perspective: 'mechanism',
  selectedNodeId: DEFAULT_NODE_ID,
  hoveredNodeId: null,
  focusNodeId: DEFAULT_NODE_ID,
  inspector: {
    open: true,
    tab: 'visual',
  },
  story: {
    mode: 'free',
    stepIndex: 0,
  },
  viewport: {
    x: 24,
    y: 16,
    zoom: 1,
  },
  tour: {
    done: false,
  },
  setPerspective: (perspective) => {
    set({ perspective });
  },
  selectNode: (nodeId, source = 'canvas') => {
    set((state) => ({
      selectedNodeId: nodeId,
      focusNodeId: nodeId,
      inspector: {
        ...state.inspector,
        open: true,
        tab: source === 'story' ? 'visual' : state.inspector.tab,
      },
      story:
        source === 'story' || source === 'context'
          ? state.story
          : {
              ...state.story,
              mode: 'free',
            },
    }));
  },
  setHoveredNode: (nodeId) => {
    set({ hoveredNodeId: nodeId });
  },
  focusNode: (nodeId, source = 'canvas') => {
    set((state) => ({
      focusNodeId: nodeId,
      selectedNodeId: nodeId ?? state.selectedNodeId,
      inspector: nodeId
        ? {
            ...state.inspector,
            open: true,
            tab: source === 'story' ? 'visual' : state.inspector.tab,
          }
        : state.inspector,
    }));
  },
  openInspector: (tab = 'visual') => {
    set((state) => ({
      inspector: {
        ...state.inspector,
        open: true,
        tab,
      },
    }));
  },
  closeInspector: () => {
    set((state) => ({
      inspector: {
        ...state.inspector,
        open: false,
      },
    }));
  },
  setInspectorTab: (tab) => {
    set((state) => ({
      inspector: {
        ...state.inspector,
        tab,
      },
    }));
  },
  setStoryMode: (mode, options) => {
    const shouldSyncSelectedNode = options?.syncSelectedNode ?? true;
    set((state) => {
      if (mode === 'free') {
        return {
          story: {
            ...state.story,
            mode: 'free',
          },
        };
      }

      const currentStep = STORY_STEPS[clampStepIndex(state.story.stepIndex)];
      return {
        story: {
          ...state.story,
          mode: 'guided',
        },
        selectedNodeId: shouldSyncSelectedNode ? currentStep.nodeId : state.selectedNodeId,
        focusNodeId: shouldSyncSelectedNode ? currentStep.nodeId : state.focusNodeId,
        inspector: {
          ...state.inspector,
          open: true,
          tab: 'visual',
        },
      };
    });
  },
  setStoryStep: (stepIndex, options) => {
    const safeIndex = clampStepIndex(stepIndex);
    const shouldSyncSelectedNode = options?.syncSelectedNode ?? true;
    const stepNodeId = STORY_STEPS[safeIndex].nodeId;

    set((state) => ({
      story: {
        mode: 'guided',
        stepIndex: safeIndex,
      },
      selectedNodeId: shouldSyncSelectedNode ? stepNodeId : state.selectedNodeId,
      focusNodeId: shouldSyncSelectedNode ? stepNodeId : state.focusNodeId,
      inspector: {
        ...state.inspector,
        open: true,
        tab: 'visual',
      },
    }));
  },
  nextStep: () => {
    const { story, setStoryStep } = get();
    if (story.stepIndex >= STORY_STEPS.length - 1) {
      set({
        story: {
          ...story,
          mode: 'free',
        },
      });
      return;
    }

    setStoryStep(story.stepIndex + 1, { syncSelectedNode: true });
  },
  prevStep: () => {
    const { story, setStoryStep } = get();
    setStoryStep(story.stepIndex - 1, { syncSelectedNode: true });
  },
  setViewport: (viewport) => {
    set({ viewport: clampViewport(viewport) });
  },
  markTourDone: () => {
    set({
      tour: {
        done: true,
      },
    });
  },
}));
