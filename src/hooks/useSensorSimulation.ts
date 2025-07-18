import { useState, useCallback, useEffect } from 'react';
import { 
  ChartData, 
  BlockchainData, 
  Location, 
  GeoFenceZone, 
  Analytics, 
  SensorLog 
} from '../types';

export const useSensorSimulation = (
  gpsEnabled: boolean,
  checkGeoFence: (location: Location | null) => GeoFenceZone | null,
  addSensorLog: (message: string, type?: 'info' | 'success' | 'error') => void,
  currentLocation: Location | null,
  geoFenceZones: GeoFenceZone[]
) => {
  const [co2Value, setCo2Value] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [blockchainData, setBlockchainData] = useState<BlockchainData[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [analytics, setAnalytics] = useState<Analytics>({
    totalEmissions: 2847,
    reducedEmissions: 340,
    creditsEarned: 85,
    verificationRate: 94,
    monthlyIncrease: 12.5,
    activeSensors: 24,
  });
  const [mode] = useState("blockchain");

  const generateHash = useCallback((data: any) => {
    const str = JSON.stringify(data) + Date.now();
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16).substring(0, 12);
  }, []);

  const generateCo2Value = useCallback(() => {
    return Math.floor(Math.random() * (100 - 20 + 1)) + 20;
  }, []);

  const simulateReading = useCallback(() => {
    const value = generateCo2Value();
    setCo2Value(value);

    const currentZone = currentLocation ? checkGeoFence(currentLocation) : null;
    const locationVerified = gpsEnabled && currentLocation !== null && currentZone !== null;

    const reading = {
      id: Date.now(),
      co2_level: value,
      timestamp: new Date().toISOString(),
      location: currentLocation
        ? `${currentLocation.lat.toFixed(6)}, ${currentLocation.lng.toFixed(6)}`
        : "Unknown",
      zone: currentZone?.name || "Outside authorized zones",
      locationVerified,
      verified: mode === "blockchain" && locationVerified,
    };

    if (mode === "blockchain") {
      const hash = generateHash(reading);
      const blockData: BlockchainData = {
        ...reading,
        hash,
        previousHash:
          blockchainData.length > 0
            ? blockchainData[blockchainData.length - 1].hash
            : "0000000000000000",
        blockNumber: blockchainData.length + 1,
      };

      if (locationVerified) {
        addSensorLog(
          `✓ Verified: CO₂ ${value} ppm at ${currentZone?.name} (Hash: ${hash})`,
          "success"
        );
      } else if (!gpsEnabled) {
        addSensorLog(
          `⚠ Unverified: CO₂ ${value} ppm - GPS not enabled`,
          "error"
        );
      } else if (!currentLocation) {
        addSensorLog(
          `⚠ Unverified: CO₂ ${value} ppm - Location not available`,
          "error"
        );
      } else {
        addSensorLog(
          `⚠ Unverified: CO₂ ${value} ppm - Outside authorized zones`,
          "error"
        );
      }

      setBlockchainData((prev) => [...prev, blockData]);
    } else {
      if (gpsEnabled && currentLocation) {
        addSensorLog(
          `CO₂ reading: ${value} ppm at ${reading.location}`,
          "info"
        );
      } else {
        addSensorLog(`CO₂ reading: ${value} ppm (No GPS)`, "info");
      }
    }

    setAnalytics((prev) => ({
      ...prev,
      totalEmissions: prev.totalEmissions + value * 0.1,
      reducedEmissions:
        value < 50 ? prev.reducedEmissions + 5 : prev.reducedEmissions,
      creditsEarned:
        locationVerified && value < 40 ? prev.creditsEarned + 1 : prev.creditsEarned,
      verificationRate: locationVerified
        ? Math.min(prev.verificationRate + 0.1, 100)
        : Math.max(prev.verificationRate - 0.2, 0),
    }));

    const now = new Date();
    const newChartPoint: ChartData = {
      time: now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      value: 300 + value * 2,
    };

    setChartData((prev) => [...prev.slice(-23), newChartPoint]);
  }, [
    mode,
    gpsEnabled,
    currentLocation,
    generateCo2Value,
    generateHash,
    checkGeoFence,
    addSensorLog,
    blockchainData.length
  ]);

  // Auto-start recording when conditions are met
  useEffect(() => {
    const shouldRecord = gpsEnabled && geoFenceZones.length > 0;
    
    if (shouldRecord && !isRecording) {
      setIsRecording(true);
      addSensorLog("Auto-recording started - GPS enabled with authorized zones", "success");
    } else if (!shouldRecord && isRecording) {
      setIsRecording(false);
      if (!gpsEnabled) {
        addSensorLog("Recording paused - GPS disabled", "info");
      } else if (geoFenceZones.length === 0) {
        addSensorLog("Recording paused - No authorized zones configured", "info");
      }
    }
  }, [gpsEnabled, geoFenceZones.length, isRecording, addSensorLog]);

  // Auto-recording interval
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      simulateReading(); // Initial reading
      interval = setInterval(simulateReading, 10000); // Every 10 seconds
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording, simulateReading]);

  useEffect(() => {
    const generateChartData = () => {
      const data: ChartData[] = [];
      const now = new Date();
      for (let i = 24; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        const value = 350 + Math.random() * 80 + Math.sin(i * 0.5) * 20;
        data.push({
          time: time.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          value: Math.round(value),
        });
      }
      return data;
    };

    setChartData(generateChartData());
  }, []);

  return {
    co2Value,
    isRecording,
    blockchainData,
    chartData,
    analytics,
    mode,
    simulateReading
  };
};