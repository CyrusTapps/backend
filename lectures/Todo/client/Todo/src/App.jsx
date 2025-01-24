import { useState, useEffect, useRef } from "react";

import "./App.css";
import axios from "axios";

const MatrixBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    const katakana =
      "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
    const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nums = "0123456789";
    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const rainDrops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      context.fillStyle = "rgba(0, 0, 0, 0.05)";
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = "#2a4a73";
      context.font = fontSize + "px monospace";

      rainDrops.forEach((drop, i) => {
        const text = alphabet.charAt(
          Math.floor(Math.random() * alphabet.length)
        );
        context.globalAlpha = Math.random() * 0.5 + 0.5;
        context.fillText(text, i * fontSize, drop * fontSize);

        if (drop * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      });
      context.globalAlpha = 1;
    };

    window.addEventListener("resize", resizeCanvas);
    const intervalId = setInterval(draw, 30);

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        width: "100%",
        height: "100%",
      }}
    />
  );
};

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
    <>
      <MatrixBackground />
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
                      <button onClick={() => handleUpdate(item._id)}>
                        Save
                      </button>
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
    </>
  );
}

export default App;
