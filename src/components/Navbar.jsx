import { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping,faUser } from '@fortawesome/free-solid-svg-icons'


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        AOS.init();
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (!isMenuOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    };

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
                        <div className="menu-item">About</div>
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
                        <div className="menu-item"><FontAwesomeIcon icon={faCartShopping}/></div>
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
                                 alt="Logo" style={{height: '40px'}}/>
                        </Link>
                    </div>

                    <div className="hamburger" onClick={toggleMenu}>
                        &#9776; {/* This is the hamburger icon */}
                    </div>

                    <div className={`menu ${isMenuOpen ? 'show' : ''}`}>
                            <div className="close-menu" onClick={toggleMenu}>
                                &times; {/* This is the close icon */}
                            </div>
                            <div className="menu-item">
                                <Link to='/' style={{textDecoration: 'none'}}>
                                    <span className="menu-item" onClick={toggleMenu}>Home</span>
                                </Link>
                            </div>
                            <a href="https://www.sellwithzode.sa/" className="menu-item" target="_blank" rel="noopener noreferrer" onClick={toggleMenu}>About</a>
                            <div className="menu-item">
                                <Link to='/beverages' style={{textDecoration: 'none'}}>
                                    <span className="menu-item" onClick={toggleMenu}>Beverages</span>
                                </Link>
                            </div>
                            <div className="menu-item">
                                <Link to='/snacks' style={{textDecoration: 'none'}}>
                                    <span className="menu-item" onClick={toggleMenu}>Snacks</span>
                                </Link>
                            </div>
                            <div className="menu-item">
                                <Link to='/cart' style={{textDecoration: 'none'}}>
                                    <span className="menu-item" onClick={toggleMenu}> <FontAwesomeIcon icon={faCartShopping}/> </span>
                                </Link>
                            </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Navbar;
