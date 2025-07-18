import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { Location } from '../../types';

interface LocationCardProps {
  gpsEnabled: boolean;
  currentLocation: Location | null;
  locationError: string;
  requestLocationPermission: () => void;
  disableGPS: () => void;
}

const LocationCard: React.FC<LocationCardProps> = ({
  gpsEnabled,
  currentLocation,
  locationError,
  requestLocationPermission,
  disableGPS
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-orange-600" />
          GPS Location
        </h3>
        <div className="flex items-center space-x-2">
          <div
            className={`w-3 h-3 rounded-full ${
              gpsEnabled ? "bg-green-500" : "bg-gray-400"
            }`}
          ></div>
          <span className="text-sm text-gray-600">
            {gpsEnabled ? "GPS Active" : "GPS Inactive"}
          </span>
        </div>
      </div>

      {locationError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg mb-4 text-sm">
          {locationError}
        </div>
      )}

      <div className="text-center mb-6">
        {currentLocation ? (
          <div>
            <div className="text-xs text-gray-600 font-mono mb-1">
              {currentLocation.lat.toFixed(6)},{" "}
              {currentLocation.lng.toFixed(6)}
            </div>
            <div className="text-xs text-gray-500 mb-2">
              ±{currentLocation.accuracy?.toFixed(0)}m
            </div>
          </div>
        ) : (
          <div className="text-gray-500">
            <Navigation className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm">Location not available</p>
          </div>
        )}
      </div>

      <div className="flex space-x-2">
        <button
          onClick={requestLocationPermission}
          disabled={gpsEnabled}
          className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-colors ${
            gpsEnabled
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-orange-600 text-white hover:bg-orange-700"
          }`}
        >
          {gpsEnabled ? "Enabled" : "Enable GPS"}
        </button>
        <button
          onClick={disableGPS}
          disabled={!gpsEnabled}
          className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-colors ${
            !gpsEnabled
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-red-600 text-white hover:bg-red-700"
          }`}
        >
          Disable
        </button>
      </div>
    </div>
  );
};

export default LocationCard;