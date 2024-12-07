import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "@/services/AuthProvider.jsx";
import client from "@/axios/APIinitializer.jsx";
import {Card, CardContent, Paper, Typography} from "@mui/material";
import {Grid2} from "@mui/material";
import NavBar from "@/components/NavBar.jsx";

function TherapistsAppointmentsPage(){

    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate()
    const [appointments, setAppointmentsState] = useState([]);
    const [error, setError] = useState("");

    if (!isAuthenticated) {
        navigate('/login')
    }

    const getAppointments = async () => {
        try {
            const response = await client.get(`api/appointments/therapist/${user.userId}`);
            setAppointmentsState(response.data);
        } catch (error) {
            console.error("Error generating response:", error);
            setError("Error loading appointments.");
        }
    };

    useEffect(() => {
        if (user) {
            getAppointments();
        }
    }, [user]);

    return(
        <>
            <NavBar/>
            {error ?
                <h1>Error occurred while loading data</h1> :
                <Grid2 container spacing={3} >
                    {appointments && appointments.length > 0 ? (
                        appointments.map((appointment) => (
                            <Grid2 xs={12} sm={6} md={4} key={appointment.id}>
                                <Card variant="outlined" style={{ minHeight: '200px', display: 'flex', flexDirection: 'column' }}>
                                    <CardContent>
                                        <Typography variant="h5" component="div" style={{ color: '#333' }}>
                                            Appointment on {new Date(appointment.appointmentDateTimee).toLocaleString()}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Status: {appointment.status}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" paragraph>
                                            Notes: {appointment.notes}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Pacient: {appointment.user}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid2>
                        ))
                    ) : (
                        <Grid2 xs={12}>
                            <Paper style={{ padding: '20px', textAlign: 'center' }}>
                                <Typography variant="body1" color="text.secondary">
                                    You have no upcoming appointments. Book one now to get started!
                                </Typography>
                            </Paper>
                        </Grid2>
                    )}
                </Grid2>
            }
        </>
    );
}

export default TherapistsAppointmentsPage;