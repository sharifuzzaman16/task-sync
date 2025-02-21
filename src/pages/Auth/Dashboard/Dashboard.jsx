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
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    console.log(user)

    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("To-Do");
    const [priority, setPriority] = useState("Medium");

    // Open modal with the selected category
    const openModal = (selectedCategory) => {
        setCategory(selectedCategory);
        setIsOpen(true);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) {
            alert("Title is required!");
            return;
        }
        if (title.length > 50) {
            alert("Title must be under 50 characters!");
            return;
        }
        if (description.length > 200) {
            alert("Description must be under 200 characters!");
            return;
        }

        console.log({ title, description, category, priority });

        // Close modal & reset fields
        setIsOpen(false);
        setTitle("");
        setDescription("");
        setPriority("Medium");
    };


    const handleLogout = () => {
        logout()
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'User Logged Out',
                    text: 'See you soon!',
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
                        <li className=' py-2 w-full border border-[#F7F7F7] dark:border-[#2A2A2A] rounded-lg px-4'><a className='text-lg font-semibold flex items-center dark:text-[#E0E0E0] text-[#1E2022] gap-2' href=""><TfiDashboard className='text-2xl text-orange-500'></TfiDashboard> Overview</a></li>
                        <li className=' py-2 w-full border border-[#F7F7F7] dark:border-[#2A2A2A] rounded-lg px-4'><a className='text-lg font-semibold flex items-center dark:text-[#E0E0E0] text-[#1E2022] gap-2' href=""><GrCompliance className='text-2xl text-blue-500'></GrCompliance> Tasks</a></li>
                        <li className=' py-2 w-full border border-[#F7F7F7] dark:border-[#2A2A2A] rounded-lg px-4'><a className='text-lg font-semibold flex items-center dark:text-[#E0E0E0] text-[#1E2022] gap-2' href=""><FaRegStar className='text-2xl text-yellow-500'></FaRegStar> Important Tasks</a></li>
                        <li className=' py-2 w-full border border-[#F7F7F7] dark:border-[#2A2A2A] rounded-lg px-4'><a className='text-lg font-semibold flex items-center dark:text-[#E0E0E0] text-[#1E2022] gap-2' href=""><IoCheckmarkDone className='text-green-500 text-2xl'></IoCheckmarkDone> Completed Tasks</a></li>
                        <li className=' py-2 w-full border border-[#F7F7F7] dark:border-[#2A2A2A] rounded-lg px-4'><a className='text-lg font-semibold flex items-center dark:text-[#E0E0E0] text-[#1E2022] gap-2' href=""><FaRegUser className='text-2xl text-violet-500'></FaRegUser> Profile</a></li>
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

                <div className='w-full grid pt-[70px] gap-6 my-6 px-6 grid-cols-3'>
                    <div className='w-full'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <div className='bg-red-500 w-2 h-2 rounded-full'></div>
                                <div className='flex items-center gap-3'>
                                    <h4 className='font-semibold dark:text-[#E0E0E0] text-[#1E2022]'>TO DO</h4>
                                    <h4 className='font-semibold dark:text-[#E0E0E0] text-[#1E2022]'>7</h4>
                                </div>
                            </div>
                            <BsThreeDotsVertical className='text-xl dark:text-[#E0E0E0] text-[#1E2022]'></BsThreeDotsVertical>
                        </div>
                        <div>
                            <button onClick={() => openModal("To-Do")} className='flex items-center justify-center gap-2 shadow-sm bg-white dark:bg-[#1E1E1E] py-2 font-semibold w-full rounded-lg border border-gray-200 dark:border-gray-700 text-blue-500 mt-4'><FaPlus></FaPlus> Add New Task</button>
                            {/* Modal */}
                            {isOpen && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                    <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-lg w-[500px] overflow-y-auto max-h-[90vh] scrollbar-hide shadow-lg">
                                        <h2 className="text-2xl dark:text-[#E0E0E0] text-[#1E2022] text-center font-semibold mb-4">Add Task</h2>
                                        <form onSubmit={handleSubmit}>
                                            {/* Title Input */}
                                            <label className="block mb-2 text-[#52616B] dark:text-[#A0A0A0]">
                                                Title <span className="text-red-500">*</span>
                                                <input
                                                    type="text"
                                                    value={title}
                                                    onChange={(e) => setTitle(e.target.value)}
                                                    maxLength={50}
                                                    required
                                                    className="input mt-2 input-bordered w-full border-[#F7F7F7] dark:border-[#2A2A2A] bg-[#F7F7F7] dark:bg-[#2A2A2A] text-[#52616B] dark:text-[#A0A0A0]"
                                                />
                                            </label>

                                            {/* Description Input */}
                                            <label className="block mb-2 text-[#52616B] dark:text-[#A0A0A0]">
                                                Description
                                                <textarea
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    maxLength={200}
                                                    className="textarea mt-2 textarea-bordered w-full border-[#F7F7F7] dark:border-[#2A2A2A] bg-[#F7F7F7] dark:bg-[#2A2A2A] text-[#52616B] dark:text-[#A0A0A0]"
                                                />
                                            </label>

                                            {/* Category Dropdown (pre-selected) */}
                                            <label className="block mb-2 text-[#52616B] dark:text-[#A0A0A0]">
                                                Category <span className="text-red-500">*</span>
                                                <select
                                                    required
                                                    value={category}
                                                    onChange={(e) => setCategory(e.target.value)}
                                                    className="select mt-2 select-bordered w-full border-[#F7F7F7] dark:border-[#2A2A2A] bg-[#F7F7F7] dark:bg-[#2A2A2A] text-[#52616B] dark:text-[#A0A0A0]"
                                                >
                                                    <option>To-Do</option>
                                                    <option>In Progress</option>
                                                    <option>Done</option>
                                                </select>
                                            </label>

                                            {/* Priority Dropdown */}
                                            <label className="block mb-4 text-[#52616B] dark:text-[#A0A0A0]">
                                                Priority <span className="text-red-500">*</span>
                                                <select
                                                    required
                                                    value={priority}
                                                    onChange={(e) => setPriority(e.target.value)}
                                                    className="select select-bordered mt-2 w-full border-[#F7F7F7] dark:border-[#2A2A2A] bg-[#F7F7F7] dark:bg-[#2A2A2A] text-[#52616B] dark:text-[#A0A0A0]"
                                                >
                                                    <option>Low</option>
                                                    <option>Medium</option>
                                                    <option>High</option>
                                                </select>
                                            </label>

                                            {/* Buttons */}
                                            <div className="space-y-4">

                                                <button type="submit" className="bg-blue-500 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                                                    Save
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setIsOpen(false)}
                                                    className="bg-gray-500 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='mt-4 space-y-4'>
                            <div className="w-full bg-white dark:bg-[#1E1E1E] rounded-lg shadow-md p-5 border border-gray-200 dark:border-gray-700">
                                {/* Top Section */}
                                <div className="flex items-start justify-between">
                                    <span className="bg-red-100 text-red-500 text-xs font-medium px-3 py-1 rounded-full">
                                        High
                                    </span>
                                    <BsThreeDotsVertical className="dark:text-[#E0E0E0] text-[#1E2022] text-lg cursor-pointer transition" />
                                </div>

                                {/* Task Content */}
                                <h3 className="text-lg dark:text-[#E0E0E0] text-[#1E2022] font-semibold mt-3">
                                    Complete the Job Task
                                </h3>
                                <p className="text-[#52616B] dark:text-[#A0A0A0] text-sm mt-1 leading-relaxed">
                                    I have to complete the task given by Programming Hero, otherwise I will
                                    be kicked out of SCIC.
                                </p>

                                {/* Divider */}
                                <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>

                                {/* Bottom Section */}
                                <div className="flex items-center justify-between">
                                    <p className="text-[#52616B] dark:text-[#A0A0A0] text-sm">2-Jan-2025</p>
                                    <div className="flex gap-3">
                                        <FaRegStar className="text-lg text-yellow-400 cursor-pointer hover:text-yellow-500 transition" />
                                        <FaRegEdit className="text-lg text-blue-500 cursor-pointer hover:text-blue-600 transition" />
                                        <FaRegTrashCan className="text-lg text-red-500 cursor-pointer hover:text-red-600 transition" />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full bg-white dark:bg-[#1E1E1E] rounded-lg shadow-md p-5 border border-gray-200 dark:border-gray-700">
                                {/* Top Section */}
                                <div className="flex items-start justify-between">
                                    <span className="bg-red-100 text-red-500 text-xs font-medium px-3 py-1 rounded-full">
                                        High
                                    </span>
                                    <BsThreeDotsVertical className="dark:text-[#E0E0E0] text-[#1E2022] text-lg cursor-pointer transition" />
                                </div>

                                {/* Task Content */}
                                <h3 className="text-lg dark:text-[#E0E0E0] text-[#1E2022] font-semibold mt-3">
                                    Complete the Job Task
                                </h3>
                                <p className="text-[#52616B] dark:text-[#A0A0A0] text-sm mt-1 leading-relaxed">
                                    I have to complete the task given by Programming Hero
                                </p>

                                {/* Divider */}
                                <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>

                                {/* Bottom Section */}
                                <div className="flex items-center justify-between">
                                    <p className="text-[#52616B] dark:text-[#A0A0A0] text-sm">2-Jan-2025</p>
                                    <div className="flex gap-3">
                                        <FaRegStar className="text-lg text-yellow-400 cursor-pointer hover:text-yellow-500 transition" />
                                        <FaRegEdit className="text-lg text-blue-500 cursor-pointer hover:text-blue-600 transition" />
                                        <FaRegTrashCan className="text-lg text-red-500 cursor-pointer hover:text-red-600 transition" />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full bg-white dark:bg-[#1E1E1E] rounded-lg shadow-md p-5 border border-gray-200 dark:border-gray-700">
                                {/* Top Section */}
                                <div className="flex items-start justify-between">
                                    <span className="bg-red-100 text-red-500 text-xs font-medium px-3 py-1 rounded-full">
                                        High
                                    </span>
                                    <BsThreeDotsVertical className="dark:text-[#E0E0E0] text-[#1E2022] text-lg cursor-pointer transition" />
                                </div>

                                {/* Task Content */}
                                <h3 className="text-lg dark:text-[#E0E0E0] text-[#1E2022] font-semibold mt-3">
                                    Complete the Job Task
                                </h3>
                                <p className="text-[#52616B] dark:text-[#A0A0A0] text-sm mt-1 leading-relaxed">
                                    I have to complete the task given by Programming Hero, otherwise I will
                                    be kicked out of SCIC.
                                </p>

                                {/* Divider */}
                                <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>

                                {/* Bottom Section */}
                                <div className="flex items-center justify-between">
                                    <p className="text-[#52616B] dark:text-[#A0A0A0] text-sm">2-Jan-2025</p>
                                    <div className="flex gap-3">
                                        <FaRegStar className="text-lg text-yellow-400 cursor-pointer hover:text-yellow-500 transition" />
                                        <FaRegEdit className="text-lg text-blue-500 cursor-pointer hover:text-blue-600 transition" />
                                        <FaRegTrashCan className="text-lg text-red-500 cursor-pointer hover:text-red-600 transition" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <div className='bg-blue-500 w-2 h-2 rounded-full'></div>
                                <div className='flex items-center gap-3'>
                                    <h4 className='font-semibold dark:text-[#E0E0E0] text-[#1E2022]'>In Progress</h4>
                                    <h4 className='font-semibold dark:text-[#E0E0E0] text-[#1E2022]'>3</h4>
                                </div>
                            </div>
                            <BsThreeDotsVertical className='text-xl dark:text-[#E0E0E0] text-[#1E2022]'></BsThreeDotsVertical>
                        </div>
                        <div>
                            <button onClick={() => openModal("In Progress")} className='flex items-center justify-center gap-2 shadow-sm bg-white dark:bg-[#1E1E1E] py-2 font-semibold w-full rounded-lg border border-gray-200 dark:border-gray-700 text-blue-500 mt-4'><FaPlus></FaPlus> Add New Task</button>
                        </div>
                        <div className='mt-4 space-y-4'>
                            <div className="w-full bg-white dark:bg-[#1E1E1E] rounded-lg shadow-md p-5 border border-gray-200 dark:border-gray-700">
                                {/* Top Section */}
                                <div className="flex items-start justify-between">
                                    <span className="bg-red-100 text-red-500 text-xs font-medium px-3 py-1 rounded-full">
                                        High
                                    </span>
                                    <BsThreeDotsVertical className="dark:text-[#E0E0E0] text-[#1E2022] text-lg cursor-pointer transition" />
                                </div>

                                {/* Task Content */}
                                <h3 className="text-lg dark:text-[#E0E0E0] text-[#1E2022] font-semibold mt-3">
                                    Complete the Job Task
                                </h3>
                                <p className="text-[#52616B] dark:text-[#A0A0A0] text-sm mt-1 leading-relaxed">
                                    Lorem ipsum dolor sit amet.
                                </p>

                                {/* Divider */}
                                <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>

                                {/* Bottom Section */}
                                <div className="flex items-center justify-between">
                                    <p className="text-[#52616B] dark:text-[#A0A0A0] text-sm">2-Jan-2025</p>
                                    <div className="flex gap-3">
                                        <FaRegStar className="text-lg text-yellow-400 cursor-pointer hover:text-yellow-500 transition" />
                                        <FaRegEdit className="text-lg text-blue-500 cursor-pointer hover:text-blue-600 transition" />
                                        <FaRegTrashCan className="text-lg text-red-500 cursor-pointer hover:text-red-600 transition" />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full bg-white dark:bg-[#1E1E1E] rounded-lg shadow-md p-5 border border-gray-200 dark:border-gray-700">
                                {/* Top Section */}
                                <div className="flex items-start justify-between">
                                    <span className="bg-red-100 text-red-500 text-xs font-medium px-3 py-1 rounded-full">
                                        High
                                    </span>
                                    <BsThreeDotsVertical className="dark:text-[#E0E0E0] text-[#1E2022] text-lg cursor-pointer transition" />
                                </div>

                                {/* Task Content */}
                                <h3 className="text-lg dark:text-[#E0E0E0] text-[#1E2022] font-semibold mt-3">
                                    Complete the Job Task
                                </h3>
                                <p className="text-[#52616B] dark:text-[#A0A0A0] text-sm mt-1 leading-relaxed">
                                    I have to complete the task given by Programming Hero
                                </p>

                                {/* Divider */}
                                <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>

                                {/* Bottom Section */}
                                <div className="flex items-center justify-between">
                                    <p className="text-[#52616B] dark:text-[#A0A0A0] text-sm">2-Jan-2025</p>
                                    <div className="flex gap-3">
                                        <FaRegStar className="text-lg text-yellow-400 cursor-pointer hover:text-yellow-500 transition" />
                                        <FaRegEdit className="text-lg text-blue-500 cursor-pointer hover:text-blue-600 transition" />
                                        <FaRegTrashCan className="text-lg text-red-500 cursor-pointer hover:text-red-600 transition" />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full bg-white dark:bg-[#1E1E1E] rounded-lg shadow-md p-5 border border-gray-200 dark:border-gray-700">
                                {/* Top Section */}
                                <div className="flex items-start justify-between">
                                    <span className="bg-yellow-100 text-yellow-500 text-xs font-medium px-3 py-1 rounded-full">
                                        Medium
                                    </span>
                                    <BsThreeDotsVertical className="dark:text-[#E0E0E0] text-[#1E2022] text-lg cursor-pointer transition" />
                                </div>

                                {/* Task Content */}
                                <h3 className="text-lg dark:text-[#E0E0E0] text-[#1E2022] font-semibold mt-3">
                                    Complete the Job Task
                                </h3>
                                <p className="text-[#52616B] dark:text-[#A0A0A0] text-sm mt-1 leading-relaxed">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit dolorum vel sit illo, aperiam ipsum! Alias itaque voluptate dolores quam.
                                </p>

                                {/* Divider */}
                                <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>

                                {/* Bottom Section */}
                                <div className="flex items-center justify-between">
                                    <p className="text-[#52616B] dark:text-[#A0A0A0] text-sm">2-Jan-2025</p>
                                    <div className="flex gap-3">
                                        <FaRegStar className="text-lg text-yellow-400 cursor-pointer hover:text-yellow-500 transition" />
                                        <FaRegEdit className="text-lg text-blue-500 cursor-pointer hover:text-blue-600 transition" />
                                        <FaRegTrashCan className="text-lg text-red-500 cursor-pointer hover:text-red-600 transition" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <div className='bg-green-500 w-2 h-2 rounded-full'></div>
                                <div className='flex items-center gap-3'>
                                    <h4 className='font-semibold dark:text-[#E0E0E0] text-[#1E2022]'>Done</h4>
                                    <h4 className='font-semibold dark:text-[#E0E0E0] text-[#1E2022]'>5</h4>
                                </div>
                            </div>
                            <BsThreeDotsVertical className='text-xl dark:text-[#E0E0E0] text-[#1E2022]'></BsThreeDotsVertical>
                        </div>
                        <div>
                            <button onClick={() => openModal("Done")} className='flex items-center justify-center gap-2 shadow-sm bg-white dark:bg-[#1E1E1E] py-2 font-semibold w-full rounded-lg border border-gray-200 dark:border-gray-700 text-blue-500 mt-4'><FaPlus></FaPlus> Add New Task</button>
                        </div>
                        <div className='mt-4 space-y-4'>
                            <div className="w-full bg-white dark:bg-[#1E1E1E] rounded-lg shadow-md p-5 border border-gray-200 dark:border-gray-700">
                                {/* Top Section */}
                                <div className="flex items-start justify-between">
                                    <span className="bg-red-100 text-red-500 text-xs font-medium px-3 py-1 rounded-full">
                                        High
                                    </span>
                                    <BsThreeDotsVertical className="dark:text-[#E0E0E0] text-[#1E2022] text-lg cursor-pointer transition" />
                                </div>

                                {/* Task Content */}
                                <h3 className="text-lg dark:text-[#E0E0E0] text-[#1E2022] font-semibold mt-3">
                                    Complete the Job Task
                                </h3>
                                <p className="text-[#52616B] dark:text-[#A0A0A0] text-sm mt-1 leading-relaxed">
                                    I have to complete the task given by Programming Hero, otherwise I will
                                    be kicked out of SCIC.
                                </p>

                                {/* Divider */}
                                <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>

                                {/* Bottom Section */}
                                <div className="flex items-center justify-between">
                                    <p className="text-[#52616B] dark:text-[#A0A0A0] text-sm">2-Jan-2025</p>
                                    <div className="flex gap-3">
                                        <FaRegStar className="text-lg text-yellow-400 cursor-pointer hover:text-yellow-500 transition" />
                                        <FaRegEdit className="text-lg text-blue-500 cursor-pointer hover:text-blue-600 transition" />
                                        <FaRegTrashCan className="text-lg text-red-500 cursor-pointer hover:text-red-600 transition" />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full bg-white dark:bg-[#1E1E1E] rounded-lg shadow-md p-5 border border-gray-200 dark:border-gray-700">
                                {/* Top Section */}
                                <div className="flex items-start justify-between">
                                    <span className="bg-green-100 text-green-500 text-xs font-medium px-3 py-1 rounded-full">
                                        Low
                                    </span>
                                    <BsThreeDotsVertical className="dark:text-[#E0E0E0] text-[#1E2022] text-lg cursor-pointer transition" />
                                </div>

                                {/* Task Content */}
                                <h3 className="text-lg dark:text-[#E0E0E0] text-[#1E2022] font-semibold mt-3">
                                    Complete the Job Task
                                </h3>
                                <p className="text-[#52616B] dark:text-[#A0A0A0] text-sm mt-1 leading-relaxed">
                                    I have to complete the task given by Programming Hero
                                </p>

                                {/* Divider */}
                                <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>

                                {/* Bottom Section */}
                                <div className="flex items-center justify-between">
                                    <p className="text-[#52616B] dark:text-[#A0A0A0] text-sm">2-Jan-2025</p>
                                    <div className="flex gap-3">
                                        <FaRegStar className="text-lg text-yellow-400 cursor-pointer hover:text-yellow-500 transition" />
                                        <FaRegEdit className="text-lg text-blue-500 cursor-pointer hover:text-blue-600 transition" />
                                        <FaRegTrashCan className="text-lg text-red-500 cursor-pointer hover:text-red-600 transition" />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full bg-white dark:bg-[#1E1E1E] rounded-lg shadow-md p-5 border border-gray-200 dark:border-gray-700">
                                {/* Top Section */}
                                <div className="flex items-start justify-between">
                                    <span className="bg-red-100 text-red-500 text-xs font-medium px-3 py-1 rounded-full">
                                        High
                                    </span>
                                    <BsThreeDotsVertical className="dark:text-[#E0E0E0] text-[#1E2022] text-lg cursor-pointer transition" />
                                </div>

                                {/* Task Content */}
                                <h3 className="text-lg dark:text-[#E0E0E0] text-[#1E2022] font-semibold mt-3">
                                    Complete the Job Task
                                </h3>
                                <p className="text-[#52616B] dark:text-[#A0A0A0] text-sm mt-1 leading-relaxed">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit at facere illo optio in molestiae asperiores magni cum tempore corrupti.
                                </p>

                                {/* Divider */}
                                <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>

                                {/* Bottom Section */}
                                <div className="flex items-center justify-between">
                                    <p className="text-[#52616B] dark:text-[#A0A0A0] text-sm">2-Jan-2025</p>
                                    <div className="flex gap-3">
                                        <FaRegStar className="text-lg text-yellow-400 cursor-pointer hover:text-yellow-500 transition" />
                                        <FaRegEdit className="text-lg text-blue-500 cursor-pointer hover:text-blue-600 transition" />
                                        <FaRegTrashCan className="text-lg text-red-500 cursor-pointer hover:text-red-600 transition" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;