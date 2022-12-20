import moment from "moment";
import React from "react";

const TableBodyComponent = ({ order }) => {
  return (
    <tr className="border-b">
      <td className="w-48 hover:bg-gray-200 p-2 flex flex-col space-y-1">
        {order.allProduct.map((product, i) => {
          return (
            <span className="block flex items-center space-x-2" key={i}>
              <img
                className="w-8 h-8 object-cover object-center"
                src={product.id.pImages[0]}
                alt="productImage"
              />
              <span>{product.id.pName}</span>
              <span>{product.quantitiy}x</span>
            </span>
          );
        })}
      </td>
      <td className="hover:bg-gray-200 p-2 text-center cursor-default">
        {order.status === "Not processed" && (
          <span className="block text-red-600 rounded-full text-center text-xs px-2 font-semibold">
            {order.status}
          </span>
        )}
        {order.status === "Processing" && (
          <span className="block text-yellow-600 rounded-full text-center text-xs px-2 font-semibold">
            {order.status}
          </span>
        )}
        {order.status === "Shipped" && (
          <span className="block text-blue-600 rounded-full text-center text-xs px-2 font-semibold">
            {order.status}
          </span>
        )}
        {order.status === "Delivered" && (
          <span className="block text-green-600 rounded-full text-center text-xs px-2 font-semibold">
            {order.status}
          </span>
        )}
        {order.status === "Cancelled" && (
          <span className="block text-red-600 rounded-full text-center text-xs px-2 font-semibold">
            {order.status}
          </span>
        )}
      </td>
      <td className="hover:bg-gray-200 p-2 text-center">${order.amount}.00</td>
      <td className="hover:bg-gray-200 p-2 text-center">{order.phone}</td>
      <td className="hover:bg-gray-200 p-2 text-center">{order.address}</td>
      <td className="hover:bg-gray-200 p-2 text-center">
        {order.transactionId}
      </td>
      <td className="hover:bg-gray-200 p-2 text-center">
        {moment(order.createdAt).format("lll")}
      </td>
      <td className="hover:bg-gray-200 p-2 text-center">
        {moment(order.updatedAt).format("lll")}
      </td>
    </tr>
  );
};

export default TableBodyComponent;
