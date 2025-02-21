import React, { useContext, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { AuthContext } from "../../../AuthProvider";
import TaskCard from "../../../components/TaskCard";

const Tasks = () => {
    const { user } = useContext(AuthContext);

    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("To-Do");
    const [priority, setPriority] = useState("Medium");

    const queryClient = useQueryClient();

    // Fetch tasks from the backend
    const fetchTasks = async () => {
        const response = await axios.get(`http://localhost:5000/tasks?userEmail=${user.email}`);
        return response.data;
    };

    // UseQuery with a single object argument
    const { data: tasks, isLoading, isError } = useQuery({
        queryKey: ["tasks"], // Query key as an array
        queryFn: fetchTasks, // Query function
    });

    // Add task mutation
    const addTask = async (taskData) => {
        const response = await axios.post("http://localhost:5000/tasks", taskData);
        return response.data;
    };

    const mutation = useMutation({
        mutationFn: addTask, // Mutation function
        onSuccess: () => {
            Swal.fire({
                title: "Success!",
                text: "Task added successfully!",
                icon: "success",
                confirmButtonText: "OK",
            });
            setIsOpen(false);
            setTitle("");
            setDescription("");
            setPriority("Medium");
            queryClient.invalidateQueries({ queryKey: ["tasks"] }); // Refresh the task list
        },
        onError: () => {
            Swal.fire({
                title: "Error!",
                text: "Failed to add task.",
                icon: "error",
                confirmButtonText: "OK",
            });
        },
    });

    // Open modal with the selected category
    const openModal = (selectedCategory) => {
        setCategory(selectedCategory);
        setIsOpen(true);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) {
            Swal.fire({
                title: "Error!",
                text: "Title is required!",
                icon: "error",
                confirmButtonText: "OK",
            });
            return;
        }
        if (title.length > 50) {
            Swal.fire({
                title: "Error!",
                text: "Title must be under 50 characters!",
                icon: "error",
                confirmButtonText: "OK",
            });
            return;
        }
        if (description.length > 200) {
            Swal.fire({
                title: "Error!",
                text: "Description must be under 200 characters!",
                icon: "error",
                confirmButtonText: "OK",
            });
            return;
        }

        const taskData = {
            title,
            description,
            category,
            priority,
            timestamp: new Date().toISOString(),
            userEmail: user.email,
        };

        // Directly mutate the task data without confirmation
        mutation.mutate(taskData);
    };

    // Filter tasks by category
    const filterTasksByCategory = (category) => {
        if (!Array.isArray(tasks)) return []; // Ensure tasks is an array
        return tasks.filter((task) => task.category === category);
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching tasks</div>;

    return (
        <div className="w-full grid pt-[70px] gap-6 my-6 px-6 grid-cols-3">
            {/* To-Do Section */}
            <div className="w-full">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-red-500 w-2 h-2 rounded-full"></div>
                        <div className="flex items-center gap-3">
                            <h4 className="font-semibold dark:text-[#E0E0E0] text-[#1E2022]">TO DO</h4>
                            <h4 className="font-semibold dark:text-[#E0E0E0] text-[#1E2022]">
                                {filterTasksByCategory("To-Do").length}
                            </h4>
                        </div>
                    </div>
                    <BsThreeDotsVertical className="text-xl dark:text-[#E0E0E0] text-[#1E2022]" />
                </div>
                <div>
                    <button
                        onClick={() => openModal("To-Do")}
                        className="flex items-center justify-center gap-2 shadow-sm bg-white dark:bg-[#1E1E1E] py-2 font-semibold w-full rounded-lg border border-gray-200 dark:border-gray-700 text-blue-500 mt-4"
                    >
                        <FaPlus /> Add New Task
                    </button>
                </div>
                <div className="mt-4 space-y-4">
                    {filterTasksByCategory("To-Do").map((task) => (
                        <TaskCard key={task._id} task={task} />
                    ))}
                </div>
            </div>

            {/* In Progress Section */}
            <div className="w-full">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-blue-500 w-2 h-2 rounded-full"></div>
                        <div className="flex items-center gap-3">
                            <h4 className="font-semibold dark:text-[#E0E0E0] text-[#1E2022]">In Progress</h4>
                            <h4 className="font-semibold dark:text-[#E0E0E0] text-[#1E2022]">
                                {filterTasksByCategory("In Progress").length}
                            </h4>
                        </div>
                    </div>
                    <BsThreeDotsVertical className="text-xl dark:text-[#E0E0E0] text-[#1E2022]" />
                </div>
                <div>
                    <button
                        onClick={() => openModal("In Progress")}
                        className="flex items-center justify-center gap-2 shadow-sm bg-white dark:bg-[#1E1E1E] py-2 font-semibold w-full rounded-lg border border-gray-200 dark:border-gray-700 text-blue-500 mt-4"
                    >
                        <FaPlus /> Add New Task
                    </button>
                </div>
                <div className="mt-4 space-y-4">
                    {filterTasksByCategory("In Progress").map((task) => (
                        <TaskCard key={task._id} task={task} />
                    ))}
                </div>
            </div>

            {/* Done Section */}
            <div className="w-full">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-green-500 w-2 h-2 rounded-full"></div>
                        <div className="flex items-center gap-3">
                            <h4 className="font-semibold dark:text-[#E0E0E0] text-[#1E2022]">Done</h4>
                            <h4 className="font-semibold dark:text-[#E0E0E0] text-[#1E2022]">
                                {filterTasksByCategory("Done").length}
                            </h4>
                        </div>
                    </div>
                    <BsThreeDotsVertical className="text-xl dark:text-[#E0E0E0] text-[#1E2022]" />
                </div>
                <div>
                    <button
                        onClick={() => openModal("Done")}
                        className="flex items-center justify-center gap-2 shadow-sm bg-white dark:bg-[#1E1E1E] py-2 font-semibold w-full rounded-lg border border-gray-200 dark:border-gray-700 text-blue-500 mt-4"
                    >
                        <FaPlus /> Add New Task
                    </button>
                </div>
                <div className="mt-4 space-y-4">
                    {filterTasksByCategory("Done").map((task) => (
                        <TaskCard key={task._id} task={task} />
                    ))}
                </div>
            </div>

            {/* Modal for adding a new task */}
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

                            {/* Category Dropdown */}
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
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white font-bold py-2.5 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="bg-gray-500 text-white font-bold py-2.5 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tasks;