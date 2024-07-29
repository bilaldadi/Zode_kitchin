import { useState, useEffect, useContext } from 'react';
import axios from "axios";
import ApiUrl from './MainUrl';
import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import testphoto from '../jsonData/beveragesData'

export function Account() {


    const [isLoading, setIsLoading] = useState(true); // Loading state
    const {isLoggedIn} = useContext(AuthContext);
    const location = useLocation();
    const [userData , setUserData] = useState({});

    useEffect(() => {
      if (location.state && location.state.orderCompleted) {
          console.log('Order Completed state detected');
          toast.success('Order Recived Successfully');
      }
  }, [location.state]);
  

    useEffect(() => {
        if (isLoggedIn) {
            const getUserData = async () => {
                const token = localStorage.getItem('authToken');
                try {
                    const res = await axios.get(`${ApiUrl}/api/v1/users/me`, {
                        headers: {
                          "Content-type": "application/json",
                          "Authorization": `Bearer ${token}`,
                          'Accept':'*/*',
                          "ngrok-skip-browser-warning": "69420"
                        }
                    }); 
                    setUserData(res.data.data); 
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };
    
            getUserData();
        }
    }, [isLoggedIn]);

    useEffect(() => {
      setIsLoading(false);
    }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isLoggedIn) {
        return (
          <div>

            <div className='customer-order-details'>
              <h1>Welcome <span style={{color:'#03D1B8'}}>{userData.name}</span> </h1>
              <p>You are logged in.</p>
            </div>

            <h2 className='order-h2' >My Orders</h2>

            <div className='details-table'>

              <div className='details-table-oreder-details' >
                  
                    <img src={testphoto.beverages[0].img_url} alt="" />
                    <p> Name: {testphoto.beverages[0].name}</p>
                    <p> Quantitiy: {testphoto.beverages[0].quantity}</p>
                    <p> Status: {testphoto.beverages[0].status}</p>
                  
              </div>

              <div className='details-table-oreder-details' >
                  
                  <img src={testphoto.beverages[0].img_url} alt="" />
                  <p> Name: {testphoto.beverages[0].name}</p>
                  <p> Quantitiy: {testphoto.beverages[0].quantity}</p>
                  <p> Status: {testphoto.beverages[0].status}</p>
                
            </div>

            </div>

          </div>
        );
  }

}
