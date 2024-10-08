import React from 'react';
import { Container, Grid, Typography, Card, CardContent, Button } from '@mui/material';
import NavBar from './components/NavBar'; // AppBar

const Home = () => {
    return (
        <>
            <NavBar />
            <Container maxWidth="lg" style={{ padding: '20px' }}>
                {/* Header */}
                <Typography variant="h4" align="center" gutterBottom>
                    Discover support for your mental well-being
                </Typography>

                {/* Feature Section */}
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Book a Video Call</Typography>
                                <Typography>Schedule a session with a therapist...</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Find Helpful Tools</Typography>
                                <Typography>Explore tools tailored to your needs...</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Take a Quick Survey</Typography>
                                <Typography>Complete a short survey to better understand...</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">Self-Help Library</Typography>
                                <Typography>Access articles and books to learn more...</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Other Sections */}
                <Typography variant="h5" align="center" style={{ marginTop: '40px' }}>
                    Book an Appointment with a Psychologist
                </Typography>

                <Grid container spacing={4} style={{ marginTop: '20px' }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card>
                            <CardContent>
                                <Typography>Professional support...</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card>
                            <CardContent>
                                <Typography>Easily book your appointment online...</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card>
                            <CardContent>
                                <Typography>Enjoy flexible online sessions...</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card>
                            <CardContent>
                                <Typography>Confidential conversations focused...</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Home;
