import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


const Profile = () => {
  const { id } = useParams();

  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctorBio] = useState(null);

  const doctorInfo = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/doctorRouter/getDoctorInfo",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorBio({
      ...doctor,
      [name]: value,
    });
  };

  const resetProfile = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        "http://localhost:5000/api/doctorRouter/updateDoctorInfo",
        { ...doctor, userId: user._id },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        toast.success("profile reset successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("profile not update");

    }
  };

  useEffect(() => {
    doctorInfo();
  }, []);

  return (
    <>
      <div className="doctorInfo">
        <div className="container">
          <div className="text-center mt-5">
            <h1 style={{color:"#2a598d"}} >Menage Profile</h1>
            <hr className="w-25 m-auto mt-2" />
          </div>

          <div className="row m-auto  my-4 p-4  shadow rounded">
            <div className="">
              <h3>Personal Delails:</h3>
            </div>

            
            <div className="col-12 col-lg-4 col-md-6 col-sm-12 my-3">
            <label for="exampleInputEmail1" class="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                aria-label="First Name"
                name="firstName"
                value={doctor?.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 col-lg-4 col-md-6 col-sm-12 my-3 my-3">
            <label for="exampleInputEmail1" class="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                aria-label="Last Name"
                name="lastName"
                value={doctor?.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 col-lg-4 col-md-6 col-sm-12 my-3 my-3">
            <label for="exampleInputEmail1" class="form-label">Email</label>
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                aria-label="email"
                name="email"
                value={doctor?.email}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 col-lg-4 col-md-6 col-sm-12 my-3 my-3">
            <label for="exampleInputEmail1" class="form-label">Phone Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="Phone Number"
                aria-label="phone number"
                name="phone"
                value={doctor?.phone}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 col-lg-4 col-md-6 col-sm-12 my-3 my-3">
            <label for="exampleInputEmail1" class="form-label">Adress</label>
              <input
                type="text"
                className="form-control"
                placeholder="Adress"
                aria-label="adress"
                name="adress"
                value={doctor?.adress}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 col-lg-4 col-md-6 col-sm-12 my-3 my-3">
            <label for="exampleInputEmail1" class="form-label">Website</label>
              <input
                type="text"
                className="form-control"
                placeholder="Website"
                aria-label="website"
                required
                name="website"
                value={doctor?.website}
                onChange={handleChange}
              />
            </div>

            <div className="mt-5">
              <h3>Professional Delails:</h3>
            </div>

            <div className="col-12 col-lg-4 col-md-6 col-sm-12 my-3 my-3">
            <label for="exampleInputEmail1" class="form-label">Specialization</label>
              <input
                type="text"
                className="form-control"
                placeholder="Specialization"
                aria-label="specialization"
                name="specialization"
                value={doctor?.specialization}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 col-lg-4 col-md-6 col-sm-12 my-3 my-3">
            <label for="exampleInputEmail1" class="form-label">Experience</label>
              <input
                type="text"
                className="form-control"
                placeholder="Experience"
                aria-label="experience"
                name="experience"
                value={doctor?.experience}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 col-lg-4 col-md-6 col-sm-12 my-3 my-3">
            <label for="exampleInputEmail1" class="form-label">Fees Per Consaltation</label>
              <input
                type="text"
                className="form-control"
                placeholder="Fees Per Consaltation "
                aria-label="Fees Per Consaltation "
                name="feesPerConsaltation"
                value={doctor?.feesPerConsaltation}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 col-lg-4 col-md-6 col-sm-12 my-3 my-3">
            <label for="exampleInputEmail1" class="form-label">Timings</label>
              <input
                type="time"
                className="form-control"
                placeholder="Timings"
                aria-label="timings"
                name="timings"
                value={doctor?.timings}
                onChange={handleChange}
              />
            </div>

            <div>
              <input
                className="btn btn-lg btn-success mt-3 "
                type="submit"
                value="Update Profile"
                onClick={resetProfile}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
