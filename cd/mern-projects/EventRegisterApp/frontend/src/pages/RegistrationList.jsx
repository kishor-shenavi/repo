import React, { useState, useEffect } from 'react';
import { getRegistrations } from '../services/registrationService';

const RegistrationList = () => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const fetchRegistrations = async () => {
        try {
            const { data } = await getRegistrations();
            setRegistrations(data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch registrations.');
            setLoading(false);
        }
    };

    if (loading) return <div style={{textAlign: 'center', padding: '2rem'}}>Loading registrations...</div>;
    if (error) return <div style={{textAlign: 'center', color: '#ef4444', padding: '2rem'}}>{error}</div>;

    return (
        <div className="registration-table-container">
            {registrations.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Event</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registrations.map(reg => (
                            <tr key={reg._id}>
                                <td>{reg.name}</td>
                                <td>{reg.email}</td>
                                <td>{reg.eventId?.title || 'Unknown Event'}</td>
                                <td>{reg.eventId ? new Date(reg.eventId.date).toLocaleDateString() : 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div style={{textAlign: 'center', padding: '4rem'}}>
                    <p className="subtitle">No registrations found yet.</p>
                </div>
            )}
        </div>
    );
};

export default RegistrationList;
