import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import '@/App.css';
import client from "../axios/APIinitializer.jsx";

const ResourcesPage = () => {
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await client.get('/api/exercises');
                setExercises(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching exercises:', err);
                setError('Failed to load exercises.');
                setLoading(false);
            }
        };

        fetchExercises();
    }, []);

    if (loading) return <p>Loading exercises...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <NavBar />
            <div className="resources-container">
                <h1 className="resources-title">Mental Health Exercises</h1>
                <p className="resources-subtitle">Explore evidence-based exercises for mental well-being:</p>
                <div className="resources-grid">
                    {exercises && exercises.map((exercise, index) => (
                        <div key={index} className="exercise-card">
                            <p className="exercise-type">{exercise.type}</p>
                            <img src={exercise.image} alt={exercise.title} className="exercise-image" />
                            <h2 className="exercise-title">{exercise.title}</h2>
                            <div className="exercise-steps">
                                {exercise.description.map((step, stepIndex) => (
                                    <p key={stepIndex} className="exercise-step">
                                        <strong>{stepIndex + 1}.</strong> {step}
                                    </p>
                                ))}
                            </div>
                            <p><strong>Benefits:</strong> {exercise.benefits}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ResourcesPage;
