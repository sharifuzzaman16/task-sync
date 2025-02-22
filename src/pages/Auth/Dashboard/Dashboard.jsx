import React, { useContext } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaRegEdit } from 'react-icons/fa';
import { FaPlus, FaRegBell, FaRegStar, FaRegTrashCan, FaRegUser } from 'react-icons/fa6';
import { GrCompliance } from 'react-icons/gr';
import { IoCheckmarkDone } from 'react-icons/io5';
import { MdLogout } from 'react-icons/md';
import { TfiDashboard } from 'react-icons/tfi';
import ThemeToggle from '../../../utils/ThemeToggle.jsx';
import Logo from '/scheduler-svgrepo-com.svg'
import { useState } from "react";
import { AuthContext } from '../../../AuthProvider.jsx';
import Swal from 'sweetalert2';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    // console.log(user)

    


    const handleLogout = () => {
        logout()
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'User Logged Out',
                    text: 'Be back soon!',
                    timer: 2000,
                    showConfirmButton: false
                });
                navigate('/');
            }).catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Logout Failed',
                    text: error.message,
                });
            });
    }

    return (
        <div className='bg-[#F7F7F7] dark:bg-[#2A2A2A] max-w-[1440px] min-h-screen flex'>
            <div className='w-[20%] min-h-screen bg-white dark:bg-[#1E1E1E] border-r-2 border-[#F7F7F7] dark:border-[#2A2A2A] flex flex-col justify-between'>

                <div>
                    <div className="w-full h-[70px] flex items-center justify-center">
                        <h3 className='text-2xl font-bold text-blue-500 flex items-center'><img className='w-8' src={Logo} alt="" /> TaskSync</h3>
                    </div>
                    <ul className='flex flex-col w-full gap-3 p-8'>
                        <li className=' py-2 w-full border border-[#F7F7F7] dark:border-[#2A2A2A] rounded-lg px-4'><Link to={'/dashboard/overview'} className='text-lg font-semibold flex items-center dark:text-[#E0E0E0] text-[#1E2022] gap-2' href=""><TfiDashboard className='text-2xl text-orange-500'></TfiDashboard> Overview</Link></li>
                        <li className=' py-2 w-full border border-[#F7F7F7] dark:border-[#2A2A2A] rounded-lg px-4'><Link to={'/dashboard/tasks'} className='text-lg font-semibold flex items-center dark:text-[#E0E0E0] text-[#1E2022] gap-2' href=""><GrCompliance className='text-2xl text-blue-500'></GrCompliance> Tasks</Link></li>
                        <li className=' py-2 w-full border border-[#F7F7F7] dark:border-[#2A2A2A] rounded-lg px-4'><Link to={'/dashboard/important-tasks'} className='text-lg font-semibold flex items-center dark:text-[#E0E0E0] text-[#1E2022] gap-2' href=""><FaRegStar className='text-2xl text-yellow-500'></FaRegStar> Important Tasks</Link></li>
                        <li className=' py-2 w-full border border-[#F7F7F7] dark:border-[#2A2A2A] rounded-lg px-4'><Link to={'/dashboard/completed-tasks'} className='text-lg font-semibold flex items-center dark:text-[#E0E0E0] text-[#1E2022] gap-2' href=""><IoCheckmarkDone className='text-green-500 text-2xl'></IoCheckmarkDone> Completed Tasks</Link></li>
                        <li className=' py-2 w-full border border-[#F7F7F7] dark:border-[#2A2A2A] rounded-lg px-4'><Link to={'/dashboard/profile'} className='text-lg font-semibold flex items-center dark:text-[#E0E0E0] text-[#1E2022] gap-2' href=""><FaRegUser className='text-2xl text-violet-500'></FaRegUser> Profile</Link></li>
                    </ul>
                </div>
                <div className='w-full p-8'>
                    <button onClick={handleLogout} className='bg-red-500 flex items-center justify-center text-lg gap-2 px-4 w-full py-2 rounded-lg text-white'>Logout <MdLogout></MdLogout></button>
                </div>
            </div>
            <div className='w-[80%] h-screen overflow-y-scroll bg-[#F7F7F7] dark:bg-[#2A2A2A]'>
                <div className='w-[80%] h-[70px] fixed top-0 right-0 bg-white dark:bg-[#1E1E1E] px-8 flex items-center justify-between'>
                    <div className='max-w-xs'>
                        <label className="input input-bordered border-[#F7F7F7] dark:border-[#2A2A2A] bg-[#F7F7F7] dark:bg-[#2A2A2A] py-0 dark:text-[#E0E0E0] text-[#1E2022] flex items-center gap-2">
                            <input type="text" className="grow dark:text-[#E0E0E0] text-[#1E2022]" placeholder="Search" />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                    clipRule="evenodd" />
                            </svg>
                        </label>
                    </div>
                    <div className='flex items-center gap-4'>

                        <ThemeToggle></ThemeToggle>
                        <FaRegBell className='text-xl dark:text-[#E0E0E0] text-[#1E2022]'></FaRegBell>
                        <div className="avatar">
                            <div className="ring-[#F7F7F7] dark:ring-[#2A2A2A] ring-offset-base-100 w-[46px] rounded-full ring ring-offset">
                                <img src={user?.photoURL} />
                            </div>
                        </div>
                    </div>
                </div>

                <Outlet></Outlet>

            </div>
        </div>
    );
};

export default Dashboard;