import React, { useState, useEffect } from 'react'
import { BrowserRouter as Link, NavLink }  from 'react-router-dom'

const Dashboard = (props) => {
    const [taskLists, setTaskLists] = useState([])
    useEffect(() => {
        fetch(`${props.endpoint}lists`)
            .then(res => res.json())
            .then(setTaskLists);
            // .then(props.setTaskLists(taskLists));
    }, [])

    function clickFilter(list) {
        props.onSelect(list);
        props.setCurrentListId(list.todoListId)
        props.setTodayOnly(false);
        props.setUncompleted(false);
    }

    function uncompletedFilter() {
        props.setTodayOnly(false);
        props.setUncompleted(true);
    }

    const testVersion = 2;
    if (testVersion == 1)
    {
        return (
            // <nav>
            //         <ul>
            //             {
            //                 lists.map(
            //                     taskList => (
            //                         <li key={taskList.id}>
            //                             <NavLink activeClassName="activ-link" to={`/todo-lists/${taskList.id}`}>
            //                                 {taskList.name}
            //                                 <span>({openedTask[taskList.id]})</span>
            //                             </NavLink>  
            //                         </li>
            //                     )
            //                 )
            //             }
            //             <li>
            //                 <NavLink to="/today" activeClassName="activ-link">TodayTaskPage</NavLink>
            //             </li>
            //         </ul>
            //     </nav>
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
                                        <NavLink activeClassName="task-filter" to={`/todo-lists/${list.todoListId}`}  onClick={() => clickFilter(list)}>
                                            {list.title}
                                        </NavLink>
                                    </li>
                                    )
                                )
                            }
                            <li>
                                <NavLink to="/today" activeClassName="activ-link">TodayTaskPage</NavLink>
                            </li>
                            
                        </ul>
                    }
                </div>

            </aside>
        )
    }
    else
    {
        return ('')
    }
}
export default Dashboard