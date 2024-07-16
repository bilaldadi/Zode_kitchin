import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMugSaucer,faCookieBite } from '@fortawesome/free-solid-svg-icons'


export function Card1() {
    return (
        <div className="card">
            <span></span>
            <div className="content">
                <div className="text">Beverages</div>
                <img src={"https://therecipecritic.com/wp-content/uploads/2023/05/lava_flow.jpg"} alt="Beverages" />
            </div>
        </div>
    );
}

export function Card2() {
    return (
        <div className="card2">
            <span></span>
            <div className="content">
                <div className="text">Snacks</div>
                <img src={"https://www.yummytoddlerfood.com/wp-content/uploads/2022/05/round-easy-healthy-snack-plate-with-foods.jpg"} alt="Beverages" />
            </div>
        </div>
    );
}

