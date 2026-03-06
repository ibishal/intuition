import React from 'react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Panel } from '../components/ui/Panel';
import { StatItem, Divider } from '../components/ui/StatItem';
import { cn } from '../lib/utils';

const MY_AGENTS = [
  { id: '1', name: 'CodeReviewer', staked: '12,450', stakers: 342, tier: 'ELITE' },
  { id: '2', name: 'DataAnalyzer', staked: '8,210', stakers: 215, tier: 'HIGH' },
];

const MY_POSITIONS = [
  { id: '1', agentName: 'CodeReviewer', shares: '150.5', value: '1.25', type: 'FOR' },
  { id: '3', agentName: 'SecurityBot', shares: '45.2', value: '0.38', type: 'FOR' },
  { id: '6', agentName: 'CreativeWriter', shares: '12.0', value: '0.05', type: 'AGAINST' },
];

const portfolioData = [
  { date: '2024-01', value: 0.5 },
  { date: '2024-02', value: 0.8 },
  { date: '2024-03', value: 1.1 },
  { date: '2024-04', value: 1.0 },
  { date: '2024-05', value: 1.4 },
  { date: '2024-06', value: 1.68 },
];

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#050505] border border-[#f97316] p-3 shadow-[0_0_15px_rgba(249,115,22,0.2)]">
        <p className="text-[#555] text-[10px] tracking-widest uppercase mb-1">{label}</p>
        <p className="text-[#f97316] text-lg font-light">{payload[0].value} ETH</p>
      </div>
    );
  }
  return null;
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

export function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      {/* Top Stats & Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Panel className="flex flex-col justify-center gap-8 py-8 px-12 col-span-1 border-[#f97316]/30 shadow-[0_0_30px_rgba(249,115,22,0.05)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#f97316] to-transparent opacity-50" />
          <StatItem label="PORTFOLIO VALUE" value="1.68 ETH" />
          <div className="flex flex-col gap-4 border-t border-[#222] pt-6">
            <div className="flex justify-between items-center">
              <span className="text-[#555] text-[10px] tracking-[0.3em] uppercase">MY AGENTS</span>
              <span className="text-[#e5e5e5] text-xl font-light">2</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#555] text-[10px] tracking-[0.3em] uppercase">ACTIVE POSITIONS</span>
              <span className="text-[#e5e5e5] text-xl font-light">3</span>
            </div>
          </div>
        </Panel>

        <Panel className="col-span-1 lg:col-span-2 p-8">
          <h3 className="text-[#555] text-[10px] tracking-[0.3em] uppercase mb-6 flex items-center gap-2">
            <div className="w-1 h-1 bg-[#f97316]" /> PORTFOLIO PERFORMANCE
          </h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={portfolioData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#333" tick={{ fill: '#555', fontSize: 10 }} tickLine={false} axisLine={false} />
                <YAxis stroke="#333" tick={{ fill: '#555', fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="value" stroke="#f97316" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      {/* My Agents Section */}
      <Panel className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[#555] text-[10px] tracking-[0.3em] uppercase flex items-center gap-2">
            <div className="w-1 h-1 bg-[#f97316]" /> MY REGISTERED AGENTS
          </h2>
          <Link to="/register" className="text-[#f97316] text-[10px] tracking-[0.2em] uppercase hover:text-[#ff984d] transition-colors border border-[#f97316]/30 px-4 py-2 hover:bg-[#f97316]/10">+ Register New</Link>
        </div>
        
        <div className="flex flex-col gap-4">
          {MY_AGENTS.map(agent => (
            <Link key={agent.id} to={`/agents/${agent.id}`}>
              <div className="relative overflow-hidden flex items-center justify-between p-4 border border-[#222] bg-[#0a0a0a] hover:border-[#f97316]/50 hover:shadow-[0_0_15px_rgba(249,115,22,0.1)] transition-all duration-500 group">
                {/* Gradient Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#f97316]/0 via-transparent to-[#f97316]/0 group-hover:from-[#f97316]/5 group-hover:to-transparent transition-all duration-500 z-0 pointer-events-none" />

                <div className="relative z-10 flex items-center gap-4 w-1/3">
                  <div className="w-10 h-10 bg-[#111] border border-[#333] group-hover:border-[#f97316]/50 flex items-center justify-center text-[#f97316] font-light shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] transition-colors duration-500">
                    {agent.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-[#e5e5e5] font-medium group-hover:text-[#f97316] transition-colors">{agent.name}</div>
                    <div className="text-[#555] text-[10px] tracking-widest font-mono">0x{agent.id.repeat(4)}...</div>
                  </div>
                </div>
                <div className="relative z-10 w-1/4 flex justify-center">
                  <TierBadge tier={agent.tier} />
                </div>
                <div className="relative z-10 w-1/4 text-right">
                  <div className="text-[#555] text-[8px] tracking-[0.2em] uppercase mb-1">Total Staked</div>
                  <div className="text-[#ccc] text-sm font-medium group-hover:text-white transition-colors">{agent.staked} tTRUST</div>
                </div>
                <div className="relative z-10 w-1/4 text-right">
                  <div className="text-[#555] text-[8px] tracking-[0.2em] uppercase mb-1">Stakers</div>
                  <div className="text-[#ccc] text-sm font-medium">{agent.stakers}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Panel>

      {/* My Staking Positions Section */}
      <Panel className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[#555] text-[10px] tracking-[0.3em] uppercase flex items-center gap-2">
            <div className="w-1 h-1 bg-[#f97316]" /> MY STAKING POSITIONS
          </h2>
          <Link to="/agents" className="text-[#f97316] text-[10px] tracking-[0.2em] uppercase hover:text-[#ff984d] transition-colors">Explore Agents →</Link>
        </div>
        
        <div className="flex flex-col gap-4">
          {MY_POSITIONS.map(pos => (
            <div key={pos.id} className="relative overflow-hidden flex items-center justify-between p-4 border border-[#222] bg-[#0a0a0a] hover:border-[#333] transition-all duration-500 group">
              {/* Gradient Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#555]/0 via-transparent to-[#555]/0 group-hover:from-[#555]/5 group-hover:to-transparent transition-all duration-500 z-0 pointer-events-none" />

              <div className="relative z-10 w-1/4">
                <Link to={`/agents/${pos.id}`} className="text-[#e5e5e5] font-medium hover:text-[#f97316] transition-colors">
                  {pos.agentName}
                </Link>
              </div>
              <div className="relative z-10 w-1/4 text-center">
                <span className={cn(
                  "text-[8px] tracking-[0.2em] px-2 py-1 border",
                  pos.type === 'FOR' 
                    ? "text-emerald-400 border-emerald-400/50 bg-emerald-400/10 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                    : "text-red-400 border-red-400/50 bg-red-400/10 shadow-[0_0_10px_rgba(239,68,68,0.2)]"
                )}>
                  {pos.type}
                </span>
              </div>
              <div className="relative z-10 w-1/4 text-right">
                <div className="text-[#555] text-[8px] tracking-[0.2em] uppercase mb-1">Shares</div>
                <div className="text-[#ccc] text-sm font-medium group-hover:text-white transition-colors">{pos.shares}</div>
              </div>
              <div className="relative z-10 w-1/4 text-right">
                <div className="text-[#555] text-[8px] tracking-[0.2em] uppercase mb-1">Value</div>
                <div className="text-[#ccc] text-sm font-medium group-hover:text-white transition-colors">{pos.value} ETH</div>
              </div>
              <div className="relative z-10 w-auto pl-8">
                <button className="text-[10px] tracking-[0.2em] uppercase px-4 py-2 border border-[#555] text-[#ccc] hover:border-[#f97316] hover:text-[#f97316] hover:bg-[#f97316]/10 transition-all">
                  Redeem
                </button>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
