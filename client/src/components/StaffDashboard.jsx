import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function StaffDash() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordChange, setPasswordChange] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handlePopupToggle = () => {
    setShowPopup(!showPopup);
  };

  const handleLinkClick = () => {
    setShowPopup(false);
    handleDashboardClick();
  };

  const handlePopClose = () => {
    setShowPopup(false);
  };

  const handleDashboardClick = () => {
    if (role === 'founder') {
      navigate('/account');
    } else if (role === 'admin') {
      navigate('/admindash');
    } else if (role === 'staff') {
      navigate('/staffdash');
    } else {
      navigate('/'); // Default route if no valid role is found
    }
  };

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

      
      } catch (err) {
        console.error('Error fetching user data:', err);
        toast.error('Error fetching user data.');
        localStorage.removeItem('token'); // Clear token on error
        navigate('/'); // Redirect to login if an error occurs
      }
    };

    fetchData();
  }, [navigate]);



  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordChange.password !== passwordChange.confirmPassword) {
      toast.error('Passwords should match');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:3001/change-password', passwordChange, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPasswordChange('');
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
  
  const handleButtonClick = () => {  
    setShowChangePassword(true);
  };

  return (
    <div className="bg-gradient-to-r from-blue-900 via-blue-500 to-red-200 animate-gradientMove shadow-lg w-full min-h-screen">
      <div className="flex-1 flex flex-col p-4 max-lg:p-2 ">
        <div className="flex justify-between items-center py-4 px-4 mb-4 max-lg:mb-2 border-b border-gray-300">
          <h1 className="text-4xl max-lg:text-2xl font-bold text-white">NOBILES ERP SYSTEM</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded transition duration-300"
          >
            Logout
          </button>
        </div>

        <div className="flex flex-row  max-lg:flex-col justify-center px-8 max-lg:px-3 py-3 mb-3 border-b border-gray-300">
          <div className="flex flex-col gap-3 border-b border-gray-300 max-lg:gap-2 max-lg:mb-7 items-center w-full px-7 max-lg:px-5 py-3 rounded-lg">
            <div className="flex items-center justify-center mb-3 max-lg:mb-5 p-2 bg-gradient-to-r from-blue-800 via-blue-400 to-red-100 rounded-lg shadow-inner shadow-blue-500/50 shadow-blue-500/30">
              <h2 className="text-4xl max-lg:text-2xl font-bold text-orange-600 leading-[70px]">
                {`Welcome, ${capitalizeFirstLetter(username)}`}
              </h2>
            </div>


            <div className="flex flex-col bg-white items-center border border-blue-400 shadow-lg p-6 max-lg:p-4 rounded-lg shadow-inner shadow-blue-500/50 shadow-blue-500/40 transition-transform transform hover:scale-105">
              <h2 className="text-xl flex justify-center font-bold mb-4 max-lg:mb-2">Main Dashboard</h2>
              <div>
                <p className="text-md mb-2">Name: {capitalizeFirstLetter(username)}</p>
                <p className="text-md mb-2">Email: {email}</p>
                <p className="text-md mb-4">Role: {capitalizeFirstLetter(role)}</p>
              </div>
                    <button onClick={handlePopupToggle}
                                  className="w-5/6 mt-2 mb-3 text-md text-center bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-3">
                              Stock & Sells
                    </button>
                    <button 
                      onClick={handleButtonClick}
                      className="w-5/6 mt-2 mb-3 text-md text-center bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-3"
                    >
                      Change Password
                    </button>
              </div>
          </div>
          <div className='flex flex-col gap-2 items-center justify-center w-full border-r border-blue-300 px-6 max-lg:px-5'>
            <div  >
              {!showChangePassword && (
                <div className='flex flex-col items-center justify-center mb-3'>
                  <h2 className="text-3xl max-lg:text-2xl text-white font-semibold mb-2">{`${capitalizeFirstLetter(role)} Session in progress`}</h2>
                  <p className="text-md text-center text-white">Track your sales, <br /> Track stock <br /> Keep stock upto date </p>
               </div>
              )}
              
              {showChangePassword && (
                <div className="flex flex-col justify-center items-center w-full bg-green-100 border border-green-500 shadow-lg shadow-inner shadow-green-500/50 shadow-green-500/40 transition-transform transform hover:scale-95 p-6 max-lg:p-4 rounded-lg">
                  <h3 className="text-xl font-bold mb-4 text-green-600">Change Password</h3>
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
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      value={passwordChange.confirmPassword}
                      onChange={(e) => setPasswordChange({ ...passwordChange, confirmPassword: e.target.value })}
                      className="border p-2 rounded-md"
                      required
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white font-semibold rounded"
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
              
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      {showPopup && (
        <div
          className="fixed top-0 left-0 w-5-6 h-full bg-gray-900 bg-opacity-75 py-8 "
          style={{
            height: '100%',
            width: '100%',
          }}
        >
          <div
            className="fixed w-3/6 right-3 max-w-md p-4 flex flex-col justify-center items-center gap-3 bg-blue-900 rounded-lg text-white shadow-lg"
            style={{
              height: 'auto',
              maxWidth: '90%',
              maxHeight: '90%',
            }}
          >
            <Link
              to="/sell-point"
              className="w-full text-md font-bold text-center hover:bg-blue-600 text-white py-2 rounded-md"
              onClick={handleLinkClick}
            >
              Sell
            </Link>
            <Link
              to="/incoming-stock"
              className="w-full text-md font-bold text-center hover:bg-blue-600 text-white py-2 rounded-md"
              onClick={handleLinkClick}
            >
              Receive Stock
            </Link>
            <Link
              to="/available-stock"
              className="w-full text-md font-bold text-center hover:bg-blue-600 text-white py-2 rounded-md"
              onClick={handleLinkClick}
            >
              Realtime Stock
            </Link>
            <Link
              to="/approved-sales"
              className="w-full text-md font-bold text-center hover:bg-blue-600 text-white py-2 rounded-md"
              onClick={handleLinkClick}
            >
              Approved Sales
            </Link>
            <Link
              to="/all-time-stock"
              className="w-full text-md font-bold text-center hover:bg-blue-600 text-white py-2 rounded-md"
              onClick={handleLinkClick}
            >
              AllTime Stock
            </Link>
            <Link
              to="/charts"
              className="w-full text-md font-bold text-center hover:bg-blue-600 text-white py-2 rounded-md"
              onClick={handleLinkClick}
            >
              Charts/graphs
            </Link>
            <Link
              to="/suppliers"
              className="w-full text-md font-bold text-center hover:bg-blue-600 text-white py-2 rounded-md"
              onClick={handleLinkClick}
            >
              Suppliers
            </Link>
            <button
              onClick={handleLinkClick}
              className="w-full text-md font-bold text-center hover:bg-blue-600 text-white py-2 rounded-md bg-blue-800"
            >
              Dashboard
            </button>
            <button
              onClick={handlePopClose}
              className="w-5/6 text-md font-bold text-center hover:bg-red-600 text-white py-2 rounded-md bg-red-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StaffDash;
