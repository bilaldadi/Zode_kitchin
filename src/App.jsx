import { useState, useEffect, useContext  } from 'react'
import './App.css'
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import {MobileNav} from "./components/MobileNav.jsx";
import {useNavigate} from 'react-router-dom';
import { AuthContext } from './context/AuthContext.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createTheme , ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  typography: {
    fontFamily: [
      'poppins',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
  }
});



// eslint-disable-next-line react/prop-types
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
       <ThemeProvider theme={theme}>
          {isLoggedIn && <Navbar />}
          {isLoggedIn && <MobileNav />}
          <ToastContainer />
          {children}
          <Footer />
       </ThemeProvider>

    </>
  )

}

export default App
