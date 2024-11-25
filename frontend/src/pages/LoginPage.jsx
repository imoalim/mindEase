import { useState } from "react";
import { Button, Box, Typography, Paper, TextField } from "@mui/material";
import NavBar from "../components/NavBar.jsx";
import login from "@/assets/pictures/login.svg";
import axios from "axios";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/auth/login",
                { email, password },
                {headers: {
                    "Content-Type": "application/json",
                }}
            );
            console.log("Login successful:", response.data);
            // Redirect or show success message
        } catch (err) {
            console.error("Error registering:", err.response?.data || err.message);
            setError(err.response?.data?.message || "An error occurred");
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
                        <img src={login} alt="Authenticate" style={{ width: "200px" }} />
                    </div>
                    <Typography variant="h4" align="center" gutterBottom>
                        Login to MindEase
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

export default LoginPage;
