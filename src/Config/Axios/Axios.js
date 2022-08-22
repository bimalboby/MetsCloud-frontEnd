import axios from "axios";

// const baseURL = process.env.REACT_APP_BASE_URL;

const Axios = axios.create({
  baseURL: "http://139.59.20.42:3000"
});

export default Axios;