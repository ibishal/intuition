import React from 'react';
import { Link } from 'react-router-dom';
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

export function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      {/* Top Stats */}
      <Panel className="flex flex-col md:flex-row justify-between items-center py-8 px-12">
        <StatItem label="MY AGENTS" value="2" />
        <Divider />
        <StatItem label="PORTFOLIO VALUE" value="1.68 ETH" />
        <Divider />
        <StatItem label="ACTIVE POSITIONS" value="3" />
      </Panel>

      {/* My Agents Section */}
      <Panel className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[#555] text-[10px] tracking-[0.3em] uppercase">MY REGISTERED AGENTS</h2>
          <Link to="/register" className="text-[#f97316] text-[10px] tracking-[0.2em] uppercase hover:underline">+ Register New</Link>
        </div>
        
        <div className="flex flex-col gap-4">
          {MY_AGENTS.map(agent => (
            <Link key={agent.id} to={`/agents/${agent.id}`}>
              <div className="flex items-center justify-between p-4 border border-[#222] bg-[#111] hover:border-[#555] transition-colors group">
                <div className="flex items-center gap-4 w-1/3">
                  <div className="w-10 h-10 bg-[#222] border border-[#333] flex items-center justify-center text-[#888] font-bold">
                    {agent.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-[#e5e5e5] font-medium group-hover:text-[#f97316] transition-colors">{agent.name}</div>
                    <div className="text-[#555] text-[10px] tracking-widest">0x{agent.id.repeat(4)}...</div>
                  </div>
                </div>
                <div className="w-1/4 flex justify-center">
                  <TierBadge tier={agent.tier} />
                </div>
                <div className="w-1/4 text-right">
                  <div className="text-[#555] text-[8px] tracking-[0.2em] uppercase mb-1">Total Staked</div>
                  <div className="text-[#ccc] text-sm">{agent.staked} tTRUST</div>
                </div>
                <div className="w-1/4 text-right">
                  <div className="text-[#555] text-[8px] tracking-[0.2em] uppercase mb-1">Stakers</div>
                  <div className="text-[#ccc] text-sm">{agent.stakers}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Panel>

      {/* My Staking Positions Section */}
      <Panel className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[#555] text-[10px] tracking-[0.3em] uppercase">MY STAKING POSITIONS</h2>
          <Link to="/agents" className="text-[#f97316] text-[10px] tracking-[0.2em] uppercase hover:underline">Explore Agents →</Link>
        </div>
        
        <div className="flex flex-col gap-4">
          {MY_POSITIONS.map(pos => (
            <div key={pos.id} className="flex items-center justify-between p-4 border border-[#222] bg-[#111]">
              <div className="w-1/4">
                <Link to={`/agents/${pos.id}`} className="text-[#e5e5e5] font-medium hover:text-[#f97316] transition-colors">
                  {pos.agentName}
                </Link>
              </div>
              <div className="w-1/4 text-center">
                <span className={cn(
                  "text-[8px] tracking-[0.2em] px-2 py-1 border",
                  pos.type === 'FOR' 
                    ? "text-emerald-400 border-emerald-400/50 bg-emerald-400/10"
                    : "text-red-400 border-red-400/50 bg-red-400/10"
                )}>
                  {pos.type}
                </span>
              </div>
              <div className="w-1/4 text-right">
                <div className="text-[#555] text-[8px] tracking-[0.2em] uppercase mb-1">Shares</div>
                <div className="text-[#ccc] text-sm">{pos.shares}</div>
              </div>
              <div className="w-1/4 text-right">
                <div className="text-[#555] text-[8px] tracking-[0.2em] uppercase mb-1">Value</div>
                <div className="text-[#ccc] text-sm">{pos.value} ETH</div>
              </div>
              <div className="w-auto pl-8">
                <button className="text-[10px] tracking-[0.2em] uppercase px-4 py-2 border border-[#555] text-[#ccc] hover:border-[#888] hover:text-[#fff] transition-colors">
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
