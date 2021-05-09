import React from 'react'


const Task = (props) => {
    const todoItem = props.todoItem
    const deleteItem = props.deleteItem
    const onChange = props.onChange

    function change() {
        const task = {
            ...todoItem,
            done: !todoItem.done
        }
        onChange(task)
        console.log(todoItem)
    }


    function changeTitle(done) {
        if (done) {
            return { className: "task-complete" }
        }
    }

    function checkDueDate(dueDate) {
        const now = new Date(new Date().toDateString().split('T'));
        const date = new Date(dueDate);
        if (date < now) {
            return {className : "over-due-date"}
        }
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
    return (
        <section >
            <button onClick={() => deleteItem(todoItem.todoItemId)}>x</button>
            <div className="title">
                <input type="checkbox" checked={todoItem.done} onChange={change} />
                <h3 {...changeTitle(todoItem.done)}>{todoItem.title}</h3>
            </div>
            <div className="info">
                <p>{todoItem.description !== '' ?  todoItem.description : ''}</p>
                <p {...checkDueDate(todoItem.dueDate)}>{buildDate(todoItem.dueDate)}</p>
            </div>
        </section>
    )
}

export default Task;