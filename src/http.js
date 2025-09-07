import axios from "axios";

const http = axios.create({
  // baseURL: "http://localhost:8000/api/",
  // baseURL: "https://social-vista-server.glitch.me/API/",
  // baseURL: "https://fascinating-semifreddo-29dc7e.netlify.app/api/",
  baseURL: "https://social-vista-server.vercel.app/api/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
export default http;
