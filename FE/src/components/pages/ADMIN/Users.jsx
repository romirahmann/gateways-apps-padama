/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { FaEdit, FaPlus, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";
import { SearchComponent } from "../../shared/SearchComponent";
import { ApiUrl } from "../../../context/urlApi";
import axios from "axios";
import { PaginationComponent } from "../../shared/PaginationComponent";
import { MdDeleteForever } from "react-icons/md";
import { Modal } from "../../shared/Modal";
import { TiDelete } from "react-icons/ti";
import { Alert } from "../../shared/Alert";
import addLog from "../../../context/LogActivity";

/* eslint-disable no-unused-vars */
export function Users() {
  const [query, setQuery] = useState("");
  const [dataUser, setDataApp] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);

  // ALERT
  const [alert, setAlert] = useState(false);

  // MODAL
  const [addModal, setAddModal] = useState(false);
  const [formAdd, setFormAdd] = useState({
    username: "",
    password: "",
    roleId: 1,
  });
  const [editModal, setEditModal] = useState(false);
  const [formEdit, setFormEdit] = useState({
    username: "",
    roleId: 0,
  });
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(0);
  const IpComp = localStorage.getItem("IP_COMPUTER");
  const baseUrl = useContext(ApiUrl);
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  useEffect(() => {
    fecthUsers();
  }, []);

  const fecthUsers = async () => {
    try {
      const res = await axios.get(`${baseUrl}/master/users`, config);
      let data = res.data.data;

      setDataApp(data);
      setFilteredData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleQuery = (query) => {
    setQuery(query);
  };

  // FUCNTIONAL ADD
  const handleChangeAdd = (e) => {
    const { name, value } = e.target;
    setFormAdd((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmitAdd = async (e) => {
    e.preventDefault();

    if (!formAdd.username || !formAdd.password || !formAdd.roleId) {
      console.log("all require!");
      return;
    }

    try {
      let res = await axios.post(`${baseUrl}/master/register`, formAdd, config);
      fecthUsers();
      setAddModal(false);
      setAlert({
        message: "Berhasil menambahkan user",
        type: "success",
      });

      addLog(
        IpComp,
        "ADD USER",
        1,
        `user ${formAdd.username} berhasil ditambahkan`
      );

      setTimeout(() => {
        setAlert({
          message: "",
          type: "",
        });
      }, 2000);
    } catch (err) {
      addLog(
        IpComp,
        "ADD USER",
        0,
        `user ${formAdd.username} gagal ditambahkan`
      );
      setAlert({
        message: "Gagal menambahkan user",
        type: "error",
      });
      setTimeout(() => {
        setAlert({
          message: "",
          type: "",
        });
      }, 2000);
      console.log(err);
    }
  };

  // FUCNTIONAL EDIT
  const openModalEdit = (data) => {
    !editModal ? setEditModal(true) : setEditModal(false);
    setSelectedUser(data);
    setFormEdit({
      username: data.username,
      roleId: data.roleId,
    });
  };
  const handleChangeEdit = (e) => {
    setFormEdit((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    try {
      let res = await axios.put(
        `${baseUrl}/master/user/${selectedUser.userId}`,
        formEdit,
        config
      );
      console.log(res.data.data);
      fecthUsers();
      addLog(
        IpComp,
        "EDIT USER",
        1,
        `username ${selectedUser.username} berhasil diedit menjadi ${formEdit.username} dan email ${selectedUser.roleId} menjadi ${formEdit.roleId}`
      );
      setAlert({
        message: "Berhasil edit user",
        type: "success",
      });
      setTimeout(() => {
        setAlert({
          message: "",
          type: "",
        });
      }, 2000);

      setEditModal(false);
    } catch (err) {
      console.log(err);
      addLog(IpComp, "EDIT USER", 0, `gagal edit user!`);
      setAlert({
        message: "Gagal edit user",
        type: "error",
      });
    }
  };

  // FUNCTIONAL DELETE
  const openModalDelete = (data) => {
    setSelectedUser(data);
    !deleteModal ? setDeleteModal(true) : setDeleteModal(false);
  };
  const handleDelete = async () => {
    try {
      let res = await axios.delete(
        `${baseUrl}/master/user/${selectedUser.userId}`,
        config
      );
      addLog(
        IpComp,
        "DELETE USER",
        1,
        `user ${selectedUser.username} berhasil di delete`
      );
      fecthUsers();
      setDeleteModal(false);
      setAlert({
        message: "Berhasil menghapus user",
        type: "success",
      });
      setTimeout(() => {
        setAlert({
          message: "",
          type: "",
        });
      }, 2000);
    } catch (err) {
      console.log(err);
      addLog(
        IpComp,
        "DELETE USER",
        0,
        `user ${selectedUser.username} gagal di delete`
      );
      setAlert({
        message: "Gagal hapus user",
        type: "error",
      });
      setTimeout(() => {
        setAlert({
          message: "",
          type: "",
        });
      }, 2000);
    }
  };

  return (
    <>
      <div className="title flex items-center text-2xl text-gray-800">
        <FaUsers />
        <h1 className=" ms-2 font-bold">DATA USERS</h1>
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
              <span>Add User</span>
            </button>
            <div className="ms-auto">
              <SearchComponent
                result={setFilteredData}
                data={dataUser}
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
                  <th className="px-4 py-3">NO</th>
                  <th className="px-4 py-3">USERNAME</th>
                  <th className="px-4 py-3">ROLE</th>
                  <th className="px-4 py-3">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedData.length > 0 ? (
                  paginatedData.map((user, index) => (
                    <tr key={user.userId}>
                      <td className="px-4 py-3">
                        {(currentPage - 1) * 10 + index + 1}
                      </td>
                      <td className="px-4 py-3">{user.username}</td>
                      <td className="px-4 py-3">{user.roleName}</td>
                      <td>
                        <div className="flex gap-2 text-2xl">
                          <button onClick={() => openModalEdit(user)}>
                            <FaEdit className="text-green-700" />
                          </button>
                          <button onClick={() => openModalDelete(user)}>
                            <MdDeleteForever className="text-red-700" />
                          </button>
                        </div>
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

      <Modal isOpen={addModal} onClose={() => setAddModal(false)}>
        <h1 className="text-xl font-bold">ADD APPS</h1>
        <hr />
        <div className="form max-w-full">
          <form onSubmit={handleSubmitAdd}>
            <div className="mt-5 ">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-900"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full py-2 px-3 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-600 focus:border-blue-500"
                onChange={handleChangeAdd}
              />
            </div>
            <div className="mt-5 ">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full py-2 px-3 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-600 focus:border-blue-500"
                onChange={handleChangeAdd}
              />
            </div>
            <div className="mt-5 ">
              <label
                htmlFor="roleId"
                className="block text-sm font-medium text-gray-900"
              >
                User Role
              </label>
              <select
                name="roleId"
                className="w-full py-2 px-3 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-600 focus:border-blue-500"
              >
                <option value="1">ADMIN</option>
                <option value="2">USERS</option>
              </select>
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
      <Modal isOpen={editModal} onClose={() => setEditModal(false)}>
        <h1 className="text-xl font-bold">EDIT APPS</h1>
        <hr />
        <div className="form max-w-full">
          <form onSubmit={handleSubmitEdit}>
            <div className="mt-5 ">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-900"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formEdit.username}
                className="w-full py-2 px-3 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-600 focus:border-blue-500"
                onChange={handleChangeEdit}
              />
            </div>

            <div className="mt-5 ">
              <label
                htmlFor="roleId"
                className="block text-sm font-medium text-gray-900"
              >
                User Role
              </label>
              <select
                name="roleId"
                value={formEdit.roleId}
                onChange={handleChangeEdit}
                className="w-full py-2 px-3 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-600 focus:border-blue-500"
              >
                <option value="1">ADMIN</option>
                <option value="2">USERS</option>
              </select>
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
            <p>Are you sure for delete this user ?</p>
          </div>
          <div className="buttonModalDelete mt-5 ">
            <button
              onClick={() => setDeleteModal(false)}
              className="px-4 py-2 font-medium border border-gray-500 hover:bg-gray-200 hover:border-gray-900 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDelete()}
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
