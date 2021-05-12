import Task from './Task';
import React, { useState, useEffect } from 'react';


const TodayTaskPage = (props) => {
    const [todoList, setTodoList] = useState([]);
    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/tasks/collection/today')
            .then(res => res.json())
            .then(setTodoList);
    }, [])
    {
        console.log("TodayTaskPage run")
        console.log("todoList: ", todoList)
    }
    function getFilter(task) {
        const now = new Date(new Date());
        const date = new Date(task.dueDate);
        return date.getDate() == now.getDate();
    }
    let newTasksList = [];
    todoList.map(t => newTasksList.push(t.todoItem))


    return (
        <div className="main">
            <h2>{"Today Tasks"}</h2>
            <div className='tasks'>
                {newTasksList.filter(t => getFilter(t)).map((t, i) => <Task
                    key={i}
                    todoItem={t}
                    taskLists={props.taskLists}
                    currentListId={t.todoListId}
                    setTodoList={setTodoList}
                    todoList={todoList}
                />)} 
            </div>
        </div>
    )
}

export default TodayTaskPage;