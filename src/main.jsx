import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import App from './App.jsx';
import {Welcome} from "./components/welcome.jsx";
import {Beverages} from "./components/Beverages.jsx";
import { Snack } from './components/Snack.jsx';
import {Cart} from './components/Cart.jsx';
import {CartProvider} from "./context/CartContext.js.jsx";
import { AuthProvider } from './context/AuthContext.jsx';
import './index.css'
import { Account } from './components/Account.jsx';
import { Login } from './components/Login.jsx';


const MainLayout = () => (
    <App>
        <Outlet />
    </App>
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { path: "/", element: <Welcome /> },
            { path: "beverages", element: <Beverages /> },
            { path: "snacks", element: <Snack /> },
            { path: "account", element: <Account /> },
            { path: "cart", element: <Cart /> },
            { path: "login", element: <Login /> },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <CartProvider>
                <RouterProvider router={router} />
            </CartProvider>
        </AuthProvider>
    </React.StrictMode>
);