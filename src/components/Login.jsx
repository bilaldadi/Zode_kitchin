import { useState,useContext,useEffect  } from 'react';
import axios from 'axios';
import ApiUrl from './MainUrl';
import {useNavigate} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

export function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {setIsLoggedIn , isLoggedIn} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    
    
    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post(`${ApiUrl}/auth/login`, {
            email,
            password,
          });
          
          const token = response.data.data.token;
    
          // Save the token to localStorage
          localStorage.setItem('authToken', token);
    
          // Optionally set the token in axios headers for future requests
          // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          setIsLoggedIn(true);
          navigate('/');


        } catch (error) {
          toast.error("check your email and password");
          console.error('Login failed:', error);
        }
      };

      useEffect(() => {
        if (isLoggedIn) {
          navigate('/');
        }
      }, [isLoggedIn, navigate]);
    
      useEffect(() => {
        setIsLoading(false); // Set loading to false after checking token
      }, []);

      if (isLoading) {
        return <div>Loading...</div>; // Show loading indicator while checking token
      }
    
      if(!isLoggedIn){
    

    return(
      <div>
        
        <div className="welcome-div">
                <h1>Welcome to <span><img className='mainLogo'  src='/zode_logo.png' alt="zode_logo" ></img></span> Kitchen</h1>
          </div>
      
        <div className="account-page-container">
          
        <h2>Login</h2>
        <p className='login-msg' >Please enter your email and password to login</p>
        <form className="user-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="name@zode.sa"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
        <label htmlFor="password">Password:</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />} {/* Toggle button text */}
          </span>
        </div>
      </div>
          <div className="login-btn-container">
            <button type="submit" className="login-btn">Login</button>
          </div>
          <div className='under-login' >
            <Link to='/signup' style={{textDecoration: 'none' , color:'whitesmoke'}}>
              <p>Don't have account?</p>
            </Link>
            <Link to='/resetpassword' style={{textDecoration: 'none', color:'whitesmoke'}}>
              <p>Forgot Password?</p>
            </Link>
          </div>
        </form>
      </div>
      </div>
    )
  }
  
}