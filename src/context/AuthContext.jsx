import  { createContext, useState, useEffect } from 'react';
import { isExpired } from "react-jwt";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // const isMyTokenExpired = isExpired(token);
      
      // // Check if the token is expired
      // if (!isMyTokenExpired) {
        setIsLoggedIn(true);
      // } else {
      //   localStorage.removeItem('authToken');
      // }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
