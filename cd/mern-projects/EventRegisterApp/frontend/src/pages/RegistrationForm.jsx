import React, { useState } from 'react';
import { createRegistration } from '../services/registrationService';

const RegistrationForm = ({ event, onCancel, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        eventId: event ? event._id : ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        try {
            await createRegistration(formData);
            setSubmitting(false);
            onSuccess();
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
            setSubmitting(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="form-card">
                <h2 style={{ marginBottom: '0.5rem' }}>Register for Event</h2>
                <p className="subtitle" style={{ marginBottom: '2rem' }}>
                    {event ? `Joining: ${event.title}` : 'Complete your registration'}
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    
                    {error && (
                        <div style={{ color: '#ef4444', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                            {error}
                        </div>
                    )}

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem' }}>
                        <button 
                            type="submit" 
                            className="btn" 
                            style={{ flex: 2 }}
                            disabled={submitting}
                        >
                            {submitting ? 'Registering...' : 'Confirm Registration'}
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-outline" 
                            style={{ flex: 1 }}
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;
