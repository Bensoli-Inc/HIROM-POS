import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const FounderSignup = () => {
  const [founderKey, setFounderKey] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [institutionName, setInstitutionName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords should match');
      return;
    }
    try {
      await axios.post('http://localhost:3001/founder-register', { 
        founderKey,
        username, 
        email, 
        password, 
        institutionName, 
        role: 'founder' 
      });
      setError('');
      toast.success('Founder registered successfully!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'bg-green text-white'
      });
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError(err.response.data.message);
      toast.error(err.response?.data?.message || 'An error occurred. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'bg-red-500 text-white'
      });
    }
  };

  return (
    <div className='flex justify-center items-center flex bg-gradient-to-r p-6 from-blue-900 via-blue-500 to-red-200 animate-gradientMove shadow-lg w-full min-h-screen'>
      <div className='bg-white p-6 rounded-lg lg:w-96 shadow'>
        <div className="flex flex-col justify-center items-center gap-2 font-bold mb-4">
          <h1 className="text-2xl text-blue-700">NOBILES ERP SYSTEM</h1>
          <h2 className="text-xl text-blue-500">Founder Sign Up</h2>
        </div>
        <form onSubmit={handleRegister}>
        <div className="mb-3">
            <label className="block text-blue-700 font-semibold mb-2">Founder Key</label>
            <input
              type="password"
              value={founderKey}
              placeholder='Enter founder key'
              onChange={(e) => setFounderKey(e.target.value)}
              className="border border-blue-300 w-full rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-blue-700 font-semibold mb-2">Username</label>
            <input
              type="text"
              value={username}
              placeholder='Create a username'
              onChange={(e) => setUsername(e.target.value)}
              className="border border-blue-300 w-full rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-blue-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              placeholder='Enter your email'
              onChange={(e) => setEmail(e.target.value)}
              className="border border-blue-300 w-full rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-blue-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              placeholder='Create a password'
              onChange={(e) => setPassword(e.target.value)}
              className="border border-blue-300 w-full rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-blue-700 font-semibold mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              placeholder='Confirm your password'
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-blue-300 w-full rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-blue-700 font-semibold mb-2">Institution Name</label>
            <input
              type="text"
              value={institutionName}
              placeholder='Bensoli inc.'
              onChange={(e) => setInstitutionName(e.target.value)}
              className="border border-blue-300 w-full rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button type="submit" className=" w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
            Register
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default FounderSignup;
