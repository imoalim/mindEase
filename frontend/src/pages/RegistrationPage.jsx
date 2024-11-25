import {useEffect, useState} from 'react';
import { TextField, Button, Container, Typography, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from "axios";
import NavBar from "../components/NavBar.jsx";

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        birthday: '',
        country: '',
        role: '',
    })
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all?fields=name")
            .then(response => setCountries(response.data.map(country => country.name.common).sort()))
            .catch(error => console.error("Error fetching countries. Error:" + error))

    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Form submitted:', formData);
        // Hier könntest du einen API-Aufruf für die Registrierung machen
    };

    return (
        <>
            <NavBar />
            <Container maxWidth="sm">
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Typography variant="h4" gutterBottom>
                        Complete your profile
                    </Typography>
                </Box>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="First name"
                            name="firstname"
                            value={formData.first_name}
                            onChange={handleChange}
                            variant="outlined"
                            required
                        />
                        <TextField
                            label="Last name"
                            name="lastname"
                            value={formData.last_name}
                            onChange={handleChange}
                            variant="outlined"
                            required
                        />
                        <TextField
                            label="Birthday"
                            name="birthday"
                            type="date"
                            value={formData.birthday}
                            onChange={handleChange}
                            variant="outlined"
                            required
                        />
                        <FormControl variant="outlined" required>
                            <InputLabel id="country-label">Country</InputLabel>
                            <Select
                                labelId="country-label"
                                value={formData.country}
                                onChange={handleChange}
                                label="Country">
                                {countries.map((country, index) => (
                                    <MenuItem key={index} value={country}>{country}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {/* Dropdown für die Rolle */}
                        <FormControl variant="outlined" required>
                            <InputLabel id="role-label">Role</InputLabel>
                            <Select
                                labelId="role-label"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                label="Role"
                            >
                                <MenuItem value="help-seeker">Help-seeker</MenuItem>
                                <MenuItem value="therapist">Therapist</MenuItem>
                                <MenuItem value="mentor">Mentor/Support</MenuItem>
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

export default RegistrationPage;
