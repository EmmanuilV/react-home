import React, { useState, useEffect } from 'react'

const Dashboard = (props) => {
    const [taskLists, setTaskLists] = useState([])
    useEffect(() => {
        fetch(`${props.endpoint}lists`)
            .then(res => res.json())
            .then(setTaskLists);
    }, [])

    return (
        <aside>
            <h1>TodoList</h1>
            <div className="dashboard">
                {
                   taskLists.map((l, i) => <button key={i} onClick={() => props.onSelect(l)}>{l.title}</button>)
                }
            </div>
        </aside>
    )
}
export default Dashboard