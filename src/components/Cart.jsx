import { useContext, useEffect } from "react";
import { CartContext } from '../context/CartContext.js.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export function Cart() {
    const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);

    useEffect(() => {
        AOS.init();
    }, []);

    const handleQuantityChange = (itemId, preference, amount) => {
        updateQuantity(itemId, preference, amount);
    };

    const handleRemoveItem = (itemId, preference) => {
        removeFromCart(itemId, preference);
    };

    return (
        <div className="cart" data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="300">
            <div className="cart-page-container">
                <div className="user-details-container">
                    <h2>User Details</h2>
                    <form className="user-form">
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" placeholder="Enter your name"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="office">Office Number:</label>
                            <select id="office" name="office">
                                <option value="">Select Office</option>
                                <option value="01">01</option>
                                <option value="02">02</option>
                                <option value="03">03</option>
                                <option value="04">04</option>
                                <option value="05">05</option>
                                <option value="06">06</option>
                                <option value="07">07</option>
                                <option value="08">08</option>
                                <option value="09">09</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number:</label>
                            <input type="tel" id="phone" name="phone" placeholder="Enter your phone number"/>
                        </div>
                    </form>
                </div>

                <div className="cart-container">
                    <h2>My Cart</h2>
                    <div className="cart-items">
                        {cartItems.map((item, index) => (
                            <div key={index} className="cart-item">
                                <div className="item-details">
                                    <p className="item-name">{item.name}</p>
                                    <p className="item-price">SAR {item.price}</p>
                                    <p className="item-preference">Preference: {item.preference}</p>
                                </div>
                                <div className="item-quantity">
                                    <button
                                        className="quantity-button"
                                        onClick={() => handleQuantityChange(item.id, item.preference, -1)}
                                    >
                                        -
                                    </button>
                                    <span className="quantity-number">{item.quantity}</span>
                                    <button
                                        className="quantity-button"
                                        onClick={() => handleQuantityChange(item.id, item.preference, 1)}
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    className="delete-button"
                                    onClick={() => handleRemoveItem(item.id, item.preference)}
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
                    <button className="checkout-button">Complete Order</button>
                </div>
            </div>
        </div>
    );
}
