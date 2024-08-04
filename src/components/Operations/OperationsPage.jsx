import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../context/AuthContext';
import { LoadingSpinner } from "../LoadingSpinner";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { getOrdersData } from "../../jsonData/GetOrders";
import { toast } from 'react-toastify';

export function OperationsPage() {
    const { userData } = useContext(AuthContext);
    const [ordersData, setOrdersData] = useState({});
    const [loading, setLoading] = useState(true);
    const [userRoles, setUserRoles] = useState({});
    const [hasAccess, setHasAccess] = useState(false);
    

    useEffect(() => {
        if (userData && userData.authorities) {
            const roles = userData.authorities.reduce((acc, authority) => {
                acc[authority.id] = authority.authority;
                return acc;
            }, {});
            setUserRoles(roles); 
            console.log("User roles:", roles);
            setLoading(true);
        } 
        
    }, [userData]);

    useEffect(() => {
        const fetchData = async () => {
            if (Object.values(userRoles).includes('ADMIN') || Object.values(userRoles).includes('OPERATIONS')) {
                setLoading(true);
                setHasAccess(true);
                const data = await getOrdersData();
                setOrdersData(data);
                
                if (data.length === 0) {
                    toast.info("No Orders found");
                }
                console.log("Fetched beverages data:", data[5].status);
                setLoading(false);
            }else if (Object.keys(userRoles).length === 0) {
                setHasAccess(false);
            }else{
                setLoading(false);
            }
        };
        fetchData();
        
    }, [userRoles]);

    console.log("User roles:", userRoles);
    const roles = Object.values(userRoles);

    if(loading){
        return <LoadingSpinner />
    }

    if (hasAccess) {
        return (
            <div>
                <h1>Operations Page {ordersData[5].status}</h1>
            </div>
        );
    } else {
        return (
            <div>
                Access Denied <a href="/">go to home page</a>
            </div>
        );
    }
}
