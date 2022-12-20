import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { authUserAction } from "./redux/slices/AuthSlice";
import { cartProduct } from "./redux/slices/HomeSlice";
import Routers from "./routes";
import { cartListProduct } from "./shared/apiCall/cart";

const App = () => {
  const dispatch = useDispatch();

  // fetchCartProduct
  const fetchCartProduct = async () => {
    try {
      let { data: responseData } = await cartListProduct();
      if (responseData && responseData.Products) {
        dispatch(cartProduct(responseData.Products)); // Layout context Cartproduct fetch and dispatch
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   useEffect
  useEffect(() => {
    fetchCartProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect
  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      dispatch(authUserAction(JSON.parse(localStorage.getItem("jwt"))));
    }
  }, [dispatch]);

  return <Routers />;
};

export default App;
