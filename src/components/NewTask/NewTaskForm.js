import React, { useState } from 'react'

const useForm = (...fields) => (
    {
        reset: (value) => fields.forEach(f => f.reset(value)),
    })

function NewTaskForm(props) {
    const tasksEndpoint = props.endpoint;
    const todoList = props.todoList;
    const setTodoList = props.setTodoList;

    const title = useTextField('','title');
    const dueDate = useTextField('','dueDate');
    const description = useTextField('','description');
    const form = useForm(title,description,dueDate)

    function useTextField(init,name) {
        const [value, setValue] = useState(init);
        return {
            value,
            name:name,
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
//////////////////////////////////////////////////////////
    // const createTask = (event) => {
    //     const taskListEndpoint = `${Url}1/tasks/item`;
    //     fetch(taskListEndpoint, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(fieldAPI(fieldTitle, fieldDescription, fieldDoDate).buildObject)
    //     })
    //     .then(response => response.json())
    //     .then(props.onSubmit)
    //     .then(_ => { fieldAPI( fieldTitle, fieldDescription, fieldDoDate).cleanAll();
    //     }); 
    // }

////////////////////////////////////////////////////////////////

/* import React, { Component } from 'react'

class NewTaskForm extends Component {
lastId = 2;
state = {todoItemId: ++this.lastId, title: '', description: '', done: false, dueDate: ''}
    onSubmitHandler = (event) => {
        event.preventDefault();
        console.log("it's work");
        this.props.onSubmit(this.state)        
        this.setState({todoItemId: ++this.lastId, title: '', description: '', done: false, dueDate: ''})
        console.log(this.state);
    }

    onChangeTitle = (event) => {
        this.setState({
            title: event.target.value
        })
    }

    onChangeDescription = (event) => {
        this.setState({
            description: event.target.value
        })
    }    
    onChangeDoneAndDueDate = (event) => {
        this.setState({
            dueDate: event.target.value
        })
    }


    render() {
        return (
            <form 
                name="task" 
                onSubmit={this.onSubmitHandler}
                className="new-task-form">
                <input type="text" name="title" placeholder="Title" onChange={this.onChangeTitle} value={this.state.title} required />
                <input type="text" name="description" placeholder="Description" onChange={this.onChangeDescription} value={this.state.description}/>
                <input type="date" name="dueDate" onChange={this.onChangeDoneAndDueDate} value={this.state.dueDate}/>
                <button type="submit">Add Task</button>
            </form>
        )
    }
}

export default NewTaskForm
 */