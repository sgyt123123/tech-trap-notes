import React from 'react';
import { Compass, GitGraph, History, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { type TrapPerspective, useTrapFlowStore } from '@/state/trapFlowStore';

interface PerspectiveDockProps {
  onRequestViewChange?: (mode: 'mechanism' | 'data' | 'compare' | 'future', anchorNodeId?: string) => void;
}

interface PerspectiveOption {
  value: TrapPerspective;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const PERSPECTIVE_OPTIONS: PerspectiveOption[] = [
  { value: 'mechanism', label: '机制', icon: GitGraph },
  { value: 'data', label: '数据', icon: LayoutDashboard },
  { value: 'compare', label: '镜像', icon: History },
  { value: 'future', label: '未来', icon: Compass },
];

const PerspectiveDock: React.FC<PerspectiveDockProps> = ({ onRequestViewChange }) => {
  const perspective = useTrapFlowStore((state) => state.perspective);
  const selectedNodeId = useTrapFlowStore((state) => state.selectedNodeId);
  const setPerspective = useTrapFlowStore((state) => state.setPerspective);

  return (
    <div className="absolute top-3 left-3 lg:top-4 lg:left-4 z-40">
      <div className="rounded-xl border border-slate-700 bg-slate-950/85 backdrop-blur-md p-1.5 flex items-center gap-1 shadow-xl">
        {PERSPECTIVE_OPTIONS.map((item) => {
          const Icon = item.icon;
          const isActive = perspective === item.value;

          return (
            <Button
              key={item.value}
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setPerspective(item.value);
                onRequestViewChange?.(item.value, selectedNodeId ?? undefined);
              }}
              className={cn(
                'h-8 px-2.5 text-xs rounded-lg text-slate-400 hover:text-white hover:bg-slate-800',
                isActive && 'bg-slate-800 text-white ring-1 ring-cyan-500/30',
              )}
            >
              <Icon size={13} />
              {item.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default PerspectiveDock;
