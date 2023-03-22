import axios from "axios";

const baseURL = process.env.REACT_APP_API_ENDPOINT;
const API = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export { API };
