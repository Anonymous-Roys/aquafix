// import { useAquaStore } from '../stores/useAquaStore';

const StatusBar = () => {
  // const { waterParams } = useAquaStore();
  
  // const getStatusColor = (param: string, value: number) => {
  //   const ranges: Record<string, { warning: number; danger: number }> = {
  //     ammonia: { warning: 1.0, danger: 1.5 },
  //     dissolvedOxygen: { warning: 5.0, danger: 4.0 },
  //     temperature: { warning: 18, danger: 20 },
  //     pH: { warning: 5.5, danger: 5.0 }
  //   };
    
  //   if (value >= ranges[param].danger) return 'bg-red-500';
  //   if (value >= ranges[param].warning) return 'bg-yellow-500';
  //   return 'bg-green-500';
  // };

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b">
      {/* <div className="flex space-x-4">
        <div className="flex items-center space-x-1">
          <span className={`w-3 h-3 rounded-full ${getStatusColor('ammonia', waterParams.ammonia)}`}></span>
          <span>NH₃: {waterParams.ammonia}ppm</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className={`w-3 h-3 rounded-full ${getStatusColor('dissolvedOxygen', waterParams.dissolvedOxygen)}`}></span>
          <span>DO: {waterParams.dissolvedOxygen}mg/L</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className={`w-3 h-3 rounded-full ${getStatusColor('temperature', waterParams.temperature)}`}></span>
          <span>Temp: {waterParams.temperature}°C</span>
        </div>
      </div> */}
      <div className="text-sm text-gray-500">
        Last updated: {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
};

export default StatusBar;