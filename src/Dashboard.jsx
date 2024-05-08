import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
    return (
        <div className="flex ">
            <div className="w-28 lg:w-60 md:w-36 min-h-full bg-red-400">
                <ul className="menu">

                    <li className=" text-sm md:text-xl md:font-medium">
                        <NavLink to='/'>Dashboard</NavLink>
                    </li>

                    <li className="text-sm md:text-xl md:font-medium">
                        <NavLink to='/user'>Add User</NavLink>
                    </li>
                    <li className="text-sm md:text-xl md:font-medium mt-3">
                        <NavLink to='/alluser'>All User</NavLink>
                    </li>
                    
                </ul>
            </div>

            <div className="flex-1 md:overflow-hidden ml-8 ">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;