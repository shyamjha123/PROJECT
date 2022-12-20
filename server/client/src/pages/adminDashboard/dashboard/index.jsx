import AdminLayoutComponent from "../../../shared/components/AdminLayoutComponent";
import CustomizeComponent from "./components/CustomizeComponent";
import DashboardCardComponent from "./components/DashboardCardComponent";
import SellTableComponent from "./components/SellTableComponent";

const AdminDashboardPage = () => {
  return (
    <AdminLayoutComponent>
      <DashboardComponent />
    </AdminLayoutComponent>
  );
};

export default AdminDashboardPage;

const DashboardComponent = () => {
  return (
    <>
      <DashboardCardComponent />
      <CustomizeComponent />
      {/* today sell  */}
      <div className="m-4">
        <SellTableComponent />
      </div>
    </>
  );
};
