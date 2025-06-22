import { useAquaStore } from '../stores/useAquaStore';

export const TroutHealthPanel = () => {
  const { waterParams } = useAquaStore();
  
  const getHealthStatus = () => {
    if (waterParams.ammonia > 1.5 || waterParams.dissolvedOxygen < 4) 
      return { status: 'Poor', color: 'red', emoji: '❗' };
    if (waterParams.ammonia > 1.0 || waterParams.dissolvedOxygen < 5) 
      return { status: 'Fair', color: 'yellow', emoji: '⚠️' };
    return { status: 'Excellent', color: 'green', emoji: '👍' };
  };

  const health = getHealthStatus();

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Trout Health Status</h3>
      
      <div className={`mb-4 p-3 rounded-lg bg-${health.color}-50 border-l-4 border-${health.color}-500`}>
        <div className="flex justify-between items-center">
          <span className={`font-bold text-${health.color}-800`}>
            Overall: {health.status}
          </span>
          <span className="text-xl">{health.emoji}</span>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Growth Stage</span>
          <span className="font-medium">Juvenile (3-6 months)</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Recommended Feed</span>
          <span className="font-medium">42% Protein Pellets</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Feeding Frequency</span>
          <span className="font-medium">3x Daily</span>
        </div>
      </div>
    </div>
  );
};