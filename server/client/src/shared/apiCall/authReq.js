import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL;

export const loginReq = async data => {
  return await axios.post(`${apiURL}/api/signin`, data);
};

export const signupReq = async data => {
  return await axios.post(`${apiURL}/api/signup`, data);
};
