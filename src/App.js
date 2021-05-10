import React, { useState, useEffect } from 'react';
import './App.css';

import Tasks from './components/Tasks/Tasks';
import NewTaskForm from './components/NewTask/NewTaskForm';
import Dashboard from './components/SideBar/Dashboard';


function App() {
  const [todoList, setTodoList] = useState([]);
  const [taskLists, setTaskLists] = useState([])
  const [selectedList, setSelectedList] = useState([]);
  const [currentListId, setCurrentListId] = useState(1);
  const [todayOnly, setTodayOnly] = useState(false);
  const [uncompleted, setUncompleted] = useState(false);



  const tasksEndpoint = `http://127.0.0.1:5200/api/tasks/`
  useEffect(() => {
    fetch(`${tasksEndpoint}`)
      .then(res => res.json())
      .then(setTodoList);
  }, [])

  return (
    <div className="todo_list">
      <Dashboard 
        endpoint={tasksEndpoint} 
        onSelect={setSelectedList} 
        setTodayOnly={setTodayOnly} 
        setUncompleted={setUncompleted} 
        todoList={todoList} 
        setTaskLists={setTaskLists}
        taskLists={taskLists}
        setCurrentListId={setCurrentListId}
        />

      <Tasks 
        todoList={todoList} 
        selectedList={selectedList} 
        todayOnly={todayOnly} 
        uncompleted={uncompleted}
        taskLists={taskLists}
        onSelect={setSelectedList} 
        setTodayOnly={setTodayOnly} 
        setUncompleted={setUncompleted}
        setTodoList={setTodoList}
        endpoint={tasksEndpoint} 
        currentListId={currentListId}
         /* deleteItem={removeTask} selectedList={selectedList} onChange={changeDoneTask} */ 
        />

      <NewTaskForm 
        endpoint={tasksEndpoint} 
        todoList={todoList} 
        setTodoList={setTodoList} 
        selectedId={currentListId}
        />
    </div>

);
}

export default App;