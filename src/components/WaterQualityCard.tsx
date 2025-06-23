
import { motion } from 'framer-motion';


interface WaterQualityCardProps {
  title: string;
  value: number;
  unit: string;
  idealRange: [number, number];
  dangerThreshold: number;
  warningThreshold: number;
}

export const WaterQualityCard = ({
  title,
  value,
  unit,
  idealRange,
  dangerThreshold,
  warningThreshold
}: WaterQualityCardProps) => {
  const getStatusClasses = () => {
    if (value >= dangerThreshold) return {
      bg: 'bg-gradient-to-br from-red-50 to-red-100',
      border: 'border-red-200',
      text: 'text-red-700',
      bar: 'bg-gradient-to-r from-red-400 to-red-500',
      status: 'Critical',
      icon: '⚠️'
    };
    if (value >= warningThreshold) return {
      bg: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
      border: 'border-yellow-200',
      text: 'text-yellow-700',
      bar: 'bg-gradient-to-r from-yellow-400 to-yellow-500',
      status: 'Warning',
      icon: '⚡'
    };
    return {
      bg: 'bg-gradient-to-br from-green-50 to-green-100',
      border: 'border-green-200',
      text: 'text-green-700',
      bar: 'bg-gradient-to-r from-green-400 to-green-500',
      status: 'Normal',
      icon: '✅'
    };
  };

  const status = getStatusClasses();
  const progressPercentage = Math.min(100, (value / (dangerThreshold * 1.2)) * 100);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className={`p-4 sm:p-5 rounded-2xl border ${status.bg} ${status.border} shadow-md hover:shadow-lg transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className={`text-sm sm:text-base font-semibold ${status.text} mb-1`}>
            {title}
          </h3>
          <p className="text-xs text-gray-500">
            Ideal: {idealRange[0]}-{idealRange[1]}{unit}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-lg">{status.icon}</span>
          <span className={`text-xs font-medium px-2 py-1 rounded-full bg-white/50 ${status.text}`}>
            {status.status}
          </span>
        </div>
      </div>

      {/* Value Display */}
      <div className="mb-4">
        <motion.div
          key={`${title}-${value}`}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          className="flex items-baseline space-x-1"
        >
          <span className={`text-2xl sm:text-3xl font-bold ${status.text}`}>
            {value.toFixed(1)}
          </span>
          <span className={`text-sm font-medium ${status.text} opacity-70`}>
            {unit}
          </span>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${status.bar} shadow-sm`}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        
        {/* Range Indicators */}
        <div className="flex justify-between text-xs text-gray-400">
          <span>0{unit}</span>
          <span className="text-green-600 font-medium">
            {idealRange[0]}-{idealRange[1]}{unit}
          </span>
          <span className="text-red-500">{dangerThreshold}+{unit}</span>
        </div>
      </div>
    </motion.div>
  );
};