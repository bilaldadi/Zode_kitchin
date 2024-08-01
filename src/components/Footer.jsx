import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram,faFacebookF,faXTwitter,faLinkedinIn,faTiktok } from '@fortawesome/free-brands-svg-icons'

export default function Footer() {



    return(
        <div className="footer">
            <div className="footer-rights">
                <p> © 2024 Zode. All Rights Reserved. </p>
            </div>
            <div className="social-container">
                <a target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}} href="https://www.instagram.com/zode_sa/?igshid=MzMyNGUyNmU2YQ%3D%3D&utm_source=qr">
                    <FontAwesomeIcon className="icon" icon={faInstagram}/>
                </a>
                <a target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}} href="https://www.facebook.com/zode.ksa">
                    <FontAwesomeIcon className="icon" icon={faFacebookF}/>
                </a>
                <a target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}} href="https://x.com/ZODE_SA">
                    <FontAwesomeIcon className="icon" icon={faXTwitter}/>
                </a>
                <a target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}} href="https://www.linkedin.com/company/zode-sa/">
                    <FontAwesomeIcon className="icon" icon={faLinkedinIn}/>
                </a>
                <a target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}} href="https://www.tiktok.com/@zode_sa">
                    <FontAwesomeIcon className="icon" icon={faTiktok}/>
                </a>
            </div>
        </div>
)
}