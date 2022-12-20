import AdminLayoutComponent from "src/shared/components/AdminLayoutComponent";
import AllProductComponent from "./components/AllProductComponent";
import ProductMenuComponent from "./components/ProductMenuComponent";

const ProductsPage = () => {
  return (
    <AdminLayoutComponent>
      <div className="grid grid-cols-1 space-y-4 p-4">
        <ProductMenuComponent />
        <AllProductComponent />
      </div>
    </AdminLayoutComponent>
  );
};

export default ProductsPage;
