import axios from "axios";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { useMediaQuery} from 'react-responsive'
import { Link, useNavigate } from "react-router-dom";
function Sell () {
    
    const [itemName, setItemName] = useState();
    const [quantity, setQuantity] = useState();
    const [sellingPricePQ, setSellingPricePQ] = useState();
    const [pieces, setPieces] = useState();
    const [total, setTotal] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [stock, setStock] = useState([]);
    const [error, setError] = useState('');
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

 const fetchRealTimeStock = async() => {
    try {
        const response = await axios.get('http://localhost:3001/final-realtime-stock');
        setStock(response.data);
    } catch (error) {
        console.error('Error fetching realtime stock:', error);
    }
 };
 const fetchAndUpdateStock = async (itemName, quantity) => {
    try {
      const response = await axios.get(`http://localhost:3001/realstock/${itemName}/${quantity}`);
      const updatedStock = response.data; // Assuming your endpoint returns updated stock data

      setStock((prevStock) => {
        const index = prevStock.findIndex(item => item.itemName === updatedStock.itemName);
        if (index !== -1) {
            prevStock[index].pieces = updatedStock.pieces;
          return [...prevStock];
        } else {
          return [...prevStock, updatedStock];
        }
      });
    } catch (error) {
      console.error('Error fetching stock:', error);
    }
  };

 const fetchSaleData = async () => {
    try {
        const response = await axios.get('http://localhost:3001/sale');
        setTransactions(response.data);
    } catch (error) {
        console.error('Error fetching sale data:', error);
    }
};

const handleItemChange = (e) => {
    setItemName(e.target.value);
    const selectedStockItem = stock.find(item => item.itemName === e.target.value && item.quantity === quantity);
    if (selectedStockItem) {
      setSellingPricePQ(selectedStockItem.pricePerQuantity * 1.25);
    }
};

const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
    const selectedStockItem = stock.find(item => item.itemName === itemName && item.quantity === e.target.value);
    if (selectedStockItem) {
      setSellingPricePQ(selectedStockItem.pricePerQuantity * 1.25);
    }
};

const handlePiecesChange = (e) => {
    setPieces(e.target.value);
    calculateTotal(e.target.value);
};

const calculateTotal = (piecesValue) => {
    if (sellingPricePQ && piecesValue) {
      const totalPrice = sellingPricePQ * parseFloat(piecesValue);
      setTotal(totalPrice.toFixed(2));
    }
};

useEffect(() => {
    calculateTotal();
    fetchRealTimeStock();
    fetchSaleData();
}, []);

 // Function to handle sale transaction submission
 const handleSubmitt = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous error messages

    // if (!itemName || !quantity || !pieces ) {
    //     alert('Please fill all the fields.');
    //     return
    // }

    calculateTotal();

    const stockItem = {itemName,quantity,sellingPricePQ,pieces,total};
   try {
        const response = await axios.post('http://localhost:3001/sale', stockItem, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response.data);
        fetchSaleData();
        fetchRealTimeStock();
           // Reset form fields after sale
            setItemName('');
            setQuantity('');
            setPieces('');
            setSellingPricePQ(0);
            setTotal(0);
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.message);
              } else {
                setError('An unexpected error occurred');
              }
          }      
};



// Function to handle transaction approval
const handleApprove = async (id) => {
    try {
        const response = await axios.put(`http://localhost:3001/sale/approve/${id}`);
        console.log(response.data);
        fetchSaleData();
    } catch (error) {
        console.error('Error approving sale:', error);
    }
};
    
  // Function to handle deletion of transactions
  const handleDelete = async (id, itemName, quantity) => {
    try {
      await axios.delete(`http://localhost:3001/sale/delete/${id}`);
      
      // Fetch and update stock state after deletion
      await fetchAndUpdateStock(itemName, quantity);

      fetchSaleData(); // Fetching updated sale data after deletion
    } catch (error) {
      console.error('Error deleting sale:', error);
    }
  };

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
                        Nobiles Selling Point
                    </h2>
                    {!showNavbar && 
                    <button onClick={handlePopupToggle}
                            className="bg-blue-600 text-white rounded p-3 max-lg:p-2">
                        Menu
                    </button> }  
                </div>

                <div className="bg-white w-full h-screen flex flex-col items-center rounded-lg">
                    <form onSubmit={handleSubmitt}>
                        <div className="flex gap-2 py-6">
                            <div className="">
                                <label htmlFor="name" className="block text-center font-semibold mb-2">
                                        Item
                                </label>
                                <select name="item" 
                                        id="item" 
                                        value={itemName}
                                        onChange={handleItemChange}
                                        className="border border-blue-300 w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-300"
                                >
                                    <option value="">Select Item</option>
                                    {stock.map(item => (
                                        <option key={item._id}
                                                value={item.itemName}>
                                                    {item.itemName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="">
                                <label htmlFor="name" className="block text-center font-semibold mb-2">
                                    Quantity
                                </label>
                                <select name="quantity" 
                                        value={quantity}
                                        id="quantity" 
                                        onChange={handleQuantityChange}
                                        className="border border-blue-300 w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-300">
                                    <option value="">Select Quantity</option>
                                    {stock
                                        .filter(item => item.itemName === itemName)
                                        .map(item => (
                                            <option key={item._id}
                                                    value={item.quantity}>
                                                        {item.quantity}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div className="">
                                <label htmlFor="name" className="block text-center font-semibold mb-2">
                                    priceP/Q
                                </label>
                                <input type="number" 
                                        value={sellingPricePQ}
                                        id="pricePQ" 
                                        readOnly
                                        className="border border-blue-300 w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-300">
                                </input>
                            </div>
                            <div className="">
                                <label htmlFor="name" className="block text-center font-semibold mb-2">
                                    Pieces
                                </label>
                                <input 
                                    type="number" 
                                    value={pieces}
                                    placeholder="Total pcs"
                                    className="border border-blue-300 w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-300"
                                    onChange={handlePiecesChange}
                                />
                            </div>
                            
                            <div className="">
                                <label htmlFor="name" className="block text-center font-semibold mb-2">
                                    Total
                                </label>
                                <input 
                                    type="text" 
                                    value={total}
                                    readOnly
                                    className="border border-blue-300 w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-300"
                                />
                            </div> 
                            <div className="">
                                <label htmlFor="name" className="block text-center font-semibold mb-2">
                                    Compute
                                </label>
                                <button 
                                    type="submit" 
                                    className="w-full bg-red-500 text-white text-center py-2 rounded-md hover:bg-red-700 transition-colors"
                                    
                                >
                                    Sell
                                </button>
                             </div> 

                        </div>
                    </form> 
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
                            <strong className="font-bold">Error:</strong>
                            <span className="block sm:inline"> {error}</span>
                        </div>
                    )}
                      {/* Transaction Table */}
                
                    <h1 className="text-xl font-bold py-3 text-center ">Sales Transactions</h1>
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border px-4 py-2">Item</th>
                                <th className="border px-4 py-2">Quantity</th>
                                <th className="border px-4 py-2">price P/Q</th>
                                <th className="border px-4 py-2">Pieces</th>
                                <th className="border px-4 py-2">Total</th>
                                <th className="border px-4 py-2">Status</th>
                                <th className="border px-4 py-2">Approve</th>
                                <th className="border px-4 py-2">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction) => (
                                <tr key={transaction._id}>
                                    <td className="border px-4 py-2">{transaction.itemName}</td>
                                    <td className="border px-4 py-2">{transaction.quantity}</td>
                                    <td className="border px-4 py-2">{transaction.sellingPricePQ}</td>
                                    <td className="border px-4 py-2">{transaction.pieces}</td>
                                    <td className="border px-4 py-2">Ksh{transaction.total}</td>
                                    <td className="border px-4 py-2">
                                        <button
                                            className={`px-2 py-1 rounded ${
                                                transaction.status === 'approved' 
                                                    ? 'bg-green-500 text-white py-1 px-2 rounded' 
                                                    : 'bg-yellow-500 text-black px-1 py-1 rounded'
                                            }`}
                                            disabled={transaction.status === 'approved'}
                                            
                                        >
                                            {transaction.status === 'approved' ? 'Approved✔' : 'Pending'}
                                        </button>
                                    </td>
                                    <td className="border px-4 py-2">
                                        {transaction.status === 'Pending' && (
                                            <button
                                                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors"
                                                onClick={() => handleApprove(transaction._id)}
                                            >
                                                Approve
                                            </button>
                                        )}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {transaction.status === 'Pending' && (
                                            <button
                                                onClick={() => handleDelete(transaction._id, transaction.itemName, transaction.quantity)}
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
            {/* Popup div */}
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
                   {/* <ApprovedSales approvedTransactions={approvedTransactions} /> */}
                
            </div>
    );
}

export default Sell;