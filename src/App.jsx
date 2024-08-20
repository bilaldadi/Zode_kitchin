import { useState, useEffect, useContext } from 'react';
import './App.css';
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { MobileNav } from "./components/MobileNav.jsx";
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from './context/AuthContext.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
  const { isLoggedIn } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

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

  const hideNavbarAndFooter = location.pathname === '/operations' || location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/resetpassword' || location.pathname === '/forgotpassword';


  return (
    <>
      <ThemeProvider theme={theme}>
        {isLoggedIn && !hideNavbarAndFooter && <Navbar />}
        {isLoggedIn && !hideNavbarAndFooter && <MobileNav />}
        <ToastContainer closeOnClick />
        {children}
        {!hideNavbarAndFooter && <Footer />}
      </ThemeProvider>
    </>
  );
}

export default App;