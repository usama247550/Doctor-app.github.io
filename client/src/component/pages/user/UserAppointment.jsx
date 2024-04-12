import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const UserAppointment = () => {
  const [userinfo, setUserinfo] = useState([]);
  const { user } = useSelector((state) => state.user);

  const userAppointment = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/doctorRouter/getUserAppointments",
        { id: user?._id },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (res.data.success) {
        setUserinfo(res.data.getAppointment);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userAppointment();
  }, []);

  return (
    <div className="userlist">
      <div className="container ">
        <div className="text-center mt-5">
          <h1 style={{ color: "#2a598d" }}>Appoinments</h1>
          <hr className="w-25  m-auto mt-2" />
        </div>

        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            {userinfo.length > 0 ? (
              <div className="table-responsive">
              <table className="table table-hover m-auto my-5 p-5 shadow rounded w-100 ">
                <thead>
                  <tr className="text-center">
                    <th scope="col" style={{ width: "10%" }}>
                      #
                    </th>
                    <th scope="col" style={{ width: "20%" }}>
                      Doctor_Id
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
                  </tr>
                </thead>

                <tbody>
                  {userinfo.map((curr, ind) => (
                    <tr key={ind} className="text-center">
                      <th scope="row">{ind + 1}</th>
                      <td>{curr.doctorId}</td>
                      <td>{curr.time}</td>
                      <td>{curr.date}</td>
                      <td>{curr.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            ) : (
              
              <p className=" d-flex justify-content-center fs-3 mt-5">empty</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAppointment;
