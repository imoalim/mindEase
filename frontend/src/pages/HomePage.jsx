import React from 'react'
import { Container, Grid, Typography, Card, CardContent } from '@mui/material'
import NavBar from '@/Components/NavBar'
import '@/App.css'

import heroImage from '@/assets/pictures/heroImage.png'
import icon1 from '@/assets/pictures/icon1.png'
import psychologistImage from '@/assets/pictures/hero.jpg'
import image1 from '@/assets/pictures/image1.png'

const HomePage = () => {
    return (
        <>
            <NavBar />
            <div className="hero-section">
                <Container maxWidth="lg" style={{ padding: '20px' }}>
                    <Grid container alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography variant="h3" className="hero-title">
                                Discover support for your mental well-being
                            </Typography>
                            <Grid container spacing={2} className="features">
                                <Grid item xs={6} md={3}>
                                    <Card className="feature-card">
                                        <img src={image1} alt="Book a Video Call" className="feature-icon" />
                                        <Typography variant="h6">Book a Video Call</Typography>
                                    </Card>
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <Card className="feature-card">
                                        <img src={icon1} alt="Find Helpful Tools" className="feature-icon" />
                                        <Typography variant="h6">Find Helpful Tools</Typography>
                                    </Card>
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <Card className="feature-card">
                                        <img src={icon1} alt="Take a Quick Survey" className="feature-icon" />
                                        <Typography variant="h6">Take a Quick Survey</Typography>
                                    </Card>
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <Card className="feature-card">
                                        <img src={icon1} alt="Self-Help Library" className="feature-icon" />
                                        <Typography variant="h6">Self-Help Library</Typography>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <img src={psychologistImage} alt="psychologistImage" className="psychologistImage" style={{ marginTop: '30px' }} />
                        </Grid>

                    </Grid>
                </Container>
            </div>

            {/* Zahlen (100 Ärzte usw.) */}
            <div className="stats-section">
                <Container maxWidth="lg">
                    <Grid container justifyContent="center" spacing={3}>
                        <Grid item xs={3}>
                            <Typography variant="h4">100</Typography>
                            <Typography>Doctors</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="h4">750</Typography>
                            <Typography>Patients</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="h4">250</Typography>
                            <Typography>Tests</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="h4">100+</Typography>
                            <Typography>Sessions Completed</Typography>
                        </Grid>
                    </Grid>
                </Container>
            </div>

            {/* Weitere Abschnitte */}
            <div className="appointment-section">
                <Container maxWidth="lg">
                    <Typography variant="h5" align="center" style={{ marginTop: '40px' }}>
                        Book an Appointment with a Psychologist
                    </Typography>
                    <Grid container spacing={4} style={{ marginTop: '20px' }}>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card>
                                <CardContent>
                                    <img src={icon1} alt="Professional Support" style={{ width: '100%' }} />
                                    <Typography>Professional support in a warm, confidential setting...</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card>
                                <CardContent>
                                    <img src={icon1} alt="Easily Book Appointment" style={{ width: '100%' }} />
                                    <Typography>Easily book your appointment online at any time...</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card>
                                <CardContent>
                                    <img src={icon1} alt="Flexible Online Sessions" style={{ width: '100%' }} />
                                    <Typography>Enjoy flexible online sessions from your home...</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <Card>
                                <CardContent>
                                    <img src={icon1} alt="Confidential Conversations" style={{ width: '100%' }} />
                                    <Typography>Confidential conversations focused on your well-being...</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </div>

            <div className="footer">
                <Typography variant="body1" align="center">
                    &copy; 2023, MindEase. All rights reserved.
                </Typography>
            </div>
        </>
    )
}

export default HomePage
