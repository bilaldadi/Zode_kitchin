import { useState } from 'react';
import axios from 'axios';
import ApiUrl from './MainUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

export function ForgotPassword() {
  const [Newpassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if(email === ''){
      toast.error("Please enter your email!");
      return;
    }

    try {
      const response = await axios.post(`${ApiUrl}/api/v1/users/password`, {
        Newpassword,
      });

      toast.success("Password reset link has been sent to your email!");
    } catch (error) {
      toast.error("Failed to send reset link! Please try again.");
      console.error('Forgot Password failed:', error);
    }
  };

  return (
    <div>
      
      <div className="welcome-div">
                <h1>Welcome to <span><img className='mainLogo'  src='/zode_logo.png' alt="zode_logo" ></img></span> Kitchen</h1>
      </div>

      <div className="account-page-container">
        <h2>Reset Your Password</h2>
        <form className="user-form" onSubmit={handleForgotPassword}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="login-btn-container">
            <button type="submit" className="login-btn reset-password-btn">Reset Password</button>
          </div>
          <div className='under-reset'>
            <Link to='/login' style={{textDecoration: 'none', color:'white'}}>
              <p>Remembered your password? Login</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
