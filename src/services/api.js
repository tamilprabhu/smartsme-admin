import { API_BASE_URL } from "../config";

export const apiRequest = async(endpoint, method ='GET', data = null) => {
    const token = localStorage.getItem("accessToken");
    const payload = {
        method : method,
        headers :{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    };
    if(data){
        payload.body = JSON.stringify(data);
    }
    try{
        const response = await fetch(`${API_BASE_URL}${endpoint}`,payload);
       if (response.status === 401) {
           //return handleRefresh(endpoint, method, data);
           localStorage.removeItem('accessToken')
           localStorage.removeItem('refreshToken')
        }
       return response;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
}