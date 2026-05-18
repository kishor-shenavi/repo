import React, { useState } from 'react';
import axios from 'axios';

const CreateEvent = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: ''
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
            const API_URL = `${import.meta.env.VITE_API_URL}/api/events`;
            await axios.post(API_URL, formData);
            setSubmitting(false);
            onSuccess();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create event.');
            setSubmitting(false);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="form-card" style={{ transform: 'none', animation: 'none', maxWidth: '100%' }}>
                <h2 style={{ marginBottom: '1.5rem' }}>Create New Event</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Event Title</label>
                        <input 
                            type="text" 
                            name="title" 
                            placeholder="e.g. Annual Tech Conference"
                            value={formData.title}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input 
                            type="text" 
                            name="description" 
                            placeholder="Briefly describe the event"
                            value={formData.description}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Date</label>
                        <input 
                            type="date" 
                            name="date" 
                            value={formData.date}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    
                    {error && (
                        <div style={{ color: '#ef4444', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                            {error}
                        </div>
                    )}

                    <button 
                        type="submit" 
                        className="btn" 
                        style={{ width: '100%', marginTop: '1rem' }}
                        disabled={submitting}
                    >
                        {submitting ? 'Creating...' : 'Create Event'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateEvent;
