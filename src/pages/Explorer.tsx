import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
}));

function TierBadge({ tier }: { tier: string }) {
  const colors = {
    ELITE: 'text-[#f97316] border-[#f97316]/50 bg-[#f97316]/10',
    HIGH: 'text-emerald-400 border-emerald-400/50 bg-emerald-400/10',
    MEDIUM: 'text-blue-400 border-blue-400/50 bg-blue-400/10',
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
      <Panel className="flex flex-col gap-6 p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-light tracking-tight text-[#e5e5e5]">AGENT EXPLORER</h1>
          <div className="relative w-full md:w-64">
            <input 
              type="text" 
              placeholder="SEARCH AGENTS..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#111] border border-[#333] text-[#e5e5e5] px-4 py-2 text-xs tracking-widest focus:outline-none focus:border-[#f97316] transition-colors"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555] text-xs">/</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-4 border-t border-[#222]">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => toggleFilter(cat)}
              className={cn(
                "text-[10px] tracking-[0.1em] px-3 py-1 border transition-colors",
                activeFilters.includes(cat)
                  ? "border-[#f97316] text-[#f97316] bg-[#f97316]/10"
                  : "border-[#333] text-[#888] hover:border-[#555] hover:text-[#ccc]"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center pt-4 text-[10px] tracking-[0.2em] uppercase text-[#555]">
          <span>{filteredAgents.length} RESULTS</span>
          <select className="bg-transparent border-none outline-none text-[#888] cursor-pointer">
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
              <Panel className="hover:border-[#555] transition-colors cursor-pointer group h-full flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#222] border border-[#333] flex items-center justify-center text-[#888] font-bold">
                        {agent.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-[#e5e5e5] font-medium group-hover:text-[#f97316] transition-colors">{agent.name}</div>
                        <div className="text-[#555] text-[10px] tracking-widest">{agent.id}...</div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="text-[8px] tracking-[0.2em] px-2 py-1 border border-[#333] text-[#888] bg-[#111]">
                      {agent.category}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-end border-t border-[#222] pt-4 mt-4">
                  <div>
                    <div className="text-[#555] text-[8px] tracking-[0.2em] uppercase mb-1">Total Staked</div>
                    <div className="text-[#ccc] text-lg">{agent.staked}</div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <TierBadge tier={agent.tier} />
                    <div className="text-[#888] text-xs">{agent.stakers} stakers</div>
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
          <button className="text-[10px] tracking-[0.2em] uppercase px-6 py-3 border border-[#333] text-[#888] hover:border-[#555] hover:text-[#ccc] transition-colors">
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
