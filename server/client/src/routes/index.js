import { BrowserRouter, Route, Routes } from "react-router-dom";

import AdminDashboardPage from "src/pages/adminDashboard/dashboard";
import CategoriesPage from "src/pages/adminDashboard/categories";
import HomePage from "src/pages/home";
import OrdersPage from "src/pages/adminDashboard/orders";
import ProductsPage from "src/pages/adminDashboard/products";
import AdminProtectedRoute from "./AdminProtectedRoute";
import WishListPage from "src/pages/wishList";
import ProductDetailsPage from "src/pages/productDetails";
import ProductByCategoryPage from "src/pages/productByCategory";
import CheckOutPage from "src/pages/checkout";
import CartProtectedRoute from "./CartProtectedRoute";
import UserOrderPage from "src/pages/userDashboard/order";
import ProtectedRoute from "./ProtectedRoute";
import UserProfilePage from "src/pages/userDashboard/userProfile";
import UserSettingPage from "src/pages/userDashboard/userSetting";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Shop & Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/wish-list" element={<WishListPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route
          path="/products/category/:catId"
          element={<ProductByCategoryPage />}
        />
        {/* checkout projected route  */}
        <Route
          path="/checkout"
          element={
            <CartProtectedRoute>
              <CheckOutPage />
            </CartProtectedRoute>
          }
        />

        {/* admin projected pages  */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboardPage />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="admin/dashboard/categories"
          element={
            <AdminProtectedRoute>
              <CategoriesPage />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="admin/dashboard/orders"
          element={
            <AdminProtectedRoute>
              <OrdersPage />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="admin/dashboard/products"
          element={
            <AdminProtectedRoute>
              <ProductsPage />
            </AdminProtectedRoute>
          }
        />
        {/* User Dashboard */}
        <Route
          path="/user/orders"
          element={
            <ProtectedRoute>
              <UserOrderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/profile"
          element={
            <ProtectedRoute>
              <UserProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/setting"
          element={
            <ProtectedRoute>
              <UserSettingPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
