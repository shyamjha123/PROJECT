import DropIn from "braintree-web-drop-in-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  cartProduct,
  cartTotalCost,
  loading,
  orderSuccess,
} from "src/redux/slices/HomeSlice";
import { cartListProduct } from "src/shared/apiCall/cart";
import { totalCost } from "src/shared/helpers/totalCost";
import {
  createOrder,
  getBrainTreeToken,
  getPaymentProcess,
} from "../apiCall/payment";
import CheckoutProductsComponent from "./CheckoutProductsComponent";

const CheckoutComponent = () => {
  const navigate = useNavigate();
  const data = useSelector(state => state.home);

  const [state, setState] = useState({
    address: "",
    phone: "",
    error: false,
    success: false,
    clientToken: null,
    instance: {},
  });

  const dispatch = useDispatch();

  // fetchData
  const fetchData = async () => {
    dispatch(loading(true));
    try {
      let { data: responseData } = await cartListProduct();
      if (responseData && responseData.Products) {
        dispatch(cartProduct(responseData.Products));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(loading(false));
    }
  };

  // get token from braintree
  const fetchbrainTree = async () => {
    try {
      let { data } = await getBrainTreeToken();

      setState({
        clientToken: data.clientToken,
        success: data.success,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // payment method
  const pay = async () => {
    if (!state.address) {
      setState({ ...state, error: "Please provide your address" });
    } else if (!state.phone) {
      setState({ ...state, error: "Please provide your phone number" });
    } else {
      let nonce;
      state.instance
        .requestPaymentMethod()
        .then(data => {
          dispatch(loading(true));
          nonce = data.nonce;
          let paymentData = {
            amountTotal: totalCost(),
            paymentMethod: nonce,
          };
          getPaymentProcess(paymentData)
            .then(async res => {
              if (res.data) {
                let orderData = {
                  allProduct: JSON.parse(localStorage.getItem("cart")),
                  user: JSON.parse(localStorage.getItem("jwt")).user._id,
                  amount: res.data.transaction.amount,
                  transactionId: res.data.transaction.id,
                  address: state.address,
                  phone: state.phone,
                };
                try {
                  let { data: resposeData } = await createOrder(orderData);
                  if (resposeData.success) {
                    localStorage.setItem("cart", JSON.stringify([]));
                    dispatch(cartProduct(null));
                    dispatch(cartTotalCost(null));
                    dispatch(orderSuccess(true));
                    setState({ clientToken: "", instance: {} });
                    dispatch(loading(false));
                    return navigate("/");
                  } else if (resposeData.error) {
                    console.log(resposeData.error);
                  }
                } catch (error) {
                  console.log(error);
                }
              }
            })
            .catch(err => {
              console.log("erorr", err);
            });
        })
        .catch(error => {
          setState({ ...state, error: error.message });
        });
    }
  };

  //   useEffect
  useEffect(() => {
    fetchData();
    fetchbrainTree();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (data.loading) {
    return (
      <div className="flex items-center justify-center h-screen">
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
        Please wait untill finish
      </div>
    );
  }

  return (
    <section className="mx-4 mt-20 md:mx-12 md:mt-32 lg:mt-24">
      <div className="text-2xl mx-2">Order</div>
      {/* Product List */}
      <div className="flex flex-col md:flex md:space-x-2 md:flex-row">
        <div className="md:w-1/2">
          <CheckoutProductsComponent products={data.cartProduct} />
        </div>
        <div className="w-full order-first md:order-last md:w-1/2">
          {state.clientToken !== null ? (
            <div
              onBlur={e => setState({ ...state, error: false })}
              className="p-4 md:p-8"
            >
              {state.error ? (
                <div className="bg-red-200 py-2 px-4 rounded">
                  {state.error}
                </div>
              ) : (
                ""
              )}
              <div className="flex flex-col py-2">
                <label htmlFor="address" className="pb-2">
                  Dalivery Address
                </label>
                <input
                  type="text"
                  id="address"
                  className="border px-4 py-2"
                  placeholder="Address..."
                  onChange={e => {
                    setState({
                      ...state,
                      address: e.target.value,
                      error: false,
                    });
                  }}
                />
              </div>
              <div className="flex flex-col py-2 mb-2">
                <label htmlFor="phone" className="pb-2">
                  Phone
                </label>
                <input
                  onChange={e =>
                    setState({
                      ...state,
                      phone: e.target.value,
                      error: false,
                    })
                  }
                  type="number"
                  id="phone"
                  className="border px-4 py-2"
                  placeholder="+880"
                />
              </div>
              <DropIn
                options={{
                  authorization: state.clientToken,
                }}
                onInstance={instance => (state.instance = instance)}
              />
              <div
                onClick={pay}
                className="w-full px-4 py-2 text-center text-white font-semibold cursor-pointer"
                style={{ background: "#303031" }}
              >
                Pay now
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center py-12">
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
          )}
        </div>
      </div>
    </section>
  );
};

export default CheckoutComponent;
