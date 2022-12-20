import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authData: "",
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authUserAction: (state, action) => {
      return {
        ...state,
        authData: action.payload,
      };
    },
    logoutAction: state => {
      localStorage.removeItem("jwt");
      localStorage.removeItem("cart");
      localStorage.removeItem("wishList");
      return {
        ...state,
        authData: "",
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { authUserAction, logoutAction } = AuthSlice.actions;

export default AuthSlice.reducer;
