import moment from "moment";
import React from "react";

const CategoryTableComponent = ({ order, editOrder, deleteOrderReq }) => {
  console.log(order.allProduct);
  return (
    <tr className="border-b">
      <td className="w-48 hover:bg-gray-200 p-2 flex flex-col space-y-1">
        {order.allProduct.map((product, i) => {
          return (
            <span className="block flex items-center space-x-2" key={i}>
              <img
                className="w-8 h-8 object-cover object-center"
                src={product.id?.pImages[0]}
                alt="productImage"
              />
              <span>{product.id?.pName}</span>
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
      <td className="hover:bg-gray-200 p-2 text-center">
        {order.transactionId}
      </td>
      <td className="hover:bg-gray-200 p-2 text-center">{order.user?.name}</td>
      <td className="hover:bg-gray-200 p-2 text-center">{order.user?.email}</td>
      <td className="hover:bg-gray-200 p-2 text-center">{order.phone}</td>
      <td className="hover:bg-gray-200 p-2 text-center">{order.address}</td>
      <td className="hover:bg-gray-200 p-2 text-center">
        {moment(order.createdAt).format("lll")}
      </td>
      <td className="hover:bg-gray-200 p-2 text-center">
        {moment(order.updatedAt).format("lll")}
      </td>
      <td className="p-2 flex items-center justify-center">
        <span
          onClick={e => editOrder(order._id, true, order.status)}
          className="cursor-pointer hover:bg-gray-200 rounded-lg p-2 mx-1"
        >
          <svg
            className="w-6 h-6 fill-current text-green-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path
              fillRule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <span
          onClick={e => deleteOrderReq(order._id)}
          className="cursor-pointer hover:bg-gray-200 rounded-lg p-2 mx-1"
        >
          <svg
            className="w-6 h-6 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </span>
      </td>
    </tr>
  );
};

export default CategoryTableComponent;
