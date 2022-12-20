import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL;

export const wishListProducts = async () => {
  let productArray = JSON.parse(localStorage.getItem("wishList"));

  return await axios.post(`${apiURL}/api/product/wish-product`, {
    productArray,
  });
};
