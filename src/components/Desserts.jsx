import { useState, useEffect, useContext } from "react";
import { getDessertsData } from "../jsonData/dessertsData.js";
import { Search } from "./Search.jsx";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CartContext } from '../context/CartContext.js.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Loading } from "./Loading.jsx";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Desserts() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPreferences, setSelectedPreferences] = useState({});
    const [addedItems, setAddedItems] = useState([]);
    const { addToCart } = useContext(CartContext);
    const [dessertsData, setDessertsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AOS.init();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const data = await getDessertsData();
            setDessertsData(data);
            setLoading(false);
            if (data.length === 0) {
                toast.error("Some error occurred, please try again later");
            }
        };
        fetchData();
    }, []);

    const filteredDesserts = dessertsData.filter((dessert) =>
        dessert.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handlePreferenceSelect = (dessertId, preference) => {
        setSelectedPreferences((prevPreferences) => {
            const currentPreferences = prevPreferences[dessertId] || [];
            const isSelected = currentPreferences.some(p => p.id === preference.id);
            return {
                ...prevPreferences,
                [dessertId]: isSelected
                    ? currentPreferences.filter((item) => item.id !== preference.id)
                    : [...currentPreferences, preference],
            };
        });
    };

    const handleAddToCart = (dessert) => {
        const preferences = selectedPreferences[dessert.id] || [];
        const itemToAdd = {
            ...dessert,
            preferences: preferences.map(p => ({ id: p.id, name: p.name })), // Include both preference id and name
        };
        addToCart(itemToAdd);

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
                        {filteredDesserts.map((dessert) => (
                            !dessert.available ? null :
                            <div key={dessert.id} className="bcard">
                                <div className="image_container">
                                    <img src={dessert.imgUrl} alt={dessert.name} />
                                </div>
                                <div className="title">
                                    <span>{dessert.name}</span>
                                </div>
                                <p className="product_description">{dessert.description}</p>
                                <div className="size">
                                    {dessert.preferences && dessert.preferences.length > 0 ? (
                                        <>
                                            <span>Preferences</span>
                                            <ul className="list-size">
                                                {dessert.preferences.map((preference) => (
                                                    <li className="item-list" key={preference.id}>
                                                        <button
                                                            className={`item-list-button ${(selectedPreferences[dessert.id] || []).some(p => p.id === preference.id) ? 'selected' : ''}`}
                                                            onClick={() => handlePreferenceSelect(dessert.id, preference)}
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
                )}
            </div>
        </div>
    );
}
