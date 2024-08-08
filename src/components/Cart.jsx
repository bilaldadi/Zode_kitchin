import { useState, useContext, useEffect } from "react";
import { CartContext } from '../context/CartContext.js.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ApiUrl from "./MainUrl.js";
import { AuthContext } from "../context/AuthContext.jsx";
import { LoadingSpinner } from "./LoadingSpinner.jsx";
import { getRoomsData } from "../jsonData/roomsdata.js";

export function Cart() {
    const { cartItems, updateQuantity, removeFromCart, totalItems, setCartItems } = useContext(CartContext);
    const navigate = useNavigate();
    const { userData } = useContext(AuthContext);
    const [showRoomDropdown, setShowRoomDropdown] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        AOS.init();
    }, []);

    useEffect(() => {
        if (userData && userData.room) {
            setSelectedRoom(userData.room.id);
            setIsLoading(false);
        }
    }, [userData]);

    useEffect(() => {
        const fetchRooms = async () => {
            setIsLoading(true);
            const roomsData = await getRoomsData();
            setRooms(roomsData);
            setIsLoading(false);
        };

        fetchRooms();
    }, []);

    const handleQuantityChange = (itemId, preferences, amount) => {
        updateQuantity(itemId, preferences, amount);
    };

    const handleRemoveItem = (itemId, preferences) => {
        removeFromCart(itemId, preferences);
    };

    const submitOrder = async () => {
        const token = localStorage.getItem('authToken');
        const order = {
            roomId: selectedRoom,
            items: cartItems.map((item) => {
                const itemData = {
                    id: item.id,
                    quantity: item.quantity,
                };

                if (item.preferences && item.preferences.length > 0) {
                    itemData.preferences = item.preferences.map(p => p.id);
                }

                return itemData;
            }),
        };

        try {
            await axios.post(`${ApiUrl}/api/v1/orders`, order, {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "Accept": "*/*",
                    "ngrok-skip-browser-warning": "69420",
                },
            });
        } catch (error) {
            console.error("Failed to submit order:", error);
        }
    };

    const handleCompleteOrder = async () => {
        await submitOrder();

        navigate('/account', { state: { orderCompleted: true } });

        // Clear cart items in state and local storage
        setCartItems([]);
        localStorage.removeItem('cartItems');
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleRoomChange = (e) => {
        setSelectedRoom(e.target.value);
    };

    if (isLoading) {
        return <div> <LoadingSpinner/> </div>;
    }

    return (
        <div className="cart">
            <div className="cart-page-container">
                <div className="cart-container">
                    <div className="cart-heading">
                        <FontAwesomeIcon icon={faCartShopping} style={{ fontSize: 'clamp(1rem, 1vw + 0.5rem, 1.5rem)' }} />
                        <h2>My Cart</h2>
                    </div>
                    {totalItems === 0 ? (
                        <div className="cart-items">
                            <p>Your cart is empty</p>
                            <button className="checkout-button" onClick={() => navigate('/')}>Order Now</button>
                        </div>
                    ) : (
                        <>
                            <div className="cart-items">
                                {cartItems.map((item, index) => (
                                    <div key={index} className="cart-item">
                                        <div className="item-details">
                                            <img className="item-image" src={item.imgUrl} alt={item.name} />
                                            <p className="item-name">{item.name}</p>
                                            <p className="item-price">SAR {item.price}</p>
                                            <p className="item-preference">
                                                Preferences: { item.preferences && item.preferences.length > 0 ? item.preferences.map(p => `${p.name}`).join(', ') : 'No Preferences' }
                                            </p>
                                        </div>
                                        <div className="item-quantity">
                                            <button
                                                className="quantity-button"
                                                onClick={() => handleQuantityChange(item.id, item.preferences, -1)}
                                            >
                                                -
                                            </button>
                                            <span className="quantity-number">{item.quantity}</span>
                                            <button
                                                className="quantity-button"
                                                onClick={() => handleQuantityChange(item.id, item.preferences, 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            className="delete-button"
                                            onClick={() => handleRemoveItem(item.id, item.preferences)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="cart-summary">
                                <div className="cart-sum-sum" >
                                  
                                    <div class="checkbox-wrapper">
                                    <input 
                                        type="checkbox" 
                                        id="room" 
                                        name="room" 
                                        value="changeRoom"
                                        className="room-checkbox" 
                                        onChange={() => setShowRoomDropdown(!showRoomDropdown)}
                                    />
                                    <svg viewBox="0 0 35.6 35.6">
                                        <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
                                        <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
                                        <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                                    </svg>
                                    </div>
                                    <label htmlFor="room">Change Room</label>
                                </div>

                                {showRoomDropdown && (
                                    <select onChange={handleRoomChange} value={selectedRoom}>
                                        {rooms.map(room => (
                                            <option key={room.id} value={room.id}>{room.name}</option>
                                        ))}
                                    </select>
                                )}
                            </div>
                            <button className="checkout-button" onClick={handleCompleteOrder}>Send Order</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}