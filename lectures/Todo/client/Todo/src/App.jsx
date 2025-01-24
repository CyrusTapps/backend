import { useState, useEffect } from "react";

import "./App.css";
import axios from "axios";

function App() {
  // const [count, setCount] = useState(0)

  const [data, setData] = useState();
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3000/getTodos",
    })
      .then((res) => {
        console.log("res", res);
        setData(res.data);
      })
      .catch((err) => console.log("err", err));
  }, []);

  const handleSubmit = (e) => {
    if (!newTodo.trim()) return;

    e.preventDefault(); //added to prevent browser refresh since I am using a form for the input
    axios({
      method: "post",
      url: "http://localhost:3000/create",
      data: {
        todo: newTodo,
        created: new Date(),
      },
    })
      .then((res) => {
        console.log("adding todo", res);
        setData([...data, res.data]);
        setNewTodo("");
      })
      .catch((err) => console.log("Error adding todo", err));
  };

  const handleDelete = (id) => {
    console.log("Deleting todo:", id);
    axios({
      method: "delete",
      url: `http://localhost:3000/delete/${id}`,
    })
      .then((res) => {
        console.log("Todo deleted:", res.data);
        setData(data.filter((item) => item._id !== id));
      })
      .catch((err) => console.log("Error deleting todo:", err));
  };

  const handleEdit = (id) => {
    const todoToEdit = data.find((item) => item._id === id);
    setEditingId(id);
    setEditText(todoToEdit.todo);
  };

  const handleUpdate = (id) => {
    console.log("Updating todo:", id);
    axios({
      method: "put",
      url: `http://localhost:3000/update/${id}`,
      data: {
        todo: editText,
        created: new Date(),
      },
    })
      .then((res) => {
        console.log("Todo updated:", res.data);
        setData(data.map((item) => (item._id === id ? res.data : item)));
        setEditingId(null);
        setEditText("");
      })
      .catch((err) => console.log("Error updating todo:", err));
  };

  return (
    <div className="todo-container">
      <h2>List of crap Shawn doesn't have time to do</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
        />
        <button type="submit">Add Todo</button>
      </form>

      <div className="todo-list">
        {data &&
          data.map((item) => {
            return (
              <div key={item._id} className="todo-item">
                {editingId === item._id ? (
                  <>
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <button onClick={() => handleUpdate(item._id)}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <p>{item.todo}</p>
                    <button onClick={() => handleDelete(item._id)}>
                      Delete
                    </button>
                    <button onClick={() => handleEdit(item._id)}>Edit</button>
                  </>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
