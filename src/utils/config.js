import axios from "axios";

const URL= "http://crm.softvalley.sveducrm.com/api/";
export const BASE_URL= "http://crm.softvalley.sveducrm.com/";

export const API = axios.create({
  baseURL: URL,
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const PUBLIC_API = axios.create({
  baseURL: URL, 
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("user_token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

