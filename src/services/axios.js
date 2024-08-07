import axios from "axios";

const http = axios.create({
    baseURL: "https://845d-114-122-20-86.ngrok-free.app/api/",
    withCredentials: true,
});

http.interceptors.request.use((config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

http.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                localStorage.removeItem("ACCESS_TOKEN");
            }
        } else {
            console.error("Network Error or Server is down", error);
        }
        return Promise.reject(error);
    }
);

export default http;
