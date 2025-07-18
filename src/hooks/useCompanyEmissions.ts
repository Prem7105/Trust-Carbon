import { useState, useCallback, useEffect } from 'react';
import { CompanyEmission } from '../types';

export const useCompanyEmissions = () => {
  const [companyEmissions, setCompanyEmissions] = useState<CompanyEmission[]>([
    {
      id: 'COMP-001',
      name: 'GreenTech Industries',
      location: 'San Francisco, CA',
      emission: 245.8,
      verification: 'Verified',
      lastUpdated: new Date().toISOString(),
    },
    {
      id: 'COMP-002',
      name: 'EcoManufacturing Corp',
      location: 'Portland, OR',
      emission: 189.3,
      verification: 'Verified',
      lastUpdated: new Date().toISOString(),
    },
    {
      id: 'COMP-003',
      name: 'SolarPower Solutions',
      location: 'Austin, TX',
      emission: 67.2,
      verification: 'Pending',
      lastUpdated: new Date().toISOString(),
    },
    {
      id: 'COMP-004',
      name: 'CleanEnergy Dynamics',
      location: 'Seattle, WA',
      emission: 156.7,
      verification: 'Verified',
      lastUpdated: new Date().toISOString(),
    },
    {
      id: 'COMP-005',
      name: 'Carbon Neutral Ltd',
      location: 'Denver, CO',
      emission: 98.4,
      verification: 'Failed',
      lastUpdated: new Date().toISOString(),
    },
    {
      id: 'COMP-006',
      name: 'Renewable Resources Inc',
      location: 'Phoenix, AZ',
      emission: 312.1,
      verification: 'Verified',
      lastUpdated: new Date().toISOString(),
    },
  ]);

  const updateEmissions = useCallback(() => {
    setCompanyEmissions(prev => 
      prev.map(company => ({
        ...company,
        emission: Math.max(0, company.emission + (Math.random() - 0.5) * 20),
        lastUpdated: new Date().toISOString(),
        verification: Math.random() > 0.1 ? company.verification : 
          ['Verified', 'Pending', 'Failed'][Math.floor(Math.random() * 3)] as 'Verified' | 'Pending' | 'Failed'
      }))
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(updateEmissions, 10000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, [updateEmissions]);

  return {
    companyEmissions,
    updateEmissions
  };
};