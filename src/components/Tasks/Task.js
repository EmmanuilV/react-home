import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'


const Task = (props) => {
    const todoItem = props.todoItem
    const tasksEndpoint = `http://127.0.0.1:5000/api/tasks/`
    function buildDate(dueDate) {
        if (dueDate === null || dueDate === undefined || dueDate === '') {
            return ''
        } else {
            const date = dueDate.split('T')
            return date[0]
        }
    }

    function GetGroupName(listId, taskLists) {
        let title = '';
        for (let i = 0; i < taskLists.length; i++) {
            if (taskLists[i].todoListId === listId) {
                title += taskLists[i].title;
            }
        }

        return title
    }
    function checkDueDate(dueDate) {
        const now = new Date(new Date().toDateString().split('T'));
        const date = new Date(dueDate);

        return date < now
    }

    function deleteTask(itemId) {
        return fetch(`${tasksEndpoint}${props.currentListId}/${itemId}`, {
            method: 'DELETE',
        })
            .then(() => props.setTodoList([...props.todoList.filter(item => item.todoItemId !== itemId)]));
    }

    const [task, setTask] = useState([])
    function change() {
        const task = {
            ...todoItem,
            done: !todoItem.done
        }
        console.log(todoItem.todoItemId)
        fetch(`${tasksEndpoint}${props.currentListId}/todoItem/${todoItem.todoItemId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json-patch+json'
            },
            body: JSON.stringify([{ op: "replace", path: "/done", value: task.done }])
        })
            .then(() => setTask(task));
        const newTaskList = props.todoList.slice();
        const index = newTaskList.findIndex(item => item.todoItemId === task.todoItemId)
        newTaskList.splice(index, 1, task)
        props.setTodoList(newTaskList)

    }

    return (
        <section >
            <button onClick={() => deleteTask(todoItem.todoItemId)}>x</button>
            <div className="title">
                <input type="checkbox" checked={todoItem.done} onChange={change} />
                <h3 className={todoItem.done ? "task-complete" : ''}>{todoItem.title}</h3>
            </div>
            <div className="info">
                <p>{todoItem.description !== '' ? todoItem.description : ''}</p>
                <p className={checkDueDate(todoItem.dueDate) ? "over-due-date" : ''}>{buildDate(todoItem.dueDate)}</p>
            </div>
            <NavLink className='link' activeClassName="task-filter" to={`/todo-list/${props.currentListId}`}>
                {GetGroupName(todoItem.todoListId, props.taskLists)}{/* get props.title */}
            </NavLink>
        </section>
    )
}

export default Task;