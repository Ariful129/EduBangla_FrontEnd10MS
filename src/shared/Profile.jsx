import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import userpic from '../assets/login/user.png'
import { LuClapperboard } from "react-icons/lu";
import { SlCamrecorder } from "react-icons/sl";
import { MdOutlineFileCopy } from "react-icons/md";
import {  FaLongArrowAltRight,  } from "react-icons/fa";
import logo from '../assets/login/Logo2.png'
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { IoManSharp } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";



const Profile = () => {
    //from Cntex API
    const { user,logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignOut = () => {
        logOut()
            .then(res => {
                console.log('Logout Successful', res)
                navigate('/');
            })
            .catch(error => {
                console.error(error);
            })
    }


    return (

        <div className="flex">
        {/* dashboard side bar */}
        <div className="w-64 min-h-screen bg-base-100">
            
            <ul className="menu p-4 text-xl font-semibold">
                <li className="mb-2">

                    <Link to='/'>
                       <img className=" rounded-3xl w-44 border-2 border-gray-400 h-14" src={logo} alt="" />
                    </Link>
                </li>
                <li className="border-t-2 border-b-2 mb-10 mt-4">
                            <div>
                                <img className="h-[35px] mr-1 rounded-full" src={userpic} alt="" />
                                <p className="font-semibold  text-xs ">{user.displayName}</p>
                            </div>
                        </li>
                <div className="divider"></div>
                
                <li>
                    <NavLink to="/profile/myprofile">
                        <IoManSharp />
                        MyProfile</NavLink>
                </li>
                <li>
                    <NavLink to="/profile/mycourse">
                        <LuClapperboard />
                         My Course</NavLink>
                </li>
                <li>
                    <NavLink to="/">
                    <SlCamrecorder />
                     Recording</NavLink>
                </li>
                <div className="divider"></div>
                <li>
                    <NavLink to="/">
                    <MdOutlineFileCopy /> Resourses</NavLink>
                </li>
               
               
                <li className="border-t-2  mt-64 ">
                  <div>
                    <button className="btn  text-xl btn-warning" onClick={handleSignOut}>LogOut <IoMdLogOut /></button>
                   </div>
                </li>
            </ul>
        </div>
        {/* dashboard content */}
        <div className="flex-1 p-8">
        <div className="flex flex-col w-full border-opacity-50">
                     <div className="flex justify-between items-center">
                        <p className="text-2xl font-semibold">Profile</p>
                        <Link to='/dashboard'>
                           <button className="btn  text-xl bg-base-100">Dashboard <FaLongArrowAltRight /></button>
                        </Link>
                     </div>

                    <div className="divider">&&</div>
                    <div className="grid h-16 card bg-base-100 rounded-box place-items-center">
                        <div  className="flex gap-6">
                            <p className=" hover:bg-slate-300 p-2 rounded-xl">Account Details</p>
                             <p className=" hover:bg-slate-300 p-2 rounded-xl">Tranjaction</p>
                        </div>
                    </div>
                </div>

            <Outlet></Outlet>
        </div>
    </div>


    );
};

export default Profile;