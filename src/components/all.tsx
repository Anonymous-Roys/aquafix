import React, { useState, useEffect } from 'react';
import { Droplets, Thermometer, Wind, Eye, AlertTriangle, CheckCircle, XCircle, Fish, Waves } from 'lucide-react';

interface SensorData {
  pH: number;
  temperature: number;
  dissolvedOxygen: number;
  ammonia: number;
  turbidity: number;
  timestamp: string;
}

interface AlertLevel {
  level: 'safe' | 'warning' | 'critical';
  message: string;
}

const TroutAquaFixDashboard: React.FC = () => {
  const [sensorData, setSensorData] = useState<SensorData>({
    pH: 7.2,
    temperature: 15.5,
    dissolvedOxygen: 8.5,
    ammonia: 0.8,
    turbidity: 12,
    timestamp: new Date().toLocaleString()
  });

  const [pumpActive, setPumpActive] = useState(false);
  const [aeratorActive, setAeratorActive] = useState(false);
  const [fishCount] = useState(150);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(prev => ({
        ...prev,
        pH: +(Math.random() * (8.0 - 6.5) + 6.5).toFixed(1),
        temperature: +(Math.random() * (18 - 12) + 12).toFixed(1),
        dissolvedOxygen: +(Math.random() * (10 - 6) + 6).toFixed(1),
        ammonia: +(Math.random() * 2).toFixed(2),
        turbidity: +(Math.random() * 25).toFixed(0),
        timestamp: new Date().toLocaleString()
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getAlertLevel = (parameter: string, value: number): AlertLevel => {
    // Optimal ranges for trout farming
    const ranges = {
      pH: { safe: [6.5, 8.0], warning: [6.0, 8.5] },
      temperature: { safe: [10, 16], warning: [8, 20] },
      dissolvedOxygen: { safe: [7, 12], warning: [5, 15] },
      ammonia: { safe: [0, 1.0], warning: [0, 1.5] },
      turbidity: { safe: [0, 15], warning: [0, 25] }
    };

    const range = ranges[parameter as keyof typeof ranges];
    if (!range) return { level: 'safe', message: 'OK' };

    if (value >= range.safe[0] && value <= range.safe[1]) {
      return { level: 'safe', message: 'Optimal' };
    } else if (value >= range.warning[0] && value <= range.warning[1]) {
      return { level: 'warning', message: 'Monitor' };
    } else {
      return { level: 'critical', message: 'Action Needed' };
    }
  };

  const getStatusIcon = (level: string) => {
    switch (level) {
      case 'safe': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'critical': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <CheckCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (level: string) => {
    switch (level) {
      case 'safe': return 'border-green-200 bg-green-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'critical': return 'border-red-200 bg-red-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const toggleDevice = (device: 'pump' | 'aerator') => {
    if (device === 'pump') {
      setPumpActive(!pumpActive);
    } else {
      setAeratorActive(!aeratorActive);
    }
  };

  // Animated Fish Component
  const AnimatedFish: React.FC<{ delay: number; size: number }> = ({ delay, size }) => (
    <div 
      className="absolute animate-pulse"
      style={{
        animation: `swim 8s infinite linear`,
        animationDelay: `${delay}s`,
        fontSize: `${size}px`,
        left: `-20px`,
        top: `${Math.random() * 60 + 20}%`
      }}
    >
      🐟
    </div>
  );

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      {/* <style tsx>{`
        @keyframes swim {
          0% { transform: translateX(-20px); }
          100% { transform: translateX(calc(100vw + 20px)); }
        }
        @keyframes ripple {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .ripple {
          animation: ripple 2s infinite;
        }
      `}</style> */}

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-3">
            <Fish className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AquaFix Trout Farm</h1>
              <p className="text-gray-600">Smart Aquaculture Monitoring System</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Last Update</p>
            <p className="font-semibold text-gray-900">{sensorData.timestamp}</p>
          </div>
        </div>
      </div>

      {/* Animated Pond Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-gradient-to-b from-blue-100 to-blue-300 rounded-lg shadow-md p-6 relative overflow-hidden h-48">
          <div className="absolute inset-0">
            <Waves className="absolute top-4 left-4 w-6 h-6 text-blue-400 opacity-50" />
            <Waves className="absolute top-8 right-12 w-4 h-4 text-blue-400 opacity-30" />
            <Waves className="absolute bottom-6 left-20 w-5 h-5 text-blue-400 opacity-40" />
            
            {/* Animated Fish */}
            {Array.from({ length: 8 }, (_, i) => (
              <AnimatedFish key={i} delay={i * 1.5} size={16 + Math.random() * 8} />
            ))}
            
            {/* Ripple Effects */}
            <div className="absolute top-16 left-1/3 w-4 h-4 bg-blue-400 rounded-full ripple opacity-30"></div>
            <div className="absolute top-32 right-1/4 w-3 h-3 bg-blue-300 rounded-full ripple opacity-20" style={{animationDelay: '1s'}}></div>
          </div>
          
          <div className="relative z-10 text-center">
            <h2 className="text-xl font-semibold text-blue-900 mb-2">Live Pond Status</h2>
            <div className="flex justify-center items-center space-x-8">
              <div className="bg-white bg-opacity-80 rounded-lg p-3">
                <Fish className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                <p className="text-sm text-gray-700">Fish Count</p>
                <p className="text-lg font-bold text-blue-900">{fishCount}</p>
              </div>
              <div className="bg-white bg-opacity-80 rounded-lg p-3">
                <Thermometer className="w-6 h-6 text-orange-500 mx-auto mb-1" />
                <p className="text-sm text-gray-700">Water Temp</p>
                <p className="text-lg font-bold text-orange-600">{sensorData.temperature}°C</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Water Quality Parameters */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Droplets className="w-6 h-6 text-blue-600 mr-2" />
              Water Quality Parameters
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: 'pH', label: 'pH Level', value: sensorData.pH, unit: '', icon: Droplets, info: 'Trout thrive in pH 6.5-8.0' },
                { key: 'temperature', label: 'Temperature', value: sensorData.temperature, unit: '°C', icon: Thermometer, info: 'Optimal: 10-16°C for trout' },
                { key: 'dissolvedOxygen', label: 'Dissolved Oxygen', value: sensorData.dissolvedOxygen, unit: 'mg/L', icon: Wind, info: 'Critical for trout respiration' },
                { key: 'ammonia', label: 'Ammonia (NH₃)', value: sensorData.ammonia, unit: 'ppm', icon: AlertTriangle, info: 'Toxic if above 1.0 ppm' },
                { key: 'turbidity', label: 'Turbidity', value: sensorData.turbidity, unit: 'NTU', icon: Eye, info: 'Water clarity indicator' }
              ].map((param) => {
                const alert = getAlertLevel(param.key, param.value);
                const Icon = param.icon;
                
                return (
                  <div key={param.key} className={`border-2 rounded-lg p-4 ${getStatusColor(alert.level)}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Icon className="w-5 h-5 text-gray-600 mr-2" />
                        <span className="font-medium text-gray-900">{param.label}</span>
                      </div>
                      {getStatusIcon(alert.level)}
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">
                          {param.value}{param.unit}
                        </span>
                        <p className="text-xs text-gray-600 mt-1">{param.info}</p>
                      </div>
                      <span className={`text-sm font-medium ${
                        alert.level === 'safe' ? 'text-green-600' :
                        alert.level === 'warning' ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {alert.message}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="space-y-6">
          {/* Device Control */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Device Control</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium text-gray-900">Water Pump</span>
                  <p className="text-sm text-gray-600">Circulation & filtration</p>
                </div>
                <button
                  onClick={() => toggleDevice('pump')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    pumpActive 
                      ? 'bg-green-500 text-white hover:bg-green-600' 
                      : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                  }`}
                >
                  {pumpActive ? 'ON' : 'OFF'}
                </button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium text-gray-900">Aerator</span>
                  <p className="text-sm text-gray-600">Oxygen supply</p>
                </div>
                <button
                  onClick={() => toggleDevice('aerator')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    aeratorActive 
                      ? 'bg-green-500 text-white hover:bg-green-600' 
                      : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                  }`}
                >
                  {aeratorActive ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>
          </div>

          {/* Trout Care Tips */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Fish className="w-5 h-5 text-blue-600 mr-2" />
              Trout Care Tips
            </h2>
            
            <div className="space-y-3 text-sm text-gray-700">
              <div className="p-3 bg-blue-50 rounded-lg">
                <strong className="text-blue-800">Temperature:</strong> Keep water between 10-16°C for optimal growth
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <strong className="text-green-800">Oxygen:</strong> Maintain DO above 7 mg/L. Trout need high oxygen levels
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <strong className="text-yellow-800">Feeding:</strong> Feed 2-3% of body weight daily in cool water
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <strong className="text-purple-800">Water Quality:</strong> Change 10-15% water weekly
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TroutAquaFixDashboard;