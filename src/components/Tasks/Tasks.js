import React from 'react'
import Task from './Task';

function getTitle(props)
{
    if (props.todayOnly)
    {
        return "Today Tasks";
    }
    else if (props.uncompleted)
    {      
        return "Uncompleted Tasks";
    }
     
     return props.selectedList.title;
}

function getFilter(props, t)
{
    if (props.todayOnly)
    {
        const now = new Date(new Date());
        const date = new Date(t.dueDate);      
        return date.getDate() == now.getDate();
     }
     else if (props.uncompleted)
     {
         const now = new Date(new Date());
         const date = new Date(t.dueDate);      
         return date.getTime() <= now.getTime();
      }
     
     return t.todoListId === props.selectedList.todoListId;
}

const Tasks = (props) => {
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

export default Tasks;