import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allOrders: "",
};

export const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    fetchOrders: (state, action) => {
      return {
        ...state,
        allOrders: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { fetchOrders } = OrderSlice.actions;

export default OrderSlice.reducer;
