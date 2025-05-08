/* eslint-disable no-unused-vars */
import axios from "axios";
import { api } from "./urlApi";

const addLog = (ip, activity = "", status, keterangan = "") => {
  try {
    let data = {
      ip: ip,
      activity: activity,
      keterangan: keterangan,
      status: status,
    };
    let result = axios.post(`${api}/log`, data);
    // console.log(result);
  } catch (err) {
    console.log("Failed to add Log!", err);
  }
};

export default addLog;
