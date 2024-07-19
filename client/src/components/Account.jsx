import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';

function Account() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      navigate('/'); // Redirect to login if no username is found
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <div className="flex bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
      <div className="flex flex-col w-full p-4">
        <div className="flex justify-between items-center py-4 mb-4 border-b border-gray-300">
          <h1 className="text-3xl font-bold text-blue-900">MORIAH ERP SYSTEM</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded transition duration-300"
          >
            Logout
          </button>
        </div>
        <div className="flex flex-col items-center mt-10 mb-5">
          <h2 className="text-4xl text-gray-800 font-bold mb-8">{`Welcome, ${username}`}</h2>
          <div className="flex flex-col items-center bg-white shadow-lg p-6 rounded-lg">
            <p className="text-gray-600 mt-2">Navigate to stock data and start your session.</p>
            <Link to="/available-stock" className="w-full mt-4 text-md font-bold text-center bg-blue-400 hover:bg-blue-600 text-white  py-2 rounded-md">
                                  Realtime Stock
            </Link>           
            {/* Additional content can be added here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
