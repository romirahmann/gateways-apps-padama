/* eslint-disable no-unused-vars */
// icon
import axios from "axios";
import moment from "moment";
import { useCallback, useContext, useEffect, useState } from "react";
import { FaList, FaUsers } from "react-icons/fa";
import { IoIosApps } from "react-icons/io";
import { TbLayoutDashboard } from "react-icons/tb";
import { ApiUrl } from "../../../context/urlApi";
import { SearchComponent } from "../../shared/SearchComponent";
import { PaginationComponent } from "../../shared/PaginationComponent";
import socket from "../../../context/socket";
export function Dashboard() {
  const [dataLog, setDataLog] = useState([]);
  const [dataStatistik, setDataStatistik] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const [query, setQuery] = useState([]);
  const baseUrl = useContext(ApiUrl);

  // CONFIG API
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  useEffect(() => {
    fetchLog();
    fecthStatistik();
  }, [dataLog, dataStatistik]);

  const fetchLog = useCallback(async (date) => {
    try {
      if (!date) {
        let dateNow = moment().format("YYYY-MM-DD");
        let res = await axios.get(
          `${baseUrl}/master/log-by-date/${dateNow}`,
          config
        );
        setDataLog(res.data.data);
        setFilteredData(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const fecthStatistik = useCallback(async () => {
    try {
      let result = await axios.get(`${baseUrl}/master/statistik`, config);
      setDataStatistik(result.data.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleQuery = (query) => {
    setQuery(query);
  };
  return (
    <>
      <div className="max-w-full">
        <div className="title flex items-center text-2xl text-gray-800">
          <TbLayoutDashboard />
          <h1 className=" ms-2 font-bold">DASHBOARD</h1>
        </div>
        <div className="mt-10 grid grid-cols-4 gap-5">
          <div className="col-span-1 ">
            <div className="card max-h-52 bg-blue-900 p-5 rounded-2xl">
              <div className="title-card  text-white text-[4em]">
                <IoIosApps className="bg-blue-950 p-2 rounded-xl" />
              </div>
              <div className="description-card text-white">
                <h1 className="ms-2 my-3 text-xl">Total Apps</h1>
                <div className="num flex items-center">
                  <h1 className="text-5xl">{dataStatistik?.totalApp}</h1>
                  <h1 className="text-3xl ms-auto">APPS</h1>
                </div>
              </div>
            </div>
            <div className="card max-h-52 mt-3 bg-blue-900 p-5 rounded-2xl">
              <div className="title-card  text-white text-[4em]">
                <FaUsers className="bg-blue-950 p-2 rounded-xl" />
              </div>
              <div className="description-card text-white">
                <h1 className="ms-2 my-3 text-xl">Total Users</h1>
                <div className="num flex items-center">
                  <h1 className="text-5xl">{dataStatistik?.totalUser}</h1>
                  <h1 className="text-3xl ms-auto">USERS</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-3 p-5 bg-white rounded-lg">
            <div className="title-log text-blue-950 flex text-3xl items-center ">
              <FaList />
              <h1 className="font-bold ms-2">LOG ACTIVITY</h1>
            </div>
            <div className="table-log mt-5">
              <div className="searchBar flex items-center my-2 mt-5">
                <div className="filter  max-w-full">
                  <h1>Filter Date: </h1>
                  <input
                    type="date"
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="ms-auto">
                  <SearchComponent
                    result={setFilteredData}
                    data={dataLog}
                    queryInput={(query) => handleQuery(query)}
                    currentQuery={query}
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-700">
                  <thead className="bg-blue-100 text-blue-800 font-semibold">
                    <tr>
                      <th className="px-4 py-3 uppercase">NO</th>
                      <th className="px-4 py-3 uppercase">IP</th>
                      <th className="px-4 py-3 uppercase">Activity</th>
                      <th className="px-4 py-3 uppercase">status</th>
                      <th className="px-4 py-3 uppercase">Keterangan</th>
                      <th className="px-4 py-3 uppercase">Tanggal</th>
                      <th className="px-4 py-3 uppercase">jam</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {paginatedData.length > 0 ? (
                      paginatedData.map((log, index) => (
                        <tr key={log.userId}>
                          <td className="px-4 py-3">
                            {(currentPage - 1) * 10 + index + 1}
                          </td>
                          <td className="px-4 py-3">{log.ip}</td>
                          <td className="px-4 py-3">{log.activity}</td>
                          <td className="px-4 py-3">
                            {log.status === 0 ? (
                              <span className="font-bold text-red-600">
                                FAILED
                              </span>
                            ) : (
                              <span className="font-bold text-green-600">
                                SUCCESS
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3">{log.keterangan}</td>
                          <td className="px-4 py-3">
                            {moment(log.createdAt).format("YYYY-MM-DD")}
                          </td>
                          <td className="px-4 py-3">
                            {moment(log.createdAt).format("HH:ss:mm")}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="px-3 py-2">
                        <td colSpan="7" className=" text-center  font-bold">
                          Data Not Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <PaginationComponent
                setPaginatedData={setPaginatedData}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                data={filteredData}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
