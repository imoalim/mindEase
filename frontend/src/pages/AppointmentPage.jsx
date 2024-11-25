import { useState, useEffect } from 'react';
import { Typography, Button, Grid, Card, CardContent, Paper } from '@mui/material';
import '@/AppointmentApp.css'
import client from "@/axios/APIinitializer.jsx";
import NavBar from "@/components/NavBar.jsx";

const AppointmentPage = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        client.get('/api/appointments')
            .then(response => {
                setAppointments(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the appointments!", error);
            });
    }, []);

    const handleBookAppointment = () => {
        console.log('Booking a new appointment...');
    };

    return (
        <>
            <NavBar />
            <div className="appointment-page">
                <Typography variant="h3" gutterBottom align="center" style={{ color: '#00a0e1' }}>
                    Your Appointments
                </Typography>

                <Typography variant="body1" paragraph align="center">
                    View your upcoming appointments or book a new one. Our therapists are here to assist you professionally and confidentially.
                </Typography>

                <Grid container spacing={3} justifyContent="center">
                    {appointments && appointments.length > 0 ? (
                        appointments.map((appointment) => (
                            <Grid item xs={12} sm={6} md={4} key={appointment.id}>
                                <Card variant="outlined" style={{ minHeight: '200px', display: 'flex', flexDirection: 'column' }}>
                                    <CardContent>
                                        <Typography variant="h5" component="div" style={{ color: '#333' }}>
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
                        ))
                    ) : (
                        <Grid item xs={12}>
                            <Paper style={{ padding: '20px', textAlign: 'center' }}>
                                <Typography variant="body1" color="text.secondary">
                                    You have no upcoming appointments. Book one now to get started!
                                </Typography>
                            </Paper>
                        </Grid>
                    )}
                </Grid>

                <div className="book-appointment" style={{ marginTop: '30px', textAlign: 'center' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleBookAppointment}
                        style={{ padding: '12px 30px', fontSize: '16px', borderRadius: '30px' }}
                    >
                        Book a New Appointment
                    </Button>
                </div>
            </div>
        </>
    );
};

export default AppointmentPage;