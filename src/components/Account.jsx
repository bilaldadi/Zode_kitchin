import { useState, useEffect } from 'react';
import { Login } from './Login';

export function Account() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
    setIsLoading(false); // Set loading to false after checking token
  }, []);

  
  if (isLoading) {
    return <div>Loading...</div>; // Show loading indicator while checking token
  }

  if (isLoggedIn) {
    return (
      <div>
        <h1>Welcome</h1>
        <p>You are logged in.</p>
      </div>
    );
  }

  return (
    <div>
      <Login />
    </div>
  );
}
