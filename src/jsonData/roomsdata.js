import axios from "axios";
import ApiUrl from "../components/MainUrl.js";
import { handleUnauthorized } from "../utils/auth.js";


export const getRoomsData = async () => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const res = await axios.get(`${ApiUrl}/api/v1/rooms`, {
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
        "Accept": "*/*",
        "ngrok-skip-browser-warning": "69420",
      },
    });

    if (res.status === 200) {
      return res.data.data;
    } else {
      throw new Error(`Unexpected status code: ${res.status}`);
    }

  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        switch (error.response.status) {
          case 401:
          case 403:
            console.error("Authentication error:", error.response.data);
            handleUnauthorized();
            break;
          case 404:
            console.error("Resource not found:", error.response.data);
            break;
          case 500:
            console.error("Server error:", error.response.data);
            break;
          default:
            console.error(`HTTP error! status: ${error.response.status}`);
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
      }
    } else {
      // Non-Axios error
      console.error("Non-Axios error occurred:", error.message);
    }

    // You might want to throw the error here to let the caller handle it
    // throw error;

    // Or return an empty array as in your original code
    return [];
  }
};