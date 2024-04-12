import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios'
import {showLoading , hideLoading } from '../redux/features'
import {useDispatch } from 'react-redux'
import { toast } from "react-toastify";





const Read = () => {
  const dispatch = useDispatch()
  const  {user}  = useSelector((state) => state.user);
  let notification = user?.seenNotification



  const deleteNotification = async()=>{
    try {
      dispatch(showLoading())
      const  res = await axios.post("http://localhost:5000/api/userRouter/deleteNotification",{id:user._id},
      {
        headers:{
          Authorization : "Bearer " + localStorage.getItem("token")
       }
      }
      )
      dispatch(hideLoading())
      if (res.data.success) {
        window.location.reload()
        toast.success("notification delete successfully")
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error);
      toast.error("something want wrong")
    }
      }
    
  return (
    <>
       <div className='Notification'>
      <div className='container'>

      <div className='text-center mt-5'>
        <h1>Notification</h1>
        <hr className='w-25 m-auto mt-2 '/>
      </div>

        <div className='row '>
          <div className='col-12'>
   
     <div className="tab ">
  <Link to="/unread">
    <button className="tablinks " >
      UnRead
    </button>
  </Link>

  <Link to="/read">
     <button className="tablinks" >
      Read
    </button>
  </Link>
     </div>

     <ul className="list-group list-group-flush mt-3">
          {
            notification?.length > 0 ? 
            notification?.map((curr, ind) => (
              <li key={ind} className="list-group-item mt-2">
                <span className="">{curr.msg}</span>
              </li>
            )):
             <li className="list-group-item">No read notifications</li>}
          </ul>
          <button type="button" className="btn btn-danger mt-3" onClick={deleteNotification}>Delete All Notification</button>

   



          </div>
         </div> 
        </div>
       </div>
    </>
  )
}

export default Read
