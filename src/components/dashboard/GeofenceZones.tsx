import React from 'react';
import { Shield, Plus, MapPin, ExternalLink } from 'lucide-react';
import { GeoFenceZone, Location } from '../../types';

interface GeofenceZonesProps {
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
  currentLocation: Location | null;
  addNewZone: () => void;
  useCurrentLocation: () => void;
  toggleZoneStatus: (zoneId: number) => void;
  openMapForZone: (zone: GeoFenceZone) => void;
  calculateDistance: (lat1: number, lng1: number, lat2: number, lng2: number) => number;
}

const GeofenceZones: React.FC<GeofenceZonesProps> = ({
  geoFenceZones,
  showAddZone,
  setShowAddZone,
  newZone,
  setNewZone,
  currentLocation,
  addNewZone,
  useCurrentLocation,
  toggleZoneStatus,
  openMapForZone,
  calculateDistance
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-purple-600" />
          Authorized Zones
        </h3>
        <button
          onClick={() => setShowAddZone(!showAddZone)}
          className="bg-purple-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-purple-700 transition-colors flex items-center"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Zone
        </button>
      </div>

      {showAddZone && (
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            Add New Authorized Zone
          </h4>
          <div className="grid grid-cols-1 gap-3">
            <input
              type="text"
              value={newZone.name}
              onChange={(e) =>
                setNewZone((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              placeholder="Zone Name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                step="any"
                value={newZone.lat}
                onChange={(e) =>
                  setNewZone((prev) => ({
                    ...prev,
                    lat: e.target.value,
                  }))
                }
                placeholder="Latitude"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <input
                type="number"
                step="any"
                value={newZone.lng}
                onChange={(e) =>
                  setNewZone((prev) => ({
                    ...prev,
                    lng: e.target.value,
                  }))
                }
                placeholder="Longitude"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={useCurrentLocation}
                disabled={!currentLocation}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  currentLocation
                    ? "bg-orange-600 text-white hover:bg-orange-700"
                    : "bg-gray-400 text-white cursor-not-allowed"
                }`}
              >
                Use Current Location
              </button>
              <button
                onClick={addNewZone}
                className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
              >
                Add Zone
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {geoFenceZones.map((zone) => (
          <div
            key={zone.id}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="text-sm font-medium text-gray-900">
                  {zone.name}
                </span>
                <div className="text-xs text-gray-500 font-mono mt-1">
                  {zone.lat.toFixed(6)}, {zone.lng.toFixed(6)}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => openMapForZone(zone)}
                  className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors flex items-center"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Map
                </button>
                <button
                  onClick={() => toggleZoneStatus(zone.id)}
                  className={`text-xs px-2 py-1 rounded transition-colors ${
                    zone.active
                      ? "text-green-600 bg-green-100 hover:bg-green-200"
                      : "text-gray-600 bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {zone.active ? "Active" : "Inactive"}
                </button>
              </div>
            </div>
            {currentLocation && zone.active && (
              <div className="text-xs mt-2">
                <span
                  className={`px-2 py-1 rounded ${
                    calculateDistance(
                      currentLocation.lat,
                      currentLocation.lng,
                      zone.lat,
                      zone.lng
                    ) <= zone.radius
                      ? "text-green-600 bg-green-50"
                      : "text-red-600 bg-red-50"
                  }`}
                >
                  {calculateDistance(
                    currentLocation.lat,
                    currentLocation.lng,
                    zone.lat,
                    zone.lng
                  ) <= zone.radius
                    ? "Inside Zone"
                    : `${Math.round(
                        calculateDistance(
                          currentLocation.lat,
                          currentLocation.lng,
                          zone.lat,
                          zone.lng
                        )
                      )}m away`}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeofenceZones;