import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true, // required to send/receive the httpOnly cookie
});

export default api;