import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useMediaQuery} from 'react-responsive'
import { Link, useNavigate } from "react-router-dom";

function IncomingStock () {
    const [itemName, setItemName] = useState();
    const [quantity, setQuantity] = useState();
    const [pricePerQuantity, setPricePerQuantity] = useState();
    const [pieces, setPieces] = useState();
    const [total, setTotal] = useState(0);
    const [stock, setStock] = useState([]);
    const [realStock, setRealStock] = useState([]);
    const [showNavbar, setShowNavbar] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState(null);

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




    const handleSubmit = async (e) => {
        e.preventDefault();

        //i ensure all fields are filled before submitting
        if (!itemName || !quantity || !pricePerQuantity || !pieces) {
            alert('Please fill all the fields.');
            return
        }

        //calculate total before submitting
        calculateTotal();
        const formData = {itemName,quantity,pricePerQuantity,pieces,total};
        try {
            const response = await axios.post('http://localhost:3001/incomingstock', formData, {
                headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Response from stock model:', response.data);

        // Post to the second model
        const response2 = await axios.post('http://localhost:3001/realtime-stock', formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Response from realstock model:', response2.data);
        fetchStockData();
        fetchRealData();
        //reset form details after successful submission
        setItemName('');
        setQuantity('');
        setPieces(0);
        setPricePerQuantity(0);
        setTotal(0); //RESET TOTAL AFTER SUBMISSION

        } catch (error) {
            console.error('Error:', error)
        }
    };

    
    const calculateTotal = () => {
        if (itemName && quantity && pieces && pricePerQuantity){
            const calculatedTotal = (pieces * pricePerQuantity).toFixed(2);
            setTotal(calculatedTotal);
        } else {
            setTotal(0); //reset total to 0 if any field is empty
        }
    };

    useEffect(() => calculateTotal());

    const fetchStockData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/incomingstock');
            setStock(response.data);
        } catch (error) {
            console.error('Error fetching stock data:', error);
        }
    };

    const fetchRealData = async () =>{
        const data = await axios.get("http://localhost:3001/realtime-stock")
        setRealStock(data.data)
    }

    const approveStock = async (id) => {
        try {
            const response = await axios.put(`http://localhost:3001/newstock/approve/${id}`);
            console.log(response.data);
            fetchStockData();
        } catch (error) {
            console.error('Error approving stock:', error);
        }
    };

    const approveRealStock = async (id) => {
        try {
            const response = await axios.put(`http://localhost:3001/realtime-stock/approve/${id}`);
            console.log(response.data);
            fetchRealData();
        } catch (error) {
            console.error('Error approving stock:', error);
        }
    };

    const deleteStock = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/newstock/${id}`);
            fetchStockData();
        } catch (error) {
            console.error('Error deleting stock:', error);
        }
    };

    const deleteRealStock = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/realtime-stock/${id}`);
            fetchRealData();
        } catch (error) {
            console.error('Error deleting stock:', error);
        }
    };

    useEffect(() => {
        calculateTotal;
        fetchStockData();
        fetchRealData();
    }, []);

    
    return (
        <div className="flex bg-gradient-to-r from-blue-900 via-blue-500 to-red-200 animate-gradientMove shadow-lg w-full min-h-screen">
            {showNavbar && <Navbar />}
            <div className="bg-gradient-to-r from-blue-900 via-blue-500 to-red-200 animate-gradientMove shadow-lg w-full min-h-screen flex flex-col p-3 gap-3 items-center h-screen w-full">
                <div className="flex bg-white w-full py-3 px-6 rounded-lg justify-between items-center">
                    <h2 className="text-4xl max-lg:text-2xl py-3 font-bold leading-10 text-blue-500">
                        Stock receiving Point
                    </h2>
                    {!showNavbar && 
                    <button onClick={handlePopupToggle}
                            className="bg-blue-600 text-white rounded p-3 max-lg:p-2">
                        Menu
                    </button> }  
                </div>
                <div className="bg-white w-full h-screen flex flex-col items-center rounded-lg">
                    <form onSubmit={handleSubmit} >
                        <div className="flex gap-2 py-6">
                            <div className="">
                                <label htmlFor="name" className="block text-center font-semibold mb-2">
                                        Item
                                </label>
                                <select name="item" 
                                        id="item" 
                                        value={itemName}
                                        onChange={(e) => setItemName(e.target.value)}
                                        className="border border-blue-300 w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-300">
                                    <option value="">Select</option>
                                    <option value="chrome">Chrome</option>
                                    <option value="vodka">Vodka</option>
                                    <option value="captain-morgan">Captain Morgan</option>
                                    <option value="hunters-choice">Hunters Choice</option>
                                    <option value="gilbeys">Gilbeys</option>
                                </select>
                            </div>
                            <div className="">
                                <label htmlFor="name" className="block text-center font-semibold mb-2">
                                    Quantity
                                </label>
                                <select name="quantity" 
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        id="quantity"                        
                                        className="border border-blue-300 w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-300">
                                    <option value="">Select</option>
                                    <option value="1-litre">1 Litre</option>
                                    <option value="750-ml">750 ml</option>
                                    <option value="300-ml">300 ml</option>
                                </select>
                            </div>
                            <div className="">
                                <label htmlFor="name" className="block text-center font-semibold mb-2">
                                    Pieces
                                </label>
                                <input 
                                    type="number" 
                                    value={pieces}
                                    onChange={(e) => setPieces(e.target.value)}
                                    placeholder="Total pcs"
                                    className="border border-blue-300 w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-300"
                                    
                                />
                            </div>
                            <div className="">
                                <label htmlFor="name" className="block text-center font-semibold mb-2">
                                    Price per Quantity
                                </label>
                                <input 
                                    type="number" 
                                    value={pricePerQuantity}
                                    onChange={(e) => setPricePerQuantity(e.target.value)}
                                    placeholder="Price per Piece"
                                    className="border border-blue-300 w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-300"
                                    
                                />
                            </div>
                            <div className="">
                                <label htmlFor="name" className="block text-center font-semibold mb-2">
                                    Total
                                </label>
                                <input 
                                    type="text" 
                                    id="total"
                                    value={total}
                                    readOnly
                                    className="border border-blue-300 w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-300"
                                />
                            </div> 
                            <div className="">
                                <label htmlFor="submit" className="block text-center font-semibold mb-2">
                                    Compute
                                </label>
                                <button 
                                    type="submit" 
                                    className="w-full bg-red-500 text-white text-center py-2 px-2 rounded-md hover:bg-red-700 transition-colors"
                                    
                                >
                                    update Stock
                                </button>
                             </div> 

                        </div>
                    </form> 
                      {/* Transaction Table */}
                    <div className="bg-white w-full h-screen flex flex-col items-center rounded-lg">
                        <h1 className="text-xl font-bold py-3 text-center ">Update your Stock</h1>
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border px-4 py-2">Item</th>
                                    <th className="border px-4 py-2">Quantity</th>
                                    <th className="border px-4 py-2">Pieces</th>
                                    <th className="border px-4 py-2">Total</th>
                                    <th className="border px-4 py-2">Status</th>
                                    <th className="border px-4 py-2">Approve</th>
                                    <th className="border px-4 py-2">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                        {stock.map((item) => (
                                        <tr key={item._id}>
                                            <td className="border px-4 py-2">{item.itemName}</td>
                                            <td className="border px-4 py-2">{item.quantity}</td>
                                            <td className="border px-4 py-2">{item.pieces}</td>
                                            <td className="border px-4 py-2">{item.total}</td>
                                            <td className="border px-4 py-2">
                                                <button
                                                    className={`px-2 py-1 rounded ${
                                                        item.status === 'approved' 
                                                            ? 'bg-green-500 text-white py-1 px-2 rounded' 
                                                            : 'bg-yellow-500 text-black px-1 py-1 rounded'
                                                    }`}
                                                    disabled={item.status === 'approved'}
                                                    
                                                >
                                                    {item.status === 'approved' ? 'Approved✔' : 'Pending'}
                                                </button>
                                            </td>
                                            <td className="border px-4 py-2">
                                                    {item.status === 'Pending' && (
                                                    <button
                                                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors"
                                                        onClick={() => approveStock(item._id)}
                                                    >
                                                        Approve
                                                    </button>
                                                    )}
                                            </td>
                                            
                                            <td className="border px-4 py-2">
                                                    {item.status === 'Pending' && (
                                                    <button
                                                        onClick={() => deleteStock(item._id)}
                                                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700 transition-colors"
                                                    >
                                                        Delete
                                                    </button>
                                                    )}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="bg-white w-full h-screen flex flex-col items-center rounded-lg">
                        <h1 className="text-xl font-bold py-3 text-center ">Update Current Realtime stock</h1>
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border px-4 py-2">Item</th>
                                    <th className="border px-4 py-2">Quantity</th>
                                    <th className="border px-4 py-2">Pieces</th>
                                    <th className="border px-4 py-2">Total</th>
                                    <th className="border px-4 py-2">Status</th>
                                    <th className="border px-4 py-2">Approve</th>
                                    <th className="border px-4 py-2">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                        {realStock.map((item) => (
                                        <tr key={item._id}>
                                            <td className="border px-4 py-2">{item.itemName}</td>
                                            <td className="border px-4 py-2">{item.quantity}</td>
                                            <td className="border px-4 py-2">{item.pieces}</td>
                                            <td className="border px-4 py-2">{item.total}</td>
                                            <td className="border px-4 py-2">
                                                <button
                                                    className={`px-2 py-1 rounded ${
                                                        item.status === 'approved' 
                                                            ? 'bg-green-500 text-white py-1 px-2 rounded' 
                                                            : 'bg-yellow-500 text-black px-1 py-1 rounded'
                                                    }`}
                                                    disabled={item.status === 'approved'}
                                                    
                                                >
                                                    {item.status === 'approved' ? 'Approved✔' : 'Pending'}
                                                </button>
                                            </td>
                                            <td className="border px-4 py-2">
                                                    {item.status === 'Pending' && (
                                                    <button
                                                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors"
                                                        onClick={() => approveRealStock(item._id)}
                                                    >
                                                        Approve
                                                    </button>
                                                    )}
                                            </td>
                                            
                                            <td className="border px-4 py-2">
                                                    {item.status === 'Pending' && (
                                                    <button
                                                        onClick={() => deleteRealStock(item._id)}
                                                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700 transition-colors"
                                                    >
                                                        Delete
                                                    </button>
                                                    )}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                </div> 
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
    )
}

export default IncomingStock;