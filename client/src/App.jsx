import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import Sell from './components/Sell';
import Account from './components/FounderDashboard';
import ApprovedSales from './components/Approved-sales';
import IncomingStock from './components/IncomingStock';
import AllTimeStock from './components/All-time-stock';
import Charts from './components/Charts';
import Suppliers from './components/Suppliers';
import AvailableStock from './components/Realtime-stock';
import FounderSignup from './components/FounderSignup';
import AdminDash from './components/AdminDashboard';
import StaffDash from './components/StaffDashboard';

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role'); // Retrieve role from localStorage
    if (token && role) {
      const userData = JSON.parse(atob(token.split('.')[1])); // Decode token payload
      setUser({ ...userData, role }); // Set user with role
      setIsLoggedIn(true);
    }
  }, []);

console.log(isLoggedIn);

  const handleLogin = (token) => {
    if (token) {
      const userData = JSON.parse(atob(token.split('.')[1])); // Decode token payload
      localStorage.setItem('token', token);
      localStorage.setItem('role', userData.role); // Store role in localStorage
      setUser(userData);
      setIsLoggedIn(true);
    } else {
      console.error("No token received during login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role'); // Remove role from localStorage
    setUser(null);
    setIsLoggedIn(false);
  };

  const isUserAuthorized = (roles) => {
    return user && roles.includes(user.role);
  };

  return (
    <BrowserRouter>
      <Routes >
        
        {/* Public routes */}
        <Route path="/" element={<Login isLoggedIn={isLoggedIn} onLogin={handleLogin} />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/founder-register" element={<FounderSignup />} />

        {/* Protected routes */}
        <Route 
          path="/account" 
          element={isLoggedIn ? <Account /> : <Navigate to="/" />} 
        />
        <Route 
          path="/admindash" 
          element={isLoggedIn ? <AdminDash /> : <Navigate to="/" />} 
        />
        <Route 
          path="/staffdash" 
          element={isLoggedIn ? <StaffDash /> : <Navigate to="/" />} 
        />
        <Route 
          path="/sell-point" 
          element={isUserAuthorized(['founder', 'admin', 'staff']) ? <Sell /> : <Navigate to="/" />} 
        />
        <Route 
          path="/approved-sales" 
          element={isUserAuthorized(['founder', 'admin']) ? <ApprovedSales /> : <Navigate to="/" />} 
        />
        <Route 
          path="/incoming-stock" 
          element={isUserAuthorized(['founder', 'admin', 'staff']) ? <IncomingStock /> : <Navigate to="/" />} 
        />
        <Route 
          path="/available-stock" 
          element={isUserAuthorized(['founder', 'admin', 'staff']) ? <AvailableStock /> : <Navigate to="/" />} 
        />
        <Route 
          path="/suppliers" 
          element={isUserAuthorized(['founder', 'admin', 'staff']) ? <Suppliers /> : <Navigate to="/" />} 
        />
        <Route 
          path="/all-time-stock" 
          element={isUserAuthorized(['founder', 'admin']) ? <AllTimeStock /> : <Navigate to="/" />} 
        />
        <Route 
          path="/charts" 
          element={isUserAuthorized(['founder', 'admin']) ? <Charts /> : <Navigate to="/" />} 
        />
      </Routes>
      {isLoggedIn && (
        <button onClick={handleLogout} className="flex bg-red-500 text-white items-center logout-button">
          Logout
        </button>
      )}
    </BrowserRouter>
  );
}

export default App;
