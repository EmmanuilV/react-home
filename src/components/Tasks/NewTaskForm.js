import React, { useState, useEffect } from 'react';


const useForm = (...fields) => (
    {
        reset: (value) => fields.forEach(f => f.reset(value)),
    })

function NewTaskForm(props) {
    const setTodoList = props.setTodoList;
    const todoList = props.todoList


    // const [todoList, setTodoList] = useState([]);
    const tasksEndpoint = `http://127.0.0.1:5000/api/tasks/`
    useEffect(() => {
        fetch(`${tasksEndpoint}`)
            .then(res => res.json())
            .then(setTodoList);
    }, [])
    const title = useTextField('', 'title');
    const dueDate = useTextField('', 'dueDate');
    const description = useTextField('', 'description');
    const form = useForm(title, description, dueDate)

    function useTextField(init, name) {
        const [value, setValue] = useState(init);
        return {
            value,
            name: name,
            onChange: (event) => setValue(event.target.value),
            reset: (value) => setValue(value)
        }
    }

    const addNewTask = (event) => {
        event.preventDefault();
        fetch(tasksEndpoint + `${props.selectedId}/item`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(createdTask())
        })
            .then(response => response.json())
            .then((createdTask) => setTodoList([...todoList, createdTask]));
        form.reset('');
    }

    const createdTask = () => {
        return { title: title.value, done: false, description: description.value, dueDate: dueDate.value };
    }

    return (
        <form onSubmit={addNewTask}>
            <input {...title} type="text" placeholder="title" />
            <input {...description} type="text" placeholder="Description" />
            <input {...dueDate} type="date" />
            <button type="submit">Add new task</button>
        </form>
    )
}

export default NewTaskForm
