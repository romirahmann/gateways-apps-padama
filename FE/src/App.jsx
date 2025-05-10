import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes/Routes";

import { ApiUrl } from "./context/urlApi";
import { api } from "./context/urlApi";

function App() {
  const baseURL = api;
  return (
    <>
      <ApiUrl value={baseURL}>
        <RouterProvider router={router} />
      </ApiUrl>
    </>
  );
}

export default App;
