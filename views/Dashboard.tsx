import React from 'react';
import { NetworkStats } from '../types';
import { Activity, Server, Zap, Cpu, HardDrive, Terminal } from 'lucide-react';
import { MOCK_JOBS } from '../services/mockData';

interface DashboardProps {
  stats: NetworkStats;
  aiAnalysis: string;
}

const Dashboard: React.FC<DashboardProps> = ({ stats, aiAnalysis }) => {
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
        {/* Main Chart Section - Placeholder for Real Data */}
        <div className="lg:col-span-2 bg-surface border border-white/5 rounded-2xl p-6 flex items-center justify-center min-h-[300px]">
           <div className="text-center">
             <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="text-muted" size={32} />
             </div>
             <h3 className="text-lg font-semibold text-white">Metrics Unavailable</h3>
             <p className="text-muted max-w-sm mt-2">
               Connect your wallet or a node to view real-time network telemetry and personal usage stats.
             </p>
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
          
          <button className="w-full mt-4 py-2 border border-dashed border-white/20 rounded-lg text-sm text-muted hover:text-white hover:border-white/40 transition-colors">
            + Deploy New Container
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
