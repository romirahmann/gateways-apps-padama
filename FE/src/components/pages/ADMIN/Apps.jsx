/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { FaPlus, FaEdit } from "react-icons/fa";
import { IoIosApps } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { SearchComponent } from "../../shared/SearchComponent";
import { PaginationComponent } from "../../shared/PaginationComponent";
import { Modal } from "../../shared/Modal";
import axios from "axios";
import { ApiUrl, UrlBaseBackend } from "../../../context/urlApi";
import { Alert } from "../../shared/Alert";
import { FaDeleteLeft } from "react-icons/fa6";

export function Apps() {
  const [query, setQuery] = useState("");
  const [dataApp, setDataApp] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [paginatedData, setPaginatedData] = useState();
  const [formAdd, setFormAdd] = useState({
    appName: "",
    subName: "",
    url: "",
    port: 0,
    icon: null,
  });
  const [formEdit, setFormEdit] = useState({
    appName: "",
    subName: "",
    url: "",
    port: 0,
    icon: null,
  });
  const baseUrl = useContext(ApiUrl);
  const getFileAPI = useContext(UrlBaseBackend);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const token = localStorage.getItem("token");
  const [alert, setAlert] = useState({ message: "", type: "" });

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    fecthApps();
  }, []);

  // FECTH APPS
  const fecthApps = async () => {
    try {
      let result = await axios.get(`${baseUrl}/master/apps`, config);
      // console.log(result.data.data);
      let data = result.data.data;
      setDataApp(data);
      setFilteredData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleQuery = (query) => {
    setQuery(query);
  };

  // ADD FUNCTION
  const handleChangeAdd = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files?.[0];
      if (!file) return;

      const validTypes = ["image/jpeg", "image/png"];
      if (!validTypes.includes(file.type)) {
        console.log("File hanya boleh jpg/png");
        return;
      }

      setFormAdd((prev) => ({
        ...prev,
        [name]: file,
      }));
    } else {
      setFormAdd((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();

    if (!formAdd.appName || !formAdd.url || !formAdd.port || !formAdd.icon) {
      console.log("all require!");
    }

    const formData = new FormData();
    formData.append("appName", formAdd.appName);
    formData.append("subName", formAdd.subName);
    formData.append("url", formAdd.url);
    formData.append("port", formAdd.port);
    formData.append("file", formAdd.icon);

    try {
      // console.log("formAdd: ", formAdd);
      // for (let [key, value] of formData.entries()) {
      //   console.log(`${key}:`, value);
      // }

      let result = await axios.post(
        `${baseUrl}/master/upload`,
        formData,
        config
      );
      // console.log(result.data);
      fecthApps();
      setAddModal(false);
      setAlert({
        message: "Berhasil menambahkan data aplikasi!",
        type: "success",
      });
    } catch (err) {
      console.log("Failed to Upload Data!");
      setAlert({ message: "Gagal mengupload data!", type: "error" });
    }
  };

  // EDIT FUNCTION
  const handleChangeEdit = (e) => {};
  const handleSubmitEdit = (e) => {
    e.preventDefault();
  };

  // DELETE FUNCTION
  const handleDelete = () => {};

  return (
    <>
      <div className="title flex items-center text-2xl text-gray-800">
        <IoIosApps />
        <h1 className=" ms-2 font-bold">DATA PRINDO'S APP</h1>
      </div>
      <div className="box-table bg-white max-w-full mt-5">
        <div className="p-4 bg-white rounded-xl shadow-lg">
          {/* Search */}

          <div className="searchBar flex items-center my-2 mt-5">
            <button
              onClick={() => setAddModal(true)}
              className="flex items-center px-2 py-1 bg-blue-600 rounded-md text-white gap-1"
            >
              <FaPlus />
              <span>Add Data</span>
            </button>
            <div className="ms-auto">
              <SearchComponent
                result={setFilteredData}
                data={dataApp}
                queryInput={(query) => handleQuery(query)}
                currentQuery={query}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-blue-100 text-blue-800 font-semibold">
                <tr>
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Sub Name</th>
                  <th className="px-4 py-3">Port</th>
                  <th className="px-4 py-3">Url</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {dataApp.map((app, index) => (
                  <tr key={app.id}>
                    <td className="px-4 py-3">
                      <img
                        src={`${getFileAPI}/get-file/${app.icon}`}
                        alt={app.icon}
                        className="w-10"
                      />
                    </td>
                    <td className="px-4 py-3">{app.appName}</td>
                    <td className="px-4 py-3">{app.subName}</td>
                    <td className="px-4 py-3">{app.port}</td>
                    <td className="px-4 py-3">{app.url}</td>
                    <td>
                      <div className="flex gap-2 text-2xl">
                        <FaEdit className="text-green-700" />
                        <MdDeleteForever className="text-red-700" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <PaginationComponent />
        </div>
      </div>

      {/* ADD MODAL */}
      <Modal isOpen={addModal} onClose={() => setAddModal(false)}>
        <h1 className="text-xl font-bold">ADD APPS</h1>
        <hr />
        <div className="form max-w-full">
          <form onSubmit={handleSubmitAdd}>
            <div className="mt-5 ">
              <label
                htmlFor="appName"
                className="block text-sm font-medium text-gray-900"
              >
                Aplication Name
              </label>
              <input
                type="text"
                id="appName"
                name="appName"
                className="w-full py-2 px-3 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-600 focus:border-blue-500"
                onChange={handleChangeAdd}
              />
            </div>
            <div className="mt-5 ">
              <label
                htmlFor="subName"
                className="block text-sm font-medium text-gray-900"
              >
                Sub Name
              </label>
              <input
                type="text"
                id="subName"
                name="subName"
                className="w-full py-2 px-3 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-600 focus:border-blue-500"
                onChange={handleChangeAdd}
              />
            </div>
            <div className="mt-3 ">
              <label
                htmlFor="url"
                className="block text-sm font-medium text-gray-900"
              >
                Url
              </label>
              <input
                type="text"
                id="url"
                name="url"
                className="w-full py-2 px-3 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-600 focus:border-blue-500"
                onChange={handleChangeAdd}
              />
            </div>
            <div className="mt-3 ">
              <label
                htmlFor="port"
                className="block text-sm font-medium text-gray-900"
              >
                Port
              </label>
              <input
                type="number"
                id="port"
                name="port"
                className="w-full py-2 px-3 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-600 focus:border-blue-500"
                onChange={handleChangeAdd}
              />
            </div>
            <div className="mt-5 ">
              <label
                htmlFor="icon"
                className="block text-sm font-medium text-gray-900"
              >
                Icon
              </label>
              <input
                type="file"
                id="icon"
                name="icon"
                className="w-full py-2 px-3 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-600 focus:border-blue-500"
                onChange={handleChangeAdd}
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-20 py-2 bg-blue-600 hover:bg-blue-800 rounded-md text-white font-bold mt-5  "
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* UPDATE MODAL */}
      <Modal isOpen={editModal} onClose={() => setEditModal(false)}>
        <h1 className="text-xl font-bold">EDIT APPS</h1>
        <hr />
        <div className="form max-w-full">
          <form onSubmit={handleSubmitAdd}>
            <div className="mt-5 ">
              <label
                htmlFor="appName"
                className="block text-sm font-medium text-gray-900"
              >
                Aplication Name
              </label>
              <input
                type="text"
                id="appName"
                name="appName"
                className="w-full py-2 px-3 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-600 focus:border-blue-500"
                onChange={handleChangeAdd}
              />
            </div>
            <div className="mt-5 ">
              <label
                htmlFor="subName"
                className="block text-sm font-medium text-gray-900"
              >
                Sub Name
              </label>
              <input
                type="text"
                id="subName"
                name="subName"
                className="w-full py-2 px-3 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-600 focus:border-blue-500"
                onChange={handleChangeAdd}
              />
            </div>
            <div className="mt-3 ">
              <label
                htmlFor="url"
                className="block text-sm font-medium text-gray-900"
              >
                Url
              </label>
              <input
                type="text"
                id="url"
                name="url"
                className="w-full py-2 px-3 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-600 focus:border-blue-500"
                onChange={handleChangeAdd}
              />
            </div>
            <div className="mt-3 ">
              <label
                htmlFor="port"
                className="block text-sm font-medium text-gray-900"
              >
                Port
              </label>
              <input
                type="number"
                id="port"
                name="port"
                className="w-full py-2 px-3 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-600 focus:border-blue-500"
                onChange={handleChangeAdd}
              />
            </div>
            <div className="mt-5 ">
              <label
                htmlFor="icon"
                className="block text-sm font-medium text-gray-900"
              >
                Icon
              </label>
              <input
                type="file"
                id="icon"
                name="icon"
                className="w-full py-2 px-3 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-600 focus:border-blue-500"
                onChange={handleChangeAdd}
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-20 py-2 bg-blue-600 hover:bg-blue-800 rounded-md text-white font-bold mt-5  "
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* ALERT */}
      {alert.message && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ message: "", type: "" })}
        />
      )}
    </>
  );
}
