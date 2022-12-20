import axios from "axios";
import { Headers } from "src/shared/helpers/RequestHeaders";

const apiURL = process.env.REACT_APP_API_URL;

export const getAllCategory = async () => {
  return await axios.get(`${apiURL}/api/category/all-category`, Headers());
};

export const createCategory = async ({
  cName,
  cImage,
  cDescription,
  cStatus,
}) => {
  let formData = new FormData();
  formData.append("cImage", cImage);
  formData.append("cName", cName);
  formData.append("cDescription", cDescription);
  formData.append("cStatus", cStatus);

  return await axios.post(
    `${apiURL}/api/category/add-category`,
    formData,
    Headers()
  );
};

export const deleteCategory = async cId => {
  return await axios.post(
    `${apiURL}/api/category/delete-category`,
    { cId },
    Headers()
  );
};

export const editCategory = async (cId, des, status) => {
  let data = { cId: cId, cDescription: des, cStatus: status };
  return await axios.post(
    `${apiURL}/api/category/edit-category`,
    data,
    Headers()
  );
};
