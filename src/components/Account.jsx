import { useState, useEffect, useContext } from 'react';
import axios from "axios";
import ApiUrl from './MainUrl';
import { AuthContext } from '../context/AuthContext';

export function Account() {


    const [isLoading, setIsLoading] = useState(true); // Loading state
    const {isLoggedIn} = useContext(AuthContext);


    useEffect(() => {
        if (isLoggedIn) {
            const getUserData = async () => {
                const token = localStorage.getItem('authToken');
                try {
                    const res = await axios.get(`${ApiUrl}/api/v1/users/me`, {
                        headers: {
                          "Content-type": "application/json",
                          "Authorization": `Bearer ${token}`,
                          'Access-Control-Allow-Origin': '*',
                          'Accept':'*/*',
                          // 'Accept-Encoding':'gzip, deflate, br',
                          // 'Connection':'keep-alive',
                        }
                    });
                    console.log(res.data);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };
    
            getUserData();
        }
    }, [isLoggedIn]);

    useEffect(() => {
      setIsLoading(false);
    }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isLoggedIn) {
        return (
          <div className='customer-order-details'>
            <h1>Welcome</h1>
            <p>You are logged in.</p>
          </div>
        );
  }

}
