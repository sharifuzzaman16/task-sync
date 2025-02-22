import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../../AuthProvider";
import TaskCard from "../../../components/TaskCard";

const CompletedTasks = () => {
    const { user } = useContext(AuthContext); // Get the logged-in user

    // Fetch completed tasks for the logged-in user
    const fetchCompletedTasks = async () => {
        const response = await axios.get("https://task-sync-sever.onrender.com/tasks/completed", {
            params: { userEmail: user.email }, // Pass the user's email as a query parameter
        });
        return response.data;
    };

    // UseQuery to fetch completed tasks
    const { data: completedTasks, isLoading, isError } = useQuery({
        queryKey: ["completedTasks", user.email], // Include user.email in the query key
        queryFn: fetchCompletedTasks,
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching completed tasks</div>;

    return (
        <div className="w-full pt-[70px] gap-6 my-6 px-6">
            <h2 className="text-2xl dark:text-[#E0E0E0] text-[#1E2022] font-semibold mb-6">Completed Tasks</h2>
            <div className="grid gap-6">
                {completedTasks.length > 0 ? (
                    completedTasks.map((task) => <TaskCard key={task._id} task={task} />)
                ) : (
                    <p className="text-[#52616B] dark:text-[#A0A0A0] text-center">No completed tasks found.</p>
                )}
            </div>
        </div>
    );
};

export default CompletedTasks;