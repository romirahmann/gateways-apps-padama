/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { FaUsers } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import { MdDashboard } from "react-icons/md";
import { IoIosApps } from "react-icons/io";
import { Link } from "@tanstack/react-router";

const menuItems = [
  { icon: <MdDashboard />, label: "Dashboard", link: "/dashboard" },
  { icon: <IoIosApps />, label: "Apps", link: "/apps" },
  { icon: <FaUsers />, label: "Users", link: "/users" },
];

export function Sidebar({ isOpen }) {
  return (
    <motion.div
      animate={{ width: isOpen ? 200 : 60 }}
      className="h-full bg-blue-800 text-white flex flex-col py-4 px-2 transition-all duration-300"
    >
      <div className="flex flex-col">
        <div
          className={`font-bold mb-5 flex ${
            !isOpen && "justify-center "
          } items-center gap-2`}
        >
          <img src="/icon/apps.png" className="w-5" alt="" />
          {isOpen && <h1>GATEWAY APPS</h1>}
        </div>
        {menuItems.map((item, index) => (
          <Link to={item.link}>
            <div key={index} className="relative group">
              <div
                data-tooltip-id={`tooltip-${index}`}
                data-tooltip-content={item.label}
                className="flex items-center gap-3 p-3 hover:bg-blue-700 rounded-md cursor-pointer"
              >
                <span className="text-xl">{item.icon}</span>
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeIn" }}
                    className="text-xl"
                  >
                    {item.label}
                  </motion.span>
                )}
              </div>
              {!isOpen && (
                <Tooltip
                  id={`tooltip-${index}`}
                  place="right"
                  className="z-50"
                />
              )}
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
