import React, { useState } from 'react';
import { Panel } from '../components/ui/Panel';
import { cn } from '../lib/utils';

export function Register() {
  const [step, setStep] = useState(1);

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      <Panel className="p-8">
        <h1 className="text-3xl font-light tracking-tight text-[#e5e5e5] mb-2">REGISTER AGENT</h1>
        <p className="text-[#888] text-sm mb-8">Create an on-chain identity for your AI agent via IPFS + Intuition Atoms.</p>

        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-12">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex flex-col items-center gap-2 flex-1 relative">
              <div 
                className={cn(
                  "w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold z-10 bg-[#050505]",
                  step >= s ? "border-[#f97316] text-[#f97316]" : "border-[#333] text-[#555]"
                )}
              >
                {s}
              </div>
              <div className="text-[8px] tracking-[0.2em] uppercase text-[#888]">
                {s === 1 ? 'BASIC INFO' : s === 2 ? 'ENDPOINT' : s === 3 ? 'CAPABILITIES' : 'REVIEW'}
              </div>
              {s < 4 && (
                <div 
                  className={cn(
                    "absolute top-4 left-1/2 w-full h-[1px] -z-0",
                    step > s ? "bg-[#f97316]" : "bg-[#333]"
                  )} 
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Content */}
        <div className="flex flex-col gap-6">
          {step === 1 && (
            <>
              <div className="flex flex-col gap-2">
                <label className="text-[#555] text-[10px] tracking-[0.2em] uppercase">AGENT NAME</label>
                <input 
                  type="text" 
                  placeholder="e.g. CodeReviewer" 
                  className="bg-[#111] border border-[#333] text-[#e5e5e5] px-4 py-3 text-sm focus:outline-none focus:border-[#f97316] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[#555] text-[10px] tracking-[0.2em] uppercase">DESCRIPTION</label>
                <textarea 
                  rows={4}
                  placeholder="Describe what your agent does..." 
                  className="bg-[#111] border border-[#333] text-[#e5e5e5] px-4 py-3 text-sm focus:outline-none focus:border-[#f97316] transition-colors resize-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[#555] text-[10px] tracking-[0.2em] uppercase">IMAGE URL (OPTIONAL)</label>
                <input 
                  type="text" 
                  placeholder="https://..." 
                  className="bg-[#111] border border-[#333] text-[#e5e5e5] px-4 py-3 text-sm focus:outline-none focus:border-[#f97316] transition-colors"
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="flex flex-col gap-2">
                <label className="text-[#555] text-[10px] tracking-[0.2em] uppercase">ENDPOINT TYPE</label>
                <select className="bg-[#111] border border-[#333] text-[#e5e5e5] px-4 py-3 text-sm focus:outline-none focus:border-[#f97316] transition-colors appearance-none">
                  <option>MCP</option>
                  <option>A2A</option>
                  <option>WEB</option>
                  <option>EMAIL</option>
                  <option>ENS</option>
                  <option>DID</option>
                  <option>OASF</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[#555] text-[10px] tracking-[0.2em] uppercase">ENDPOINT URL</label>
                <input 
                  type="text" 
                  placeholder="https://api.agent.com/v1" 
                  className="bg-[#111] border border-[#333] text-[#e5e5e5] px-4 py-3 text-sm focus:outline-none focus:border-[#f97316] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[#555] text-[10px] tracking-[0.2em] uppercase">VERSION (OPTIONAL)</label>
                <input 
                  type="text" 
                  placeholder="1.0.0" 
                  className="bg-[#111] border border-[#333] text-[#e5e5e5] px-4 py-3 text-sm focus:outline-none focus:border-[#f97316] transition-colors"
                />
              </div>
              <div className="flex items-center gap-4 mt-4">
                <input type="checkbox" id="x402" className="w-4 h-4 accent-[#f97316] bg-[#111] border-[#333]" />
                <label htmlFor="x402" className="text-[#ccc] text-sm">Supports x402 payment</label>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="border border-[#333] p-4 bg-[#111] flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-[#e5e5e5] text-sm tracking-widest uppercase">Capability 1</h4>
                  <button className="text-[#888] hover:text-red-500 text-xs tracking-widest uppercase">Remove</button>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[#555] text-[10px] tracking-[0.2em] uppercase">NAME</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Python Code Review" 
                    className="bg-[#050505] border border-[#333] text-[#e5e5e5] px-4 py-2 text-sm focus:outline-none focus:border-[#f97316] transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[#555] text-[10px] tracking-[0.2em] uppercase">CATEGORY</label>
                  <select className="bg-[#050505] border border-[#333] text-[#e5e5e5] px-4 py-2 text-sm focus:outline-none focus:border-[#f97316] transition-colors appearance-none">
                    <option>code-generation</option>
                    <option>data-processing</option>
                    <option>analysis</option>
                  </select>
                </div>
              </div>
              <button className="w-full border border-dashed border-[#555] text-[#888] py-4 text-xs tracking-[0.2em] uppercase hover:border-[#f97316] hover:text-[#f97316] transition-colors">
                + ADD CAPABILITY
              </button>
            </>
          )}

          {step === 4 && (
            <>
              <div className="flex flex-col gap-6">
                <div className="border border-[#222] p-6 bg-[#111]">
                  <h3 className="text-[#555] text-[10px] tracking-[0.3em] uppercase mb-4">SUMMARY</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-[#888]">Name</div>
                    <div className="text-[#e5e5e5] text-right">CodeReviewer</div>
                    <div className="text-[#888]">Endpoint</div>
                    <div className="text-[#e5e5e5] text-right">MCP (https://...)</div>
                    <div className="text-[#888]">Capabilities</div>
                    <div className="text-[#e5e5e5] text-right">1</div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[#555] text-[10px] tracking-[0.2em] uppercase">TRUST MODELS</label>
                  <div className="flex flex-wrap gap-2">
                    {['reputation', 'crypto-economic', 'tee-attestation', 'zkml'].map(model => (
                      <label key={model} className="flex items-center gap-2 border border-[#333] px-3 py-2 cursor-pointer hover:border-[#555]">
                        <input type="checkbox" className="accent-[#f97316]" />
                        <span className="text-[#ccc] text-xs tracking-widest">{model}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[#555] text-[10px] tracking-[0.2em] uppercase">INITIAL STAKE (tTRUST)</label>
                  <input 
                    type="text" 
                    defaultValue="0.001" 
                    className="bg-[#111] border border-[#333] text-[#e5e5e5] px-4 py-3 text-sm focus:outline-none focus:border-[#f97316] transition-colors"
                  />
                  <span className="text-[#888] text-[10px] tracking-widest">Est. Cost: ~0.0014 tTRUST (Atom + Triples + Stake)</span>
                </div>
              </div>
            </>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-[#222]">
            <button 
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="text-[10px] tracking-[0.2em] uppercase px-6 py-3 border border-[#333] text-[#888] hover:border-[#555] hover:text-[#ccc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              BACK
            </button>
            
            {step < 4 ? (
              <button 
                onClick={() => setStep(Math.min(4, step + 1))}
                className="text-[10px] tracking-[0.2em] uppercase px-6 py-3 border border-[#f97316] bg-[#f97316]/10 text-[#f97316] hover:bg-[#f97316]/20 transition-colors"
              >
                NEXT STEP
              </button>
            ) : (
              <button 
                className="text-[10px] tracking-[0.2em] uppercase px-6 py-3 border border-emerald-500 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 transition-colors"
              >
                REGISTER AGENT
              </button>
            )}
          </div>
        </div>
      </Panel>
    </div>
  );
}
