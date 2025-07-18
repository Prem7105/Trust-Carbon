import React from 'react';
import { Cuboid as Cube } from 'lucide-react';
import { BlockchainData } from '../../types';

interface BlockchainRecordsProps {
  blockchainData: BlockchainData[];
}

const BlockchainRecords: React.FC<BlockchainRecordsProps> = ({ blockchainData }) => {
  if (blockchainData.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
        <Cube className="w-5 h-5 mr-2 text-blue-600" />
        Blockchain Records
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Block #
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                CO₂ Level
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Location
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Zone
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Hash
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {blockchainData.slice(-10).map((block) => (
              <tr key={block.id} className="border-b border-gray-100">
                <td className="py-3 px-4 text-gray-900">
                  {block.blockNumber}
                </td>
                <td className="py-3 px-4 text-gray-600">
                  {block.co2_level} ppm
                </td>
                <td className="py-3 px-4 text-xs text-gray-500 font-mono">
                  {block.location}
                </td>
                <td className="py-3 px-4 text-gray-600">{block.zone}</td>
                <td className="py-3 px-4 text-xs text-gray-500 font-mono">
                  {block.hash}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      block.verified
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {block.verified ? "Verified" : "Unverified"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlockchainRecords;