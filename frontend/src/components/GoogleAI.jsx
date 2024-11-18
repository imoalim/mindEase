import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";
import { GoogleGenerativeAI } from "@google/generative-ai";
import NavBar from './NavBar.jsx';



function AIExplainer() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const responses = location.state?.responses || {};

  const PROMPT = `Based on the Emotional State Questionnaire (EST-Q), write only the word for the category picked from the 2 categories(Anxiety and Panic), the questions from the input asses. This is the input:
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
    <NavBar/>
    <Container>
      <Typography variant="h4" >
        Recommendations
      </Typography>
      <Typography variant="h6" >
        Response: We suggest you checkout the self exercises for: {response || "Fetching response..."}
      </Typography>
      
    {/* for the next part, the exrcises page will be linked here */}

    </Container>
    </>
  );
}

export default AIExplainer;
