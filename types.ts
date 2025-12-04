export interface ComputeNode {
  id: string;
  name: string;
  gpuModel: string;
  vram: number; // in GB
  tflops: number;
  pricePerHour: number;
  region: string;
  availability: number; // 0-100%
  status: 'IDLE' | 'BUSY' | 'OFFLINE';
  provider: string;
}

export interface NetworkStats {
  activeNodes: number;
  totalTflops: number;
  jobsRunning: number;
  networkUtilization: number; // %
  avgPricePerFLOP: number;
}

export interface JobSpec {
  title: string;
  description: string;
  recommendedGpu: string;
  estimatedDuration: string;
  maxPrice: number;
  reasoning: string;
}

export interface ActiveJob {
  id: string;
  title: string;
  nodeId: string;
  status: 'PROVISIONING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  progress: number;
  startTime: string;
  costSoFar: number;
  logs: string[];
}

export interface ProviderStats {
  earnings24h: number;
  totalEarnings: number;
  reputationScore: number; // 0-100
  uptime: number; // %
  activeJobs: number;
}

export interface HardwareMonitor {
  temp: number; // Celsius
  power: number; // Watts
  fanSpeed: number; // %
  memoryUsage: number; // %
}

// Navigation types
export type View = 'DASHBOARD' | 'MARKETPLACE' | 'DEPLOY' | 'PROVIDER';

// Algorithm types
export type Algorithm = 'KawPow' | 'RandomX' | 'Autolykos2' | 'Llama3-70b';

// Ethereum Window Type
export interface EthereumProvider {
  isMetaMask?: boolean;
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  on: (eventName: string, handler: (...args: any[]) => void) => void;
  removeListener: (eventName: string, handler: (...args: any[]) => void) => void;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}