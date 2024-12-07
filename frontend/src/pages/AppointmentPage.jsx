import { useState, useEffect } from 'react';
import {Typography, Button, Grid2, Card, CardContent, Paper, CardHeader} from '@mui/material';
import '@/AppointmentApp.css'
import client from "@/axios/APIinitializer.jsx";
import NavBar from "@/components/NavBar.jsx";
import {useAuth} from "@/services/AuthProvider.jsx";
import {useNavigate} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

const AppointmentPage = () => {
    const [appointments, setAppointments] = useState([]);
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate()
    const [error, setError] = useState("");

    if (!isAuthenticated) {
        navigate('/login')
    }

    const getAppointments = async () =>{
        try{
            const response = await client.get(`/api/appointments/user/${user.userId}`);
            setAppointments(response.data);
        } catch(error) {
                console.error("There was an error fetching the appointments!", error);
                setError("Error loading appointments.");
            }
    };

    useEffect(() => {
        if (user) {
            getAppointments();
        }
    }, [user]);

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

                <Typography variant="body1"  align="center">
                    View your upcoming appointments or book a new one. Our therapists are here to assist you professionally and confidentially.
                </Typography>

                {error ?
                    <h1>Error occurred while loading data</h1> :
                    <Grid2 container spacing={5} >
                        {appointments && appointments.length > 0 ? (
                            appointments.map((appointment) => (
                                <Grid2 item sm={6} md={4} key={appointment.id}>
                                    <Card variant="outlined" style={{ minHeight: '200px', display: 'flex', flexDirection: 'column' }}>
                                        <CardHeader
                                            action={
                                                <IconButton aria-label="settings">
                                                    <EditIcon />
                                                </IconButton>
                                            }
                                            title={`Appointment #${appointment.id}`}
                                        />
                                        <CardContent style={{ alignItems:'center', justifyContent: 'center'}}>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong> Date & time</strong>: {new Date(appointment.appointmentDateTime).toLocaleString()}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong> Status</strong>: {appointment.status}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" >
                                                <strong>Notes</strong>: {appointment.notes}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>Patient</strong>: {appointment.user.firstName +" " + appointment.user.lastName}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid2>

                            ))
                        ) : (
                            <Grid2 xs={12}>
                                <Paper style={{ padding: '20px', textAlign: 'center' }}>
                                    <Typography variant="body1" color="text.secondary">
                                        You have no upcoming appointments.
                                    </Typography>
                                </Paper>
                            </Grid2>
                        )}
                    </Grid2>
                }


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