import React from 'react'
import Task from './Task';

function getTitle(props)
{
    return "Today Tasks";
}

function getFilter(props, task)
{
    const now = new Date(new Date());
    const date = new Date(task.dueDate);      
    return date.getDate() == now.getDate();
}

const TodayTaskPage = (props) => {
    {
        console.log("TodayTaskPage run")
    }
    return (
        <div className="main">
            <h2>{getTitle(props)}</h2>
            <div className='tasks'>
                {props.todoList.filter(t => getFilter(props, t)).map((t, i) => <Task
                    key={i}
                    todoItem={t}
                    taskLists={props.taskLists}
                    onSelect={props.onSelect} 
                    setTodayOnly={props.setTodayOnly} 
                    setUncompleted={props.setUncompleted} 
                    setTodoList={props.setTodoList} 
                    endpoint={props.endpoint}
                    todoList={props.todoList} 
                    currentListId={props.currentListId} 
                />)}
            </div>
        </div>
    )
}

export default TodayTaskPage;