import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";


function Sell () {
    const [itemName, setItemName] = useState();
    const [quantity, setQuantity] = useState();
    const [pieces, setPieces] = useState();
    const [total, setTotal] = useState(0);
    const [transactions, setTransactions] = useState([]);

 


// Price mappings based on item and quantity
const prices = {
    chrome: {
        '1-litre': 1500,
        '750-ml': 800,
        '300-ml': 300
    },
    vodka: {
        '1-litre': 1600,
        '750-ml': 900,
        '300-ml': 400
    },
    'captain-morgan': {
        '1-litre': 1400,
        '750-ml': 600,
        '300-ml': 200
    },
    'hunters-choice': {
        '1-litre': 1800,
        '750-ml': 900,
        '300-ml': 500
    },
    gilbeys: {
        '1-litre': 2000,
        '750-ml': 1000,
        '300-ml': 600
    }
};

const handleItemChange = (e) => {
    setItemName(e.target.value);
};

const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
};

const handlePiecesChange = (e) => {
    setPieces(e.target.value);
};

// Function to calculate total based on selected item, quantity, and pieces
const calculateTotal = () => {
    if (itemName && quantity && pieces) {
        const pricePerPiece = prices[itemName][quantity];
        const totalPrice = pricePerPiece * parseFloat(pieces);
        setTotal(totalPrice.toFixed(2)); // Round to 2 decimal places
    }
};


// Function to handle sale transaction
 {/*const handleSell = () => {
    if(itemName && quantity && pieces && total > 0) {
        const transaction = {
            itemName,
            quantity,
            pieces,
            total
        };
        setTransactions([...transactions, transaction]);
        //Reset form fields after sale
        setItemName('');
        setQuantity('');
        setPieces('');
        setTotal(0);
    }
 };

*/}

 // Function to handle sale transaction submission
 const handleSubmitt = (e) => {
    e.preventDefault();
    const timestamp = new Date().toISOString(); // Get current timestamp
    if (total>0)
    axios.post('http://localhost:3001/dashboard', { itemName, quantity, pieces, total, timestamp })
        .then(result => {
            console.log(result);
            const transaction = {
                itemName,
                quantity,
                pieces,
                total,
                status: 'pending',
                timestamp
            };
            // Add new transaction to the beginning of transactions array
            setTransactions([transaction, ...transactions]);
            // Reset form fields after sale
            setItemName('');
            setQuantity('');
            setPieces('');
            setTotal(0);
            // Sort transactions to display the most recent on top
            setTransactions(prevTransactions => prevTransactions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
        })
        .catch(err => console.error(err));
};

// Function to handle transaction approval
const handleApprove = (index) => {
    const updatedTransactions = transactions.map((transaction, i) => {
        if (i === index) {
            return { ...transaction, status: 'approved' };
        }
        return transaction;
    });
    setTransactions(updatedTransactions);
};

// Function to handle button click
const handleCalculateClick = () => {
    calculateTotal();
};
    
  // Function to handle deletion of transactions
  const handleDelete = (index) => {
    const updatedTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(updatedTransactions);
};

//Get approved transactions
const approvedTransactions = transactions.filter(
    (transaction) => transaction.status === "approved"
  );

// Calculate total whenever itemName, quantity, or pieces change
useEffect(() => {
    calculateTotal();
}, [itemName, quantity, pieces]);


  

    return (
        
        <div className="flex bg-gray-200 px-2">
            <div className="w-48 p-4 flex flex-col justify-center items-center gap-3 bg-blue-900 rounded-lg text-white h-screen shadow-lg">
                        
                        <Link to="/sell-point" className="w-full text-md font-bold text-center hover:bg-blue-600 text-white py-2 rounded-md">
                                Sell 
                        </Link>
                         <Link to="/approved-sales" className="w-full text-md font-bold text-center hover:bg-blue-600 text-white py-2 rounded-md">
                                Approved Sales
                        </Link>
                        <Link to="/available-stock" className="w-full text-md font-bold text-center hover:bg-blue-600 text-white py-2 rounded-md">
                                Available Stock
                        </Link>
                        <Link to="/receive-stock" className="w-full text-md font-bold text-center hover:bg-blue-600 text-white py-2 rounded-md">
                                Receive Stock
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
                        <Link to="/account" className="w-full text-md font-bold text-center hover:bg-blue-600 text-white py-2 rounded-md">
                                Accountt
                        </Link> 
            </div>
            <div className="flex flex-col p-3 gap-3 items-center h-screen bg-gray-200 w-full">
                <div className="bg-white w-full h-48 flex rounded-lg justify-center items-center">
                    <h2 className="text-4xl py-4 font-bold leading-10 text-blue-500">
                        MORIAH Selling Point
                    </h2>    
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
                                        className="border border-blue-300 w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-300">
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
                                        id="quantity" 
                                        onChange={handleQuantityChange}
                                        className="border border-blue-300 w-full rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-300">
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
                      {/* Transaction Table */}
                
                    <h1 className="text-xl font-bold py-3 text-center ">Sales Transactions</h1>
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
                            {transactions.map((transaction, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">{transaction.itemName}</td>
                                    <td className="border px-4 py-2">{transaction.quantity}</td>
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
                                        {transaction.status === 'pending' && (
                                            <button
                                                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors"
                                                onClick={() => handleApprove(index)}
                                            >
                                                Approve
                                            </button>
                                        )}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {transaction.status === 'pending' && (
                                            <button
                                                onClick={() => handleDelete(index)}
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

                   {/* <ApprovedSales approvedTransactions={approvedTransactions} /> */}
                
            </div>
    );
}

export default Sell;