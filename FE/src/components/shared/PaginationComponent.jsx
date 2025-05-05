/* eslint-disable no-unused-vars */
import { useEffect, useMemo } from "react";

/* eslint-disable no-unused-vars */
export function PaginationComponent({
  setPaginatedData,
  currentPage,
  setCurrentPage,
  data = [],
  itemShow,
}) {
  return (
    <>
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <span>Showing 0 of 0 entries</span>
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
    </>
  );
}
