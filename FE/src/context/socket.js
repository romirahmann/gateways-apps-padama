/* eslint-disable no-unused-vars */
import { io } from "socket.io-client";
const hostname = window.location.hostname;
let dynamicBaseUrl = "";

if (hostname.startsWith("192.168.9.")) {
  dynamicBaseUrl = "http://192.168.9.208:3004";
} else if (hostname.startsWith("192.168.10.")) {
  dynamicBaseUrl = "http://192.168.10.208:3004";
} else if (hostname === "localhost" || hostname === "127.0.0.1") {
  dynamicBaseUrl = "http://localhost:3004";
} else {
  dynamicBaseUrl = "http://192.168.10.208:3004";
}

const socket = io(dynamicBaseUrl);

export default socket;
