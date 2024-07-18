import { useState, useEffect, useContext } from "react";
import beveragesData from "../jsonData/beveragesData";
import { Search } from "./Search";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CartContext } from '../context/CartContext.js.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

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
                                <FontAwesomeIcon icon={faCartShopping}/>
                                Add to order
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
