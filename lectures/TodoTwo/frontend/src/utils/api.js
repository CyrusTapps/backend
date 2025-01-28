import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/todos" });

export const getTodos = () => API.get("/");
export const createTodo = (todo) => API.post("/", todo);
export const deleteTodo = (id) => API.delete(`/${id}`);
export const updateTodo = (id, updatedTodo) => API.put(`/${id}`, updatedTodo);
export const addTag = (todoId, tag) => API.post(`/${todoId}/tags`, { tag });
export const removeTag = (todoId, tag) => API.delete(`/${todoId}/tags/${tag}`);
