import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";


const ForgotPassword = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email:"",
    securityAns:"",
    newPassword:""
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({
      ...user,
      [name]: value
    });
  };
  

const submitUser = async(e)=>{
  e.preventDefault()
  const {email, securityAns, newPassword} = user
try {
  const res = await axios.put("http://localhost:5000/api/userRouter/resetPassword", { email, securityAns, newPassword})

  if (res.data && res.data.success) {
    toast.success("password reset successfully")
    navigate("/login")
  }
} catch (error) {
  console.log(error);
}
};
  return (
    <>
    <div className='register'>
      <div className='container '>
      <div className='text-center mt-5'>
        <h1 style={{color:"#2a598d"}} >Reset Password</h1>
        <hr className='w-50 m-auto'/>
      </div>
          
          <div className='row'>
          <div className='col-12'>
          <form method='POST' className='m-auto card my-4 p-4 w-50 shadow rounded ' onSubmit={submitUser}>

  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">
      Email address
    </label>
    <input
      type="email"
      className="form-control"
      id="exampleInputEmail1"
      aria-describedby="emailHelp"
      name="email"
      value={user.email}
      onChange={handleChange}
    />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputsecurityAns" className="form-label">
      Security Question
    </label>
    <input
      type="securityAns"
      className="form-control"
      id="exampleInputsecurityAns"
      aria-describedby="emailHelp"
      placeholder='Enter your favourite answer'
      name="securityAns"
      value={user.securityAns}
      onChange={handleChange}
    />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputnewPassword" className="form-label">
     New Password
    </label>
    <input
      type="password"
      className="form-control d-inline"
      id="exampleInputnewPassword"
      name="newPassword"
      value={user.newPassword}
      onChange={handleChange}
    />
  </div>
  <button type="submit" className="btn btn-primary fs-5 fw-bold me-auto mt-1">
    Reset Password
  </button>
          </form>
          </div>
          </div>
      </div>
    </div>

    </>
  )
}

export default ForgotPassword
