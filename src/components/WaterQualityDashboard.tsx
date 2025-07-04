import { useAquaStore } from '../stores/useAquaStore';
import type { WaterParams } from '../stores/useAquaStore';
import { WaterQualityCard } from './WaterQualityCard';
import HistoricalDataChart from './HistoricalDataChart';

// Function to calculate Dissolved Oxygen based on ammonia and turbidity
const calculateDO = (ammonia: number, turbidity: number): number => {
  // Base DO level (mg/L)
  const baseDO = 8.0; // Maximum possible DO at standard conditions

  // Ammonia impact (higher ammonia reduces DO)
  const ammoniaImpact = Math.min(ammonia * 0.5, 3.0); // Cap at 3mg/L reduction

  // Turbidity impact (higher turbidity reduces DO)
  const turbidityImpact = Math.min(turbidity * 0.02, 2.0); // Cap at 2mg/L reduction

  // Calculate final DO (ensure it doesn't go below 0)
  const calculatedDO = Math.max(0, baseDO - ammoniaImpact - turbidityImpact);

  return parseFloat(calculatedDO.toFixed(2)); // Return with 2 decimal places
};

export const WaterQualityDashboard = () => {
  const { waterParams = {} as WaterParams } = useAquaStore();

  // Calculate DO if not provided, or use the stored value
  const dissolvedOxygen = waterParams.dissolvedOxygen !== undefined
    ? waterParams.dissolvedOxygen
    : calculateDO(waterParams.ammonia || 0, waterParams.turbidity || 0);

  // Create safe params with calculated DO
  // const safeParams = {
  //   pH: 7.0,
  //   ammonia: 0,
  //   turbidity: 0,
  //   temperature: 20,
  //   dissolvedOxygen: 7.0, // Default fallback
  //   ...waterParams,
  //   dissolvedOxygen // Use calculated or provided DO
  // };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Current Water Quality Parameters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className='md:col-span-2'>
            <WaterQualityCard
              title="DO"
              value={waterParams.dissolvedOxygen ?? dissolvedOxygen}
              unit="mg/L"
              idealRange={[6.5, 8]}
              dangerThreshold={5.5}
              warningThreshold={6.0}
              isCalculated={true}
              isCritical={(waterParams.dissolvedOxygen ?? dissolvedOxygen) < 5.5}
            />
          </div>
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
        {waterParams.dissolvedOxygen === undefined && (
          <div className="mt-2 text-sm text-gray-500">
            * DO value is calculated based on ammonia and turbidity levels
          </div>
        )}
      </div>

      <HistoricalDataChart />
    </div>
  );
};