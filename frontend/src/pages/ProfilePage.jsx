import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar.jsx";
import { useAuth } from "../services/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";
import client from "../axios/APIinitializer.jsx";
import { Container, Typography, Box, Button } from "@mui/material";
import EditProfile from "../components/EditProfile.jsx";

const ProfilePage = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const fetchUserData = async () => {
        try {
            const response = await client.get('/api/users/me');
            setUserData(response.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
            setError(error.response?.data?.message || "Failed to load user data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            fetchUserData();
        }
    }, [isAuthenticated, navigate]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <>
            <NavBar />
            <Container>
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        Profile
                    </Typography>
                    {isEditing ? (
                        <EditProfile user={userData} onCancel={handleEditToggle} onSave={fetchUserData} />
                    ) : (
                        <>
                            {userData && (
                                <Box>
                                    <Typography variant="body1"><strong>Email:</strong> {userData.email}</Typography>
                                    <Typography variant="body1"><strong>First Name:</strong> {userData.firstName}</Typography>
                                    <Typography variant="body1"><strong>Last Name:</strong> {userData.lastName}</Typography>
                                    <Typography variant="body1"><strong>Country:</strong> {userData.country}</Typography>
                                    <Typography variant="body1"><strong>Birthday:</strong> {userData.birthday}</Typography>
                                    <Typography variant="body1"><strong>Role:</strong> {userData.selectedRole}</Typography>
                                </Box>
                            )}
                            <Button variant="contained" color="primary" onClick={handleEditToggle}>
                                Edit Profile
                            </Button>
                        </>
                    )}
                </Box>
            </Container>
        </>
    );
};

export default ProfilePage;