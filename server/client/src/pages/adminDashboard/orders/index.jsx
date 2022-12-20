import AdminLayoutComponent from "src/shared/components/AdminLayoutComponent";
import AllOrdersComponent from "./components/AllOrdersComponent";
import OrderMenuComponent from "./components/OrderMenuComponent";

const OrdersPage = () => {
  return (
    <AdminLayoutComponent>
      <div className="grid grid-cols-1 space-y-4 p-4">
        <OrderMenuComponent />
        <AllOrdersComponent />
      </div>
    </AdminLayoutComponent>
  );
};

export default OrdersPage;
