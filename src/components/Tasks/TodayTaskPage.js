import Task from './Task';
import React, { useState, useEffect } from 'react';


function getFilter(task) {
    const now = new Date(new Date());
    const date = new Date(task.dueDate);
    return date.getDate() == now.getDate();
}

const TodayTaskPage = (props) => {
    const [todoList, setTodoList] = useState([]);
    const tasksEndpoint = `http://127.0.0.1:5000/api/tasks/`
    useEffect(() => {
        fetch(`${tasksEndpoint}`)
            .then(res => res.json())
            .then(setTodoList);
    }, [])
    {
        console.log("TodayTaskPage run")
    }
    return (
        <div className="main">
            <h2>{"Today Tasks"}</h2>
            <div className='tasks'>
                {todoList.filter(t => getFilter(props, t)).map((t, i) => <Task
                    key={i}
                    todoItem={t}
                    taskLists={props.taskLists}
                    setTodoList={setTodoList}
                    todoList={todoList}
                />)}
            </div>
        </div>
    )
}

export default TodayTaskPage;