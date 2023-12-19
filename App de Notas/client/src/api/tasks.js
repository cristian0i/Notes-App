import axios from "axios";

const API = "http://localhost:3000";

export const getTaskskRequest = () =>
  axios.get(`${API}/tasks`, { withCredentials: true });

export const getTaskRequest = (id) =>
  axios.get(`${API}/tasks/${id}`, { withCredentials: true });

export const createTaskRequest = (task) =>
  axios.post(`${API}/tasks`, task, { withCredentials: true });

export const updateTaskskRequest = (id, task) =>
  axios.put(`${API}/tasks/${id}`, task, { withCredentials: true });

export const deleteTaskskRequest = (id) =>
  axios.delete(`${API}/tasks/${id}`, { withCredentials: true });
