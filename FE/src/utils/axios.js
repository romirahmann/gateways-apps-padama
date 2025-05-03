/* eslint-disable no-unused-vars */
import axios from "axios";
import { api } from "../context/urlApi";

const instance = axios.create({
  baseURL: api,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
