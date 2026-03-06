import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Cat } from 'lucide-react';

export function Preloader() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
      setIsFirstLoad(false);
    }, isFirstLoad ? 2600 : 800);
    
    return () => clearTimeout(timer);
  }, [location.pathname, isFirstLoad]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#050505]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* The expanding orange background */}
          <motion.div
            className="absolute z-0 rounded-full bg-[#f97316]"
            initial={{ width: 0, height: 0 }}
            animate={{ 
              width: isFirstLoad ? [0, 0, 3000] : [0, 3000], 
              height: isFirstLoad ? [0, 0, 3000] : [0, 3000],
            }}
            transition={{ 
              duration: isFirstLoad ? 2.6 : 0.8, 
              times: isFirstLoad ? [0, 0.75, 1] : [0, 1],
              ease: "easeInOut"
            }}
          />

          <div className="relative z-10 w-full max-w-md px-8 flex flex-col items-center">
            {isFirstLoad ? (
              <>
                {/* Path Container */}
                <div className="relative w-full h-16 flex items-center mb-8">
                  {/* Dashed Line */}
                  <div className="absolute w-full h-[2px] border-t-2 border-dashed border-[#333]" />
                  
                  {/* Animated Solid Line (Trail) */}
                  <motion.div 
                    className="absolute h-[2px] bg-[#f97316]"
                    initial={{ width: "0%" }}
                    animate={{ width: ["0%", "50%", "50%"] }}
                    transition={{ duration: 2.6, times: [0, 0.6, 1], ease: "easeInOut" }}
                  />

                  {/* Destination Node */}
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#333] z-0"
                    animate={{ 
                      backgroundColor: ["#333", "#333", "#f97316", "#ffffff"],
                      scale: [1, 1, 1.5, 0]
                    }}
                    transition={{ duration: 2.6, times: [0, 0.55, 0.65, 0.75] }}
                  />

                  {/* The Cat Agent */}
                  <motion.div
                    className="absolute flex items-center justify-center w-12 h-12 bg-[#111] border-2 rounded-full shadow-[0_0_20px_rgba(249,115,22,0.4)] z-10"
                    initial={{ left: "0%", x: "-50%" }}
                    animate={{ 
                      left: ["0%", "50%", "50%"], 
                      x: ["-50%", "-50%", "-50%"], 
                      scale: [1, 1, 1.2], 
                      rotate: [0, 0, 360],
                      borderColor: ["#f97316", "#f97316", "#ffffff"],
                      backgroundColor: ["#111", "#111", "#f97316"],
                      color: ["#f97316", "#f97316", "#ffffff"],
                      boxShadow: ["0 0 20px rgba(249,115,22,0.4)", "0 0 20px rgba(249,115,22,0.4)", "0 0 40px rgba(255,255,255,0.8)"]
                    }}
                    transition={{ duration: 2.6, times: [0, 0.6, 1], ease: "easeInOut" }}
                  >
                    <Cat className="w-6 h-6" />
                  </motion.div>
                </div>

                {/* Text */}
                <motion.div
                  className="flex flex-col items-center gap-3"
                  animate={{ opacity: [1, 1, 0] }}
                  transition={{ duration: 2.6, times: [0, 0.7, 1] }}
                >
                  <div className="text-[#f97316] text-[11px] tracking-[0.4em] uppercase font-bold">
                    AGENT REGISTRATION
                  </div>
                  <motion.div 
                    className="text-[#888] text-xs font-mono"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 0.8, repeat: 3 }}
                  >
                    Establishing Trust Protocol...
                  </motion.div>
                </motion.div>
              </>
            ) : (
              /* Subsequent loads: Quick orange wipe with cat */
              <div className="flex flex-col items-center justify-center h-full">
                <motion.div
                  animate={{ scale: [0.8, 1.2], rotate: [0, 180] }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="text-white"
                >
                  <Cat className="w-12 h-12" />
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
