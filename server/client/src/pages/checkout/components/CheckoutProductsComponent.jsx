import React from "react";
import { useNavigate } from "react-router-dom";
import { quantityFinder } from "src/shared/helpers/quantityFinder";
import { subTotal } from "src/shared/helpers/subTotal";

const CheckoutProductsComponent = ({ products }) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-2 md:grid-cols-1">
      {products !== null && products.length > 0 ? (
        products.map((product, index) => {
          return (
            <div
              key={index}
              className="col-span-1 m-2 md:py-6 md:border-t md:border-b md:my-2 md:mx-0 md:flex md:items-center md:justify-between"
            >
              <div className="md:flex md:items-center md:space-x-4">
                <img
                  onClick={e => navigate(`/products/${product._id}`)}
                  className="cursor-pointer md:h-20 md:w-20 object-cover object-center"
                  src={product.pImages[0]}
                  alt="wishListproduct"
                />
                <div className="text-lg md:ml-6 truncate">{product.pName}</div>
                <div className="md:ml-6 font-semibold text-gray-600 text-sm">
                  Price : ${product.pPrice}.00{" "}
                </div>
                <div className="md:ml-6 font-semibold text-gray-600 text-sm">
                  Quantitiy : {quantityFinder(product._id)}
                </div>
                <div className="font-semibold text-gray-600 text-sm">
                  Subtotal : ${subTotal(product._id, product.pPrice)}.00
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>No product found for checkout</div>
      )}
    </div>
  );
};

export default CheckoutProductsComponent;
