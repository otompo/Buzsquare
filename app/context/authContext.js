import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../api/baseURL";

const AuthContext = createContext([{}, function () { }]);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: "",
  });

  useEffect(() => {
    const loadFromAsyncStorage = async () => {
      let data = await AsyncStorage.getItem("@auth");
      const as = JSON.parse(data);
      // console.log(as.access_token)
      // Update the state with the retrieved data
      if (as && as.access_token) {
        setAuth({ ...auth, token: as.access_token });
      }
    };
    loadFromAsyncStorage();
  }, []);

  // Moved axios configuration inside useEffect to ensure correct token is used
  useEffect(() => {
    // config axios with the updated token
    const token = auth.token || "";
    axios.defaults.baseURL = API_URL;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
