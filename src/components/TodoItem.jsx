import React, { useState } from 'react';

const TodoItem = ({ todo, deleteTodo, updateTodo }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const handleToggle = () => {
    updateTodo({
      ...todo,
      completed: !todo.completed
    });
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    updateTodo({
      ...todo,
      text
    });
    setEditing(false);
  };

  return (
    <div>
      {!editing ? (
        <div>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggle}
          />
          <span>{todo.text}</span>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
