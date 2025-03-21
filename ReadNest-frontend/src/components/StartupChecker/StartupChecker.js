import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkLocationPermission } from '../../utils/handleLocationPermission';
import { checkBackendHealth } from '../../utils/healthCheck';
import LoadingPage from '../LoadingPage/LoadingPage';

const StartupChecker = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      checkBackendHealth().then((isBackendUp) => {
        if (isBackendUp) {
          checkLocationPermission()
            .then(() => {
              setLoading(false);
              navigate('/home');
            })
            .catch(() => {
              setLoading(false);
              navigate('/denied-location');
            });
        } else {
          setLoading(false);
          navigate('/server-down');
        }
      });
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  if (loading) {
    return <LoadingPage />;
  }

  return children;
};

export default StartupChecker;
