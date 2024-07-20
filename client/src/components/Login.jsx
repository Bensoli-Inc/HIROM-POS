import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ onLogin, isLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Attempting to login with:", { username, password }); // Log credentials (do not do this in production)
      const response = await axios.post('http://localhost:3001/login', { username, password });
      console.log("Server response:", response); // Logging server response

      const { token, username: resUsername, role } = response.data; // Fixed destructuring

      localStorage.setItem('token', token);
      localStorage.setItem('username', resUsername); // Used resUsername instead of username to avoid conflict
      localStorage.setItem('role', role);

      setError('');
      toast.success('Login successful!', {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Delaying the navigation to ensure the toast message is visible
      setTimeout(() => {
        if (isLoggedIn) {
        navigate('/account');
        }
      }, 1500);

      onLogin(token);

    } catch (err) {
      console.error("Error during login:", err); // Log the error
      setError(err.response?.data?.message || 'An unexpected error occurred. Please try again.');
      toast.error(err.response?.data?.message || 'An error occurred. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'bg-red-500 text-white',
      });
    }
  };

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate('/account');
  //     }
  // }, [isLoggedIn])

  return (
    <div className='flex justify-center items-center bg-blue-100 h-screen'>
      <div className='bg-white p-6 rounded-lg w-96 shadow'>
        <div className="flex flex-col justify-center items-center gap-2 font-bold mb-4">
          <h1 className="text-2xl text-blue-700">
            MORIAH ERP SYSTEM
          </h1>
          <h2 className="text-xl text-blue-500">Login</h2>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="block text-blue-700 font-semibold mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-blue-300 w-full rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-blue-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-blue-300 w-full rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
