import React from 'react';
import { Link, Node } from '../../types';

interface LogicLinkProps {
  link: Link;
  source: Node;
  target: Node;
  isConnected: boolean;
  activeNodeId: string | null;
}

const LogicLink: React.FC<LogicLinkProps> = ({ link, source, target, isConnected, activeNodeId }) => {
    // Determine path types
    const isProsperityPath = target.type === 'solution'; // Green path
    const isTrapPath = target.type === 'trap' || target.id === 'ford_paradox' || target.id === 'resistance'; // Red path grouping
    const isUpwardLoop = source.y > target.y; // Feedback loop
    
    // Critical paths get more visual weight
    const isCriticalPath = isProsperityPath || isTrapPath || isUpwardLoop;

    const opacity = isConnected ? 1 : 0.1;
    
    // Dynamic Color Logic
    let strokeColor = '#475569'; // Default Slate
    if (isProsperityPath) strokeColor = '#34d399'; // Emerald
    else if (isTrapPath) strokeColor = '#f87171'; // Red
    else if (isUpwardLoop) strokeColor = '#22d3ee'; // Cyan

    // Marker Logic
    let markerId = 'url(#arrowhead)';
    if (isProsperityPath) markerId = 'url(#arrowhead-success)';
    else if (isTrapPath) markerId = 'url(#arrowhead-danger)';
    else if (isUpwardLoop) markerId = 'url(#arrowhead-cyan)'; // We need to ensure this marker exists or use default

    // Path Geometry Logic
    let d = '';
    let labelX = 0;
    let labelY = 0;

    if (isUpwardLoop) {
        // Special C-Curve for Feedback Loop (Right side arc)
        const rightEdge = Math.max(source.x, target.x) + 200; 
        d = `M${source.x},${source.y} C${rightEdge},${source.y} ${rightEdge},${target.y} ${target.x},${target.y}`;
        labelX = 0.125 * (source.x + target.x) + 0.75 * rightEdge;
        labelY = (source.y + target.y) / 2;
        
    } else {
        // Standard S-Curve logic for top-down
        const dx = target.x - source.x;
        const dy = target.y - source.y;
        
        // Curvature intensity
        const curveFactor = isCriticalPath ? 0.6 : 0.5;

        const cp1x = source.x;
        const cp1y = source.y + Math.abs(dy) * curveFactor;
        const cp2x = target.x;
        const cp2y = target.y - Math.abs(dy) * curveFactor;
        
        // Straight line for very short distances, Curve for others
        d = Math.abs(dy) < 20 && Math.abs(dx) < 20
            ? `M${source.x},${source.y} L${target.x},${target.y}`
            : `M${source.x},${source.y} C${cp1x},${cp1y} ${cp2x},${cp2y} ${target.x},${target.y}`;
        
        // Calculate point on bezier curve for label (approximate midpoint)
        // Bezier formula for t=0.5: (1-t)^3*P0 + 3(1-t)^2*t*P1 + 3(1-t)*t^2*P2 + t^3*P3
        // Simplified for Cubic Bezier mid-point (t=0.5)
        labelX = 0.125 * source.x + 0.375 * cp1x + 0.375 * cp2x + 0.125 * target.x;
        labelY = 0.125 * source.y + 0.375 * cp1y + 0.375 * cp2y + 0.125 * target.y;
    }

    return (
      <g className="transition-all duration-500 group/link" style={{ opacity }}>
        {/* Base Path (Background) */}
        <path
          d={d}
          fill="none"
          stroke={strokeColor}
          strokeWidth={isCriticalPath ? 3 : 1.5}
          strokeOpacity={isCriticalPath ? 0.3 : 0.2}
          markerEnd={markerId}
          className="transition-all duration-300"
        />
        
        {/* Animated Flow Particle */}
        {(isConnected) && (
         <path
          d={d}
          fill="none"
          stroke={strokeColor}
          strokeWidth={isCriticalPath ? 3 : 2}
          strokeDasharray={isTrapPath ? "6,10" : "8,16"} // Trap is choppy, Prosperity is smooth
          className={isTrapPath ? "animate-[flow_30s_linear_infinite]" : "animate-[flow_20s_linear_infinite]"}
          strokeOpacity={isCriticalPath ? 0.9 : 0.6}
          strokeLinecap="round"
        />
        )}

        {/* Badge Label */}
        {link.label && (
           <foreignObject 
            x={labelX - 80} 
            y={labelY - 14}
            width="160"
            height="28"
            style={{ overflow: 'visible' }}
           >
             <div className="flex items-center justify-center w-full h-full transform transition-transform duration-300 hover:scale-110 cursor-default">
                <span className={`text-[10px] font-black uppercase tracking-widest text-center py-1.5 px-3 rounded-full border shadow-[0_0_15px_rgba(0,0,0,0.5)] z-20 whitespace-nowrap backdrop-blur-md transition-all duration-300
                    ${isProsperityPath 
                        ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-400 group-hover/link:bg-emerald-900 group-hover/link:border-emerald-400' 
                        : isTrapPath 
                            ? 'bg-red-950/90 border-red-500/50 text-red-400 group-hover/link:bg-red-900 group-hover/link:border-red-400' 
                            : isUpwardLoop
                                ? 'bg-cyan-950/90 border-cyan-500/50 text-cyan-400 group-hover/link:bg-cyan-900 group-hover/link:border-cyan-400'
                                : 'bg-slate-950/90 border-slate-700 text-slate-400 group-hover/link:border-slate-500 group-hover/link:text-slate-200'
                    }
                `}>
                {link.label}
                </span>
             </div>
           </foreignObject>
        )}
      </g>
    );
};

export default LogicLink;
