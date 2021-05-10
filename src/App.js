import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link }  from 'react-router-dom'
import Tasks from './components/Tasks/Tasks';
import NewTaskForm from './components/NewTask/NewTaskForm';
import Dashboard from './components/SideBar/Dashboard';
import TodayTaskPage from './components/Tasks/TodayTaskPage';
import TodoListPage from './components/Tasks/TodoListPage';



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
    <Router>
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
      <aside>
        <h2>TodoList</h2>
        <div className="dashboard">
              {
                  taskLists.map((l, i) => (
                  <h3 key={i}>
                      <Link to={`/todo-list/${l.todoListId}`}>{l.title}</Link>
                  </h3>
                  ))
              }
              <h3>
                  <Link to={`/today`}>Today Tasks</Link>
              </h3>
          </div>
        </aside>
        <Switch>
            <Route path='/todo-list/:id' exact component={TodoListPage}>
              <TodoListPage 
                todoList={todoList} 
                setTodoList={setTodoList}
                selectedList={selectedList} 
                todayOnly={todayOnly} 
                setTodayOnly={setTodayOnly} 
                uncompleted={uncompleted}
                setUncompleted={setUncompleted}
                taskLists={taskLists}
                onSelect={setSelectedList} 
                endpoint={tasksEndpoint} 
                currentListId={currentListId}
              />
            </Route>
            <Route path='/today' exact component={TodayTaskPage}>
              <TodayTaskPage 
                todoList={todoList} 
                setTodoList={setTodoList}
                selectedList={selectedList} 
                todayOnly={todayOnly} 
                setTodayOnly={setTodayOnly} 
                uncompleted={uncompleted}
                setUncompleted={setUncompleted}
                taskLists={taskLists}
                onSelect={setSelectedList} 
                endpoint={tasksEndpoint} 
                currentListId={currentListId}
              />
            </Route>
          </Switch>
          <NewTaskForm 
                endpoint={tasksEndpoint} 
                todoList={todoList} 
                setTodoList={setTodoList} 
                selectedId={currentListId}
              />
      </div>
    </Router>

);
}

export default App;