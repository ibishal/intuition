import React from 'react';
import { Link } from 'react-router-dom';
import { Panel } from '../components/ui/Panel';
import { StatItem, Divider } from '../components/ui/StatItem';
import { Globe } from '../components/ui/Globe';
import { cn } from '../lib/utils';

const FEATURED_AGENTS = [
  { id: '1', name: 'CodeReviewer', staked: '12,450', stakers: 342, tier: 'ELITE' },
  { id: '2', name: 'DataAnalyzer', staked: '8,210', stakers: 215, tier: 'HIGH' },
  { id: '3', name: 'SecurityBot', staked: '6,100', stakers: 189, tier: 'HIGH' },
  { id: '4', name: 'DeFiTrader', staked: '4,500', stakers: 120, tier: 'MEDIUM' },
  { id: '5', name: 'ResearchAsst', staked: '3,200', stakers: 95, tier: 'MEDIUM' },
  { id: '6', name: 'CreativeWriter', staked: '1,100', stakers: 45, tier: 'LOW' },
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

export function Landing() {
  return (
    <div className="flex flex-col gap-6">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">
        <Panel className="flex flex-col justify-center p-12">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-[#e5e5e5] mb-6 leading-tight">
            DECENTRALIZED TRUST <br />
            <span className="text-[#f97316]">REGISTRY FOR AI AGENTS</span>
          </h1>
          <p className="text-[#888] text-sm md:text-base max-w-md mb-12 leading-relaxed">
            Discover, verify, and stake on autonomous agents. The AgentID protocol uses crypto-economic primitives to establish a verifiable trust layer for the AI economy.
          </p>
          <div className="flex items-center gap-4">
            <Link 
              to="/agents" 
              className="text-[10px] tracking-[0.2em] uppercase px-6 py-3 border border-[#f97316] bg-[#f97316]/10 text-[#f97316] hover:bg-[#f97316]/20 transition-colors"
            >
              Explore Agents
            </Link>
            <Link 
              to="/register" 
              className="text-[10px] tracking-[0.2em] uppercase px-6 py-3 border border-[#555] text-[#ccc] hover:border-[#888] hover:text-[#fff] transition-colors"
            >
              Register Agent
            </Link>
          </div>
        </Panel>
        <Panel className="relative p-0 overflow-hidden hidden lg:block">
          <Globe />
        </Panel>
      </div>

      {/* Top Stats */}
      <Panel className="flex flex-col md:flex-row justify-between items-center py-8 px-12">
        <StatItem label="TOTAL AGENTS" value="1,248" />
        <Divider />
        <StatItem label="TOTAL tTRUST STAKED" value="84.5k" />
        <Divider />
        <StatItem label="TOTAL STAKERS" value="3,912" />
      </Panel>

      {/* Featured Agents */}
      <div className="flex flex-col gap-4 mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-[#555] text-[10px] tracking-[0.3em] uppercase">FEATURED AGENTS</h2>
          <Link to="/agents" className="text-[#f97316] text-[10px] tracking-[0.2em] uppercase hover:underline">View All →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURED_AGENTS.map((agent) => (
            <Link key={agent.id} to={`/agents/${agent.id}`}>
              <Panel className="hover:border-[#555] transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#222] border border-[#333] flex items-center justify-center text-[#888] font-bold">
                      {agent.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-[#e5e5e5] font-medium group-hover:text-[#f97316] transition-colors">{agent.name}</div>
                      <div className="text-[#555] text-[10px] tracking-widest">0x{agent.id.repeat(4)}...</div>
                    </div>
                  </div>
                  <TierBadge tier={agent.tier} />
                </div>
                <div className="flex justify-between items-end border-t border-[#222] pt-4 mt-4">
                  <div>
                    <div className="text-[#555] text-[8px] tracking-[0.2em] uppercase mb-1">Total Staked</div>
                    <div className="text-[#ccc] text-lg">{agent.staked} <span className="text-[#555] text-xs">tTRUST</span></div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#555] text-[8px] tracking-[0.2em] uppercase mb-1">Stakers</div>
                    <div className="text-[#ccc] text-lg">{agent.stakers}</div>
                  </div>
                </div>
              </Panel>
            </Link>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <Panel className="mt-8 p-12">
        <h2 className="text-[#555] text-[10px] tracking-[0.3em] uppercase mb-12 text-center">HOW IT WORKS</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-12 h-12 rounded-full border border-[#555] flex items-center justify-center text-[#f97316] text-xl font-light mb-2">1</div>
            <h3 className="text-[#e5e5e5] tracking-widest uppercase text-sm">Register</h3>
            <p className="text-[#888] text-sm">Create an on-chain identity for your AI agent via IPFS + Intuition Atoms.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-12 h-12 rounded-full border border-[#555] flex items-center justify-center text-[#f97316] text-xl font-light mb-2">2</div>
            <h3 className="text-[#e5e5e5] tracking-widest uppercase text-sm">Stake</h3>
            <p className="text-[#888] text-sm">Community stakes tTRUST tokens to signal trust (or distrust) in the agent.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-12 h-12 rounded-full border border-[#555] flex items-center justify-center text-[#f97316] text-xl font-light mb-2">3</div>
            <h3 className="text-[#e5e5e5] tracking-widest uppercase text-sm">Verify</h3>
            <p className="text-[#888] text-sm">LLMs and other agents query trust scores before interacting with the agent.</p>
          </div>
        </div>
      </Panel>
    </div>
  );
}
