import { createContext, useContext, useState, useEffect } from "react";
import {
  getTaskskRequest,
  getTaskRequest,
  createTaskRequest,
  updateTaskskRequest,
  deleteTaskskRequest,
} from "../api/tasks";

export const TasksContext = createContext();
export const useTask = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};

export const TasksProvider = ({ children }) => {
  const [tasks, SetTasks] = useState([]);

  const getTasks = async () => {
    const response = await getTaskskRequest();
    SetTasks(response.data);
  };

  const getTask = async (id) => {
    const response = await getTaskRequest(id);
    return response.data;
  };

  const createTask = async (task) => {
    await createTaskRequest(task);
  };

  const updateTask = async (id, task) => {
    await updateTaskskRequest(id, task);
  }

  const deleteTask = async (id) => {
    try {
      const response = await deleteTaskskRequest(id);
      if (response.status === 204)
        SetTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TasksContext.Provider
      value={{ tasks, createTask, getTasks, getTask, updateTask, deleteTask }}
    >
      {children}
    </TasksContext.Provider>
  );
};
