import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navberHamburger: false,
  loginSignupModal: false,
  // loginSignupError: false,
  // cartModal: false,
  // cartProduct: null,
  // singleProductDetail: null,
  // inCart: null,
  // cartTotalCost: null,
  // orderSuccess: false,
  // loading: false,
};

export const LayoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    hamburgerToggle: (state, action) => {
      return {
        ...state,
        navberHamburger: action.payload,
      };
    },
    loginSignupModalToggle: (state, action) => {
      return {
        ...state,
        loginSignupModal: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { hamburgerToggle, loginSignupModalToggle } = LayoutSlice.actions;

export default LayoutSlice.reducer;
