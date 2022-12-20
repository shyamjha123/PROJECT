import moment from "moment";
import React from "react";

const TodayOrderTableComponent = ({ order }) => {
  return (
    <>
      <tr>
        <td className="w-48 hover:bg-gray-200 p-2 flex flex-col space-y-1">
          {order.allProduct.map((item, index) => {
            return (
              <div key={index} className="flex space-x-2">
                <span>{item.id.pName}</span>
                <span>{item.quantitiy}x</span>
              </div>
            );
          })}
        </td>
        <td className="p-2 text-left">
          {order.allProduct.map((item, index) => {
            return (
              <img
                key={index}
                className="w-12 h-12 object-cover"
                src={item.id.pImages[0]}
                alt="Pic"
              />
            );
          })}
        </td>
        <td className="p-2 text-center">
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
        <td className="p-2 text-center">{order.address}</td>
        <td className="p-2 text-center">
          {moment(order.createdAt).format("lll")}
        </td>
      </tr>
    </>
  );
};

export default TodayOrderTableComponent;
