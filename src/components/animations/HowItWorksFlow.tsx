import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { RegisterAnimation } from './RegisterAnimation';
import { StakeAnimation } from './StakeAnimation';
import { VerifyAnimation } from './VerifyAnimation';

export function HowItWorksFlow() {
  const [phase, setPhase] = useState(1);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (phase === 1) timeout = setTimeout(() => setPhase(1.5), 4000);
    else if (phase === 1.5) timeout = setTimeout(() => setPhase(2), 1000);
    else if (phase === 2) timeout = setTimeout(() => setPhase(2.5), 3000);
    else if (phase === 2.5) timeout = setTimeout(() => setPhase(3), 1000);
    else if (phase === 3) timeout = setTimeout(() => setPhase(4), 4000);
    else if (phase === 4) timeout = setTimeout(() => setPhase(1), 2000); // 2s pause before restart
    return () => clearTimeout(timeout);
  }, [phase]);

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 md:gap-0 relative w-full">
      {/* Step 1 */}
      <div className={`flex-1 w-full flex flex-col items-center text-center gap-4 transition-opacity duration-500 ${phase >= 1 ? 'opacity-100' : 'opacity-40'}`}>
        <RegisterAnimation isActive={phase === 1} isComplete={phase > 1} />
        <div className={`w-10 h-10 rounded-full border flex items-center justify-center text-lg font-light mb-2 transition-colors shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] bg-[#0a0a0a] ${phase >= 1 ? 'border-[#f97316] text-[#f97316]' : 'border-[#555] text-[#555]'}`}>1</div>
        <h3 className={`tracking-widest uppercase text-sm transition-colors ${phase >= 1 ? 'text-[#f97316]' : 'text-[#e5e5e5]'}`}>Register</h3>
        <p className="text-[#888] text-sm px-4">Create an on-chain identity for your AI agent via IPFS + Intuition Atoms.</p>
      </div>

      {/* Line 1-2 (Desktop) */}
      <div className="hidden md:block w-8 lg:w-16 h-[2px] bg-[#333] mt-24 z-0 relative shrink-0">
         <motion.div 
           className="h-full bg-[#f97316]" 
           initial={{ width: 0 }} 
           animate={{ width: phase >= 1.5 ? '100%' : 0 }} 
           transition={{ duration: 1, ease: "linear" }} 
         />
      </div>
      
      {/* Line 1-2 (Mobile) */}
      <div className="md:hidden h-8 w-[2px] bg-[#333] z-0 relative shrink-0">
         <motion.div 
           className="w-full bg-[#f97316]" 
           initial={{ height: 0 }} 
           animate={{ height: phase >= 1.5 ? '100%' : 0 }} 
           transition={{ duration: 1, ease: "linear" }} 
         />
      </div>

      {/* Step 2 */}
      <div className={`flex-1 w-full flex flex-col items-center text-center gap-4 transition-opacity duration-500 ${phase >= 2 ? 'opacity-100' : 'opacity-40'}`}>
        <StakeAnimation isActive={phase === 2} isComplete={phase > 2} />
        <div className={`w-10 h-10 rounded-full border flex items-center justify-center text-lg font-light mb-2 transition-colors shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] bg-[#0a0a0a] ${phase >= 2 ? 'border-[#f97316] text-[#f97316]' : 'border-[#555] text-[#555]'}`}>2</div>
        <h3 className={`tracking-widest uppercase text-sm transition-colors ${phase >= 2 ? 'text-[#f97316]' : 'text-[#e5e5e5]'}`}>Stake</h3>
        <p className="text-[#888] text-sm px-4">Community stakes tTRUST tokens to signal trust (or distrust) in the agent.</p>
      </div>

      {/* Line 2-3 (Desktop) */}
      <div className="hidden md:block w-8 lg:w-16 h-[2px] bg-[#333] mt-24 z-0 relative shrink-0">
         <motion.div 
           className="h-full bg-[#f97316]" 
           initial={{ width: 0 }} 
           animate={{ width: phase >= 2.5 ? '100%' : 0 }} 
           transition={{ duration: 1, ease: "linear" }} 
         />
      </div>
      
      {/* Line 2-3 (Mobile) */}
      <div className="md:hidden h-8 w-[2px] bg-[#333] z-0 relative shrink-0">
         <motion.div 
           className="w-full bg-[#f97316]" 
           initial={{ height: 0 }} 
           animate={{ height: phase >= 2.5 ? '100%' : 0 }} 
           transition={{ duration: 1, ease: "linear" }} 
         />
      </div>

      {/* Step 3 */}
      <div className={`flex-1 w-full flex flex-col items-center text-center gap-4 transition-opacity duration-500 ${phase >= 3 ? 'opacity-100' : 'opacity-40'}`}>
        <VerifyAnimation isActive={phase === 3} isComplete={phase > 3} />
        <div className={`w-10 h-10 rounded-full border flex items-center justify-center text-lg font-light mb-2 transition-colors shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] bg-[#0a0a0a] ${phase >= 3 ? 'border-[#f97316] text-[#f97316]' : 'border-[#555] text-[#555]'}`}>3</div>
        <h3 className={`tracking-widest uppercase text-sm transition-colors ${phase >= 3 ? 'text-[#f97316]' : 'text-[#e5e5e5]'}`}>Verify</h3>
        <p className="text-[#888] text-sm px-4">LLMs and other agents query trust scores before interacting with the agent.</p>
      </div>
    </div>
  );
}
