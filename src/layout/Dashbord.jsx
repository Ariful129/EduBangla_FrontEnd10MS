import { FaAd, FaCalendar, FaHome, FaList, FaMobile} from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from '../assets/login/Logo2.png'
import UseAuth from "../hooks/UseAuth";

const Dashbord = () => {
  //From Custom Hook
  const auth=UseAuth();
  const {user}=auth;
  console.log(user.email)

    return (
        <div className="flex">
        {/* dashboard side bar */}
        <div className="w-64 min-h-screen bg-orange-400 ">
            
            <ul className="menu p-4 text-xl font-semibold">
                <li className="mb-2">
                    <Link to='/'>
                        <img  className=" rounded-3xl w-44 border-2 border-gray-400 h-14" src={logo} alt=""  />
                    </Link>
                </li>
                <div className="divider"></div>
                {user.email=='admin@gmail.com' &&
                     <li>
                     <NavLink to="/dashboard/admin">
                         <FaHome></FaHome>
                         Admin Pannel</NavLink>
                     </li>
                }
                
                <li>
                    <NavLink to="/dashboard/procedure">
                        <FaCalendar></FaCalendar>
                        Procedure</NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/apply">
                        <FaAd></FaAd>
                        Apply </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/addcourse">
                        <FaList></FaList>
                        Add Course</NavLink>
                </li>
                <div className="divider"></div>
                <li>
                    <NavLink to="/">
                        <FaHome></FaHome>
                        Home</NavLink>
                </li>
               
               
                <li>
                    <NavLink to="/dashboard/coursestatus">
                        <FaCalendar></FaCalendar>
                        Course Status</NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/coursesetauls">
                       <FaMobile></FaMobile>
                        Course Details</NavLink>
                </li>
            </ul>
        </div>
        {/* dashboard content */}
        <div className="flex-1 p-8">
            <h1 className="text-2xl border-b-2 text-center text-green-500">Dashboard</h1>
            <Outlet></Outlet>
        </div>
    </div>
    );
};

export default Dashbord;