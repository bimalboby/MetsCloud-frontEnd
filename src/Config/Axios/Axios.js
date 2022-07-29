import axios from "axios";

// const baseURL = process.env.REACT_APP_BASE_URL;

const Axios = axios.create({
  baseURL: "http://192.168.1.17:3000"
});

export default Axios;