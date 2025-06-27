import { motion } from 'framer-motion';
import { useState } from 'react';

interface WaterQualityCardProps {
  title: string;
  value: number;
  unit: string;
  idealRange: [number, number];
  dangerThreshold: number;
  warningThreshold: number;
  isCalculated?: boolean;
  isCritical?: boolean;
}

export const WaterQualityCard = ({
  title,
  value,
  unit,
  idealRange,
  dangerThreshold,
  warningThreshold,
  isCalculated = false,
  isCritical = false,
}: WaterQualityCardProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  // Enhanced status calculation with critical state
  const getStatusClasses = () => {
    if (isCritical || value >= dangerThreshold) return {
      bg: 'bg-gradient-to-br from-red-50 to-red-100',
      border: 'border-red-200',
      text: 'text-red-700',
      bar: 'bg-gradient-to-r from-red-400 to-red-500',
      status: 'Critical',
      icon: '⚠️',
      pulse: true
    };
    if (value >= warningThreshold) return {
      bg: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
      border: 'border-yellow-200',
      text: 'text-yellow-700',
      bar: 'bg-gradient-to-r from-yellow-400 to-yellow-500',
      status: 'Warning',
      icon: '⚡',
      pulse: false
    };
    return {
      bg: 'bg-gradient-to-br from-green-50 to-green-100',
      border: 'border-green-200',
      text: 'text-green-700',
      bar: 'bg-gradient-to-r from-green-400 to-green-500',
      status: 'Normal',
      icon: '✅',
      pulse: false
    };
  };

  const status = getStatusClasses();
  const progressPercentage = Math.min(100, (value / (dangerThreshold * 1.2)) * 100);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        boxShadow: status.pulse 
          ? '0 10px 15px -3px rgba(239, 68, 68, 0.3)' 
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}
      whileHover={{ y: -3 }}
      transition={{ 
        type: 'spring',
        stiffness: 300,
        damping: 15
      }}
      className={`relative p-4 sm:p-5 rounded-2xl border-2 ${status.bg} ${status.border} 
        shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden`}
    >
      {/* Critical pulse animation */}
      {status.pulse && (
        <motion.div 
          className="absolute inset-0 rounded-2xl border-2 border-red-300"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.7, 0.4, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Built-in tooltip for calculated values */}
      {isCalculated && (
        <div className="relative">
          <button 
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onFocus={() => setShowTooltip(true)}
            onBlur={() => setShowTooltip(false)}
            className="absolute top-2 right-2 bg-white/80 rounded-full p-1 shadow-sm focus:outline-none"
            aria-label="Calculation info"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute right-0 top-10 z-20 w-48 p-2 bg-white rounded-lg shadow-lg border border-gray-200"
            >
              <p className="text-xs text-gray-700">
                Calculated value based on ammonia and turbidity levels
              </p>
            </motion.div>
          )}
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-start mb-3 relative z-10">
        <div>
          <h3 className={`text-sm sm:text-base font-semibold ${status.text} mb-1`}>
            {title}
          </h3>
          <p className="text-xs text-gray-500">
            Ideal: {idealRange[0]}-{idealRange[1]}{unit}
          </p>
        </div>
        <motion.div 
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-lg">{status.icon}</span>
          <span className={`text-xs font-medium px-2 py-1 rounded-full bg-white/50 ${status.text}`}>
            {status.status}
          </span>
        </motion.div>
      </div>

      {/* Value Display */}
      <div className="mb-4 relative z-10">
        <motion.div
          key={`${title}-${value}`}
          initial={{ scale: 1.1, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 500 }}
          className="flex items-baseline space-x-1"
        >
          <span className={`text-2xl sm:text-3xl font-bold ${status.text}`}>
            {value.toFixed(title === 'pH' ? 2 : 1)}
          </span>
          <span className={`text-sm font-medium ${status.text} opacity-70`}>
            {unit}
          </span>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2 relative z-10">
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${status.bar} shadow-sm`}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ 
              duration: 1.5,
              type: 'spring',
              damping: 10
            }}
          />
        </div>
        
        {/* Range Indicators */}
        <div className="flex justify-between text-xs text-gray-500">
          <span>0{unit}</span>
          <span className="text-green-600 font-medium">
            {idealRange[0]}-{idealRange[1]}{unit}
          </span>
          <span className="text-red-500 font-medium">
            {dangerThreshold}+{unit}
          </span>
        </div>
      </div>
    </motion.div>
  );
};