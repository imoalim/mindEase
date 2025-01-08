import {useEffect, useState} from "react";
import NavBar from "@/components/NavBar.jsx";
import {Button, Card, CardContent, Container, Grid2, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import axios from "axios";



export default function DisplayProfessionalsPage(){

    const [professionals, setProfessionals] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTherapists = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/therapists");
                if (Array.isArray(response.data)) {
                    setProfessionals(response.data);
                } else {
                    console.error("Unexpected response format:", response.data);
                    setProfessionals([]);
                }
            } catch (error) {
                console.error("Error fetching therapists:", error);
                setProfessionals([]);
            }
        };

        fetchTherapists();
    }, []);
    return(
        <>
            <NavBar/>
            <Container sx={{backgroundColor: "white", display: "flex", margin:10, alignItems:"center", width:"90%"}}>
                <Grid2  padding={2} width={"100%"} alignItems={"center"} sx={{padding: 4}}>
                    <Typography variant="h4"  sx={{marginBottom: 4, color: "#00a0e1"}}>
                        <strong> Our professionals </strong>
                    </Typography>
                    {Array.isArray(professionals) && professionals.length > 0 ? (professionals.map((user) => (
                        <Grid2 key={user.id} xs={12} >
                            <Card variant="outlined" sx={{ display: "flex", padding: 2, width: "100%" }}>
                                <CardContent sx={{ flex: 1 }}>
                                    <Typography variant="h6">{user.firstName} {user.lastName}</Typography>
                                    <Typography variant="body2"> <strong> Job: </strong>
                                        {user.selectedRole
                                        .toLowerCase()
                                        .replace(/_/g, ' ')
                                        .replace(/\b\w/g, char => char.toUpperCase())}
                                    </Typography>
                                    <Typography variant="body2"> <strong> Studies: </strong> {user.university}</Typography>
                                    <Typography variant="body2">
                                        <strong>  Qualifications: </strong> {user.qualifications?.length > 100
                                        ? `${user.qualifications.slice(0, 100)}...`
                                        : user.qualifications}
                                    </Typography>
                                </CardContent>
                                <Grid2 sx={{ display: "flex", alignItems: "center" }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => navigate(`/therapist/${user.id}`)}
                                        sx={{ marginRight: 1 }}
                                    >
                                        See more
                                    </Button>
                                </Grid2>
                            </Card>
                        </Grid2>
                    ))) : (
                        <Typography variant="body2">No professionals available.</Typography>
                    )}
                </Grid2>
            </Container>

        </>
    );
}