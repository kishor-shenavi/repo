import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/students`;

export const getStudents = () => axios.get(API_URL);
export const getStudentById = (id) => axios.get(`${API_URL}/${id}`);
export const createStudent = (data) => axios.post(API_URL, data);
export const updateStudent = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteStudent = (id) => axios.delete(`${API_URL}/${id}`);
