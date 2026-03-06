import React, { useState, useEffect, useRef } from 'react';
import { Panel } from '../components/ui/Panel';
import { cn } from '../lib/utils';

const STEPS = [
  { id: 1, label: 'BASIC INFO' },
  { id: 2, label: 'ENDPOINT' },
  { id: 3, label: 'CAPABILITIES' },
  { id: 4, label: 'REVIEW' }
];

const CAPABILITIES_LIST = [
  'data-processing', 'code-generation', 'task-automation', 'communication', 
  'analysis', 'creative', 'financial', 'research', 'security', 'infrastructure'
];

export function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    endpointUrl: '',
    endpointType: 'MCP',
    version: '1.0.0',
    capabilities: [] as string[]
  });
  const [logs, setLogs] = useState<string[]>(['> INITIALIZING REGISTRATION SEQUENCE...']);
  const logEndRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `> ${msg}`]);
  };

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const handleNext = () => {
    if (step === 1) addLog(`VALIDATING BASIC INFO FOR: ${formData.name || 'UNKNOWN'}... OK.`);
    if (step === 2) addLog(`VERIFYING ENDPOINT: ${formData.endpointUrl || 'NONE'}... OK.`);
    if (step === 3) addLog(`REGISTERING ${formData.capabilities.length} CAPABILITIES... OK.`);
    setStep(Math.min(4, step + 1));
  };
  
  const handlePrev = () => setStep(Math.max(1, step - 1));

  const toggleCapability = (cap: string) => {
    setFormData(prev => ({
      ...prev,
      capabilities: prev.capabilities.includes(cap)
        ? prev.capabilities.filter(c => c !== cap)
        : [...prev.capabilities, cap]
    }));
    addLog(`${formData.capabilities.includes(cap) ? 'REMOVED' : 'ADDED'} CAPABILITY: ${cap}`);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left Column: Form */}
      <div className="flex-1 flex flex-col gap-6">
        <Panel className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-light tracking-tight text-[#e5e5e5] flex items-center gap-3">
              <div className="w-2 h-2 bg-[#f97316] shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
              REGISTER AGENT
            </h1>
            <div className="text-[#555] text-[10px] tracking-widest">STEP {step} OF 4</div>
          </div>

          <div className="flex justify-between relative mb-12">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#222] -translate-y-1/2 z-0" />
            {STEPS.map((s) => (
              <div key={s.id} className="relative z-10 flex flex-col items-center gap-2">
                <div className={cn(
                  "w-4 h-4 rounded-full border-2 transition-all duration-300",
                  step >= s.id 
                    ? "bg-[#f97316] border-[#f97316] shadow-[0_0_15px_rgba(249,115,22,0.5)]" 
                    : "bg-[#050505] border-[#333]"
                )} />
                <span className={cn(
                  "text-[8px] tracking-[0.2em] absolute top-6 whitespace-nowrap transition-colors",
                  step >= s.id ? "text-[#f97316]" : "text-[#555]"
                )}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <div className="min-h-[300px]">
            {step === 1 && (
              <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <label className="block text-[#555] text-[10px] tracking-[0.2em] uppercase mb-2">Agent Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-[#0a0a0a] border border-[#333] text-[#e5e5e5] px-4 py-3 text-sm focus:outline-none focus:border-[#f97316] focus:shadow-[0_0_10px_rgba(249,115,22,0.2)] transition-all font-mono"
                    placeholder="e.g. CodeReviewer"
                  />
                </div>
                <div>
                  <label className="block text-[#555] text-[10px] tracking-[0.2em] uppercase mb-2">Description</label>
                  <textarea 
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-[#0a0a0a] border border-[#333] text-[#e5e5e5] px-4 py-3 text-sm focus:outline-none focus:border-[#f97316] focus:shadow-[0_0_10px_rgba(249,115,22,0.2)] transition-all h-32 resize-none font-mono"
                    placeholder="Describe what your agent does..."
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <label className="block text-[#555] text-[10px] tracking-[0.2em] uppercase mb-2">Endpoint URL</label>
                  <input 
                    type="text" 
                    value={formData.endpointUrl}
                    onChange={e => setFormData({...formData, endpointUrl: e.target.value})}
                    className="w-full bg-[#0a0a0a] border border-[#333] text-[#e5e5e5] px-4 py-3 text-sm focus:outline-none focus:border-[#f97316] focus:shadow-[0_0_10px_rgba(249,115,22,0.2)] transition-all font-mono"
                    placeholder="https://api.youragent.com/v1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#555] text-[10px] tracking-[0.2em] uppercase mb-2">Type</label>
                    <select 
                      value={formData.endpointType}
                      onChange={e => setFormData({...formData, endpointType: e.target.value})}
                      className="w-full bg-[#0a0a0a] border border-[#333] text-[#e5e5e5] px-4 py-3 text-sm focus:outline-none focus:border-[#f97316] focus:shadow-[0_0_10px_rgba(249,115,22,0.2)] transition-all font-mono appearance-none"
                    >
                      <option>MCP</option>
                      <option>REST</option>
                      <option>GraphQL</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#555] text-[10px] tracking-[0.2em] uppercase mb-2">Version</label>
                    <input 
                      type="text" 
                      value={formData.version}
                      onChange={e => setFormData({...formData, version: e.target.value})}
                      className="w-full bg-[#0a0a0a] border border-[#333] text-[#e5e5e5] px-4 py-3 text-sm focus:outline-none focus:border-[#f97316] focus:shadow-[0_0_10px_rgba(249,115,22,0.2)] transition-all font-mono"
                      placeholder="1.0.0"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <label className="block text-[#555] text-[10px] tracking-[0.2em] uppercase mb-2">Select Capabilities</label>
                <div className="flex flex-wrap gap-3">
                  {CAPABILITIES_LIST.map(cap => (
                    <button
                      key={cap}
                      onClick={() => toggleCapability(cap)}
                      className={cn(
                        "text-[10px] tracking-[0.1em] px-4 py-2 border transition-all",
                        formData.capabilities.includes(cap)
                          ? "border-[#f97316] text-[#f97316] bg-[#f97316]/10 shadow-[0_0_10px_rgba(249,115,22,0.2)]"
                          : "border-[#333] text-[#888] hover:border-[#555] hover:text-[#ccc] bg-[#0a0a0a]"
                      )}
                    >
                      {cap}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="p-6 border border-[#222] bg-[#0a0a0a] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#f97316]/5 blur-2xl" />
                  <h3 className="text-[#f97316] text-[10px] tracking-[0.3em] uppercase mb-6">REGISTRATION SUMMARY</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="text-[#555] text-[8px] tracking-[0.2em] uppercase mb-1">NAME</div>
                      <div className="text-[#e5e5e5] font-medium">{formData.name || 'N/A'}</div>
                    </div>
                    <div>
                      <div className="text-[#555] text-[8px] tracking-[0.2em] uppercase mb-1">ENDPOINT</div>
                      <div className="text-[#e5e5e5] font-mono text-xs">{formData.endpointUrl || 'N/A'}</div>
                    </div>
                    <div className="col-span-1 md:col-span-2">
                      <div className="text-[#555] text-[8px] tracking-[0.2em] uppercase mb-1">DESCRIPTION</div>
                      <div className="text-[#ccc] text-sm">{formData.description || 'N/A'}</div>
                    </div>
                    <div className="col-span-1 md:col-span-2">
                      <div className="text-[#555] text-[8px] tracking-[0.2em] uppercase mb-1">CAPABILITIES</div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.capabilities.map(cap => (
                          <span key={cap} className="text-[8px] tracking-[0.1em] px-2 py-1 border border-[#333] text-[#888] bg-[#111]">
                            {cap}
                          </span>
                        ))}
                        {formData.capabilities.length === 0 && <span className="text-[#555] text-xs">None selected</span>}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center text-[#555] text-[10px] tracking-widest mt-4">
                  Registration requires a transaction on the Intuition Testnet.
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between mt-12 pt-6 border-t border-[#222]">
            <button 
              onClick={handlePrev}
              disabled={step === 1}
              className="text-[10px] tracking-[0.2em] uppercase px-6 py-3 border border-[#333] text-[#888] hover:border-[#555] hover:text-[#ccc] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Back
            </button>
            
            {step < 4 ? (
              <button 
                onClick={handleNext}
                className="text-[10px] tracking-[0.2em] uppercase px-6 py-3 border border-[#f97316] text-[#f97316] hover:bg-[#f97316]/10 shadow-[0_0_15px_rgba(249,115,22,0.2)] transition-all"
              >
                Continue
              </button>
            ) : (
              <button 
                onClick={() => addLog('INITIATING ON-CHAIN TRANSACTION...')}
                className="text-[10px] tracking-[0.2em] uppercase px-6 py-3 border border-emerald-500 text-emerald-500 hover:bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all"
              >
                Confirm & Register
              </button>
            )}
          </div>
        </Panel>
      </div>

      {/* Right Column: Terminal Log */}
      <div className="w-full lg:w-96 flex flex-col">
        <Panel className="flex-1 p-0 overflow-hidden flex flex-col border-[#333]">
          <div className="bg-[#111] border-b border-[#333] px-4 py-2 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500/50" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
            <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
            <span className="ml-2 text-[#555] text-[10px] tracking-widest uppercase">SYSTEM LOG</span>
          </div>
          <div className="flex-1 p-4 bg-[#050505] font-mono text-[10px] text-[#888] overflow-y-auto max-h-[600px] flex flex-col gap-1">
            {logs.map((log, i) => (
              <div key={i} className={cn(
                "animate-in fade-in duration-300",
                log.includes('OK') || log.includes('ADDED') ? "text-emerald-500/80" : 
                log.includes('REMOVED') ? "text-red-500/80" : 
                log.includes('TRANSACTION') ? "text-[#f97316]" : ""
              )}>
                {log}
              </div>
            ))}
            <div ref={logEndRef} />
            <div className="animate-pulse text-[#f97316] mt-2">_</div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
