import React from 'react';
import { motion } from 'motion/react';

export function StakeAnimation({ isActive, isComplete }: { isActive?: boolean; isComplete?: boolean }) {
  const state = isActive ? "active" : isComplete ? "complete" : "initial";

  return (
    <div className="w-full h-48 relative flex items-center justify-center bg-[#0a0a0a] rounded-xl border border-[#222] overflow-hidden mb-6 z-10">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />

      {/* Central Agent Atom */}
      <motion.div
        className="relative z-10 w-16 h-16 bg-[#111] border border-[#f97316] rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.2)] overflow-hidden"
        variants={{
          initial: { boxShadow: '0 0 10px rgba(249,115,22,0.2)', borderColor: '#f97316' },
          active: {
            boxShadow: ['0 0 10px rgba(249,115,22,0.2)', '0 0 30px rgba(249,115,22,0.6)', '0 0 30px rgba(249,115,22,0.6)'],
            borderColor: ['#f97316', '#ffb073', '#f97316'],
            transition: { duration: 3 }
          },
          complete: { boxShadow: '0 0 30px rgba(249,115,22,0.6)', borderColor: '#f97316' }
        }}
        initial="initial"
        animate={state}
      >
        <div className="text-[#f97316] font-mono text-xs relative z-10">0xA1</div>
        
        {/* Trust Meter Fill */}
        <motion.div 
          className="absolute bottom-0 left-0 w-full bg-[#f97316]/20"
          variants={{
            initial: { height: '20%' },
            active: { height: ['20%', '80%', '80%'], transition: { duration: 3 } },
            complete: { height: '80%' }
          }}
          initial="initial"
          animate={state}
        />
      </motion.div>

      {/* Stakers / Wallets */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Left Staker (FOR) */}
        <div className="absolute left-6 w-6 h-6 rounded-full border border-[#555] bg-[#222] flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
        </div>
        
        {/* Right Staker (AGAINST) */}
        <div className="absolute right-6 w-6 h-6 rounded-full border border-[#555] bg-[#222] flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-red-500" />
        </div>

        {/* Top Staker (FOR) */}
        <div className="absolute top-6 w-6 h-6 rounded-full border border-[#555] bg-[#222] flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
        </div>
      </div>

      {/* Tokens Flowing */}
      {/* From Left (Emerald) */}
      <motion.div
        className="absolute left-10 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
        variants={{
          initial: { x: 0, opacity: 0, scale: 0.5 },
          active: { x: [0, 60], opacity: [0, 1, 0], scale: [0.5, 1, 0.5], transition: { duration: 1.5, repeat: 1, delay: 0 } },
          complete: { opacity: 0 }
        }}
        initial="initial"
        animate={state}
      />
      {/* From Right (Red) */}
      <motion.div
        className="absolute right-10 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"
        variants={{
          initial: { x: 0, opacity: 0, scale: 0.5 },
          active: { x: [0, -60], opacity: [0, 1, 0], scale: [0.5, 1, 0.5], transition: { duration: 1.5, repeat: 1, delay: 0.5 } },
          complete: { opacity: 0 }
        }}
        initial="initial"
        animate={state}
      />
      {/* From Top (Emerald) */}
      <motion.div
        className="absolute top-10 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
        variants={{
          initial: { y: 0, opacity: 0, scale: 0.5 },
          active: { y: [0, 40], opacity: [0, 1, 0], scale: [0.5, 1, 0.5], transition: { duration: 1.5, repeat: 1, delay: 1 } },
          complete: { opacity: 0 }
        }}
        initial="initial"
        animate={state}
      />
    </div>
  );
}
