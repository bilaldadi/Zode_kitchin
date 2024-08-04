import { useState, useEffect, useContext } from "react";
import { getBeverageData } from "../jsonData/beveragesData.js";
import { Search } from "./Search.jsx";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CartContext } from '../context/CartContext.js.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Loading } from "./Loading.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function Beverages() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPreferences, setSelectedPreferences] = useState({});
    const [addedItems, setAddedItems] = useState([]);
    const { addToCart } = useContext(CartContext);
    const [beveragesData, setBeveragesData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AOS.init();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const data = await getBeverageData();
            setBeveragesData(data);
            setLoading(false);
            if(data.length === 0) {
                toast.error("Some error occurred, please try again later");
            }
            // console.log("Fetched beverages data:", data);
        };
        fetchData();
    }, []);

    const filteredBeverages = beveragesData.filter((beverage) =>
        beverage.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // console.log("Filtered Beverages:", filteredBeverages);

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
        const preferences = selectedPreferences[beverage.id] || [];
        const itemToAdd = {
            ...beverage,
            preferences: preferences.join(', '), // Combine preferences into a single string or array
        };
        addToCart(itemToAdd);

        // Clear selected preferences for the specific beverage
        setSelectedPreferences((prevPreferences) => ({
            ...prevPreferences,
            [beverage.id]: [],
        }));

        setAddedItems((prevAddedItems) => [...prevAddedItems, beverage.id]);
        setTimeout(() => {
            setAddedItems((prevAddedItems) =>
                prevAddedItems.filter((id) => id !== beverage.id)
            );
        }, 1000);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            
            <div className="elements-container" data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="300">
                <h1>Beverages</h1>
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                {loading ? (
                    <div className="bloading">
                        <Loading />
                        <Loading />
                        <Loading />
                        <Loading />
                    </div>
                    
                ) : (
                <div className="bCrad_contanier">
                    {filteredBeverages.map((beverage) => (
                        <div key={beverage.id} className="bcard">
                            <div className="image_container">
                                <img src={beverage.imgUrl} alt={beverage.name} />
                            </div>
                            <div className="title">
                                <span>{beverage.name}</span>
                            </div>
                            <p className="product_description">{beverage.description}</p>
                            <div className="size">
                                {beverage.preferences && beverage.preferences.length > 0 ? (
                                    <>
                                        <span>Preferences</span>
                                        <ul className="list-size">
                                            {beverage.preferences.map((preference, index) => (
                                                <li className="item-list" key={index}>
                                                    <button
                                                        className={`item-list-button ${(selectedPreferences[beverage.id] || []).includes(preference.name) ? 'selected' : ''}`}
                                                        onClick={() => handlePreferenceSelect(beverage.id, preference.name)}
                                                    >
                                                        {preference.name}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                ): "No preferences available"}
                            </div>
                            <div className="action">
                                <div className="price">
                                    <span>SAR {beverage.price}</span>
                                </div>
                                <button
                                    className={`btn ${addedItems.includes(beverage.id) ? 'added' : ''}`}
                                    onClick={() => handleAddToCart(beverage)}
                                    disabled={addedItems.includes(beverage.id)}
                                >
                                    <FontAwesomeIcon icon={faCartShopping} className="cart-icon" />
                                    <span className="text">{addedItems.includes(beverage.id) ? "Added" : "Add to Cart"}</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                )}
            </div>
        </div>
        
    );
}
