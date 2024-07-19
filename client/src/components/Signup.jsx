import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = ({ role }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [institutionName, setinstitutionName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await axios.post('http://localhost:3001/register', { username, email, password, institutionName, role });
      setError('');
      alert('Registered successfully');
      navigate('/');
    } catch (err) {

      // Handling duplicate key errors
      if (err.response && err.response.data) {
        if (err.response.data.message.includes('E11000 duplicate key error collection')) {
          if (err.response.data.error.includes('email')) {
            setError('An account with this email already exists.');
          } else if (err.response.data.error.includes('username')) {
            setError('An account with this username already exists.');
          } else {
            setError('An error occurred. Please try again.');
          }
        } else {
          setError(err.response.data.message || 'An error occurred. Please try again.');
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className='flex justify-center items-center bg-blue-100 h-screen'>
        <div className='bg-white p-6 rounded-lg w-96 shadow'>
            <div className="flex flex-col justify-center items-center gap-2 font-bold mb-4">
                <h1 className="text-2xl text-blue-700">
                    MORIAH ERP SYSTEM
                </h1>
                <h2 className="text-xl text-blue-500">Sign Up</h2>
            </div>
            <form onSubmit={handleRegister}>
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
                    placeholder='Name of your institution /company'
                    onChange={(e) => setinstitutionName(e.target.value)}
                    className="border border-blue-300 w-full rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    />
                </div>
                {/* <div className="mb-3">
                    <label className="block text-blue-700 font-semibold mb-2">Role</label>
                    <input
                    type="text"
                    value={role}
                    placeholder='role of user'
                    onChange={(e) => setRole(e.target.value)}
                    className="border border-blue-300 w-full rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    />
                </div> */}
                <button type="submit" className=" w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                        Register
                 </button>
                {error && <p className="text-red-500 text-xs italic">{error}</p>}
            </form>
        </div>
    </div>
  );
};

export default Signup;
