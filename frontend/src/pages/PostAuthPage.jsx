import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import NavBar from "@/components/NavBar";
import client from "../axios/APIinitializer.jsx";
import { useAuth } from "@/services/AuthProvider.jsx";
import {Box, Paper} from "@mui/material";

const PostAuthPage = () => {
    const { login, user } = useAuth();
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        client.get("/api/user", {withCredentials: true})
            .then(response => {
                login(response.data)
                setIsLoading(false)
                setTimeout(() => {
                    navigate("/")
                }, 2000)
            }).catch(error => {
                setHasError(true)
                console.error("Error fetching user data: ", error)
            })
    }, [])

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
                    {isLoading === true ?
                        (<h1>Loading...</h1>) :
                        hasError === true ?
                            (<h1>Error fetching user data</h1>) :
                            (<>
                                <h1>Welcome back, {user.name}!</h1>
                                <p>Redirecting you...</p>
                            </>)
                    }
                </Paper>
            </Box>
        </>
    )
}

export default PostAuthPage