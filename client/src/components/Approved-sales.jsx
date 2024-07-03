import React from "react";
import PropTypes from "prop-types";



const ApprovedSales = ({ approvedTransactions }) => {
  return (
    <div  className="bg-white w-full h-screen flex flex-col items-center rounded-lg">
      
      <h1 className="text-xl font-bold py-3 text-center">Approved Sales</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Item</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Pieces</th>
            <th className="border px-4 py-2">Total</th>
            <th className="border px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {approvedTransactions &&
            approvedTransactions.map((transaction, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{transaction.itemName}</td>
                <td className="border px-4 py-2">{transaction.quantity}</td>
                <td className="border px-4 py-2">{transaction.pieces}</td>
                <td className="border px-4 py-2">Ksh{transaction.total}</td>
                <td className="border px-4 py-2">{transaction.timestamp}</td>
              </tr>
            ))}
        </tbody>
      </table>

    </div>
  );
};

// PropTypes validation
ApprovedSales.propTypes = {
  approvedTransactions: PropTypes.arrayOf(
    PropTypes.shape({
      itemName: PropTypes.string.isRequired,
      quantity: PropTypes.string.isRequired,
      pieces: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ApprovedSales;
