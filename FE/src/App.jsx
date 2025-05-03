import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes/Routes";

import { ApiUrl } from "./context/urlApi";

function App() {
  const baseURL = "http://192.168.9.192:3004/api";
  return (
    <>
      <ApiUrl value={baseURL}>
        <RouterProvider router={router} />
      </ApiUrl>
    </>
  );
}

export default App;
