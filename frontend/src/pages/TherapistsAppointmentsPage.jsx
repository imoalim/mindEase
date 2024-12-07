import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/services/AuthProvider.jsx";
import client from "@/axios/APIinitializer.jsx";
import { Button, Box, Card, CardContent, CardHeader, Container, Paper, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Grid2 } from "@mui/material";
import NavBar from "@/components/NavBar.jsx";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';

function TherapistsAppointmentsPage() {

    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [appointments, setAppointmentsState] = useState([]);
    const [error, setError] = useState("");
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [newDate, setNewDate] = useState("");
    const [newTime, setNewTime] = useState("");

    if (!isAuthenticated) {
        navigate('/login');
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

    const handleStatusChange = async (appointmentId, newStatus) => {
        try {
            const updatedAppointment = {
                ...appointments.find((a) => a.id === appointmentId),
                status: newStatus,
            };

            await client.put(`api/appointments/${appointmentId}`, updatedAppointment);

            setAppointmentsState((prev) =>
                prev.map((a) =>
                    a.id === appointmentId ? { ...a, status: newStatus } : a
                )
            );
            console.log("Appointment confirmed!");
        } catch (error) {
            console.error("Error confirming appointment:", error);
            setError("Failed to confirm the appointment.");
        }
    };

    const handleEditClick = (appointment) => {
        setSelectedAppointment(appointment);
        const currentDate = new Date(appointment.appointmentDateTime);
        setNewDate(currentDate.toISOString().split('T')[0]);
        setNewTime(currentDate.toISOString().split('T')[1].substring(0, 5));
        setOpenDialog(true);
    };

    const handleDateChange = (event) => {
        setNewDate(event.target.value); // Set the new date value
    };

    const handleTimeChange = (event) => {
        setNewTime(event.target.value); // Set the new time value
    };

    const handleSaveDate = async () => {
        if (newDate && newTime && selectedAppointment) {
            try {
                const newDateTime = new Date(`${newDate}T${newTime}:00Z`);

                const updatedAppointment = {
                    ...selectedAppointment,
                    appointmentDateTime: newDateTime,
                };

                await client.put(`api/appointments/${selectedAppointment.id}`, updatedAppointment);

                setAppointmentsState((prev) =>
                    prev.map((a) =>
                        a.id === selectedAppointment.id ? { ...a, appointmentDateTime: newDateTime } : a
                    )
                );
                setOpenDialog(false);
                console.log("Appointment date and time updated!");
            } catch (error) {
                console.error("Error updating appointment:", error);
                setError("Failed to update the appointment.");
            }
        }
    };

    useEffect(() => {
        if (user) {
            getAppointments();
        }
    }, [user]);

    return (
        <>
            <NavBar />
            <Container style={{ marginTop: '40px' }}>
                <Typography variant="h3" align="center" style={{ color: '#00a0e1', marginBottom: '30px' }}>
                    Your Appointments
                </Typography>

                {error ?
                    <h1>Error occurred while loading data</h1> :
                    <Grid2 container spacing={5}>
                        {appointments && appointments.length > 0 ? (
                            appointments.map((appointment) => (
                                <Grid2 item size={4} sm={6} md={4} key={appointment.id}>
                                    <Card variant="outlined" style={{ minHeight: '200px', display: 'flex', flexDirection: 'column' }}>
                                        <CardHeader
                                            action={
                                                <IconButton aria-label="edit" onClick={() => handleEditClick(appointment)}>
                                                    <EditIcon />
                                                </IconButton>
                                            }
                                            title={`Appointment #${appointment.id}`}
                                        />
                                        <CardContent style={{ alignItems: 'center', justifyContent: 'center' }}>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong> Date & time</strong>: {new Date(appointment.appointmentDateTime).toLocaleString()}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong> Status</strong>: {appointment.status}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>Notes</strong>: {appointment.notes}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>Patient</strong>: {appointment.user.firstName + " " + appointment.user.lastName}
                                            </Typography>
                                            {
                                                appointment.status === "CANCELED" ? (
                                                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={() => handleStatusChange(appointment.id, "CONFIRMED")}
                                                        >
                                                            REOPEN
                                                        </Button>
                                                    </Box>
                                                ) : appointment.status !== "CONFIRMED" ? (
                                                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                                                        <Button
                                                            variant="contained"
                                                            color="success"
                                                            onClick={() => handleStatusChange(appointment.id, "CONFIRMED")}
                                                        >
                                                            ACCEPT
                                                        </Button>
                                                    </Box>
                                                ) : (
                                                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                                                        <Button
                                                            variant="contained"
                                                            color="error"
                                                            onClick={() => handleStatusChange(appointment.id, "CANCELED")}
                                                        >
                                                            CANCEL
                                                        </Button>
                                                    </Box>
                                                )
                                            }

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
            </Container>


            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Edit Appointment Date and Time</DialogTitle>
                <DialogContent style={{padding: '20px'}}>
                    <TextField
                        label="New Date"
                        type="date"
                        value={newDate}
                        onChange={handleDateChange}
                        variant="outlined"
                        required
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        label="New Time"
                        type="time"
                        value={newTime}
                        onChange={handleTimeChange}
                        variant="outlined"
                        required
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{ marginTop: '16px' }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="error">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveDate} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default TherapistsAppointmentsPage;
