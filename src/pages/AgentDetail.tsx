import React from 'react';
import { useParams } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Panel } from '../components/ui/Panel';
import { cn } from '../lib/utils';

const historyData = [
  { date: '2024-01', score: 45 },
  { date: '2024-02', score: 52 },
  { date: '2024-03', score: 58 },
  { date: '2024-04', score: 65 },
  { date: '2024-05', score: 72 },
  { date: '2024-06', score: 78 },
];

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#050505] border border-[#f97316] p-3 shadow-[0_0_15px_rgba(249,115,22,0.2)]">
        <p className="text-[#555] text-[10px] tracking-widest uppercase mb-1">{label}</p>
        <p className="text-[#f97316] text-lg font-light">{payload[0].value}</p>
      </div>
    );
  }
  return null;
}

function ProgressBar({ label, score, weight }: { label: string; score: number; weight: string }) {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <div className="flex justify-between text-[10px] tracking-[0.2em] uppercase">
        <span className="text-[#888]">{label} <span className="text-[#555]">({weight})</span></span>
        <span className="text-[#e5e5e5]">{score}/100</span>
      </div>
      <div className="h-1 w-full bg-[#222] relative overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-[#f97316] shadow-[0_0_10px_rgba(249,115,22,0.8)]" 
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
        <Panel className="p-8 relative overflow-hidden">
          {/* Decorative background grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-[#111] border border-[#333] flex items-center justify-center text-[#f97316] text-3xl font-light shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                  C
                </div>
                <div>
                  <h1 className="text-3xl font-light tracking-tight text-[#e5e5e5] mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">CodeReviewer</h1>
                  <div className="flex items-center gap-4 text-[10px] tracking-widest uppercase">
                    <span className="text-[#555]">{atomId || '0x1234...5678'}</span>
                    <button className="text-[#f97316] hover:text-[#ff984d] transition-colors">COPY</button>
                    <span className="px-2 py-1 border border-emerald-500/50 text-emerald-500 bg-emerald-500/10 shadow-[0_0_10px_rgba(16,185,129,0.2)]">ACTIVE</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[#555] text-[10px] tracking-[0.2em] uppercase mb-1">CREATED</div>
                <div className="text-[#ccc] text-sm">2024-03-15</div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-[#555] text-[10px] tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
                <div className="w-1 h-1 bg-[#f97316]" /> DESCRIPTION
              </h3>
              <p className="text-[#888] text-sm leading-relaxed border-l border-[#333] pl-4">
                An autonomous agent specialized in reviewing smart contracts and identifying potential vulnerabilities. 
                Trained on a comprehensive dataset of known exploits and best practices.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-[#555] text-[10px] tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
                <div className="w-1 h-1 bg-[#f97316]" /> CAPABILITIES
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] tracking-[0.1em] px-3 py-1 border border-[#333] text-[#ccc] bg-[#111] hover:border-[#f97316] hover:text-[#f97316] transition-colors cursor-default">code-generation</span>
                <span className="text-[10px] tracking-[0.1em] px-3 py-1 border border-[#333] text-[#ccc] bg-[#111] hover:border-[#f97316] hover:text-[#f97316] transition-colors cursor-default">security</span>
                <span className="text-[10px] tracking-[0.1em] px-3 py-1 border border-[#333] text-[#ccc] bg-[#111] hover:border-[#f97316] hover:text-[#f97316] transition-colors cursor-default">analysis</span>
              </div>
            </div>

            <div>
              <h3 className="text-[#555] text-[10px] tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
                <div className="w-1 h-1 bg-[#f97316]" /> ENDPOINT INFO
              </h3>
              <div className="grid grid-cols-2 gap-4 border border-[#222] p-4 bg-[#0a0a0a] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#f97316]/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
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
                  <div className="text-[#f97316] text-sm break-all font-mono">https://api.codereviewer.agent/v1/mcp</div>
                </div>
              </div>
            </div>
          </div>
        </Panel>

        <Panel className="p-8">
          <h3 className="text-[#555] text-[10px] tracking-[0.3em] uppercase mb-6 flex items-center gap-2">
            <div className="w-1 h-1 bg-[#f97316]" /> TRUST SCORE HISTORY
          </h3>
          <div className="h-48 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historyData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#333" tick={{ fill: '#555', fontSize: 10 }} tickLine={false} axisLine={false} />
                <YAxis stroke="#333" tick={{ fill: '#555', fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="score" stroke="#f97316" strokeWidth={2} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <Panel className="p-8">
          <h3 className="text-[#555] text-[10px] tracking-[0.3em] uppercase mb-6 flex items-center gap-2">
            <div className="w-1 h-1 bg-[#f97316]" /> TRUST SCORE BREAKDOWN
          </h3>
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
        <Panel className="p-8 flex flex-col items-center text-center border-[#f97316]/30 shadow-[0_0_30px_rgba(249,115,22,0.05)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#f97316] to-transparent opacity-50" />
          <h3 className="text-[#555] text-[10px] tracking-[0.3em] uppercase mb-6 w-full text-left">TRUST SCORE</h3>
          <div className="text-7xl font-light tracking-tighter text-[#e5e5e5] mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">78</div>
          <span className="text-[10px] tracking-[0.2em] px-3 py-1 border border-emerald-400/50 text-emerald-400 bg-emerald-400/10 mb-6 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
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

        <Panel className="p-8 bg-[#0a0a0a]">
          <h3 className="text-[#555] text-[10px] tracking-[0.3em] uppercase mb-6 flex items-center gap-2">
            <div className="w-1 h-1 bg-[#f97316]" /> STAKE POSITION
          </h3>
          <div className="flex flex-col gap-4">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="0.00" 
                className="w-full bg-[#050505] border border-[#333] text-[#e5e5e5] px-4 py-3 text-lg font-light focus:outline-none focus:border-[#f97316] focus:shadow-[0_0_10px_rgba(249,115,22,0.2)] transition-all"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#555] text-xs tracking-widest group-focus-within:text-[#f97316] transition-colors">tTRUST</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button className="text-[10px] tracking-[0.2em] uppercase py-3 border border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/20 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all">
                STAKE FOR
              </button>
              <button className="text-[10px] tracking-[0.2em] uppercase py-3 border border-red-500/50 text-red-500 hover:bg-red-500/20 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all">
                STAKE AGAINST
              </button>
            </div>
            <div className="text-center mt-4 text-[#555] text-[10px] tracking-widest">
              Connect wallet to stake
            </div>
          </div>
        </Panel>

        <Panel className="p-8">
          <h3 className="text-[#555] text-[10px] tracking-[0.3em] uppercase mb-6 flex items-center gap-2">
            <div className="w-1 h-1 bg-[#f97316]" /> VAULT STATS
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-[#222] pb-2">
              <span className="text-[#888] text-xs tracking-widest uppercase">Total Staked</span>
              <span className="text-[#e5e5e5] text-sm font-medium">12,450 tTRUST</span>
            </div>
            <div className="flex justify-between items-center border-b border-[#222] pb-2">
              <span className="text-[#888] text-xs tracking-widest uppercase">Stakers</span>
              <span className="text-[#e5e5e5] text-sm font-medium">342</span>
            </div>
            <div className="flex justify-between items-center border-b border-[#222] pb-2">
              <span className="text-[#888] text-xs tracking-widest uppercase">Share Price</span>
              <span className="text-[#e5e5e5] text-sm font-medium">1.05 ETH</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#888] text-xs tracking-widest uppercase">Market Cap</span>
              <span className="text-[#e5e5e5] text-sm font-medium">13,072 ETH</span>
            </div>
          </div>
        </Panel>

        <Panel className="p-8">
          <h3 className="text-[#555] text-[10px] tracking-[0.3em] uppercase mb-6 flex items-center gap-2">
            <div className="w-1 h-1 bg-[#f97316]" /> OPERATOR INFO
          </h3>
          <div className="flex flex-col gap-4">
            <div>
              <div className="text-[#555] text-[8px] tracking-[0.2em] uppercase mb-1">ADDRESS</div>
              <div className="text-[#f97316] text-xs break-all font-mono hover:underline cursor-pointer">0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B</div>
            </div>
            <div>
              <div className="text-[#555] text-[8px] tracking-[0.2em] uppercase mb-1">OPERATOR STAKE</div>
              <div className="text-[#ccc] text-sm font-medium">500 tTRUST</div>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
