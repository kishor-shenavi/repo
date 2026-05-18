import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/events`;

export const getEvents = () => axios.get(API_URL);
export const getEventById = (id) => axios.get(`${API_URL}/${id}`);
