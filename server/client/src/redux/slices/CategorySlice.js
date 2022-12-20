import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCategories: "",
};

export const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    getCategories: (state, action) => {
      return {
        ...state,
        allCategories: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { getCategories } = CategorySlice.actions;

export default CategorySlice.reducer;
