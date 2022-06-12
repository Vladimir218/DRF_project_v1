import React from 'react'
import './bootstrap/dist/css/bootstrap.min.css';
import {Link, useParams} from "react-router-dom";

const ProjectItem = ({project}) => {
    let link_to = `/project/${project.id}`
    return (
            <tr>
                <td>{project.id}</td>
                <td>{project.name}</td>
                <td>{project.repository}</td>
                <td><Link to={link_to}>Detail</Link></td>
            </tr>
        )
}

const ProjectList = ({projects}) => {
    
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Repository</th>
                    <th scope="col">Users</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {projects.map((project) => <ProjectItem project={project} />)}
            </tbody>

        </table>
    )
}
 
const ProjectDetailItem = ({item}) => {
    console.log({item})
    return (
        <li>
            {item.username} ({item.email})
        </li>
    )
}

const ProjectDetail = ({getProject, item}) => {
    let { id } = useParams();
    getProject(id)
    let users = item.users ? item.users : []
  
    return (
        <div>
            <h1>{item.name}</h1>
                Repository: <a href={item.repository}>{item.repository}</a>
            <p></p>
            Users:
            <ol>
                {users.map((user) => <ProjectDetailItem item={user} />)}
            </ol>
        </div>
    )
}
 
export {ProjectList, ProjectDetail}