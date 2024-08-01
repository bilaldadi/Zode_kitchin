import { useState, useEffect, useContext } from "react";
import {getDessertsData} from "../jsonData/dessertsData.js";
import { Search } from "./Search.jsx";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CartContext } from '../context/CartContext.js.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Loading } from "./Loading.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function Desserts() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPreferences, setSelectedPreferences] = useState({});
    const [addedItems, setAddedItems] = useState([]);
    const { addToCart } = useContext(CartContext);
    const [dessertsData, setdessertsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AOS.init();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const data = await getDessertsData();
            setdessertsData(data);
            setLoading(false);
            if(data.length === 0) {
                toast.error("Some error occurred, please try again later");
            }
            // console.log("Fetched beverages data:", data);
        };
        fetchData();
    }, []);

    const filteredDesserts = dessertsData.filter((dessert) =>
        dessert.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // console.log("Filtered Beverages:", filteredBeverages);

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
        const preferences = selectedPreferences[dessert.id] || [];
        const itemToAdd = {
            ...dessert,
            preferences: preferences.join(', '), // Combine preferences into a single string or array
        };
        addToCart(itemToAdd);

        // Clear selected preferences for the specific beverage
        setSelectedPreferences((prevPreferences) => ({
            ...prevPreferences,
            [dessert.id]: [],
        }));

        setAddedItems((prevAddedItems) => [...prevAddedItems, dessert.id]);
        setTimeout(() => {
            setAddedItems((prevAddedItems) =>
                prevAddedItems.filter((id) => id !== dessert.id)
            );
        }, 1000);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            
            <div className="elements-container" data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="300">
                
                <h1>Desserts</h1>
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
                    {filteredDesserts.map((desserts) => (
                        <div key={desserts.id} className="bcard">
                            <div className="image_container">
                                <img src={desserts.imgUrl} alt={desserts.name} />
                            </div>
                            <div className="title">
                                <span>{desserts.name}</span>
                            </div>
                            <p className="product_description">{desserts.description}</p>
                            <div className="size">
                                
                                {desserts.preferences && desserts.preferences.length > 0 ? (
                                    <>
                                        <span>Preferences</span>
                                        <ul className="list-size">
                                            {desserts.preferences.map((preference, index) => (
                                                <li className="item-list" key={index}>
                                                    <button
                                                        className={`item-list-button ${(selectedPreferences[desserts.id] || []).includes(preference.name) ? 'selected' : ''}`}
                                                        onClick={() => handlePreferenceSelect(desserts.id, preference.name)}
                                                    >
                                                        {preference.name}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                ):"No preferences available"}
                            </div>
                            <div className="action">
                                <div className="price">
                                    <span>SAR {desserts.price}</span>
                                </div>
                                <button
                                    className={`btn ${addedItems.includes(desserts.id) ? 'added' : ''}`}
                                    onClick={() => handleAddToCart(desserts)}
                                    disabled={addedItems.includes(desserts.id)}
                                >
                                    <FontAwesomeIcon icon={faCartShopping} className="cart-icon" />
                                    <span className="text">{addedItems.includes(desserts.id) ? "Added" : "Add to Cart"}</span>
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

