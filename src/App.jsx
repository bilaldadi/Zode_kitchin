import {React,useState, useEffect} from 'react'
import './App.css'
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import {MobileNav} from "./components/MobileNav.jsx";
import {Login} from "./components/Login.jsx";


function App({ children }) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  if (!isLoggedIn) {
    return (
      <div>
        <Login />
      </div>
    );
  }

  return (
    <>
        <Navbar/>
        <MobileNav />
        {children}
        <Footer />

    </>
  )
}

export default App
