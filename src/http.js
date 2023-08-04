import axios from "axios";

const http = axios.create({
  baseURL: "API/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
export default http;
