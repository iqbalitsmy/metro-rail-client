import { Outlet, createBrowserRouter } from "react-router-dom";

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
import AddTickets from "../Pages/Dashboard/AddTickets/AddTickets";
import TicketsList from "../Pages/Dashboard/TicketsList/TicketsList";
import StationList from "../Pages/Dashboard/Dashboard/StationList/StationList";
import AddStation from "../Pages/Dashboard/Dashboard/StationList/AddStation";
import Payment from "../Components/Payment/Payment";
import Success from "./Success";
import Cancel from "./Cancel";
import AddUser from "../Pages/Dashboard/Users/AddUser";
import Profile from "../Pages/Profile/Profile/Profile";
import Tickets from "../Pages/Profile/Tickets/Tickets";
import TicketRefund from "../Pages/Dashboard/TicketRefund/TicketRefund";
import UpdateUser from "../Pages/Dashboard/Users/UpdateUser";


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
        path: "/profile",
        element: <Profile></Profile>,
        children: [
          {
            path: "tickets",
            element: <Tickets></Tickets>
          }
        ]
      },
      {
        path: "/success",
        element: <Success />
      },
      {
        path: "/cancel",
        element: <Cancel></Cancel>
      },
      {
        path: "/contact-us",
        element: <ContactUs></ContactUs>
      },
      {
        path: "/process/payment",
        element: <Payment />
      },
    ]
  },
  {
    path: 'login',
    element: <Login></Login>,
    children: [
      {}
    ]
  },
  {
    path: '/admin',
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "dashboard",
        element: <DashboardPage></DashboardPage>
      },
      {
        path: "users",
        element: <Outlet></Outlet>,
        children: [
          {
            path: "",
            element: <Users></Users>
          },
          {
            path: "add-user",
            element: <AddUser></AddUser>
          },
          {
            path: ":id",
            element: <UpdateUser></UpdateUser>,
            loader: ({ params }) => fetch(`http://localhost:3001/api/v1/user/${params.id}`, {
              method: "GET",
              credentials: 'include',
              headers: {
                'content-type': "application/json",
              }
            })
          }
        ]
      },
      {
        path: "train-list",
        element: <TrainList></TrainList>
      },
      {
        path: "station-list",
        element: <Outlet></Outlet>,
        children: [
          {
            path: "",
            element: <StationList></StationList>
          },
          {
            path: "add-station",
            element: <AddStation></AddStation>
          }
        ]
      },
      {
        path: "tickets",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <TicketsList />,
          },
          {
            path: "add-tickets",
            element: <AddTickets />
          },
        ]
      },
      {
        path: "refund-tickets",
        element: <TicketRefund />
      },
    ]
  }
]);

export default router;