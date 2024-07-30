import { useState, useEffect, useContext } from "react";
import {getSnackData} from "../jsonData/snacksData.js";
import { Search } from "./Search.jsx";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CartContext } from '../context/CartContext.js.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { RightPointer, LeftPointer } from "./Pointer.jsx";

export function Snack() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPreferences, setSelectedPreferences] = useState({});
    const [addedItems, setAddedItems] = useState([]);
    const { addToCart } = useContext(CartContext);
    const [snacksData, setsnacksData] = useState([]);

    useEffect(() => {
        AOS.init();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getSnackData();
            setsnacksData(data);
            // console.log("Fetched beverages data:", data);
        };
        fetchData();
    }, []);

    const filteredSnacks = snacksData.filter((snack) =>
        snack.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // console.log("Filtered Beverages:", filteredBeverages);

    const handlePreferenceSelect = (snackId, preference) => {
        setSelectedPreferences((prevPreferences) => {
            const currentPreferences = prevPreferences[snackId] || [];
            const isSelected = currentPreferences.includes(preference);
            return {
                ...prevPreferences,
                [snackId]: isSelected
                    ? currentPreferences.filter((item) => item !== preference)
                    : [...currentPreferences, preference],
            };
        });
    };

    const handleAddToCart = (snack) => {
        const preferences = selectedPreferences[snack.id] || [];
        const itemToAdd = {
            ...snack,
            preferences: preferences.join(', '), // Combine preferences into a single string or array
        };
        addToCart(itemToAdd);

        // Clear selected preferences for the specific beverage
        setSelectedPreferences((prevPreferences) => ({
            ...prevPreferences,
            [snack.id]: [],
        }));

        setAddedItems((prevAddedItems) => [...prevAddedItems, snack.id]);
        setTimeout(() => {
            setAddedItems((prevAddedItems) =>
                prevAddedItems.filter((id) => id !== snack.id)
            );
        }, 1000);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="elements-container" data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="300">
            <h1>Snacks</h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <div className="bCrad_contanier">
                {filteredSnacks.map((snack) => (
                    <div key={snack.id} className="bcard">
                        <div className="image_container">
                            <img src={snack.imgUrl} alt={snack.name} />
                        </div>
                        <div className="title">
                            <span>{snack.name}</span>
                        </div>
                        <p className="product_description">{snack.description}</p>
                        <div className="size">
                            {snack.preferences && snack.preferences.length > 0 && (
                                <>
                                    <span>Preferences</span>
                                    <ul className="list-size">
                                        {snack.preferences.map((preference, index) => (
                                            <li className="item-list" key={index}>
                                                <button
                                                    className={`item-list-button ${(selectedPreferences[snack.id] || []).includes(preference.name) ? 'selected' : ''}`}
                                                    onClick={() => handlePreferenceSelect(snack.id, preference.name)}
                                                >
                                                    {preference.name}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>
                        <div className="action">
                            <div className="price">
                                <span>SAR {snack.price}</span>
                            </div>
                            <button
                                className={`btn ${addedItems.includes(snack.id) ? 'added' : ''}`}
                                onClick={() => handleAddToCart(snack)}
                                disabled={addedItems.includes(snack.id)}
                            >
                                <FontAwesomeIcon icon={faCartShopping} className="cart-icon" />
                                <span className="text">{addedItems.includes(snack.id) ? "Added" : "Add to Cart"}</span>
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

