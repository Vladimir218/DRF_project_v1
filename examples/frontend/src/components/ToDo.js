import React from 'react'
import './bootstrap/dist/css/bootstrap.min.css';


const ToDoItem = ({item, deleteToDo}) => {
   return (
            <tr>
                <td>{item.id}</td>
                <td>{item.project}</td>
                <td>{item.text}</td>
                <td>{item.create}</td>
                <td>{item.creator_user}</td>
                <td><button onClick={()=>deleteToDo(item.id)} type='button'>Delete</button></td>
            </tr>
   )
}

const ToDoList = ({items, deleteToDo}) => {
    
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Project</th>
                    <th scope="col">Text</th>
                    <th scope="col">Create</th>
                    <th scope="col">Creator</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {items.map((item) => <ToDoItem item={item} deleteToDo={deleteToDo} />)}
            </tbody>

        </table>
    )
 }
 
 
 export default ToDoList