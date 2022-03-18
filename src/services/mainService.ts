import axios from "axios";
import { AnyCnameRecord } from "dns";
const API_URL = "https://api.maybebaby.kz/api/";

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

const getTestResults = async () => {
    const token = localStorage.getItem('token');

    if(!token) {
        return;
    }
    
    const response = await axios
        .get(API_URL + 'survey/results', {
            headers: {
                'Authorization': `Bearer ${JSON.parse(token)}`
            }
        })

    return response;
}


const getTestResultsByQuery = async (date: string) => {
    const token = localStorage.getItem('token');

    if(!token) {
        return;
    }
    
    const response = await axios
        .get(API_URL + `survey/results?date=${date}`, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(token)}`
            }
        })

    return response;
}

const getCities = async () => {
    const token = localStorage.getItem('token');

    if(!token) {
        return;
    }
    
    const response = await axios
        .get(API_URL + 'cities', {
            headers: {
                'Authorization': `Bearer ${JSON.parse(token)}`
            }
        })

    return response;
}

const getNationalities = async () => {
    const token = localStorage.getItem('token');

    if(!token) {
        return;
    }
    
    const response = await axios
        .get(API_URL + 'nationalities', {
            headers: {
                'Authorization': `Bearer ${JSON.parse(token)}`
            }
        })

    return response;
}

const getMarriageStatuses = async () => {
    const token = localStorage.getItem('token');

    if(!token) {
        return;
    }
    
    const response = await axios
        .get(API_URL + 'marriage-statuses', {
            headers: {
                'Authorization': `Bearer ${JSON.parse(token)}`
            }
        })

    return response;
}



const mainService = {
    startTest,
    endTest,
    getTestResults,
    getTestResultsByQuery,
    getCities,
    getMarriageStatuses,
    getNationalities
}
export default mainService;