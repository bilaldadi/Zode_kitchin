import React, { useState, useEffect } from 'react';
import {getAllItems} from "../jsonData/allData.js";
import { Search } from './Search.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext.js.jsx';
import { Loading } from './Loading.jsx';



export function AllItemsSearch() {
    const[allItems, setAllItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPreferences, setSelectedPreferences] = useState({});
    const [addedItems, setAddedItems] = useState([]);
    const { addToCart } = useContext(CartContext);
    const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getAllItems();
      setAllItems(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredItems = allItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
);



  useEffect(() => {
    AOS.init();
  }, []);


  const handlePreferenceSelect = (ItemId, preference) => {
    setSelectedPreferences((prevPreferences) => {
      const currentPreferences = prevPreferences[ItemId] || [];
      const isSelected = currentPreferences.includes(preference);
      return {
        ...prevPreferences,
        [ItemId]: isSelected
            ? currentPreferences.filter((item) => item !== preference)
            : [...currentPreferences, preference],
      };
    });
  };

  const handleAddToCart = (item) => {
    const preferences = selectedPreferences[item.id] || [];
    const itemToAdd = {
      ...item,
      preferences: preferences.join(', '), // Combine preferences into a single string or array
    };
    addToCart(itemToAdd);

    // Clear selected preferences for the specific beverage
    setSelectedPreferences((prevPreferences) => ({
      ...prevPreferences,
      [item.id]: [],
    }));

    setAddedItems((prevAddedItems) => [...prevAddedItems, item.id]);
    setTimeout(() => {
      setAddedItems((prevAddedItems) =>
          prevAddedItems.filter((id) => id !== item.id)
      );
    }, 1000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="elements-container" data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="300">
      <h1>Search</h1>
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
        {filteredItems.map((item) => (
            <div key={item.key} className="bcard">
              <div className="image_container">
                <img src={item.imgUrl} alt=""/>
              </div>
              <div className="title">
                <span>{item.name}</span>
              </div>
              <p className="product_description">{item.description}</p>
              {/*<div className="size">*/}
              {/*  {item.preferences && (*/}
              {/*    <>*/}
              {/*      <span>Preferences</span>*/}
              {/*      <ul className="list-size">*/}
              {/*        {item.preferences.map((preference, index) => (*/}
              {/*          <li className="item-list" key={index}>*/}
              {/*            <button*/}
              {/*              className={`item-list-button ${(selectedPreferences[item.id] || []).includes(preference) ? 'selected' : ''}`}*/}
              {/*              onClick={() => handlePreferenceSelect(item.id, preference)}*/}
              {/*            >*/}
              {/*              {preference}*/}
              {/*            </button>*/}
              {/*          </li>*/}
              {/*        ))}*/}
              {/*      </ul>*/}
              {/*    </>*/}
              {/*  )}*/}
              {/*</div>*/}
              <div className="size">
                {item.preferences && item.preferences.length > 0 && (
                    <>
                      <span>Preferences</span>
                      <ul className="list-size">
                        {item.preferences.map((preference, index) => (
                            <li className="item-list" key={index}>
                              <button
                                  className={`item-list-button ${(selectedPreferences[item.id] || []).includes(preference.name) ? 'selected' : ''}`}
                                  onClick={() => handlePreferenceSelect(item.id, preference.name)}
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
                  <span>SAR {item.price}</span>
                </div>
                <button
                    className={`btn ${addedItems.includes(item.id) ? 'added' : ''}`}
                    onClick={() => handleAddToCart(item)}
                    disabled={addedItems.includes(item.id)}
                >
                  <FontAwesomeIcon icon={faCartShopping} className="cart-icon"/>
                  <span className="text">{addedItems.includes(item.id) ? 'Added' : 'Add to Cart'}</span>
                </button>
              </div>
            </div>
        ))}
      </div>
      )}
    </div>
  );
}
