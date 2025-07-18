import React from 'react';
import { Building2, MapPin, Hash, Gauge, CheckCircle, Clock, XCircle } from 'lucide-react';
import { CompanyEmission } from '../../types';

interface CompanyEmissionsTableProps {
  companyEmissions: CompanyEmission[];
}

const CompanyEmissionsTable: React.FC<CompanyEmissionsTableProps> = ({ companyEmissions }) => {
  const getVerificationIcon = (verification: string) => {
    switch (verification) {
      case 'Verified':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'Failed':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getVerificationColor = (verification: string) => {
    switch (verification) {
      case 'Verified':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Building2 className="w-5 h-5 mr-2 text-blue-600" />
          Company Emissions Monitor
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Live Updates</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                <div className="flex items-center">
                  <Building2 className="w-4 h-4 mr-1" />
                  Company Name
                </div>
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  Location
                </div>
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                <div className="flex items-center">
                  <Hash className="w-4 h-4 mr-1" />
                  ID
                </div>
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                <div className="flex items-center">
                  <Gauge className="w-4 h-4 mr-1" />
                  Emissions (ppm)
                </div>
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Verification
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {companyEmissions.map((company) => (
              <tr key={company.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4">
                  <div className="font-medium text-gray-900">{company.name}</div>
                  <div className="text-xs text-gray-500">
                    Updated: {new Date(company.lastUpdated).toLocaleTimeString()}
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-600">{company.location}</td>
                <td className="py-3 px-4">
                  <span className="font-mono text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded">
                    {company.id}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <span 
                      className={`font-semibold ${
                        company.emission > 200 
                          ? 'text-red-600' 
                          : company.emission > 100 
                          ? 'text-yellow-600' 
                          : 'text-green-600'
                      }`}
                    >
                      {company.emission.toFixed(1)}
                    </span>
                    <div 
                      className={`w-2 h-2 rounded-full ${
                        company.emission > 200 
                          ? 'bg-red-500' 
                          : company.emission > 100 
                          ? 'bg-yellow-500' 
                          : 'bg-green-500'
                      }`}
                    ></div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    {getVerificationIcon(company.verification)}
                    <span 
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getVerificationColor(company.verification)}`}
                    >
                      {company.verification}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Low (&lt;100 ppm)</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span>Medium (100-200 ppm)</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span>High (&gt;200 ppm)</span>
          </div>
        </div>
        <div>
          Total Companies: {companyEmissions.length}
        </div>
      </div>
    </div>
  );
};

export default CompanyEmissionsTable;