import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import Sell from './components/Sell';
import Account from './components/Account';
import ApprovedSales from './components/Approved-sales';
import IncomingStock from './components/IncomingStock';
import AllTimeStock from './components/All-time-stock';
import Charts from './components/Charts';
import Suppliers from './components/Suppliers';
import AvailableStock from './components/Realtime-stock';

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
};

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userData = JSON.parse(atob(token.split('.')[1])); // Decode token payload
      setUser(userData);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const isUserAuthorized = (roles) => {
    return user && roles.includes(user.role);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Signup />} />

        {/* Protected routes */}
        <Route 
          path="/account" 
          element={isLoggedIn ? <Account /> : <Login onLogin={handleLogin} />} /> 
  
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

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {user && (
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      )}
    </BrowserRouter>
  );
}

export default App;
