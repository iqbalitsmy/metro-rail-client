import { createBrowserRouter } from "react-router-dom";

import Register from "../Components/Register/Register";
import ContactUs from "../Components/ContactUs/ContactUs";
import TrainInformation from "../Components/TrainInformation/TrainInformation";
import Main from "../layout/Main/Main";
import Home from "../layout/Home/Home";
import Login from "../layout/Login/Login";
import Dashboard from "../layout/Dashboard/Dashboard";
import DashboardPage from "../Pages/Dashboard/Dashboard/DashboardPage";
import Users from "../Pages/Dashboard/Users/Users";
import TrainList from "../Pages/Dashboard/TrainList/TrainList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/signup",
        element: <Register></Register>
      },
      {
        path: "/train-information",
        element: <TrainInformation></TrainInformation>
      },
      {
        path: "/contact-us",
        element: <ContactUs></ContactUs>
      },
    ]
  },
  {
    path: '/login',
    element: <Login></Login>,
    children: [
      {}
    ]
  },
  {
    path: '/dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "",
        element: <DashboardPage></DashboardPage>
      },
      {
        path: "user",
        element: <Users />
      },
      {
        path: "train-list",
        element: <TrainList></TrainList>
      },
      {
        path: "add-train",
        element: <div>Add Train</div>
      },
    ]
  }
]);

export default router;