import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

export function Navbar() {
  const location = useLocation();
  
  const navItem = (path: string, label: string) => {
    const isActive = location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
    return (
      <Link 
        to={path} 
        className={cn(
          "text-[10px] tracking-[0.2em] uppercase px-4 py-2 border transition-colors",
          isActive 
            ? "border-[#555] text-[#e5e5e5] bg-[#222]/30" 
            : "border-transparent text-[#888] hover:text-[#ccc] hover:border-[#333]"
        )}
      >
        {label}
      </Link>
    );
  };

  return (
    <nav className="flex items-center justify-between py-6 border-b border-[#222] mb-8">
      <Link to="/" className="flex items-center gap-3">
        <div className="w-4 h-4 bg-[#f97316] rounded-sm" />
        <span className="text-sm tracking-[0.3em] font-bold text-[#e5e5e5]">AGENT_ID</span>
      </Link>
      <div className="hidden md:flex items-center gap-2">
        {navItem('/agents', 'Explore')}
        {navItem('/register', 'Register')}
        {navItem('/dashboard', 'Dashboard')}
      </div>
      <div>
        <button className="text-[10px] tracking-[0.2em] uppercase px-4 py-2 border border-[#f97316]/50 text-[#f97316] hover:bg-[#f97316]/10 transition-colors">
          Connect Wallet
        </button>
      </div>
    </nav>
  );
}
