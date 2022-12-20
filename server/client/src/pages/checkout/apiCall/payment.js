import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const getBrainTreeToken = async () => {
  let uId = JSON.parse(localStorage.getItem("jwt")).user._id;

  return await axios.post(`${apiURL}/api/braintree/get-token`, {
    uId: uId,
  });
};

export const getPaymentProcess = async paymentData => {
  return await axios.post(`${apiURL}/api/braintree/payment`, paymentData);
};

export const createOrder = async orderData => {
  return await axios.post(`${apiURL}/api/order/create-order`, orderData);
};
