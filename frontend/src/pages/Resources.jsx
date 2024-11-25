import React from 'react';
import NavBar from '@/components/NavBar';
import '@/App.css';

const exercises = [
    {
        title: "Mindful Breathing",
        description: [
            "Find a quiet place and sit comfortably with your back straight.",
            "Close your eyes and focus on your breath.",
            "Slowly inhale through your nose, counting to four, and exhale through your mouth, also counting to four.",
            "If your mind wanders, gently return your focus to your breath.",
            "Continue for 5–10 minutes."
        ],
        benefits: "Reduces stress, enhances focus, and calms anxiety symptoms.",
        type: "Anxiety, stress, emotional regulation",
        image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    },
    {
        title: "Progressive Muscle Relaxation",
        description: [
            "Find a comfortable position, either sitting or lying down.",
            "Start by tensing the muscles in your toes, hold for 5 seconds, then relax.",
            "Move up through each muscle group (legs, abdomen, arms, neck).",
            "Focus on the difference between tension and relaxation.",
            "Repeat as needed for full-body relaxation."
        ],
        benefits: "Relieves physical tension and promotes relaxation.",
        type: "Anxiety, insomnia, chronic stress",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    },
    {
        title: "Behavioral Activation",
        description: [
            "Identify enjoyable or meaningful activities you've stopped doing.",
            "Schedule a specific time for these activities.",
            "Gradually increase engagement."
        ],
        benefits: "Boosts mood and restores routine.",
        type: "Depression",
        image: "https://media.istockphoto.com/id/1285301614/photo/young-man-arms-outstretched-by-the-sea-at-sunrise-enjoying-freedom-and-life-people-travel.jpg?s=612x612&w=0&k=20&c=0QW6GnkuFNYcPZhy26XVHuTc2avJTK8u6l_1iT0SlZk=",
    },
    {
        title: "Cognitive Restructuring",
        description: [
            "Write down a negative thought that's troubling you.",
            "List evidence for and against the thought’s validity.",
            "Challenge any exaggerated or unhelpful aspects.",
            "Replace it with a balanced, realistic statement.",
            "Repeat this exercise for other challenging thoughts."
        ],
        benefits: "Helps reframe negative thinking patterns and develop healthier thought processes.",
        type: "Depression, OCD, anxiety",
        image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d",
    },
    {
        title: "Gratitude Journaling",
        description: [
            "Take a notebook and each day, write down three things you’re grateful for.",
            "These can be big or small (e.g., “Had a great conversation with a friend”).",
            "Reflect on why you appreciate these things and how they impact your life.",
            "Spend 5 minutes doing this each day, ideally in the morning or before bed."
        ],
        benefits: "Improves mental well-being, shifts focus from negative to positive.",
        type: "Depression, low self-esteem",
        image: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f",
    },
    {
        title: "Visualization of Ideal Self",
        description: [
            "Sit comfortably and close your eyes.",
            "Visualize yourself as the best version of you, embodying qualities you admire.",
            "Imagine how you’d feel, act, and respond in different situations.",
            "Focus on one key quality you’d like to strengthen today.",
            "Carry this visualization with you throughout the day."
        ],
        benefits: "Builds confidence, motivates goal-setting, and enhances self-image.",
        type: "Goal setting, motivation, low self-confidence",
        image: "https://www.shutterstock.com/shutterstock/photos/621907370/display_1500/stock-vector-flat-d-isometric-businessman-see-himself-being-successful-in-the-mirror-successful-career-concept-621907370.jpg",
    },
    {
        title: "Thought-Logging and Analysis",
        description: [
            "In a journal, write down recurring thoughts or worries each day.",
            "Note the triggers and your responses.",
            "Review your entries to find patterns in your thinking.",
            "Reflect on how you might reframe or handle these thoughts differently."
        ],
        benefits: "Raises awareness of thought patterns, promotes healthier responses to stress.",
        type: "OCD, anxiety, depression",
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Savoring the Moment",
        description: [
            "When you experience a pleasant moment, pause and focus on it.",
            "Notice what makes this experience enjoyable, using all your senses.",
            "Take a few deep breaths to fully appreciate the moment.",
            "Reflect on how it makes you feel and let it lift your mood."
        ],
        benefits: "Boosts mood and mindfulness, encourages appreciation of the present.",
        type: "Depression, stress, general well-being",
        image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    },
    {
        title: "Self-Compassion Exercise",
        description: [
            "Think of a challenging situation or personal criticism.",
            "Consider what a friend would say to support you in this moment.",
            "Speak to yourself with this kind, understanding tone.",
            "Remind yourself that it’s okay to make mistakes and have setbacks.",
            "Practice this whenever you feel self-critical."
        ],
        benefits: "Reduces self-criticism, promotes emotional resilience, enhances self-worth.",
        type: "Depression, self-criticism, perfectionism",
        image: "https://images.unsplash.com/photo-1636580692411-35f2d83ed6aa?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        title: "Daily Affirmations",
        description: [
            "Choose positive statements that resonate (e.g., ‘I am capable’).",
            "Say these affirmations aloud each morning or when you feel challenged.",
            "Focus on the meaning behind the words as you say them.",
            "Repeat each affirmation 3–5 times, letting it sink in."
        ],
        benefits: "Boosts self-esteem, reduces negative self-talk, builds resilience.",
        type: "Low self-esteem, self-doubt, building resilience",
        image: "https://images.unsplash.com/photo-1609348955382-71d6d3036160?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    }
];

const ResourcesPage = () => {
    return (
        <>
            <NavBar />
            <div className="resources-container">
                <h1 className="resources-title">Mental Health Exercises</h1>
                <p className="resources-subtitle">Explore evidence-based exercises for mental well-being:</p>
                <div className="resources-grid">
                    {exercises.map((exercise, index) => (
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
