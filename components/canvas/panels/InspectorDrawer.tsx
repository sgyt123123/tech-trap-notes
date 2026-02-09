import React, { useMemo } from 'react';
import { PanelRightClose, PanelRightOpen } from 'lucide-react';
import InfoPanel from '@/components/mechanism/InfoPanel';
import { TRAP_LOGIC_MAP } from '@/constants';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useTrapFlowStore } from '@/state/trapFlowStore';

const InspectorDrawer: React.FC = () => {
  const selectedNodeId = useTrapFlowStore((state) => state.selectedNodeId);
  const isOpen = useTrapFlowStore((state) => state.inspector.open);
  const closeInspector = useTrapFlowStore((state) => state.closeInspector);
  const openInspector = useTrapFlowStore((state) => state.openInspector);
  const selectNode = useTrapFlowStore((state) => state.selectNode);

  const selectedNode = useMemo(
    () => TRAP_LOGIC_MAP.nodes.find((node) => node.id === selectedNodeId) ?? null,
    [selectedNodeId],
  );

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean) => {
      if (nextOpen) {
        openInspector();
        return;
      }

      closeInspector();
    },
    [closeInspector, openInspector],
  );

  return (
    <>
      {!isOpen ? (
        <div className="absolute top-4 right-4 z-50">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => openInspector('visual')}
            className="bg-slate-900/88 backdrop-blur-md border-slate-300/55 text-slate-100 hover:bg-slate-800 hover:text-white shadow-xl rounded-xl h-10 px-4"
          >
            <PanelRightOpen size={16} className="mr-2 text-cyan-300" />
            查看详情
          </Button>
        </div>
      ) : null}

      <Sheet open={isOpen} onOpenChange={handleOpenChange} modal={false}>
        <SheetContent
          side="right"
          showCloseButton={false}
          showOverlay={false}
          className="top-4 right-4 bottom-4 h-auto w-[clamp(340px,34vw,620px)] max-w-[calc(100vw-2rem)] sm:max-w-none border-0 bg-transparent shadow-none p-0 gap-0 overflow-visible"
        >
          <div className="relative h-full min-h-0">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={closeInspector}
              className="absolute left-0 top-4 -translate-x-[56%] z-50 size-10 bg-slate-900/92 text-slate-100 hover:text-white hover:bg-slate-800 border border-slate-300/65 rounded-xl shadow-xl"
              aria-label="收起详情面板"
            >
              <PanelRightClose size={16} />
            </Button>

            <div className="h-full min-h-0 rounded-3xl overflow-hidden border border-slate-200/25 shadow-[0_28px_64px_-16px_rgba(2,6,23,0.75)] bg-slate-900/82 backdrop-blur-2xl">
              <InfoPanel
                selectedNode={selectedNode}
                onNavigate={(nodeId) => selectNode(nodeId, 'panel')}
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default InspectorDrawer;
