import React, { useState, useEffect } from 'react'
import { BrowserRouter as Link }  from 'react-router-dom'

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
            <aside>
                <h1>TodoList</h1>
                <div className="dashboard">
                    {
                        props.setTaskLists(taskLists)
                    }
                    {
                    taskLists.map((l, i) => <button className="task-filter" key={i} onClick={() => clickFilter(l)}>{l.title}</button>)
                    }
                    <button className="task-filter" onClick={() => props.setTodayOnly(true)}>Today Tasks</button>
                    <button className="task-filter" onClick={() => uncompletedFilter()}>Uncompleted Tasks</button>
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