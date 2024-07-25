// import { useEffect, useState, useContext } from "react";
// import snacksData from '../jsonData/snacksData';
// import { Search } from "./Search";
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import { CartContext } from '../context/CartContext.js.jsx';

// export function Snack() {
//     const [searchTerm, setSearchTerm] = useState("");
//     const { addToCart } = useContext(CartContext);

//     const filteredSnacks = snacksData.snacks.filter((snack) =>
//         snack.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     useEffect(() => {
//         AOS.init();
//     }, []);

//     const handleAddToCart = (snack) => {
//         addToCart({ ...snack });
//     };

//     useEffect(() => {
//         window.scrollTo(0, 0)
//       }, [])
    


//     return (
//         <div className="elements-container" data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="300">
//             <h1>Snacks</h1>
//             <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

//             <div className="bCrad_contanier">
//                 {filteredSnacks.map((snack) => (
//                     <div key={snack.id} className="bcard">
//                         <div className="image_container">
//                             <img src={snack.img_url} alt="" />
//                         </div>
//                         <div className="title">
//                             <span>{snack.name}</span>
//                         </div>
//                         <p className="product_description">{snack.description}</p>
//                         <div className="action">
//                             <div className="price">
//                                 <span>SAR {snack.price}</span>
//                             </div>
//                             <button
//                                 className="btn"
//                                 onClick={() => handleAddToCart(snack)}
//                             >
//                                 <svg
//                                     className="cart-icon"
//                                     stroke="currentColor"
//                                     strokeWidth="1.5"
//                                     viewBox="0 0 24 24"
//                                     fill="none"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                     <path
//                                         d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
//                                         strokeLinejoin="round"
//                                         strokeLinecap="round"
//                                     ></path>
//                                 </svg>
//                                 Add to order
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }


import { useState, useEffect, useContext } from "react";
import snacksData from '../jsonData/snacksData';
import { Search } from "./Search.jsx";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CartContext } from '../context/CartContext.js.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { RightPointer,LeftPointer } from "./Pointer.jsx";

export function Snack() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPreferences, setSelectedPreferences] = useState({});
    const [addedItems, setAddedItems] = useState([]);
    const { addToCart } = useContext(CartContext);

    const filteredSnacks = snacksData.snacks.filter((snack) =>
        snack.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        AOS.init();
    }, []);

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
        const preferences = selectedPreferences[snack.id];
        if (preferences && preferences.length > 0) {
          preferences.forEach(preference => {
            addToCart({ ...snack, preference });
          });
        } else {
          addToCart({ ...snack });
        }
    
        setAddedItems((prevAddedItems) => [...prevAddedItems, snack.id]);
        setTimeout(() => {
          setAddedItems((prevAddedItems) =>
            prevAddedItems.filter((id) => id !== snack.id)
          );
        }, 1000);
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
                        <div className="size">
                            {snack.preferences && (
                                <>
                                    <span>Preferences</span>
                                    <ul className="list-size">
                                        {snack.preferences.map((preference, index) => (
                                            <li className="item-list" key={index}>
                                                <button
                                                    className={`item-list-button ${(selectedPreferences[snack.id] || []).includes(preference) ? 'selected' : ''}`}
                                                    onClick={() => handlePreferenceSelect(snack.id, preference)}
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
                                <span>SAR {snack.price}</span>
                            </div>
                            <button
                className={`btn ${addedItems.includes(snack.id) ? 'added' : ''}`}
                onClick={() => handleAddToCart(snack)}
                disabled={addedItems.includes(snack.id)}
              >
                <FontAwesomeIcon icon={faCartShopping} className="cart-icon" />
                <span className="text">{addedItems.includes(snack.id) ? "Added" : "Add to order"}</span>
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
