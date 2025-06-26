
import { useAquaStore } from '../stores/useAquaStore';
import { WaterQualityCard} from './WaterQualityCard';

export const WaterQualityDashboard = () => {
  const { waterParams } = useAquaStore();
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Water Quality Parameters</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WaterQualityCard 
          title="pH"
          value={waterParams.pH}
          unit=""
          idealRange={[6.5, 8]}
          dangerThreshold={5.5}
          warningThreshold={6.0}
        />
        <WaterQualityCard 
          title="Ammonia"
          value={waterParams.ammonia}
          unit="ppm"
          idealRange={[0, 0.5]}
          dangerThreshold={1.5}
          warningThreshold={1.0}
        />
        <WaterQualityCard 
          title="Turbidity"
          value={waterParams.turbidity}
          unit="NTU"
          idealRange={[0, 5]}
          dangerThreshold={10.0}
          warningThreshold={5.0}
        />
        <WaterQualityCard 
          title="Temperature"
          value={waterParams.temperature}
          unit="°C"
          idealRange={[10, 16]}
          dangerThreshold={20}
          warningThreshold={18}
        />
      </div>
    </div>
  );
};