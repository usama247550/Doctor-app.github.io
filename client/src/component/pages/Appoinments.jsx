import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


const Appoinments = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);

  const [doctorBio, setDoctorBio] = useState(null);
  const [timing, setTiming] = useState({
    time: "",
    date: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTiming({
      ...timing,
      [name]: value,
    });
  };

  const singleDoctor = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/doctorRouter/getSingleDoctor",
        { userId: id },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctorBio(res.data.doctorInfo);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const bookAppointment = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/doctorRouter/bookAppointment",
        {
          userId: user._id,
          doctorId: id,
          time: timing.time,
          date: timing.date,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (res.data.success) {
        toast.success("appointment booked successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("something want wrong")
    }
  };

  useEffect(() => {
    singleDoctor();
  }, []);

  return (
    <div className="Appoinments">
      <div className="container ">
        <div className="text-center mt-5 ">
          <h1 className="" style={{color:"#2a598d"}} >Book Appoinment</h1>
          <hr className="w-50 m-auto mt-2" />
        </div>

        <div className="row mt-5">
          <div className="col-lg-6 ps-5">
            <div className="card" style={{ width: "25rem" }}>
              <ul className="list-group list-group-flush fs-4">
                <li className="list-group-item">
                  Name: Dr.{doctorBio?.firstName}
                </li>
                <li className="list-group-item">
                  specialization: {doctorBio?.specialization}
                </li>
                <li className="list-group-item">
                  Experience: {doctorBio?.experience}
                </li>
                <li className="list-group-item">
                  Fees Per Consaltation: {doctorBio?.feesPerConsaltation}
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-6 p-2">
            <h5 className="text-muted">Office hours are 9am to 6pm</h5>
            <input
              type="time"
              className="form-control my-3 w-75"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              name="time"
              value={timing.time}
              onChange={handleChange}
            />
            <input
              type="date"
              className="form-control my3 w-75"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              name="date"
              value={timing.date}
              onChange={handleChange}
            />
            {/* <button type="button" className="btn btn-primary my-3">
              Check Awailbility
            </button> */}
            <br />
            <button
              type="button"
              className="btn btn-success"
              onClick={bookAppointment}
            >
              Book Appoinment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appoinments;
