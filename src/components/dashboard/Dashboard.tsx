import React from 'react';
import SensorCard from './SensorCard';
import LocationCard from './LocationCard';
import AnalyticsCard from './AnalyticsCard';
import GeofenceZones from './GeofenceZones';
import ActivityLog from './ActivityLog';
import CompanyEmissionsTable from './CompanyEmissionsTable';
import { 
  Analytics, 
  SensorLog, 
  Location, 
  GeoFenceZone,
  CompanyEmission
} from '../../types';

interface DashboardProps {
  co2Value: number | null;
  isRecording: boolean;
  gpsEnabled: boolean;
  currentLocation: Location | null;
  locationError: string;
  requestLocationPermission: () => void;
  disableGPS: () => void;
  analytics: Analytics;
  geoFenceZones: GeoFenceZone[];
  showAddZone: boolean;
  setShowAddZone: (show: boolean) => void;
  newZone: {
    name: string;
    lat: string;
    lng: string;
    radius: number;
  };
  setNewZone: React.Dispatch<React.SetStateAction<{
    name: string;
    lat: string;
    lng: string;
    radius: number;
  }>>;
  addNewZone: () => void;
  useCurrentLocation: () => void;
  toggleZoneStatus: (zoneId: number) => void;
  openMapForZone: (zone: GeoFenceZone) => void;
  calculateDistance: (lat1: number, lng1: number, lat2: number, lng2: number) => number;
  sensorLogs: SensorLog[];
  companyEmissions: CompanyEmission[];
}

const Dashboard: React.FC<DashboardProps> = ({
  co2Value,
  isRecording,
  gpsEnabled,
  currentLocation,
  locationError,
  requestLocationPermission,
  disableGPS,
  analytics,
  geoFenceZones,
  showAddZone,
  setShowAddZone,
  newZone,
  setNewZone,
  addNewZone,
  useCurrentLocation,
  toggleZoneStatus,
  openMapForZone,
  calculateDistance,
  sensorLogs,
  companyEmissions
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <SensorCard 
          co2Value={co2Value}
          isRecording={isRecording}
        />
        
        <LocationCard 
          gpsEnabled={gpsEnabled}
          currentLocation={currentLocation}
          locationError={locationError}
          requestLocationPermission={requestLocationPermission}
          disableGPS={disableGPS}
        />
        
        <AnalyticsCard analytics={analytics} />
      </div>

      <div className="mb-8">
        <CompanyEmissionsTable companyEmissions={companyEmissions} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GeofenceZones 
          geoFenceZones={geoFenceZones}
          showAddZone={showAddZone}
          setShowAddZone={setShowAddZone}
          newZone={newZone}
          setNewZone={setNewZone}
          currentLocation={currentLocation}
          addNewZone={addNewZone}
          useCurrentLocation={useCurrentLocation}
          toggleZoneStatus={toggleZoneStatus}
          openMapForZone={openMapForZone}
          calculateDistance={calculateDistance}
        />
        
        <ActivityLog sensorLogs={sensorLogs} />
      </div>
    </div>
  );
};

export default Dashboard;