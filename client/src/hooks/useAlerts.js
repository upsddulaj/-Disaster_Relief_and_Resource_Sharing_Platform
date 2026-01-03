import { useEffect, useState } from 'react';
import socket from '../services/socket';

const useAlerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const handleAlert = (alert) => {
      setAlerts((prev) => [alert, ...prev].slice(0, 5));
    };

    socket.on('alert:new', handleAlert);
    return () => {
      socket.off('alert:new', handleAlert);
    };
  }, []);

  return alerts;
};

export default useAlerts;
