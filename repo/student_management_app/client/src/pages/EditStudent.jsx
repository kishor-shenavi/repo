import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getStudentById, updateStudent } from '../api/studentApi';

const DEPARTMENTS = [
  'Computer Science',
  'Information Technology',
  'Electronics & Communication',
  'Mechanical Engineering',
  'Civil Engineering',
  'Electrical Engineering',
  'Chemical Engineering',
  'Other',
];

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    rollNumber: '',
    email: '',
    department: '',
    year: '',
    cgpa: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch existing student data
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await getStudentById(id);
        const s = res.data.data;
        setForm({
          name: s.name,
          rollNumber: s.rollNumber,
          email: s.email,
          department: s.department,
          year: String(s.year),
          cgpa: String(s.cgpa),
        });
      } catch (err) {
        setApiError(
          err.response?.data?.message || 'Failed to load student data.'
        );
      } finally {
        setFetching(false);
      }
    };
    fetchStudent();
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required';
    if (!form.rollNumber.trim()) newErrors.rollNumber = 'Roll number is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!form.department) newErrors.department = 'Department is required';
    if (!form.year) {
      newErrors.year = 'Year is required';
    } else if (form.year < 1 || form.year > 5) {
      newErrors.year = 'Year must be between 1 and 5';
    }
    if (!form.cgpa) {
      newErrors.cgpa = 'CGPA is required';
    } else if (form.cgpa < 0 || form.cgpa > 10) {
      newErrors.cgpa = 'CGPA must be between 0 and 10';
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setApiError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setApiError('');
    setSuccess('');

    try {
      await updateStudent(id, {
        ...form,
        year: Number(form.year),
        cgpa: Number(form.cgpa),
      });
      setSuccess('Student record updated successfully!');
      setTimeout(() => navigate('/students'), 1500);
    } catch (err) {
      setApiError(
        err.response?.data?.message || 'Failed to update student. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      errors[field] ? 'border-red-500 bg-red-50' : 'border-gray-300'
    }`;

  if (fetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-400">
        Loading student data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Edit Student</h1>
        <p className="text-gray-500 text-sm mb-6">
          Modify the details below and save changes.
        </p>

        {/* Success Banner */}
        {success && (
          <div className="mb-4 bg-green-50 border border-green-300 text-green-700 text-sm px-4 py-3 rounded">
            ✅ {success}
          </div>
        )}

        {/* Error Banner */}
        {apiError && (
          <div className="mb-4 bg-red-50 border border-red-300 text-red-700 text-sm px-4 py-3 rounded">
            ❌ {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="edit-name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={inputClass('name')}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Roll Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Roll Number <span className="text-red-500">*</span>
              </label>
              <input
                id="edit-rollNumber"
                type="text"
                name="rollNumber"
                value={form.rollNumber}
                onChange={handleChange}
                className={inputClass('rollNumber')}
              />
              {errors.rollNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.rollNumber}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="edit-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={inputClass('email')}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Department */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department <span className="text-red-500">*</span>
              </label>
              <select
                id="edit-department"
                name="department"
                value={form.department}
                onChange={handleChange}
                className={inputClass('department')}
              >
                <option value="">-- Select Department --</option>
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              {errors.department && (
                <p className="text-red-500 text-xs mt-1">{errors.department}</p>
              )}
            </div>

            {/* Year */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year <span className="text-red-500">*</span>
              </label>
              <select
                id="edit-year"
                name="year"
                value={form.year}
                onChange={handleChange}
                className={inputClass('year')}
              >
                <option value="">-- Select Year --</option>
                {[1, 2, 3, 4, 5].map((y) => (
                  <option key={y} value={y}>
                    Year {y}
                  </option>
                ))}
              </select>
              {errors.year && (
                <p className="text-red-500 text-xs mt-1">{errors.year}</p>
              )}
            </div>

            {/* CGPA */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CGPA <span className="text-red-500">*</span>
              </label>
              <input
                id="edit-cgpa"
                type="number"
                name="cgpa"
                value={form.cgpa}
                onChange={handleChange}
                step="0.01"
                min="0"
                max="10"
                className={inputClass('cgpa')}
              />
              {errors.cgpa && (
                <p className="text-red-500 text-xs mt-1">{errors.cgpa}</p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-7 flex gap-3">
            <button
              id="submit-edit-student"
              type="submit"
              disabled={loading}
              className="bg-blue-700 text-white px-6 py-2 rounded text-sm font-semibold hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/students')}
              className="border border-gray-300 text-gray-600 px-6 py-2 rounded text-sm hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditStudent;
