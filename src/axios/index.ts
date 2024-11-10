import axios from "axios";
// Setup Base URL
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
console.log(
  "🌻🌻🌻 ~ process.env.REACT_APP_API_URL:",
  process.env.REACT_APP_API_URL
);

export default axios;
