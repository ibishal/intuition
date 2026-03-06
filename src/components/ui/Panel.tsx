import React from 'react';
import { cn } from '../../lib/utils';

export function Panel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative border border-[#222] p-6 bg-[#0a0a0a]/50", className)}>
      {/* Top Left */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#555] -translate-x-[1px] -translate-y-[1px]" />
      {/* Top Right */}
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#555] translate-x-[1px] -translate-y-[1px]" />
      {/* Bottom Left */}
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#555] -translate-x-[1px] translate-y-[1px]" />
      {/* Bottom Right */}
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#555] translate-x-[1px] translate-y-[1px]" />
      {children}
    </div>
  );
}
