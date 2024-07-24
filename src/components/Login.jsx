import React, { useState,useContext,useEffect  } from 'react';
import axios from 'axios';
import ApiUrl from './MainUrl';
import {useNavigate} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

export function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {setIsLoggedIn , isLoggedIn} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    
    
    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post(`${ApiUrl}/auth/login`, {
            
            email,
            password,
            // withCredentials: true,
          });
    
          const token = response.data.token;
    
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
        <ToastContainer />
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
              placeholder="Enter your Email:"
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
          {/* <div className="form-group">
            <label htmlFor="office">Office Number:</label>
            <select
              id="office"
              name="office"
              value={office}
              onChange={(e) => setOffice(e.target.value)}
            >
              <option value="">Select Office</option>
              <option value="01">01 - CEO</option>
              <option value="02">02 - CFO</option>
              <option value="03">03 - COO</option>
              <option value="04">04 - CTO</option>
              <option value="05">05 - IT</option>
              <option value="06">06 - Finance</option>
              <option value="07">07 - Meeting Room</option>
              <option value="08">08 - Supply Chain</option>
              <option value="09">09 - Commercial</option>
              <option value="10">10 - HR</option>
              <option value="11">11 - Test</option>
              <option value="12">12 - Test</option>
            </select>
          </div> */}
          <div className="login-btn-container">
            <button type="submit" className="login-btn">Login</button>
            
          </div>
        </form>
      </div>
      </div>
    )
  }
  
}