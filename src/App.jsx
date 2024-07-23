import React from 'react'
import './App.css'
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import {MobileNav} from "./components/MobileNav.jsx";



function App({ children }) {



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
