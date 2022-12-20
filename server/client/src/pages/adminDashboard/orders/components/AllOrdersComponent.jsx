import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "src/redux/slices/OrderSlice";
import { deleteOrder, getAllOrder } from "src/shared/apiCall/order";
import UpdateOrderModal from "../modals/UpdateOrderModal";
import CategoryTableComponent from "./CategoryTableComponent";

const AllOrdersComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditOrder, setIsEditOrder] = useState(false);
  const [editOrderData, setEditOrderData] = useState({});
  const allOrders = useSelector(state => state.order.allOrders);

  const dispatch = useDispatch();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      let { data } = await getAllOrder();
      dispatch(fetchOrders(data.Orders));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // edit order
  const editOrderReq = (oId, type, status) => {
    setEditOrderData({ oId, type, status });
    setIsEditOrder(true);
  };

  // delete order
  const deleteOrderReq = async id => {
    try {
      await deleteOrder(id);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <svg
          className="w-12 h-12 animate-spin text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <>
      <div className="col-span-1 overflow-auto bg-white shadow-lg p-4">
        <table className="table-auto border w-full my-2">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Products</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Total</th>
              <th className="px-4 py-2 border">Transaction Id</th>
              <th className="px-4 py-2 border">Customer</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Address</th>
              <th className="px-4 py-2 border">Created at</th>
              <th className="px-4 py-2 border">Updated at</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allOrders && allOrders.length > 0 ? (
              allOrders.map((item, i) => {
                return (
                  <CategoryTableComponent
                    key={i}
                    order={item}
                    editOrder={editOrderReq}
                    deleteOrderReq={deleteOrderReq}
                  />
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="12"
                  className="text-xl text-center font-semibold py-8"
                >
                  No order found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="text-sm text-gray-600 mt-2">
          Total {allOrders && allOrders.length} order found
        </div>
      </div>
      {/* update order modal  */}
      <UpdateOrderModal
        isEditOrder={isEditOrder}
        setIsEditOrder={setIsEditOrder}
        editOrderData={editOrderData}
        fetchData={fetchData}
      />
    </>
  );
};

export default AllOrdersComponent;
