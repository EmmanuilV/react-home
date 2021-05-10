import React, { useState }from 'react'


const Task = (props) => {
    const todoItem = props.todoItem

    function clickFilter(listId) {
        props.taskLists.forEach(list => {
            if (list.todoListId === listId) {                
                props.onSelect(list);
                props.setTodayOnly(false);
                props.setUncompleted(false);
            }
        });
    }
    
    function buildDate(dueDate) {
        console.log(dueDate)
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
           console.log(taskLists[i].todoListId === listId)
        if (taskLists[i].todoListId === listId) {
            console.log(taskLists[i].title)
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
        return fetch(`${props.endpoint}${props.currentListId}/${itemId}`, {
            method: 'DELETE',
        })
        // .then(response => response.ok ? target.parentElement.remove() : alert(response.statusText));
        .then(() => props.setTodoList([...props.todoList.filter(item => item.todoItemId !== itemId)]));    
    }

    const [task, setTask] = useState([])
    function change() {
        const task = {
            ...todoItem,
            done: !todoItem.done
        }
        console.log(task)
        // onChange(task)
        fetch(`${props.endpoint}${props.currentListId}/todoItem/${todoItem.todoItemId}`, {
            method: 'PATCH',
            headers:  {
                'Content-Type': 'application/json-patch+json'
            },
            body: JSON.stringify([{ op : "replace", path : "/done", value : task.done }])
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
                {/* <input type="checkbox" onClick={() => change} /> */}
                <h3 className={todoItem.done ? "task-complete" : ''}>{todoItem.title}</h3>
            </div>
            <div className="info">
                <p>{todoItem.description !== '' ?  todoItem.description : ''}</p>
                <p className={checkDueDate(todoItem.dueDate) ? "over-due-date" : ''}>{buildDate(todoItem.dueDate)}</p>
            </div>
            <a className="task-filter" onClick={() => clickFilter(todoItem.todoListId)}>{GetGroupName(todoItem.todoListId, props.taskLists)}</a>
        </section>
    )
}

export default Task;