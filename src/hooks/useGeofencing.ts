import { useState, useCallback } from 'react';
import { GeoFenceZone, Location } from '../types';

export const useGeofencing = (addSensorLog: (message: string, type?: 'info' | 'success' | 'error') => void) => {
  const [geoFenceZones, setGeoFenceZones] = useState<GeoFenceZone[]>([]);
  const [showAddZone, setShowAddZone] = useState(false);
  const [newZone, setNewZone] = useState({
    name: "",
    lat: "",
    lng: "",
    radius: 500,
  });

  const calculateDistance = useCallback((lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371000;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }, []);

  const checkGeoFence = useCallback(
    (location: Location | null): GeoFenceZone | null => {
      if (!location) return null;

      for (const zone of geoFenceZones) {
        if (!zone.active) continue;

        const distance = calculateDistance(
          location.lat,
          location.lng,
          zone.lat,
          zone.lng
        );

        if (distance <= zone.radius) {
          return zone;
        }
      }
      return null;
    },
    [geoFenceZones, calculateDistance]
  );

  const addNewZone = useCallback((currentLocation: Location | null) => {
    if (!newZone.name || !newZone.lat || !newZone.lng) {
      addSensorLog("Please fill in all zone details", "error");
      return;
    }

    const lat = parseFloat(newZone.lat);
    const lng = parseFloat(newZone.lng);
    const radius = parseInt(newZone.radius.toString());

    if (isNaN(lat) || isNaN(lng) || isNaN(radius)) {
      addSensorLog("Invalid coordinates or radius", "error");
      return;
    }

    const zone: GeoFenceZone = {
      id: Date.now(),
      name: newZone.name,
      lat: lat,
      lng: lng,
      radius: radius,
      active: true,
    };

    setGeoFenceZones((prev) => [...prev, zone]);
    setNewZone({ name: "", lat: "", lng: "", radius: 500 });
    setShowAddZone(false);
    addSensorLog(`New zone "${zone.name}" added successfully`, "success");
  }, [newZone, addSensorLog]);

  const useCurrentLocation = useCallback((currentLocation: Location | null) => {
    if (currentLocation) {
      setNewZone((prev) => ({
        ...prev,
        lat: currentLocation.lat.toFixed(6),
        lng: currentLocation.lng.toFixed(6),
      }));
    } else {
      addSensorLog("No current location available", "error");
    }
  }, [addSensorLog]);

  const toggleZoneStatus = useCallback((zoneId: number) => {
    setGeoFenceZones((prev) =>
      prev.map((zone) =>
        zone.id === zoneId ? { ...zone, active: !zone.active } : zone
      )
    );

    setGeoFenceZones((zones) => {
      const zone = zones.find((z) => z.id === zoneId);
      if (zone) {
        addSensorLog(
          `Zone "${zone.name}" ${zone.active ? "activated" : "deactivated"}`,
          "info"
        );
      }
      return zones;
    });
  }, [addSensorLog]);

  const openMapForZone = useCallback((zone: GeoFenceZone) => {
    const mapUrl = `https://www.google.com/maps?q=${zone.lat},${zone.lng}&z=16&t=m`;
    window.open(mapUrl, "_blank");
  }, []);

  return {
    geoFenceZones,
    setGeoFenceZones,
    showAddZone,
    setShowAddZone,
    newZone,
    setNewZone,
    calculateDistance,
    checkGeoFence,
    addNewZone,
    useCurrentLocation,
    toggleZoneStatus,
    openMapForZone
  };
};