import React, { useState, useCallback, useEffect } from 'react';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import Homepage from './components/Homepage';
import Dashboard from './components/dashboard/Dashboard';
import Emissions from './components/emissions/Emissions';
import Credits from './components/credits/Credits';
import Marketplace from './components/marketplace/Marketplace';
import SubmitProject from './components/projects/SubmitProject';
import Rewards from './components/rewards/Rewards';
import Profile from './components/profile/Profile';
import AdminPanel from './components/admin/AdminPanel';
import { useLocation } from './hooks/useLocation';
import { useGeofencing } from './hooks/useGeofencing';
import { useSensorSimulation } from './hooks/useSensorSimulation';
import { useCompanyEmissions } from './hooks/useCompanyEmissions';
import { SensorLog, User, GeoFenceZone, Project } from './types';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [activeTab, setActiveTab] = useState("Home");
  const [isConnected] = useState(true);
  const [user] = useState<User>({
    id: "user-123",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    joinDate: "2023-12-01",
    totalProjects: 12,
    totalTokens: 245,
    verificationLevel: "Gold"
  });
  const [sensorLogs, setSensorLogs] = useState<SensorLog[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const addSensorLog = useCallback((message: string, type: 'info' | 'success' | 'error' = "info") => {
    const timestamp = new Date().toLocaleTimeString();
    setSensorLogs((prev) => [...prev.slice(-9), { timestamp, message, type }]);
  }, []);

  const {
    gpsEnabled,
    currentLocation,
    locationHistory,
    locationError,
    requestLocationPermission,
    disableGPS
  } = useLocation(addSensorLog);

  const {
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
  } = useGeofencing(addSensorLog);

  const {
    co2Value,
    isRecording,
    blockchainData,
    chartData,
    analytics,
    mode,
    simulateReading
  } = useSensorSimulation(gpsEnabled, checkGeoFence, addSensorLog, currentLocation, geoFenceZones);

  const { companyEmissions } = useCompanyEmissions();

  // All useEffect and useCallback hooks must be at the top level
  useEffect(() => {
    const defaultZones: GeoFenceZone[] = [
      {
        id: 1,
        name: "Factory Zone A",
        lat: 40.7128,
        lng: -74.006,
        radius: 500,
        active: true,
      },
      {
        id: 2,
        name: "Warehouse B",
        lat: 40.7589,
        lng: -73.9851,
        radius: 300,
        active: true,
      },
      {
        id: 3,
        name: "Solar Farm C",
        lat: 40.6892,
        lng: -74.0445,
        radius: 1000,
        active: false,
      },
    ];
    setGeoFenceZones(defaultZones);
  }, [setGeoFenceZones]);

  const handleAddNewZone = useCallback(() => {
    addNewZone(currentLocation);
  }, [addNewZone, currentLocation]);

  const handleUseCurrentLocation = useCallback(() => {
    useCurrentLocation(currentLocation);
  }, [useCurrentLocation, currentLocation]);

  const handleLogin = (email: string, password: string) => {
    // Simulate authentication
    setIsAuthenticated(true);
  };

  const handleSignup = (userData: any) => {
    // Simulate user creation
    setIsAuthenticated(true);
  };

  const handleProjectSubmit = (project: Partial<Project>) => {
    setProjects(prev => [...prev, project as Project]);
    alert('Project submitted successfully!');
    setActiveTab('Dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('Home');
    // Clear any sensitive data if needed
    setSensorLogs([]);
  };

  // Show auth screens if not authenticated
  if (!isAuthenticated) {
    if (authMode === 'login') {
      return (
        <Login 
          onLogin={handleLogin}
          onSwitchToSignup={() => setAuthMode('signup')}
        />
      );
    } else {
      return (
        <Signup 
          onSignup={handleSignup}
          onSwitchToLogin={() => setAuthMode('login')}
        />
      );
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return <Homepage setActiveTab={setActiveTab} />;
      case 'Dashboard':
        return (
          <Dashboard 
            co2Value={co2Value}
            isRecording={isRecording}
            gpsEnabled={gpsEnabled}
            currentLocation={currentLocation}
            locationError={locationError}
            requestLocationPermission={requestLocationPermission}
            disableGPS={disableGPS}
            analytics={analytics}
            geoFenceZones={geoFenceZones}
            showAddZone={showAddZone}
            setShowAddZone={setShowAddZone}
            newZone={newZone}
            setNewZone={setNewZone}
            addNewZone={handleAddNewZone}
            useCurrentLocation={handleUseCurrentLocation}
            toggleZoneStatus={toggleZoneStatus}
            openMapForZone={openMapForZone}
            calculateDistance={calculateDistance}
            sensorLogs={sensorLogs}
            companyEmissions={companyEmissions}
          />
        );
      case 'Emissions':
        return (
          <Emissions 
            chartData={chartData}
            blockchainData={blockchainData}
            mode={mode}
          />
        );
      case 'Credits':
        return <Credits analytics={analytics} />;
      case 'Marketplace':
        return <Marketplace analytics={analytics} />;
      case 'Submit Project':
        return <SubmitProject onSubmit={handleProjectSubmit} />;
      case 'Rewards':
        return <Rewards userTokens={user.totalTokens} />;
      case 'Profile':
        return <Profile user={user} />;
      case 'Admin':
        return user.role === 'admin' ? <AdminPanel /> : <Homepage setActiveTab={setActiveTab} />;
      default:
        return <Homepage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isConnected={isConnected}
        user={user}
        onLogout={handleLogout}
      />
      
      <HeroSection 
        activeTab={activeTab}
        analytics={analytics}
      />
      
      {renderContent()}
    </div>
  );
}

export default App;