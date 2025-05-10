/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { ApiUrl } from "../../../context/urlApi";
import axios from "axios";
import { useNavigate } from "@tanstack/react-router";
import addLog from "../../../context/LogActivity";

export function Login() {
  const [isOpenPassword, SetOpenPassword] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "", show: false });
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const IpComp = localStorage.getItem("IP_COMPUTER");
  const baseUrl = useContext(ApiUrl);
  const navigate = useNavigate();

  const togleHidePassword = () => {
    isOpenPassword ? SetOpenPassword(false) : SetOpenPassword(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username && !formData.password) {
      setAlert({
        ...alert,
        type: "failed",
        message: "LOGIN FAILED! Username & Password is require",
        show: true,
      });
    }

    const submitLogin = async () => {
      try {
        let result = await axios.post(`${baseUrl}/auth/login`, formData);

        addLog(IpComp, "LOGIN", 1, `${formData.username} berhasil login!`);
        let token = result.data.data.token;
        let userData = result.data.data.userData;
        // console.log(token);
        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(userData));

        setAlert({
          ...alert,
          type: "success",
          message: "LOGIN SUCCESS! Welcome to Gateway Apps",
          show: true,
        });
        setTimeout(() => {
          setAlert(false);
          navigate({ to: "/dashboard" });
        }, 1500);
      } catch (err) {
        console.log(err);
        setAlert({
          ...alert,
          type: "failed",
          message: "LOGIN FAILED! Wrong is username & password ",
          show: true,
        });
        addLog(IpComp, "LOGIN", 0, "Wrong is username & Pasword");
      }
    };
    submitLogin();
  };

  return (
    <div className="w-full h-screen bg-[url('/images/bg-login.png')] bg-cover bg-center flex items-center justify-center">
      <div className="relative backdrop-blur-lg bg-blue-900/30 shadow-xl rounded-xl p-6 sm:p-8 w-full max-w-md mx-4">
        {alert.show && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -80 }}
            taransition={{ duration: 0.5, ease: "easeIn" }}
            className={`absolute -z-10 w-[19em] lg:w-[24em] px-4 py-2 ${
              alert.type === "success" ? "bg-green-600" : "bg-red-600"
            } rounded-md`}
          >
            <span className="text-white font-bold">{alert.message}</span>
          </motion.div>
        )}
        <h1 className="text-3xl font-bold text-center mb-6 text-white">
          LOGIN
        </h1>

        {/* Contoh form login */}
        <form className="z-50">
          <div className="mb-4">
            <label
              className="block text-sm font-semibold mb-1 text-white"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="username"
              onChange={(e) => handleChange(e)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative mb-6">
            <label
              className="block text-sm font-semibold mb-1 text-white"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              onChange={(e) => handleChange(e)}
              type={!isOpenPassword ? "password" : "text"}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="eye-icon absolute top-9 right-3">
              <span onClick={togleHidePassword}>
                {isOpenPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full z-10 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}
