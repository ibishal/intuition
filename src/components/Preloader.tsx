import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export function Preloader() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
      setIsFirstLoad(false);
    }, isFirstLoad ? 1500 : 600);
    
    return () => clearTimeout(timer);
  }, [location.pathname, isFirstLoad]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Cool sci-fi grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
          
          <div className="relative z-10 flex flex-col items-center gap-8">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-t-2 border-r-2 border-[#f97316] rounded-full opacity-80"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 border-b-2 border-l-2 border-[#555] rounded-full opacity-50"
              />
              <motion.div 
                animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-[#f97316] font-light text-4xl tracking-tighter"
              >
                A
              </motion.div>
            </div>
            
            <div className="flex flex-col items-center gap-3">
              <div className="text-[#f97316] text-[10px] tracking-[0.5em] uppercase font-bold">
                {isFirstLoad ? 'SYSTEM INITIALIZATION' : 'ROUTING SEQUENCE'}
              </div>
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0.2, height: 4 }}
                    animate={{ opacity: 1, height: 12 }}
                    transition={{ duration: 0.4, repeat: Infinity, repeatType: "reverse", delay: i * 0.1 }}
                    className="w-1 bg-[#f97316]"
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
