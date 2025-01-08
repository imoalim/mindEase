import React, { useState, useEffect } from "react";
import { Router, useLocation } from "react-router-dom";
import { Container, Typography, Button, Grid2 } from "@mui/material";
import { GoogleGenerativeAI } from "@google/generative-ai";
import NavBar from '../components/NavBar.jsx';
import '../css/Questionnaire.css';
import { ChevronRight, ChevronLeft, Verified } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import UserDetailsAPI from "../axios/UserDetailsAPI.jsx";
import client from "../axios/APIinitializer.jsx";
import {useAuth} from "../services/AuthProvider.jsx";
import axios from "axios";



function RecommendationsPage() {
    const [AIresponse, setAIResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const responses = location.state?.responses || {};
    const navigate = useNavigate();
    const [currentUserId, setCurrentUserId] = useState(null)
    const {isAuthenticated, isVerified, user} = useAuth()

    useEffect(() => {
        if(!isAuthenticated || isVerified) {
            navigate('/login')
            return
        }

        const checkVerificationStep = () => {
            if(user.verificationStep == 1) {
                navigate('/complete-profile')
            } else if(user.verificationStep == 2) {
                if (user.selectedRole !== 'USER') {
                    navigate('/')
                } else {
                    navigate('/questionnaire')
                }
            }
        }

        checkVerificationStep();
    }, []);

    const createUserQuestionnairePayload = (responses) => {
        return {
            q2: responses["2"] || null,
            q20: responses["20"] || null,
            q22: responses["22"] || null,
            q23: responses["23"] || null,
            q24: responses["24"] || null,
            q25: responses["25"] || null,
            q26: responses["26"] || null,
            q29: responses["29"] || null,
            q30: responses["30"] || null,
            q31: responses["31"] || null,
            q32: responses["32"] || null,
            userId: currentUserId 
        };
    };

    const PROMPT = `Based on the Emotional State Questionnaire (EST-Q), write a small conclusion, like you would be a psychologist explaining in the 3rd person addressing to your client(without giving too much context from the prompt and without suggesting making meetings together)  of an analysis for the category which is more probable from the 2 categories(Anxiety and Panic), the questions from the input asses. The analysis should sound like a recommendation for an individual to try some self help exercises for panic/ anxiety, or it can be advised that there does not seem to be the case to exercise, depending on the input. This is the input:
  ${JSON.stringify(responses)}
  the first number represents the number of the question from the questionnaire and the other one is the number picked from the range.`;


    const genAI = new GoogleGenerativeAI("AIzaSyCPqm-AhCLzpAme6MkA6SiCj4fJZglLOxI");
    

    const fetchResponse = async () => {
        setLoading(true);
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(PROMPT);

            setAIResponse(result.response.text());
            submitAnswers(result.response.text());
        } catch (error) {
            console.error("Error generating response:", error);
            setAIResponse("Failed to fetch response.");
        } finally {
            setLoading(false);
        }
    };

    const getCurrentUser = async () =>{
        try{
            const response = await client.get("/api/users/meId")
            setCurrentUserId(response.data);
        } catch(error){
            console.error('Error retrieving current user');
        }

    }

    const submitAnswers = async () => {
        const payload = createUserQuestionnairePayload(responses);
    
        try {
            const response = await UserDetailsAPI.createUserQuestionnaire(payload);
    
            
            if (response.status === 201) {
                console.log('Submission successful:'); 
            } else {
                console.error('Unexpected response status:', response.status);
            }
        } catch (error) {
            console.error('Error submitting questionnaire:', error);
        }
    };
    

    useEffect(() => {
        getCurrentUser();
    })

    useEffect(() => {
        if(currentUserId)
        {
            fetchResponse();
        } 
    }, [currentUserId]);

    return (
        <>
            <NavBar />
            <Container className="formstyle" maxWidth="md" sx={{ mt: 5 }}>
                <Typography variant="h4" sx={{ pb: 3 }}>
                    Recommendations
                </Typography>
                {AIresponse ?
                    <div>
                        <Typography variant="h6" >
                            {AIresponse}
                        </Typography>
                        <Grid2 container spacing={4} sx={{ mt: 3, mb: 2, display: "flex", justifyContent: "space-between" }}>

                            <Grid2 justifyContent="center" alignItems="start" sx={{flexGrow: 1, display: "flex"}}>
                                <Button variant="contained" sx={{ backgroundColor: "#87CEEB", width:370}} onClick={() => navigate("/")}>
                                    <ChevronLeft />
                                    Back to the Homepage
                                </Button>
                            </Grid2>
                            <Grid2 justifyContent="center" alignItems="end" sx={{flexGrow: 1, display: "flex"}}>
                                <Button variant="contained" sx={{ backgroundColor: "#87CEEB", width:370 }} onClick={() => navigate("/resources")} >
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

export default RecommendationsPage;
