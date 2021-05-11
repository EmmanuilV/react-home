import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import NewTaskForm from './NewTaskForm';
import Task from './Task';


const TodoListPage = (props) => {
    let { id } = useParams();
    
    const taskList = props.taskLists;

    {
        console.log("TodoListPage run, id: " + id)
        getTitle()
        console.log('taskList: ', taskList)
    }
    function getTitle() {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].todoListId == id) {
                console.log(taskList[i].title)
                return taskList[i].title
            } else {
                console.log('id :' + id)
                console.log(`taskList[${i}].todolistId: ` + taskList[i].todoListId)
                console.log(`taskList[${i}].title: ` + taskList[i].title)
            }
        }
    }
    const [todoList, setTodoList] = useState([]);
    const tasksEndpoint = `http://127.0.0.1:5000/api/tasks`
    useEffect(() => {
        fetch(`${tasksEndpoint}/${id}/all`)
            .then(res => res.json())
            .then(setTodoList);
    }, [id])



    return (
        <div className="main">
            <h2>{ getTitle()}</h2>
            <div className='tasks'>
                {console.log(todoList)}
                {todoList.map((t, i) => <Task
                    key={i}
                    todoItem={t}
                    taskLists={props.taskLists}
                    setTodoList={setTodoList}
                    todoList={todoList}
                    currentListId={id}
                />)}
            </div>
            <NewTaskForm 
            selectedId={id} 
            setTodoList={setTodoList}
            todoList={todoList}
            />
        </div>
    )
}

export default TodoListPage;