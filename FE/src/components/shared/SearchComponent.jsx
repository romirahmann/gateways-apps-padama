/* eslint-disable no-unused-vars */
export function SearchComponent({
  result,
  data,
  queryInput,
  currentQuery = "",
}) {
  const handleSearch = (value) => {
    const query = value.toLowerCase();
    queryInput(query);
    const filteredData = data.filter((item) =>
      Object.values(item).some((val) => {
        if (val === null || val === undefined) {
          return false; // Lewati nilai null/undefined
        }
        return val.toString().toLowerCase().includes(query);
      })
    );

    // Update state, tetap update dengan array kosong jika tidak ada hasil
    result(filteredData);
  };

  return (
    <>
      <div className="search">
        <div className="relative">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-50 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={currentQuery}
            onChange={(e) => handleSearch(e.target.value)}
            id="table-search"
            className="block py-2 ps-10 text-sm  border border-gray-300 rounded-lg w-40 lg:w-80 bg-gray-50 focus:ring-blue-600 focus:border-blue-500 "
          />
        </div>
      </div>
    </>
  );
}
