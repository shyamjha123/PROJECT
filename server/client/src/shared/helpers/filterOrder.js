import { fetchOrders } from "src/redux/slices/OrderSlice";
import { getAllOrder } from "../apiCall/order";

/* Filter All Order */
export const filterOrder = async (type, dispatch, dropdown, setDropdown) => {
  let { data: responseData } = await getAllOrder();
  if (responseData && responseData.Orders) {
    let newData;
    if (type === "All") {
      dispatch(fetchOrders(responseData.Orders));
      setDropdown(!dropdown);
    } else if (type === "Not processed") {
      newData = responseData.Orders.filter(
        item => item.status === "Not processed"
      );
      dispatch(fetchOrders(newData));
      setDropdown(!dropdown);
    } else if (type === "Processing") {
      newData = responseData.Orders.filter(
        item => item.status === "Processing"
      );
      dispatch(fetchOrders(newData));
      setDropdown(!dropdown);
    } else if (type === "Shipped") {
      newData = responseData.Orders.filter(item => item.status === "Shipped");
      dispatch(fetchOrders(newData));
      setDropdown(!dropdown);
    } else if (type === "Delivered") {
      newData = responseData.Orders.filter(item => item.status === "Delivered");
      dispatch(fetchOrders(newData));
      setDropdown(!dropdown);
    } else if (type === "Cancelled") {
      newData = responseData.Orders.filter(item => item.status === "Cancelled");
      dispatch(fetchOrders(newData));
      setDropdown(!dropdown);
    }
  }
};
