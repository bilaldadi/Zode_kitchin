import { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { LoadingSpinner } from "../LoadingSpinner";
import "aos/dist/aos.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import ApiUrl from "../MainUrl";
import { getAllPendingOrders } from "../../jsonData/GetAllPendingOrders";

export function OperationsPage() {
    const { userData } = useContext(AuthContext);
    const [ordersData, setOrdersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userRoles, setUserRoles] = useState([]);
    const [hasAccess, setHasAccess] = useState(false);
    const [updatedStatuses, setUpdatedStatuses] = useState({});
    const [soundEnabled, setSoundEnabled] = useState(false);

    const previousOrderIdsRef = useRef([]);
    const lastFetchTime = useRef(0);

    useEffect(() => {
        if (userData?.authorities) {
            const roles = userData.authorities.map(auth => auth.authority);
            setUserRoles(roles);
            setLoading(roles.length === 0);
        }
    }, [userData]);

    useEffect(() => {
        const fetchData = async () => {
            const now = Date.now();
            if (now - lastFetchTime.current < 180000) return;
            lastFetchTime.current = now;

            if (!userRoles.includes("ADMIN") && !userRoles.includes("OPERATIONS")) {
                setLoading(false);
                return;
            }

            setLoading(true);
            setHasAccess(true);
            try {
                const data = await getAllPendingOrders();
                const currentOrderIds = (data || []).map(order => order.id);

                // Detect new orders
                if (soundEnabled && currentOrderIds.some(orderId => !previousOrderIdsRef.current.includes(orderId))) {
                    playSound();
                }

                setOrdersData(data || []);
                previousOrderIdsRef.current = currentOrderIds;
            } catch (error) {
                toast.error("Failed to fetch orders data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        const intervalId = setInterval(fetchData, 180000);

        return () => clearInterval(intervalId);
    }, [userRoles, soundEnabled]);

    const playSound = () => {
        const audio = document.getElementById("newOrderSound");
        if (audio) {
            audio.play().catch(error => console.error("Error playing sound:", error));
        }
    };

    const enableSound = () => {
        setSoundEnabled(true);
        playSound();
    };

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
        const token = localStorage.getItem("authToken");
        const updatedItems = Object.entries(updatedStatuses[orderId] || {}).map(([itemId, status]) => ({
            id: parseInt(itemId),
            status: status === "true",
        }));

        if (!updatedItems.length) {
            toast.error("Please update the status of at least one item");
            return;
        }

        try {
            await axios.put(`${ApiUrl}/api/v1/orders/${orderId}`, { items: updatedItems }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "Accept": "*/*",
                    "ngrok-skip-browser-warning": "69420",
                },
            });
            toast.success("Order status updated successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update order status");
        }
    };

    return (
        <div className="operations-page">
            <audio id="newOrderSound" src="/new-order-sound.wav" preload="auto"></audio>

            {!soundEnabled && (
                <div>
                    <button onClick={enableSound} className="enable-sound-button">
                        Enable Sound for New Orders
                    </button>
                </div>
            )}

            {hasAccess ? (
                <div className="operations-page">
                    <div className="opertaions-intro">
                        <div style={{ width: "37%" }}>
                            <img src="/zode_logo.png" alt="Zode logo" className="zode-logo-oper" />
                        </div>
                        <h1>Operations</h1>
                    </div>

                    <div style={{ marginTop: "5rem" }}>
                        {ordersData.length === 0 ? (
                            <h2>No orders found</h2>
                        ) : (
                            ordersData.map(order => (
                                <div key={order.id} className="order-card">
                                    <div className="order-card-ff">
                                        <h3>Order #{order.id}</h3>
                                        <p style={{ fontWeight: "800" }}>{order.room.name}</p>
                                        <p style={{ fontWeight: "800", color: "#01d0b7" }}>{order.user.name}</p>
                                        <button onClick={() => submitOrderUpdates(order.id)} className="operations-btn-done">
                                            Submit
                                        </button>
                                    </div>
                                    <h3>Order Items:</h3>
                                    <div className="order-items">
                                        {order.orderItems.map(item => (
                                            <div key={item.id} className="order-item">
                                                {item.item.imgUrl && (
                                                    <img className="operations-oreder-img" src={item.item.imgUrl} alt={item.item.name} />
                                                )}
                                                <p>{item.item.name}</p>
                                                <p>Q: {item.quantity}</p>

                                                <div className="operations-pref">
                                                    {item.orderItemPreferences.length > 0 ? (
                                                        item.orderItemPreferences.map(preference => preference.preference.name).join(", ")
                                                    ) : (
                                                        <p style={{ color: "#888" }}>No preferences</p>
                                                    )}
                                                </div>

                                                <p>{item.status}</p>

                                                {!updatedStatuses[order.id]?.[item.id] ? (
                                                    <div className="status-buttons">
                                                        <button
                                                            className="operations-btn-done"
                                                            onClick={() => updateItemStatus(order.id, item.id, "true")}
                                                        >
                                                            Available
                                                        </button>
                                                        <button
                                                            className="operations-btn-out"
                                                            onClick={() => updateItemStatus(order.id, item.id, "false")}
                                                        >
                                                            Out of Stock
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <p>Status updated: {updatedStatuses[order.id][item.id] === "true" ? "Available" : "Out of Stock"}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            ) : (
                <div>
                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <img style={{ width: "12rem", marginBottom: "2rem" }} src="/zode_logo.png" alt="Zode logo" />
                            <h2>
                                Access Denied. <a href="/">Go to home page</a>
                            </h2>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
