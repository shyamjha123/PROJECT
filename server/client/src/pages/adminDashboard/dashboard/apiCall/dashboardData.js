import axios from "axios";

let apiURL = process.env.REACT_APP_API_URL;

export const dashboardData = async () => {
  return await axios.post(`${apiURL}/api/customize/dashboard-data`);
};
