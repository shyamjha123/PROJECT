import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import LayoutComponent from "src/shared/components/LayoutComponent";
import { productByCategory } from "./apiCall/productByCategory";
import AllProductComponent from "./components/AllProductComponent";

const ProductByCategoryPage = () => {
  const [products, setProducts] = useState(null);
  const { catId } = useParams();

  const fetchData = async () => {
    try {
      let { data: responseData } = await productByCategory(catId);
      if (responseData && responseData.Products) {
        setProducts(responseData.Products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LayoutComponent>
      <AllProductComponent products={products} />
    </LayoutComponent>
  );
};

export default ProductByCategoryPage;
