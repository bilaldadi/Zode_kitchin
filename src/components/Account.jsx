// import { useState, useEffect, useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { LoadingSpinner } from './LoadingSpinner';
// import { getUserOrder } from '../jsonData/GetUserOrders';

// export function Account() {
//     const [isLoading, setIsLoading] = useState(true);
//     const { isLoggedIn, userData } = useContext(AuthContext);
//     const location = useLocation();
//     const navigate = useNavigate();
//     const [visibleOrderDetails, setVisibleOrderDetails] = useState({});
//     const [userOrders, setUserOrders] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const ordersPerPage = 3; // Number of orders to display per page
//     let currentOrders = [];

//     useEffect(() => {
//         if (location.state && location.state.orderCompleted) {
//             console.log(location.state.orderCompleted);
//             toast.success('Order Received Successfully');
//             navigate('/account', { replace: true, state: { orderCompleted: false } });
//         }
//     }, [location.state, navigate]);

//     useEffect(() => {
//         if (userData) {
//             const fetchData = async () => {
//                 try {
//                     setIsLoading(true);
//                     const data = await getUserOrder();
//                     // if (data.length === 0) {
//                     //     toast.warning("No orders found.");
//                     // }
//                     setUserOrders(data);
//                 } catch (error) {
//                     toast.error("Some error occurred, please try again later");
//                 } finally {
//                     setIsLoading(false);
//                 }
//             };
//             fetchData();
//             // const intervalId = setInterval(fetchData, 5000); // Poll every 5 seconds
    
//             // return () => clearInterval(intervalId); // Clean up interval on component unmount
//         }
//     }, [userData]);

//     const toggleOrderDetails = (orderId) => {
//         setVisibleOrderDetails((prev) => ({
//             ...prev,
//             [orderId]: !prev[orderId],
//         }));
//     };

//     const indexOfLastOrder = currentPage * ordersPerPage;
//     const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    
//     console.log(userOrders);
//     if (userOrders !== undefined && userOrders.length > 0) { 
//         currentOrders = userOrders.slice(indexOfFirstOrder, indexOfLastOrder);
//     }

//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
//                                 {userData.name ? `${userData.gender === 'Female' ? 'Ms. ' : 'Mr. '}${userData.name}` : ''}
//                             </span>
//                         </h1>
//                     </div>
//                     {currentOrders !== undefined && currentOrders.length > 0 ? (
//                         <h2 className='order-h2'>My Orders</h2>
//                         ) : 
//                         <h2 className='order-h2'>You have no orders</h2>
//                     }

//                     {currentOrders.map((order) => (
//                         <div key={order.id} className='my-orders'>
//                             <div>
//                                 <div className='order-item'>
//                                     <h3>Order #{order.id}</h3>
//                                     <p>Order Date: {order.createdAt}</p>
//                                     <p>Quantity:&nbsp; {order.quantity}</p>
//                                     <p>{order.room.name}</p>
//                                     <p>Status: &nbsp; <span style={{ color: order.status === 'DONE' ? '#0BDA51' : (order.status === 'PROCESSING' ? 'orange' : 'white') }}>{order.status}</span></p>
//                                     <div className='order-item-actions'>
//                                         <button className='btn btn-center' onClick={() => toggleOrderDetails(order.id)}>
//                                             {visibleOrderDetails[order.id] ? 'Hide Details' : 'View Details'}
//                                         </button>
//                                     </div>
//                                 </div>

//                                 {visibleOrderDetails[order.id] && (
//                                     <div className='my-order-details visible'>
//                                         <div className='order-details-list'>
//                                             {order.orderItems.map((item) => (
//                                                 <div key={item.id} className='order-details-item'>
//                                                     <img className='order-item-image' src={item.item.imgUrl} alt='product' />
//                                                     <div className='order-item-details'>
//                                                         <p className='order-item-name'><span>{item.item.name}</span></p>
//                                                         <p className='order-item-other'>Quantity: <span>{item.quantity}</span></p>
//                                                         {item.orderItemPreferences.length > 0 ? (
//                                                             <p className='order-item-other'><span>{item.orderItemPreferences.map((pref) =>  pref.preference.name).join(" ,")}</span></p>
//                                                         ) : null}
//                                                         {item.status ? (
//                                                             <p className='order-item-other'><span style={{ color: item.status === 'DONE' ? '#0BDA51' : (item.status === 'PROCESSING' ? 'orange' : (item.status === 'NOT_AVAILABLE') ? 'red' : 'white')}}>{item.status}</span></p>
//                                                         ): no}
//                                                     </div>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     ))}

//                     <Pagination 
//                         ordersPerPage={ordersPerPage} 
//                         totalOrders={userOrders.length} 
//                         paginate={paginate} 
//                         currentPage={currentPage}
//                     />
//                 </div>
//             ) : null}
//         </div>
//     );
// }


// function Pagination({ ordersPerPage, totalOrders, paginate, currentPage }) {
//     const pageNumbers = [];
//     const maxPagesToShow = 2; // Maximum number of page buttons to show

//     for (let i = 1; i <= Math.ceil(totalOrders / ordersPerPage); i++) {
//         pageNumbers.push(i);
//     }

//     const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
//     const endPage = Math.min(startPage + maxPagesToShow - 1, pageNumbers.length);

//     const visiblePages = pageNumbers.slice(startPage - 1, endPage);

//     return (
//         <nav>
//             {pageNumbers.length > 1 && (
//                 <ul className='pagination'>
//                     <li>
//                         <button 
//                             onClick={() => paginate(currentPage - 1 > 0 ? currentPage - 1 : currentPage)} 
//                             className='page-link btn btn-center btn-pagination'
//                             disabled={currentPage === 1}
//                         >
//                             &#x2190;
//                         </button>
//                     </li>

//                     {startPage > 1 && (
//                         <li className='page-item'>
//                             <button onClick={() => paginate(1)} className='page-link'>1</button>
//                         </li>
//                     )}

//                     {startPage > 2 && <li className='page-item'>...</li>}

//                     {visiblePages.map(number => (
//                         <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
//                             <button onClick={() => paginate(number)} className='page-link'>
//                                 {number}
//                             </button>
//                         </li>
//                     ))}

//                     {endPage < pageNumbers.length - 1 && <li className='page-item'>...</li>}

//                     {endPage < pageNumbers.length && (
//                         <li className='page-item'>
//                             <button onClick={() => paginate(pageNumbers.length)} className='page-link'>
//                                 {pageNumbers.length}
//                             </button>
//                         </li>
//                     )}

//                     <li>
//                         <button 
//                             onClick={() => paginate(currentPage + 1 <= pageNumbers.length ? currentPage + 1 : currentPage)} 
//                             className='page-link btn btn-center btn-pagination'
//                             disabled={currentPage === pageNumbers.length}
//                         >
//                             &#x2192;
//                         </button>
//                     </li>
//                 </ul>
//             )}
//         </nav>
//     );
// }



// export default Pagination;

import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoadingSpinner } from './LoadingSpinner';
import { getUserOrder } from '../jsonData/GetUserOrders';

export function Account() {
    const [isLoading, setIsLoading] = useState(true);
    const { isLoggedIn, userData } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [visibleOrderDetails, setVisibleOrderDetails] = useState({});
    const [userOrders, setUserOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 3; // Number of orders to display per page
    let currentOrders = [];

    useEffect(() => {
        if (location.state && location.state.orderCompleted) {
            console.log(location.state.orderCompleted);
            toast.success('Order Received Successfully');
            navigate('/account', { replace: true, state: { orderCompleted: false } });
        }
    }, [location.state, navigate]);

    useEffect(() => {
        if (userData) {
            const fetchData = async () => {
                try {
                    setIsLoading(true);
                    const data = await getUserOrder();
                    setUserOrders(data);
                } catch (error) {
                    toast.error("Some error occurred, please try again later");
                } finally {
                    setIsLoading(false);
                }
            };
            fetchData();
        }
    }, [userData]);

    const toggleOrderDetails = (orderId) => {
        setVisibleOrderDetails((prev) => ({
            ...prev,
            [orderId]: !prev[orderId],
        }));
    };

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

    // Ensure `userOrders` is an array and has elements before slicing it
    if (Array.isArray(userOrders) && userOrders.length > 0) { 
        currentOrders = userOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                                {userData.name ? `${userData.gender === 'Female' ? 'Ms. ' : 'Mr. '}${userData.name}` : ''}
                            </span>
                        </h1>
                    </div>
                    {Array.isArray(currentOrders) && currentOrders.length > 0 ? (
                        <h2 className='order-h2'>My Orders</h2>
                        ) : 
                        <h2  style={{marginTop : "12rem" , marginBottom:"12rem"}} className='order-h2'>You have no orders</h2>
                    }

                    {currentOrders.map((order) => (
                        <div key={order.id} className='my-orders'>
                            <div>
                                <div className='order-item'>
                                    <h3>Order #{order.id}</h3>
                                    <p>Order Date: {order.createdAt}</p>
                                    <p>Quantity:&nbsp; {order.quantity}</p>
                                    <p>{order.room.name}</p>
                                    <p>Status: &nbsp; <span style={{ color: order.status === 'DONE' ? '#0BDA51' : (order.status === 'PROCESSING' ? 'orange' : 'white') }}>{order.status}</span></p>
                                    <div className='order-item-actions'>
                                        <button className='btn btn-center' onClick={() => toggleOrderDetails(order.id)}>
                                            {visibleOrderDetails[order.id] ? 'Hide Details' : 'View Details'}
                                        </button>
                                    </div>
                                </div>

                                {visibleOrderDetails[order.id] && (
                                    <div className='my-order-details visible'>
                                        <div className='order-details-list'>
                                            {order.orderItems.map((item) => (
                                                <div key={item.id} className='order-details-item'>
                                                    <img className='order-item-image' src={item.item.imgUrl} alt='product' />
                                                    <div className='order-item-details'>
                                                        <p className='order-item-name'><span>{item.item.name}</span></p>
                                                        <p className='order-item-other'>Quantity: <span>{item.quantity}</span></p>
                                                        {item.orderItemPreferences.length > 0 ? (
                                                            <p className='order-item-other'><span>{item.orderItemPreferences.map((pref) =>  pref.preference.name).join(" ,")}</span></p>
                                                        ) : null}
                                                        {item.status ? (
                                                            <p className='order-item-other'><span style={{ color: item.status === 'DONE' ? '#0BDA51' : (item.status === 'PROCESSING' ? 'orange' : (item.status === 'NOT_AVAILABLE') ? 'red' : 'white')}}>{item.status}</span></p>
                                                        ): null}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    <Pagination 
                        ordersPerPage={ordersPerPage} 
                        totalOrders={ Array.isArray(userOrders)  ? userOrders.length : 0 } 
                        paginate={paginate} 
                        currentPage={currentPage}
                    />
                </div>
            ) : null}
        </div>
    );
}


function Pagination({ ordersPerPage, totalOrders, paginate, currentPage }) {
    const pageNumbers = [];
    const maxPagesToShow = 2; // Maximum number of page buttons to show

    for (let i = 1; i <= Math.ceil(totalOrders / ordersPerPage); i++) {
        pageNumbers.push(i);
    }

    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(startPage + maxPagesToShow - 1, pageNumbers.length);

    const visiblePages = pageNumbers.slice(startPage - 1, endPage);

    return (
        <nav>
            {pageNumbers.length > 1 && (
                <ul className='pagination'>
                    <li>
                        <button 
                            onClick={() => paginate(currentPage - 1 > 0 ? currentPage - 1 : currentPage)} 
                            className='page-link btn btn-center btn-pagination'
                            disabled={currentPage === 1}
                        >
                            &#x2190;
                        </button>
                    </li>

                    {startPage > 1 && (
                        <li className='page-item'>
                            <button onClick={() => paginate(1)} className='page-link'>1</button>
                        </li>
                    )}

                    {startPage > 2 && <li className='page-item'>...</li>}

                    {visiblePages.map(number => (
                        <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                            <button onClick={() => paginate(number)} className='page-link'>
                                {number}
                            </button>
                        </li>
                    ))}

                    {endPage < pageNumbers.length - 1 && <li className='page-item'>...</li>}

                    {endPage < pageNumbers.length && (
                        <li className='page-item'>
                            <button onClick={() => paginate(pageNumbers.length)} className='page-link'>
                                {pageNumbers.length}
                            </button>
                        </li>
                    )}

                    <li>
                        <button 
                            onClick={() => paginate(currentPage + 1 <= pageNumbers.length ? currentPage + 1 : currentPage)} 
                            className='page-link btn btn-center btn-pagination'
                            disabled={currentPage === pageNumbers.length}
                        >
                            &#x2192;
                        </button>
                    </li>
                </ul>
            )}
        </nav>
    );
}

export default Pagination;

