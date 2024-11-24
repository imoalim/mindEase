import React from 'react'
import { Container, Grid, Typography, Card, CardContent } from '@mui/material'
import NavBar from '@/Components/NavBar'
import '@/App.css'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import icon1 from '@/assets/pictures/icon1.png'
import psychologistImage from '@/assets/pictures/hero.png'
import image1 from '@/assets/pictures/image1.png'
import background from '@/assets/pictures/background.jpg'
import survey from '@/assets/pictures/survey.png'
import videocall from '@/assets/pictures/videocall.png'
import tool from '@/assets/pictures/tool.png'
import book from '@/assets/pictures/book.png'
import book2 from '@/assets/pictures/book2.jpg'
import mood from '@/assets/pictures/mood.jpg'
import meditation from '@/assets/pictures/meditation.jpg'
import therapie from '@/assets/pictures/therapie.jpg'
import appointment from '@/assets/pictures/appointment.jpg'
import session from '@/assets/pictures/session.jpg'
import security from '@/assets/pictures/security.jpg'


const HomePage = () => {

    const settings = {
        dots: true, // Zeigt Punkte für den Slider
        infinite: true, // Unendlich Schleifen
        speed: 500, // Übergangsgeschwindigkeit
        autoplay: true, // Automatisch abspielen
        autoplaySpeed: 5000, // Alle 5 Sekunden wechseln
        slidesToShow: 1, // Nur ein Bild gleichzeitig anzeigen
        slidesToScroll: 1, // Ein Bild auf einmal scrollen
    };
    return (
        <>
            <NavBar/>
            <div className="hero-section">
                <Container maxWidth="lg" style={{padding: '20px'}}>
                    <Grid container alignItems="center">
                        <Grid item xs={12} md={6}>
                            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap"
                                  rel="stylesheet"/>

                            <Typography variant="h3" className="hero-title">
                                Discover support for your mental well-being
                            </Typography>

                            <Grid container spacing={2} className="features">
                                <Grid item xs={6} md={3}>
                                    <Card className="feature-card">
                                        <img src={videocall} alt="Book a Video Call" className="feature-icon"/>
                                        <Typography variant="h6">Book a Video Call</Typography>
                                    </Card>
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <Card className="feature-card">
                                        <img src={tool} alt="Find Helpful Tools" className="feature-icon"/>
                                        <Typography variant="h6">Find Helpful Tools</Typography>
                                    </Card>
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <Card className="feature-card">
                                        <img src={survey} alt="Take a Quick Survey" className="feature-icon"/>
                                        <Typography variant="h6">Take a Quick Survey</Typography>
                                    </Card>
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <Card className="feature-card">
                                        <img src={book} alt="Self-Help Library" className="feature-icon"/>
                                        <Typography variant="h6">Self-Help Library</Typography>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <img
                                src={psychologistImage}
                                alt="psychologistImage"
                                className="psychologistImage"
                                style={{marginTop: '30px'}}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </div>

            <div className="activities-section">
                <Container maxWidth="lg">
                    <Typography
                        variant="h4"
                        className="activities-title"
                        sx={{
                            fontSize: '3rem !important',
                            fontFamily: 'Poppins, sans-serif !important',
                            textAlign: 'center',
                        }}
                    >
                        Key Features & Activities
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        className="activities-subtitle"
                        sx={{
                            fontSize: '1.5rem !important',
                            color: '#555 !important',
                            textAlign: 'center !important',
                            transition: 'color 0.3s ease, text-shadow 0.3s ease',
                            '&:hover': {
                                color: '#00a0e1',
                                textShadow: '1px 1px 10px rgba(0, 160, 225, 0.7)',
                            },
                        }}
                    >
                        Explore how our app empowers users to improve their mental well-being through personalized
                        support and tools.
                    </Typography>
                    <Grid container spacing={4} className="activities-grid">
                        <Grid item xs={12} md={4}>
                            <Card className="activity-card card">
                                <img src={book2} alt="Personalized Therapy" className="activity-icon"/>
                                <Typography variant="h6">Personalized Therapy</Typography>
                                <Typography variant="body2">
                                    Get matched with licensed therapists tailored to your needs for effective sessions.
                                </Typography>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card className="activity-card card">
                                <img src={mood} alt="Mood Tracking" className="activity-icon"/>
                                <Typography variant="h6">Mood Tracking</Typography>
                                <Typography variant="body2">
                                    Track your mood daily and gain insights into your mental health patterns over time.
                                </Typography>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Card className="activity-card card">
                                <img src={meditation} alt="Self-Help Exercises" className="activity-icon"/>
                                <Typography variant="h6">Self-Help Exercises</Typography>
                                <Typography variant="body2">
                                    Access a library of guided exercises to help you manage stress and anxiety
                                    effectively.
                                </Typography>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </div>


            {/* Zahlen (100 Ärzte usw.) */}
            <div className="stats-section"
                 style={{padding: '40px 0', backgroundColor: '#f5f5f5', position: 'relative'}}>
                {/* Schwebende Punkte */}
                {[...Array(5)].map((_, index) => (
                    <div
                        key={index}
                        className="floating-dot"
                        style={{
                            position: 'absolute',
                            width: '30px',
                            height: '30px',
                            top: `${Math.random() * 100}%`,  // Zufällige Höhe
                            left: `${Math.random() * 100}%`,  // Zufällige Position von links
                            animation: `float ${Math.random() * 10 + 10}s infinite linear`,  // Animation für Bewegung
                            animationDuration: `${Math.random() * 5 + 10}s`,
                            animationDelay: `${Math.random() * 2}s`,
                            pointerEvents: 'none', // Damit die Punkte nicht mit den anderen Elementen interagieren
                        }}
                    >
                        {/* Form auswählen: Punkt, Kreuz oder Dreieck */}
                        {index === 0 || index === 1 ? (
                            <div className="dot"></div> // Weiße Punkte
                        ) : index === 2 || index === 3 ? (
                            <div className="cross"></div> // Weiße Kreuze
                        ) : (
                            <div className="triangle"></div> // Weißes Dreieck
                        )}
                    </div>
                ))}
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


            <div className="slider-container">
                <Typography variant="h3" className="slider-heading">
                    Discover Our Services
                </Typography>
                <Slider {...settings}>
                    <div className="slider-item">
                        <img
                            src={therapie}
                            alt="Professional Support"
                            className="slider-image"
                        />
                        <Typography variant="body1" className="slider-description">
                            Professional support in a warm, confidential setting...
                        </Typography>
                    </div>
                    <div className="slider-item">
                        <img
                            src={appointment}
                            alt="Easily Book Appointment"
                            className="slider-image"
                        />
                        <Typography variant="body1" className="slider-description">
                            Easily book your appointment online at any time...
                        </Typography>
                    </div>
                    <div className="slider-item">
                        <img
                            src={session}
                            alt="Flexible Online Sessions"
                            className="slider-image"
                        />
                        <Typography variant="body1" className="slider-description">
                            Enjoy flexible online sessions from your home...
                        </Typography>
                    </div>
                    <div className="slider-item">
                        <img
                            src={security}
                            alt="Confidential Conversations"
                            className="slider-image"
                        />
                        <Typography variant="body1" className="slider-description">
                            Confidential conversations focused on your well-being...
                        </Typography>
                    </div>
                </Slider>
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
