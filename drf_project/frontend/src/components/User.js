import React from 'react'
import './bootstrap/dist/css/bootstrap.min.css';


const UserItem = ({user}) => {
   return (
            <tr>
                <td>{user.username}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
            </tr>
   )
}

const UserList = ({users}) => {
    return (
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">User Name</th>
                    <th scope="col">First name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => <UserItem user={user} />)}
            </tbody>
        </table>
    )
 }
 
 
 export default UserList