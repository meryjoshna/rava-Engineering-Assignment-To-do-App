// App.jsx

import React, { useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      const todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    saveToLS();
  }, [todos]);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleEdit = (id) => {
    const editedTodo = todos.find(todo => todo.id === id);
    setTodo(editedTodo.todo);
    setTodos(todos.filter(item => item.id !== id));
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(item => item.id !== id));
  };

  const handleAdd = () => {
    if (todo.length > 3) {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
      setTodo("");
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (id) => {
    const index = todos.findIndex(item => item.id === id);
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  return (
    <div className="todo-container">
      <h1>To Do App</h1>
      <div className="input-container">
        <input onChange={handleChange} value={todo} type="text" className="input-field" />
        <button onClick={handleAdd} className="add-button">Add</button>
      </div>
      <div className="todos">
        {todos.map(item => (
          <div key={item.id} className="todo-item">
            <div>
              <input name={item.id} onChange={() => handleCheckbox(item.id)} type="checkbox" checked={item.isCompleted} id="" />
              <div className={item.isCompleted ? "todo-text completed" : "todo-text"}>{item.todo}</div>
            </div>
            <div className="todo-buttons">
              <button onClick={() => handleEdit(item.id)}><FaEdit /></button>
              <button onClick={() => handleDelete(item.id)}><AiFillDelete /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
