import {createBrowserRouter} from "react-router-dom";
import Dashboard from "./Dashboard";
import User from "./Dashborad/User";
import Alluser from "./Dashborad/Alluser";
import Update from "./Dashborad/Update";
import DashbordeProfle from "./Dashborad/DashbordeProfle";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard></Dashboard>,
      children:[
        {
            path:'/',
            element:<DashbordeProfle></DashbordeProfle>,
            loader: () => fetch('https://react-js-server.vercel.app/users')
        },
        {
            path:'user',
            element:<User></User>
        },
        {
            path:'alluser',
            element: <Alluser></Alluser>,
            loader: () => fetch('https://react-js-server.vercel.app/users')
            
        },
        {
            path:'update/:id',
            element:<Update></Update>,
            loader: ({params})=>fetch(`https://react-js-server.vercel.app/users/${params.id}`)
        }
      ]
    },
  ]);
  export default router;