import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-700 text-white py-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Cloud-Based Student Record Management System
        </h1>
        <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-8">
          A centralized platform to manage student records efficiently. Add, view,
          update, and delete student data — all stored securely on MongoDB Atlas.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/add"
            className="bg-white text-blue-700 font-semibold px-6 py-3 rounded shadow hover:bg-blue-50 transition"
          >
            + Add Student
          </Link>
          <Link
            to="/students"
            className="border border-white text-white font-semibold px-6 py-3 rounded hover:bg-blue-600 transition"
          >
            View All Students
          </Link>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-10">
          System Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: '➕',
              title: 'Add Records',
              desc: 'Register new students with full details including name, roll number, department, year, and CGPA.',
            },
            {
              icon: '📋',
              title: 'View & Search',
              desc: 'Browse all student records in a clean table. Search by name or roll number instantly.',
            },
            {
              icon: '✏️',
              title: 'Edit Records',
              desc: 'Update any student information at any time with built-in form validation.',
            },
            {
              icon: '🗑️',
              title: 'Delete Records',
              desc: 'Remove outdated student records with a confirmation prompt to prevent accidents.',
            },
            {
              icon: '☁️',
              title: 'Cloud Storage',
              desc: 'All data is stored on MongoDB Atlas — reliable, scalable, and cloud-native.',
            },
            {
              icon: '✅',
              title: 'Validation',
              desc: 'Both frontend and backend validation ensures data integrity at all times.',
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
            >
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack Badge */}
      <div className="bg-gray-100 border-t border-gray-200 py-8 text-center">
        <p className="text-gray-500 text-sm">
          Built with{' '}
          <span className="font-semibold text-blue-600">React + Vite</span> ·{' '}
          <span className="font-semibold text-green-600">Node.js + Express</span>{' '}
          ·{' '}
          <span className="font-semibold text-emerald-600">MongoDB Atlas</span>
        </p>
      </div>
    </div>
  );
}

export default Home;
