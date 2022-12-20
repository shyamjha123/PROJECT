import axios from "axios";
import { cartTotalCost, inCart } from "src/redux/slices/HomeSlice";

const apiURL = process.env.REACT_APP_API_URL;

export const cartList = () => {
  let carts = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : null;
  let list = [];
  if (carts !== null) {
    for (let cart of carts) {
      list.push(cart.id);
    }
    return list;
  } else {
    return (list = null);
  }
};

export const cartListProduct = async () => {
  let carts = JSON.parse(localStorage.getItem("cart"));
  let productArray = [];
  if (carts) {
    for (const cart of carts) {
      productArray.push(cart.id);
    }
  }

  return await axios.post(`${apiURL}/api/product/cart-product`, {
    productArray,
  });
};

export const updateQuantity = (
  type,
  totalQuantitiy,
  quantitiy,
  setQuantitiy,
  setAlertq
) => {
  if (type === "increase") {
    if (quantitiy === totalQuantitiy) {
      setAlertq(true);
    } else {
      setQuantitiy(quantitiy + 1);
    }
  } else if (type === "decrease") {
    if (quantitiy === 1) {
      setQuantitiy(1);
      setAlertq(false);
    } else {
      setQuantitiy(quantitiy - 1);
    }
  }
};

export const addToCart = (
  id,
  quantitiy,
  price,
  dispatch,
  setQuantitiy,
  setAlertq,
  fetchData,
  totalCost
) => {
  let isObj = false;
  let cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  if (cart.length > 0) {
    cart.forEach(item => {
      if (item.id === id) {
        isObj = true;
      }
    });
    if (!isObj) {
      cart.push({ id, quantitiy, price });
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  } else {
    cart.push({ id, quantitiy, price });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  dispatch(inCart(cartList()));
  dispatch(cartTotalCost(totalCost()));
  setQuantitiy(1);
  setAlertq(false);
  fetchData();
};
