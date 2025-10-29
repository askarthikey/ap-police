import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login_manu from "./components/manufacturer/Login_manu";
import Home_manu from "./components/manufacturer/Home_manu";
import Home_main_page from "./components/Home_main_page";
import Register_manu from "./components/manufacturer/Register";
import Institutes_list from "./components/manufacturer/Institutes_list";
import InstituteRegister from "./components/institutes/institute_registration";
import InstituteLogin from "./components/institutes/institute_login";
import Institute_home from "./components/institutes/institute_home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home_main_page />,
    },
    {
      path: "/manufacturer-login",
      element: <Login_manu />,
    },
    {
      path: "/manufacturer-register",
      element: <Register_manu />,
    },
    {
      path: "/manufacturer-home/:Manufacturer_Name",
      element: <Home_manu />,
      children:[
        {
          path: "institutes-list",
          element: <Institutes_list />,
        }
      ]
    },{
      path:"/institutes/register",
      element:<InstituteRegister/>
    },{
      path:"/institutes/login",
      element:<InstituteLogin/>
    },{
      path:"/institutes/home",
      element:<Institute_home/>
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;