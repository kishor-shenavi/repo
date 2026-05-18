import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/products`;

export const getProducts = () => axios.get(API_URL);
export const getProductById = (id) => axios.get(`${API_URL}/${id}`);
export const createProduct = (data) => axios.post(API_URL, data);
