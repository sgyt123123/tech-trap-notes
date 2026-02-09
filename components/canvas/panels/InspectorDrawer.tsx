import React, { useMemo } from 'react';
import { PanelRightClose, PanelRightOpen } from 'lucide-react';
import InfoPanel from '@/components/mechanism/InfoPanel';
import { TRAP_LOGIC_MAP } from '@/constants';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTrapFlowStore } from '@/state/trapFlowStore';

interface InspectorDrawerProps {
  onRequestViewChange?: (mode: 'mechanism' | 'data' | 'compare' | 'future', anchorNodeId?: string) => void;
}

const InspectorDrawer: React.FC<InspectorDrawerProps> = ({ onRequestViewChange }) => {
  const selectedNodeId = useTrapFlowStore((state) => state.selectedNodeId);
  const isOpen = useTrapFlowStore((state) => state.inspector.open);
  const closeInspector = useTrapFlowStore((state) => state.closeInspector);
  const openInspector = useTrapFlowStore((state) => state.openInspector);
  const selectNode = useTrapFlowStore((state) => state.selectNode);
  const drawerWidth = 'clamp(340px, 34vw, 620px)';

  const selectedNode = useMemo(
    () => TRAP_LOGIC_MAP.nodes.find((node) => node.id === selectedNodeId) ?? null,
    [selectedNodeId],
  );

  return (
    <div className="absolute top-4 right-4 bottom-4 z-50 pointer-events-none flex items-stretch">
      {!isOpen ? (
        <div className="pointer-events-auto self-start">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => openInspector('visual')}
            className="bg-slate-900/80 backdrop-blur-md border-slate-500/60 text-slate-100 hover:bg-slate-800 hover:text-white shadow-xl rounded-xl h-10 px-4"
          >
            <PanelRightOpen size={16} className="mr-2 text-cyan-300" />
            查看详情
          </Button>
        </div>
      ) : null}

      <div
        className={cn(
          'pointer-events-auto h-full min-h-0 max-w-[calc(100vw-2rem)] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]',
          isOpen ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-[calc(100%+2rem)] opacity-0 scale-95',
        )}
        style={{ width: drawerWidth }}
      >
        <div className="relative h-full min-h-0 rounded-3xl overflow-hidden border border-slate-300/20 shadow-[0_28px_64px_-16px_rgba(2,6,23,0.75)] bg-slate-900/80 backdrop-blur-2xl">
          <div className="absolute top-4 left-4 z-50">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={closeInspector}
              className="size-9 bg-slate-800/70 text-slate-200 hover:text-white hover:bg-slate-700/80 border border-slate-500/40 backdrop-blur-md rounded-xl transition-all"
              aria-label="收起详情面板"
            >
              <PanelRightClose size={16} />
            </Button>
          </div>

          <InfoPanel
            selectedNode={selectedNode}
            onNavigate={(nodeId) => selectNode(nodeId, 'panel')}
            onRequestViewChange={onRequestViewChange}
          />
        </div>
      </div>
    </div>
  );
};

export default InspectorDrawer;
