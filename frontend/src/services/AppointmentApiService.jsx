import axios from 'axios';

const API_URL = '/api/appointments';

// Funktion, um die Termine eines Benutzers anhand der Benutzer-ID abzurufen
export const getAppointmentsByUserId = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Authentifizierung hinzufügen
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching appointments by userId:', error);
        throw error; // Fehler weiter werfen, um ihn in der Komponente zu behandeln
    }
};

// Funktion, um die Termine eines Therapeuten anhand der Therapeuten-ID abzurufen
export const getAppointmentsByTherapistId = async (therapistId) => {
    try {
        const response = await axios.get(`${API_URL}/therapist/${therapistId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Authentifizierung hinzufügen
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching appointments by therapistId:', error);
        throw error;
    }
};

// Funktion, um die Termine anhand des Datums und der Uhrzeit abzurufen
export const getAppointmentsByDateTime = async (appointmentDateTime) => {
    try {
        const response = await axios.get(`${API_URL}/datetime`, {
            params: { appointmentDateTime },
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Authentifizierung hinzufügen
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching appointments by date and time:', error);
        throw error;
    }
};
