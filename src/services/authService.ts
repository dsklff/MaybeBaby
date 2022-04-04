import { Password } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_URL = "https://api.maybebaby.kz/api/";


const register = async (email: any, password: any, passwordConfirm: any) => {
        const response = await axios.post(API_URL + "register", {
            email,
            password,
            password_confirmation: passwordConfirm,
            device_name: 'deviceName'
          }).then((response) => response.status)
          .catch((error) => {
              if(error.response.status === 422) {
                  alert("Данная почта уже используется")
              }
          })
         
         return response;
  
};

const login = async (email: any, password: any) => {
    try {
        await axios
        .post(API_URL + "login", {
          email,
          password,
          device_name: 'deviceName'
        })
        .then((response) => {
          if (response.status === 200 && response.data.token) {
            localStorage.setItem("token", JSON.stringify(response.data.token));
          } else if (response.status === 422) {
              console.log(response.data)
              alert("Неправильный логин и/или пароль")
          }
         
          return response.data;
        });
    } catch (error: any) {
        if(error.response.status === 422) {
            console.log(error.response.data)
            alert(error.response.data.errors.email[0])
        }
    }

};

const logout = () => {
  localStorage.removeItem("token");
};

const checkAuth = async () => {

    const token = localStorage.getItem('token');

    if(!token){
        console.log("net tokena")
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
    const token = localStorage.getItem('token');

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

const editProfile = async (nationality: any, gender: any, dob: any, name: any, city: any, profession: any, marriage_status: any) => {
    const token = localStorage.getItem('token');

    if(!token) {
        return;
    }
    const response = await axios
        .put(API_URL + "user", {name: name, nationality: nationality, gender: gender, dob: dob, city: city, profession: profession, marriage_status: marriage_status}, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(token)}`
            } 
    }).catch(e => {
        console.log(e.response.data);
        alert(e.response.data);
    });
    
    return response;
}

const registerSecondStep = async (nationality: any, gender: any, dob: any, name: any) => {
    const token = localStorage.getItem('token');

    if(!token) {
        return;
    }
    const response = await axios
        .put(API_URL + "user", {name: name, nationality: nationality, gender: gender, dob: dob}, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(token)}`
            }  
    }).catch(e => {
        console.log(e.response.data);
        alert(e.response.data.errors.dob[0]);
    });
    
    return response;
}

const changePassword = async (currentPassword: any, newPassword: any, newPasswordConfirm: any) => {
    const token = localStorage.getItem('token');

    if(!token) {
        return;
    }
    const response = await axios
        .post(API_URL + "user/password-change", {password: currentPassword, newPassword: newPassword, newPassword_confirmation: newPasswordConfirm}, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(token)}`
            }  
    });
    
    return response;
}

const forgotPassword = async (email: any) => {
    const response = await axios
        .post(API_URL + "forgot-password", {email: email});

    return response;
}

const resetPassword = async (email: any, code: any, password: any, passwordConfirm: any) => {
    const response = await axios
        .post(API_URL + 'reset-password', {email: email, code: code, password: password, password_confirmation: passwordConfirm });

    return response;
}

const authService = {
    login,
    register,
    logout,
    checkAuth,
    getProfile,
    editProfile,
    forgotPassword,
    resetPassword,
    changePassword,
    registerSecondStep
}

export default authService;
