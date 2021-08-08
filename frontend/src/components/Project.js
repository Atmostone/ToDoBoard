import React from 'react'

const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>{project.name}</td>
            <td>{project.repository}</td>
            <td>{project.users.username}</td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
        <table>
            <tr>
                <th>Name</th>
                <th>Repository</th>
                <th>Users</th>
            </tr>
            {projects.map((project) => <ProjectItem project={project}/>)}
        </table>
    )
}
export default ProjectList