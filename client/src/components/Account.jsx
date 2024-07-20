import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Account() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [admins, setAdmins] = useState([]);
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [adminDetails, setAdminDetails] = useState({
    username: '',
    email: '',
    password: '',
    institutionName: '',
    role: 'admin'
  });
  const [passwordChange, setPasswordChange] = useState({
    oldPassword: '',
    newPassword: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found, redirecting to login');
        navigate('/'); // Redirect to login if no token is found
        return;
      }

      try {
        console.log('Fetching user data with token:', token);

        // Fetch user data
        const userResponse = await axios.get('http://localhost:3001/user-data', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const { username, email, role } = userResponse.data;
        console.log('User data fetched:', { username, email, role });
        setUsername(username);
        setEmail(email);
        setRole(role);

        // Fetch additional data
        await fetchAdmins();
      } catch (err) {
        console.error('Error fetching user data:', err);
        toast.error('Error fetching user data.');
        localStorage.removeItem('token'); // Clear token on error
        navigate('/'); // Redirect to login if an error occurs
      }
    };

    fetchData();
  }, [navigate]);


  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3001/admins', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAdmins(response.data.admins);
    } catch (err) {
      console.error('Error fetching admins:', err);
      toast.error('Error fetching admins.');
    }
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3001/create-admin', adminDetails, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Admin created successfully!', {
        position: 'top-right',
        autoClose: 1000,
      });
      fetchAdmins(); // Refresh the list of admins
      setShowAdminForm(false);
    } catch (err) {
      console.error('Error creating admin:', err);
      toast.error('Error creating admin.');
    }
  };

  const handleDeactivate = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:3001/deactivate/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Account deactivated successfully!');
      fetchAdmins(); // Refresh the list of admins
    } catch (err) {
      toast.error('Error deactivating account.');
    }
  };

  const handleReactivate = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:3001/reactivate/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Account reactivated successfully!');
      fetchAdmins(); // Refresh the list of admins
    } catch (err) {
      console.error('Error reactivating account.:', err);
      toast.error('Error reactivating account.');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:3001/change-password', passwordChange, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Password changed successfully'); // Show success message
      setShowChangePassword(false);
    } catch (err) {
      console.error(err);
      // Check if the error response contains a specific message
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message); // Display the specific error message from the backend
      } else {
        toast.error('Error changing password.'); // Default error message
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    toast.success('Logged Out successfully!', {
      position: 'top-right',
      autoClose: 1000,
    });
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="flex bg-white  min-h-screen">
      <div className="flex-1 flex flex-col p-4">
        <div className="flex justify-between items-center py-4 mb-4 border-b border-gray-300">
          <h1 className="text-3xl font-bold text-blue-900">MORIAH ERP SYSTEM</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded transition duration-300"
          >
            Logout
          </button>
        </div>

        <div className='flex justify-center items-center py-3 mb-3 border-b border-gray-300'>
          <div className="flex flex-col items-center justify-center w-full sm:w-1/3 lg:w-1/4 p-4">
            <div className='flex items-center justify-center mb-3'>
              <h2 className="text-4xl text-gray-700 font-bold mb-2">{`Welcome, ${username}`}</h2>
            </div>
            <div className="bg-blue-100 border border-blue-400 shadow-lg p-6 rounded-lg transition-transform transform hover:scale-105">
              <h2 className="text-lg flex justify-center font-bold mb-4">Settings</h2>
              <p className="text-md mb-2">Name: {username}</p>
              <p className="text-md mb-2">Email: <span>{email}</span></p>
              <p className="text-md mb-4">Role: {role}</p>
              <button className="w-full mt-2 mb-4 text-md text-center bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4">
                <Link to="/incoming-stock">
                  Stock & Sells
                </Link>
              </button>
              <button className="w-full mt-2 mb-4 text-md text-center bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4">
                Active Admins
              </button>
              {showAdminForm ? (
                <form onSubmit={handleAdminSubmit} className="flex flex-col">
                  <h4 className="text-xl font-semibold mb-4">Create Admin</h4>
                  <input
                    type="text"
                    placeholder="Username"
                    value={adminDetails.username}
                    onChange={(e) => setAdminDetails({ ...adminDetails, username: e.target.value })}
                    className="mb-3 border border-gray-300 p-2 rounded"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={adminDetails.email}
                    onChange={(e) => setAdminDetails({ ...adminDetails, email: e.target.value })}
                    className="mb-3 border border-gray-300 p-2 rounded"
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={adminDetails.password}
                    onChange={(e) => setAdminDetails({ ...adminDetails, password: e.target.value })}
                    className="mb-3 border border-gray-300 p-2 rounded"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Institution Name"
                    value={adminDetails.institutionName}
                    onChange={(e) => setAdminDetails({ ...adminDetails, institutionName: e.target.value })}
                    className="mb-3 border border-gray-300 p-2 rounded"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded transition duration-300"
                  >
                    Create Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAdminForm(false)}
                    className="mt-2 w-full bg-gray-400 hover:bg-gray-500 text-white py-2 rounded transition duration-300"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setShowAdminForm(true)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition duration-300"
                >
                  Create Admin
                </button>
              )}
              {showChangePassword ? (
                <form onSubmit={handleChangePassword} className="flex flex-col">
                  <h4 className="text-xl font-semibold mb-4">Change Password</h4>
                  <input
                    type="password"
                    placeholder="Old Password"
                    value={passwordChange.oldPassword}
                    onChange={(e) => setPasswordChange({ ...passwordChange, oldPassword: e.target.value })}
                    className="mb-3 border border-gray-300 p-2 rounded"
                    required
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    value={passwordChange.newPassword}
                    onChange={(e) => setPasswordChange({ ...passwordChange, newPassword: e.target.value })}
                    className="mb-3 border border-gray-300 p-2 rounded"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded transition duration-300"
                  >
                    Change Password
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowChangePassword(false)}
                    className="mt-2 w-full bg-gray-400 hover:bg-gray-500 text-white py-2 rounded transition duration-300"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setShowChangePassword(true)}
                  className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition duration-300"
                >
                  Change Password
                </button>
              )}
            </div>
          </div>
          <div className='flex flex-col items-center justify-center border-r border-blue-300 mb-6'>
            <div className='flex items-center justify-center mb-2'>
              <h2 className="text-3xl text-orange-500 font-semibold mb-2">Admins List</h2>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="flex-1">
                <div className="flex flex-wrap">
                  {admins.length > 0 ? (
                    admins.map((admin) => (
                      <div key={admin._id} className="flex flex-col w-full sm:w-1/2 lg:w-1/3 p-2">
                        <div className="bg-blue-100 shadow-md p-4 rounded">
                          <h4 className="text-xl font-semibold">{admin.username}</h4>
                          <p>Email: {admin.email}</p>
                          <p>Institution: {admin.institutionName}</p>
                          {admin.isActive ? (
                            <button
                              onClick={() => handleDeactivate(admin._id)}
                              className="mt-2 bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
                            >
                              Deactivate Admin
                            </button>
                          ) : (
                            <button
                              onClick={() => handleReactivate(admin._id)}
                              className="mt-2 bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700"
                            >
                              Reactivate Admin
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No admins found.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Account;
