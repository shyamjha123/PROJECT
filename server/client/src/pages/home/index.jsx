import LayoutComponent from "src/shared/components/LayoutComponent";
import OrderSuccessMessageComponent from "./components/OrderSuccessMessageComponent";
import ProductCategoryComponent from "./components/ProductCategoryComponent";
import ProductComponent from "./components/ProductComponent";
import SliderComponent from "./components/SliderComponent";

const HomePage = () => {
  return (
    <LayoutComponent>
      <SliderComponent />
      {/* Category, Search & Filter Section */}
      <section className="m-4 md:mx-8 md:my-6">
        <ProductCategoryComponent />
      </section>
      {/* Product Section */}
      <section className="m-4 md:mx-8 md:my-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <ProductComponent />
      </section>
      <OrderSuccessMessageComponent />
    </LayoutComponent>
  );
};

export default HomePage;
