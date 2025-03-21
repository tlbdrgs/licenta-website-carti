import React, { useEffect } from 'react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import RouterComponent from '../Router/RouterComponent';
import { startPermissionMonitor } from '../../utils/PermissionMonitor';
import { checkBackendHealth } from '../../utils/healthCheck';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const stopMonitor = startPermissionMonitor(navigate);

    const healthCheckInterval = setInterval(() => {
      checkBackendHealth().then((isBackendUp) => {
        const currentPath = window.location.pathname;
        if (isBackendUp && currentPath === '/server-down') {
          navigate('/home');
        } else if (!isBackendUp && currentPath !== '/server-down') {
          navigate('/server-down'); 
        }
      });
    }, 5000); 

    return () => {
      stopMonitor();
      clearInterval(healthCheckInterval);
    };
  }, [navigate]);

  return <RouterComponent />;
}

function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default WrappedApp;
