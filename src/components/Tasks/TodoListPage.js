import React, { useParams } from 'react'
import Task from './Task';

function getTitle(props)
{
     return props.selectedList.title;
}

function getFilter(id, task)
{
     return task.todoListId === id;
}

const TodoListPage = (props) => {
    
    let { id } = useParams();

    {
        console.log("id:" + id)
    }

    return (
        <div className="main">
            <h2>{getTitle(props)}</h2>
            <div className='tasks'>
                {props.todoList.filter(t => getFilter(id, t)).map((t, i) => <Task
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

export default TodoListPage;