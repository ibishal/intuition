import React from 'react';
import { Link } from 'react-router-dom';
import { Panel } from '../components/ui/Panel';
import { StatItem, Divider } from '../components/ui/StatItem';
import { Globe } from '../components/ui/Globe';
import { FeaturedAgentsAccordion } from '../components/FeaturedAgentsAccordion';
import { cn } from '../lib/utils';

export function Landing() {
  return (
    <div className="flex flex-col gap-6">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">
        <Panel className="flex flex-col justify-center p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#f97316] to-transparent" />
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-[#e5e5e5] mb-6 leading-tight relative z-10">
            DECENTRALIZED TRUST <br />
            <span className="text-[#f97316]">REGISTRY FOR AI AGENTS</span>
          </h1>
          <p className="text-[#888] text-sm md:text-base max-w-md mb-12 leading-relaxed relative z-10">
            Discover, verify, and stake on autonomous agents. The AgentID protocol uses crypto-economic primitives to establish a verifiable trust layer for the AI economy.
          </p>
          <div className="flex items-center gap-4 relative z-10">
            <Link 
              to="/agents" 
              className="text-[10px] tracking-[0.2em] uppercase px-6 py-3 border border-[#f97316] bg-[#f97316]/10 text-[#f97316] hover:bg-[#f97316]/20 transition-colors shadow-[0_0_15px_rgba(249,115,22,0.2)]"
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
        <Panel className="relative p-0 overflow-hidden hidden lg:block border-[#333]">
          <Globe />
        </Panel>
      </div>

      {/* Top Stats */}
      <Panel className="flex flex-col md:flex-row justify-between items-center py-8 px-12 border-[#333]">
        <StatItem label="TOTAL AGENTS" value="1,248" />
        <Divider />
        <StatItem label="TOTAL tTRUST STAKED" value="84.5k" />
        <Divider />
        <StatItem label="TOTAL STAKERS" value="3,912" />
      </Panel>

      {/* Featured Agents */}
      <div className="flex flex-col gap-4 mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-[#555] text-[10px] tracking-[0.3em] uppercase flex items-center gap-2">
            <div className="w-2 h-2 bg-[#f97316] shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
            FEATURED AGENTS
          </h2>
          <Link to="/agents" className="text-[#f97316] text-[10px] tracking-[0.2em] uppercase hover:underline">View All →</Link>
        </div>
        <FeaturedAgentsAccordion />
      </div>

      {/* How It Works */}
      <Panel className="mt-8 p-12 border-[#333]">
        <h2 className="text-[#555] text-[10px] tracking-[0.3em] uppercase mb-12 text-center">HOW IT WORKS</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center gap-4 group">
            <div className="w-16 h-16 rounded-full border border-[#555] group-hover:border-[#f97316] flex items-center justify-center text-[#f97316] text-2xl font-light mb-2 transition-colors shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] bg-[#0a0a0a]">1</div>
            <h3 className="text-[#e5e5e5] tracking-widest uppercase text-sm group-hover:text-[#f97316] transition-colors">Register</h3>
            <p className="text-[#888] text-sm">Create an on-chain identity for your AI agent via IPFS + Intuition Atoms.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-4 group">
            <div className="w-16 h-16 rounded-full border border-[#555] group-hover:border-[#f97316] flex items-center justify-center text-[#f97316] text-2xl font-light mb-2 transition-colors shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] bg-[#0a0a0a]">2</div>
            <h3 className="text-[#e5e5e5] tracking-widest uppercase text-sm group-hover:text-[#f97316] transition-colors">Stake</h3>
            <p className="text-[#888] text-sm">Community stakes tTRUST tokens to signal trust (or distrust) in the agent.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-4 group">
            <div className="w-16 h-16 rounded-full border border-[#555] group-hover:border-[#f97316] flex items-center justify-center text-[#f97316] text-2xl font-light mb-2 transition-colors shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] bg-[#0a0a0a]">3</div>
            <h3 className="text-[#e5e5e5] tracking-widest uppercase text-sm group-hover:text-[#f97316] transition-colors">Verify</h3>
            <p className="text-[#888] text-sm">LLMs and other agents query trust scores before interacting with the agent.</p>
          </div>
        </div>
      </Panel>
    </div>
  );
}
