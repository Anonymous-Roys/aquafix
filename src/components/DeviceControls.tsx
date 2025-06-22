import React from 'react';
import { motion } from 'framer-motion';

import { useAquaStore } from '../stores/useAquaStore';
export const DeviceControls = () => {
  const { pumpStatus, aeratorStatus, togglePump, toggleAerator } = useAquaStore();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md border border-gray-100 p-4 sm:p-6"
    >
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
          <span className="text-xl">⚙️</span>
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800">Device Controls</h3>
          <p className="text-xs text-gray-500">Manage your aquaculture equipment</p>
        </div>
      </div>
      
      {/* Device Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Water Pump Card */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className={`p-4 rounded-xl border-2 transition-all duration-300 ${
            pumpStatus 
              ? 'border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 shadow-md' 
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                pumpStatus ? 'bg-blue-500' : 'bg-gray-400'
              }`}>
                <span className="text-white text-sm">💧</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Water Pump</h4>
                <p className="text-xs text-gray-500">Flow Control</p>
              </div>
            </div>
            
            {/* Status Indicator */}
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                pumpStatus ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'
              }`} />
              <span className={`text-xs font-medium ${
                pumpStatus ? 'text-blue-600' : 'text-gray-500'
              }`}>
                {pumpStatus ? 'Running' : 'Stopped'}
              </span>
            </div>
          </div>
          
          {/* Toggle Switch */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={togglePump}
            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              pumpStatus ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          >
            <motion.span
              animate={{
                x: pumpStatus ? 20 : 2
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="inline-block h-5 w-5 transform rounded-full bg-white shadow-lg"
            />
          </motion.button>
        </motion.div>
        
        {/* Aerator Card */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className={`p-4 rounded-xl border-2 transition-all duration-300 ${
            aeratorStatus 
              ? 'border-green-200 bg-gradient-to-br from-green-50 to-green-100 shadow-md' 
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                aeratorStatus ? 'bg-green-500' : 'bg-gray-400'
              }`}>
                <span className="text-white text-sm">💨</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Aerator</h4>
                <p className="text-xs text-gray-500">Oxygen Supply</p>
              </div>
            </div>
            
            {/* Status Indicator */}
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                aeratorStatus ? 'bg-green-500 animate-pulse' : 'bg-gray-300'
              }`} />
              <span className={`text-xs font-medium ${
                aeratorStatus ? 'text-green-600' : 'text-gray-500'
              }`}>
                {aeratorStatus ? 'Running' : 'Stopped'}
              </span>
            </div>
          </div>
          
          {/* Toggle Switch */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleAerator}
            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
              aeratorStatus ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            <motion.span
              animate={{
                x: aeratorStatus ? 20 : 2
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="inline-block h-5 w-5 transform rounded-full bg-white shadow-lg"
            />
          </motion.button>
        </motion.div>
      </div>
      
      {/* Emergency Stop */}
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 sm:py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 focus:outline-none focus:ring-4 focus:ring-red-200"
      >
        <span className="text-lg">🛑</span>
        <span className="text-sm sm:text-base">Emergency Stop All Devices</span>
      </motion.button>
      
      {/* Quick Stats */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>Active Devices: {(pumpStatus ? 1 : 0) + (aeratorStatus ? 1 : 0)}/2</span>
          <span>Last Updated: Just now</span>
        </div>
      </div>
    </motion.div>
  );
};

