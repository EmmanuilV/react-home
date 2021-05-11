import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, BrowserRouter }  from 'react-router-dom'
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
  //   <div className="App">
  //   <Router>
  //     <Dashboard  />
  //     <div className='tasks'>
  //       <Switch>
  //         <Route path="/todo-lists/:id">
  //           <TodoListPage />
  //         </Route>
  //         <Route path="/today">
  //           <TodayTaskPage taskLists={lists}/>
  //         </Route>
  //       </Switch>
  //     </div>
  //   </Router>
  // </div >
  <div className="todo_list">
    <BrowserRouter>
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
      {/* <aside>
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
        </aside> */}
        <div>
            <Route path='/todo-list/:id'>
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
            <Route path='/today' >
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
          </div>
          <NewTaskForm 
                endpoint={tasksEndpoint} 
                todoList={todoList} 
                setTodoList={setTodoList} 
                selectedId={currentListId}
              />
    </BrowserRouter>
    </div>

);
}

export default App;