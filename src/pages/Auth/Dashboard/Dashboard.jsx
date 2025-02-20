import React from 'react';
import { FaPlus, FaRegBell, FaRegStar, FaRegUser } from 'react-icons/fa6';
import { GrCompliance } from 'react-icons/gr';
import { IoCheckmarkDone } from 'react-icons/io5';
import { MdLogout } from 'react-icons/md';
import { TfiDashboard } from 'react-icons/tfi';

const Dashboard = () => {
    return (
        <div className='bg-[#F7F7F7] max-w-[1440px] min-h-screen flex'>
            <div className='w-[20%] min-h-screen bg-white border-r-2 border-[#F7F7F7] flex flex-col justify-between'>

                <div>
                    <div className="w-full h-[70px] flex items-center justify-center">
                        <h3 className='text-2xl font-bold'>TaskSync</h3>
                    </div>
                    <ul className='flex flex-col w-full gap-3 p-8'>
                        <li className=' py-2 w-full border border-[#F7F7F7] rounded-lg px-4'><a className='text-lg font-semibold flex items-center gap-2' href=""><TfiDashboard className='text-2xl text-orange-500'></TfiDashboard> Overview</a></li>
                        <li className=' py-2 w-full border border-[#F7F7F7] rounded-lg px-4'><a className='text-lg font-semibold flex items-center gap-2' href=""><GrCompliance className='text-2xl text-blue-500'></GrCompliance> Tasks</a></li>
                        <li className=' py-2 w-full border border-[#F7F7F7] rounded-lg px-4'><a className='text-lg font-semibold flex items-center gap-2' href=""><FaRegStar className='text-2xl text-yellow-500'></FaRegStar> Important Tasks</a></li>
                        <li className=' py-2 w-full border border-[#F7F7F7] rounded-lg px-4'><a className='text-lg font-semibold flex items-center gap-2' href=""><IoCheckmarkDone className='text-green-500 text-2xl'></IoCheckmarkDone> Completed Tasks</a></li>
                        <li className=' py-2 w-full border border-[#F7F7F7] rounded-lg px-4'><a className='text-lg font-semibold flex items-center gap-2' href=""><FaRegUser className='text-2xl text-violet-500'></FaRegUser> Profile</a></li>
                    </ul>
                </div>
                <div className='w-full p-8'>
                    <button className='bg-red-500 flex items-center justify-center text-lg gap-2 px-4 w-full py-2 rounded-lg text-white'>Logout <MdLogout></MdLogout></button>
                </div>
            </div>
            <div className='w-[80%] min-h-screen bg-[#F7F7F7]'>
                <div className='w-full h-[70px] bg-white px-8 flex items-center justify-between'>
                    <div className='max-w-xs'>
                        <label className="input input-bordered py-0 flex items-center gap-2">
                            <input type="text" className="grow" placeholder="Search" />
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
                        <div>
                            <label className="flex cursor-pointer gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="5" />
                                    <path
                                        d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                                </svg>
                                <input type="checkbox" value="synthwave" className="toggle theme-controller" />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                </svg>
                            </label>
                        </div>
                        <FaRegBell className='text-xl'></FaRegBell>
                        <div className="avatar">
                            <div className="ring-[#F7F7F7] ring-offset-base-100 w-[46px] rounded-full ring ring-offset">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    );
};

export default Dashboard;