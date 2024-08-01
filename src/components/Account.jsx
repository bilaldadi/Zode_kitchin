import { useState, useEffect, useContext } from 'react';
import axios from "axios";
import ApiUrl from './MainUrl';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import CollapsibleTable from './CollapsibleTable';
import { Margin } from '@mui/icons-material';

export function Account() {
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const { isLoggedIn } = useContext(AuthContext);
    const location = useLocation();
    const [userData, setUserData] = useState({});

    useEffect(() => {
        if (location.state && location.state.orderCompleted) {
            console.log('Order Completed state detected');
            toast.success('Order Received Successfully');
        }
    }, [location.state]);

    useEffect(() => {
        if (isLoggedIn) {
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
                    setIsLoading(false); // Move this inside the try block
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setIsLoading(false); // Ensure to set loading to false even if there's an error
                }
            };

            getUserData();
        }
    }, [isLoggedIn]);

    if (isLoading) {
        return(
          <div style={{margin: '10rem 0'}}>
            <div className="lds-ripple"><div></div><div></div></div>
          </div>
        ) 
    }

    if (isLoggedIn) {
        return (
            <div>
                <div className='customer-order-details'>
                    <h1>
                        Welcome <span style={{ color: '#03D1B8' }}>
                            {userData.name ? (userData.gender === 'Male' ? 'Mr. ' : 'Ms. ') + userData.name : ''}
                        </span>
                    </h1>
                </div>
                <h2 className='order-h2'>My Orders</h2>
                <CollapsibleTable />
            </div>
        );
    }
}
