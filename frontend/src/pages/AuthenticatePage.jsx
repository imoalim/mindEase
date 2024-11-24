import { Button, Box, Typography, Paper } from "@mui/material"
import NavBar from "../components/NavBar.jsx"
import login from '@/assets/pictures/login.svg'

const LoginPage = () => {
    const handleLogin = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/google";
    }

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
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <img src={login} alt="Authenticate" style={{width: "200px"}} />
                    </div>
                    <Typography variant="h4" align="center" gutterBottom className="hero-title">
                        Login to MindEase
                    </Typography>
                    <Box
                        component="form"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleLogin}
                        >
                            Login with Google
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </>
    )
}

export default LoginPage
