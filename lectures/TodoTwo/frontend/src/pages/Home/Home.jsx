import { useState, useEffect } from "react";
import {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
  addTag,
  removeTag,
} from "../../utils/api";
import TodoForm from "../../components/TodoForm";
import TodoList from "../../components/TodoList";
import "./Home.css";

const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const { data } = await getTodos();
    setTodos(data);
    console.log("Frontend fetchTodos():", data);
  };

  const handleAdd = async (title) => {
    const { data } = await createTodo(title);
    setTodos([...todos, data]);
    console.log("Frontend handleAdd():", data);
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter((todo) => todo._id !== id));
    console.log("Frontend handleDelete():", id);
  };

  const handleUpdate = async (id, updates) => {
    const { data } = await updateTodo(id, updates);
    setTodos(todos.map((todo) => (todo._id === id ? data : todo)));
    console.log("Frontend handleUpdate():", data);
  };

  const handleAddTag = async (todoId, tag) => {
    try {
      const { data } = await addTag(todoId, tag);
      setTodos(todos.map((todo) => (todo._id === todoId ? data : todo)));
      console.log("Frontend handleAddTag():", data);
    } catch (error) {
      console.error("Error adding tag:", error);
    }
  };

  const handleRemoveTag = async (todoId, tag) => {
    try {
      const { data } = await removeTag(todoId, tag);
      setTodos(todos.map((todo) => (todo._id === todoId ? data : todo)));
      console.log("Frontend handleRemoveTag():", data);
    } catch (error) {
      console.error("Error removing tag:", error);
    }
  };

  return (
    <div className="home">
      <h1>Todo-Two</h1>
      <TodoForm onAdd={handleAdd} />
      <TodoList
        todos={todos}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        onAddTag={handleAddTag}
        onRemoveTag={handleRemoveTag}
      />
    </div>
  );
};

export default Home;
