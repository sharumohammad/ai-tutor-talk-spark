
import { useState, useEffect } from 'react';
import socketService from '@/services/socketService';

export function useConnectionStatus() {
  const [isConnected, setIsConnected] = useState<boolean>(socketService.isConnected());

  useEffect(() => {
    // Set up listeners for connection changes
    const connectUnsubscribe = socketService.onConnect(() => {
      setIsConnected(true);
    });
    
    const disconnectUnsubscribe = socketService.onDisconnect(() => {
      setIsConnected(false);
    });
    
    // Ensure clean up
    return () => {
      connectUnsubscribe();
      disconnectUnsubscribe();
    };
  }, []);

  return isConnected;
}
