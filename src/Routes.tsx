import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Print from "./pages/print";
import Project from "./pages/project";
import ModalStepper from "./pages/modelStepper";
import Login from "./pages/login";
import Forgotpass from "./pages/forgotpass";
import Forgotpass2 from "./pages/forgotpass";
import Resetpass from "./pages/resetpass";
import Successfullreset from "./pages/successfullreset";

const router = createBrowserRouter([
  { path: "login",
   element: <Login />
  },
  {
    path: "/print/:printerId",
    element: <Print />,
  },
  {
    path: "/project",
    element: <Project />,
  },
  {
    path: "/modal",
    element: <ModalStepper />,
  },
  {
    path: "/forgotpass",
    element: <Forgotpass />,
  },
  
  {
    path: "/forgotpass2",
    element: <Forgotpass2 />,
  },
 {
  path:"/resetpass",
  element: <Resetpass />,
 },
 {
  path:"/success",
  element: <Successfullreset />,
 },
  
]);

function Routes() {
  return <RouterProvider router={router} />;
}

export default Routes;
