import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllStudents, deleteStudent } from '../api/studentApi';

function ViewStudents() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  const fetchStudents = useCallback(async (query = '') => {
    setLoading(true);
    setError('');
    try {
      const res = await getAllStudents(query);
      setStudents(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch students.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchStudents(search);
    }, 400);
    return () => clearTimeout(timer);
  }, [search, fetchStudents]);

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the record for "${name}"? This action cannot be undone.`
    );
    if (!confirmed) return;

    setDeletingId(id);
    try {
      await deleteStudent(id);
      setStudents((prev) => prev.filter((s) => s._id !== id));
      setSuccessMsg(`Record for "${name}" deleted successfully.`);
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete student.');
    } finally {
      setDeletingId(null);
    }
  };

  const getCgpaColor = (cgpa) => {
    if (cgpa >= 8.5) return 'text-green-600 font-semibold';
    if (cgpa >= 6.5) return 'text-blue-600 font-semibold';
    if (cgpa >= 5) return 'text-yellow-600 font-semibold';
    return 'text-red-500 font-semibold';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">All Students</h1>
            <p className="text-gray-500 text-sm mt-1">
              {loading ? 'Loading...' : `${students.length} record(s) found`}
            </p>
          </div>
          <Link
            to="/add"
            className="inline-block bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded hover:bg-blue-800 transition"
          >
            + Add Student
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-5">
          <input
            id="search-students"
            type="text"
            placeholder="Search by name or roll number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-96 border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Success Message */}
        {successMsg && (
          <div className="mb-4 bg-green-50 border border-green-300 text-green-700 text-sm px-4 py-3 rounded">
            ✅ {successMsg}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-300 text-red-700 text-sm px-4 py-3 rounded">
            ❌ {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20 text-gray-400 text-sm">
            Loading student records...
          </div>
        ) : students.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg font-medium">No students found.</p>
            <p className="text-sm mt-1">
              {search
                ? 'Try a different search term.'
                : 'Click "+ Add Student" to get started.'}
            </p>
          </div>
        ) : (
          /* Table */
          <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Roll No.</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Year</th>
                  <th className="px-4 py-3">CGPA</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {students.map((student, index) => (
                  <tr
                    key={student._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-gray-400">{index + 1}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {student.name}
                    </td>
                    <td className="px-4 py-3 text-gray-600 font-mono">
                      {student.rollNumber}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{student.email}</td>
                    <td className="px-4 py-3 text-gray-600">
                      {student.department}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-600">
                      {student.year}
                    </td>
                    <td className={`px-4 py-3 text-center ${getCgpaColor(student.cgpa)}`}>
                      {student.cgpa}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          id={`edit-${student._id}`}
                          onClick={() => navigate(`/edit/${student._id}`)}
                          className="bg-yellow-400 text-white text-xs px-3 py-1 rounded hover:bg-yellow-500 transition"
                        >
                          Edit
                        </button>
                        <button
                          id={`delete-${student._id}`}
                          onClick={() => handleDelete(student._id, student.name)}
                          disabled={deletingId === student._id}
                          className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600 disabled:opacity-60 transition"
                        >
                          {deletingId === student._id ? '...' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewStudents;



/*MONGO_URI=mongodb+srv://user2000:user321123@cluster0.tb3du.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET = dagwibfawbfbawk */

/* curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

source ~/.bashrc

nvm install 20

git clone   https://github.com/prathameshc123/blog-app.git

cd blog-app

cd server
npm install

cd ..
cd client
npm install
npm run build

cd..
cd server/
nano .env

npm install -g pm2

pm2 start server.js --name "blog-api"

pm2 save

pm2 startup


sudo apt update
sudo apt install nginx

sudo nano /etc/nginx/sites-available/default

server {
    listen 80;
    server_name 13.235.244.100;

    # Frontend (Static Files)
    location / {
        root /home/ubuntu/event_app/client/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API (Proxy)
    location /api {
        proxy_pass http://localhost:5000;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

sudo nginx -t

sudo systemctl restart nginx

sudo chmod -R 755 /home/ubuntu
sudo chmod -R 755 /home/ubuntu/task_app
sudo chmod -R 755 /home/ubuntu/task_app/client
sudo chmod -R 755 /home/ubuntu/task_app/client/dist

sudo systemctl restart nginx


pm2 restart blog-api */