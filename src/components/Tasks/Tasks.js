import React from 'react'
import Task from './Task';


const Tasks = (props) => {
    return (
        <div className="main">
            <h2>{props.selectedList.title}</h2>
            <div className='tasks'>
                {props.todoList.filter(t => t.todoListId === props.selectedList.todoListId).map((t, i) => <Task
                    key={i}
                    todoItem={t}
                />)}
            </div>
        </div>
    )
}

export default Tasks;