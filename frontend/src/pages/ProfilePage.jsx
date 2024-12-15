import { useEffect, useState } from "react";
import NavBar from "../components/NavBar.jsx";
import { useAuth } from "../services/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";
import client from "../axios/APIinitializer.jsx";
import {Container, Typography, Box, Button, Avatar} from "@mui/material";
import EditProfile from "../components/EditProfile.jsx";
import userIcon from "../assets/pictures/userIcon.png"

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
            <Container sx={{alignItems: "center", alignContent:"center",  display: "flex",
                justifyContent: "center"}}>
                <Box sx={{ mt: 4, alignContent:"center", alignItems:"center" }}>
                    {isEditing ? (
                        <EditProfile user={userData} onCancel={handleEditToggle} onSave={fetchUserData} />
                    ) : (
                        <>
                            {userData && (
                                <Box
                                    sx={{
                                        backgroundColor: "white",
                                        padding: 3,
                                        borderRadius: 2,
                                        boxShadow: 1,
                                        maxWidth: 500,
                                        margin: "auto",
                                        color: "#00a0e1",
                                        textAlign: "center",
                                    }}
                                >
                                    <Typography variant="h4" gutterBottom sx={{margin:2, paddingBottom: 1}}>
                                        Welcome, {userData.firstName} {userData.lastName}!
                                    </Typography>
                                    <Avatar
                                        src={userIcon}
                                        sx={{ width: 110, height: 110, margin: "auto", mb: 2, paddingBottom: 1 }}
                                    />
                                    <Typography variant="h5" marginBottom={1.5}>
                                       Profile details:
                                    </Typography>
                                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                        <strong>Email:</strong> {userData.email}
                                    </Typography>
                                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                        <strong>Country:</strong> {userData.country}
                                    </Typography>
                                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                        <strong>Birthday:</strong> {userData.birthday}
                                    </Typography>
                                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                                        <strong>Role:</strong> {userData.selectedRole}
                                    </Typography>
                                    <Button variant="contained" color="primary" sx={{marginTop: 2, marginBottom: 1}} onClick={handleEditToggle}>
                                        Edit Profile
                                    </Button>
                                </Box>

                            )}

                        </>
                    )}
                </Box>
            </Container>
        </>
    );
};

export default ProfilePage;
