import React from 'react';
import { BookOpen, ChevronLeft, ChevronRight, Compass, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { STORY_STEPS, useTrapFlowStore } from '@/state/trapFlowStore';

const WHEEL_THROTTLE_MS = 280;

const StoryTimeline: React.FC = () => {
  const story = useTrapFlowStore((state) => state.story);
  const setStoryMode = useTrapFlowStore((state) => state.setStoryMode);
  const setStoryStep = useTrapFlowStore((state) => state.setStoryStep);
  const nextStep = useTrapFlowStore((state) => state.nextStep);
  const prevStep = useTrapFlowStore((state) => state.prevStep);
  const lastWheelAtRef = React.useRef<number>(0);
  const currentStep = STORY_STEPS[story.stepIndex];
  const isGuided = story.mode === 'guided';
  const isLastStep = story.stepIndex >= STORY_STEPS.length - 1;

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (!isGuided) {
      return;
    }

    const now = Date.now();
    if (now - lastWheelAtRef.current < WHEEL_THROTTLE_MS) {
      return;
    }
    lastWheelAtRef.current = now;

    if (event.deltaY > 0) {
      nextStep();
      return;
    }

    if (event.deltaY < 0) {
      prevStep();
    }
  };

  return (
    <div
      onWheel={handleWheel}
      className="absolute left-3 right-3 bottom-3 lg:left-4 lg:right-4 lg:bottom-4 z-40"
      aria-label="故事模式进度条"
    >
      <div className="rounded-xl border border-slate-400/55 bg-slate-900/88 backdrop-blur-md px-3 py-2 lg:px-4 lg:py-3 shadow-2xl">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-widest text-cyan-300 font-black flex items-center gap-1.5">
              {isGuided ? <BookOpen size={11} /> : <Compass size={11} />}
              {isGuided ? `故事导读 · ${story.stepIndex + 1}/${STORY_STEPS.length}` : '自由探索模式'}
            </p>
            <p className="text-sm text-slate-100 font-semibold mt-0.5 truncate">
              {isGuided ? currentStep.title : '你可以任意点击节点，或回到分步导读'}
            </p>
            <p className="text-xs text-slate-200/90 mt-0.5 hidden sm:block truncate">
              {isGuided ? currentStep.description : '提示：点击任意节点后，右侧会展示图解/解析/关联'}
            </p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {isGuided ? (
              <>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={prevStep}
                  disabled={story.stepIndex === 0}
                  className="border-slate-500/70 bg-slate-900 text-slate-100 hover:bg-slate-800 hover:text-white"
                >
                  <ChevronLeft size={14} />
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={nextStep}
                  className={cn(
                    'text-white',
                    isLastStep ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-cyan-600 hover:bg-cyan-500',
                  )}
                >
                  {isLastStep ? '完成导读' : '下一步'}
                  <ChevronRight size={14} />
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => setStoryMode('free', { syncSelectedNode: false })}
                  className="text-slate-400 hover:text-slate-200"
                >
                  退出
                </Button>
              </>
            ) : (
              <Button
                type="button"
                size="sm"
                onClick={() => {
                  setStoryStep(0, { syncSelectedNode: true });
                  setStoryMode('guided', { syncSelectedNode: true });
                }}
                className="bg-cyan-600 hover:bg-cyan-500 text-white"
              >
                <Sparkles size={14} />
                进入故事模式
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryTimeline;
