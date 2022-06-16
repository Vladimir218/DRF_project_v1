import React from 'react'
import './bootstrap/dist/css/bootstrap.min.css';
import {Link, useParams} from "react-router-dom";

const ProjectItem = ({project, deleteProject}) => {
    let link_to = `/project/${project.id}`
    return (
            <tr>
                <td>{project.id}</td>
                <td>{project.name}</td>
                <td>{project.repository}</td>
                <td><Link to={link_to}>Detail</Link></td>
                <td><button onClick={()=>deleteProject(project.id)} type='button'>Delete</button></td>
            </tr>
        )
}

const ProjectList = ({projects, deleteProject}) => {
    
    return (
        <div>
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Repository</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
            </tbody>

        </table>
        <Link to='/projects/create'>Create</Link>
        </div>
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