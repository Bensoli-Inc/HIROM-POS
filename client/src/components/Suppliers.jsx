import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { useMediaQuery} from 'react-responsive'
import { Link, useNavigate } from "react-router-dom";

function Suppliers() {
    const [showNavbar, setShowNavbar] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState(null);

  const handlePopupToggle = () => {
    setShowPopup(!showPopup);
  };

  const handlePopClose = () => {
    setShowPopup(false);
  };


  const handleLinkClick = () => {
    setShowPopup(false);
    handleDashboardClick();
  };
    
    const isLargeScreen = useMediaQuery({ minWidth: 1024 });

    useEffect(() => {
        setShowNavbar(isLargeScreen);
      }, [isLargeScreen]);

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
        <div className="flex bg-gradient-to-r from-blue-900 via-blue-500 to-red-200 animate-gradientMove shadow-lg w-full min-h-screen">
            {showNavbar && <Navbar />}
            <div className="bg-gradient-to-r from-blue-900 via-blue-500 to-red-200 animate-gradientMove shadow-lg w-full min-h-screen flex flex-col p-3 gap-3 items-center h-screen w-full">
                <div className="flex bg-white w-full py-3 px-6 rounded-lg justify-center max-lg:justify-between items-center">
                    <h2 className="text-4xl max-lg:text-2xl py-3 font-bold leading-10 text-blue-500">
                        LISTED SUPPLIERS
                    </h2>
                    {!showNavbar && 
                    <button onClick={handlePopupToggle}
                            className="bg-blue-600 text-white rounded p-3 max-lg:p-2">
                        Menu
                    </button> }  
                </div>

                <div className="bg-white w-full h-screen flex flex-col items-center rounded-lg">
                    <h1 className="text-xl font-bold py-3 text-center ">All listed suppliers</h1>
                </div>
            </div>
            {showPopup && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75 py-8 "
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

export default Suppliers;