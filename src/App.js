import React, { useState, useEffect } from 'react';
import './App.css';

import Tasks from './components/Tasks/Tasks';
import NewTaskForm from './components/NewTask/NewTaskForm';
import Dashboard from './components/SideBar/Dashboard';


function App() {
  const [todoList, setTodoList] = useState([]);
  const [currentListId, setCurrentListId] = useState(1);
  const [selectedList, setSelectedList] = useState([]);


  const tasksEndpoint = `http://127.0.0.1:5200/api/tasks/`
  useEffect(() => {
    fetch(`${tasksEndpoint}`)
      .then(res => res.json())
      .then(setTodoList);
  }, [])

  const list = () => {
    setCurrentListId(selectedList.todoListId)
  }

  return (
    <div className="todo_list">
      <Dashboard endpoint={tasksEndpoint} onSelect={setSelectedList}/>
      <Tasks todoList={todoList} selectedList={selectedList}/* deleteItem={removeTask} selectedList={selectedList} onChange={changeDoneTask} */ />
      <NewTaskForm endpoint={tasksEndpoint} todoList={todoList} setTodoList={setTodoList} selectedId={currentListId}/>
    </div>

);
}

export default App;