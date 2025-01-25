import { useState, useEffect } from "react";
import { getTodos, createTodo, deleteTodo, updateTodo } from "../../utils/api";
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

  return (
    <div className="home">
      <h1>Todo-Two</h1>
      <TodoForm onAdd={handleAdd} />
      <TodoList todos={todos} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
  );
};

export default Home;
