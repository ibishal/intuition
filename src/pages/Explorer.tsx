import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { Panel } from '../components/ui/Panel';
import { cn } from '../lib/utils';

const CATEGORIES = [
  'data-processing', 'code-generation', 'task-automation', 'communication', 
  'analysis', 'creative', 'financial', 'research', 'security', 'infrastructure'
];

const MOCK_AGENTS = Array.from({ length: 12 }).map((_, i) => ({
  id: `0x${Math.random().toString(16).slice(2, 10)}`,
  name: `Agent-${i + 1}`,
  staked: (Math.random() * 10000).toFixed(0),
  stakers: Math.floor(Math.random() * 500),
  tier: ['ELITE', 'HIGH', 'MEDIUM', 'LOW'][Math.floor(Math.random() * 4)],
  category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
  sparkline: Array.from({ length: 10 }, () => ({ value: Math.random() * 100 }))
}));

const networkActivity = Array.from({ length: 30 }, (_, i) => ({
  time: i,
  volume: Math.random() * 1000 + 500
}));

function Sparkline({ data, color }: { data: any[], color: string }) {
  return (
    <div className="h-8 w-24">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <Area type="monotone" dataKey="value" stroke={color} strokeWidth={1} fill={color} fillOpacity={0.1} isAnimationActive={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function TierBadge({ tier }: { tier: string }) {
  const colors = {
    ELITE: 'text-[#f97316] border-[#f97316]/50 bg-[#f97316]/10 shadow-[0_0_10px_rgba(249,115,22,0.2)]',
    HIGH: 'text-emerald-400 border-emerald-400/50 bg-emerald-400/10 shadow-[0_0_10px_rgba(16,185,129,0.2)]',
    MEDIUM: 'text-blue-400 border-blue-400/50 bg-blue-400/10 shadow-[0_0_10px_rgba(96,165,250,0.2)]',
    LOW: 'text-[#888] border-[#555] bg-[#222]',
  }[tier] || 'text-[#888] border-[#555] bg-[#222]';

  return (
    <span className={cn("text-[8px] tracking-[0.2em] px-2 py-1 border", colors)}>
      {tier}
    </span>
  );
}

export function Explorer() {
  const [search, setSearch] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (cat: string) => {
    setActiveFilters(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const filteredAgents = MOCK_AGENTS.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = activeFilters.length === 0 || activeFilters.includes(agent.category);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Top Network Activity */}
      <Panel className="p-0 overflow-hidden h-32 relative flex items-center justify-between border-[#f97316]/30">
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505] z-10 pointer-events-none" />
        <div className="absolute inset-0 opacity-30">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={networkActivity}>
              <Area type="step" dataKey="volume" stroke="#f97316" strokeWidth={1} fill="#f97316" fillOpacity={0.1} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="relative z-20 px-8 flex flex-col gap-1">
          <span className="text-[#f97316] text-[10px] tracking-[0.3em] uppercase">NETWORK ACTIVITY</span>
          <span className="text-[#e5e5e5] text-2xl font-light">24.5k <span className="text-[#555] text-sm">TX/s</span></span>
        </div>
        <div className="relative z-20 px-8 text-right flex flex-col gap-1">
          <span className="text-[#555] text-[10px] tracking-[0.3em] uppercase">GLOBAL STAKE</span>
          <span className="text-[#e5e5e5] text-2xl font-light">1.2M <span className="text-[#555] text-sm">tTRUST</span></span>
        </div>
      </Panel>

      <Panel className="flex flex-col gap-6 p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-light tracking-tight text-[#e5e5e5] flex items-center gap-3">
            <div className="w-2 h-2 bg-[#f97316] shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
            AGENT EXPLORER
          </h1>
          <div className="relative w-full md:w-64 group">
            <input 
              type="text" 
              placeholder="SEARCH AGENTS..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-[#333] text-[#e5e5e5] px-4 py-2 text-xs tracking-widest focus:outline-none focus:border-[#f97316] focus:shadow-[0_0_10px_rgba(249,115,22,0.2)] transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555] text-xs group-focus-within:text-[#f97316] transition-colors">/</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-4 border-t border-[#222]">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => toggleFilter(cat)}
              className={cn(
                "text-[10px] tracking-[0.1em] px-3 py-1 border transition-all",
                activeFilters.includes(cat)
                  ? "border-[#f97316] text-[#f97316] bg-[#f97316]/10 shadow-[0_0_10px_rgba(249,115,22,0.2)]"
                  : "border-[#333] text-[#888] hover:border-[#555] hover:text-[#ccc] bg-[#0a0a0a]"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center pt-4 text-[10px] tracking-[0.2em] uppercase text-[#555]">
          <span>{filteredAgents.length} RESULTS</span>
          <select className="bg-transparent border-none outline-none text-[#888] cursor-pointer hover:text-[#ccc] transition-colors">
            <option>MOST STAKED</option>
            <option>MOST STAKERS</option>
            <option>NEWEST</option>
          </select>
        </div>
      </Panel>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {filteredAgents.length > 0 ? (
          filteredAgents.map((agent) => (
            <Link key={agent.id} to={`/agents/${agent.id}`}>
              <Panel className="relative overflow-hidden hover:border-[#f97316]/50 hover:shadow-[0_0_30px_rgba(249,115,22,0.1)] transition-all duration-500 cursor-pointer group h-full flex flex-col justify-between bg-[#0a0a0a]">
                {/* Large Background Typography */}
                <div className="absolute -right-4 -bottom-8 text-[120px] font-serif italic text-[#111] group-hover:text-[#1a1a1a] transition-colors duration-500 select-none pointer-events-none z-0 leading-none">
                  {agent.name.charAt(0)}
                </div>
                
                {/* Gradient Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#f97316]/0 via-transparent to-[#f97316]/0 group-hover:from-[#f97316]/5 group-hover:to-transparent transition-all duration-500 z-0" />

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#111] border border-[#333] group-hover:border-[#f97316]/50 flex items-center justify-center text-[#f97316] font-light shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] transition-colors duration-500">
                        {agent.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-[#e5e5e5] font-medium group-hover:text-[#f97316] transition-colors">{agent.name}</div>
                        <div className="text-[#555] text-[10px] tracking-widest font-mono">{agent.id}...</div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4 flex justify-between items-center">
                    <span className="text-[8px] tracking-[0.2em] px-2 py-1 border border-[#333] text-[#888] bg-[#111] group-hover:border-[#555] transition-colors">
                      {agent.category}
                    </span>
                    <div className="opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                      <Sparkline 
                        data={agent.sparkline} 
                        color={agent.tier === 'ELITE' ? '#f97316' : agent.tier === 'HIGH' ? '#10b981' : agent.tier === 'MEDIUM' ? '#60a5fa' : '#555'} 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="relative z-10 flex justify-between items-end border-t border-[#222] group-hover:border-[#333] pt-4 mt-4 transition-colors duration-500">
                  <div>
                    <div className="text-[#555] text-[8px] tracking-[0.2em] uppercase mb-1">Total Staked</div>
                    <div className="text-[#ccc] text-lg font-light group-hover:text-white transition-colors">{agent.staked}</div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <TierBadge tier={agent.tier} />
                    <div className="text-[#888] text-[10px] tracking-widest">{agent.stakers} stakers</div>
                  </div>
                </div>
              </Panel>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-[#555] text-sm tracking-widest uppercase">
            No agents found matching "{search}"
          </div>
        )}
      </div>

      {filteredAgents.length > 0 && (
        <div className="flex justify-center mt-8">
          <button className="text-[10px] tracking-[0.2em] uppercase px-6 py-3 border border-[#333] text-[#888] hover:border-[#f97316] hover:text-[#f97316] hover:bg-[#f97316]/10 transition-all">
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
