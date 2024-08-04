import { useContext } from "react";
import { AuthContext } from '../../context/AuthContext';

export function OperationsPage() {

    const { userData } = useContext(AuthContext);

    console.log('User data:', userData.authorities[0]);
    
    return (
        <div>
            <h1>Operations Page </h1>
        </div>
    );
}