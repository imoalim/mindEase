import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import client from '@/axios/APIinitializer'; // Stelle sicher, dass der API-Client korrekt importiert ist

const BookAppointment = () => {
    const [appointmentDateTime, setAppointmentDateTime] = useState('');
    const [therapistId, setTherapistId] = useState('');
    const [notes, setNotes] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const appointmentData = { appointmentDateTime, therapistId, notes };

        try {
            const response = await client.post('/api/appointments', appointmentData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Appointment created successfully:', response.data);
            setMessage('Your appointment was booked successfully!');
        } catch (error) {
            console.error('Error booking appointment:', error);
            // Fehlerbehandlung verbessern, z.B. auf error.response prüfen
            if (error.response) {
                console.error('Response error:', error.response.data);
                alert('Error: ' + error.response.data.message); // Falls eine Fehlernachricht vom Backend kommt
            } else {
                alert('There was an error booking your appointment. Please try again.');
            }
        }
    };


    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Book a New Appointment
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Appointment Date and Time"
                    type="datetime-local"
                    fullWidth
                    value={appointmentDateTime}
                    onChange={(e) => setAppointmentDateTime(e.target.value)}
                    margin="normal"
                    required
                />
                <TextField
                    label="Therapist ID"
                    fullWidth
                    value={therapistId}
                    onChange={(e) => setTherapistId(e.target.value)}
                    margin="normal"
                    required
                />
                <TextField
                    label="Notes"
                    fullWidth
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Book Appointment
                </Button>
            </form>
            {message && <Typography variant="body1" color="textSecondary">{message}</Typography>}
        </Container>
    );
};

export default BookAppointment;
