import  { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';
import client from '../axios/APIinitializer.jsx';
const EditProfile = ({ user, onCancel, onSave }) => {
    const [formData, setFormData] = useState({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        country: user.country,
        birthday: user.birthday,
        selectedRole: user.selectedRole,
    });
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [birthdayError, setBirthdayError] = useState('');
    const [countries, setCountries] = useState([]);
    useEffect(() => {
        const fetchCountries = async () => {
            axios.get("https://restcountries.com/v3.1/all?fields=name")
                .then(response => setCountries(response.data.map(country => country.name.common).sort()))
                .catch(error => console.error("Error fetching countries. Error:" + error));
        };
        fetchCountries();
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleFileChange = (event) => {
        setFormData({
            ...formData,
            enrollmentDocument: event.target.files[0],
        });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('name', formData.name);
        formData.append('email', formData.email);
        formData.append('birthday', formData.birthday);
        if (formData.selectedRole === 'therapist' && formData.enrollmentDocument) {
            formData.append('enrollmentDocument', formData.enrollmentDocument);
        }

        try {
            const response = await fetch('http://localhost:8080/api/profile', {
                method: 'PUT',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Error updating user: ${response.statusText}`);
            }

            // Handle success
        } catch (error) {
            console.error('Error updating user:', error);
        } finally {
            setLoading(false);
        }
    };

    
    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('enrollmentDocument', file);
        try {
            await client.post('/api/profile/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        } catch (error) {
            console.error('Error uploading file:', error);
            setError(error.response?.data?.message || 'Failed to upload file.');
        }
    };
    const isValidDate = (dateString) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateString.match(regex)) return false;
        const date = new Date(dateString);
        const timestamp = date.getTime();
        if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) return false;
        return dateString === date.toISOString().split('T')[0];
    };
    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, backgroundColor: "white",
            padding: 3,
            borderRadius: 2,
            boxShadow: 1, }}>
            <Typography variant="h5" gutterBottom>
                Edit Profile
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
                disabled
            />
            <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Country</InputLabel>
                <Select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                >
                    {countries.map((country) => (
                        <MenuItem key={country} value={country}>
                            {country}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                label="Birthday"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                fullWidth
                margin="normal"
                error={!!birthdayError}
                helperText={birthdayError}
            />
            {formData.selectedRole === 'therapist' && (
                <input
                    type="file"
                    name="enrollmentDocument"
                    onChange={handleFileChange}
                    style={{ marginTop: '16px' }}
                />
            )}
            <Box sx={{ mt: 2 }}>
                <Button type="submit" variant="contained" color="primary" disabled={loading}>
                    {loading ? 'Saving...' : 'Save'}
                </Button>
                <Button variant="outlined" color="error" onClick={onCancel} sx={{ ml: 2 }}>
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};
export default EditProfile;