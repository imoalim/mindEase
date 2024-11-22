import React, { useState, useEffect } from "react";
import { Router, useLocation } from "react-router-dom";
import { Container, Typography, Button, Grid2 } from "@mui/material";
import { GoogleGenerativeAI } from "@google/generative-ai";
import NavBar from './NavBar.jsx';
import '../css/Questionnaire.css';
import { ChevronRight, ChevronLeft } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';



function AIExplainer() {
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const responses = location.state?.responses || {};
    const navigate = useNavigate();

    const PROMPT = `Based on the Emotional State Questionnaire (EST-Q), write a small conclusion, like you would be a psychologist explaining in the 3rd person addressing to your client(without giving too much context from the prompt and without suggesting making meetings together)  of an analysis for the category which is more probable from the 2 categories(Anxiety and Panic), the questions from the input asses. The analysis should sound like a recommendation for an individual to try some self help exercises for panic/ anxiety, or it can be advised that there does not seem to be the case to exercise, depending on the input. This is the input:
  ${JSON.stringify(responses)}
  the first number represents the number of the question from the questionnaire and the other one is the number picked from the range.`;


    const genAI = new GoogleGenerativeAI("AIzaSyCceAjfzLAeFp4u8ixO24bub89nQhbIXcs");

    const fetchResponse = async () => {
        setLoading(true);
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(PROMPT);

            setResponse(result.response.text());
        } catch (error) {
            console.error("Error generating response:", error);
            setResponse("Failed to fetch response.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResponse();
    }, []);

    return (
        <>
            <NavBar />
            <Container className="formstyle" maxWidth="md" sx={{ mt: 5 }}>
                <Typography variant="h4" sx={{ pb: 3 }}>
                    Recommendations
                </Typography>
                {response ?
                    <div>
                        <Typography variant="h6" >
                            {response}
                        </Typography>
                        <Grid2 container spacing={4} sx={{ mt: 3, mb: 2, display: "flex", justifyContent: "space-between" }}>

                            <Grid2 justifyContent="center" alignItems="start" sx={{flexGrow: 1, display: "flex"}}>
                                <Button variant="contained" sx={{ backgroundColor: "#87CEEB", width:370}} onClick={() => navigate("/")}>
                                    <ChevronLeft />
                                    Back to the Homepage
                                </Button>
                            </Grid2>
                            <Grid2 justifyContent="center" alignItems="end" sx={{flexGrow: 1, display: "flex"}}>
                                <Button variant="contained" sx={{ backgroundColor: "#87CEEB", width:370 }} >
                                    <ChevronRight />
                                    Check out our self-help exercises
                                </Button>
                            </Grid2>
                        </Grid2>
                    </div>

                    : <Typography variant="h6" >
                        Loading...
                    </Typography>
                }





            </Container>
        </>
    );
}

export default AIExplainer;
