import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/Layouts/RootLayout";
import HomePage from "./pages/Home/Home";
import AuthLayout from "./pages/Layouts/AuthLayout";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
      ],
    },
    {
      path: "/auth",
      Element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <Login />,
        },
        {
          path: "/auth/register",
          element: <Register />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
