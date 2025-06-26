'use client';

import React, { useState, useEffect, useRef } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

const QiblaCompass: React.FC = () => {
  const [heading, setHeading] = useState<number>(0);
  const [qiblaDirection, setQiblaDirection] = useState<number>(0);
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);
  const compassRef = useRef<HTMLDivElement>(null);

  // Mecca coordinates (approximate)
  const MECCA_LAT = 21.4225;
  const MECCA_LNG = 39.8262;

  useEffect(() => {
    // Check if device orientation is supported
    if (!window.DeviceOrientationEvent) {
      setIsSupported(false);
      return;
    }

    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.alpha !== null) {
        setHeading(event.alpha);
      }
    };

    const requestPermission = async () => {
      try {
        // Request permission for device orientation
        if ('DeviceOrientationEvent' in window && 'requestPermission' in DeviceOrientationEvent) {
          const permission = await (DeviceOrientationEvent as any).requestPermission();
          if (permission === 'granted') {
            setPermissionGranted(true);
            window.addEventListener('deviceorientation', handleOrientation);
          } else {
            setIsSupported(false);
          }
        } else {
          // Fallback for devices that don't require permission
          setPermissionGranted(true);
          window.addEventListener('deviceorientation', handleOrientation);
        }
      } catch (error) {
        console.error('Error requesting device orientation permission:', error);
        setIsSupported(false);
      }
    };

    // Get user's current location to calculate Qibla direction
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          
          // Calculate Qibla direction
          const qiblaAngle = calculateQiblaDirection(userLat, userLng);
          setQiblaDirection(qiblaAngle);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Use a default direction if location access is denied
          setQiblaDirection(45);
        }
      );
    }

    requestPermission();

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  const calculateQiblaDirection = (lat: number, lng: number): number => {
    const latDiff = MECCA_LAT - lat;
    const lngDiff = MECCA_LNG - lng;
    
    const y = Math.sin(lngDiff * Math.PI / 180) * Math.cos(MECCA_LAT * Math.PI / 180);
    const x = Math.cos(lat * Math.PI / 180) * Math.sin(MECCA_LAT * Math.PI / 180) - 
              Math.sin(lat * Math.PI / 180) * Math.cos(MECCA_LAT * Math.PI / 180) * Math.cos(lngDiff * Math.PI / 180);
    
    let qiblaAngle = Math.atan2(y, x) * 180 / Math.PI;
    qiblaAngle = (qiblaAngle + 360) % 360;
    
    return qiblaAngle;
  };

  const getRotationAngle = (): number => {
    return (qiblaDirection - heading + 360) % 360;
  };

  const getDirectionText = (): string => {
    const angle = getRotationAngle();
    if (angle >= 337.5 || angle < 22.5) return 'North';
    if (angle >= 22.5 && angle < 67.5) return 'Northeast';
    if (angle >= 67.5 && angle < 112.5) return 'East';
    if (angle >= 112.5 && angle < 157.5) return 'Southeast';
    if (angle >= 157.5 && angle < 202.5) return 'South';
    if (angle >= 202.5 && angle < 247.5) return 'Southwest';
    if (angle >= 247.5 && angle < 292.5) return 'West';
    if (angle >= 292.5 && angle < 337.5) return 'Northwest';
    return 'North';
  };

  if (!isSupported) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex flex-col">
        <NavBar />
        <div className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg p-6 text-center">
            <h1 className="text-2xl font-bold text-black dark:text-white mb-4">Qibla</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Your device doesn't support compass functionality or permission was denied.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!permissionGranted) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex flex-col">
        <NavBar />
        <div className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg p-6 text-center">
            <h1 className="text-2xl font-bold text-black dark:text-white mb-4">Qibla</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Please grant permission to access your device's compass sensor.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Grant Permission
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col">
      <NavBar />
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-black dark:text-white mb-6 text-center">Qibla</h1>
          
          {/* Compass Display */}
          <div className="relative w-64 h-64 mx-auto mb-6">
            {/* Outer ring */}
            <div className="absolute inset-0 border-4 border-gray-300 dark:border-gray-600 rounded-full"></div>
            
            {/* Direction markers */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-sm font-bold text-gray-600 dark:text-gray-300">N</div>
            </div>
            <div className="absolute inset-0 flex items-start justify-center pt-2">
              <div className="text-sm font-bold text-gray-600 dark:text-gray-300">N</div>
            </div>
            <div className="absolute inset-0 flex items-center justify-end pr-2">
              <div className="text-sm font-bold text-gray-600 dark:text-gray-300">E</div>
            </div>
            <div className="absolute inset-0 flex items-end justify-center pb-2">
              <div className="text-sm font-bold text-gray-600 dark:text-gray-300">S</div>
            </div>
            <div className="absolute inset-0 flex items-center justify-start pl-2">
              <div className="text-sm font-bold text-gray-600 dark:text-gray-300">W</div>
            </div>
            
            {/* Qibla arrow */}
            <div 
              ref={compassRef}
              className="absolute inset-0 flex items-center justify-center"
              style={{ transform: `rotate(${getRotationAngle()}deg)` }}
            >
              <div className="w-1 h-24 bg-white relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-b-12 border-l-transparent border-r-transparent border-b-white"></div>
              </div>
            </div>
            
            {/* Center dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
          
          {/* Information display */}
          <div className="text-center space-y-2">
            <div className="text-lg font-semibold text-black dark:text-white">
              Direction: {getDirectionText()}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Qibla Angle: {qiblaDirection.toFixed(1)}°
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Device Heading: {heading.toFixed(1)}°
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Rotation: {getRotationAngle().toFixed(1)}°
            </div>
          </div>
          
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default QiblaCompass;