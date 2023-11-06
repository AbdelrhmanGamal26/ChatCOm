import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/Root/Root";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      Element: <RootLayout />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
