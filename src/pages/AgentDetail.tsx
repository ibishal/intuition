import React from 'react';
import { useParams } from 'react-router-dom';
import { Panel } from '../components/ui/Panel';
import { cn } from '../lib/utils';

function ProgressBar({ label, score, weight }: { label: string; score: number; weight: string }) {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <div className="flex justify-between text-[10px] tracking-[0.2em] uppercase">
        <span className="text-[#888]">{label} <span className="text-[#555]">({weight})</span></span>
        <span className="text-[#e5e5e5]">{score}/100</span>
      </div>
      <div className="h-1 w-full bg-[#222] relative">
        <div 
          className="absolute top-0 left-0 h-full bg-[#f97316]" 
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

export function AgentDetail() {
  const { atomId } = useParams();

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left Column: Info */}
      <div className="flex-1 flex flex-col gap-6">
        <Panel className="p-8">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-[#222] border border-[#333] flex items-center justify-center text-[#888] text-3xl font-light">
                C
              </div>
              <div>
                <h1 className="text-3xl font-light tracking-tight text-[#e5e5e5] mb-2">CodeReviewer</h1>
                <div className="flex items-center gap-4 text-[10px] tracking-widest uppercase">
                  <span className="text-[#555]">{atomId || '0x1234...5678'}</span>
                  <button className="text-[#f97316] hover:underline">COPY</button>
                  <span className="px-2 py-1 border border-emerald-500/50 text-emerald-500 bg-emerald-500/10">ACTIVE</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[#555] text-[10px] tracking-[0.2em] uppercase mb-1">CREATED</div>
              <div className="text-[#ccc] text-sm">2024-03-15</div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-[#555] text-[10px] tracking-[0.3em] uppercase mb-4">DESCRIPTION</h3>
            <p className="text-[#888] text-sm leading-relaxed">
              An autonomous agent specialized in reviewing smart contracts and identifying potential vulnerabilities. 
              Trained on a comprehensive dataset of known exploits and best practices.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-[#555] text-[10px] tracking-[0.3em] uppercase mb-4">CAPABILITIES</h3>
            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] tracking-[0.1em] px-3 py-1 border border-[#333] text-[#ccc] bg-[#111]">code-generation</span>
              <span className="text-[10px] tracking-[0.1em] px-3 py-1 border border-[#333] text-[#ccc] bg-[#111]">security</span>
              <span className="text-[10px] tracking-[0.1em] px-3 py-1 border border-[#333] text-[#ccc] bg-[#111]">analysis</span>
            </div>
          </div>

          <div>
            <h3 className="text-[#555] text-[10px] tracking-[0.3em] uppercase mb-4">ENDPOINT INFO</h3>
            <div className="grid grid-cols-2 gap-4 border border-[#222] p-4 bg-[#111]">
              <div>
                <div className="text-[#555] text-[8px] tracking-[0.2em] uppercase mb-1">TYPE</div>
                <div className="text-[#ccc] text-sm">MCP</div>
              </div>
              <div>
                <div className="text-[#555] text-[8px] tracking-[0.2em] uppercase mb-1">VERSION</div>
                <div className="text-[#ccc] text-sm">1.2.0</div>
              </div>
              <div className="col-span-2">
                <div className="text-[#555] text-[8px] tracking-[0.2em] uppercase mb-1">URL</div>
                <div className="text-[#f97316] text-sm break-all">https://api.codereviewer.agent/v1/mcp</div>
              </div>
            </div>
          </div>
        </Panel>

        <Panel className="p-8">
          <h3 className="text-[#555] text-[10px] tracking-[0.3em] uppercase mb-6">TRUST SCORE BREAKDOWN</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
            <ProgressBar label="Staking" score={85} weight="25%" />
            <ProgressBar label="Diversity" score={70} weight="15%" />
            <ProgressBar label="Sentiment" score={92} weight="20%" />
            <ProgressBar label="Operator Commitment" score={60} weight="15%" />
            <ProgressBar label="Longevity" score={45} weight="10%" />
            <ProgressBar label="Feedback" score={88} weight="15%" />
          </div>
        </Panel>
      </div>

      {/* Right Column: Actions & Stats */}
      <div className="w-full lg:w-96 flex flex-col gap-6">
        <Panel className="p-8 flex flex-col items-center text-center border-[#f97316]/30">
          <h3 className="text-[#555] text-[10px] tracking-[0.3em] uppercase mb-6 w-full text-left">TRUST SCORE</h3>
          <div className="text-7xl font-light tracking-tighter text-[#e5e5e5] mb-2">78</div>
          <span className="text-[10px] tracking-[0.2em] px-3 py-1 border border-emerald-400/50 text-emerald-400 bg-emerald-400/10 mb-6">
            HIGH
          </span>
          <div className="w-full flex justify-between text-[10px] tracking-[0.2em] uppercase border-t border-[#222] pt-4 mb-4">
            <span className="text-[#555]">CONFIDENCE</span>
            <span className="text-[#ccc]">0.85</span>
          </div>
          <p className="text-[#888] text-xs italic">
            "Trusted agent. Safe for most tasks."
          </p>
        </Panel>

        <Panel className="p-8 bg-[#111]">
          <h3 className="text-[#555] text-[10px] tracking-[0.3em] uppercase mb-6">STAKE POSITION</h3>
          <div className="flex flex-col gap-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="0.00" 
                className="w-full bg-[#050505] border border-[#333] text-[#e5e5e5] px-4 py-3 text-lg font-light focus:outline-none focus:border-[#f97316] transition-colors"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#555] text-xs tracking-widest">tTRUST</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button className="text-[10px] tracking-[0.2em] uppercase py-3 border border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/10 transition-colors">
                STAKE FOR
              </button>
              <button className="text-[10px] tracking-[0.2em] uppercase py-3 border border-red-500/50 text-red-500 hover:bg-red-500/10 transition-colors">
                STAKE AGAINST
              </button>
            </div>
            <div className="text-center mt-4 text-[#555] text-[10px] tracking-widest">
              Connect wallet to stake
            </div>
          </div>
        </Panel>

        <Panel className="p-8">
          <h3 className="text-[#555] text-[10px] tracking-[0.3em] uppercase mb-6">VAULT STATS</h3>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-[#222] pb-2">
              <span className="text-[#888] text-xs tracking-widest uppercase">Total Staked</span>
              <span className="text-[#e5e5e5] text-sm">12,450 tTRUST</span>
            </div>
            <div className="flex justify-between items-center border-b border-[#222] pb-2">
              <span className="text-[#888] text-xs tracking-widest uppercase">Stakers</span>
              <span className="text-[#e5e5e5] text-sm">342</span>
            </div>
            <div className="flex justify-between items-center border-b border-[#222] pb-2">
              <span className="text-[#888] text-xs tracking-widest uppercase">Share Price</span>
              <span className="text-[#e5e5e5] text-sm">1.05 ETH</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#888] text-xs tracking-widest uppercase">Market Cap</span>
              <span className="text-[#e5e5e5] text-sm">13,072 ETH</span>
            </div>
          </div>
        </Panel>

        <Panel className="p-8">
          <h3 className="text-[#555] text-[10px] tracking-[0.3em] uppercase mb-6">OPERATOR INFO</h3>
          <div className="flex flex-col gap-4">
            <div>
              <div className="text-[#555] text-[8px] tracking-[0.2em] uppercase mb-1">ADDRESS</div>
              <div className="text-[#f97316] text-xs break-all">0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B</div>
            </div>
            <div>
              <div className="text-[#555] text-[8px] tracking-[0.2em] uppercase mb-1">OPERATOR STAKE</div>
              <div className="text-[#ccc] text-sm">500 tTRUST</div>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
