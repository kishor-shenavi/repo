const express = require('express');
const router = express.Router();
const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');

// GET /api/students        → get all (supports ?search=query)
// POST /api/students       → create new student
router.route('/').get(getAllStudents).post(createStudent);

// GET /api/students/:id    → get one
// PUT /api/students/:id    → update
// DELETE /api/students/:id → delete
router.route('/:id').get(getStudentById).put(updateStudent).delete(deleteStudent);

module.exports = router;
