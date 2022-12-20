import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryListDropdown: false,
  filterListDropdown: false,
  searchDropdown: false,
  loading: false,
  products: null,
  cartProduct: null,
  singleProductDetail: null,
  inCart: null,
  cartTotalCost: null,
  menu: true,
  cartModal: false,
  orderSuccess: false,
};

export const HomeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    categoryListDropdown: (state, action) => {
      return {
        ...state,
        categoryListDropdown: action.payload,
        filterListDropdown: false,
        searchDropdown: false,
      };
    },
    filterListDropdown: (state, action) => {
      return {
        ...state,
        categoryListDropdown: false,
        filterListDropdown: action.payload,
        searchDropdown: false,
      };
    },
    searchDropdown: (state, action) => {
      return {
        ...state,
        categoryListDropdown: false,
        filterListDropdown: false,
        searchDropdown: action.payload,
      };
    },
    searchHandleInReducer: (state, action) => {
      return {
        ...state,
        products:
          action.payload.productArray &&
          action.payload.productArray.filter(item => {
            if (
              item.pName
                .toUpperCase()
                .indexOf(action.payload.searchValue.toUpperCase()) !== -1
            ) {
              return item;
            }
            return null;
          }),
      };
    },
    loading: (state, action) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
    setProducts: (state, action) => {
      return {
        ...state,
        products: action.payload,
      };
    },
    cartProduct: (state, action) => {
      return {
        ...state,
        cartProduct: action.payload,
      };
    },
    singleProductDetail: (state, action) => {
      return {
        ...state,
        singleProductDetail: action.payload,
      };
    },
    inCart: (state, action) => {
      return {
        ...state,
        inCart: action.payload,
      };
    },
    cartTotalCost: (state, action) => {
      return {
        ...state,
        cartTotalCost: action.payload,
      };
    },

    menu: (state, action) => {
      return {
        ...state,
        menu: action.payload,
      };
    },
    cartModalToggle: (state, action) => {
      return {
        ...state,
        cartModal: action.payload,
      };
    },

    orderSuccess: (state, action) => {
      return {
        ...state,
        orderSuccess: action.payload,
      };
    },
    resetCart: state => {
      return {
        ...state,
        categoryListDropdown: false,
        filterListDropdown: false,
        searchDropdown: false,
        loading: false,
        cartProduct: null,
        inCart: null,
        cartTotalCost: null,
        menu: true,
        cartModal: false,
        orderSuccess: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  categoryListDropdown,
  filterListDropdown,
  searchDropdown,
  searchHandleInReducer,
  loading,
  setProducts,
  cartProduct,
  singleProductDetail,
  inCart,
  cartTotalCost,
  menu,
  cartModalToggle,
  resetCart,
  orderSuccess,
} = HomeSlice.actions;

export default HomeSlice.reducer;
