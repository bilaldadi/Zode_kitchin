import { useState, useEffect, useContext } from "react";
import beveragesData from "../jsonData/beveragesData";
import { Search } from "./Search";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CartContext } from '../context/CartContext.js.jsx'

export function Beverages() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPreferences, setSelectedPreferences] = useState({});
    const { addToCart } = useContext(CartContext);

    const filteredBeverages = beveragesData.beverages.filter((beverage) =>
        beverage.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        AOS.init();
    }, []);

    const handlePreferenceSelect = (beverageId, preference) => {
        setSelectedPreferences((prevPreferences) => ({
            ...prevPreferences,
            [beverageId]: preference,
        }));
    };

    const handleAddToCart = (beverage) => {
        const preference = selectedPreferences[beverage.id];
        if (preference) {
            addToCart({ ...beverage, preference });
        } else {
            alert("Please select a preference.");
        }
    };

    return (
        <div className="elements-container" data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="300">
            <h1>Beverages</h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <div className="bCrad_contanier">
                {filteredBeverages.map((beverage) => (
                    <div key={beverage.id} className="bcard">
                        <div className="image_container">
                            <img src={beverage.img_url} alt="" />
                        </div>
                        <div className="title">
                            <span>{beverage.name}</span>
                        </div>
                        <p className="product_description">{beverage.description}</p>
                        <div className="size">
                            {beverage.preferences && (
                                <>
                                    <span>Preferences</span>
                                    <ul className="list-size">
                                        {beverage.preferences.map((preference, index) => (
                                            <li className="item-list" key={index}>
                                                <button
                                                    className={`item-list-button ${selectedPreferences[beverage.id] === preference ? 'selected' : ''}`}
                                                    onClick={() => handlePreferenceSelect(beverage.id, preference)}
                                                >
                                                    {preference}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>
                        <div className="action">
                            <div className="price">
                                <span>SAR {beverage.price}</span>
                            </div>
                            <button className="btn" onClick={() => handleAddToCart(beverage)}>
                                <svg
                                    className="cart-icon"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                    ></path>
                                </svg>
                                Add to order
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
