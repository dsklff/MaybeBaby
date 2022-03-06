import axios from "axios";
import { AnyCnameRecord } from "dns";
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

const endTest = async (answers: any) => {
    const token = localStorage.getItem('token');

    if(!token) {
        return;
    }

    const response = await axios
    .post(API_URL + "survey", {userResponses: answers}, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(token)}`
        }  
    })

return response; 
}

const mainService = {
    startTest,
    endTest
}
export default mainService;