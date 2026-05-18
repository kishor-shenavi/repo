import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddStudent from './pages/AddStudent';
import ViewStudents from './pages/ViewStudents';
import EditStudent from './pages/EditStudent';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddStudent />} />
        <Route path="/students" element={<ViewStudents />} />
        <Route path="/edit/:id" element={<EditStudent />} />
        {/* Catch-all 404 */}
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
              <h2 className="text-4xl font-bold text-gray-700 mb-2">404</h2>
              <p className="text-gray-500 mb-6">Page not found.</p>
              <a href="/" className="text-blue-600 underline text-sm">
                Go back home
              </a>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
