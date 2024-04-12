import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


const Appointment = () => {
  const [doctor, setDoctor] = useState([]);
  const { user } = useSelector((state) => state.user);



  const doctorAppointment = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/doctorRouter/getDoctorAppointments",
        { userId: user?._id },
        {
            headers:{
                 Authorization: "Bearer " + localStorage.getItem("token")
               }
        }
      );

      if (res.data.success) {
        setDoctor(res.data.getAppointment);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    doctorAppointment();
  }, []);

  const approveStatus = async (id, approvestatus) => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/doctorRouter/approveAppointment",
        { id, approvestatus },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      if (res.data.success) {
        window.location.reload()
        toast.success("appointment approved successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="userlist">
        <div className="container ">
          <div className="text-center mt-5">
            <h1 style={{color:"#2a598d"}} >Appoinments</h1>
            <hr className="w-25 m-auto mt-2" />
          </div>

          <div className="row">
            <div className="col-12 ">
            {
              doctor.length >0? 
              (
                <div className="table-responsive">
                <table className="table table-hover m-auto my-5 p-5 shadow rounded w-100 ">
                <thead>
                  <tr className="text-center">
                    <th scope="col" style={{ width: "10%" }}>
                      #
                    </th>
                    <th scope="col" style={{ width: "20%" }}>
                      User_Id
                    </th>
                    <th scope="col" style={{ width: "20%" }}>
                      Time
                    </th>
                    <th scope="col" style={{ width: "20%" }}>
                      Date
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
                  {doctor?.map((curr, ind) => (
                    <tr key={ind} className="text-center">
                      <th scope="row">{ind}</th>
                      <td>{curr.userId}</td>
                      <td>{curr.time}</td>
                      <td>{curr.date}</td>
                      <td>{curr.status}</td>
                      <td>
                        <button
                          type="button"
                          className={
                            curr.status === "Approved"
                              ? "btn   btn-outline-danger"
                              : "btn   btn-outline-success"
                          }
                          onClick={() => approveStatus(curr.userId, curr.status === "Approved" ? "Pending" : "Approved")}

                        >
                          {curr.status === "Approved" ? "Reject" : "Approved"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
              ):
              <p className=" d-flex justify-content-center fs-3 mt-5">empty</p>

            }
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointment;
