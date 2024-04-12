import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from 'axios'
import {showLoading , hideLoading } from '../redux/features'
import {useDispatch } from 'react-redux'
import { toast } from "react-toastify";



const Unread = () => {
  const dispatch = useDispatch()
  const  {user}  = useSelector((state) => state.user);
  let notification = user?.notification

  const markAsRead = async()=>{
try {
  dispatch(showLoading())
  const  res = await axios.post("http://localhost:5000/api/userRouter/getUserNotification",{id:user._id},
  {
    headers:{
      Authorization : "Bearer " + localStorage.getItem("token")
   }
  }
  )
  dispatch(hideLoading())
  if (res.data.success) {
    window.location.reload()
  }
} catch (error) {
  dispatch(hideLoading())
  console.log(error);
}
  }

  return (
    <>
      <div className="Notification">
        <div className="container">
          <div className="text-center mt-5">
            <h1>Notification</h1>
            <hr className="w-25 m-auto mt-2" />
          </div>

          <div className="tab">
            <Link to="/unread">
           <button className="tablinks"> UnRead</button>
            </Link>
           
            <Link to="/read">
              <button className="tablinks">Read</button>
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
              <li className="list-group-item">No unread notifications</li>}
          </ul>
          <button type="button" className="btn btn-success mt-3" onClick={markAsRead}>Mark as read</button>

        </div>
      </div>

    </>
  );
};

export default Unread;
