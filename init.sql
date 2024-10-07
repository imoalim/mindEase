-- create the database/schema
CREATE TABLE IF NOT EXISTS User (
                                    id SERIAL PRIMARY KEY,
                                    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
    );

CREATE TABLE IF NOT EXISTS UserProfile (
                                           id SERIAL PRIMARY KEY,
                                           firstName VARCHAR(255),
    lastName VARCHAR(255),
    age INT,
    gender VARCHAR(50),
    mentalHealthIssues TEXT,
    userId INT REFERENCES User(id)
    );

CREATE TABLE IF NOT EXISTS TherapistProfile (
                                                id SERIAL PRIMARY KEY,
                                                licenseNumber VARCHAR(255),
    specialties TEXT,
    experienceYears INT,
    userId INT REFERENCES User(id)
    );

CREATE TABLE IF NOT EXISTS SelfHelpExercise (
                                                id SERIAL PRIMARY KEY,
                                                title VARCHAR(255),
    description TEXT,
    category VARCHAR(100),
    content TEXT,
    userId INT REFERENCES User(id)
    );

CREATE TABLE IF NOT EXISTS Appointment (
                                           id SERIAL PRIMARY KEY,
                                           date DATE,
                                           time TIME,
                                           status VARCHAR(50),
    userId INT REFERENCES User(id),
    therapistId INT REFERENCES TherapistProfile(id)
    );

CREATE TABLE IF NOT EXISTS Feedback (
                                        id SERIAL PRIMARY KEY,
                                        rating INT,
                                        comment TEXT,
                                        appointmentId INT REFERENCES Appointment(id)
    );

-- optional example data
INSERT INTO User (username, email, password, role) VALUES ('johndoe', 'john@example.com', 'securepassword', 'USER');
INSERT INTO UserProfile (firstName, lastName, age, gender, mentalHealthIssues, userId) VALUES ('John', 'Doe', 30, 'Male', 'Anxiety', 1);
INSERT INTO TherapistProfile (licenseNumber, specialties, experienceYears, userId) VALUES ('T12345', 'Cognitive Behavioral Therapy', 10, 1);
