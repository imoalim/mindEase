import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import TherapyServices from './components/TherapyServices'; // Stelle sicher, dass die Datei existiert
// Importiere andere Seiten hier... TEST TEST

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/therapy-services" element={<TherapyServices />} />
                {/* Füge hier weitere Routen hinzu */}
            </Routes>
        </Router>
    );
};

export default App;
