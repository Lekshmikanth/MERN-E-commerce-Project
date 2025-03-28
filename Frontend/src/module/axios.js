import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Your backend base URL

// Axios configuration
const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true, // Include credentials (like session cookies)
});

// A dynamic function to handle GET, POST, PUT, DELETE requests
export const apiRequest = async (method, endpoint, data = null, headers = {}) => {
    try {
        let response;

        // Set default headers if none provided
        const config = {
            headers: { ...headers }
        };

        // If the data is a FormData object, do not set Content-Type (axios will set it automatically)
        if (data instanceof FormData) {
            delete config.headers['Content-Type'];
        }

        switch (method.toUpperCase()) {
            case 'GET':
                response = await axiosInstance.get(endpoint, config);
                break;
            case 'POST':
                response = await axiosInstance.post(endpoint, data, config);
                break;
            case 'PUT':
                response = await axiosInstance.put(endpoint, data, config);
                break;
            case 'DELETE':
                response = await axiosInstance.delete(endpoint, config);
                break;
            default:
                throw new Error('Invalid HTTP method');
        }

        return response.data; // Return the response data

    } catch (error) {
        // You can customize error handling based on your needs
        console.error('API Request Error:', error.response ? error.response.data : error.message);
        throw error; // Rethrow error to handle it in the calling function
    }
};
