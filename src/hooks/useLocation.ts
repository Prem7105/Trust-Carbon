import { useState, useCallback, useEffect } from 'react';
import { Location } from '../types';

export const useLocation = (addSensorLog: (message: string, type?: 'info' | 'success' | 'error') => void) => {
  const [gpsEnabled, setGpsEnabled] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [locationHistory, setLocationHistory] = useState<Location[]>([]);
  const [locationError, setLocationError] = useState("");

  const requestLocationPermission = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError("GPS not supported by this browser");
      return;
    }

    setLocationError("");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location: Location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date().toISOString(),
        };
        setCurrentLocation(location);
        setGpsEnabled(true);
        setLocationHistory((prev) => [...prev.slice(-19), location]);
        addSensorLog(
          `GPS enabled: ${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`,
          "success"
        );
      },
      (error) => {
        let errorMessage = "Location access denied";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied by user";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out";
            break;
        }
        setLocationError(errorMessage);
        addSensorLog(errorMessage, "error");
      },
      { 
        enableHighAccuracy: true, 
        timeout: 15000, 
        maximumAge: 30000 
      }
    );
  }, [addSensorLog]);

  const disableGPS = useCallback(() => {
    setGpsEnabled(false);
    setCurrentLocation(null);
    setLocationHistory([]);
    addSensorLog("GPS disabled", "info");
  }, [addSensorLog]);

  useEffect(() => {
    let locationInterval: NodeJS.Timeout;
    if (
      gpsEnabled &&
      typeof navigator !== "undefined" &&
      navigator.geolocation
    ) {
      locationInterval = setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location: Location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              accuracy: position.coords.accuracy,
              timestamp: new Date().toISOString(),
            };
            setCurrentLocation(location);
            setLocationHistory((prev) => [...prev.slice(-19), location]);
          },
          (error) => {
            console.error("Location update failed:", error);
            // Don't disable GPS on temporary errors, just log them
            addSensorLog("GPS signal temporarily lost", "error");
          },
          { 
            enableHighAccuracy: true, 
            timeout: 10000, 
            maximumAge: 15000 
          }
        );
      }, 10000); // Update every 10 seconds
    }
    return () => {
      if (locationInterval) clearInterval(locationInterval);
    };
  }, [gpsEnabled, addSensorLog]);

  return {
    gpsEnabled,
    currentLocation,
    locationHistory,
    locationError,
    requestLocationPermission,
    disableGPS
  };
};