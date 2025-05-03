/* eslint-disable no-unused-vars */
import { Navigate } from "@tanstack/react-router";

const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) return console.log("token not found!");

  try {
    const { exp } = JSON.parse(atob(token.split(".")[1]));
    let dateNow = Date.now();
    let isExpired = dateNow < exp * 1000;
    return isExpired;
  } catch {
    return false;
  }
};
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to={"/login"} />;
};

export default ProtectedRoute;
