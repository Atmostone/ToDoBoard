import React from 'react'

const ToDoItem = ({todo}) => {
    return (
        <tr>
            <td>{todo.project}</td>
            <td>{todo.text}</td>
            <td>{todo.created}</td>
            <td>{todo.modified}</td>
            <td>{todo.createdBy}</td>
            <td>{todo.status}</td>
        </tr>
    )
}

const ToDoList = ({todos}) => {
    return (
        <table>
            <tr>
                <th>Project</th>
                <th>Text</th>
                <th>Created</th>
                <th>Modified</th>
                <th>Created by</th>
                <th>Status</th>
            </tr>
            {todos.map((todo) => <ToDoItem todo={todo}/>)}
        </table>
    )
}
export default ToDoList