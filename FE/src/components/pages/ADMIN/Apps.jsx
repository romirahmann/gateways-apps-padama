/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { FaPlus, FaEdit } from "react-icons/fa";
import { IoIosApps } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { LuImageOff } from "react-icons/lu";
import { SearchComponent } from "../../shared/SearchComponent";
import { PaginationComponent } from "../../shared/PaginationComponent";
import { Modal } from "../../shared/Modal";
import axios from "axios";
import { ApiUrl, UrlBaseBackend } from "../../../context/urlApi";
import { Alert } from "../../shared/Alert";
import { FaDeleteLeft } from "react-icons/fa6";
import { motion } from "framer-motion";

export function Apps() {
  const [query, setQuery] = useState("");
  const [dataApp, setDataApp] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const [formAdd, setFormAdd] = useState({
    appName: "",
    subName: "",
    urlPadamaju: "",
    urlPadaprima: "",
    port: 0,
    icon: null,
  });
  const [formEdit, setFormEdit] = useState({
    appName: "",
    subName: "",
    urlPadamaju: "",
    urlPadaprima: "",
    port: 0,
    icon: null,
  });
  const baseUrl = useContext(ApiUrl);
  const getFileAPI = useContext(UrlBaseBackend);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const token = localStorage.getItem("token");
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [selectedId, setSelectedId] = useState(0);

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

    if (
      !formAdd.appName ||
      !formAdd.urlPadamaju ||
      !formAdd.urlPadaprima ||
      !formAdd.port ||
      !formAdd.icon
    ) {
      console.log("all require!");
    }

    const formData = new FormData();
    formData.append("appName", formAdd.appName);
    formData.append("subName", formAdd.subName);
    formData.append("urlPadamaju", formAdd.urlPadamaju);
    formData.append("urlPadaprima", formAdd.urlPadaprima);
    formData.append("port", formAdd.port);
    formData.append("file", formAdd.icon);

    try {
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
      console.log("Failed to Upload Data!", err);
      setAlert({ message: "Gagal mengupload data!", type: "error" });
    }
  };

  // EDIT FUNCTION
  const handleModalEdit = (data) => {
    setEditModal((prev) => !prev);
    setFormEdit({
      appName: data.appName || "",
      subName: data.subName || "",
      urlPadamaju: data.urlPadamaju || "",
      urlPadaprima: data.urlPadaprima || "",
      port: data.port || 0,
      icon: data.icon || null,
    });
    // console.log(data);
    setSelectedId(data.appId);
  };

  const handleChangeEdit = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files?.[0];
      if (!file) return;

      const validTypes = ["image/jpeg", "image/png"];
      if (!validTypes.includes(file.type)) {
        console.log("File hanya boleh jpg/png");
        return;
      }

      setFormEdit((prev) => ({
        ...prev,
        [name]: file,
      }));
    } else {
      setFormEdit((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    // console.log(typeof formEdit.icon);
    const formData = new FormData();
    formData.append("appName", formEdit.appName);
    formData.append("subName", formEdit.subName);
    formData.append("urlPadamaju", formEdit.urlPadamaju);
    formData.append("urlPadaprima", formEdit.urlPadaprima);
    formData.append("port", formEdit.port);
    formData.append("file", formEdit.icon);

    try {
      const response = await axios.put(
        `${baseUrl}/master/app/${selectedId}`,
        formData,
        config
      );
      // console.log(response.data.data);
      fecthApps();
      setEditModal(false);
      setAlert({
        message: "Berhasil update data aplikasi!",
        type: "success",
      });
    } catch (err) {
      console.log(err);
      setAlert({ message: "Gagal update data aplikasi!", type: "error" });
    }
  };

  // DELETE FUNCTION
  const handleSelectedId = (id) => {
    setSelectedId(id);
    deleteModal ? setDeleteModal(false) : setDeleteModal(true);
  };
  const handleDelete = (appId) => {
    if (!appId) return;
    const deleteData = async () => {
      try {
        let result = await axios.delete(
          `${baseUrl}/master/app/${appId}`,
          config
        );
        fecthApps();
        // console.log(result.data);
        setDeleteModal(false);
        setAlert({
          message: "Berhasil delete data aplikasi!",
          type: "success",
        });
      } catch (err) {
        console.log(err.response);
        setAlert({ message: "Gagal delete data aplikasi!", type: "error" });
      }
    };

    deleteData();
  };

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
                  <th className="px-4 py-3 uppercase">Image</th>
                  <th className="px-4 py-3 uppercase">Name</th>
                  <th className="px-4 py-3 uppercase">Sub Name</th>
                  <th className="px-4 py-3 uppercase">Port</th>
                  <th className="px-4 py-3 uppercase">Url Padaprima</th>
                  <th className="px-4 py-3 uppercase">Url Padamaju</th>
                  <th className="px-4 py-3 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedData.length > 0 ? (
                  paginatedData.map((app, index) => (
                    <tr key={app.id}>
                      <td className="px-4 py-3">
                        <img
                          src={`${getFileAPI}/icon/${app.icon}`}
                          alt={app.icon}
                          className="w-10"
                        />
                      </td>
                      <td className="px-4 py-3">{app.appName}</td>
                      <td className="px-4 py-3">{app.subName}</td>
                      <td className="px-4 py-3">{app.port}</td>
                      <td className="px-4 py-3">{app.urlPadaprima}</td>
                      <td className="px-4 py-3">{app.urlPadamaju}</td>
                      <td>
                        <div className="flex gap-2 text-2xl">
                          <button onClick={() => handleModalEdit(app)}>
                            <FaEdit className="text-green-700" />
                          </button>
                          <button onClick={() => handleSelectedId(app.appId)}>
                            <MdDeleteForever className="text-red-700" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="px-3 py-2">
                    <td colSpan="7" className=" text-center  font-bold">
                      {" "}
                      Data Not Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <PaginationComponent
            setPaginatedData={setPaginatedData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            data={filteredData}
          />
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
                htmlFor="urlPadamaju"
                className="block text-sm font-medium text-gray-900"
              >
                Url Padamaju
              </label>
              <input
                type="text"
                id="urlPadamaju"
                name="urlPadamaju"
                className="w-full py-2 px-3 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-600 focus:border-blue-500"
                onChange={handleChangeAdd}
              />
            </div>
            <div className="mt-3 ">
              <label
                htmlFor="urlPadaprima"
                className="block text-sm font-medium text-gray-900"
              >
                Url Padaprima
              </label>
              <input
                type="text"
                id="urlPadaprima"
                name="urlPadaprima"
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
          <form onSubmit={handleSubmitEdit}>
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
                value={formEdit.appName}
                className="w-full py-2 px-3 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-600 focus:border-blue-500"
                onChange={handleChangeEdit}
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
                value={formEdit.subName}
                className="w-full py-2 px-3 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-600 focus:border-blue-500"
                onChange={handleChangeEdit}
              />
            </div>
            <div className="mt-3 ">
              <label
                htmlFor="urlPadaprima"
                className="block text-sm font-medium text-gray-900"
              >
                Url Padaprima
              </label>
              <input
                type="text"
                id="urlPadaprima"
                name="urlPadaprima"
                value={formEdit.urlPadaprima}
                className="w-full py-2 px-3 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-600 focus:border-blue-500"
                onChange={handleChangeEdit}
              />
            </div>
            <div className="mt-3 ">
              <label
                htmlFor="urlPadamaju"
                className="block text-sm font-medium text-gray-900"
              >
                Url Padamaju
              </label>
              <input
                type="text"
                id="urlPadamaju"
                name="urlPadamaju"
                value={formEdit.urlPadamaju}
                className="w-full py-2 px-3 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-600 focus:border-blue-500"
                onChange={handleChangeEdit}
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
                value={formEdit.port}
                className="w-full py-2 px-3 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-600 focus:border-blue-500"
                onChange={handleChangeEdit}
              />
            </div>
            <div className="mt-5 ">
              <label
                htmlFor="icon"
                className="block text-sm font-medium text-gray-900"
              >
                Icon
              </label>
              <div className="inputFile flex gap-2 mt-1">
                {formEdit.icon && typeof formEdit.icon === "object" ? (
                  <LuImageOff className="text-xl text-gray-500" />
                ) : formEdit.icon ? (
                  <img
                    src={`${getFileAPI}/get-file/${formEdit.icon}`}
                    alt={formEdit.icon}
                    className="w-10 "
                  />
                ) : null}
                <input
                  type="file"
                  id="icon"
                  name="icon"
                  className="w-full py-2 px-3 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-600 focus:border-blue-500"
                  onChange={handleChangeEdit}
                />
              </div>
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

      {/* DELETE MODAL */}
      <Modal isOpen={deleteModal} onClose={() => setDeleteModal(false)}>
        <div className="container-fluid flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: [-50, 0, -15, 0] }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="icon text-[10em] text-center text-red-600"
          >
            <TiDelete />
          </motion.div>
          <div className="descriptionModalDelete">
            <p>Are you sure for delete this data apps ?</p>
          </div>
          <div className="buttonModalDelete mt-5 ">
            <button className="px-4 py-2 font-medium border border-gray-500 hover:bg-gray-200 hover:border-gray-900 rounded-lg">
              Cancel
            </button>
            <button
              onClick={() => handleDelete(selectedId)}
              className="px-4 py-2 ms-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-800"
            >
              Delete
            </button>
          </div>
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
