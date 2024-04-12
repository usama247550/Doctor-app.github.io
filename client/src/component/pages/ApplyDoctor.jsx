import axios from 'axios';
import React, { useState } from 'react'
import {useDispatch, useSelector } from 'react-redux'
import {showLoading , hideLoading } from '../redux/features'
import {useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";



const ApplyDoctor = () => {
const {user} = useSelector( (state)=> state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

const [doctorInfo, setDoctorInfo] = useState({
  firstName:"",
  lastName:"",
  email:"",
  phone:"",
  adress:"",
  website:"",
  specialization:"",
  experience:"",
  feesPerConsaltation:"",
  timings:""
});

 const handleChange = (e)=>{
   const {name, value} = e.target
   setDoctorInfo({
    ...doctorInfo, [name]:value
   })
 };

 const submitDoctorInfo = async(e)=>{
try {
  e.preventDefault()
  dispatch(showLoading())
  const res = await axios.post("http://localhost:5000/api/userRouter/ApplyDoctor",
   {...doctorInfo, userId: user._id},
    {
    headers:{
      Authorization : "Bearer " + localStorage.getItem("token")
   }
  })
  dispatch(hideLoading())
  if (res.data && res.data.success){
    toast.success("Request send successfully")
    navigate("/")
  }


} catch (error) {
  dispatch(hideLoading())
  console.log(error);
  toast.error("something want wrong")
}

 }

  return (
    <>
    <div className='applyDoctor'>
     <div className='container'>
         
      <div className='text-center mt-5'>
        <h1 className='' style={{color:"#2a598d"}} >Apply-Doctor</h1>
        <hr className='w-25 m-auto mt-2'/>
      </div>

  
      <div className='row m-auto  my-4 p-4  shadow rounded' >

      <div className=''>
      <h3>Personal Delails:</h3>
      </div>

          <div className="col-12 col-lg-4 col-md-6 col-sm-12 my-3">
    <input
      type="text"
      className="form-control"
      placeholder="First Name"
      aria-label="First Name"
      name='firstName'
      value={doctorInfo.firstName}
      onChange={handleChange}
    />
          </div>
          <div className="col-12 col-lg-4 col-md-6 col-sm-12 my-3 my-3">
    <input
      type="text"
      className="form-control"
      placeholder="Last Name"
      aria-label="Last Name"
      name='lastName'
      value={doctorInfo.lastName}
      onChange={handleChange}
    />
          </div>
          <div className="col-12 col-lg-4 col-md-6 col-sm-12 my-3 my-3">
    <input
      type="text"
      className="form-control"
      placeholder="Email"
      aria-label="email"
      name='email'
      value={doctorInfo.email}
      onChange={handleChange}
    />
          </div>
          <div className="col-12 col-lg-4 col-md-6 col-sm-12 my-3 my-3">
    <input
      type="text"
      className="form-control"
      placeholder="Phone Number"
      aria-label="phone number"
      name='phone'
      value={doctorInfo.phone}
      onChange={handleChange}
    />
          </div>
          <div className="col-12 col-lg-4 col-md-6 col-sm-12 my-3 my-3">
    <input
      type="text"
      className="form-control"
      placeholder="Adress"
      aria-label="adress"
      name='adress'
      value={doctorInfo.adress}
      onChange={handleChange}
      
    />
          </div>
          <div className="col-12 col-lg-4 col-md-6 col-sm-12 my-3 my-3">
    <input
      type="text"
      className="form-control"
      placeholder="Website"
      aria-label="website"
      required
      name='website'
      value={doctorInfo.website}
      onChange={handleChange}
    />
          </div>
       


      <div className='mt-5'>
      <h3>Professional Delails:</h3>
      </div>

          <div className="col-12 col-lg-4 col-md-6 col-sm-12 my-3 my-3">
    <input
      type="text"
      className="form-control"
      placeholder="Specialization"
      aria-label="specialization"
      name='specialization'
      value={doctorInfo.specialization}
      onChange={handleChange}
    />
          </div>
          <div className="col-12 col-lg-4 col-md-6 col-sm-12 my-3 my-3">
    <input
      type="text"
      className="form-control"
      placeholder="Experience"
      aria-label="experience"
      name='experience'
      value={doctorInfo.experience}
      onChange={handleChange}
    />
          </div>
          <div className="col-12 col-lg-4 col-md-6 col-sm-12 my-3 my-3">
    <input
      type="text"
      className="form-control"
      placeholder="Fees Per Consaltation "
      aria-label="Fees Per Consaltation "
      name='feesPerConsaltation'
      value={doctorInfo.feesPerConsaltation}
      onChange={handleChange}
    />
          </div>
          <div className="col-12 col-lg-4 col-md-6 col-sm-12 my-3 my-3">
    <input
      type="time"
      className="form-control"
      placeholder="Timings"
      aria-label="timings"
      name='timings'
      value={doctorInfo.timings}
      onChange={handleChange}
    />
          </div>
       
       <div>
          <input className="btn btn-lg btn-primary mt-3 " type="submit" value="Submit" onClick={submitDoctorInfo}/>
       </div>

      </div>


     </div>  
    </div>

    </>
  )
}

export default ApplyDoctor
