import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProducts: "",
};

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetchProducts: (state, action) => {
      return {
        ...state,
        allProducts: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { fetchProducts } = ProductSlice.actions;

export default ProductSlice.reducer;
