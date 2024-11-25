-- create the database/schema
CREATE TABLE IF NOT EXISTS Users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS UserQuestionnaire (
    id SERIAL PRIMARY KEY,
    q2 INT NOT NULL,
    q20 INT NOT NULL,
    q22 INT NOT NULL,
    q23 INT NOT NULL,
    q24 INT NOT NULL,
    q25 INT NOT NULL,
    q26 INT NOT NULL,
    q29 INT NOT NULL,
    q30 INT NOT NULL,
    q31 INT NOT NULL,
    q32 INT NOT NULL,
    recommendation TEXT NOT NULL,
    user_id INT NOT NULL REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS UserProfiles (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    age INT,
    gender VARCHAR(50),
    mentalHealthIssues TEXT,
    userId INT REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS TherapistProfiles (
    id SERIAL PRIMARY KEY,
    licenseNumber VARCHAR(255),
    specialties TEXT,
    experienceYears INT,
    userId INT REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS Appointments(
    id SERIAL PRIMARY KEY,
    userId INT REFERENCES Users(id),
    therapistId INT REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS SelfHelpExercises (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    category VARCHAR(100),
    content TEXT,
    therapistId INT REFERENCES TherapistProfiles(id)
);

CREATE TABLE IF NOT EXISTS Feedbacks (
    id SERIAL PRIMARY KEY,
    rating INT,
    comment TEXT,
    appointmentId INT REFERENCES Appointments(id)
);

CREATE TABLE IF NOT EXISTS user_roles (
    id       SERIAL PRIMARY KEY,
    user_id   INT REFERENCES Users(id),
    role_name varchar(50) NOT NULL UNIQUE
);

-- optional example data
-- INSERT INTO Users (username, email, userRole) VALUES ('johndoe', 'john@example.com', 'USER');
-- INSERT INTO UserProfiles (firstName, lastName, age, gender, mentalHealthIssues, userId) VALUES ('John', 'Doe', 30, 'Male', 'Anxiety', 1);
-- INSERT INTO TherapistProfiles (licenseNumber, specialties, experienceYears, userId) VALUES ('T12345', 'Cognitive Behavioral Therapy', 10, 1);
