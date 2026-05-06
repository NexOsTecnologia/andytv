// src/hooks/useTitanSDK.ts

import { useEffect, useState } from 'react';
import { getTitanSDK } from '@titan-os/sdk';

export interface DeviceInfo {
  Product: {
    platform: string;
    model: string;
    year: string;
  };
  Capability: {
    supportAppleHLS: boolean;
    supportMPEG_DASH: boolean;
    supportHDR_DV: boolean;
    support4K: boolean;
  };
}

export function useTitanSDK() {
  const [titanSDK, setTitanSDK] = useState<any>(null);
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [isTitan, setIsTitan] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Detectar si estamos en un entorno Titan OS (global TitanSDK disponible)
    if (typeof window !== 'undefined' && 'TitanSDK' in window) {
      setIsTitan(true);
      try {
        const sdk = getTitanSDK();
        setTitanSDK(sdk);

        sdk.isReady.then(async () => {
          const info = await sdk.deviceInfo.getDeviceInfo();
          setDeviceInfo(info);
          console.log('Titan SDK ready:', info);
          setIsLoading(false);
        }).catch(err => {
          console.error('Error initializing Titan SDK:', err);
          setIsLoading(false);
        });
      } catch (err) {
        console.error('Failed to get Titan SDK:', err);
        setIsLoading(false);
      }
    } else {
      setIsTitan(false);
      setIsLoading(false);
    }
  }, []);

  return { titanSDK, deviceInfo, isTitan, isLoading };
}