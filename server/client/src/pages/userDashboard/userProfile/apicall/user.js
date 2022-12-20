import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const updatePersonalInformation = async userData => {
  return await axios.post(`${apiURL}/api/user/edit-user`, userData);
};

export const getUserById = async uId => {
  return await axios.post(`${apiURL}/api/user/signle-user`, { uId });
};
