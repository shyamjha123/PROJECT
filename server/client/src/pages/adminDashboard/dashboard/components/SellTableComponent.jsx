import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllOrder } from "src/shared/apiCall/order";
import TodayOrderTableComponent from "./TodayOrderTableComponent";

const SellTableComponent = () => {
  const navigate = useNavigate();
  const [totalOrders, setTotalOrdes] = useState([]);

  const fetchAllOrders = async () => {
    try {
      let { data } = await getAllOrder();
      setTotalOrdes(data.Orders);
    } catch (error) {}
  };

  const ordersList = () => {
    let newList = [];
    if (totalOrders.length > 0) {
      totalOrders.forEach(function (elem) {
        if (moment(elem.createdAt).format("LL") === moment().format("LL")) {
          newList = [...newList, elem];
        }
      });
    }
    return newList;
  };

  // useEffect
  useEffect(() => {
    fetchAllOrders();
  }, []);
  return (
    <>
      <div className="col-span-1 overflow-auto bg-white shadow-lg p-4">
        <div className="text-2xl font-semibold mb-6 text-center">
          Today's Orders {totalOrders.length > 0 ? ordersList().length : 0}
        </div>
        <table className="table-auto border w-full my-2">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Products</th>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Order Address</th>
              <th className="px-4 py-2 border">Ordered at</th>
            </tr>
          </thead>
          <tbody>
            {totalOrders.length > 0 ? (
              ordersList().map((item, key) => {
                return <TodayOrderTableComponent order={item} key={key} />;
              })
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-xl text-center font-semibold py-8"
                >
                  No orders found today
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="text-sm text-gray-600 mt-2">
          Total {totalOrders.length > 0 ? ordersList().length : 0} orders found
        </div>
        <div className="flex justify-center">
          <span
            onClick={e => navigate("/admin/dashboard/orders")}
            style={{ background: "#303031" }}
            className="cursor-pointer px-4 py-2 text-white rounded-full"
          >
            View All
          </span>
        </div>
      </div>
    </>
  );
};

export default SellTableComponent;
