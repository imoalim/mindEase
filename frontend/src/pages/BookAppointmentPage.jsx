import React, { useState, useEffect } from "react";
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Box, Typography } from "@mui/material";
import client from "@/axios/APIinitializer.jsx"; // Adjust the import path as necessary
import { useAuth } from "@/services/AuthProvider.jsx"; // Import the useAuth hook to get user information

const BookAppointmentPage = () => {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [therapistId, setTherapistId] = useState("");
    const [therapists, setTherapists] = useState([]);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const { user } = useAuth(); // Get the authenticated user

    useEffect(() => {
        const loadTherapists = async () => {
            try {
                const response = await client.get('/api/therapists');
                setTherapists(response.data);
            } catch (error) {
                setError(error.message);
            }
        };

        loadTherapists();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await client.post("/api/appointments", {
                appointmentDateTime: `${date}T${time}`,
                therapist: { id: therapistId },
                user: { id: user.userId },
                status: "PENDING",
                notes: message
            });
            alert("Appointment booked successfully!");
        } catch (error) {
            console.error("Error booking appointment:", error);
            alert("Failed to book appointment.");
        }
    };

    return (
        <Box sx={{ maxWidth: 500, margin: "auto", padding: 2, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom>
                Book an Appointment
            </Typography>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="therapist-select-label">Select Therapist</InputLabel>
                    <Select
                        labelId="therapist-select-label"
                        value={therapistId}
                        onChange={(e) => setTherapistId(e.target.value)}
                        required
                    >
                        {therapists && therapists.length > 0 ? (
                            therapists.map((therapist) => (
                                <MenuItem key={therapist.id} value={therapist.id}>
                                    {therapist.firstName} {therapist.lastName}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem disabled>No therapists available</MenuItem>
                        )}
                    </Select>
                </FormControl>

                <TextField
                    fullWidth
                    type="date"
                    label="Appointment Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    margin="normal"
                    required
                />

                <TextField
                    fullWidth
                    type="time"
                    label="Appointment Time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    margin="normal"
                    required
                />

                <TextField
                    fullWidth
                    label="Message (Optional)"
                    multiline
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    margin="normal"
                />

                <Button variant="contained" color="primary" type="submit" fullWidth>
                    Book Appointment
                </Button>
            </form>
            {error && <Typography color="error">{error}</Typography>}
        </Box>
    );
};

export default BookAppointmentPage;