/* eslint-disable no-unused-vars */
import { Link } from "@tanstack/react-router";
import axios from "axios";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { MdDashboard } from "react-icons/md";
import { ApiUrl, UrlBaseBackend } from "../../context/urlApi";
import socket from "../../context/socket";
import addLog from "../../context/LogActivity";

export function Homepage() {
  const [dataApp, setDataApp] = useState([]);
  const apiUrl = useContext(ApiUrl);
  const getFileAPI = useContext(UrlBaseBackend);
  const [hostname, setHostname] = useState("");
  const [ipComp, setIpComp] = useState("");

  useEffect(() => {
    fetchData();
  }, [dataApp]);

  useEffect(() => {
    const fullHost = window.location.hostname; // misalnya: "192.168.9.192"
    const ipParts = fullHost.split(".");
    const partialIP = ipParts.slice(0, 3).join("."); // hasil: "192.168.9"

    localStorage.setItem("HOSTNAME", partialIP);
    setHostname(partialIP);
  }, []);

  useEffect(() => {
    const handleUpdateDataApp = (newData) => {
      fetchData();
      console.log("Data Update!");
    };

    socket.on("add_app", handleUpdateDataApp);
    socket.on("delete_app", handleUpdateDataApp);

    return () => {
      socket.off("add_app", handleUpdateDataApp);
      socket.off("delete_app", handleUpdateDataApp);
    };
  }, []);

  useEffect(() => {
    getIPComp();
  }, []);

  const fetchData = async () => {
    try {
      let result = await axios.get(`${apiUrl}/data-apps`);

      setDataApp(result.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getIPComp = async () => {
    try {
      const result = await axios.get(`${apiUrl}/auth/get-ip`);

      let IpComp = result.data.data;
      setIpComp(IpComp);

      localStorage.setItem("IP_COMPUTER", IpComp);
    } catch (err) {
      console.log("Error get IP: ", err);
    }
  };

  const handleVisit = (url, appName) => {
    // console.log(getFileAPI);
    addLog(ipComp, `Access ${appName}`, 1, `SUCCESS Go to ${appName}(${url})`);
    window.open(url, "_blank");
  };

  return (
    <>
      <div className="max-w-full h-screen bg-gradient-to-tr from-[#021B45] to-[#0031A7]">
        <div className="container-fluid p-10">
          {/* TITLE */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0, transformOrigin: "center" }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="box-title bg-white/50 backdrop-blur-md rounded-lg shadow-lg flex items-center p-5"
          >
            {/* Logo & Title */}
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex items-center"
            >
              <div className="logo">
                <img src="/icon/apps.png" className="w-10" alt="" />
              </div>
              <h1 className="ms-5 text-md lg:text-2xl font-bold text-white tracking-wider">
                PRINDO APPS
              </h1>
            </motion.span>

            {/* Login Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="login ms-auto"
            >
              <Link to={"/login"}>
                <div className="flex items-center bg-blue-600 hover:bg-blue-700 px-2 py-1 ms-3 lg:px-4 lg:py-2 rounded-xl text-white">
                  <MdDashboard />
                  <span className="ms-2 text-sm lg:text-md">DASHBOARD</span>
                </div>
              </Link>
            </motion.div>
          </motion.div>

          {/* APPS */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeIn" }}
            className="container-fluid p-5 mt-[10em]"
          >
            <div className="container-apps grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-2">
              {dataApp.map((app, index) => (
                <div className="relative items p-3 mt-0 md:mt-10" key={index}>
                  <div className="absolute icon-app center left-1/2 -top-10 -translate-x-1/2">
                    <span className="icon bg-gray-200 w-24 flex justify-center p-5 rounded-xl">
                      <img src={`${getFileAPI}/icon/${app.icon}`} alt="" />
                    </span>
                  </div>
                  <div className="description text-center bg-white p-3 rounded-lg  h-full">
                    <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold mt-[2em]">
                      {app.appName}
                    </h1>
                    <h2 className="text-md md:text-xl lg:text-2xl font-bold">
                      {app.subName}
                    </h2>
                    <h3 className="text-xs md:text-sm lg:text-md my-3 italic">
                      {hostname && hostname === "192.168.10"
                        ? app.urlPadamaju
                        : app.urlPadaprima}
                    </h3>

                    <button
                      onClick={() => {
                        hostname && hostname === "192.168.10"
                          ? handleVisit(app.urlPadamaju, app.appName)
                          : handleVisit(app.urlPadaprima, app.appName);
                      }}
                      href={
                        hostname && hostname === "192.168.10"
                          ? `${app.urlPadamaju}`
                          : `${app.urlPadaprima}`
                      }
                      target="_blank"
                      className="px-3 py-1 lg:px-4 lg:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md lg:rounded-xl"
                    >
                      VISIT
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
