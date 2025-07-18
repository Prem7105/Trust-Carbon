import React from 'react';
import { Thermometer } from 'lucide-react';

interface SensorCardProps {
  co2Value: number | null;
  isRecording: boolean;
}

const SensorCard: React.FC<SensorCardProps> = ({ 
  co2Value, 
  isRecording
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Thermometer className="w-5 h-5 mr-2 text-blue-600" />
          CO₂ Sensor
        </h3>
        <div className="flex items-center space-x-2">
          <div
            className={`w-3 h-3 rounded-full ${
              isRecording ? "bg-green-500 animate-pulse" : "bg-gray-400"
            }`}
          ></div>
          <span className="text-sm text-gray-600">
            {isRecording ? "Recording" : "Standby"}
          </span>
        </div>
      </div>

      <div className="text-center mb-6">
        <div
          className={`text-4xl font-bold mb-2 ${
            co2Value
              ? co2Value > 70
                ? "text-red-600"
                : co2Value > 50
                ? "text-yellow-600"
                : "text-green-600"
              : "text-gray-400"
          }`}
        >
          {co2Value || "--"}
        </div>
        <div className="text-sm text-gray-600">ppm CO₂</div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <div className="text-sm text-blue-800 font-medium mb-1">
          Auto-Recording Active
        </div>
        <div className="text-xs text-blue-600">
          Emissions are automatically recorded when GPS is enabled and authorized zones are configured
        </div>
      </div>
    </div>
  );
};

export default SensorCard;