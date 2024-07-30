// import snacksData from './snacksData.js';
// import dessertsData from './dessertsData.js';
// import fruitsData from './fruitsData.js';
//
//
// const allItems = [
//
//     ...snacksData.snacks.map(item => ({ ...item, category: 'Snack' })),
//     ...dessertsData.desserts.map(item => ({ ...item, category: 'Dessert' })),
//     ...fruitsData.fruits.map(item => ({ ...item, category: 'Fruit' })),
// ];
//
// export default allItems;

import axios from "axios";
import ApiUrl from "../components/MainUrl.js";
import { handleUnauthorized } from "../utils/auth.js";

export const getAllItems = async () => {
    try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get(`${ApiUrl}/api/v1/menu`, {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`,
                "Accept": "*/*",
                "ngrok-skip-browser-warning": "69420",
            },
        });
        if (res.status === 200) {
            return res.data.data;
        } else if (res.status === 403) {
            handleUnauthorized();
        } else {
            console.log('Unexpected status code:', res.status);
        }
    } catch (error) {
        if (error.response && error.response.status === 403) {
            handleUnauthorized();
        } else {
            console.error("Error fetching Beverages data:", error);
        }
        return [];
    }
};
