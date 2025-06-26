// import { create } from 'zustand';

// interface WaterParams {
//   pH: number;
//   ammonia: number;
//   dissolvedOxygen?: number;
//   turbidity: number;
//   temperature: number;
// }

// interface Alert {
//   id: string;
//   message: string;
//   severity: 'critical' | 'warning' | 'normal';
//   timestamp: Date;
// }

// interface AquaState {
//   waterParams: WaterParams;
//   fishCount: number;
//   alerts: Alert[];
//   pumpStatus: boolean;
//   aeratorStatus: boolean;
//   updateParams: (params: Partial<WaterParams>) => void;
//   addAlert: (alert: Omit<Alert, 'id' | 'timestamp'>) => void;
//   togglePump: () => void;
//   toggleAerator: () => void;
// }

// export const useAquaStore = create<AquaState>((set) => ({
//   waterParams: {
//     pH: 7.2,
//     ammonia: 0.5,
//     dissolvedOxygen: 7.8,
//     turbidity: 2.1,
//     temperature: 14.5
//   },
//   fishCount: 14,
//   alerts: [],
//   pumpStatus: false,
//   aeratorStatus: true,
//   updateParams: (params) => set((state) => ({ 
//     waterParams: { ...state.waterParams, ...params } 
//   })),
//   addAlert: (alert) => set((state) => ({
//     alerts: [
//       ...state.alerts,
//       {
//         id: Math.random().toString(36).substring(2, 9),
//         ...alert,
//         timestamp: new Date()
//       }
//     ]
//   })),
//   togglePump: () => set((state) => ({ pumpStatus: !state.pumpStatus })),
//   toggleAerator: () => set((state) => ({ aeratorStatus: !state.aeratorStatus })),
// }));

import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://YOUR_BACKEND_IP:5000/api';

interface WaterParams {
  pH: number;
  ammonia: number;
  turbidity: number;
  temperature: number;
  dissolvedOxygen?: number; // Optional, can be added later
}

interface Alert {
  id: string;
  message: string;
  severity: 'critical' | 'warning' | 'normal';
  timestamp: Date;
  resolved?: boolean;
}

interface AquaState {
  waterParams: WaterParams;
  alerts: Alert[];
  pumpStatus: boolean;
  aeratorStatus: boolean;
  checkAlerts: (data: WaterParams) => void;
  fetchSensorData: () => Promise<void>;
  addAlert: (message: string, severity: 'critical' | 'warning' | 'normal') => void;
  resolveAlert: (id: string) => void;
  togglePump: () => Promise<void>;
  toggleAerator: () => Promise<void>;
}

export const useAquaStore = create<AquaState>((set, get) => ({
  waterParams: {
    pH: 7.2,
    ammonia: 0.5,
    turbidity: 2.1,
    temperature: 14.5
  },
  alerts: [],
  pumpStatus: false,
  aeratorStatus: true,
  
   // Check for alerts based on sensor data
  checkAlerts: (data) => {
    const { addAlert } = get();
    
    if (data.ammonia > 1.5) {
      addAlert('Ammonia level critical!', 'critical');
    }
    if (data.temperature > 18) {
      addAlert('Water temperature too high!', 'warning');
    }
    if (data.pH < 6.0 || data.pH > 8.5) {
      addAlert(`pH level out of range (${data.pH.toFixed(2)})`, 'warning');
    }
  },
  
  // Fetch latest sensor data
  fetchSensorData: async () => {
    try {
      const response = await axios.get(`${API_URL}/sensor-data`);
      set({ waterParams: response.data });
      get().checkAlerts(response.data);
    } catch (error) {
      console.error('Error fetching sensor data:', error);
    }
  },
  
  // Add new alert
  addAlert: (message, severity) => {
    set((state) => ({
      alerts: [
        ...state.alerts,
        {
          id: Math.random().toString(36).substring(2, 9),
          message,
          severity,
          timestamp: new Date(),
          resolved: false
        }
      ].slice(-10) // Keep only last 10 alerts
    }));
  },
  
  // Mark alert as resolved
  resolveAlert: (id) => {
    set((state) => ({
      alerts: state.alerts.map(alert => 
        alert.id === id ? { ...alert, resolved: true } : alert
      )
    }));
  },
  
  // Toggle pump status
  togglePump: async () => {
    const newStatus = !get().pumpStatus;
    try {
      await axios.post(`${API_URL}/device/pump`, { status: newStatus });
      set({ pumpStatus: newStatus });
    } catch (error) {
      console.error('Error toggling pump:', error);
    }
  },
  
  // Toggle aerator status
  toggleAerator: async () => {
    const newStatus = !get().aeratorStatus;
    try {
      await axios.post(`${API_URL}/device/aerator`, { status: newStatus });
      set({ aeratorStatus: newStatus });
    } catch (error) {
      console.error('Error toggling aerator:', error);
    }
  }
}));