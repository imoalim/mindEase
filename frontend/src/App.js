import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import TherapyServices from './components/TherapyServices';
import Login from './components/Login'; // Importiere die Login-Komponente

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/therapy-services" element={<TherapyServices />} />
                <Route path="/login" element={<Login />} /> {/* Login Route hinzufügen */}
            </Routes>
        </Router>
    );
};

export default App;
