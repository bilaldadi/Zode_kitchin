// import { useState, useEffect, useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useLocation } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import { LoadingSpinner } from './LoadingSpinner';

// export function Account() {
//     const [isLoading, setIsLoading] = useState(true);
//     const { isLoggedIn, userData } = useContext(AuthContext);
//     const location = useLocation();
//     const navigate = useNavigate();
//     const [visibleOrderDetails, setVisibleOrderDetails] = useState({});

//     useEffect(() => {
//         if (location.state && location.state.orderCompleted) {
//             toast.success('Order Received Successfully');
//             navigate('/account', { replace: true, state: { orderCompleted: false } });
//         }
//     }, [location.state, navigate]);

//     useEffect(() => {
//         if (userData) {
//             setIsLoading(false);
//         }
//     }, [userData]);

//     const toggleOrderDetails = (orderId) => {
//         setVisibleOrderDetails((prev) => ({
//             ...prev,
//             [orderId]: !prev[orderId],
//         }));
//     };

//     if (isLoading) {
//         return <LoadingSpinner />;
//     }

//     return (
//         <div>

//             {isLoggedIn ? (
                
//                 <div>
//                     <div className='customer-order-details'>
//                         <h1>
//                             Welcome{' '}
//                             <span style={{ color: '#03D1B8' }}>
//                                 {userData.name ? `${userData.gender === 'Male' ? 'Mr. ' : 'Ms. '}${userData.name}` : ''}
//                             </span>
//                         </h1>
//                     </div>
//                     <h2 className='order-h2'>My Orders</h2>

                    
                    

//                     {[1, 2, 3].map((orderId) => (
//                         <div key={orderId} className='my-orders'>
                        
//                             <div>
                            
//                                 <div className='order-item'>

//                                     <h3>Order #{orderId}</h3>
//                                     <p>Order Date: 12/12/2021</p>
//                                     <p>Quantity:&nbsp; 3</p>
//                                     <p>Status: &nbsp; <span style={{ color: 'green' }}>Delivered</span></p>
//                                     <div className='order-item-actions'>
//                                         <button className='btn btn-center' onClick={() => toggleOrderDetails(orderId)}>
//                                             {visibleOrderDetails[orderId] ? 'Hide Details' : 'View Details'}
//                                         </button>
//                                     </div>

//                                 </div>

//                                 {visibleOrderDetails[orderId] && (
//                                     <div className='my-order-details'>
//                                             {/* <h3>Order Details</h3> */}
//                                             {/* <table className='order-details-table'>
//                                                 <thead>
//                                                     <tr>
//                                                         <th>Product Image</th>
//                                                         <th>Product Name</th>
//                                                         <th>Product Quantity</th>
//                                                         <th>Product Status</th>
//                                                     </tr>
//                                                 </thead>
//                                                 <tbody>
//                                                     <tr>
//                                                         <td><img className='item-image' src='/1.jpg' ></img></td>
//                                                         <td>coffe</td>
//                                                         <td>2</td>
//                                                         <td>Processing...</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <td><img className='item-image' src='/1.jpg' ></img></td>
//                                                         <td>coffe</td>
//                                                         <td>2</td>
//                                                         <td>Processing...</td>
//                                                     </tr>
//                                                 </tbody>
//                                             </table> */}

//                                             <div className='order-details-list'>
//                                                 <div className='order-details-item'>
//                                                     <img className='order-item-image' src='/1.jpg' alt='product' />
//                                                     <div className='order-item-details'>
//                                                         <p className='order-item-name'>Name: <span>coffe</span></p>
//                                                         <p className='order-item-other'>Quantity: <span>2</span></p>
//                                                         <p className='order-item-other'>Status: <span>Processing...</span></p>
//                                                     </div>
                                                    
//                                                 </div>
//                                                 <div className='order-details-item'>
//                                                     <img className='order-item-image' src='/1.jpg' alt='product' />
//                                                     <div className='order-item-details'>
//                                                         <p className='order-item-name'>Name: <span>coffe</span></p>
//                                                         <p className='order-item-other'>Quantity: <span>2</span></p>
//                                                         <p className='order-item-other'>Status: <span>Processing...</span></p>
//                                                     </div>
                                                    
//                                                 </div>
//                                                 <div className='order-details-item'>
//                                                     <img className='order-item-image' src='/1.jpg' alt='product' />
//                                                     <div className='order-item-details'>
//                                                         <p className='order-item-name'>Name: <span>coffe</span></p>
//                                                         <p className='order-item-other'>Quantity: <span>2</span></p>
//                                                         <p className='order-item-other'>Status: <span>Processing...</span></p>
//                                                     </div>
                                                    
//                                                 </div>

//                                             </div>
//                                     </div>
//                                 )}
//                             </div>
                        
//                         </div>
//                 ))}

                    
//                 </div>
//      ) : null}
//      </div>
//     );
// }

import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from './LoadingSpinner';

export function Account() {
    const [isLoading, setIsLoading] = useState(true);
    const { isLoggedIn, userData } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [visibleOrderDetails, setVisibleOrderDetails] = useState({});

    useEffect(() => {
        if (location.state && location.state.orderCompleted) {
            toast.success('Order Received Successfully');
            navigate('/account', { replace: true, state: { orderCompleted: false } });
        }
    }, [location.state, navigate]);

    useEffect(() => {
        if (userData) {
            setIsLoading(false);
        }
    }, [userData]);

    const toggleOrderDetails = (orderId) => {
        setVisibleOrderDetails((prev) => ({
            ...prev,
            [orderId]: !prev[orderId],
        }));
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div>
            {isLoggedIn ? (
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

                    {[1, 2, 3 ,4].map((orderId) => (
                        <div key={orderId} className='my-orders'>
                            <div>
                                <div className='order-item'>
                                    <h3>Order #{orderId}</h3>
                                    <p>Order Date: 12/12/2021</p>
                                    <p>Quantity:&nbsp; 3</p>
                                    <p>Status: &nbsp; <span style={{ color: 'green' }}>Delivered</span></p>
                                    <div className='order-item-actions'>
                                        <button className='btn btn-center' onClick={() => toggleOrderDetails(orderId)}>
                                            {visibleOrderDetails[orderId] ? 'Hide Details' : 'View Details'}
                                        </button>
                                    </div>
                                </div>

                                <div className={`my-order-details ${visibleOrderDetails[orderId] ? 'visible' : ''}`}>
                                    <div className='order-details-list'>
                                        <div className='order-details-item'>
                                            <img className='order-item-image' src='/1.jpg' alt='product' />
                                            <div className='order-item-details'>
                                                <p className='order-item-name'>Name: <span>coffee</span></p>
                                                <p className='order-item-other'>Quantity: <span>2</span></p>
                                                <p className='order-item-other'><span>Sugar , Milk</span></p>
                                                <p className='order-item-other'><span>Processing...</span></p>
                                            </div>
                                        </div>
                                        <div className='order-details-item'>
                                            <img className='order-item-image' src='/1.jpg' alt='product' />
                                            <div className='order-item-details'>
                                                <p className='order-item-name'>Name: <span>coffee</span></p>
                                                <p className='order-item-other'>Quantity: <span>2</span></p>
                                                <p className='order-item-other'><span>Milk</span></p>
                                                <p className='order-item-other'><span>Processing...</span></p>
                                            </div>
                                        </div>
                                        <div className='order-details-item'>
                                            <img className='order-item-image' src='/1.jpg' alt='product' />
                                            <div className='order-item-details'>
                                                <p className='order-item-name'>Name: <span>coffee</span></p>
                                                <p className='order-item-other'>Quantity: <span>2</span></p>
                                                <p className='order-item-other'><span>Processing...</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
}