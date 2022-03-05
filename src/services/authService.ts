import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_URL = "http://ec2-3-70-45-174.eu-central-1.compute.amazonaws.com/api/";
const token = localStorage.getItem("token");


const register = async (email: any, password: any, passwordConfirm: any) => {
  return await axios.post(API_URL + "register", {
    email,
    password,
    password_confirmation: passwordConfirm,
    device_name: 'deviceName'
  });
};

const login = async (email: any, password: any) => {
  return await axios
    .post(API_URL + "login", {
      email,
      password,
      device_name: 'deviceName'
    })
    .then((response) => {
      if (response.status === 200 && response.data.token) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("token");
};

const checkAuth = async () => {
    if(!token){
        return false;
    }
    const response = await axios
        .get(API_URL + "user", {
            headers: {
                'Authorization': `Bearer ${JSON.parse(token)}`
            }  
        })
    if(response.status === 401) {
        localStorage.removeItem("token");
        return false;
    }
    return true;
}

const getProfile = async () => {
    if(!token) {
        return;
    }
    const response = await axios
        .get(API_URL + "user", {
            headers: {
                'Authorization': `Bearer ${JSON.parse(token)}`
            }  
        })
    
    return response;
}

const authService = {
    login,
    register,
    logout,
    checkAuth,
    getProfile
}

export default authService;
