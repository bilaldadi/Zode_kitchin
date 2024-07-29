import { useState, useEffect, useContext } from "react";
import fruitsData from "../jsonData/fruitsData.js";
import { Search } from "./Search.jsx";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CartContext } from '../context/CartContext.js.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { RightPointer,LeftPointer } from "./Pointer.jsx";

export function Fruits() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPreferences, setSelectedPreferences] = useState({});
    const [addedItems, setAddedItems] = useState([]);
    const { addToCart } = useContext(CartContext);

    const filteredFruits = fruitsData.fruits.filter((fruit) =>
        fruit.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        AOS.init();
    }, []);

    const handlePreferenceSelect = (fruitId, preference) => {
        setSelectedPreferences((prevPreferences) => {
            const currentPreferences = prevPreferences[fruitId] || [];
            const isSelected = currentPreferences.includes(preference);
            return {
                ...prevPreferences,
                [fruitId]: isSelected
                    ? currentPreferences.filter((item) => item !== preference)
                    : [...currentPreferences, preference],
            };
        });
    };

    const handleAddToCart = (fruit) => {
        const preferences = selectedPreferences[fruit.id];
        if (preferences && preferences.length > 0) {
          preferences.forEach(preference => {
            addToCart({ ...fruit, preference });
          });
        } else {
          addToCart({ ...fruit });
        }
    
        setAddedItems((prevAddedItems) => [...prevAddedItems, fruit.id]);
        setTimeout(() => {
          setAddedItems((prevAddedItems) =>
            prevAddedItems.filter((id) => id !== fruit.id)
          );
        }, 1000);
      };

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
      
    return (
        <div className="elements-container" data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="300">
            <h1>Fruits</h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <div className="bCrad_contanier">
                {filteredFruits.map((fruit) => (
                    <div key={fruit.id} className="bcard">
                        <div className="image_container">
                            <img src={fruit.img_url} alt="" />
                        </div>
                        <div className="title">
                            <span>{fruit.name}</span>
                        </div>
                        <p className="product_description">{fruit.description}</p>
                        <div className="size">
                            {fruit.preferences && (
                                <>
                                    <span>Preferences</span>
                                    <ul className="list-size">
                                        {fruit.preferences.map((preference, index) => (
                                            <li className="item-list" key={index}>
                                                <button
                                                    className={`item-list-button ${(selectedPreferences[fruit.id] || []).includes(preference) ? 'selected' : ''}`}
                                                    onClick={() => handlePreferenceSelect(fruit.id, preference)}
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
                                <span>SAR {fruit.price}</span>
                            </div>
                            <button
                className={`btn ${addedItems.includes(fruit.id) ? 'added' : ''}`}
                onClick={() => handleAddToCart(fruit)}
                disabled={addedItems.includes(fruit.id)}
              >
                <FontAwesomeIcon icon={faCartShopping} className="cart-icon" />
                <span className="text">{addedItems.includes(fruit.id) ? "Added" : "Add to Cart"}</span>
              </button>
                        </div>
                    </div>
                ))}
            </div>
            {/* <RightPointer />
            <LeftPointer /> */}
        </div>
    );
}