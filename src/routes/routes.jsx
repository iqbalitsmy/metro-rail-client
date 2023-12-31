import { createBrowserRouter } from "react-router-dom";
import Main from "../Pages/Main/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Components/Register/Register";
import ContactUs from "../Components/ContactUs/ContactUs";
import TrainInformation from "../Components/TrainInformation/TrainInformation";

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
  }
]);

export default router;