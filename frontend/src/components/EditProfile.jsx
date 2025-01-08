import  { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';
import client from '../axios/APIinitializer.jsx';
import PropTypes from 'prop-types';

const EditProfile = ({ user, onCancel, onSave }) => {
    const [formData, setFormData] = useState({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        country: user.country,
        birthday: user.birthday,
        selectedRole: user.selectedRole,
        description: user.description || "",
        location: user.location || "",
        gender: user.gender || "",
        experienceYears: user.experienceYears || "",
        university: user.university || "",
        qualifications: user.qualifications,
        //profile_picture: user.profile_picture || ""
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
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValidDate(formData.birthday)) {
            setBirthdayError('Invalid date format. Please use YYYY-MM-DD.');
            return;
        }
        setLoading(true);
        const data = {
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            country: formData.country,
            birthday: formData.birthday,
            selectedRole: formData.selectedRole,
            description: formData.description,
            location: formData.location,
            gender: formData.gender,
            experienceYears: formData.experienceYears,
            university: formData.university,
            qualifications: formData.qualifications,
            //profile_picture: formData.profile_picture
        };
        try {
            await client.put('/api/profile', data, {
                headers: {
                   'Content-Type': 'multipart/form-data',
                },
            });
            if (formData.selectedRole === 'therapist' && file) {
                await uploadFile(file);
            }
            onSave(); // Refresh the user data after successful update
            onCancel(); // Close the edit form after successful update
        } catch (error) {
            console.error('Error updating user:', error);
            setError(error.response?.data?.message || 'Failed to update user data.');
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
        <Box component="form" onSubmit={handleSubmit} sx={{
            mt: 2, backgroundColor: "white",
            padding: 3,
            borderRadius: 2,
            boxShadow: 1,
        }}>
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
            <TextField
                label="University"
                name="university"
                value={formData.university}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Qualifications"
                name="qualifications"
                value={formData.qualifications}
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
                type="date"
                value={formData.birthday}
                onChange={handleChange}
                fullWidth
                margin="normal"
                error={!!birthdayError}
                helperText={birthdayError}
                slotProps={{
                    inputLabel: {
                        shrink: true,
                    },
                }}
            />
            <TextField label="Description" name="description" value={formData.description} onChange={handleChange}
                       fullWidth margin="normal"/>
            <TextField label="Location" name="location" value={formData.location} onChange={handleChange} fullWidth
                       margin="normal"/>
            <FormControl fullWidth margin="normal">
                <InputLabel>Gender</InputLabel>
                <Select name="gender" value={formData.gender} onChange={handleChange}>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                </Select>
            </FormControl>
            <TextField
                label="Experience Years"
                name="experienceYears"
                type="number"
                value={formData.experienceYears}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            {/*<input
                type="file"
                name="profile_picture"
                onChange={handleFileChange}
                style={{marginTop: '16px'}}
            /> */}
            {formData.selectedRole === 'therapist' && (
                <input
                    type="file"
                    name="enrollmentDocument"
                    onChange={handleFileChange}
                    style={{marginTop: '16px'}}
                />
            )}
            <Box sx={{mt: 2}}>
                <Button type="submit" variant="contained" color="primary" disabled={loading}>
                    {loading ? 'Saving...' : 'Save'}
                </Button>
                <Button variant="outlined" color="error" onClick={onCancel} sx={{ml: 2}}>
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};
EditProfile.propTypes = {
    user: PropTypes.shape({
        email: PropTypes.string.isRequired,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        country: PropTypes.string,
        birthday: PropTypes.string,
        selectedRole: PropTypes.string,
        description: PropTypes.string,
        location: PropTypes.string,
        gender: PropTypes.string,
        qualifications: PropTypes.string,
        university: PropTypes.string,
        //profile_picture:PropTypes.string,
        experienceYears: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }).isRequired,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};
export default EditProfile;