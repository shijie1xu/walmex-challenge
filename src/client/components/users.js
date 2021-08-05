import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import {useEffect} from "react";

import Table from 'react-bootstrap/Table';

export default function Users(){
    const [users, setUsers] = useState([]);
    const serverURL = 'http://localhost:3000';
    useEffect(()=>{
       axios.get(serverURL+'/users')
           .then(res =>{
               setUsers(res.data);
           })
    },[]);
    return (
        <div>
            <h3 style={{textAlign: 'left'}}>All Users</h3>
            <div id={'tag'} style={{textAlign: 'left'}}>Users and their age</div>
            <Table style={{width: '30%'}}>
                <tbody>
                <tr>
                    <th>Username</th>
                    <th>Age</th>
                </tr>
                {users.map((user, index) =>{
                   return (
                       <tr key={index}>
                           <td>{user.username}</td>
                           <td>{user.age}</td>
                       </tr>
                )

                })}
                </tbody>
            </Table>
        </div>
    )
}
