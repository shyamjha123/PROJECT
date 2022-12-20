import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL;

export const getAllProduct = async () => {
  return await axios.get(`${apiURL}/api/product/all-product`);
};

export const createProduct = async ({
  pName,
  pDescription,
  pImage,
  pStatus,
  pCategory,
  pQuantity,
  pPrice,
  pOffer,
}) => {
  /* Most important part for uploading multiple image  */
  let formData = new FormData();
  for (const file of pImage) {
    formData.append("pImage", file);
  }
  /* Most important part for uploading multiple image  */
  formData.append("pName", pName);
  formData.append("pDescription", pDescription);
  formData.append("pStatus", pStatus);
  formData.append("pCategory", pCategory);
  formData.append("pQuantity", pQuantity);
  formData.append("pPrice", pPrice);
  formData.append("pOffer", pOffer);

  return await axios.post(`${apiURL}/api/product/add-product`, formData);
};

export const deleteProduct = async pId => {
  return await axios.post(`${apiURL}/api/product/delete-product`, { pId });
};

export const editProduct = async product => {
  /* Most important part for updating multiple image  */
  let formData = new FormData();
  if (product.pEditImages) {
    for (const file of product.pEditImages) {
      formData.append("pEditImages", file);
    }
  }
  /* Most important part for updating multiple image  */
  formData.append("pId", product.pId);
  formData.append("pName", product.pName);
  formData.append("pDescription", product.pDescription);
  formData.append("pStatus", product.pStatus);
  formData.append("pCategory", product.pCategory._id);
  formData.append("pQuantity", product.pQuantity);
  formData.append("pPrice", product.pPrice);
  formData.append("pOffer", product.pOffer);
  formData.append("pImages", product.pImages);

  return await axios.post(`${apiURL}/api/product/edit-product`, formData);
};

export const productByPrice = async price => {
  return await axios.post(`${apiURL}/api/product/product-by-price`, {
    price,
  });
};

export const getSingleProduct = async pId => {
  return await axios.post(`${apiURL}/api/product/single-product`, {
    pId: pId,
  });
};
