/* eslint-disable no-unused-vars */
import { useNavigate } from "@tanstack/react-router";
import { FaBars } from "react-icons/fa";
import addLog from "../../context/LogActivity";

export function Topbar({ onToggle }) {
  const IpComp = localStorage.getItem("IP_COMPUTER");
  const user = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log(user);
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    addLog(IpComp, "LOGOUT", 1, `user ${user.username} logged out`);
    navigate({ to: "/login" });
  };

  return (
    <div className="bg-white px-4 py-2 shadow-md flex items-center justify-between">
      <button onClick={onToggle} className="text-blue-800 text-xl">
        <FaBars />
      </button>
      <button
        onClick={handleLogout}
        className="px-4 py-2 text-white bg-red-600 hover:bg-red-800 rounded-lg"
      >
        LOGOUT
      </button>
    </div>
  );
}
