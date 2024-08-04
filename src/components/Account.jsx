import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import CollapsibleTable from './CollapsibleTable';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from './LoadingSpinner';


export function Account() {
    const [isLoading, setIsLoading] = useState(true);
    const { isLoggedIn ,userData } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        if (location.state && location.state.orderCompleted) {
            // console.log(location.state.orderCompleted);
            // console.log('Order Completed state detected');
            toast.success('Order Received Successfully');
            // Reset orderCompleted state after toast is shown
            navigate('/account', { replace: true, state: { orderCompleted: false } });
        }
    }, []);
    

    useEffect(() => {
        if(userData){
            setIsLoading(false);
        }
    }, [isLoggedIn]);

   

    if (isLoggedIn) {
        return (
            <div>
            
            {isLoading ? (
                <LoadingSpinner />
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
