import React from 'react';
import { List } from 'lucide-react';
import { SensorLog } from '../../types';

interface ActivityLogProps {
  sensorLogs: SensorLog[];
}

const ActivityLog: React.FC<ActivityLogProps> = ({ sensorLogs }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
        <List className="w-5 h-5 mr-2 text-gray-600" />
        Activity Log
      </h3>
      <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto">
        {sensorLogs.length === 0 ? (
          <p className="text-sm text-gray-500 italic">
            No activity yet. Start the sensor to see logs.
          </p>
        ) : (
          sensorLogs
            .slice()
            .reverse()
            .map((log, index) => (
              <div
                key={index}
                className={`text-xs mb-2 p-2 bg-white rounded border ${
                  log.type === "error"
                    ? "border-red-200"
                    : log.type === "success"
                    ? "border-green-200"
                    : "border-gray-200"
                }`}
              >
                <div
                  className={`font-medium ${
                    log.type === "error"
                      ? "text-red-600"
                      : log.type === "success"
                      ? "text-green-600"
                      : "text-gray-700"
                  }`}
                >
                  {log.message}
                </div>
                <div className="text-gray-500 mt-1">{log.timestamp}</div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default ActivityLog;