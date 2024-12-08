import React, { useState, useEffect } from 'react';
import { getAppointmentsByUserId } from '../services/appointmentApiService'; // Dein Service

const Appointments = ({ userId }) => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const data = await getAppointmentsByUserId(userId);
                setAppointments(data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        if (userId) {
            fetchAppointments(); // Nur abrufen, wenn userId existiert
        }
    }, [userId]);

    return (
        <div>
            <h2>Appointments</h2>
            <ul>
                {appointments.map(appointment => (
                    <li key={appointment.id}>
                        {appointment.appointmentDateTime} - {appointment.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Appointments;
