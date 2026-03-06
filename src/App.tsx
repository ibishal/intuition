import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Landing } from './pages/Landing';
import { Explorer } from './pages/Explorer';
import { AgentDetail } from './pages/AgentDetail';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#050505] text-[#e5e5e5] p-4 md:p-8 font-mono flex flex-col max-w-7xl mx-auto">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/agents" element={<Explorer />} />
            <Route path="/agents/:atomId" element={<AgentDetail />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
