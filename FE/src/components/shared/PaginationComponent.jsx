import { useEffect, useMemo } from "react";

export const PaginationComponent = ({
  setPaginatedData,
  currentPage,
  setCurrentPage,
  data,
  itemShow,
}) => {
  const itemsPerPage = itemShow || 10;
  const totalPages = useMemo(
    () => Math.ceil((data?.length || 0) / itemsPerPage),
    [data, itemsPerPage]
  );

  useEffect(() => {
    if (data.length > 0) {
      const paginatedData = data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );
      setPaginatedData(paginatedData);
    } else {
      setPaginatedData([]);
    }
  }, [currentPage, data, itemsPerPage, setPaginatedData]);

  const handlePageChange = (page) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  };

  return (
    <div className="footer flex flex-wrap mt-5 items-center justify-between">
      <p className="text-gray-600 text-sm">
        Showing{" "}
        <strong>{Math.min(currentPage * itemsPerPage, data.length)}</strong> of{" "}
        <strong>{data.length}</strong> Data
      </p>

      <div className="flex items-center space-x-1 mt-2 sm:mt-0">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm border rounded disabled:opacity-50 hover:bg-gray-100"
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 text-sm border rounded ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm border rounded disabled:opacity-50 hover:bg-gray-100"
        >
          Next
        </button>
      </div>
    </div>
  );
};
