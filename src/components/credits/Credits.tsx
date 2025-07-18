import React from 'react';
import { Coins, Leaf, CheckCircle, History, Info, Award, Globe } from 'lucide-react';
import { Analytics } from '../../types';

interface CreditsProps {
  analytics: Analytics;
}

const Credits: React.FC<CreditsProps> = ({ analytics }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Coins className="w-5 h-5 mr-2 text-yellow-600" />
              Total Credits
            </h3>
          </div>
          <div className="text-3xl font-bold text-yellow-600 mb-2">
            {analytics.creditsEarned}
          </div>
          <div className="text-sm text-gray-600">Carbon Credits Earned</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Leaf className="w-5 h-5 mr-2 text-green-600" />
              Emissions Reduced
            </h3>
          </div>
          <div className="text-3xl font-bold text-green-600 mb-2">
            {analytics.reducedEmissions.toFixed(1)}
          </div>
          <div className="text-sm text-gray-600">kg CO₂ Reduced</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-purple-600" />
              Verification Rate
            </h3>
          </div>
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {analytics.verificationRate.toFixed(1)}%
          </div>
          <div className="text-sm text-gray-600">Data Verified</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Info className="w-5 h-5 mr-2 text-blue-600" />
          About Carbon Credits
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">What are Carbon Credits?</h4>
            <p className="text-gray-600 mb-4">
              Carbon credits are tradeable certificates that represent the removal or reduction of one metric ton of carbon dioxide equivalent (CO₂e) from the atmosphere. They are a key tool in the fight against climate change, allowing organizations and individuals to offset their carbon footprint.
            </p>
            <p className="text-gray-600">
              Each credit you earn through TrustCarbon represents verified emission reductions measured by our blockchain-secured sensor network, ensuring transparency and authenticity in your environmental impact.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">How You Earn Credits</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Verified Monitoring</p>
                  <p className="text-sm text-gray-600">Credits earned when CO₂ readings are verified within authorized zones</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Emission Reduction</p>
                  <p className="text-sm text-gray-600">Additional credits for maintaining low emission levels (below 40 ppm)</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Blockchain Verification</p>
                  <p className="text-sm text-gray-600">All credits are secured and verified through our blockchain network</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Award className="w-5 h-5 mr-2 text-green-600" />
          Credit Standards & Verification
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Globe className="w-8 h-8 mx-auto mb-3 text-green-600" />
            <h4 className="font-semibold text-gray-900 mb-2">Global Standards</h4>
            <p className="text-sm text-gray-600">
              Our credits meet international standards including VCS (Verified Carbon Standard) and Gold Standard requirements
            </p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <CheckCircle className="w-8 h-8 mx-auto mb-3 text-blue-600" />
            <h4 className="font-semibold text-gray-900 mb-2">Third-Party Verified</h4>
            <p className="text-sm text-gray-600">
              All emission reductions are independently verified by accredited third-party organizations
            </p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Coins className="w-8 h-8 mx-auto mb-3 text-purple-600" />
            <h4 className="font-semibold text-gray-900 mb-2">Blockchain Secured</h4>
            <p className="text-sm text-gray-600">
              Each credit is recorded on our blockchain, ensuring permanent, tamper-proof verification
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <History className="w-5 h-5 mr-2 text-blue-600" />
          Credit History
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Date
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Credits
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  CO₂ Reduced
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Location
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-gray-900">2025-01-15</td>
                <td className="py-3 px-4 text-yellow-600 font-semibold">+5</td>
                <td className="py-3 px-4 text-gray-600">25.3 kg</td>
                <td className="py-3 px-4 text-gray-600">Factory Zone A</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                    Verified
                  </span>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-gray-900">2025-01-14</td>
                <td className="py-3 px-4 text-yellow-600 font-semibold">+3</td>
                <td className="py-3 px-4 text-gray-600">18.7 kg</td>
                <td className="py-3 px-4 text-gray-600">Warehouse B</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                    Verified
                  </span>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-gray-900">2025-01-13</td>
                <td className="py-3 px-4 text-yellow-600 font-semibold">+2</td>
                <td className="py-3 px-4 text-gray-600">12.1 kg</td>
                <td className="py-3 px-4 text-gray-600">Solar Farm C</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-gray-900">2025-01-12</td>
                <td className="py-3 px-4 text-yellow-600 font-semibold">+4</td>
                <td className="py-3 px-4 text-gray-600">22.8 kg</td>
                <td className="py-3 px-4 text-gray-600">Factory Zone A</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                    Verified
                  </span>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-gray-900">2025-01-11</td>
                <td className="py-3 px-4 text-yellow-600 font-semibold">+1</td>
                <td className="py-3 px-4 text-gray-600">8.4 kg</td>
                <td className="py-3 px-4 text-gray-600">Warehouse B</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                    Verified
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Credits;