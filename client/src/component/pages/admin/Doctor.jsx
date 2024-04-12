import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';


const Doctor = () => {
  const [doctor, setDoctor] = useState([]);

  const DoctorList = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/userRouter/getDoctors",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (res.data.success) {
        setDoctor(res.data.doctors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const approveStatus = async (id, updateStatus) => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/userRouter/changeStatus",
        { id, updateStatus },
        {
            headers:{
          Authorization : "Bearer " + localStorage.getItem("token")
       }
        }
      );
      if (res.data.success) {
        toast.success("status changed successfully")
        window.location.reload()
      }
    } catch (error) {
      console.log(error);
      toast.error("something want wrong")

    }
  };

  useEffect(() => {
    DoctorList();
  }, []);

  return (
    <>
      <div className="userlist">
        <div className="container ">
          <div className="text-center mt-5">
            <h1 style={{color:"#2a598d"}} >Doctor List</h1>
            <hr className="w-25 m-auto mt-2" />
          </div>

          <div className="row">
            <div className="col-12 ">
            <div className="table-responsive">
              <table className="table table-hover m-auto my-5 p-5 shadow rounded w-100 ">
                <thead>
                  <tr className="text-center">
                    <th scope="col" style={{ width: "10%" }}>
                      #
                    </th>
                    <th scope="col" style={{ width: "20%" }}>
                      Name
                    </th>
                    <th scope="col" style={{ width: "20%" }}>
                      Email
                    </th>
                    <th scope="col" style={{ width: "20%" }}>
                      Status
                    </th>
                    <th scope="col" style={{ width: "20%" }}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {doctor.map((curr, ind) => (
                    <tr key={ind} className="text-center">
                      <th scope="row">{ind+1}</th>
                      <td>{`${curr.firstName}  ${curr.lastName}`}</td>
                      <td>{curr.email}</td>
                      <td>{curr.status}</td>
                      <td>
                        <button
                          type="button"
                          className={
                            curr.status === "Approved"
                              ? "btn  btn-outline-danger"
                              : "btn   btn-outline-success"
                          }
                          onClick={() => approveStatus(curr._id,  curr.status === "Approved" ? "Pending" : "Approved") }
                      >
                          {curr.status === "Approved" ? "Reject" : "Approved"}
                        </button>
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
  );
};

export default Doctor;
