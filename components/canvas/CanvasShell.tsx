import React from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import TrapFlowCanvas from '@/components/canvas/TrapFlowCanvas';
import InspectorDrawer from '@/components/canvas/panels/InspectorDrawer';
import { useTrapFlowStore } from '@/state/trapFlowStore';

interface CanvasShellProps {
  contextNodeId?: string | null;
}

const CanvasShell: React.FC<CanvasShellProps> = ({
  contextNodeId = null,
}) => {
  const selectNode = useTrapFlowStore((state) => state.selectNode);
  const setStoryMode = useTrapFlowStore((state) => state.setStoryMode);
  const setPerspective = useTrapFlowStore((state) => state.setPerspective);
  const isInspectorOpen = useTrapFlowStore((state) => state.inspector.open);

  React.useEffect(() => {
    setPerspective('mechanism');
  }, [setPerspective]);

  React.useEffect(() => {
    if (!contextNodeId) {
      return;
    }

    selectNode(contextNodeId, 'context');
    setStoryMode('free', { syncSelectedNode: false });
  }, [contextNodeId, selectNode, setStoryMode]);

  return (
    <ReactFlowProvider>
      <div className="h-full min-h-0 w-full relative overflow-hidden bg-[#0b2747]">
        <div
          className="h-full min-h-0 w-full relative transition-[padding-right] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
          style={{
            paddingRight: isInspectorOpen ? 'calc(clamp(340px, 34vw, 620px) + 1rem)' : '0px',
          }}
        >
          <TrapFlowCanvas className="h-full border-0 rounded-none" />
        </div>
        <InspectorDrawer />
      </div>
    </ReactFlowProvider>
  );
};

export default CanvasShell;
