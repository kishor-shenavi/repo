import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/add', label: 'Add Student' },
    { path: '/students', label: 'View Students' },
  ];

  return (
    <nav className="bg-blue-700 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo / Title */}
        <Link to="/" className="text-xl font-bold tracking-tight">
          🎓 Student Records
        </Link>

        {/* Nav Links */}
        <ul className="flex gap-2">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors duration-150 ${
                  location.pathname === link.path
                    ? 'bg-white text-blue-700'
                    : 'hover:bg-blue-600'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
