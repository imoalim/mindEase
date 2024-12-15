import { useEffect, useState } from "react";
import { Button, Box, Typography, Paper, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import NavBar from "../components/NavBar.jsx";
import registerImage from "@/assets/pictures/login.svg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthProvider.jsx";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState(""); // Rolle
    const [university, setUniversity] = useState(""); // Zusätzliche Eingabe für Studenten
    const [qualification, setQualification] = useState(""); // Eingabe für Qualifikationen
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setErrors({});
        setSuccess(null);

        // Validierung: Passwort-Übereinstimmung
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }


        setLoading(true);
        try {
            // Payload erstellen
            const payload = {
                email,
                password,
                role
            };

            const response = await axios.post("http://localhost:8080/auth/register", payload);
            setSuccess("Registration successful! Logging you in...");

            login(response.data.accessToken);

            setTimeout(() => {
                navigate("/complete-profile");
            }, 100);
        } catch (err) {
            console.error("Registration error:", err);

            if (err.response?.data?.errors) {
                const fieldErrors = err.response.data.errors.reduce((acc, fieldError) => {
                    acc[fieldError.field] = fieldError.error;
                    return acc;
                }, {});
                setErrors(fieldErrors);
            } else {
                setError(err.response?.data?.message || "An unexpected error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <NavBar />
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "100vh",
                    backgroundColor: "#f5f5f5",
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        padding: 4,
                        borderRadius: 2,
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                        width: "100%",
                        maxWidth: 400,
                    }}
                >
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <img src={registerImage} alt="Register" style={{ width: "200px" }} />
                    </div>
                    <Typography variant="h4" align="center" gutterBottom>
                        Register for MindEase
                    </Typography>
                    {error && (
                        <Typography variant="body2" align="center" color="error" sx={{ marginBottom: 2 }}>
                            {error}
                        </Typography>
                    )}
                    {success && (
                        <Typography variant="body2" align="center" color="success" sx={{ marginBottom: 2 }}>
                            {success}
                        </Typography>
                    )}
                    <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }} onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            fullWidth
                        />
                        <TextField
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            fullWidth
                        />

                        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                            {loading ? "Registering..." : "Register"}
                        </Button>
                        <Typography>
                            Already registered? <Link to="/login">Login here</Link>
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </>
    );
};

export default RegisterPage;
