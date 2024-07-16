import './App.css'
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";



function App({ children }) {

  return (
    <>
        <Navbar/>
        {children}
        <Footer />

    </>
  )
}

export default App
