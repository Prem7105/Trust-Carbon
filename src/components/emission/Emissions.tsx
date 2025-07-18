import React from 'react';
import EmissionsChart from './EmissionsChart';
import BlockchainRecords from './BlockchainRecords';
import { ChartData, BlockchainData } from '../../types';

interface EmissionsProps {
  chartData: ChartData[];
  blockchainData: BlockchainData[];
  mode: string;
}

const Emissions: React.FC<EmissionsProps> = ({ chartData, blockchainData, mode }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <EmissionsChart chartData={chartData} />
      
      {mode === "blockchain" && blockchainData.length > 0 && (
        <BlockchainRecords blockchainData={blockchainData} />
      )}
    </div>
  );
};

export default Emissions;