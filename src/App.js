import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Tasks from './components/Tasks/Tasks';
import Dashboard from './components/SideBar/Dashboard';
import TodayTaskPage from './components/Tasks/TodayTaskPage';
import TodoListPage from './components/Tasks/TodoListPage';



function App() {
  const [taskLists, setTaskLists] = useState([])
  const [id, setId] = useState(1)


  return (
    <div className="todo_list">
      <Router>
        <Dashboard
          setTaskLists={setTaskLists}
          taskLists={taskLists}
        />
        <Route exact={true} path='/'> <h2>Select a to-do list</h2> </Route>
        <Switch>
        <Route path='/todo-list/:id'>
            <TodoListPage
              taskLists={taskLists}
            />
          </Route>
          <Route path='/today' >
            <TodayTaskPage
              taskLists={taskLists}
            />
          </Route>
          <Route path='/uncompleted' >
            <Tasks
              taskLists={taskLists}
            />
          </Route>
        </Switch>
      </Router>
    </div>

  );
}

export default App;