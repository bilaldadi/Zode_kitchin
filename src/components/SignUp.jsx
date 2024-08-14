import { useState } from 'react';
import axios from 'axios';
import ApiUrl from './MainUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";

export function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(`${ApiUrl}/auth/signup`, {
        email,
        password,
      });

      toast.success("Sign up successful! Please login.");
      navigate('/login');
    } catch (error) {
      toast.error("Sign up failed! Please try again.");
      console.error('Sign up failed:', error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="welcome-div">
        <h1>Sign Up</h1>
      </div>

      <div className="account-page-container">
        <h2>Create an Account</h2>
        <form className="user-form" onSubmit={handleSignUp}>
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
            <label htmlFor="email">Your Office:</label>
            <select  value='1'>
                {[{id :1 , name:'test'},{id :2 , name:'test2'},{id :3 , name:'test3'},{id :4 , name:'test4'},{id :5 , name:'test5'}].map(room => (
                    <option key={room.id} value={room.id}>{room.name}</option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
              </span>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
              </span>
            </div>
          </div>
          <div className="login-btn-container">
            <button type="submit" className="login-btn">Sign Up</button>
          </div>
          <div className='under-signup'>
            <Link to='/login' style={{textDecoration: 'none', color:'white'}}>
              <a>Already have an account? Login</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
