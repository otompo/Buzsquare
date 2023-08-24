import axios from "axios";
import { API_URL } from "./baseURL";
import AsyncStorage from "@react-native-async-storage/async-storage";

const makeRequest = axios.create({
  baseURL: API_URL, // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor to automatically add the Authorization header
makeRequest.interceptors.request.use(
  async (config) => {
    try {
      let data = await AsyncStorage.getItem("@auth");
      const auth = JSON.parse(data);
      if (auth.access_token) {
        config.headers["Authorization"] = `Bearer ${auth?.access_token}`;
      }
    } catch (error) {
      console.error("Error while adding Authorization header:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export { makeRequest };
