import  { createContext, useState, useEffect } from 'react';
import { isExpired } from "react-jwt";
import axios from "axios";
import ApiUrl from '../components/MainUrl';

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   const isMyTokenExpired = isExpired(token);
      
      // Check if the token is expired
      // if (!isMyTokenExpired) {
        setIsLoggedIn(true);
    //   } else {
    //     localStorage.removeItem('authToken');
    //   }
    // }
  }, []);

  const getUserData = async () => {
    const token = localStorage.getItem('authToken');
    try {
        const res = await axios.get(`${ApiUrl}/api/v1/users/me`, {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`,
                'Accept': '*/*',
                "ngrok-skip-browser-warning": "69420"
            }
        });
        setUserData(res.data.data);
        // console.log('User data:', res.data.data);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};

  useEffect(() => {
    if (isLoggedIn) {
      getUserData();
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn , userData }}>
      {children}
    </AuthContext.Provider>
  );
};
