import React from "react";
import { useState } from "react";
const TodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const user = "Shawn";

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ title });
    setTitle("");
  };
  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={`${user}, really? More?`}
        className="todo-input"
      />
      <button type="submit" className="submit-button">
        Add
      </button>
    </form>
  );
};

export default TodoForm;
