import React, { useEffect, useState } from 'react'
import {Link } from 'react-router-dom';
import axios from 'axios'


export default function Home() {
    const[users,setUsers]= useState([])

    const {id}=useParams()

    useEffect(()=>{
        loadUsers();
    },[]);

    const loadUsers=async()=>{
        const result= await axios.get("http://localhost:8080/users")
        setUsers(result.data)
    }


  const deleteUser = async(id)=>{
    await axios.delete (`http://localhost:8080/user/${id}`)
    loadUsers();

  }


  return (
    <div className='container'>
        <div className='py-4'>

        <table className="table table-success table-striped" >
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Username</th>
      <th scope="col">Email</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>

    {
        users.map((user,index)=>(

            <tr>
            <th scope="row" key ={index}>{index+1}</th>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>
              <button className='btn btn-primary mx-2'>View</button>
              <Link className='btn btn-outline-primary mx-2' to={`/edituser/${user.id}`}>Edit</Link>
              <Link className='btn btn-danger mx-2'  onClick={()=>deleteUser(user.id)}>
        
                Delete</Link>
            </td>
            </tr>

        ))}
    

  </tbody>
</table>

        </div>

    </div>
  )
}
