import React, { useState, useEffect } from 'react';
import { Typography, Button, Grid, Card, CardContent } from '@mui/material';
import axios from 'axios';

const AppointmentPage = () => {
    const [appointments, setAppointments] = useState([]);

    /)
    useEffect(() => {
        axios.get('/api/appointments') //  API for BACKEND LATER !! endpoint
            .then(response => {
                setAppointments(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the appointments!", error);
            });
    }, []);

    const handleBookAppointment = () => {
        // This is a basic mockup; replace with your booking functionality
        console.log('Booking a new appointment...');
    };

    return (
        <div className="appointment-page">
            <Typography variant="h3" gutterBottom>
                Your Appointments
            </Typography>

            <Typography variant="body1" paragraph>
                Here you can view your upcoming appointments or book a new one. Our therapists are ready to assist you with professional and confidential support.
            </Typography>

            {/* Displaying the list of appointments */}
            <Grid container spacing={2}>
                {appointments.map((appointment) => (
                    <Grid item xs={12} sm={6} md={4} key={appointment.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Appointment on {new Date(appointment.appointment_date_time).toLocaleString()}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Status: {appointment.status}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" paragraph>
                                    Notes: {appointment.notes}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Therapist ID: {appointment.therapist_id} | User ID: {appointment.user_id}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <div className="book-appointment">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleBookAppointment}
                    style={{ marginTop: '20px' }}
                >
                    Book a New Appointment
                </Button>
            </div>
        </div>
    );
};

export default AppointmentPage;