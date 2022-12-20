import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const getOrderByUser = async uId => {
  return await axios.post(`${apiURL}/api/order/order-by-user`, { uId });
};
