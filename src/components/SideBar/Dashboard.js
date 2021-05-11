import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const Dashboard = (props) => {
    const [taskLists, setTaskLists] = useState([])
    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/tasks/lists')
            .then(res => res.json())
            .then(setTaskLists);
    }, [])

    return (
        <aside>
            <h1>TodoList</h1>
            <div className="dashboard">
                {
                    props.setTaskLists(taskLists)
                }
                {
                    <ul>
                        {
                            taskLists.map(list => (
                                <li key={list.todoListId}>
                                    <NavLink activeClassName="task-filter" to={`/todo-list/${list.todoListId}`} >
                                        {list.title}
                                    </NavLink>
                                </li>
                            ))
                        }
                        <li>
                            <NavLink to="/today" activeClassName="task-filter">TodayTaskPage</NavLink>
                        </li>
                        <li>
                            <NavLink to="/uncompleted" activeClassName="task-filter">Uncompleted task</NavLink>
                        </li>
                    </ul>
                }
            </div>

        </aside>
    )
}
export default Dashboard