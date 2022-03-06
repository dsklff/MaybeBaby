import axios from "axios";
const API_URL = "http://ec2-3-70-45-174.eu-central-1.compute.amazonaws.com/api/";

const startTest = async () => {
    const token = localStorage.getItem('token');

    if(!token) {
        return;
    }
    const response = await axios
        .get(API_URL + "survey/start", {
            headers: {
                'Authorization': `Bearer ${JSON.parse(token)}`
            }  
        })
    
    return response;
}

const mainService = {
    startTest
}
export default mainService;