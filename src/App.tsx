import { useEffect } from 'react';
import { useAquaStore } from './stores/useAquaStore';
import {TroutHealthPanel} from './components/TroutHealthPanel';
import {Navbar}from './components/Navbar';
import StatusBar from './components/StatusBar';
import { DeviceControls } from './components/DeviceControls';
import { WaterQualityDashboard } from './components/WaterQualityDashboard';
import { AlertSystem } from './components/AlertSystem';
import { PondAnimation } from './components/PondAnimation';

function App() {
  const { waterParams, updateParams, addAlert } = useAquaStore();
  
  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Random small fluctuations to simulate real data
      const newParams = {
        pH: waterParams.pH + (Math.random() * 0.2 - 0.1),
        ammonia: Math.max(0, waterParams.ammonia + (Math.random() * 0.1 - 0.05)),
        dissolvedOxygen: waterParams.dissolvedOxygen + (Math.random() * 0.3 - 0.15),
        temperature: waterParams.temperature + (Math.random() * 0.4 - 0.2)
      };
      
      updateParams(newParams);
      
      // Generate alerts if thresholds are crossed
      if (newParams.ammonia > 1.5) {
        addAlert({
          message: 'Ammonia level critical!',
          severity: 'critical'
        });
      } else if (newParams.dissolvedOxygen < 5) {
        addAlert({
          message: 'Low oxygen level detected',
          severity: 'warning'
        });
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [waterParams, updateParams, addAlert]);

  return (
   <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <StatusBar />
      
      <main className="flex-1 container mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="space-y-6">
          <PondAnimation 
            fishCount={14} 
            waterFlow={0.7} 
            aeration={true} 
          />
          <WaterQualityDashboard />
          <DeviceControls />
        </section>
        <section className="space-y-6">
          <TroutHealthPanel />
          <AlertSystem />
        </section>
        
        
      </main>
    </div>
  );
}

export default App;