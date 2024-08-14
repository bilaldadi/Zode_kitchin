import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../context/AuthContext';
import { LoadingSpinner } from "../LoadingSpinner";
import 'aos/dist/aos.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import ApiUrl from "../MainUrl";
import { getAllPendingOrders } from "../../jsonData/GetAllPendingOrders";

export function OperationsPage() {
    const { userData } = useContext(AuthContext);
    const [ordersData, setOrdersData] = useState([]); // Ensure ordersData is initialized as an array
    const [loading, setLoading] = useState(true);
    const [userRoles, setUserRoles] = useState({});
    const [hasAccess, setHasAccess] = useState(false);
    const [updatedStatuses, setUpdatedStatuses] = useState({});


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
                    const data = await getAllPendingOrders();
                    setOrdersData(data || []); // Ensure data is an array or default to an empty array
                } catch (error) {
                    toast.error("Failed to fetch orders data");
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
    
        fetchData(); // Initial fetch
        const intervalId = setInterval(fetchData, 5000); // Poll every 5 seconds
    
        return () => clearInterval(intervalId); // Clean up interval on component unmount
    }, [userRoles]);
    

    // console.log(ordersData);

    // const Itemstatus = ordersData.map(order => order.orderItems.map(item => 
    //    [{
    //         id : item.id ,
    //         status : item.status
    //     }]
    // ));

    // console.log('itemStatus',Itemstatus);

    const updateItemStatus = (orderId, itemId, status) => {
        setUpdatedStatuses(prev => ({
            ...prev,
            [orderId]: {
                ...(prev[orderId] || {}),
                [itemId]: status,
            }
        }));
    };
    const submitOrderUpdates = async (orderId) => {
        const token = localStorage.getItem('authToken');
        
        const updatedItems = Object.entries(updatedStatuses[orderId] || {}).map(([itemId, status]) => ({
            id: parseInt(itemId),
            status: status === 'false' ? false : true 
        }));

        

        if (updatedItems.length > 0) {
            try {
                await axios.put(`${ApiUrl}/api/v1/orders/${orderId}`, { items: updatedItems }, {
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${token}`,
                        "Accept": "*/*",
                        "ngrok-skip-browser-warning": "69420",
                    },
                });
                toast.success("Order status updated successfully");
                window.location.reload();
            } catch (error) {
                console.error(error);
                toast.error("Failed to update order status");
            }
        }
    };

  
console.log('userRole', userRoles); 
    if (hasAccess) {
        return (
            <div className="operations-page">
                <div className="opertaions-intro">
                    <div style={{width:"37%"}}>
                        <img src="/zode_logo.png" alt="Zode logo" className="zode-logo-oper" />
                    </div>
                    <h1>Operations</h1>
                </div>
                <div style={{marginTop: '5rem'}}>
                    {ordersData.length === 0 ? (
                        <h2>No orders found</h2>
                    ) : (
                        ordersData.map(order => (
                            <div key={order.id} className="order-card">
                                <div className="order-card-ff">
                                    <h3>Order #{order.id}</h3>
                                    <p style={{fontWeight : "800"}}>{order.room.name}</p>
                                    <button onClick={() => submitOrderUpdates(order.id)} className="operations-btn-done">Submit</button>
                                </div>
                                <h3>Order Items:</h3>
                                <div className="order-items">
                                    {order.orderItems.map(item => (
                                        <div key={item.id} className="order-item">
                                            {item.item.imgUrl && <img className="operations-oreder-img" src={item.item.imgUrl} alt={item.item.name} />}
                                            <p>{item.item.name}</p>
                                            <p>Q: {item.quantity}</p>
                                            
                                            <div className="operations-pref">
                                                {item.orderItemPreferences.length > 0 ? 
                                                    (item.orderItemPreferences.map(preference => (preference.preference.name + ', '))) 
                                                    : <p style={{ color: '#888' }}>No preferences</p>}
                                            </div>

                                            <p>{item.status}</p>
                                            
                                            {!updatedStatuses[order.id]?.[item.id] && (
                                                <div className="status-buttons">
                                                    <button
                                                        className="operations-btn-done"
                                                        onClick={() => updateItemStatus(order.id, item.id, 'true')}
                                                    >
                                                        Available
                                                    </button>
                                                    <button
                                                        className="operations-btn-out"
                                                        onClick={() => updateItemStatus(order.id, item.id, 'false')}
                                                    >
                                                        Out of Stock
                                                    </button>
                                                </div>
                                            )}
                                            
                                            {updatedStatuses[order.id]?.[item.id] && (
                                                <p>Status updated: {updatedStatuses[order.id][item.id] === 'true' ? 'Available' : 'Out of Stock'}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        );
    } else {
        return (

            <div>
                {loading || !Object.keys(userRoles).length ? (
                    <LoadingSpinner />
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img
                            style={{ width: '12rem', marginBottom: '2rem' }}
                            src="/zode_logo.png"
                            alt="Zode logo"
                        />
                        <h2>
                            Access Denied. <a href="/">Go to home page</a>
                        </h2>
                    </div>
                )}
            </div>


    );
    }
}

