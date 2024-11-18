import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    Box,
    Button,
    Alert
} from '@mui/material';
import NavBar from '@/Components/NavBar'

const questions = [
    { id: 25, text: "Sudden attacks of panic with palpitations, shortness of breath, faintness, or other frightening bodily sensations" },
    { id: 29, text: "Fear of being outside home alone" },
    { id: 30, text: "Feeling afraid in streets or open places" },
    { id: 31, text: "Fear of fainting in public" },
    { id: 32, text: "Feeling afraid of travelling by bus, train, or car" },
    { id: 2, text: "Feeling easily irritated or annoyed" },
    { id: 20, text: "Feeling anxious or fearful" },
    { id: 22, text: "Tension or inability to relax" },
    { id: 23, text: "Excessive worry about several different things" },
    { id: 24, text: "Feeling so restless that it is hard to sit still" },
    { id: 26, text: "Easily startled" }
];

const Questionnaire = () => {
    const [responses, setResponses] = useState({});
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleResponseChange = (questionId, value) => {
        setResponses(prevResponses => ({
            ...prevResponses,
            [questionId]: value
        }));
    };

    const handleSubmit = () => {
        const unansweredQuestions = questions.filter(q => responses[q.id] === undefined);
        if (unansweredQuestions.length > 0) {
            setError(true);
        } else {
            setError(false);
            console.log("Submitted Responses:", responses);
            navigate("/suggestions", {
                state: {
                    responses,
                },
            });
        }
    };

    return (
        <>
        <NavBar />
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Typography variant="h4" gutterBottom align="center">
                Feelings Questionnaire
            </Typography>
            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    Please answer all questions before submitting!
                </Alert>
            )}
            {questions.map((question) => (
                <Box key={question.id} sx={{ mb: 3 }}>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        {question.id}. {question.text}
                    </Typography>
                    <FormControl component="fieldset" required={true}>
                        <RadioGroup
                            row
                            value={responses[question.id] || ""}
                            onChange={(e) => handleResponseChange(question.id, parseInt(e.target.value))}

                        >
                            {[0, 1, 2, 3, 4].map((value) => (
                                <FormControlLabel
                                    key={value}
                                    value={value}
                                    control={<Radio />}
                                    label={value.toString()}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Box>
            ))}
            <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </Box>
        </Container>
        </>
    );
};

export default Questionnaire;
