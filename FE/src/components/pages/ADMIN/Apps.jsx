import { useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import { IoIosApps } from "react-icons/io";

export function Apps() {
  const [search, setSearch] = useState("");
  return (
    <>
      <div className="title flex items-center text-2xl text-gray-800">
        <IoIosApps />
        <h1 className=" ms-2 font-bold">DATA PRINDO'S APP</h1>
      </div>
      <div className="box-table bg-white max-w-full mt-5">
        <div className="p-4 bg-white rounded-xl shadow-lg">
          {/* Search */}
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-700">Data Table</h2>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-blue-100 text-blue-800 font-semibold">
                <tr>
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Port</th>
                  <th className="px-4 py-3">Icon</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200"></tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
            <span>Showing 1 to 5 of 25 entries</span>
            <div className="flex gap-1">
              <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200">
                Prev
              </button>
              <button className="px-3 py-1 bg-blue-500 text-white rounded">
                1
              </button>
              <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200">
                2
              </button>
              <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200">
                3
              </button>
              <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
