// import { useState,useContext,useEffect } from 'react';
// import axios from 'axios';
// import ApiUrl from './MainUrl';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import { Link, useNavigate } from "react-router-dom";
// import { getRoomsData } from "../jsonData/roomsdata.js";
// import { AuthContext } from "../context/AuthContext.jsx";
// import { LoadingSpinner } from "./LoadingSpinner.jsx";

// export function SignUp() {
//   const { userData } = useContext(AuthContext);
//   const [loading, setLoading] = useState(true);
//   const [userRoles, setUserRoles] = useState({});
//   const [hasAccess, setHasAccess] = useState(false);
//   const [name, setName] = useState('');
//   const [roomId, setRoomId] = useState(0);
//   const [phoneNumber, setPhoneNumber] = useState(0);
//   const [gender, setGender] = useState('');
//   const [newUserRole, setNewUserRole] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [rooms, setRooms] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (userData && userData.authorities) {
//         const roles = userData.authorities.reduce((acc, authority) => {
//             acc[authority.id] = authority.authority;
//             return acc;
//         }, {});
//         setUserRoles(roles);
//         if (Object.keys(userRoles).length === 0) {
//             setLoading(false);
//         }
//         if (Object.values(userRoles).includes('ADMIN') || Object.values(userRoles).includes('HR')) {
//           setHasAccess(true);
//         }
//     }
// }, [userData]);

// console.log(userRoles);

//   useEffect(() => {
    
//     const fetchRooms = async () => {
//         setLoading(true);
//         if(hasAccess){
//           var roomsData = await getRoomsData();
//         }
//         setRooms(roomsData);
//         setLoading(false);
    
//     };

//     fetchRooms();
//   }, []);

// // console.log(rooms);
// const handleRoomChange = (e) => {
//   setSelectedRoom(e.target.value);
// };

// const handleGenderChange = (e) => {
//   setGender(e.target.value);
// };
 

//   const handleSignUp = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match!");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("authToken");
//       const response = await axios.post(`${ApiUrl}/api/v1/users`, {
//         name,
//         email,
//         password,
//         phoneNumber,
//         roomId,
//         newUserRole,
//         headers: {
//           "Content-type": "application/json",
//           "Authorization": `Bearer ${token}`,
//           "Accept": "*/*",
//           "ngrok-skip-browser-warning": "69420",
//       },
//       });

//       toast.success("Sign up successful! Please login.");
//       navigate('/login');
//     } catch (error) {
//       toast.error("Sign up failed! Please try again.");
//       console.error('Sign up failed:', error);
//     }
//   };

//   if(hasAccess){

//   return (
//     <div>
//       <div className="welcome-div">
//         <h1>Sign Up</h1>
//       </div>

//       <div className="account-page-container">
//         <h2>Create an Account</h2>
//         <form className="user-form" onSubmit={handleSignUp}>
//         <div className="form-group">
//             <label htmlFor="name">Name:</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               placeholder="Your Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="email">Email:</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="name@zode.sa"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="gender">Gender:</label>
//             <select onChange={handleGenderChange} value={gender}>
//               <option value='Male'>Male</option>
//               <option value='Female'>Female</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label htmlFor="room">Your Office:</label>
//             <select onChange={handleRoomChange} value={roomId}>
//                 {rooms.map(room => (
//                     <option key={room.id} value={room.id}>{room.name}</option>
//                 ))}
//             </select>
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password:</label>
//             <div className="password-wrapper">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 name="password"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <span
//                 className="toggle-password"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
//               </span>
//             </div>
//           </div>
//           <div className="form-group">
//             <label htmlFor="confirmPassword">Confirm Password:</label>
//             <div className="password-wrapper">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 placeholder="Confirm your password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//               />
//               <span
//                 className="toggle-password"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
//               </span>
//             </div>
//           </div>
//           <div className="login-btn-container">
//             <button type="submit" className="login-btn">Sign Up</button>
//           </div>
//           <div className='under-signup'>
//             <Link to='/login' style={{textDecoration: 'none', color:'white'}}>
//               <a>Already have an account? Login</a>
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }else{
//   return (

//     <div>
//         {loading || !Object.keys(userRoles).length ? (
//             <LoadingSpinner />
//         ) : (
//             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                 <img
//                     style={{ width: '12rem', marginBottom: '2rem' }}
//                     src="/zode_logo.png"
//                     alt="Zode logo"
//                 />
//                 <h2>
//                     Access Denied. <a href="/">Go to home page</a>
//                 </h2>
//             </div>
//         )}
//     </div>


// );
// }
// }

import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import ApiUrl from './MainUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import { getRoomsData } from "../jsonData/roomsdata.js";
import { AuthContext } from "../context/AuthContext.jsx";
import { LoadingSpinner } from "./LoadingSpinner.jsx";

export function SignUp() {
  const { userData } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [userRoles, setUserRoles] = useState({});
  const [hasAccess, setHasAccess] = useState(false);
  const [name, setName] = useState('');
  const [roomId, setRoomId] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [gender, setGender] = useState('');
  const [newUserRole, setNewUserRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (userData && userData.authorities) {
  //       const roles = userData.authorities.reduce((acc, authority) => {
  //           acc[authority.id] = authority.authority;
  //           return acc;
  //       }, {});
  //       setUserRoles(roles);
  //       if (Object.values(roles).includes('ADMIN') || Object.values(roles).includes('HR')) {
  //         setHasAccess(true);
  //       }
  //       setLoading(false);
  //   }
  // }, [userData]);

  useEffect(() => {
    const fetchRooms = async () => {
        setLoading(true);
        const roomsData = await getRoomsData();
        setRooms(roomsData);
        setLoading(false);
    };
    fetchRooms();
  }, []);

  const handleRoomChange = (e) => {
    setRoomId(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(`${ApiUrl}/api/v1/users`, {
        name,
        email,
        password,
        phoneNumber,
        roomId,
        newUserRole,
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
      toast.error("Sign up failed! Please try again.");
      console.error('Sign up failed:', error);
    }
  };

    return (
      <div>
        <div className="welcome-div">
          <h1>Sign Up</h1>
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
              <label htmlFor="gender">Gender:</label>
              <select onChange={handleGenderChange} value={gender}>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="room">Your Office:</label>
              <select onChange={handleRoomChange} value={roomId}>
                {rooms.map(room => (
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
                  onClick={() => setShowPassword2(!showPassword2)}
                >
                  {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                </span>
              </div>
            </div>
            <div className="login-btn-container">
              <button type="submit" className="login-btn">Sign Up</button>
            </div>
            <div className='under-signup'>
              <Link to='/login' style={{ textDecoration: 'none', color:'white' }}>
                Already have an account? Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
//   } else {
//     return (
//       <div>
//         {loading || !Object.keys(userRoles).length ? (
//           <LoadingSpinner />
//         ) : (
//           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//             <img
//               style={{ width: '12rem', marginBottom: '2rem' }}
//               src="/zode_logo.png"
//               alt="Zode logo"
//             />
//             <h2>
//               Access Denied. <a href="/">Go to home page</a>
//             </h2>
//           </div>
//         )}
//       </div>
//     );
//   }
// }
