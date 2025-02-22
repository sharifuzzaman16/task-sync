import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { FaRegStar, FaRegTrashCan } from "react-icons/fa6";
import axios from "axios";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const TaskCard = ({ task }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [editedDescription, setEditedDescription] = useState(task.description);
    const [editedCategory, setEditedCategory] = useState(task.category);
    const [editedPriority, setEditedPriority] = useState(task.priority);

    const queryClient = useQueryClient();

    // Determine badge color based on priority
    const getPriorityColor = (priority) => {
        switch (priority.toLowerCase()) {
            case "high":
                return "bg-red-100 text-red-500";
            case "medium":
                return "bg-yellow-100 text-yellow-500";
            case "low":
                return "bg-green-100 text-green-500";
            default:
                return "bg-gray-100 text-gray-500";
        }
    };

    // Edit task mutation
    const editTaskMutation = useMutation({
        mutationFn: async (updatedTask) => {
            const response = await axios.put(`http://localhost:5000/tasks/${task._id}`, updatedTask);
            return response.data;
        },
        onSuccess: (data) => {
            // Update the cached data for the task list
            queryClient.setQueryData(["tasks"], (oldTasks) => {
                return oldTasks.map((t) => (t._id === task._id ? { ...t, ...data.updatedTask } : t));
            });

            Swal.fire({
                title: "Success!",
                text: "Task updated successfully!",
                icon: "success",
                confirmButtonText: "OK",
            });
            setIsEditModalOpen(false);
        },
        onError: () => {
            Swal.fire({
                title: "Error!",
                text: "Failed to update task.",
                icon: "error",
                confirmButtonText: "OK",
            });
        },
    });

    // Delete task mutation
    const deleteTaskMutation = useMutation({
        mutationFn: async (taskId) => {
            const response = await axios.delete(`http://localhost:5000/tasks/${taskId}`);
            return response.data;
        },
        onSuccess: () => {
            // Update the cached data for the task list
            queryClient.setQueryData(["tasks"], (oldTasks) => {
                return oldTasks.filter((t) => t._id !== task._id);
            });

            Swal.fire({
                title: "Success!",
                text: "Task deleted successfully!",
                icon: "success",
                confirmButtonText: "OK",
            });
        },
        onError: () => {
            Swal.fire({
                title: "Error!",
                text: "Failed to delete task.",
                icon: "error",
                confirmButtonText: "OK",
            });
        },
    });

    // Handle edit task
    const handleEditTask = async (e) => {
        e.preventDefault();

        const updatedTask = {
            title: editedTitle,
            description: editedDescription,
            category: editedCategory,
            priority: editedPriority,
        };

        editTaskMutation.mutate(updatedTask);
    };

    // Handle delete task
    const handleDeleteTask = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteTaskMutation.mutate(task._id);
            }
        });
    };

    return (
        <>
            <div className="w-full bg-white dark:bg-[#1E1E1E] rounded-lg shadow-md p-5 border border-gray-200 dark:border-gray-700">
                {/* Top Section */}
                <div className="flex items-start justify-between">
                    <span className={`${getPriorityColor(task.priority)} text-xs font-medium px-3 py-1 rounded-full`}>
                        {task.priority}
                    </span>
                    <BsThreeDotsVertical className="dark:text-[#E0E0E0] text-[#1E2022] text-lg cursor-pointer transition" />
                </div>

                {/* Task Content */}
                <h3 className="text-lg dark:text-[#E0E0E0] text-[#1E2022] font-semibold mt-3">
                    {task.title}
                </h3>
                <p className="text-[#52616B] dark:text-[#A0A0A0] text-sm mt-1 leading-relaxed">
                    {task.description}
                </p>

                {/* Divider */}
                <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>

                {/* Bottom Section */}
                <div className="flex items-center justify-between">
                    <p className="text-[#52616B] dark:text-[#A0A0A0] text-sm">
                        {new Date(task.timestamp).toLocaleDateString()}
                    </p>
                    <div className="flex gap-3">
                        <FaRegStar className="text-lg text-yellow-400 cursor-pointer hover:text-yellow-500 transition" />
                        <FaRegEdit
                            className="text-lg text-blue-500 cursor-pointer hover:text-blue-600 transition"
                            onClick={() => setIsEditModalOpen(true)}
                        />
                        <FaRegTrashCan
                            className="text-lg text-red-500 cursor-pointer hover:text-red-600 transition"
                            onClick={handleDeleteTask}
                        />
                    </div>
                </div>
            </div>

            {/* Edit Task Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-lg w-[500px] overflow-y-auto max-h-[90vh] scrollbar-hide shadow-lg">
                        <h2 className="text-2xl dark:text-[#E0E0E0] text-[#1E2022] text-center font-semibold mb-4">Edit Task</h2>
                        <form onSubmit={handleEditTask}>
                            {/* Title Input */}
                            <label className="block mb-2 text-[#52616B] dark:text-[#A0A0A0]">
                                Title <span className="text-red-500">*</span>
                                <input
                                    type="text"
                                    value={editedTitle}
                                    onChange={(e) => setEditedTitle(e.target.value)}
                                    maxLength={50}
                                    required
                                    className="input mt-2 input-bordered w-full border-[#F7F7F7] dark:border-[#2A2A2A] bg-[#F7F7F7] dark:bg-[#2A2A2A] text-[#52616B] dark:text-[#A0A0A0]"
                                />
                            </label>

                            {/* Description Input */}
                            <label className="block mb-2 text-[#52616B] dark:text-[#A0A0A0]">
                                Description
                                <textarea
                                    value={editedDescription}
                                    onChange={(e) => setEditedDescription(e.target.value)}
                                    maxLength={200}
                                    className="textarea mt-2 textarea-bordered w-full border-[#F7F7F7] dark:border-[#2A2A2A] bg-[#F7F7F7] dark:bg-[#2A2A2A] text-[#52616B] dark:text-[#A0A0A0]"
                                />
                            </label>

                            {/* Category Dropdown */}
                            <label className="block mb-2 text-[#52616B] dark:text-[#A0A0A0]">
                                Category <span className="text-red-500">*</span>
                                <select
                                    required
                                    value={editedCategory}
                                    onChange={(e) => setEditedCategory(e.target.value)}
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
                                    value={editedPriority}
                                    onChange={(e) => setEditedPriority(e.target.value)}
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
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="bg-gray-500 text-white font-bold py-2.5 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default TaskCard;