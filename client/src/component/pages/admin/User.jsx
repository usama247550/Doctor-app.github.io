import React, { useEffect, useState } from 'react'
import axios from 'axios'



const User = () => {
  const [userinfo, setUserinfo] = useState([])



const userList = async()=>{
try {
  const res = await axios.get("http://localhost:5000/api/userRouter/getUsers" ,
  {
    headers:{
      Authorization : "Bearer " + localStorage.getItem("token")
    }
  });
  if (res.data.success) {
    setUserinfo(res.data.users)
  }
}catch (error) {
  console.log(error);
}
}

useEffect( ()=>{
  userList()
}, [])

  return (
    <>


    <div className='userlist'>
      <div className='container '>
      <div className='text-center mt-5'>
        <h1 style={{color:"#2a598d"}} >User List</h1>
        <hr className='w-25 m-auto mt-2'/>
      </div>


      <div className='row'>
          <div className='col-12 '>
          <div className="table-responsive">
          <table className="table table-hover m-auto my-5 p-5 shadow rounded w-100">
  <thead>
    <tr className='text-center'>
      <th scope="col" style={{ width: '10%' }}>#</th>
      <th scope="col" style={{ width: '20%' }}>Name</th>
      <th scope="col" style={{ width: '20%' }}>Email</th>
      <th scope="col" style={{ width: '20%' }}>Doctor</th>
      <th scope="col" style={{ width: '20%' }}>Action</th>
    </tr>
  </thead>
  <tbody>
         {userinfo.map((curr, ind) => (
                  <tr key={ind} className='text-center'>
                    <th scope="row">{ind+1}</th>
                    <td>{curr.name}</td>
                    <td>{curr.email}</td>
                    <td>{curr.isDoctor ? "Yes" : "No"}</td>
                    <td>
                      <button type="button" className="btn btn-outline-danger">Block</button>
                    </td>
                  </tr> 
           ))}
  </tbody>
        </table>
         </div>
         </div>
      </div>    


      </div>
     </div>   

    </>
  )
}

export default User
