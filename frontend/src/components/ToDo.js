import React from 'react'
import { Link } from "react-router-dom";

const ToDoItem = ({todo, deleteToDo}) => {
    return (
        <tr>
            <td>{todo.project}</td>
            <td>{todo.text}</td>
            <td>{todo.created}</td>
            <td>{todo.modified}</td>
            <td>{todo.createdBy}</td>
            <td>{todo.status}</td>
            <td>
                <button onClick={() => deleteToDo(todo.id)} type='button'>Delete</button>
            </td>
            <td>{todo.id}</td>
        </tr>
    )
}

const ToDoList = ({todos, deleteToDo}) => {
    return (
        <div>
            <table>
                <tr>
                    <th>Project</th>
                    <th>Text</th>
                    <th>Created</th>
                    <th>Modified</th>
                    <th>Created by</th>
                    <th>Status</th>
                    <th>Delete</th>
                </tr>
                {todos.map((todo) => <ToDoItem todo={todo} deleteToDo={deleteToDo}/>)}
            </table>
            <Link to='/todos/create'>Create</Link>
        </div>
    )
}
export default ToDoList