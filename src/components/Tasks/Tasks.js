import React, { useState, useEffect } from 'react';
import Task from './Task';



function getFilter(props, task) {
    if (task.done) {
        return false;
    }
    const now = new Date(new Date());
    const date = new Date(task.dueDate);
    return date.getTime() <= now.getTime();
}

const Tasks = (props) => {
    const [todoList, setTodoList] = useState([]);
    const tasksEndpoint = `http://127.0.0.1:5000/api/tasks/`
    useEffect(() => {
        fetch(`${tasksEndpoint}`)
            .then(res => res.json())
            .then(setTodoList);
    }, [])
    console.log(todoList)
    return (
        <div className="main">
            <h2>{"Uncompleted Tasks"}</h2>
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

export default Tasks;