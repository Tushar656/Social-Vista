import axios from "axios";

const http = axios.create({
  baseURL: "https://social-vista-server.glitch.me/api/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
export default http;
