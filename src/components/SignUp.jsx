import { useState, useContext } from 'react';
import axios from 'axios';
import ApiUrl from './MainUrl';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

export function SignUp() {
  const { userData } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [roomId, setRoomId] = useState(0);
  const [mobile, setmobile] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const navigate = useNavigate();

  const roomsfinal = [
    { "id": 2, "name": "Office 2 - CEO" },
    { "id": 3, "name": "Office 3" },
    { "id": 4, "name": "Office 4" },
    { "id": 5, "name": "Office 5 - HR Manager" },
    { "id": 6, "name": "Office 6 - HR" },
    { "id": 7, "name": "Office 7 - COO" },
    { "id": 8, "name": "Office 8" },
    { "id": 9, "name": "Office 9 - IT" },
    { "id": 10, "name": "Office 10 - CTO" },
    { "id": 11, "name": "Office 11 - Commercial" },
    { "id": 12, "name": "Office 12" },
    { "id": 13, "name": "Office 13" },
    { "id": 14, "name": "Gaming Room" },
    { "id": 15, "name": "Glass Meeting Room - Front Door" },
    { "id": 16, "name": "Conference Room" },
    { "id": 17, "name": "Training Room" },
    { "id": 18, "name": "Reception" },
  ];

  const handleRoomChange = (e) => {
    setRoomId(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Email domain validation
  const validDomains = ['zode.sa', 'albarqarab.com'];
  const emailDomain = email.split('@')[1];
  
  if (!validDomains.includes(emailDomain)) {
    toast.error("Email must be from the domain 'zode.sa' or 'albarqarab.com'");
    return;
  }

    // Input Validation
    if (name === '' || email === '' || password === '' || confirmPassword === '' || mobile === '' || gender === '') {
      toast.error("Please fill in all fields, including phone number and gender!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(`${ApiUrl}/auth/register`, {
        name,
        email,
        password,
        mobile,  // Ensure this is populated
        roomId,
        gender,       // Ensure this is populated with "Male" or "Female"
        roles: ["USER"],
        forceResetPassword: true, // Automatically set forceResetPassword to true
      }, {
        headers: {
          "Content-type": "application/json",
          "Accept": "*/*",
          "ngrok-skip-browser-warning": "69420",
        },
      });

      toast.success("Sign up successful! Please login.");
      navigate('/login');
    } catch (error) {
      toast.error("Sign up failed! Please check your inputs.");
      console.error('Sign up failed:', error);
    }
  };

  return (
    <div>
      <div className="welcome-div">
        <h1>Welcome to <span><img className='mainLogo' src='/zode_logo.png' alt="zode_logo" /></span> Kitchen</h1>
      </div>

      <div className="account-page-container">
        <h2>Create an Account</h2>
        <form className="user-form" onSubmit={handleSignUp}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            <label htmlFor="phoneNumber">Phone Number: <span style={{fontSize:'15px' , color:'gray'}}>&nbsp; ex(05xxxxxxxx)</span></label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              placeholder="Enter your phone number"
              value={mobile}
              onChange={(e) => setmobile(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <select onChange={handleGenderChange} value={gender}>
              <option value=''>Select Gender</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="room">Your Office:</label>
            <select onChange={handleRoomChange} value={roomId}>
              <option value=''>Select Office</option>
              {roomsfinal.map(room => (
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
                type={showPassword2 ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword2(!showPassword2)}
              >
                {showPassword2 ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
              </span>
            </div>
          </div>
          <div className="login-btn-container">
            <button type="submit" className="login-btn">Sign Up</button>
          </div>
          <div className='under-signup'>
            <Link to='/login' style={{ textDecoration: 'none', color:'white' }}>
              <p>Already have an account? Login</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}