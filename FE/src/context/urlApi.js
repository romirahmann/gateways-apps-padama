/* eslint-disable no-unused-vars */
import { createContext } from "react";

const hostname = window.location.hostname;
let dynamicBaseUrl = "";

if (hostname.startsWith("192.168.9.")) {
  dynamicBaseUrl = "http://192.168.9.208:3004/api";
} else if (hostname.startsWith("192.168.10.")) {
  dynamicBaseUrl = "http://192.168.10.208:3004/api";
} else if (hostname === "localhost" || hostname === "127.0.0.1") {
  dynamicBaseUrl = "http://localhost:3004/api";
} else {
  dynamicBaseUrl = "http://192.168.10.208:3004/api";
}

export const ApiUrl = createContext(dynamicBaseUrl);
export const UrlBaseBackend = createContext(dynamicBaseUrl);
export const api = dynamicBaseUrl;
