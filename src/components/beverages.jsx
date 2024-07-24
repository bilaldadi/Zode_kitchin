import { useState, useEffect, useContext } from "react";
import beveragesData from "../jsonData/beveragesData.js";
import { Search } from "./Search.jsx";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CartContext } from '../context/CartContext.js.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { RightPointer,LeftPointer } from "./Pointer.jsx";

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
        setSelectedPreferences((prevPreferences) => {
            const currentPreferences = prevPreferences[beverageId] || [];
            const isSelected = currentPreferences.includes(preference);
            return {
                ...prevPreferences,
                [beverageId]: isSelected
                    ? currentPreferences.filter((item) => item !== preference)
                    : [...currentPreferences, preference],
            };
        });
    };

    const handleAddToCart = (beverage) => {
        const preferences = selectedPreferences[beverage.id];
        if (preferences && preferences.length > 0) {
            preferences.forEach(preference => {
                addToCart({ ...beverage, preference });
            });
        } else {
            alert("Please select at least one preference.");
        }
    };
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    
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
                                                    className={`item-list-button ${(selectedPreferences[beverage.id] || []).includes(preference) ? 'selected' : ''}`}
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
                                <FontAwesomeIcon icon={faCartShopping} />
                                Add to order
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <RightPointer />
            <LeftPointer />
        </div>
    );
}
