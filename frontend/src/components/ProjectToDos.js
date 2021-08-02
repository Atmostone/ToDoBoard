import React from 'react'
import {useParams} from 'react-router-dom'

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

const ProjectToDos = ({todos}) => {
    let {id} = useParams();
    let filtered_todos= todos.filter((todo) => todo.project.id === id);
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
            {filtered_todos.map((todo) => <ToDoItem todo={todo}/>)}
        </table>
    )
}
export default ProjectToDos