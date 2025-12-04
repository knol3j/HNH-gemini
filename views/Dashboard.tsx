import React, { useState } from 'react';
import { NetworkStats } from '../types';
import { Activity, Server, Zap, Cpu, HardDrive, Terminal, Calculator, ArrowRight, TrendingUp } from 'lucide-react';
import { MOCK_JOBS } from '../services/mockData';

interface DashboardProps {
  stats: NetworkStats;
  aiAnalysis: string;
}

const Dashboard: React.FC<DashboardProps> = ({ stats, aiAnalysis }) => {
  const [calcGpu, setCalcGpu] = useState('RTX 4090');

  // Simple static estimation logic for the calculator
  const getEstimates = (gpu: string) => {
    switch (gpu) {
      case 'NVIDIA H100': return { mining: 0.10, ai: 2.50 };
      case 'NVIDIA A100': return { mining: 0.15, ai: 1.10 };
      case 'RTX 4090': return { mining: 0.80, ai: 0.45 };
      case 'RTX 3090': return { mining: 0.60, ai: 0.25 };
      default: return { mining: 0, ai: 0 };
    }
  };

  const estimates = getEstimates(calcGpu);
  const aiPremium = ((estimates.ai - estimates.mining) / estimates.mining * 100).toFixed(0);
  const isAiProfitable = estimates.ai > estimates.mining;

  return (
    <div className="space-y-6">
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Network Status</h2>
          <p className="text-muted">Global decentralized compute metrics.</p>
        </div>
        <div className="flex gap-4">
          <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-xs text-muted">
             <span className="block mb-1">Network Status</span>
             <span className="text-emerald-500 font-mono flex items-center gap-2"><span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> ONLINE</span>
          </div>
        </div>
      </header>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Nodes */}
        <div className="bg-surface border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-primary/30 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Server size={48} />
          </div>
          <p className="text-muted text-sm font-medium uppercase tracking-wider">Active Nodes</p>
          <h3 className="text-2xl font-bold text-white mt-1">{stats.activeNodes.toLocaleString()}</h3>
          <div className="flex items-center mt-2 text-sm text-primary">
            <Activity size={16} className="mr-1"/>
            <span>Global Count</span>
          </div>
        </div>

        {/* Compute Power */}
        <div className="bg-surface border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-accent/30 transition-colors">
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Cpu size={48} />
          </div>
          <p className="text-muted text-sm font-medium uppercase tracking-wider">Total Compute</p>
          <h3 className="text-2xl font-bold text-white mt-1">{(stats.totalTflops / 1000).toFixed(1)} PFLOPS</h3>
          <p className="text-xs text-muted mt-2">
            Network Capacity
          </p>
        </div>

        {/* Utilization */}
        <div className="bg-surface border border-white/5 rounded-2xl p-6 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
            <Zap size={48} />
          </div>
          <p className="text-muted text-sm font-medium uppercase tracking-wider">Network Load</p>
          <div className="flex items-center justify-between mt-1">
             <h3 className={`text-2xl font-bold ${stats.networkUtilization > 80 ? 'text-warning' : 'text-white'}`}>
               {stats.networkUtilization}%
             </h3>
             <span className="text-primary font-mono bg-primary/10 px-2 py-1 rounded text-sm">
               {stats.jobsRunning} Active Jobs
             </span>
          </div>
        </div>

        {/* AI Insight Mini */}
         <div className="bg-gradient-to-br from-indigo-900/40 to-surface border border-indigo-500/20 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <HardDrive size={48} className="text-indigo-400" />
          </div>
          <p className="text-indigo-300 text-sm font-medium uppercase tracking-wider flex items-center gap-2">
            AI Orchestrator
          </p>
          <p className="text-sm text-gray-300 mt-2 line-clamp-3 leading-relaxed">
            {aiAnalysis || "Analyzing network liquidity..."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profitability Calculator (Value Add) */}
        <div className="lg:col-span-2 bg-surface border border-white/5 rounded-2xl p-6">
           <div className="flex items-center gap-3 mb-6">
             <div className="bg-primary/20 p-2 rounded-lg">
               <Calculator className="text-primary" size={20} />
             </div>
             <div>
               <h3 className="text-lg font-semibold text-white">Profitability Calculator</h3>
               <p className="text-xs text-muted">Estimate earnings: Crypto Mining vs. AI Compute</p>
             </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                 <label className="text-sm text-muted uppercase font-bold">Hardware Model</label>
                 <select 
                    value={calcGpu}
                    onChange={(e) => setCalcGpu(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                 >
                   <option value="NVIDIA H100">NVIDIA H100 (Enterprise)</option>
                   <option value="NVIDIA A100">NVIDIA A100 (Enterprise)</option>
                   <option value="RTX 4090">NVIDIA RTX 4090 (Consumer)</option>
                   <option value="RTX 3090">NVIDIA RTX 3090 (Consumer)</option>
                 </select>
                 
                 <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                    <div className="flex justify-between text-sm mb-2">
                       <span className="text-muted">Avg. Mining Revenue</span>
                       <span className="text-white">${estimates.mining.toFixed(2)}/hr</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                       <span className="text-muted">Avg. Compute Revenue</span>
                       <span className="text-primary font-bold">${estimates.ai.toFixed(2)}/hr</span>
                    </div>
                    <div className="mt-3 pt-3 border-t border-white/10">
                       <div className="flex items-center gap-2">
                          <TrendingUp size={16} className={isAiProfitable ? 'text-green-500' : 'text-red-500'} />
                          <span className={`text-sm font-bold ${isAiProfitable ? 'text-green-500' : 'text-red-500'}`}>
                             {isAiProfitable ? `AI is ${aiPremium}% more profitable` : 'Mining is currently more profitable'}
                          </span>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Visual Bar Chart */}
              <div className="relative h-48 flex items-end justify-around pb-6 border-b border-white/10">
                 <div className="w-16 flex flex-col justify-end group">
                    <div 
                      className="bg-gray-600 rounded-t-lg transition-all duration-500 group-hover:bg-gray-500"
                      style={{ height: `${(estimates.mining / 3) * 100}%`, minHeight: '10px' }}
                    ></div>
                    <span className="text-xs text-center mt-2 text-muted">Mining</span>
                 </div>
                 <div className="w-16 flex flex-col justify-end group">
                    <div 
                      className="bg-primary rounded-t-lg transition-all duration-500 relative group-hover:bg-primary-hover shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                      style={{ height: `${(estimates.ai / 3) * 100}%`, minHeight: '10px' }}
                    >
                      {isAiProfitable && (
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-accent text-white text-[10px] font-bold px-2 py-1 rounded">
                          {estimates.ai.toFixed(2)}x
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-center mt-2 text-primary font-bold">Compute</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Active Jobs Monitor */}
        <div className="bg-surface border border-white/5 rounded-2xl p-6 flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Terminal size={18} /> My Workloads
          </h3>
          
          <div className="flex-1 space-y-4 overflow-y-auto pr-2 max-h-[300px]">
            {MOCK_JOBS.length === 0 ? (
               <div className="text-center py-10">
                 <p className="text-muted text-sm">No active jobs found associated with this address.</p>
               </div>
            ) : (
               MOCK_JOBS.map(job => (
                  <div key={job.id} className="bg-black/40 rounded-lg p-3 border border-white/5">
                    {/* Job Item */}
                  </div>
               ))
            )}
          </div>
          
          <button className="w-full mt-4 py-2 border border-dashed border-white/20 rounded-lg text-sm text-muted hover:text-white hover:border-white/40 transition-colors flex items-center justify-center gap-2">
            Deploy New Container <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;