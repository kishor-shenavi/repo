import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/posts`;

export const getPosts = () => axios.get(API_URL);
export const getPostById = (id) => axios.get(`${API_URL}/${id}`);
export const createPost = (data) => axios.post(API_URL, data);
export const updatePost = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deletePost = (id) => axios.delete(`${API_URL}/${id}`);
