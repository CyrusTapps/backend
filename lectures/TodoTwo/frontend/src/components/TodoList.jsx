import React from "react";

const TodoList = ({ todos, onDelete, onUpdate }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo._id}>
          <span
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
            onClick={() => onUpdate(todo._id, { completed: !todo.completed })}
          >
            {todo.title}
          </span>
          <button onClick={() => onDelete(todo._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
