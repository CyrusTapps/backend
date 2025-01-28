import React, { useState } from "react";

const TodoList = ({ todos, onDelete, onUpdate, onAddTag, onRemoveTag }) => {
  const [newTag, setNewTag] = useState("");
  const [activeTagInput, setActiveTagInput] = useState(null);

  const handleTagSubmit = (todoId, e) => {
    e.preventDefault();
    if (newTag.trim()) {
      onAddTag(todoId, newTag.trim());
      setNewTag("");
      setActiveTagInput(null);
    }
  };

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
          <div className="tags-container">
            {todo.tags?.map((tag) => (
              <span key={tag} className="tag">
                {tag}
                <button onClick={() => onRemoveTag(todo._id, tag)}>×</button>
              </span>
            ))}
            {activeTagInput === todo._id ? (
              <form onSubmit={(e) => handleTagSubmit(todo._id, e)}>
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add tag"
                  autoFocus
                  onBlur={() => setActiveTagInput(null)}
                />
              </form>
            ) : (
              <button onClick={() => setActiveTagInput(todo._id)}>+ Tag</button>
            )}
          </div>
          <button onClick={() => onDelete(todo._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
