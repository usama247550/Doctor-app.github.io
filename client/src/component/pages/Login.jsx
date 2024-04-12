import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import {useDispatch } from 'react-redux'
import {showLoading , hideLoading } from '../redux/features'
import { toast } from 'react-toastify';
import Register from './Register';



const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [user, setUser] = useState({
    email:"",
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
  const {email, password} = user

try {
  dispatch(showLoading())
  const res = await axios.post("http://localhost:5000/api/userRouter/login", {email:email, password:password})
  dispatch(hideLoading())
  if (res.data && res.data.success) {
    toast.success("login successfully")
    localStorage.setItem("token", res.data.token)
    navigate("/")
  }
} catch (error) {
  dispatch(hideLoading())
  toast.error("user not register")
  console.log(error);
}
};


  return (
    <>
    <div className='login'>
      <div className='container '>
      <div className='text-center mt-5'>
        <h1 style={{color:"#2a598d"}} >Login</h1>
        <hr className='w-25 m-auto mt-2'/>
      </div>
          
          <div className='row justify-content-center'>
          <div className='col-sm-10 col-md-8 col-lg-6'>
          <form method='POST' className='m-auto card my-4 p-4 w-100  shadow rounded' onSubmit={submitUser} >

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
    <label htmlFor="exampleInputPassword1" className="form-label">
      Password
    </label>
    <input
      type="password"
      className="form-control d-inline"
      id="exampleInputPassword1"
      name="password"
      value={user.password}
      onChange={handleChange}
    />
  </div>
  <button type="submit" className="btn  btn-primary fs-5 fw-bold me-auto mt-1">
    Login
  </button>

  <div className='fw-bold d-flex justify-content-between mt-3 '>
  <Link className='loginLink' to="/register">Register</Link>
  <Link className='loginLink' to="/Forgotpassword">Forgot Password</Link>

  </div>

  
 
          </form>
          </div>
          </div>
      </div>
    </div>
    </>
  )
}

export default Login
