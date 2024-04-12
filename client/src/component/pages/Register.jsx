import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import {useDispatch } from 'react-redux'
import {showLoading , hideLoading } from '../redux/features'
import { toast } from "react-toastify";



const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [user, setUser] = useState({
    name:"",
    email:"",
    securityAns:"",
    password:""
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
  const {name, email, securityAns, password} = user
try {
  dispatch(showLoading())
  const res = await axios.post("http://localhost:5000/api/userRouter/register", {name:name, email:email, securityAns:securityAns, password:password})
  dispatch(hideLoading())
  if (res.data && res.data.success) {
    toast.success("Register successfully")
    navigate("/login")
  }
} catch (error) {
  dispatch(hideLoading())
  console.log(error);
  toast.error("something want wrong")
}
};


  return (
    <>
    <div className='register'>
      <div className='container '>
      <div className='text-center mt-5'>
        <h1 style={{color:"#2a598d"}} >Register</h1>
        <hr className='w-25 m-auto mt-2'/>
      </div>
          
          <div className='row justify-content-center'>
          <div className='col-sm-10 col-md-8 col-lg-6'>
          <form method='POST' className='m-auto card my-4 p-4 w-100 shadow rounded' onSubmit={submitUser} >
  <div className="mb-3">
    <label htmlFor="exampleInputname" className="form-label">
      Name
    </label>
    <input
      type="text"
      className="form-control"
      id="exampleInputName"
      aria-describedby="emailHelp"
      name="name"
      value={user.name}
      onChange={handleChange}
    />
  </div>
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
    <label htmlFor="exampleInputsecurity" className="form-label">
      security_Answer
    </label>
    <input
      type="text"
      className="form-control"
      id="exampleInputsecurity"
      aria-describedby="emailHelp"
      name="securityAns"
      value={user.securityAns}
      onChange={handleChange}
    />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">
      Password
    </label>
    <input
      type="password"
      className="form-control"
      id="exampleInputPassword1"
      name="password"
      value={user.password}
      onChange={handleChange}
    />
  </div>
  <button type="submit" className="btn btn-primary mt-1  fs-5 fw-bold me-auto" >
    Register
  </button>
  <Link to="/login" className=" fs-5 pt-3 pt-sm-3 ms-md-auto ms-lg-auto fw-bold" >Login</Link>

          </form>
          </div>
          </div>
      </div>
    </div>
    </>
  )
}

export default Register
