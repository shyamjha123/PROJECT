import { configureStore } from "@reduxjs/toolkit";

import layoutReducer from "./slices/LayoutSlice";
import authReducer from "./slices/AuthSlice";
import categoryReducer from "./slices/CategorySlice";
import orderReducer from "./slices/OrderSlice";
import productReducer from "./slices/ProductSlice";
import homeReducer from "./slices/HomeSlice";

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
    auth: authReducer,
    category: categoryReducer,
    order: orderReducer,
    product: productReducer,
    home: homeReducer,
  },
});
