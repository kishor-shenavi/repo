import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/registrations`;

export const createRegistration = (data) => axios.post(API_URL, data);
export const getRegistrations = () => axios.get(API_URL);
