// src/axios/fetchTherapists.jsx
import axios from "axios";

export const fetchTherapists = async () => {
    try {
        const response = await axios.get('/api/therapists', {
            headers: {
                'Accept': 'application/json'
            }
        });
        const contentType = response.headers['content-type'];

        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Unexpected API response format.');
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching therapists:', error);
        throw error;
    }
};