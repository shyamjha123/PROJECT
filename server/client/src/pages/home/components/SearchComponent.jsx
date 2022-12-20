import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loading,
  searchDropdown,
  searchHandleInReducer,
  setProducts,
} from "src/redux/slices/HomeSlice";
import { getAllProduct } from "src/shared/apiCall/product";

const SearchComponent = () => {
  const data = useSelector(state => state.home);
  const [search, setSearch] = useState("");
  const [productArray, setPa] = useState(null);
  const dispatch = useDispatch();

  const searchHandle = e => {
    setSearch(e.target.value);
    fetchData();
    let searchValue = e.target.value;
    dispatch(searchHandleInReducer({ searchValue, productArray }));
  };

  const fetchData = async () => {
    dispatch(loading(true));
    try {
      setTimeout(async () => {
        let { data: responseData } = await getAllProduct();
        if (responseData && responseData.Products) {
          setPa(responseData.Products);
          dispatch(loading(false));
        }
      }, 700);
    } catch (error) {
      console.log(error);
    }
  };

  const closeSearchBar = () => {
    dispatch(searchDropdown(!data.searchDropdown));
    fetchData();
    dispatch(setProducts(productArray));
    setSearch("");
  };

  return (
    <div
      className={`${
        data.searchDropdown ? "" : "hidden"
      } my-4 flex items-center justify-between`}
    >
      <input
        value={search}
        onChange={e => searchHandle(e)}
        className="px-4 text-xl py-4 focus:outline-none"
        type="text"
        placeholder="Search products..."
      />
      <div onClick={e => closeSearchBar()} className="cursor-pointer">
        <svg
          className="w-8 h-8 text-gray-700 hover:bg-gray-200 rounded-full p-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
  );
};

export default SearchComponent;
