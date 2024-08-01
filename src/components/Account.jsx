import { useState, useEffect, useContext } from 'react';
import axios from "axios";
import ApiUrl from './MainUrl';
import { AuthContext } from '../context/AuthContext';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import CollapsibleTable from './CollapsibleTable';
import { useNavigate } from 'react-router-dom';


export function Account() {
    const [isLoading, setIsLoading] = useState(true);
    const { isLoggedIn } = useContext(AuthContext);
    const location = useLocation();
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (location.state && location.state.orderCompleted) {
    //         console.log('Order Completed state detected');
    //         toast.success('Order Received Successfully');
    //     }
    // }, [location.state]);

    useEffect(() => {
        if (location.state && location.state.orderCompleted) {
            console.log(location.state.orderCompleted);
            console.log('Order Completed state detected');
            toast.success('Order Received Successfully');
            // Reset orderCompleted state after toast is shown
            navigate('/account', { replace: true, state: { orderCompleted: false } });
        }
    }, []);
    

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
                    // console.log('User data:', res.data.data);
                    setIsLoading(false); 
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setIsLoading(false); 
                }
            };

            getUserData();
        }
    }, [isLoggedIn]);

   

    if (isLoggedIn) {
        return (
            <div>
            
            {isLoading ? (
                <div style={{ margin: '10rem 0' }}>
                    <div className="lds-ripple">
                        <div></div>
                        <div></div>
                    </div>
                </div>
            ) : (
                <div>
                     
                    <div className='customer-order-details'>
                        <h1>
                            Welcome{' '}
                            <span style={{ color: '#03D1B8' }}>
                                {userData.name ? `${userData.gender === 'Male' ? 'Mr. ' : 'Ms. '}${userData.name}` : ''}
                            </span>
                        </h1>
                    </div>
                    <h2 className='order-h2'>My Orders</h2>
                    <CollapsibleTable />
                </div>
            )}
            </div>
        );
    }
}
