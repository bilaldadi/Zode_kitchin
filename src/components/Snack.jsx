import { useEffect, useState, useContext } from "react";
import snacksData from '../jsonData/snacksData';
import { Search } from "./Search";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CartContext } from '../context/CartContext.js.jsx';

export function Snack() {
    const [searchTerm, setSearchTerm] = useState("");
    const { addToCart } = useContext(CartContext);

    const filteredSnacks = snacksData.snacks.filter((snack) =>
        snack.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        AOS.init();
    }, []);

    const handleAddToCart = (snack) => {
        addToCart({ ...snack });
    };

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    


    return (
        <div className="elements-container" data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="300">
            <h1>Snacks</h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <div className="bCrad_contanier">
                {filteredSnacks.map((snack) => (
                    <div key={snack.id} className="bcard">
                        <div className="image_container">
                            <img src={snack.img_url} alt="" />
                        </div>
                        <div className="title">
                            <span>{snack.name}</span>
                        </div>
                        <p className="product_description">{snack.description}</p>
                        <div className="action">
                            <div className="price">
                                <span>SAR {snack.price}</span>
                            </div>
                            <button
                                className="btn"
                                onClick={() => handleAddToCart(snack)}
                            >
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
