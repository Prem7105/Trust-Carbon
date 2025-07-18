import React from 'react';
import { Analytics } from '../types';

interface HeroSectionProps {
  activeTab: string;
  analytics: Analytics;
}

const HeroSection: React.FC<HeroSectionProps> = ({ activeTab, analytics }) => {
  const getTabContent = () => {
    switch (activeTab) {
      case 'Home':
        return {
          title: 'Welcome to TrustCarbon',
          subtitle: 'Advanced blockchain-verified carbon tracking platform'
        };
      case 'Dashboard':
        return {
          title: 'Dashboard Overview',
          subtitle: 'Monitor your carbon footprint and sensor data'
        };
      case 'Emissions':
        return {
          title: 'Emissions Tracking',
          subtitle: 'Real-time CO₂ monitoring and historical analysis'
        };
      case 'Credits':
        return {
          title: 'Carbon Credits',
          subtitle: 'Track and manage your earned carbon credits'
        };
      case 'Marketplace':
        return {
          title: 'Credit Marketplace',
          subtitle: 'Trade verified carbon credits with other users'
        };
      default:
        return {
          title: 'Welcome to TrustCarbon',
          subtitle: 'Advanced blockchain-verified carbon tracking platform'
        };
    }
  };

  const { title, subtitle } = getTabContent();

  // Don't show hero section on homepage
  if (activeTab === 'Home') {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-orange-400 via-red-400 to-red-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-2">{title}</h2>
          <p className="text-xl opacity-90">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
            <div className="text-3xl font-bold mb-1">
              {Math.round(analytics.totalEmissions).toLocaleString()}
            </div>
            <div className="text-sm opacity-90">Tons CO₂ This Month</div>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
            <div className="text-3xl font-bold mb-1 text-red-200">
              +{analytics.monthlyIncrease}%
            </div>
            <div className="text-sm opacity-90">vs Last Month</div>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
            <div className="text-3xl font-bold mb-1">
              {analytics.activeSensors}
            </div>
            <div className="text-sm opacity-90">Active Sensors</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;