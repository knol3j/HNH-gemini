import React, { useState } from 'react';
import { Algorithm } from '../types';
import { Settings, Cpu, Network, Info, AlertTriangle, Download } from 'lucide-react';

const Provider: React.FC = () => {
  const [config, setConfig] = useState({
    walletAddress: '',
    poolUrl: 'stratum+tcp://pool.hashnhedge.com:3333',
    workerName: 'Worker-01',
    algorithm: 'KawPow' as Algorithm
  });

  const [agentStatus, setAgentStatus] = useState<'DISCONNECTED' | 'CONNECTED'>('DISCONNECTED');

  const checkAgent = () => {
    // In a real app, this would ping localhost:port where the agent runs
    // Since we are in a browser without the agent, it correctly reports disconnected.
    setAgentStatus('DISCONNECTED');
    alert("Could not connect to HNH Local Agent on port 4200. Please ensure the miner client is running.");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col gap-6">
        
        {/* Configuration Card */}
        <div className="bg-surface border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
             <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
               <h3 className="text-xl font-bold text-white flex items-center gap-2">
                 <Settings className="text-primary" /> Node Configuration
               </h3>
               <div className={`px-3 py-1 rounded text-xs font-bold flex items-center gap-2 ${
                 agentStatus === 'CONNECTED' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
               }`}>
                 <div className={`w-2 h-2 rounded-full ${agentStatus === 'CONNECTED' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                 {agentStatus}
               </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-muted uppercase font-bold mb-1 block">Algorithm</label>
                    <select 
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                      value={config.algorithm}
                      onChange={e => setConfig({...config, algorithm: e.target.value as Algorithm})}
                    >
                      <option value="KawPow">KawPow (GPU)</option>
                      <option value="RandomX">RandomX (CPU)</option>
                      <option value="Autolykos2">Autolykos2</option>
                      <option value="Llama3-70b">AI Inference (LLM)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-muted uppercase font-bold mb-1 block">Stratum URL</label>
                    <input 
                      type="text" 
                      value={config.poolUrl}
                      onChange={e => setConfig({...config, poolUrl: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none font-mono text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-muted uppercase font-bold mb-1 block">Payout Wallet</label>
                    <input 
                      type="text" 
                      placeholder="0x..."
                      value={config.walletAddress}
                      onChange={e => setConfig({...config, walletAddress: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none font-mono text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted uppercase font-bold mb-1 block">Worker Name</label>
                    <input 
                      type="text" 
                      value={config.workerName}
                      onChange={e => setConfig({...config, workerName: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>
             </div>

             <div className="mt-8 flex justify-end gap-4">
               <button className="text-sm text-muted hover:text-white px-4 py-2 transition-colors">
                 Reset to Defaults
               </button>
               <button 
                 onClick={checkAgent}
                 className="bg-primary hover:bg-primary-hover text-black font-bold px-6 py-2 rounded-lg transition-all shadow-lg flex items-center gap-2"
               >
                 <Network size={18} /> Connect to Agent
               </button>
             </div>
        </div>

        {/* Info / Download Section */}
        {agentStatus === 'DISCONNECTED' && (
          <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-6 flex flex-col md:flex-row gap-6 items-center">
             <div className="p-4 bg-blue-500/10 rounded-full text-blue-400">
               <Cpu size={32} />
             </div>
             <div className="flex-1 text-center md:text-left">
               <h4 className="text-lg font-bold text-white mb-2">Local Agent Required</h4>
               <p className="text-sm text-muted">
                 To participate in the HNH compute network, you must run the local miner agent on your hardware. 
                 This agent bridges your GPU statistics to this dashboard and handles job execution.
               </p>
             </div>
             <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap">
               <Download size={18} /> Download Client v2.4.0
             </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Provider;
