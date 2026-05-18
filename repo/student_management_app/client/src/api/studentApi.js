import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
});

// Add a new student
export const addStudent = (studentData) => API.post('/students', studentData);

// Get all students (optional search query)
export const getAllStudents = (search = '') =>
  API.get(`/students${search ? `?search=${encodeURIComponent(search)}` : ''}`);

// Get a single student by ID
export const getStudentById = (id) => API.get(`/students/${id}`);

// Update a student by ID
export const updateStudent = (id, studentData) =>
  API.put(`/students/${id}`, studentData);

// Delete a student by ID
export const deleteStudent = (id) => API.delete(`/students/${id}`);

export default API;
