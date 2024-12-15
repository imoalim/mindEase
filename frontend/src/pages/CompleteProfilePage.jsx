import { useEffect, useState } from 'react';
import {
    TextField, Button, Container, Typography, Box,
    MenuItem, Select, InputLabel, FormControl
} from '@mui/material';
import axios from "axios";
import NavBar from "../components/NavBar.jsx";
import { useAuth } from "../services/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";
import client from "../axios/APIinitializer.jsx";

const CompleteProfilePage = () => {
    const { isAuthenticated, isVerified } = useAuth();
    const navigate = useNavigate();

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        birthday: '',
        country: '',
        selectedRole: '',
        university: '',
        qualifications: '',
        enrollmentDocument: null,
    });
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        if (!isAuthenticated || isVerified) {
            navigate('/login');
            return;
        }

        const fetchCountries = async () => {
            axios.get("https://restcountries.com/v3.1/all?fields=name")
                .then(response => setCountries(response.data.map(country => country.name.common).sort()))
                .catch(error => console.error("Error fetching countries. Error:" + error));
        };

        const fetchData = async () => {
            await client.get('/api/users/me')
                .then(response => {
                    const user = response.data;
                    if (user.verificationStep === 2) {
                        if (user.selectedRole === 'USER') {
                            navigate('/questionnaire');
                        } else if (user.selectedRole === 'PSYCHOLOGY_STUDENT') {
                            //navigate('/questionnaire');
                        }
                    } else if (user.verificationStep === 3) {
                        navigate('/suggestions');
                    }
                    fetchCountries();
                })
                .catch(error => console.error("Error fetching user data. Error:" + error));
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, enrollmentDocument: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a JSON object for the profile data
        const profileJson = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            birthday: formData.birthday,
            country: formData.country,
            selectedRole: formData.selectedRole,
            university: formData.university,
            qualifications: formData.qualifications,
        };

        // Create a FormData object and append parts
        const profileData = new FormData();
        profileData.append("profileData", new Blob([JSON.stringify(profileJson)], { type: "application/json" }));
        if (formData.enrollmentDocument) {
            profileData.append("enrollmentDocument", formData.enrollmentDocument);
        }
        console.log([...profileData.entries()]);
        // Send the request
        try {
            await client.put("/api/profile", profileData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setErrors({});
            setSuccess("Profile completed successfully! Redirecting you to the questionnaire...");
            setTimeout(() => navigate('/questionnaire'), 2000);
        } catch (error) {
            console.error("Error updating profile:", error);
            if (error.errors) {
                const fieldErrors = error.errors.reduce((acc, err) => {
                    acc[err.field] = err.error;
                    return acc;
                }, {});
                setErrors(fieldErrors);
            } else {
                setError("An error occurred while completing your profile. Please try again.");
            }
        }
    };

    return (
        <>
            <NavBar />
            <Container maxWidth="sm">
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Typography variant="h4" gutterBottom>
                        Complete your profile
                    </Typography>

                    {error && (
                        <Typography
                            variant="body2"
                            align="center"
                            color="error"
                            sx={{ marginBottom: 2 }}
                        >
                            {error}
                        </Typography>
                    )}
                    {success && (
                        <Typography
                            variant="body2"
                            align="center"
                            color="success"
                            sx={{ marginBottom: 2 }}
                        >
                            {success}
                        </Typography>
                    )}
                </Box>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="First name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            variant="outlined"
                            required
                        />
                        {errors.firstName && (
                            <Typography
                                variant="body2"
                                color="error"
                                sx={{ marginBottom: 2 }}
                            >
                                {errors.firstName}
                            </Typography>
                        )}
                        <TextField
                            label="Last name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            variant="outlined"
                            required
                        />
                        {errors.lastName && (
                            <Typography
                                variant="body2"
                                color="error"
                                sx={{ marginBottom: 2 }}
                            >
                                {errors.lastName}
                            </Typography>
                        )}
                        <TextField
                            label="Birthday"
                            name="birthday"
                            type="date"
                            value={formData.birthday}
                            onChange={handleChange}
                            variant="outlined"
                            required
                        />
                        {errors.birthday && (
                            <Typography
                                variant="body2"
                                color="error"
                                sx={{ marginBottom: 2 }}
                            >
                                {errors.birthday}
                            </Typography>
                        )}
                        <FormControl variant="outlined" required>
                            <InputLabel id="country-label">Country</InputLabel>
                            <Select
                                labelId="country-label"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                label="Country">
                                {countries.map((country, index) => (
                                    <MenuItem key={index} value={country}>{country}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {errors.country && (
                            <Typography
                                variant="body2"
                                color="error"
                                sx={{ marginBottom: 2 }}
                            >
                                {errors.country}
                            </Typography>
                        )}
                        <FormControl variant="outlined" required>
                            <InputLabel id="role-label">Role</InputLabel>
                            <Select
                                labelId="role-label"
                                name="selectedRole"
                                value={formData.selectedRole}
                                onChange={handleChange}
                                label="Role"
                            >
                                <MenuItem value="USER">Help-seeker</MenuItem>
                                <MenuItem value="THERAPIST">Therapist</MenuItem>
                                <MenuItem value="PSYCHOLOGY_STUDENT">Psychology Student</MenuItem> {/* Use exact enum value */}
                            </Select>
                        </FormControl>
                        {formData.selectedRole === "student" && (
                            <>
                                <TextField
                                    label="University"
                                    name="university"
                                    value={formData.university}
                                    onChange={handleChange}
                                    variant="outlined"
                                    required
                                />
                                <TextField
                                    label="Qualifications"
                                    name="qualifications"
                                    value={formData.qualifications}
                                    onChange={handleChange}
                                    variant="outlined"
                                    required
                                />
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    accept=".pdf,.doc,.docx"
                                    required
                                />
                            </>
                        )}
                        <Button type="submit" variant="contained" color="primary">
                            Continue
                        </Button>
                    </Box>
                </form>
            </Container>
        </>
    );
};

export default CompleteProfilePage;
