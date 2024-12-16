import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar.jsx";
import {
    Box,
    Button,
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Grid,
} from "@mui/material";

const TherapistProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [therapist, setTherapist] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTherapist = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/therapists/${id}`);
                setTherapist(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching therapist data:", err);
                setError("Failed to fetch therapist data.");
                setLoading(false);
            }
        };

        fetchTherapist();
    }, [id]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Box>
        );
    }

    return (
        <>
            <NavBar />
            <Box sx={{ mt: 4, mx: "auto", maxWidth: 600 }}>
                <Button variant="contained" onClick={() => navigate("/therapists")}>
                    Go back
                </Button>

                <Card sx={{ mt: 2, p: 2 }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Therapist Profile
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">
                                    <strong>First Name:</strong> {therapist.firstName}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">
                                    <strong>Last Name:</strong> {therapist.lastName}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">
                                    <strong>Email:</strong> {therapist.email}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">
                                    <strong>Country:</strong> {therapist.country}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">
                                    <strong>Birthday:</strong> {therapist.birthday}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">
                                    <strong>Verified:</strong> {therapist.verified ? "Yes" : "No"}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">
                                    <strong>University:</strong> {therapist.university}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">
                                    <strong>Qualifications:</strong> {therapist.qualifications}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
};

export default TherapistProfile;
