import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import '@/App.css';
import client from "../axios/APIinitializer.jsx";

const ResourcesPage = () => {
    const [exercises, setExercises] = useState([]);
    const [filteredExercises, setFilteredExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterType, setFilterType] = useState("all");
    const [exerciseTypes, setExerciseTypes] = useState([]);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await client.get('/api/exercises');
                const data = response.data;

                // Process types: Split type string into arrays and extract unique types
                const processedData = data.map(ex => ({
                    ...ex,
                    type: ex.type.split(',').map(t => t.trim()) // Split into array and trim whitespace
                }));

                const types = [
                    ...new Set(processedData.flatMap(ex => ex.type)) // Unique types
                ];

                setExercises(processedData);
                setFilteredExercises(processedData);
                setExerciseTypes(types);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching exercises:', err);
                setError('Failed to load exercises.');
                setLoading(false);
            }
        };

        fetchExercises();
    }, []);

    // Handle filtering
    const handleFilterChange = (e) => {
        const selectedType = e.target.value;
        setFilterType(selectedType);

        if (selectedType === "all") {
            setFilteredExercises(exercises);
        } else {
            setFilteredExercises(
                exercises.filter(ex => ex.type.includes(selectedType))
            );
        }
    };

    if (loading) return <p>Loading exercises...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <NavBar />
            <div className="resources-container">
                <h1 className="resources-title">Mental Health Exercises</h1>
                <p className="resources-subtitle">Explore evidence-based exercises for mental well-being:</p>

                {/* Filter Section */}
                <div className="filter-container">
                    <label htmlFor="filter">Filter by Type: </label>
                    <select
                        id="filter"
                        value={filterType}
                        onChange={handleFilterChange}
                        className="filter-dropdown"
                    >
                        <option value="all">All</option>
                        {exerciseTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                {/* Resources Grid */}
                <div className="resources-grid">
                    {filteredExercises.map(exercise => (
                        <div key={exercise.id} className="exercise-container">
                            {/* Types displayed above image */}
                            <p className="exercise-type">
                                {exercise.type.join(", ").toUpperCase()}
                            </p>

                            {/* Exercise Image */}
                            {exercise.image ? (
                                <img
                                    src={exercise.image}
                                    alt={exercise.title}
                                    className="exercise-image"
                                />
                            ) : (
                                <img
                                    src="https://via.placeholder.com/300x150"
                                    alt="Placeholder"
                                    className="exercise-image"
                                />
                            )}

                            {/* Exercise Information */}
                            <h2 className="exercise-title">{exercise.title}</h2>
                            <p>{exercise.description}</p>
                            <p><strong>Duration:</strong> {exercise.duration}</p>
                            <p><strong>Benefits:</strong> {exercise.benefits}</p>
                        </div>
                    ))}
                </div>

                {/* Additional Resources Section */}
                <div className="additional-resources">
                    <h2 className="resources-title">Additional Resources</h2>
                    <p className="resources-description">
                        Explore trusted tools, guides, and strategies to support your mental health journey. 
                        Below are resources curated from leading organizations like WHO and the Mental Health Foundation.
                    </p>

                    <div className="resource-cards-container">
                        {/* WHO Resources */}
                        <div className="resource-card">
                            <div className="resource-content">
                                <h3 className="resource-title">Mindfulness Guide</h3>
                                <p className="resource-description">
                                    Access MHF’s comprehensive guide for practicing mindfulness.
                                </p>
                                <a
                                    href="https://www.mentalhealth.org.uk/explore-mental-health/a-z-topics/mindfulness"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="resource-link"
                                >
                                    View Resource
                                </a>
                                <p className="resource-credit">Source: Mental Health Foundation</p>
                            </div>
                        </div>

                        <div className="resource-card">
                            <div className="resource-content">
                                <h3 className="resource-title">Managing Anxiety</h3>
                                <p className="resource-description">
                                    Mind’s advice for managing anxiety and panic attacks.
                                </p>
                                <a
                                    href="https://www.mind.org.uk/information-support/types-of-mental-health-problems/anxiety-and-panic-attacks/self-care/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="resource-link"
                                >
                                    View Resource
                                </a>
                                <p className="resource-credit">Source: Mind</p>
                            </div>
                        </div>

                        <div className="resource-card">
                            <div className="resource-content">
                                <h3 className="resource-title">Suicide Prevention</h3>
                                <p className="resource-description">
                                    Learn about WHO’s steps and strategies to prevent suicide worldwide.
                                </p>
                                <a
                                    href="https://www.who.int/news-room/fact-sheets/detail/suicide"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="resource-link"
                                >
                                    View Resource
                                </a>
                                <p className="resource-credit">Source: World Health Organization</p>
                            </div>
                        </div>

                        {/* Mental Health Foundation Resources */}
                        <div className="resource-card">
                            <div className="resource-content">
                                <h3 className="resource-title">How to Manage Stress</h3>
                                <p className="resource-description">
                                    Discover practical tips for identifying and coping with stress effectively.
                                </p>
                                <a
                                    href="https://www.mentalhealth.org.uk/explore-mental-health/publications/how-manage-and-reduce-stress"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="resource-link"
                                >
                                    View Resource
                                </a>
                                <p className="resource-credit">Source: Mental Health Foundation</p>
                            </div>
                        </div>

                        <div className="resource-card">
                            <div className="resource-content">
                                <h3 className="resource-title">OCD: How to Manage</h3>
                                <p className="resource-description">
                                    Learn about ways to help with your OCD disorder.
                                </p>
                                <a
                                    href="https://www.mind.org.uk/information-support/types-of-mental-health-problems/obsessive-compulsive-disorder-ocd/self-care-for-ocd/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="resource-link"
                                >
                                    View Resource
                                </a>
                                <p className="resource-credit">Source: Mind</p>
                            </div>
                        </div>

                        <div className="resource-card">
                            <div className="resource-content">
                                <h3 className="resource-title">About Mental Health</h3>
                                <p className="resource-description">
                                    General information about mental health and how to self-help.
                                </p>
                                <a
                                    href="https://www.mind.org.uk/information-support/types-of-mental-health-problems/mental-health-problems-introduction/about-mental-health-problems/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="resource-link"
                                >
                                    View Resource
                                </a>
                                <p className="resource-credit">Source: Mind</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResourcesPage;
