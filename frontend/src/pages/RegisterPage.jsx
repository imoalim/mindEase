import { useState } from "react"
import { Button, Box, Typography, Paper, TextField } from "@mui/material"
import NavBar from "../components/NavBar.jsx"
import registerImage from "@/assets/pictures/login.svg";
import axios from "axios"
import { useNavigate } from "react-router-dom"
import {useAuth} from "../services/AuthProvider.jsx";

const RegisterPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const navigate = useNavigate()
    const {login} = useAuth()

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError(null)
        setSuccess(null)

        if (password !== confirmPassword) {
            setError("Passwords do not match.")
            return;
        }

        try {
            // Register the user
            const response = await axios.post("http://localhost:8080/auth/register", { email, password });
            console.log("Registration successful:", response.data)
            setSuccess("Registration successful! Logging you in...")

            // Automatically login after registration
            const loginResponse = await axios.post("http://localhost:8080/auth/login", { email, password })
            console.log("Login successful:", loginResponse.data)

            login(loginResponse.data.token);

            navigate("/dashboard");

        } catch (err) {
            console.error("Error registering or logging in:", err.response?.data || err.message)
            setError(err.response?.data?.message || "An error occurred during registration.")
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
                    <Box
                        component="form"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                        onSubmit={handleSubmit}
                    >
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
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Register
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </>
    );
};

export default RegisterPage;
