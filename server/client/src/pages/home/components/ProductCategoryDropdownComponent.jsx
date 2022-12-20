import React from "react";
import CategoryListComponent from "./CategoryListComponent";
import FilterListComponent from "./FilterListComponent";
import SearchComponent from "./SearchComponent";

const ProductCategoryDropdownComponent = () => {
  return (
    <>
      <CategoryListComponent />
      <FilterListComponent />
      <SearchComponent />
    </>
  );
};

export default ProductCategoryDropdownComponent;
