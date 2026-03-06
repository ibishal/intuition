import React from 'react';

export function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-[#555] text-[10px] tracking-[0.3em] uppercase">{label}</div>
      <div className="text-5xl font-light tracking-tight text-[#e5e5e5]">{value}</div>
    </div>
  );
}

export function Divider() {
  return <div className="hidden md:block w-px h-16 bg-[#222]" />;
}
