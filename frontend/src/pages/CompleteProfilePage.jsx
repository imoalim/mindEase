import {useEffect, useState} from 'react';
import { TextField, Button, Container, Typography, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from "axios";
import NavBar from "../components/NavBar.jsx";
import {useAuth} from "../services/AuthProvider.jsx";
import {useNavigate} from "react-router-dom";
import client from "../axios/APIinitializer.jsx";

const CompleteProfilePage = () => {
    const {isAuthenticated, isVerified} = useAuth()
    const navigate = useNavigate()

    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [errors, setErrors] = useState({})

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        birthday: '',
        country: '',
        selectedRole: '',
    })
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        if(!isAuthenticated || isVerified) {
            navigate('/login')
            return
        }

        const fetchCountries = async () => {
            axios.get("https://restcountries.com/v3.1/all?fields=name")
                .then(response => setCountries(response.data.map(country => country.name.common).sort()))
                .catch(error => console.error("Error fetching countries. Error:" + error))
        }

        const fetchData = async () => {
            await client.get('/api/users/me')
                .then(response => {
                    const user = response.data
                    if (user.verificationStep == 2) {
                        if (user.selectedRole == 'USER') {
                            navigate('/questionnaire')
                        } else {
                            // navigate('/therapist')
                        }
                    } else if(user.verificationStep == 3) {
                        navigate('/suggestions')
                    }
                    fetchCountries()
                })
                .catch(error => console.error("Error fetching user data. Error:" + error))
        }

        fetchData();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        client.put("/api/profile", formData)
            .then(() => {
                setErrors({})
                setSuccess("Profile completed successfully! Redirecting you to the home page...")
                setTimeout(() => navigate('/'), 2000)
            })
            .catch(error => {
                if (error.errors) {
                    console.log(error.errors)
                    const fieldErrors = error.errors.reduce((acc, err) => {
                        acc[err.field] = err.error
                        return acc
                    }, {})
                    setErrors(fieldErrors)
                } else {
                    console.log(error)
                    setError("An error occurred while completing your profile. Please try again.")
                }
            })
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
                                name="role"
                                value={formData.selectedRole}
                                onChange={handleChange}
                                label="Role"
                            >
                                <MenuItem value="user">Help-seeker</MenuItem>
                                <MenuItem value="therapist">Therapist</MenuItem>
                                <MenuItem value="student">Psychology Student</MenuItem>
                            </Select>
                        </FormControl>
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
