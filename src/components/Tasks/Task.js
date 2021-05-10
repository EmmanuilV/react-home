import React from 'react'


const Task = (props) => {
    const todoItem = props.todoItem
    const deleteItem = props.deleteItem
    const onChange = props.onChange


    function checkDueDate(dueDate) {
        const now = new Date(new Date().toDateString().split('T'));
        const date = new Date(dueDate);
        if (date < now) {
            return {className : "over-due-date"}
        }
    }


    function clickFilter(listId) {
        props.taskLists.forEach(list => {
            if (list.todoListId == listId) {                
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

    function change() {
        const task = {
            ...todoItem,
            done: !todoItem.done
        }
        onChange(task)
        console.log(todoItem)
    }



    return (
        <section >
            <button onClick={() => deleteTask(todoItem.todoItemId)}>x</button>
            <div className="title">
                <input type="checkbox" checked={todoItem.done} onChange={() => change} />
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