import React, { useState } from 'react';
import { Info, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CanvasShell from '@/components/canvas/CanvasShell';
import { AnimatePresence, motion } from 'framer-motion';

interface MechanismViewProps {
  contextNodeId?: string | null;
}

/**
 * Floating Info Panel for the view description
 */
const ViewInfoPanel: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  React.useEffect(() => {
    const timerId = window.setTimeout(() => {
      setIsExpanded(false);
    }, 5000);

    return () => {
      window.clearTimeout(timerId);
    };
  }, []);

  return (
    <div className="absolute top-6 left-6 z-20 max-w-md pointer-events-none">
      <motion.div 
        layout
        className="pointer-events-auto bg-slate-900/78 backdrop-blur-md border border-slate-300/35 rounded-2xl overflow-hidden shadow-xl"
      >
        <div className="p-4 flex items-center justify-between gap-4 border-b border-slate-300/20 bg-slate-800/75">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-cyan-400/20 rounded-lg">
              <Info size={16} className="text-cyan-200" />
            </div>
            <h2 className="text-sm font-bold tracking-tight text-white/90 uppercase">机制探索</h2>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7 text-slate-200 hover:text-white hover:bg-white/10"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </Button>
        </div>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="p-5">
                <h3 className="text-xl font-serif font-bold text-white mb-2 leading-tight">
                  技术进步的双刃剑
                </h3>
                <p className="text-slate-100 text-sm leading-relaxed">
                  直接点击节点开始探索。右侧会同步展示图解、解析与关联内容，减少打断感，保持学习流畅。
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const MechanismView: React.FC<MechanismViewProps> = ({
  contextNodeId = null,
}) => {
  return (
    <div className="flex-1 w-full h-full min-h-0 relative animate-in fade-in duration-700 z-10 flex flex-col">
      <div className="flex-1 relative min-h-0">
        <ViewInfoPanel />
        <CanvasShell
          contextNodeId={contextNodeId}
        />
      </div>
    </div>
  );
};

export default MechanismView;
