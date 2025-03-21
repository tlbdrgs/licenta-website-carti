import { checkLocationPermission } from './handleLocationPermission';

export const startPermissionMonitor = (navigate) => {
  const interval = setInterval(() => {
    checkLocationPermission()
      .then(() => {
        if (window.location.pathname === '/denied-location') {
          navigate('/home'); 
        }
      })
      .catch(() => {
        if (window.location.pathname !== '/denied-location') {
          navigate('/denied-location');
        }
      });
  }, 1000);

  return () => clearInterval(interval);
};