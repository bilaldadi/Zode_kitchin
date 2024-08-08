import { useState, useEffect, useContext } from "react";
import { getFruitsData } from "../jsonData/fruitsData.js";
import { Search } from "./Search.jsx";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CartContext } from '../context/CartContext.js.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Loading } from "./Loading.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Fruits() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPreferences, setSelectedPreferences] = useState({});
    const [addedItems, setAddedItems] = useState([]);
    const { addToCart } = useContext(CartContext);
    const [fruitsData, setFruitsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AOS.init();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const data = await getFruitsData();
            setFruitsData(data);
            setLoading(false);
            if (data.length === 0) {
                toast.error("Some error occurred, please try again later");
            }
        };
        fetchData();
    }, []);

    const filteredFruits = fruitsData.filter((fruit) =>
        fruit.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

   
    const handlePreferenceSelect = (fruitId, preference) => {
        setSelectedPreferences((prevPreferences) => {
            const currentPreferences = prevPreferences[fruitId] || [];
            const isSelected = currentPreferences.some(p => p.id === preference.id);
            return {
                ...prevPreferences,
                [fruitId]: isSelected
                    ? currentPreferences.filter((item) => item.id !== preference.id)
                    : [...currentPreferences, preference],
            };
        });
    };


    const handleAddToCart = (fruit) => {
        const preferences = selectedPreferences[fruit.id] || [];
        const itemToAdd = {
            ...fruit,
            preferences: preferences.map(p => ({ id: p.id, name: p.name })), // Include both preference id and name
        };
        addToCart(itemToAdd);

        setSelectedPreferences((prevPreferences) => ({
            ...prevPreferences,
            [fruit.id]: [],
        }));

        setAddedItems((prevAddedItems) => [...prevAddedItems, fruit.id]);
        setTimeout(() => {
            setAddedItems((prevAddedItems) =>
                prevAddedItems.filter((id) => id !== fruit.id)
            );
        }, 1000);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <div className="elements-container" data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="300">
                <h1>Fruits</h1>
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
                        {filteredFruits.map((fruit) => (
                            <div key={fruit.id} className="bcard">
                                <div className="image_container">
                                    <img src={fruit.imgUrl} alt={fruit.name} />
                                </div>
                                <div className="title">
                                    <span>{fruit.name}</span>
                                </div>
                                <p className="product_description">{fruit.description}</p>
                                <div className="size">
                                    {fruit.preferences && fruit.preferences.length > 0 ? (
                                        <>
                                            <span>Preferences</span>
                                            <ul className="list-size">
                                                {fruit.preferences.map((preference) => (
                                                    <li className="item-list" key={preference.id}>
                                                        <button
                                                            className={`item-list-button ${(selectedPreferences[fruit.id] || []).some(p => p.id === preference.id) ? 'selected' : ''}`}
                                                            onClick={() => handlePreferenceSelect(fruit.id, preference)}
                                                        >
                                                            {preference.name}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    ) : "No preferences available"}
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
                )}
            </div>
        </div>
    );
}
