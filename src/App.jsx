import {React, useState, useEffect, useContext  } from 'react'
import './App.css'
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import {MobileNav} from "./components/MobileNav.jsx";
import {Login} from "./components/Login.jsx";
import {useNavigate} from 'react-router-dom';
import { AuthContext } from './context/AuthContext.jsx';



function App({ children }) {

  const {isLoggedIn} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()


  useEffect(() => {
    if (isLoading) {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login');
      }
      setIsLoading(false);
    }
  }, [isLoading, navigate]);


  if (isLoading) {
    return <div>Loading...</div>; 
  }
  


  
  return (
    <>
        {isLoggedIn && <Navbar />}
        {isLoggedIn && <MobileNav />}
        {children}
        <Footer />

    </>
  )

}

export default App
