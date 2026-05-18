import React, { useState, useEffect } from 'react';
import { getEvents } from '../services/eventService';

const EventList = ({ onRegisterClick }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const { data } = await getEvents();
            setEvents(data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch events. Please try again later.');
            setLoading(false);
        }
    };

    if (loading) return <div style={{textAlign: 'center', padding: '2rem'}}>Loading events...</div>;
    if (error) return <div style={{textAlign: 'center', color: '#ef4444', padding: '2rem'}}>{error}</div>;

    return (
        <div className="event-grid">
            {events.length > 0 ? (
                events.map(event => (
                    <div key={event._id} className="event-card">
                        <div>
                            <div className="event-date">
                                <span>📅</span> {new Date(event.date).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </div>
                            <h3>{event.title}</h3>
                            <p className="event-description">{event.description}</p>
                        </div>
                        <button 
                            className="btn" 
                            onClick={() => onRegisterClick(event)}
                        >
                            Register Now
                        </button>
                    </div>
                ))
            ) : (
                <div style={{gridColumn: '1/-1', textAlign: 'center', padding: '4rem'}}>
                    <p className="subtitle">No events found. Check back later!</p>
                </div>
            )}
        </div>
    );
};

export default EventList;
