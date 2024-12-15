import { useState, useEffect } from "react";
import {Button, Card, CardContent, Typography, Grid2, Container} from "@mui/material";
import client from "@/axios/APIinitializer.jsx";
import NavBar from "@/components/NavBar.jsx";

export default function AdminsPage() {
    const [unverifiedProfessionals, setUnverifiedProfessionals] = useState([]);


    useEffect(() => {
        client
            .get("/api/users/unverified")
            .then((response) => setUnverifiedProfessionals(response.data))
            .catch((error) => console.error(error));
    }, []);


    const handleApproval = (id) => {
        client
            .put(`/api/users/${id}`)
            .then(() => {
                setUnverifiedProfessionals((prev) =>
                    prev.filter((user) => user.id !== id)
                );
            })
            .catch((error) => console.error(error));
    };

    return (
        <>
            <NavBar/>
            <Container sx={{backgroundColor: "white", display: "flex", margin:10, alignItems:"center", width:"90%"}}>
                <Grid2  spacing={5} padding={2} width={"100%"} alignItems={"center"} sx={{padding: 4}}>
                    <Typography variant="h4"  sx={{marginBottom: 4, color: "#00a0e1"}}>
                        <strong> New requests ({unverifiedProfessionals.filter(user => user).length}) </strong>
                    </Typography>
                    {unverifiedProfessionals.map((user) => (
                        <Grid2 key={user.id} xs={12} >
                            <Card variant="outlined" sx={{ display: "flex", padding: 2, width: "100%" }}>
                                <CardContent sx={{ flex: 1 }}>
                                    <Typography variant="h6">{user.firstName} {user.lastName}</Typography>
                                    <Typography variant="body2">Role: {user.selectedRole}</Typography>
                                </CardContent>
                                <Grid2 sx={{ display: "flex", alignItems: "center" }}>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        onClick={() => handleApproval(user.id)}
                                        sx={{ marginRight: 1 }}
                                    >
                                        Approve
                                    </Button>
                                </Grid2>
                            </Card>
                        </Grid2>
                    ))}
                </Grid2>
            </Container>

        </>
    );
}
