import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Retrieve role from localStorage
    const role = localStorage.getItem('role');
    setUserRole(role);
  }, []);

  const handleDashboardClick = () => {
    if (userRole === 'founder') {
      navigate('/account');
    } else if (userRole === 'admin') {
      navigate('/admindash');
    } else if (userRole === 'staff') {
      navigate('/staffdash');
    } else {
      navigate('/'); // Default route if no valid role is found
    }
  };

  return (
    <div className="w-48 p-4 flex flex-col justify-center items-center gap-3 bg-blue-900 rounded-lg text-white h-screen shadow-lg">
      <Link to="/sell-point" className="w-full text-md font-bold text-center hover:bg-blue-600 text-white py-2 rounded-md">
        Sell 
      </Link>
      <Link to="/incoming-stock" className="w-full text-md font-bold text-center hover:bg-blue-600 text-white py-2 rounded-md">
        Receive Stock
      </Link>
      <Link to="/available-stock" className="w-full text-md font-bold text-center hover:bg-blue-600 text-white py-2 rounded-md">
        Realtime Stock
      </Link>
      <Link to="/approved-sales" className="w-full text-md font-bold text-center hover:bg-blue-600 text-white py-2 rounded-md">
        Approved Sales
      </Link>
      <Link to="/all-time-stock" className="w-full text-md font-bold text-center hover:bg-blue-600 text-white py-2 rounded-md">
        AllTime Stock
      </Link>
      <Link to="/charts" className="w-full text-md font-bold text-center hover:bg-blue-600 text-white py-2 rounded-md">
        Charts/graphs
      </Link>
      <Link to="/suppliers" className="w-full text-md font-bold text-center hover:bg-blue-600 text-white py-2 rounded-md">
        Suppliers
      </Link>
      <button
        onClick={handleDashboardClick}
        className="w-full text-md font-bold text-center hover:bg-blue-600 text-white py-2 rounded-md bg-blue-800"
      >
        Dashboard
      </button>
    </div>
  );
}

export default Navbar;
