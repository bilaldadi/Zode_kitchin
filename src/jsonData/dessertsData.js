import axios from "axios";
import ApiUrl from "../components/MainUrl.js";
import { handleUnauthorized } from "../utils/auth.js";

export const getDessertsData = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const res = await axios.get(`${ApiUrl}/api/v1/menu/5`, {
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
