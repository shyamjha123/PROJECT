import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const updatePassword = async formData => {
  return await axios.post(`${apiURL}/api/user/change-password`, formData);
};
