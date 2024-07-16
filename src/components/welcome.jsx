import {useEffect} from "react";
import {Card1 , Card2} from './card1'
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

export function Welcome(){

    useEffect(() => {
        AOS.init();
    }, [])

    return (
        <div className="main-welcome-container">
            <div className="welcome-div" data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="800">
                <h1>Welcome to <span><img className='mainLogo'  src='/zode_logo.png' alt="zode_logo" ></img></span> Kitchen</h1>
            </div>
            <div data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600" data-aos-delay={500}>
                <h3 style={{fontWeight:'400'}} > You can order what you like directly from Zode Marketplace</h3>
            </div>
            <div className='cardsContainer' data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="800" >
                <div >
                    <Link to='/beverages' style={{textDecoration: 'none'}}> <Card1/> </Link>
                </div>
                <div >
                    <Link to='/snacks' style={{textDecoration: 'none'}}> <Card2/> </Link>
                </div>
                <div >
                    <Link to='/beverages' style={{textDecoration: 'none'}}> <Card1/> </Link>
                </div>
                <div >
                    <Link to='/snacks' style={{textDecoration: 'none'}}> <Card2/> </Link>
                </div>
            </div>
        </div>
    )
}