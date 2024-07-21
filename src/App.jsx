import './App.css'
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import {MobileNav} from "./components/MobileNav.jsx";



function App({ children }) {

  return (
    <>
        <Navbar/>
        {children}
        <MobileNav />
        <Footer />

    </>
  )
}

export default App
