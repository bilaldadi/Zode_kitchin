import { useEffect, useState, useRef, useContext  } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping,faUser } from '@fortawesome/free-solid-svg-icons'
import { CartContext } from '../context/CartContext.js.jsx';


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const { totalItems } = useContext(CartContext);

    useEffect(() => {
        AOS.init();
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <div>
            <div className="Nav-container">
                <div className="navbar" data-aos="fade-down" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="800">
                    <div className="menu">

                    <Link to='/' style={{textDecoration: 'none'}}>
                        <div className="menu-item"> <img src="https://static.wixstatic.com/shapes/cad8ae_c0e3627a6c7145c9a85dcb4b3c00484b.svg" alt="Logo" style={{height: '40px'}}/></div>
                    </Link>

                    <Link to='/' style={{textDecoration: 'none'}}>
                        <div className="menu-item">Home</div>
                    </Link>

                    <Link to='/' style={{textDecoration: 'none'}}>    
                        <div className="menu-item">Search</div>
                    </Link>

                    <Link to='/beverages' style={{textDecoration: 'none'}}>
                        <div className="menu-item"> Beverages</div>
                    </Link>
                        
                    <Link to='/snacks' style={{textDecoration: 'none'}}>
                        <div className="menu-item">Snacks</div>
                    </Link>

                    <Link to='/beverages' style={{textDecoration: 'none'}}>
                        <div className="menu-item"> Beverages</div>
                    </Link>
                        
                    <Link to='/snacks' style={{textDecoration: 'none'}}>
                        <div className="menu-item">Snacks</div>
                    </Link>

                    <Link to='/account' style={{textDecoration: 'none'}}>
                        <div className="menu-item"><FontAwesomeIcon icon={faUser} /></div>
                    </Link>

                    <Link to='/cart' style={{textDecoration: 'none'}}>
                        <div className="menu-item">
                            <FontAwesomeIcon icon={faCartShopping}/>
                            {totalItems > 0 && <span className="d-cart-count">{totalItems}</span>}
                        </div>
                    </Link>

                    </div>
                </div>
            </div>


            {/* Mobile Navbar */}
            <div className="Mobile-Nav-container">
            <div className="navbar-mobile">

                <div className="logo">
                    <Link to='/'>
                        <img src="https://static.wixstatic.com/shapes/cad8ae_c0e3627a6c7145c9a85dcb4b3c00484b.svg"
                             alt="Logo" style={{ height: '40px' }} />
                    </Link>
                </div>

                <div className="hamburger" onClick={toggleMenu}>
                    &#9776;
                </div>

                <div ref={menuRef} className={`menu ${isMenuOpen ? 'show' : ''}`}>
                    <div className="close-menu" onClick={toggleMenu}>
                        &times;
                    </div>
                    <div className="menu-item">
                        <Link to='/' style={{ textDecoration: 'none' }}>
                            <span className="menu-item" onClick={toggleMenu}>Home</span>
                        </Link>
                    </div>
                    <a href="https://www.sellwithzode.sa/" className="menu-item" target="_blank" rel="noopener noreferrer" onClick={toggleMenu}>About</a>
                    <div className="menu-item">
                        <Link to='/beverages' style={{ textDecoration: 'none' }}>
                            <span className="menu-item" onClick={toggleMenu}>Beverages</span>
                        </Link>
                    </div>
                    <div className="menu-item">
                        <Link to='/snacks' style={{ textDecoration: 'none' }}>
                            <span className="menu-item" onClick={toggleMenu}>Snacks</span>
                        </Link>
                    </div>
                    <div className="menu-item">
                        <Link to='/cart' style={{ textDecoration: 'none' }}>
                            <span className="menu-item" onClick={toggleMenu}> <FontAwesomeIcon icon={faCartShopping} /> </span>
                        </Link>
                    </div>
                    <div className="menu-item">
                        <Link to='/account' style={{ textDecoration: 'none' }}>
                            <span className="menu-item" onClick={toggleMenu}> 
                                <FontAwesomeIcon icon={faUser} />
                            </span>
                        </Link>
                    </div>
                </div>

            </div>
        </div>

        </div>
    );
};

export default Navbar;
