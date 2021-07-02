import axios from "axios";

const ServerApi = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_API_URL}/`,
});

export default ServerApi;
