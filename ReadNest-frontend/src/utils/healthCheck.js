export const checkBackendHealth = async () => {
    try {
      const response = await fetch('http://localhost:8080/health', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        return true;
      } else {
        console.error(`Backend health check failed with status: ${response.status}`);
        return false;
      }
    } catch (error) {
      console.error('Error during backend health check:', error);
      return false;
    }
  };