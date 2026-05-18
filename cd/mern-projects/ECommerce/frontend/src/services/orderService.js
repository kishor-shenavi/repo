import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/orders`;

export const createOrder = (data) => axios.post(API_URL, data);
export const getOrders = () => axios.get(API_URL);
export const cancelOrder = (id) => axios.delete(`${API_URL}/${id}`);
