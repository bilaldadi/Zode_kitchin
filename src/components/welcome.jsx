import {Card1 , Card2} from './card1'
import { Link } from 'react-router-dom';

export function Welcome(){
    return (
        <div>
            <h1>Welcome to <span><img className='mainLogo'  src='/zode_logo.png' ></img></span>Kitchin</h1>
            <h3> You can order what you like directly from here</h3>
            <div className='cardsContainer'>
                <Link to='/beverages'> <Card1 /> </Link>
                <Link to='/food'> <Card2 /> </Link>
            </div>
      </div>
    )
}