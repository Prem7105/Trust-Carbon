import React from 'react';
import { TrendingUp, Factory, Leaf, Coins, AlignCenterVertical as Certificate, BarChart3 } from 'lucide-react';
import { Analytics } from '../../types';

interface MarketplaceProps {
  analytics: Analytics;
}

const Marketplace: React.FC<MarketplaceProps> = ({ analytics }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Carbon Credit Marketplace
        </h2>
        <p className="text-gray-600">
          Monitor carbon credit rates and resource pricing data
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
            Carbon Credit Rates
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Current Price</span>
              <span className="font-semibold text-green-600">$2.50/credit</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">24h Change</span>
              <span className="font-semibold text-green-600">+3.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Weekly High</span>
              <span className="font-semibold text-gray-900">$2.65</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Weekly Low</span>
              <span className="font-semibold text-gray-900">$2.35</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Volume</span>
              <span className="font-semibold text-gray-900">1,247 credits</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Factory className="w-5 h-5 mr-2 text-orange-600" />
            Resource Rates
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Coal (per ton)</span>
              <span className="font-semibold text-red-600">$85.40</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Copper (per lb)</span>
              <span className="font-semibold text-orange-600">$4.12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">
                Natural Gas (per MMBtu)
              </span>
              <span className="font-semibold text-blue-600">$3.85</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Oil (per barrel)</span>
              <span className="font-semibold text-gray-900">$78.20</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Steel (per ton)</span>
              <span className="font-semibold text-gray-700">$650.00</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Leaf className="w-5 h-5 mr-2 text-green-600" />
            Renewable Energy Rates
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Solar (per MWh)</span>
              <span className="font-semibold text-yellow-600">$45.30</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Wind (per MWh)</span>
              <span className="font-semibold text-blue-600">$38.75</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Hydro (per MWh)</span>
              <span className="font-semibold text-cyan-600">$42.10</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Biomass (per MWh)</span>
              <span className="font-semibold text-green-600">$55.80</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Coins className="w-5 h-5 mr-2 text-purple-600" />
            Your Portfolio
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Credits Owned</span>
              <span className="font-semibold text-blue-600">
                {analytics.creditsEarned}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Market Value</span>
              <span className="font-semibold text-green-600">
                ${(analytics.creditsEarned * 2.5).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">
                Total Emissions Tracked
              </span>
              <span className="font-semibold text-gray-900">
                {analytics.totalEmissions.toFixed(1)} kg
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Verification Rate</span>
              <span className="font-semibold text-purple-600">
                {analytics.verificationRate.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Certificate className="w-5 h-5 mr-2 text-green-600" />
          Available Carbon Credits
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Solar Farm Project",
              description: "Clean energy generation in California",
              rate: "$2.45/credit",
              available: "500 credits",
              offset: "1 ton/credit",
              status: "Verified",
              statusColor: "green"
            },
            {
              name: "Forest Conservation",
              description: "Rainforest protection in Brazil",
              rate: "$2.60/credit",
              available: "250 credits",
              offset: "1.2 ton/credit",
              status: "Verified",
              statusColor: "green"
            },
            {
              name: "Wind Energy",
              description: "Offshore wind farm in Denmark",
              rate: "$2.55/credit",
              available: "750 credits",
              offset: "0.9 ton/credit",
              status: "Pending",
              statusColor: "yellow"
            },
            {
              name: "Methane Capture",
              description: "Landfill gas capture in Texas",
              rate: "$3.20/credit",
              available: "180 credits",
              offset: "1.5 ton/credit",
              status: "Verified",
              statusColor: "green"
            },
            {
              name: "Ocean Restoration",
              description: "Kelp forest restoration project",
              rate: "$4.80/credit",
              available: "95 credits",
              offset: "2.1 ton/credit",
              status: "Premium",
              statusColor: "blue"
            },
            {
              name: "Direct Air Capture",
              description: "Advanced CO₂ removal facility",
              rate: "$8.50/credit",
              available: "45 credits",
              offset: "1.0 ton/credit",
              status: "Technology",
              statusColor: "purple"
            }
          ].map((project, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-semibold text-gray-900">
                  {project.name}
                </h4>
                <span
                  className={`px-2 py-1 rounded-full text-xs bg-${project.statusColor}-100 text-${project.statusColor}-800`}
                >
                  {project.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                {project.description}
              </p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Rate</span>
                  <span className="text-lg font-bold text-green-600">
                    {project.rate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Available</span>
                  <span className="text-sm text-gray-900">{project.available}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">CO₂ Offset</span>
                  <span className="text-sm text-gray-900">{project.offset}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
          Market Trends
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">+12.5%</div>
            <div className="text-sm text-gray-600">
              Carbon Credit Growth (30d)
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600 mb-1">-8.2%</div>
            <div className="text-sm text-gray-600">Coal Price Change (30d)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">+15.7%</div>
            <div className="text-sm text-gray-600">
              Renewable Energy Adoption
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;