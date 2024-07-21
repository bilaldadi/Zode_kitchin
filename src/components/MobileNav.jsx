import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMagnifyingGlass, faCartShopping, faBowlFood, faMugHot } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { CartContext } from '../context/CartContext.js.jsx';

export function MobileNav() {
    const { totalItems } = useContext(CartContext);

    return (
        <div className="Mobile-nav-container">
            <div className="mobile-nav">
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <div className="mobile-nav-item"><FontAwesomeIcon icon={faHouse} /></div>
                </Link>

                <Link to='/' style={{ textDecoration: 'none' }}>
                    <div className="mobile-nav-item"><FontAwesomeIcon icon={faMagnifyingGlass} /></div>
                </Link>

                <Link to='/cart' style={{ textDecoration: 'none' }}>
                    <div className="cart-nav">
                        <div className="cart-bg">
                            <div className="m-cart">
                                <FontAwesomeIcon icon={faCartShopping} />
                                {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
                            </div>
                        </div>
                    </div>
                </Link>

                <Link to='/snacks' style={{ textDecoration: 'none' }}>
                    <div className="mobile-nav-item"><FontAwesomeIcon icon={faBowlFood} /></div>
                </Link>

                <Link to='/beverages' style={{ textDecoration: 'none' }}>
                    <div className="mobile-nav-item"><FontAwesomeIcon icon={faMugHot} /></div>
                </Link>
            </div>
        </div>
    );
}
