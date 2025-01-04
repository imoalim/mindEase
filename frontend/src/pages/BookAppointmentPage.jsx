import { useState, useEffect } from "react";
import { Select, MenuItem, Button, Typography, Box, FormControl, InputLabel } from "@mui/material";
import client from "@/axios/APIinitializer.jsx"; // Axios-Client importieren
import NavBar from "@/components/NavBar.jsx";

const BookAppointmentPage = () => {
    const [therapistId, setTherapistId] = useState("");
    const [therapists, setTherapists] = useState([]);
    const [timeSlots, setTimeSlots] = useState([]); // State für verfügbare Termine
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
    const [error, setError] = useState("");

    // Lade alle Therapeuten beim Laden der Seite
    useEffect(() => {
        const loadTherapists = async () => {
            try {
                const response = await client.get("/api/therapists");
                setTherapists(response.data);
            } catch (error) {
                console.error("Error loading therapists:", error);
                setError("Failed to load therapists.");
            }
        };
        loadTherapists();
    }, []);

    // Lade Zeitslots für den ausgewählten Therapeuten
    const loadTimeSlots = async (id) => {
        setTherapistId(id);
        setTimeSlots([]); // Reset time slots bei Auswahländerung
        setError(""); // Reset error state
        try {
            console.log("Fetching time slots for therapist:", id);
            const response = await client.get(`/api/schedule/therapist/${id}/available`);
            setTimeSlots(response.data);
        } catch (error) {
            console.error("Error loading time slots:", error.response || error.message);
            setError("Failed to load time slots. Please try again.");
        }
    };

    const handleSubmit = async () => {
        if (!selectedTimeSlot) return alert("Please select a time slot!");
        try {
            // Hier kannst du die Buchung an die API senden
            const response = await client.post("/api/appointments", {
                therapistId,
                timeSlotId: selectedTimeSlot,
            });
            alert("Appointment booked successfully!");
            console.log("Response:", response.data);
        } catch (error) {
            console.error("Error booking appointment:", error.response || error.message);
            alert("Failed to book the appointment. Please try again.");
        }
    };

    return (
        <>
            <NavBar />
            <Box sx={{ maxWidth: 500, margin: "auto", padding: 3 }}>
                <Typography variant="h4">Book an Appointment</Typography>

                {/* Therapist Auswahl */}
                <FormControl fullWidth margin="normal">
                    <InputLabel id="therapist-select-label">Select Therapist</InputLabel>
                    <Select
                        labelId="therapist-select-label"
                        value={therapistId}
                        onChange={(e) => loadTimeSlots(e.target.value)}
                    >
                        {therapists.map((therapist) => (
                            <MenuItem key={therapist.id} value={therapist.id}>
                                {therapist.firstName} {therapist.lastName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Zeitslots Auswahl */}
                {timeSlots.length > 0 && (
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="time-slot-label">Available Time Slots</InputLabel>
                        <Select
                            labelId="time-slot-label"
                            value={selectedTimeSlot}
                            onChange={(e) => setSelectedTimeSlot(e.target.value)}
                        >
                            {timeSlots.map((slot) => (
                                <MenuItem key={slot.id} value={slot.id}>
                                    {`${slot.date} - ${slot.startTime} to ${slot.endTime}`}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}

                {/* Buchungs-Button */}
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleSubmit}
                    disabled={!selectedTimeSlot}
                >
                    Book Appointment
                </Button>

                {/* Fehleranzeige */}
                {error && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {error}
                    </Typography>
                )}
            </Box>
        </>
    );
};

export default BookAppointmentPage;
