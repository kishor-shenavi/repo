const Student = require('../models/Student');

// @desc    Create a new student
// @route   POST /api/students
const createStudent = async (req, res) => {
  const { name, rollNumber, email, department, year, cgpa } = req.body;

  // Basic field check
  if (!name || !rollNumber || !email || !department || !year || !cgpa) {
    res.status(400);
    throw new Error('All fields are required');
  }

  const student = await Student.create({
    name,
    rollNumber,
    email,
    department,
    year,
    cgpa,
  });

  res.status(201).json({
    success: true,
    message: 'Student record created successfully',
    data: student,
  });
};

// @desc    Get all students (with optional search)
// @route   GET /api/students
// @route   GET /api/students?search=query
const getAllStudents = async (req, res) => {
  const { search } = req.query;

  let query = {};

  if (search && search.trim() !== '') {
    query = {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { rollNumber: { $regex: search, $options: 'i' } },
      ],
    };
  }

  const students = await Student.find(query).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: students.length,
    data: students,
  });
};

// @desc    Get a single student by ID
// @route   GET /api/students/:id
const getStudentById = async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }

  res.status(200).json({
    success: true,
    data: student,
  });
};

// @desc    Update a student by ID
// @route   PUT /api/students/:id
const updateStudent = async (req, res) => {
  const { name, rollNumber, email, department, year, cgpa } = req.body;

  if (!name || !rollNumber || !email || !department || !year || !cgpa) {
    res.status(400);
    throw new Error('All fields are required');
  }

  const student = await Student.findById(req.params.id);

  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }

  // Check for duplicate rollNumber (excluding current student)
  const duplicate = await Student.findOne({
    rollNumber: rollNumber.toUpperCase(),
    _id: { $ne: req.params.id },
  });

  if (duplicate) {
    res.status(400);
    throw new Error('Another student with this roll number already exists');
  }

  const updatedStudent = await Student.findByIdAndUpdate(
    req.params.id,
    { name, rollNumber, email, department, year, cgpa },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: 'Student record updated successfully',
    data: updatedStudent,
  });
};

// @desc    Delete a student by ID
// @route   DELETE /api/students/:id
const deleteStudent = async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }

  await student.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Student record deleted successfully',
    data: { id: req.params.id },
  });
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
