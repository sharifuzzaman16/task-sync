import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { FaRegStar, FaRegTrashCan } from "react-icons/fa6";

const TaskCard = ({ task }) => {
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

    return (
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
                    <FaRegEdit className="text-lg text-blue-500 cursor-pointer hover:text-blue-600 transition" />
                    <FaRegTrashCan className="text-lg text-red-500 cursor-pointer hover:text-red-600 transition" />
                </div>
            </div>
        </div>
    );
};

export default TaskCard;