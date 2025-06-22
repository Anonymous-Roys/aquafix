import { create } from 'zustand';

interface WaterParams {
  pH: number;
  ammonia: number;
  dissolvedOxygen: number;
  turbidity: number;
  temperature: number;
}

interface Alert {
  id: string;
  message: string;
  severity: 'critical' | 'warning' | 'normal';
  timestamp: Date;
}

interface AquaState {
  waterParams: WaterParams;
  fishCount: number;
  alerts: Alert[];
  pumpStatus: boolean;
  aeratorStatus: boolean;
  updateParams: (params: Partial<WaterParams>) => void;
  addAlert: (alert: Omit<Alert, 'id' | 'timestamp'>) => void;
  togglePump: () => void;
  toggleAerator: () => void;
}

export const useAquaStore = create<AquaState>((set) => ({
  waterParams: {
    pH: 7.2,
    ammonia: 0.5,
    dissolvedOxygen: 7.8,
    turbidity: 2.1,
    temperature: 14.5
  },
  fishCount: 14,
  alerts: [],
  pumpStatus: false,
  aeratorStatus: true,
  updateParams: (params) => set((state) => ({ 
    waterParams: { ...state.waterParams, ...params } 
  })),
  addAlert: (alert) => set((state) => ({
    alerts: [
      ...state.alerts,
      {
        id: Math.random().toString(36).substring(2, 9),
        ...alert,
        timestamp: new Date()
      }
    ]
  })),
  togglePump: () => set((state) => ({ pumpStatus: !state.pumpStatus })),
  toggleAerator: () => set((state) => ({ aeratorStatus: !state.aeratorStatus })),
}));