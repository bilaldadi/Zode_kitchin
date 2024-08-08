// import { useState, useEffect, useContext } from "react";
// import { AuthContext } from '../../context/AuthContext';
// import { LoadingSpinner } from "../LoadingSpinner";
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { getOrdersData } from "../../jsonData/GetOrders";
// import { toast } from 'react-toastify';

// export function OperationsPage() {
//     const { userData } = useContext(AuthContext);
//     const [ordersData, setOrdersData] = useState({});
//     const [loading, setLoading] = useState(true);
//     const [userRoles, setUserRoles] = useState({});
//     const [hasAccess, setHasAccess] = useState(false);
    

//     useEffect(() => {
//         if (userData && userData.authorities) {
//             const roles = userData.authorities.reduce((acc, authority) => {
//                 acc[authority.id] = authority.authority;
//                 return acc;
//             }, {});
//             setUserRoles(roles);
//             if (Object.keys(userRoles).length === 0) {
//                 setLoading(false);
//             } 
//         } 
        
//     }, [userData]);

//     console.log("User roles:", Object.keys(userRoles).length);

//     useEffect(() => {
//         const fetchData = async () => {
//             if (Object.values(userRoles).includes('ADMIN') || Object.values(userRoles).includes('OPERATIONS')) {
//                 setLoading(true);
//                 setHasAccess(true);
//                 const data = await getOrdersData();
//                 setOrdersData(data);
                
//                 if (data.length === 0) {
//                     toast.info("No Orders found");
//                     setLoading(false);
//                 }
//                 console.log("Fetched beverages data:", data[5].status);
//                 setLoading(false);
//             }
           
//             else{
//                 setLoading(false);
//             }
//         };
//         fetchData();
        
//     }, [userRoles]);

//     // console.log("User roles:", userRoles);
//     // const roles = Object.values(userRoles);

//     if(loading) {
//         return <LoadingSpinner />
//     }

//     if (hasAccess) {
//         return (
//             <div>
//                 <h1>Operations Page {ordersData[5].status}</h1>
//             </div>
//         );
//     } else {
//         return (
//             <div>
//                 Access Denied <a href="/">go to home page</a>
//             </div>
//         );
//     }
   
// }


import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../context/AuthContext';
import { LoadingSpinner } from "../LoadingSpinner";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getOrdersData } from "../../jsonData/GetOrders";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import ApiUrl from "../MainUrl";

export function OperationsPage() {
    const { userData } = useContext(AuthContext);
    const [ordersData, setOrdersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userRoles, setUserRoles] = useState({});
    const [hasAccess, setHasAccess] = useState(false);

    useEffect(() => {
        if (userData && userData.authorities) {
            const roles = userData.authorities.reduce((acc, authority) => {
                acc[authority.id] = authority.authority;
                return acc;
            }, {});
            setUserRoles(roles);
            if (Object.keys(userRoles).length === 0) {
                setLoading(false);
            }
        }
    }, [userData]);

    useEffect(() => {
        const fetchData = async () => {
            if (Object.values(userRoles).includes('ADMIN') || Object.values(userRoles).includes('OPERATIONS')) {
                setLoading(true);
                setHasAccess(true);
                try {
                    const data = await getOrdersData();
                    setOrdersData(data);

                    if (data.length === 0) {
                        toast.info("No Orders found");
                    }
                } catch (error) {
                    toast.error("Failed to fetch orders data");
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        fetchData();
    }, [userRoles]);

    const updateOrderStatus = async (orderId, status) => {
        try {
            await axios.put(`${ApiUrl}/api/v1/orders/${orderId}/status`, { status }, {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            toast.success("Order status updated successfully");
            setOrdersData(prevOrders =>
                prevOrders.map(order =>
                    order.id === orderId ? { ...order, status } : order
                )
            );
        } catch (error) {
            toast.error("Failed to update order status");
        }
    };

    const updateItemStatus = async (orderId, itemId, status) => {
        try {
            await axios.put(`${ApiUrl}/api/v1/orders/${orderId}/items/${itemId}/status`, { status }, {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            toast.success("Item status updated successfully");
            setOrdersData(prevOrders =>
                prevOrders.map(order =>
                    order.id === orderId
                        ? {
                            ...order,
                            orderItems: order.orderItems.map(item =>
                                item.id === itemId ? { ...item, status } : item
                            )
                        }
                        : order
                )
            );
        } catch (error) {
            toast.error("Failed to update item status");
        }
    };

    console.log(ordersData);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (hasAccess) {
        return (
            <div className="operations-page">
                <div className="opertaions-intro" >
                    <div style={{width:"37%"}}>
                        <img src="/zode_logo.png" alt="Zode logo" className="zode-logo-oper" />
                    </div>
                    <h1>Operations</h1>
                </div>
                <div style={{marginTop: '5rem'}} >
                    {ordersData.length === 0 && <h2>No orders found</h2>}
                    {ordersData.map(order => (
                        <div key={order.id} className="order-card">
                            <h3>Order #{order.id}</h3>
                            {/* <p>Status: {order.status}</p> */}
                            <p style={{fontWeight : "800"}} >{order.room.name}</p>
                            <div className="order-status-btns"  >
                                <button className="operations-btn-done" onClick={() => updateOrderStatus(order.id, 'DONE')}>Done</button>
                                {/* <button className="operations-btn-proccessing" onClick={() => updateOrderStatus(order.id, 'PROCESSING')}>Processing</button> */}
                            </div>
                            <div className="order-items">
                                {order.orderItems.map(item => (
                                    <div key={item.id} className="order-item">
                                        {item.item.imgUrl && <img className="operations-oreder-img" src={item.item.imgUrl} alt={item.item.name} />}
                                        <p>{item.item.name}</p>
                                        <p>Q: {item.quantity}</p>
                                        
                                            <div className="operations-pref" >
                                                {item.orderItemPreferences.length > 0 ? (item.orderItemPreferences.map(preference => (preference.preference.name + ', ')) ) : <p style={{color : '#888'}} >No preferences</p>}
                                            </div>

                                        <p>{item.status}</p>
                                         
                                            {item.status !== 'NOT_AVAILABLE' && (
                                                <button
                                                    className="operations-btn-out"
                                                    onClick={() => updateItemStatus(order.id, item.id, 'OUT_OF_STOCK')}
                                                >
                                                    Out of Stock
                                                </button>
                                            )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } else {
        return (
            <div>
                Access Denied <a href="/">Go to home page</a>
            </div>
        );
    }
}