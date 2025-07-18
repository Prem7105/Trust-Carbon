import React from 'react';
import { BarChart3 } from 'lucide-react';
import { Analytics } from '../../types';

interface AnalyticsCardProps {
  analytics: Analytics;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ analytics }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
        <BarChart3 className="w-5 h-5 mr-2 text-purple-600" />
        Analytics
      </h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Total Emissions</span>
          <span className="font-semibold text-gray-900">
            {analytics.totalEmissions.toFixed(1)} kg
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Reduced</span>
          <span className="font-semibold text-green-600">
            {analytics.reducedEmissions.toFixed(1)} kg
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Credits Earned</span>
          <span className="font-semibold text-blue-600">
            {analytics.creditsEarned}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Verification Rate</span>
          <span className="font-semibold text-purple-600">
            {analytics.verificationRate.toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCard;