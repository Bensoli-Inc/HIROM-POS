import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function StaffDash() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [admins, setAdmins] = useState([]);
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showAdminsList, setShowAdminsList] = useState(false);
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

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  const handleButtonClick = (view) => {
    setShowAdminForm(false);
    setShowChangePassword(false);
    setShowAdminsList(false);

    switch (view) {
      case 'createAdmin':
        setShowAdminForm(true);
        break;
      case 'changePassword':
        setShowChangePassword(true);
        break;
      case 'showAdminsList':
        setShowAdminsList(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex bg-white min-h-screen">
      <div className="flex-1 flex flex-col p-4 max-lg:p-2">
        <div className="flex justify-between items-center py-4 mb-4 max-lg:mb-2 border-b border-gray-300">
          <h1 className="text-3xl max-lg:text-2xl font-bold text-blue-900">MORIAH ERP SYSTEM</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded transition duration-300"
          >
            Logout
          </button>
        </div>

        <div className="flex flex-row max-lg:flex-col justify-center px-8 max-lg:px-3 py-3 mb-3 border-b border-gray-300">
          <div className="flex flex-col gap-3 border-b border-gray-300 max-lg:gap-2 mb-3 items-center w-full px-7 max-lg:px-12 py-3">
            <div className="flex items-center justify-center mb-3">
              <h2 className="text-5xl max-lg:text-3xl font-bold leading-[70px] text-orange-500 ">{`Welcome, ${capitalizeFirstLetter(username)}`}</h2>
            </div>
            <div className="flex flex-col items-center border border-blue-400 shadow-lg p-6  rounded-lg transition-transform transform hover:scale-95">
              <h2 className="text-lg flex justify-center font-bold mb-4 max-lg:mb-2">Settings</h2>
              <div>
                <p className="text-md mb-2">Name: {capitalizeFirstLetter(username)}</p>
                <p className="text-md mb-2">Email: {email}</p>
                <p className="text-md mb-4">Role: {capitalizeFirstLetter(role)}</p>
              </div>
              <button className="w-5/6 mt-2 mb-3 text-md text-center bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-3">
                <Link to="/incoming-stock">
                  Stock & Sells
                </Link>
              </button>
              <button 
                onClick={() => handleButtonClick('showAdminsList')}
                className="w-5/6 mt-2 mb-3 text-md text-center bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-3"
              >
                All Admins
              </button>
              <button 
                onClick={() => handleButtonClick('createAdmin')}
                className="w-5/6 mt-2 mb-3 text-md text-center bg-green-500 hover:bg-green-600 text-white rounded-md py-2 px-3"
              >
                Create Admin
              </button>
              <button 
                onClick={() => handleButtonClick('changePassword')}
                className="w-5/6 mt-2 mb-3 text-md text-center bg-orange-500 hover:bg-orange-600 text-white rounded-md py-2 px-3"
              >
                Change Password
              </button>
            </div>
          </div>
          <div className='flex flex-col gap-2 items-center justify-center w-full border-r border-blue-300 px-6 max-lg:px-10'>
            <div  >
              {!showAdminForm && !showChangePassword && !showAdminsList && (
                <div className='flex flex-col items-center justify-center mb-3'>
                  <h2 className="text-3xl max-lg:text-2xl text-orange-500 font-semibold mb-2">{`${capitalizeFirstLetter(role)} Session in progress`}</h2>
                  <p className="text-md text-center text-gray-500">Track your sales, <br /> Track stock <br /> Keep stock upto date </p>
               </div>
              )}
              {showAdminForm && (
                <div className="flex flex-col justify-center items-center w-full bg-green-100 border border-green-500 shadow-lg p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4 text-green-600">Create Admin</h3>
                  <form onSubmit={handleAdminSubmit} className="flex flex-col gap-2 w-full max-w-md">
                    <input
                      type="text"
                      placeholder="Username"
                      value={adminDetails.username}
                      onChange={(e) => setAdminDetails({ ...adminDetails, username: e.target.value })}
                      className="border p-2 rounded-md"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={adminDetails.email}
                      onChange={(e) => setAdminDetails({ ...adminDetails, email: e.target.value })}
                      className="border p-2 rounded-md"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Institution Name"
                      value={adminDetails.institutionName}
                      onChange={(e) => setAdminDetails({ ...adminDetails, institutionName: e.target.value })}
                      className="border p-2 rounded-md"
                      required
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      value={adminDetails.password}
                      onChange={(e) => setAdminDetails({ ...adminDetails, password: e.target.value })}
                      className="border p-2 rounded-md"
                      required
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white font-semibold rounded"
                    >
                      Create Admin
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAdminForm(false)}
                      className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded"
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              )}
              {showChangePassword && (
                <div className="flex flex-col justify-center items-center w-full bg-purple-100 border border-purple-500 shadow-lg p-6 max-lg:p-4 rounded-lg">
                  <h3 className="text-xl font-bold mb-4 text-purple-600">Change Password</h3>
                  <form onSubmit={handleChangePassword} className="flex flex-col gap-2 w-full max-w-md">
                    <input
                      type="password"
                      placeholder="Old Password"
                      value={passwordChange.oldPassword}
                      onChange={(e) => setPasswordChange({ ...passwordChange, oldPassword: e.target.value })}
                      className="border p-2 rounded-md"
                      required
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      value={passwordChange.newPassword}
                      onChange={(e) => setPasswordChange({ ...passwordChange, newPassword: e.target.value })}
                      className="border p-2 rounded-md"
                      required
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded"
                    >
                      Change Password
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowChangePassword(false)}
                      className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded"
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              )}
              {showAdminsList && (
                <div className="flex flex-col justify-center items-center w-full bg-orange-100 border border-orange-500 shadow-lg p-6 max-lg:px-3 rounded-lg">
                  <h3 className="text-xl font-bold mb-4 text-orange-600">All Admins</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white w-full">
                    {admins.map((admin) => (
                      <div
                        key={admin._id}
                        className="border border-gray-400 shadow-md p-3 rounded-md flex flex-col items-center justify-center"
                      >
                        <div>
                          <p className="text-md mb-2"><strong>Username:</strong> {admin.username}</p>
                          <p className="text-md mb-2"><strong>Email:</strong> {admin.email}</p>
                          <p className="text-md mb-2"><strong>Institution:</strong> {admin.institutionName}</p>
                        </div>
                        <div className="mt-4 flex gap-4">
                          {admin.isActive ? (
                            <button
                              onClick={() => handleDeactivate(admin._id)}
                              className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded"
                            >
                              Deactivate
                            </button>
                          ) : (
                            <button
                              onClick={() => handleReactivate(admin._id)}
                              className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white font-semibold rounded"
                            >
                              Reactivate
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAdminsList(false)}
                    className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default StaffDash;