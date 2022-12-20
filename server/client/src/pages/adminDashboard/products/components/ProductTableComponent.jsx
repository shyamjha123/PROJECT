import moment from "moment";
import React from "react";

const ProductTableComponent = ({ product, deleteProduct, editProduct }) => {
  return (
    <tr>
      <td className="p-2 text-left">
        {product.pName.length > 15
          ? product.pDescription.substring(1, 15) + "..."
          : product?.pName}
      </td>
      <td className="p-2 text-left">{product.pDescription.slice(0, 15)}...</td>
      <td className="p-2 text-center">
        <img
          className="w-12 h-12 object-cover object-center"
          src={product.pImages[0]}
          alt="pic"
        />
      </td>
      <td className="p-2 text-center">
        {product.pStatus === "Active" ? (
          <span className="bg-green-200 rounded-full text-center text-xs px-2 font-semibold">
            {product.pStatus}
          </span>
        ) : (
          <span className="bg-red-200 rounded-full text-center text-xs px-2 font-semibold">
            {product.pStatus}
          </span>
        )}
      </td>
      <td className="p-2 text-center">{product.pQuantity}</td>
      <td className="p-2 text-center">{product.pCategory?.cName}</td>
      <td className="p-2 text-center">{product.pOffer}</td>
      <td className="p-2 text-center">
        {moment(product.createdAt).format("lll")}
      </td>
      <td className="p-2 text-center">
        {moment(product.updatedAt).format("lll")}
      </td>
      <td className="p-2 flex items-center justify-center">
        <span
          onClick={e => editProduct(product._id, product, true)}
          className="cursor-pointer hover:bg-gray-200 rounded-lg p-2 mx-1"
        >
          <svg
            className="w-6 h-6 fill-current text-green-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path
              fillRule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <span
          onClick={e => deleteProduct(product._id)}
          className="cursor-pointer hover:bg-gray-200 rounded-lg p-2 mx-1"
        >
          <svg
            className="w-6 h-6 fill-current text-red-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </td>
    </tr>
  );
};

export default ProductTableComponent;
