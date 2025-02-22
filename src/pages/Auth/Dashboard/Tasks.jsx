import React, { useContext, useState, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { AuthContext } from "../../../AuthProvider";
import TaskCard from "../../../components/TaskCard";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const Tasks = () => {
    const { user } = useContext(AuthContext);

    const [tasks, setTasks] = useState([]); // Initialize tasks as an empty array
    const [isOpen, setIsOpen] = useState(false); // State for modal
    const [title, setTitle] = useState(""); // State for task title
    const [description, setDescription] = useState(""); // State for task description
    const [category, setCategory] = useState("To-Do"); // State for task category
    const [priority, setPriority] = useState("Medium"); // State for task priority

    const queryClient = useQueryClient();

    // WebSocket connection for real-time updates
    useEffect(() => {
        const ws = new WebSocket("wss://task-sync-sever.onrender.com");

        ws.onopen = () => {
            // console.log("Connected to WebSocket");
            // Send the user's email to the WebSocket server
            ws.send(JSON.stringify({ type: "INITIAL_TASKS", userEmail: user.email }));
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);

            if (message.type === "INITIAL_TASKS") {
                if (!Array.isArray(message.data)) {
                    console.error("Invalid initial tasks data:", message.data);
                    return;
                }
                setTasks(message.data); // Set initial tasks
            } else if (message.type === "TASK_UPDATED") {
                const updatedTask = message.data;
                if (!updatedTask || !updatedTask._id) {
                    console.error("Invalid updated task data:", updatedTask);
                    return;
                }
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task._id === updatedTask._id ? updatedTask : task
                    )
                ); // Update the task list
            } else if (message.type === "TASK_ADDED") {
                const newTask = message.data;
                setTasks((prevTasks) => [...prevTasks, newTask]); // Add new task to the list
            } else if (message.type === "TASK_DELETED") {
                const deletedTaskId = message.data._id;
                setTasks((prevTasks) =>
                    prevTasks.filter((task) => task._id !== deletedTaskId)
                ); // Remove deleted task from the list
            }
        };

        ws.onclose = () => {
            // console.log("Disconnected from WebSocket");
        };

        return () => {
            ws.close(); // Cleanup WebSocket connection
        };
    }, [user.email]); // Reconnect WebSocket if user.email changes

    // Fetch tasks from the backend
    const fetchTasks = async () => {
        const response = await axios.get(`https://task-sync-sever.onrender.com/tasks?userEmail=${user.email}`);
        if (!Array.isArray(response.data)) {
            console.error("Invalid data format: Expected an array");
            return [];
        }
        return response.data;
    };

    // UseQuery to fetch tasks
    const { isLoading, isError } = useQuery({
        queryKey: ["tasks"],
        queryFn: fetchTasks,
        onSuccess: (data) => {
            setTasks(data); // Set tasks on successful fetch
        },
    });

    // Add task mutation
    const addTask = async (taskData) => {
        const response = await axios.post("https://task-sync-sever.onrender.com/tasks", taskData);
        return response.data;
    };

    const mutation = useMutation({
        mutationFn: addTask,
        onSuccess: (data) => {
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
            queryClient.invalidateQueries({ queryKey: ["tasks"] }); // Refresh tasks
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

    // Update task mutation
    const updateTask = async ({ taskId, category }) => {
        const response = await axios.put(`https://task-sync-sever.onrender.com/tasks/${taskId}`, { category });
        return response.data;
    };

    const updateMutation = useMutation({
        mutationFn: updateTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] }); // Refresh tasks
        },
        onError: () => {
            Swal.fire({
                title: "Error!",
                text: "Failed to update task category.",
                icon: "error",
                confirmButtonText: "OK",
            });
        },
    });

    // Delete task mutation
    const deleteTask = async (taskId) => {
        const response = await axios.delete(`https://task-sync-sever.onrender.com/tasks/${taskId}`);
        return response.data;
    };

    const deleteMutation = useMutation({
        mutationFn: deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] }); // Refresh tasks
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

    // Handle drag and drop
    const onDragEnd = async (result) => {
        const { source, destination, draggableId } = result;

        if (!destination) return;

        if (source.droppableId === destination.droppableId && source.index === destination.index) return;

        const task = tasks.find((task) => task._id === draggableId);

        if (!task) {
            console.error("Task not found");
            return;
        }

        if (source.droppableId !== destination.droppableId) {
            try {
                // Update the task category in the backend
                await updateMutation.mutateAsync({
                    taskId: task._id,
                    category: destination.droppableId,
                });

                // Update the local state immediately
                const updatedTasks = tasks.map((t) =>
                    t._id === task._id ? { ...t, category: destination.droppableId } : t
                );
                setTasks(updatedTasks);
            } catch (error) {
                console.error("Failed to update task category:", error);
            }
        }
    };

    // Open modal with the selected category
    const openModal = (selectedCategory) => {
        setCategory(selectedCategory);
        setIsOpen(true);
    };

    // Handle form submission for adding a new task
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
            userEmail: user.email, // Ensure the task is associated with the logged-in user
        };

        mutation.mutate(taskData); // Add new task
    };

    // Filter tasks by category
    const filterTasksByCategory = (category) => {
        if (!Array.isArray(tasks)) return [];
        return tasks.filter((task) => task.category === category);
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching tasks</div>;

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="w-full grid pt-[70px] gap-6 my-6 px-6 grid-cols-3">
                {/* To-Do Section */}
                <Droppable droppableId="To-Do">
                    {(provided) => (
                        <div className="w-full" ref={provided.innerRef} {...provided.droppableProps}>
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
                                {filterTasksByCategory("To-Do").map((task, index) => {
                                    if (!task) return null; // Skip undefined tasks
                                    return (
                                        <Draggable key={task._id} draggableId={task._id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <TaskCard task={task} onDelete={() => deleteMutation.mutate(task._id)} />
                                                </div>
                                            )}
                                        </Draggable>
                                    );
                                })}
                            </div>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>

                {/* In Progress Section */}
                <Droppable droppableId="In Progress">
                    {(provided) => (
                        <div className="w-full" ref={provided.innerRef} {...provided.droppableProps}>
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
                                {filterTasksByCategory("In Progress").map((task, index) => {
                                    if (!task) return null; // Skip undefined tasks
                                    return (
                                        <Draggable key={task._id} draggableId={task._id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <TaskCard task={task} />
                                                </div>
                                            )}
                                        </Draggable>
                                    );
                                })}
                            </div>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>

                {/* Done Section */}
                <Droppable droppableId="Done">
                    {(provided) => (
                        <div className="w-full" ref={provided.innerRef} {...provided.droppableProps}>
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
                                {filterTasksByCategory("Done").map((task, index) => {
                                    if (!task) return null; // Skip undefined tasks
                                    return (
                                        <Draggable key={task._id} draggableId={task._id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <TaskCard task={task} />
                                                </div>
                                            )}
                                        </Draggable>
                                    );
                                })}
                            </div>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>

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
        </DragDropContext>
    );
};

export default Tasks;