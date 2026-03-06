import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const FEATURED_AGENTS = [
  { id: '1', name: 'CodeReviewer', staked: '12,450', stakers: 342, tier: 'ELITE', color: 'from-[#f97316]/20 to-[#f97316]/5', image: 'https://picsum.photos/seed/code/600/800' },
  { id: '2', name: 'DataAnalyzer', staked: '8,210', stakers: 215, tier: 'HIGH', color: 'from-emerald-500/20 to-emerald-500/5', image: 'https://picsum.photos/seed/data/600/800' },
  { id: '3', name: 'SecurityBot', staked: '6,100', stakers: 189, tier: 'HIGH', color: 'from-blue-500/20 to-blue-500/5', image: 'https://picsum.photos/seed/security/600/800' },
  { id: '4', name: 'DeFiTrader', staked: '4,500', stakers: 120, tier: 'MEDIUM', color: 'from-purple-500/20 to-purple-500/5', image: 'https://picsum.photos/seed/defi/600/800' },
  { id: '5', name: 'ResearchAsst', staked: '3,200', stakers: 95, tier: 'MEDIUM', color: 'from-pink-500/20 to-pink-500/5', image: 'https://picsum.photos/seed/research/600/800' },
];

export function FeaturedAgentsAccordion() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  return (
    <div className="flex h-[400px] w-full gap-2 overflow-hidden">
      {FEATURED_AGENTS.map((agent, index) => {
        const isHovered = hoveredIndex === index;
        
        return (
          <motion.div
            key={agent.id}
            className="relative h-full rounded-2xl overflow-hidden cursor-pointer border border-[#333]"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            animate={{
              flex: isHovered ? 4 : 1,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <Link to={`/agents/${agent.id}`} className="block w-full h-full relative">
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <img 
                  src={agent.image} 
                  alt={agent.name}
                  className="w-full h-full object-cover opacity-40 grayscale mix-blend-luminosity"
                  referrerPolicy="no-referrer"
                />
                <div className={cn("absolute inset-0 bg-gradient-to-b", agent.color)} />
                <div className="absolute inset-0 bg-[#050505]/60" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                {/* Top Section */}
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-full bg-[#111] border border-[#333] flex items-center justify-center text-[#e5e5e5] font-bold z-10 shrink-0">
                    {agent.name.charAt(0)}
                  </div>
                  
                  <motion.div 
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    className="text-[8px] tracking-[0.2em] px-2 py-1 border border-[#f97316]/50 text-[#f97316] bg-[#f97316]/10 whitespace-nowrap"
                  >
                    {agent.tier}
                  </motion.div>
                </div>

                {/* Bottom Section */}
                <div className="relative z-10">
                  <motion.div 
                    animate={{ 
                      rotate: isHovered ? 0 : -90,
                      y: isHovered ? 0 : -20,
                      x: isHovered ? 0 : 20,
                      transformOrigin: "left bottom"
                    }}
                    className="whitespace-nowrap"
                  >
                    <h3 className="text-2xl md:text-3xl font-light tracking-tight text-[#e5e5e5] mb-1">
                      {agent.name}
                    </h3>
                  </motion.div>

                  <motion.div 
                    animate={{ 
                      opacity: isHovered ? 1 : 0,
                      height: isHovered ? 'auto' : 0,
                      marginTop: isHovered ? 16 : 0
                    }}
                    className="overflow-hidden flex gap-6"
                  >
                    <div>
                      <div className="text-[#555] text-[8px] tracking-[0.2em] uppercase mb-1">Total Staked</div>
                      <div className="text-[#ccc] text-lg">{agent.staked} <span className="text-[#555] text-xs">tTRUST</span></div>
                    </div>
                    <div>
                      <div className="text-[#555] text-[8px] tracking-[0.2em] uppercase mb-1">Stakers</div>
                      <div className="text-[#ccc] text-lg">{agent.stakers}</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
