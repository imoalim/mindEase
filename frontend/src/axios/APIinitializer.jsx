import axios from 'axios';

const client = axios.create({
    baseURL: 'http://localhost:8080', // Backend URL
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Token aus dem localStorage holen
    },
});

client.interceptors.response.use(
    (response) => response, // Erfolgreiche Antwort
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token'); // Token entfernen bei Unauthorized
            window.location.href = '/login'; // Zur Login-Seite umleiten
        }
        return Promise.reject(error.response.data); // Fehler weitergeben
    }
);

export default client;
