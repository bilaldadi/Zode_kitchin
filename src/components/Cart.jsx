// import { useContext, useEffect } from "react";
// import { CartContext } from '../context/CartContext.js.jsx';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash, faCartShopping } from '@fortawesome/free-solid-svg-icons';
// import { useNavigate } from 'react-router-dom';
//
// export function Cart() {
//     const { cartItems, updateQuantity, removeFromCart, totalItems, setCartItems } = useContext(CartContext);
//     const navigate = useNavigate();
//
//     useEffect(() => {
//         AOS.init();
//     }, []);
//
//     const handleQuantityChange = (itemId, preference, amount) => {
//         updateQuantity(itemId, preference, amount);
//     };
//
//     const handleRemoveItem = (itemId, preference) => {
//         removeFromCart(itemId, preference);
//     };
//
//     const handleCompleteOrder = () => {
//         console.log('Order Completed');
//         navigate('/account', { state: { orderCompleted: true } });
//
//         setTimeout(() => {
//             navigate('/account', { state: { orderCompleted: false } });
//         }, 500);
//
//         setCartItems([]);
//     };
//
//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, []);
//
//     console.log(cartItems);
//
//     return (
//         <div className="cart" data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="300">
//             <div className="cart-page-container">
//                 <div className="cart-container">
//                     <div className="cart-heading">
//                         <FontAwesomeIcon icon={faCartShopping} style={{ fontSize: 'clamp(1rem, 1vw + 0.5rem, 1.5rem)' }} />
//                         <h2>My Cart</h2>
//                     </div>
//                     {totalItems === 0 ? (
//                         <div className="cart-items">
//                             <p>Your cart is empty</p>
//                             <button className="checkout-button" onClick={() => navigate('/')}>Order Now</button>
//                         </div>
//                     ) : (
//                         <>
//                             <div className="cart-items">
//                                 {cartItems.map((item, index) => (
//                                     <div key={index} className="cart-item">
//                                         <div className="item-details">
//                                             <img className="item-image" src={item.imgUrl} alt={item.name} />
//                                             <p className="item-name">{item.name}</p>
//                                             <p className="item-price">SAR {item.price}</p>
//                                             <p className="item-preference">Preferences: {item.preferences}</p>
//                                         </div>
//                                         <div className="item-quantity">
//                                             <button
//                                                 className="quantity-button"
//                                                 onClick={() => handleQuantityChange(item.id, item.preference, -1)}
//                                             >
//                                                 -
//                                             </button>
//                                             <span className="quantity-number">{item.quantity}</span>
//                                             <button
//                                                 className="quantity-button"
//                                                 onClick={() => handleQuantityChange(item.id, item.preference, 1)}
//                                             >
//                                                 +
//                                             </button>
//                                         </div>
//                                         <button
//                                             className="delete-button"
//                                             onClick={() => handleRemoveItem(item.id, item.preference)}
//                                         >
//                                             <FontAwesomeIcon icon={faTrash} />
//                                         </button>
//                                     </div>
//                                 ))}
//                             </div>
//                             <div className="cart-summary">
//                                 <p className="total-label">Total:</p>
//                                 <p className="total-price">SAR {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
//                             </div>
//                             <button className="checkout-button" onClick={handleCompleteOrder}>Send Order</button>
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

import { useContext, useEffect } from "react";
import { CartContext } from '../context/CartContext.js.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export function Cart() {
    const { cartItems, updateQuantity, removeFromCart, totalItems, setCartItems } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init();
    }, []);

    const handleQuantityChange = (itemId, preference, amount) => {
        updateQuantity(itemId, preference, amount);
    };

    const handleRemoveItem = (itemId, preference) => {
        removeFromCart(itemId, preference);
    };

    const handleCompleteOrder = () => {
        console.log('Order Completed');
        navigate('/account', { state: { orderCompleted: true } });

        setTimeout(() => {
            navigate('/account', { state: { orderCompleted: false } });
        }, 500);

        // Clear cart items in state and local storage
        setCartItems([]);
        localStorage.removeItem('cartItems');
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="cart" data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="300">
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
                                            <p className="item-preference">Preferences: {item.preferences}</p>
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
                                <p className="total-label">Total:</p>
                                <p className="total-price">SAR {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
                            </div>
                            <button className="checkout-button" onClick={handleCompleteOrder}>Send Order</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
