import { useState, useEffect, useContext } from "react";
import dessertsData from "../jsonData/dessertsData.js";
import { Search } from "./Search.jsx";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CartContext } from '../context/CartContext.js.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { RightPointer,LeftPointer } from "./Pointer.jsx";

export function Desserts() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPreferences, setSelectedPreferences] = useState({});
    const [addedItems, setAddedItems] = useState([]);
    const { addToCart } = useContext(CartContext);

    const filteredDesserts = dessertsData.desserts.filter((dessert) =>
        dessert.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        AOS.init();
    }, []);

    const handlePreferenceSelect = (dessertId, preference) => {
        setSelectedPreferences((prevPreferences) => {
            const currentPreferences = prevPreferences[dessertId] || [];
            const isSelected = currentPreferences.includes(preference);
            return {
                ...prevPreferences,
                [dessertId]: isSelected
                    ? currentPreferences.filter((item) => item !== preference)
                    : [...currentPreferences, preference],
            };
        });
    };

    const handleAddToCart = (dessert) => {
        const preferences = selectedPreferences[dessert.id];
        if (preferences && preferences.length > 0) {
          preferences.forEach(preference => {
            addToCart({ ...dessert, preference });
          });
        } else {
          addToCart({ ...dessert });
        }
    
        setAddedItems((prevAddedItems) => [...prevAddedItems, dessert.id]);
        setTimeout(() => {
          setAddedItems((prevAddedItems) =>
            prevAddedItems.filter((id) => id !== dessert.id)
          );
        }, 1000);
      };

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
      
    return (
        <div className="elements-container" data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="300">
            <h1>Desserts</h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <div className="bCrad_contanier">
                {filteredDesserts.map((dessert) => (
                    <div key={dessert.id} className="bcard">
                        <div className="image_container">
                            <img src={dessert.img_url} alt="" />
                        </div>
                        <div className="title">
                            <span>{dessert.name}</span>
                        </div>
                        <p className="product_description">{dessert.description}</p>
                        <div className="size">
                            {dessert.preferences && (
                                <>
                                    <span>Preferences</span>
                                    <ul className="list-size">
                                        {dessert.preferences.map((preference, index) => (
                                            <li className="item-list" key={index}>
                                                <button
                                                    className={`item-list-button ${(selectedPreferences[dessert.id] || []).includes(preference) ? 'selected' : ''}`}
                                                    onClick={() => handlePreferenceSelect(dessert.id, preference)}
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
                                <span>SAR {dessert.price}</span>
                            </div>
                            <button
                className={`btn ${addedItems.includes(dessert.id) ? 'added' : ''}`}
                onClick={() => handleAddToCart(dessert)}
                disabled={addedItems.includes(dessert.id)}
              >
                <FontAwesomeIcon icon={faCartShopping} className="cart-icon" />
                <span className="text">{addedItems.includes(dessert.id) ? "Added" : "Add to Cart"}</span>
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
