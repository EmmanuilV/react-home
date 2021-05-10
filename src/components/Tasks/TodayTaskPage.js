import React from 'react'
import Task from './Task';

function checkDueDate(dueDate) {
    const now = new Date(new Date().toDateString().split('T'));
    const date = new Date(dueDate);
    return date === now;
}

const TodayTaskPage = (props) => {
    return (
        <div className="today-tasks">
            <button className="task-filter">Today Tasks</button>
            <div className='tasks'>
                {
                props.todoList.filter(t => checkDueDate(t.dueDate)).map((t, i) => <Task
                    key={i}
                    todoItem={t}
                />)}
            </div>
        </div>
    )
}

export default TodayTaskPage;