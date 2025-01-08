import  { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Box, Typography } from "@mui/material";
import client from "@/axios/APIinitializer.jsx"; // Adjust the import path as necessary
import { useAuth } from "@/services/AuthProvider.jsx";
import NavBar from "@/components/NavBar.jsx"; // Import the useAuth hook to get user information

const BookAppointmentPage = () => {
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [therapistId, setTherapistId] = useState("");
    const [therapists, setTherapists] = useState([]);
    const [unavailableHours, setUnavailableHours] = useState([]);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const { user } = useAuth(); // Get the authenticated user
    const navigate = useNavigate();

    useEffect(() => {
        const loadTherapists = async () => {
            try {
                const response = await client.get('/api/users/therapists');
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
            navigate("/appointment-page")
        } catch (error) {
            console.error("Error booking appointment:", error);
            alert("Failed to book appointment.");
        }
    };

    const handleDateChange = async (e) => {
        const selectedDate = e.target.value;
        setDate(selectedDate);

        // Fetch the booked appointments for the selected therapist and date
        try {
            const response = await client.get(`/api/appointments/therapist-unavailable`, {
                params: { dateToCheck: selectedDate, therapistId }
            });
            console.log(response.data);
            // Extract the hour from each LocalDateTime string in response.data
            const hours = response.data.map((dateTime) => {
                // Convert the string to a Date object
                const dateObj = new Date(dateTime);

                // Return the hour part (0-23 format)
                return dateObj.getHours();
            });

            setUnavailableHours(hours); // Update state with the unavailable hours
        } catch (error) {
            setError("Error fetching unavailable hours");
        }
    };

    return (
        <>
            <NavBar/>
        <Box sx={{ maxWidth: 500, margin:"auto", marginTop: 5, padding: 2, boxShadow: 3, borderRadius: 2, backgroundColor: "white" }}>
            <Typography variant="h4" gutterBottom>
                Book an Appointment
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              All appointments duration is of 1 hour.
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
                    onChange={handleDateChange}
                    InputLabelProps={{ shrink: true }}
                    margin="normal"
                    required
                />


                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                        label="Appointment Time"
                        value={time}
                        onChange={(newValue) => {
                            if (newValue) {
                                const hour = newValue.getHours(); // Get the hour (24-hour format)
                                const minutes = newValue.getMinutes(); // Get the minutes

                                // Format the time as a string (e.g., "09:00")
                                const formattedTime = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

                                setTime(formattedTime); // Set the time string
                            }
                        }}
                        minTime={new Date(0, 0, 0, 9, 0)} // 9:00 AM
                        maxTime={new Date(0, 0, 0, 17, 0)} // 5:00 PM
                        minutesStep={30} // Only 00 or 30 minutes
                        ampm={false} // Disable AM/PM and use 24-hour format
                        views={['hours']} // Only show hours
                        shouldDisableTime={(timeValue) => {
                            const hour = timeValue.getHours();
                            // Disable hours that are already booked
                            return unavailableHours.includes(hour);
                        }}
                        renderInput={(params) => <TextField fullWidth margin="normal" required {...params} />}
                    />
                </LocalizationProvider>


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
        </>
    );
};

export default BookAppointmentPage;